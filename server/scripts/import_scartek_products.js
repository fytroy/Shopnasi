const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../data/shopnasi.db');
const db = new sqlite3.Database(dbPath);

const products = [
    {
        name: "Apple iPhone 16 Pro Max 256GB",
        category: "Phones",
        price_retail: 171999,
        description: "The ultimate iPhone. iPhone 16 Pro Max features a strong and light titanium design with a new contoured edge, a new Action button, and the most powerful iPhone camera system upgrades yet. Powered by the A18 Pro chip for next-level performance and efficiency.",
        image_url: "https://placehold.co/600x600/1e1e1e/FFF?text=iPhone+16+Pro+Max",
        attributes: {
            "Storage": "256GB",
            "Chip": "A18 Pro",
            "Display": "6.9-inch Super Retina XDR",
            "Camera": "48MP Fusion, 5x Telephoto"
        }
    },
    {
        name: "Dell P3424WEB 34\" Monitor",
        category: "Monitors",
        price_retail: 107000,
        description: "Collaborate clearly with the Dell P3424WEB. This 34-inch curved video conferencing monitor makes communicating with friends, family and colleagues easy. It features a 2K QHD webcam, noise-canceling microphones and dual 5W speakers.",
        image_url: "https://placehold.co/600x400/1e1e1e/FFF?text=Dell+Curved+Monitor",
        attributes: {
            "Size": "34 inch Curved",
            "Resolution": "WQHD (3440 x 1440)",
            "Webcam": "2K QHD",
            "Panel": "IPS"
        }
    },
    {
        name: "Harman Kardon Aura Studio 5",
        category: "Audio",
        price_retail: 37999,
        description: "Harman Kardon Aura Studio 5 combines a unique, elegant design and exceptional 360-degree sound. A stunning domed design featuring premium materials and ambient light effects makes a statement in any home.",
        image_url: "https://placehold.co/400x400/1e1e1e/FFF?text=Aura+Studio+5",
        attributes: {
            "Type": "Bluetooth Speaker",
            "Sound": "360-degree",
            "Connectivity": "Bluetooth"
        }
    },
    {
        name: "HP EliteBook 830 G6 x360 Core i5",
        category: "Laptops",
        price_retail: 35999,
        description: "The HP EliteBook 830 G6 x360 is a versatile convertible laptop designed for the modern mobile professional. It features a precision-crafted aluminum chassis, advanced security features, and a 360-degree hinge that lets you work in any mode.",
        image_url: "https://placehold.co/600x400/1e1e1e/FFF?text=HP+EliteBook+G6",
        attributes: {
            "Processor": "Intel Core i5",
            "RAM": "8GB/16GB",
            "Storage": "256GB SSD",
            "Screen": "13.3 inch Touch"
        }
    },
    {
        name: "Lenovo Thinkpad Yoga X380",
        category: "Laptops",
        price_retail: 26999,
        description: "A 2-in-1 that means business. The ThinkPad X380 Yoga boasts a 360-degree hinge, built-in rechargeable pen, and robust security features. It's built to withstand the rigors of travel while delivering the performance you need.",
        image_url: "https://placehold.co/600x400/1e1e1e/FFF?text=ThinkPad+X380",
        attributes: {
            "Processor": "Intel Core i5",
            "Form Factor": "2-in-1 Convertible"
        }
    },
    {
        name: "JBL Tune 780NC",
        category: "Audio",
        price_retail: 10999,
        description: "Tackle your day one song at a time with the JBL Tune 780NC wireless headphones. These headphones feature JBL Pure Bass Sound, active noise cancelling, and up to 50 hours of battery life to keep you grooving all week long.",
        image_url: "https://placehold.co/400x400/1e1e1e/FFF?text=JBL+Tune+780NC",
        attributes: {
            "Type": "Over-Ear Wireless",
            "NC": "Active Noise Cancelling",
            "Battery": "Up to 50H"
        }
    },
    {
        name: "Ps5 The Last of Us Part I",
        category: "Gaming",
        price_retail: 4599,
        description: "Endure and survive. Experience the emotional storytelling and unforgettable characters in The Last of Us™, winner of over 200 Game of the Year awards, now rebuilt from the ground up for the PlayStation®5 console.",
        image_url: "https://placehold.co/300x400/1e1e1e/FFF?text=Last+of+Us+Part+1",
        attributes: {
            "Platform": "PS5",
            "Genre": "Action-Adventure"
        }
    },
    {
        name: "PS5 Tekken 8",
        category: "Gaming",
        price_retail: 4499,
        description: "Fist meets fate. TEKKEN 8 continues the tragic saga of the Mishima bloodline and its world-shaking father-and-son grudge matches. This latest saga begins with Jin Kazama meeting Kazuya Mishima face-to-face in a city-shattering battle.",
        image_url: "https://placehold.co/300x400/1e1e1e/FFF?text=Tekken+8",
        attributes: {
            "Platform": "PS5",
            "Genre": "Fighting"
        }
    },
    {
        name: "EA Sports FC 25 PS5",
        category: "Gaming",
        price_retail: 3699,
        description: "EA SPORTS FC™ 25 gives you more ways to win for the club. Team up with friends in your favorite modes with the new 5v5 Rush, and manage your club to victory as FC IQ delivers more tactical control than ever before.",
        image_url: "https://placehold.co/300x400/1e1e1e/FFF?text=FC+25",
        attributes: {
            "Platform": "PS5",
            "Genre": "Sports"
        }
    },
    {
        name: "PS5 Grand Theft Auto V",
        category: "Gaming",
        price_retail: 3399,
        description: "Experience the entertainment blockbuster, Grand Theft Auto V, now on PlayStation®5. Includes Grand Theft Auto Online, with dynamic and ever-evolving updates.",
        image_url: "https://placehold.co/300x400/1e1e1e/FFF?text=GTA+V",
        attributes: {
            "Platform": "PS5",
            "Genre": "Action-Adventure"
        }
    }
];

