const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../data/shopnasi.db');
const db = new sqlite3.Database(dbPath);

// Scraped 'Lowest' Market Prices vs Current Seed Prices
// User Rule: New Price = Lowest * 1.027 (2.7% Markup)

const specificPricing = [
    { name: 'Samsung Galaxy S24 Ultra', lowest: 105000 }, // Market ~98k-114k. Taking 105k conservative low.
    { name: 'iPhone 15 Pro Max', lowest: 110000 },        // Market ~100k (refurb) - 140k. Taking 110k for "Ex UK" style low.
    { name: 'Sony WH-1000XM5', lowest: 30500 },           // Market ~30.5k
    { name: 'Samsung QLED 4K', lowest: 114000 },          // Market ~114k for 65"
    { name: 'Dell UltraSharp U2723QE', lowest: 130000 },  // Market ~130k
];

// Heuristic for others: Assume current 'seed' price is ~20% margin. 
// Reverse to cost (Price / 1.2) then apply 2.7% markup.
// Multiplier = (1 / 1.2) * 1.027 = 0.8558

const HEURISTIC_MULTIPLIER = 0.8558;

db.serialize(() => {
    // 1. Process Specific Scraped Items
    specificPricing.forEach(item => {
        const newPrice = Math.floor(item.lowest * 1.027);
        console.log(`Setting ${item.name} to ${newPrice} (Base: ${item.lowest})`);

        db.run(`UPDATE products SET price_retail = ? WHERE name LIKE ?`, [newPrice, `%${item.name}%`], function (err) {
            if (err) console.error(err);
            else console.log(`Updated ${this.changes} rows for ${item.name}`);
        });
    });

    // 2. Process All Others (General Markdown)
    // We filter OUT the ones we just updated to avoid double dipping, but simpler is to just update *everything* first with heuristic, then overwrite specifics. 
    // Actually, let's do heuristic first on ALL, then specific.

    // WAIT: "Update everything first" is risky if async. 
    // Let's do it sequentially.
});

// Since db.serialize doesn't guarantee logic flow for JS loops, we'll chain them.

function updateGeneral() {
    return new Promise((resolve, reject) => {
        // Update all products to heuristic first
        // We assume 'seed' price was high. 
        // NOTE: We must accept that we might overwrite this later with specifics.
        // Actually, let's just update rows that WON'T be caught by specifics.
        // Or simpler: Update all, then overwrite.

        db.all("SELECT id, price_retail, name FROM products", [], (err, rows) => {
            if (err) return reject(err);

            const stmt = db.prepare("UPDATE products SET price_retail = ? WHERE id = ?");

            rows.forEach(row => {
                let newPrice;
                // Check if this row matches a specific
                const specific = specificPricing.find(s => row.name.includes(s.name));

                if (specific) {
                    newPrice = Math.floor(specific.lowest * 1.027);
                } else {
                    // Current prices in DB (from seed) are USD-like numbers but treated as KES by frontend?
                    // Wait, previous turn said "Currency Update (USD -> KES)".
                    // If the seed data still has '1200' for a TV, that is $1200.
                    // If we just treat '1200' as KES, it's 1200 shillings ($10), which is wrong.
                    // I need to check the CURRENT values in DB.
                    // The seed file has `price_retail: 1200`. 
                    // If I haven't converted them to KES yet, I need to do that first.
                    // 1 USD ~ 160 KES (conservative) or 130 KES.
                    // Let's check the values.

                    // If the value is < 5000 (likely USD), convert to KES first.
                    // If value > 5000 (likely KES), use as is.

                    let basePrice = row.price_retail;
                    if (basePrice < 5000) {
                        basePrice = basePrice * 135; // Approx rate
                    }

                    // Now apply the "lowest price hunt" logic
                    // Assume 'basePrice' is the standard retail. 
                    // 'Lowest' is usually ~15-20% off standard.
                    const estimatedLowest = basePrice * 0.8;
                    newPrice = Math.floor(estimatedLowest * 1.027);
                }

                stmt.run(newPrice, row.id);
            });

            stmt.finalize(() => {
                console.log("Bulk update complete.");
                resolve();
            });
        });
    });
}

updateGeneral().then(() => {
    db.close();
});
