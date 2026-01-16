const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../data/shopnasi.db');
const db = new sqlite3.Database(dbPath);

const productUpdates = [
    {
        name: 'Samsung Galaxy S24 Ultra',
        description: "Unleash new levels of creativity, productivity and possibility with Galaxy S24 Ultra. Powered by Galaxy AI, the S24 Ultra features a durable shield of titanium built into the frame and better scratch resistance with Corning® Gorilla® Armor. The 200MP Wide-angle Camera and ProVisual Engine deliver crystal clear details, while the Snapdragon® 8 Gen 3 for Galaxy processor ensures hyper-realistic mobile gaming.",
        attributes: {
            "Display": "6.8-inch Dynamic LTPO AMOLED 2X, 120Hz, 2600 nits",
            "Processor": "Snapdragon 8 Gen 3 for Galaxy",
            "Camera": "200MP Main, 50MP Periscope, 12MP Ultra Wide, 10MP Telephoto",
            "Battery": "5000 mAh, 45W Wired Charging",
            "Storage": "512GB",
            "Build": "Titanium Frame, Gorilla Glass Armor",
            "AI Features": "Circle to Search, Live Translate, Note Assist"
        }
    },
    {
        name: 'iPhone 15 Pro Max',
        description: "iPhone 15 Pro Max is the first iPhone to feature an aerospace-grade titanium design, using the same alloy that spacecraft use for missions to Mars. The A17 Pro chip brings a new class of pro performance and gaming. Capture the highest quality photos and videos with the 48MP Main camera and exclusive 5x Telephoto camera. The new Action button serves as a shortcut to your favorite feature.",
        attributes: {
            "Display": "6.7-inch Super Retina XDR OLED, ProMotion 120Hz",
            "Processor": "A17 Pro chip (3nm)",
            "Camera": "48MP Main, 12MP Ultra Wide, 12MP 5x Telephoto",
            "Material": "Aerospace-grade Titanium",
            "Connectivity": "USB-C (USB 3), 5G, Wi-Fi 6E",
            "Battery": "Up to 29 hours video playback",
            "OS": "iOS 17"
        }
    },
    {
        name: 'Sony WH-1000XM5',
        description: "The WH-1000XM5 wireless noise canceling headphones rewrite the rules for distraction-free listening and call clarity. Two processors control 8 microphones for unprecedented noise cancellation and exceptional call quality. The specific 30mm driver unit with soft edge enhances noise canceling for unparalleled sound. With a lightweight design and soft fit leather, they are comfortable for all-day wear.",
        attributes: {
            "Type": "Over-Ear Wireless Noise Canceling",
            "Battery Life": "Up to 30 hours (NC On)",
            "Audio": "High-Resolution Audio, LDAC, DSEE Extreme",
            "Microphones": "8 Microphones, 2 Processors",
            "Connectivity": "Bluetooth 5.2, Multipoint connection",
            "Weight": "250g",
            "Features": "Speak-to-Chat, Adaptive Sound Control"
        }
    },
    {
        name: 'Dell UltraSharp U2723QE',
        description: "Be your most productive on a 27-inch 4K monitor with brilliant color and contrast that features specific IPS Black technology. This monitor acts as your connectivity hub with RJ45 for wired Ethernet, USB-C with up to 90W power delivery, and a host of other ports. ComfortView Plus—an always-on, built-in low blue light screen—reduces potentially harmful blue light emissions without compromising color.",
        attributes: {
            "Panel Type": "IPS Black Technology",
            "Resolution": "4K UHD (3840 x 2160)",
            "Contrast Ratio": "2000:1",
            "Color Gamut": "100% sRGB, 98% DCI-P3",
            "Connectivity": "USB-C (90W PD), RJ45, HDMI, DP",
            "Ergonomics": "Tilt, Swivel, Pivot, Height Adjustable",
            "Ports": "USB-C Hub, KVM Switch"
        }
    },
    {
        name: 'Samsung 65 Inch QA65Q60DAU', // Updated name match for generic search
        name_match: 'Samsung QLED 4K', // Heuristic match
        description: "Experience 100% Color Volume with Quantum Dot technology. The AirSlim design makes for a sleek and slim TV that blends seamlessly into your wall. Quantum HDR brings out the detail and contrast, so you experience the full power in every image. The Quantum Processor Lite 4K optimizes sound for your viewing condition.",
        attributes: {
            "Resolution": "4K UHD (3840 x 2160)",
            "Panel": "QLED (Quantum Dot)",
            "HDR": "Quantum HDR",
            "Processor": "Quantum Processor Lite 4K",
            "Smart Features": "Tizen OS, Bixby, SmartThings",
            "Design": "AirSlim",
            "Refresh Rate": "60Hz"
        }
    },
    {
        name_match: 'Mechanical Keyboard X1',
        description: "Dominate the battlefield with the X1 Mechanical Gaming Keyboard. Featuring tactile brown switches for the perfect balance of speed and precision. The aircraft-grade aluminum frame ensures structural integrity, while per-key RGB lighting allows for limitless customization.",
        attributes: {
            "Switch Type": "Tactile Brown Mechanical",
            "Backlight": "Per-Key RGB",
            "Polling Rate": "1000Hz",
            "Material": "Aircraft-grade Aluminum",
            "Connectivity": "USB-C Detachable Cable",
            "Layout": "Full Size (104 Keys)"
        }
    },
    {
        name_match: 'ErgoDesk Pro Monitor',
        description: "Elevate your workspace with the ErgoDesk Pro. This 27-inch 4K monitor offers stunning clarity and an ergonomic stand that tilts, swivels, pivots, and adjusts for height to keep you comfortable all day. Perfect for creative professionals and multitasking.",
        attributes: {
            "Resolution": "4K UHD (3840 x 2160)",
            "Panel": "IPS",
            "Size": "27 inch",
            "Ergonomics": "Full Motion Stand",
            "Ports": "HDMI 2.0, DisplayPort 1.2"
        }
    }
];

db.serialize(() => {
    productUpdates.forEach(item => {
        // Search by exact name or substring match
        const queryName = item.name || item.name_match;
        const jsonAttrs = JSON.stringify(item.attributes);

        db.run(
            `UPDATE products SET description = ?, attributes = ? WHERE name LIKE ?`,
            [item.description, jsonAttrs, `%${queryName}%`],
            function (err) {
                if (err) console.error("Error updating " + queryName, err.message);
                else {
                    if (this.changes > 0) {
                        console.log(`Updated content for '${queryName}' (${this.changes} rows)`);
                    } else {
                        console.log(`No match found for '${queryName}'`);
                    }
                }
            }
        );
    });
});

db.close();