db.serialize(() => {
    const stmt = db.prepare(`
        INSERT OR REPLACE INTO products (name, category, price_retail, image_url, description, attributes, stock_quantity)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    products.forEach(p => {
        // Assume wholesale is ~85% of retail for inserting
        const wholesale = Math.floor(p.price_retail * 0.85);
        const attrs = JSON.stringify(p.attributes || {});

        // We use INSERT OR RPLACE. NOTE: This might overwrite ID if we provided it, but we aren't.
        // To update specifically by name without ID, we'd need a different query. 
        // But since these are "New" mostly, standard INSERT is fine. 
        // To be safe against duplicates, let's use a CHECK or just simple Logic:
        // "INSERT INTO products ... WHERE NOT EXISTS..." logic is harder in one statement without unique constraint on name.
        // Let's first check if exists.

        db.get("SELECT id FROM products WHERE name = ?", [p.name], (err, row) => {
            if (row) {
                // Update
                db.run(`UPDATE products SET price_retail = ?, description = ?, image_url = ?, attributes = ? WHERE id = ?`,
                    [p.price_retail, p.description, p.image_url, attrs, row.id],
                    (err) => {
                        if (!err) console.log(`Updated: ${p.name}`);
                    });
            } else {
                // Insert
                const sku = p.category.substring(0, 3).toUpperCase() + "-" + Math.floor(1000 + Math.random() * 9000); // e.g., PHO-1234
                db.run(`INSERT INTO products (name, category, price_retail, image_url, description, attributes, stock_quantity, sku) VALUES (?, ?, ?, ?, ?, ?, 50, ?)`,
                    [p.name, p.category, p.price_retail, p.image_url, p.description, attrs, sku],
                    (err) => {
                        if (!err) console.log(`Inserted: ${p.name}`);
                        else console.error(`Failed to insert ${p.name}:`, err.message);
                    });
            }
        });
    });

    // finalize is not strictly needed for the simplified logic above inside loop, 
    // but the db.close() should be delayed.
});

// Wait a bit for asyncs to finish before closing (simple script hack)
setTimeout(() => {
    db.close();
    console.log("Database connection closed.");
}, 3000);
