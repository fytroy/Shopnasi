const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../data/shopnasi.db');
const db = new sqlite3.Database(dbPath);

const updates = [
    // Monitors
    { name: 'ErgoDesk Pro Monitor', image: '/products/monitor_office.png' },
    { name: 'Dell UltraSharp U2723QE', image: '/products/monitor_office.png' },
    { name: 'Samsung Odyssey G9', image: '/products/monitor_gaming.png' },
    { name: 'LG UltraGear 27GR95QE', image: '/products/monitor_gaming.png' },

    // Keyboards & Accessories
    { name: 'Mechanical Keyboard X1', image: '/products/keyboard_rgb.png' },
    { name: 'USB-C Hub Ultra', image: '/products/usbc_hub.png' },

    // TVs
    { name: 'Samsung QLED 4K', image: '/products/tv_samsung.png' }, // Partial match
    { name: 'Samsung Neo QLED 8K', image: '/products/tv_samsung.png' },
    { name: 'Samsung The Frame', image: '/products/tv_samsung.png' },
    { name: 'LG OLED C3', image: '/products/tv_lg.png' }, // Partial match
    { name: 'LG OLED G3 Gallery', image: '/products/tv_lg.png' },
    { name: 'LG QNED MiniLED', image: '/products/tv_lg.png' },
    { name: 'Sony Bravia XR A80L', image: '/products/tv_sony.png' },
    { name: 'Sony X90L Full Array', image: '/products/tv_sony.png' },
    { name: 'Sony X85K 4K HDR', image: '/products/tv_sony.png' },
    { name: 'TCL QM8 QLED', image: '/products/tv_sony.png' }, // Fallback to generic premium
    { name: 'TCL S4 4K LED', image: '/products/tv_sony.png' },
    { name: 'TCL Q7 QLED 4K', image: '/products/tv_sony.png' },
    { name: 'Hisense U8K Mini-LED', image: '/products/tv_sony.png' },
    { name: 'Hisense U6K ULED', image: '/products/tv_sony.png' },
    { name: 'Hisense A6 Series', image: '/products/tv_sony.png' },

    // Audio
    { name: 'Sony WF-1000XM5', image: '/products/earbuds_white.png' }, // Actually black usually but white generated
    { name: 'Apple AirPods Pro 2', image: '/products/earbuds_white.png' },
    { name: 'Bose QuietComfort Ultra', image: '/products/earbuds_white.png' },
    { name: 'Sennheiser IE 200', image: '/products/earbuds_white.png' },
    { name: 'Shure SE215 Pro', image: '/products/earbuds_white.png' },
    { name: 'Sennheiser IE 600', image: '/products/earbuds_white.png' },
    { name: 'Sony WH-1000XM5', image: '/products/headphones_silver.png' },
    { name: 'Bose QuietComfort 45', image: '/products/headphones_silver.png' },
    { name: 'Sennheiser Momentum 4', image: '/products/headphones_silver.png' },

    // Soundbars & Speakers
    { name: 'Samsung HW-Q990D', image: '/products/soundbar.png' },
    { name: 'LG S95QR', image: '/products/soundbar.png' },
    { name: 'Sonos Arc', image: '/products/soundbar.png' },
    { name: 'JBL Flip 6', image: '/products/speaker_portable.png' },
    { name: 'Bose SoundLink Revolve+', image: '/products/speaker_portable.png' },
    { name: 'UE Megaboom 3', image: '/products/speaker_portable.png' },

    // Phones
    { name: 'Samsung Galaxy S24 Ultra', image: '/products/phone_samsung.png' },
    { name: 'iPhone 15 Pro Max', image: '/products/phone_iphone.png' },
    { name: 'Google Pixel 8 Pro', image: '/products/phone_samsung.png' }, // Fallback
    { name: 'Xiaomi 14 Ultra', image: '/products/phone_samsung.png' }, // Fallback

    // Tablets
    { name: 'iPad Pro', image: '/products/tablet_ipad.png' }, // Partial
    { name: 'Samsung Galaxy Tab S9 Ultra', image: '/products/tablet_android.png' },
    { name: 'Lenovo Tab P12 Pro', image: '/products/tablet_android.png' },

    // Powerbanks
    { name: 'Anker 737 Power Bank', image: '/products/powerbank.png' },
    { name: 'Xiaomi Power Bank 3 Pro', image: '/products/powerbank.png' },
    { name: 'Anker MagGo', image: '/products/powerbank.png' }
];

db.serialize(() => {
    // 1. Generic updates based on name substring matching
    updates.forEach(item => {
        // Use LIKE for substring match to catch "iPad Pro 12.9"" with "iPad Pro"
        db.run(`UPDATE products SET image_url = ? WHERE name LIKE ?`, [item.image, `%${item.name}%`], function (err) {
            if (err) {
                console.error(`Error updating ${item.name}:`, err.message);
            } else if (this.changes > 0) {
                console.log(`Updated ${this.changes} product(s) like '${item.name}'`);
            }
        });
    });

    // 2. Fallbacks for remaining NULLs based on category
    // This catches items not explicitly named but in a category
    const categoryFallbacks = [
        { cat: 'Monitors', img: '/products/monitor_office.png' },
        { cat: 'Keyboards', img: '/products/keyboard_rgb.png' },
        { cat: 'TVs', img: '/products/tv_sony.png' }, // Generic TV
        { cat: 'Audio', img: '/products/headphones_silver.png' }, // Generic Audio
        { cat: 'Phones', img: '/products/phone_samsung.png' },
        { cat: 'Tablets', img: '/products/tablet_android.png' },
        { cat: 'Powerbanks', img: '/products/powerbank.png' }
    ];

    categoryFallbacks.forEach(fb => {
        db.run(`UPDATE products SET image_url = ? WHERE (image_url IS NULL OR image_url LIKE '/images/%' ) AND category = ?`, [fb.img, fb.cat], function (err) {
            if (!err && this.changes > 0) console.log(`Fallback update for category ${fb.cat}: ${this.changes} rows`);
        });
    });

});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
});
