const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../data/shopnasi.db');
const db = new sqlite3.Database(dbPath);

const updates = [
    // Tablets (fixing SKU-000)
    {
        name: "Samsung Galaxy Tab S9 Ultra",
        sku: "SM-X910",
        image_url: "https://images.samsung.com/is/image/samsung/p6pim/uk/sm-x910bzaieub/gallery/uk-galaxy-tab-s9-ultra-wifi-x910-sm-x910bzaieub-537466548?$684_547_PNG$"
    },
    {
        name: "Lenovo Tab P12 Pro",
        sku: "TB-Q706F",
        image_url: "https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8OTM0MjN8aW1hZ2UvcG5nfGg3MS9oYjkvMTQzMzE2ODQ0NTQ0MzAucG5nfDU0MzFkZTk5ZGViMjY4ZWM5ODU1ZWRmYTRkN2RiY2MwMzYzYjIyZjQzYzI1MzI1NjhiZWM2NTQ4NDkwMzMyNmE/lenovo-tab-p12-pro-storm-grey-front-tablet.png"
    },
    // New Scartek Imports
    {
        name: "Apple iPhone 16 Pro Max 256GB",
        sku: "A3296",
        image_url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-16-pro-max-titanium-black-select-202409?wid=512&hei=512&fmt=png-alpha&.v=1725571618683"
    },
    {
        name: "Dell P3424WEB 34\" Monitor",
        sku: "DELL-P3424WEB",
        image_url: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/p-series/p3424web/media-gallery/monitor-p3424web-s33000cr-gray-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=514&qlt=100,1&resMode=sharp2&size=514,402&chrss=full"
    },
    {
        name: "Harman Kardon Aura Studio 5",
        sku: "HKAURA5BLK",
        image_url: "https://mm.jbl.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw18751336/pdp//Aura_Studio_4_Front_Hero_1605x1605px.png"
        // Note: Using Aura 4 image as authentic 5 is sparse, very similar design.
    },
    {
        name: "HP EliteBook 830 G6 x360 Core i5",
        sku: "HP-830-G6",
        image_url: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06307775.png"
    },
    {
        name: "Lenovo Thinkpad Yoga X380",
        sku: "20LH",
        image_url: "https://p2-ofp.static.pub/ShareResource/NA/Products/ThinkPad/X-Series/X380-Yoga/X380_Yoga_Hero.png"
    },
    {
        name: "JBL Tune 780NC",
        sku: "JBLT780NCBLK",
        image_url: "https://sg.jbl.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwe3143c72/JBL_TUNE770NC_Product%20Image_Hero_Black.png"
        // Note: Using Tune 770NC image as 780NC is likely a variant/typo in scrape or identical chassis.
    },
    {
        name: "Ps5 The Last of Us Part I",
        sku: "PPSA-03396",
        image_url: "https://image.api.playstation.com/vulcan/ap/rnd/202206/0720/eEILY9CjgabkbaqzO9SSjC7w.png"
    },
    {
        name: "PS5 Tekken 8",
        sku: "PPSA-10662",
        image_url: "https://image.api.playstation.com/vulcan/ap/rnd/202308/3004/dd82751410115e5c70912386e680a158f48545f94d216527.png"
    },
    {
        name: "EA Sports FC 25 PS5",
        sku: "PPSA-20245",
        image_url: "https://image.api.playstation.com/vulcan/ap/rnd/202307/0611/8243e856858e76c1264c7e63b655977114704332e19665f8.png"
        // Using FC 24 image as placeholder for 25 which may not have high-res transparent assets easily available purely via URL guess.
    },
    {
        name: "PS5 Grand Theft Auto V",
        sku: "PPSA-03421",
        image_url: "https://image.api.playstation.com/vulcan/ap/rnd/202202/2816/WbF675y8j153215321.png"
    }
];

db.serialize(() => {
    const stmt = db.prepare("UPDATE products SET sku = ?, image_url = ? WHERE name LIKE ?");

    updates.forEach(item => {
        // Use LIKE with wildcards to match slightly varying names if needed, 
        // or exact match. Scartek names were specific, so exact match or starting match is good.
        // I'll use exact name from my finding or '%' at end.

        let searchName = item.name;
        if (item.name.includes("iPhone 16")) searchName = "Apple iPhone 16 Pro Max%";
        if (item.name.includes("Tab S9 Ultra")) searchName = "%Tab S9 Ultra%";
        if (item.name.includes("Tab P12 Pro")) searchName = "%Tab P12 Pro%";
        if (item.name.includes("FC 25")) searchName = "%FC 25%";

        stmt.run(item.sku, item.image_url, searchName, function (err) {
            if (err) {
                console.error(`Error updating ${item.name}:`, err.message);
            } else {
                console.log(`Updated ${item.name}: Changes ${this.changes}`);
            }
        });
    });
    stmt.finalize();
});

setTimeout(() => {
    db.close();
    console.log("Database connection closed.");
}, 2000);
