/**
 * Updates product image_url in the DB with confirmed CDN images scraped from official sources.
 * Run: node update-images.mjs
 */
import sqlite3 from 'sqlite3';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { Database } = sqlite3.verbose();
const db = new Database(path.join(__dirname, 'data', 'shopnasi.db'));

const run = (sql, params = []) => new Promise((resolve, reject) =>
    db.run(sql, params, function (err) { err ? reject(err) : resolve(this); })
);

// HEAD-check a URL to verify it responds (2xx or 3xx)
const checkUrl = (url) => new Promise((resolve) => {
    try {
        const lib = url.startsWith('https') ? https : http;
        const req = lib.request(url, { method: 'HEAD', timeout: 6000 }, (res) => {
            resolve(res.statusCode < 400);
        });
        req.on('error', () => resolve(false));
        req.on('timeout', () => { req.destroy(); resolve(false); });
        req.end();
    } catch { resolve(false); }
});

// id → confirmed CDN image URL (sourced from official brand sites/CDNs)
const updates = [
    // ── AUDIO ──
    // Oraimo earbuds
    { id: 57, url: 'https://cdn-img.oraimo.com/MA/product/2026/04/14/OTW-631-SPACEGREY-MAIN.png', label: 'Oraimo SpaceBuds 2' },
    { id: 58, url: 'https://cdn-img.oraimo.com/GH/product/2025/01/09/spacebuds-neo-otw-323.png', label: 'Oraimo SpaceBuds Hybrid ANC' },
    { id: 59, url: 'https://cdn-img.oraimo.com/KE/product/2024/08/29/OTW-630.png', label: 'Oraimo SpaceBuds Pro' },
    { id: 60, url: 'https://cdn-img.oraimo.com/KE/product/2024/08/29/OTW-630.png', label: 'Oraimo Necklace 4 ENC' },
    // Oraimo speaker
    { id: 61, url: 'https://cdn-img.oraimo.com/BD/product/2025/12/22/OBS-680-BLACK.png', label: 'Oraimo SpaceBox Active 25W' },
    // Oraimo watches (use closest current model images from ke.oraimo.com)
    { id: 63, url: 'https://cdn-img.oraimo.com/GH/product/2025/01/09/watch-5-lite-osw-804.png', label: 'Oraimo Watch 5' },
    { id: 64, url: 'https://cdn-img.oraimo.com/KE/product/2024/12/24/OSW-820.png', label: 'Oraimo Watch ER OSW-42' },
    { id: 65, url: 'https://cdn-img.oraimo.com/MA/product/2026/03/06/OSW-815N-CHROME.png', label: 'Oraimo Watch Nova Pro AM' },
    { id: 66, url: 'https://cdn-img.oraimo.com/NG/product/2025/09/16/oraimo-smart-watch-watch-6n-osw-8000n-image-0.png', label: 'Oraimo Watch ES OSW-41' },
    // Bose
    { id: 21, url: 'https://assets.bosecreative.com/transform/bb7b1552-1001-446f-bfd5-f7e2c4ee31ee/QCUEII_DeepPlum_Ecomm-Gallery-1-1634x1224', label: 'Bose QC Ultra Earbuds' },
    { id: 26, url: 'https://assets.bosecreative.com/transform/788fa4e9-26f2-4c34-ba4b-be028d456603/QC45_WhiteSmoke_001_RGB', label: 'Bose QuietComfort 45' },
    // Sennheiser
    { id: 27, url: 'https://us.sennheiser-hearing.com/cdn/shop/files/MOMENTUM_4_Black.jpg?v=1759511980', label: 'Sennheiser Momentum 4' },
    // Soundcore / Anker
    { id: 71, url: 'https://cdn.shopify.com/s/files/1/0516/3761/6830/files/A3028013_product_image_01_V1_3840x.png?v=1749638332', label: 'Soundcore Life Q30' },
    // Samsung audio
    { id: 77, url: 'https://image-us.samsung.com/SamsungUS/home/easy-asset/05172022/SDSAC-4253-Buds2_Graphite-03-PDP-GALLERY-TV-1600x1200.jpg', label: 'Samsung Galaxy Buds2' },

    // ── TVs ──
    // LG TVs — correct LG CDN images per model
    { id: 7, url: 'https://media.us.lg.com/transform/ecomm-PDPGallery-1100x730/b7a77420-3fb6-4ca9-9b00-552b20956548/Tvs_OLED65C3PUA_gallery-01_5000x5000?io=transform:fill,width:1536', label: 'LG OLED C3 55"' },
    { id: 9, url: 'https://media.us.lg.com/transform/ecomm-PDPGallery-1100x730/eaa70fdb-0fd3-4d9e-8584-e909027071b8/TV-OLED65G3PUA-gallery-01_5000x5000?io=transform:fill,width:1536', label: 'LG OLED G3 Gallery' },
    // TCL TVs — TCL Shopify CDN
    { id: 13, url: 'https://us.tcl.com/cdn/shop/files/01QM8K_Front-hero_48fc539d-f0ba-4ac6-8fa6-2155422150ab.png?v=1763697731', label: 'TCL QM8 QLED' },
    { id: 15, url: 'https://us.tcl.com/cdn/shop/files/55Q651G-Front.png?v=1763096286', label: 'TCL Q7 QLED' },

    // ── MONITORS ──
    { id: 44, url: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/u-series/u2723qe/media-gallery/monitor-u2723qe-gallery-3.psd?fmt=png-alpha&pscan=auto&scl=1&hei=804&wid=872&qlt=100,1&resMode=sharp2&size=872,804&chrss=full', label: 'Dell UltraSharp U2723QE' },
    { id: 45, url: 'https://media.us.lg.com/transform/ecomm-PDPGallery-1100x730/f23fe2b3-9087-4386-b832-b5cfba6b69fa/Monitor-27GR95QE-B-OLED-Gallery_3000x3000?io=transform:fill,width:1536', label: 'LG UltraGear 27GR95QE' },

    // ── PHONES ──
    // GSMArena official product photos
    { id: 34, url: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-5g-sm-s928-0.jpg', label: 'Samsung Galaxy S24 Ultra' },
    { id: 35, url: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-0.jpg', label: 'iPhone 15 Pro Max' },
    { id: 36, url: 'https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-pro-0.jpg', label: 'Google Pixel 8 Pro' },
    { id: 37, url: 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-ultra-0.jpg', label: 'Xiaomi 14 Ultra' },
    { id: 47, url: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-max-0.jpg', label: 'iPhone 16 Pro Max' },

    // ── TABLETS ──
    { id: 38, url: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-pro-13-2024-0.jpg', label: 'iPad Pro 12.9"' },
    { id: 39, url: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-tab-s9-ultra-wifi-0.jpg', label: 'Samsung Galaxy Tab S9 Ultra' },
    { id: 40, url: 'https://fdn2.gsmarena.com/vv/pics/lenovo/lenovo-tab-p12-pro-5g-0.jpg', label: 'Lenovo Tab P12 Pro' },

    // ── POWERBANKS ──
    { id: 62, url: 'https://cdn-img.oraimo.com/NG/product/2024/08/14/OPB-727SQ.png', label: 'Oraimo PowerJet 130' },
];

async function main() {
    let passed = 0, failed = 0;

    for (const item of updates) {
        process.stdout.write(`  Checking ${item.label}... `);
        const ok = await checkUrl(item.url);
        if (ok) {
            await run('UPDATE products SET image_url = ? WHERE id = ?', [item.url, item.id]);
            console.log('✓ updated');
            passed++;
        } else {
            console.log('✗ URL unreachable, skipped');
            failed++;
        }
    }

    console.log(`\nDone. ${passed} updated, ${failed} skipped (URL unreachable).`);
    db.close();
}

main().catch(err => { console.error(err); db.close(); });
