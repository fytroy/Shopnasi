-- Drop tables to ensure fresh schema on restart (Dev mode)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS deliveries;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- Users Module
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT CHECK(role IN ('admin', 'b2b', 'b2c')) NOT NULL DEFAULT 'b2c',
    company_name TEXT, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Inventory Module / Products
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    sku TEXT UNIQUE NOT NULL,
    description TEXT,
    price_retail REAL NOT NULL,
    price_b2b REAL, 
    stock_quantity INTEGER DEFAULT 0,
    attributes JSON, 
    category TEXT,
    sub_category TEXT,
    brand TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Order Module
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    status TEXT CHECK(status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
    total_amount REAL NOT NULL,
    shipping_address JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price_at_purchase REAL NOT NULL,
    FOREIGN KEY(order_id) REFERENCES orders(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
);

-- Payment Module 
CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER UNIQUE NOT NULL,
    amount REAL NOT NULL,
    method TEXT CHECK(method IN ('credit_card', 'paypal', 'account_credit')) NOT NULL,
    status TEXT NOT NULL, 
    transaction_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(order_id) REFERENCES orders(id)
);

-- Delivery Module
CREATE TABLE IF NOT EXISTS deliveries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER UNIQUE NOT NULL,
    tracking_number TEXT,
    courier TEXT,
    status TEXT NOT NULL, 
    estimated_delivery DATETIME,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(order_id) REFERENCES orders(id)
);

-- Initial Mock Data
INSERT OR IGNORE INTO users (email, password_hash, role, company_name) VALUES 
('admin@shopnasi.com', 'hashed_secret', 'admin', 'Shopnasi HQ'),
('buyer@techcorp.com', 'hashed_secret', 'b2b', 'TechCorp Inc.'),
('consumer@gmail.com', 'hashed_secret', 'b2c', NULL);

-- Original Products
INSERT OR IGNORE INTO products (name, sku, description, price_retail, price_b2b, stock_quantity, attributes, category, sub_category, brand, image_url) VALUES 
('ErgoDesk Pro Monitor', 'MON-001', '4K 27-inch monitor with ergonomic stand', 450.00, 399.00, 50, '{"resolution": "4K", "size": "27 inch"}', 'Monitors', 'Gaming', 'Dell', '/images/monitor.jpg'),
('Mechanical Keyboard X1', 'KEY-001', 'Tactile switch mechanical keyboard', 120.00, 100.00, 150, '{"switch_type": "Brown"}', 'Peripherals', 'Keyboards', 'Logitech', '/images/keyboard.jpg'),
('USB-C Hub Ultra', 'HUB-009', '12-in-1 docking station', 85.00, 70.00, 300, '{"ports": 12}', 'Accessories', 'Docks', 'Anker', '/images/hub.jpg');

-- NEW: TVs (Samsung, LG, Sony, TCL, Hisense)
INSERT OR IGNORE INTO products (name, sku, description, price_retail, price_b2b, stock_quantity, attributes, category, sub_category, brand, image_url) VALUES 
('Samsung QLED 4K 65"', 'TV-SAM-01', 'Q80C Series QLED 4K Smart TV', 1200.00, 1050.00, 20, '{"resolution": "4K", "size": "65 inch"}', 'TVs', 'Smart TV', 'Samsung', NULL),
('Samsung Neo QLED 8K', 'TV-SAM-02', 'QN900C Series 8K Smart TV', 3500.00, 3100.00, 10, '{"resolution": "8K", "size": "75 inch"}', 'TVs', 'Smart TV', 'Samsung', NULL),
('Samsung The Frame', 'TV-SAM-03', 'Art Mode 4K Smart TV', 1500.00, 1300.00, 15, '{"resolution": "4K", "size": "55 inch"}', 'TVs', 'Smart TV', 'Samsung', NULL),

('LG OLED C3 55"', 'TV-LG-01', 'Self-lit OLED evo 4K TV', 1400.00, 1250.00, 25, '{"resolution": "4K", "panel": "OLED"}', 'TVs', 'Smart TV', 'LG', NULL),
('LG QNED MiniLED', 'TV-LG-02', 'Precision dimming LCD TV', 1100.00, 950.00, 30, '{"resolution": "4K", "panel": "QNED"}', 'TVs', 'Smart TV', 'LG', NULL),
('LG OLED G3 Gallery', 'TV-LG-03', 'Gallery Design OLED 4K', 2000.00, 1800.00, 10, '{"resolution": "4K", "panel": "OLED"}', 'TVs', 'Smart TV', 'LG', NULL),

('Sony Bravia XR A80L', 'TV-SONY-01', 'OLED 4K HDR Google TV', 1700.00, 1500.00, 15, '{"resolution": "4K", "os": "Google TV"}', 'TVs', 'Smart TV', 'Sony', NULL),
('Sony X90L Full Array', 'TV-SONY-02', 'LED 4K HDR Google TV', 1200.00, 1000.00, 20, '{"resolution": "4K", "os": "Google TV"}', 'TVs', 'Smart TV', 'Sony', NULL),
('Sony X85K 4K HDR', 'TV-SONY-03', 'LED 4K Ultra HD High Dynamic Range', 900.00, 800.00, 30, '{"resolution": "4K", "os": "Google TV"}', 'TVs', 'Smart TV', 'Sony', NULL),

('TCL QM8 QLED', 'TV-TCL-01', 'Mini-LED QLED 4K HDR', 899.00, 750.00, 40, '{"resolution": "4K"}', 'TVs', 'Smart TV', 'TCL', NULL),
('TCL S4 4K LED', 'TV-TCL-02', 'Smart Roku TV', 350.00, 299.00, 60, '{"resolution": "4K"}', 'TVs', 'Smart TV', 'TCL', NULL),
('TCL Q7 QLED 4K', 'TV-TCL-03', 'QLED HDR Smart Google TV', 650.00, 550.00, 35, '{"resolution": "4K"}', 'TVs', 'Smart TV', 'TCL', NULL),

('Hisense U8K Mini-LED', 'TV-HIS-01', 'ULED 4K Google TV', 750.00, 650.00, 30, '{"resolution": "4K"}', 'TVs', 'Smart TV', 'Hisense', NULL),
('Hisense U6K ULED', 'TV-HIS-02', 'Quantum Dot QLED 4K', 500.00, 420.00, 40, '{"resolution": "4K"}', 'TVs', 'Smart TV', 'Hisense', NULL),
('Hisense A6 Series', 'TV-HIS-03', '4K UHD Smart Google TV', 300.00, 250.00, 50, '{"resolution": "4K"}', 'TVs', 'Smart TV', 'Hisense', NULL);

-- NEW: Audio (Earbuds, Earphones, Headphones, Soundbars, Bluetooth Speakers)
-- Earbuds (Sony, Apple, Bose, Samsung)
INSERT OR IGNORE INTO products (name, sku, description, price_retail, price_b2b, stock_quantity, attributes, category, sub_category, brand, image_url) VALUES
('Sony WF-1000XM5', 'AUD-BUD-01', 'Noise Canceling Wireless Earbuds', 299.00, 250.00, 100, '{"type": "Earbuds", "anc": true}', 'Audio', 'Earbuds', 'Sony', NULL),
('Apple AirPods Pro 2', 'AUD-BUD-02', 'Active Noise Cancellation', 249.00, 220.00, 200, '{"type": "Earbuds", "anc": true}', 'Audio', 'Earbuds', 'Apple', NULL),
('Bose QuietComfort Ultra', 'AUD-BUD-03', 'World-class noise cancellation', 299.00, 260.00, 80, '{"type": "Earbuds", "anc": true}', 'Audio', 'Earbuds', 'Bose', NULL),

-- Earphones (Sennheiser, Shure)
('Sennheiser IE 200', 'AUD-EAR-01', 'In-Ear Audiophile Headphones', 149.00, 120.00, 50, '{"type": "In-Ear", "wired": true}', 'Audio', 'Earphones', 'Sennheiser', NULL),
('Shure SE215 Pro', 'AUD-EAR-02', 'Sound Isolating Earphones', 99.00, 85.00, 60, '{"type": "In-Ear", "wired": true}', 'Audio', 'Earphones', 'Shure', NULL),
('Sennheiser IE 600', 'AUD-EAR-03', 'High-Fidelity In-Ear Monitors', 699.00, 600.00, 20, '{"type": "In-Ear", "material": "Amorphous Zirconium"}', 'Audio', 'Earphones', 'Sennheiser', NULL),

-- Headphones (Sony, Bose, Sennheiser)
('Sony WH-1000XM5', 'AUD-HEAD-01', 'Wireless Noise Canceling Headphones', 399.00, 340.00, 120, '{"type": "Over-Ear", "anc": true}', 'Audio', 'Headphones', 'Sony', NULL),
('Bose QuietComfort 45', 'AUD-HEAD-02', 'Legendary noise cancelling', 329.00, 280.00, 100, '{"type": "Over-Ear", "anc": true}', 'Audio', 'Headphones', 'Bose', NULL),
('Sennheiser Momentum 4', 'AUD-HEAD-03', 'Wireless Headphones with 60h Battery', 349.00, 300.00, 80, '{"type": "Over-Ear", "anc": true}', 'Audio', 'Headphones', 'Sennheiser', NULL),

-- Soundbars (Samsung, LG, JBL, Sonos)
('Samsung HW-Q990D', 'AUD-BAR-01', '11.1.4ch Soundbar System', 1499.00, 1200.00, 30, '{"channels": "11.1.4"}', 'Audio', 'Soundbars', 'Samsung', NULL),
('LG S95QR', 'AUD-BAR-02', '9.1.5ch High Res Audio Soundbar', 1199.00, 950.00, 25, '{"channels": "9.1.5"}', 'Audio', 'Soundbars', 'LG', NULL),
('Sonos Arc', 'AUD-BAR-03', 'Premium Smart Soundbar', 899.00, 800.00, 50, '{"connectivity": "WiFi"}', 'Audio', 'Soundbars', 'Sonos', NULL),

-- Bluetooth Speakers (JBL, Bose, UE)
('JBL Flip 6', 'AUD-SPK-01', 'Portable Waterproof Speaker', 129.00, 100.00, 300, '{"waterproof": true}', 'Audio', 'Bluetooth Speakers', 'JBL', NULL),
('Bose SoundLink Revolve+', 'AUD-SPK-02', '360 degree sound speaker', 329.00, 290.00, 100, '{"battery": "17h"}', 'Audio', 'Bluetooth Speakers', 'Bose', NULL),
('UE Megaboom 3', 'AUD-SPK-03', 'Portable Wireless Bluetooth Speaker', 199.00, 160.00, 150, '{"waterproof": true}', 'Audio', 'Bluetooth Speakers', 'UE', NULL);

-- NEW: Phones (Samsung, Apple, Pixel, Xiaomi)
INSERT OR IGNORE INTO products (name, sku, description, price_retail, price_b2b, stock_quantity, attributes, category, sub_category, brand, image_url) VALUES
('Samsung Galaxy S24 Ultra', 'PHN-SAM-01', 'AI Phone with S Pen', 1299.00, 1100.00, 100, '{"storage": "512GB", "color": "Titanium"}', 'Phones', 'Smartphones', 'Samsung', NULL),
('iPhone 15 Pro Max', 'PHN-APL-01', 'Titanium design with A17 Pro', 1199.00, 1050.00, 150, '{"storage": "256GB", "color": "Natural Titanium"}', 'Phones', 'Smartphones', 'Apple', NULL),
('Google Pixel 8 Pro', 'PHN-PXL-01', 'Google AI and best-in-class camera', 999.00, 850.00, 80, '{"storage": "128GB", "color": "Bay"}', 'Phones', 'Smartphones', 'Pixel', NULL),
('Xiaomi 14 Ultra', 'PHN-XIA-01', 'Leica quad camera system', 1099.00, 950.00, 50, '{"storage": "512GB"}', 'Phones', 'Smartphones', 'Xiaomi', NULL);

-- NEW: Tablets (Apple, Samsung, Lenovo)
INSERT OR IGNORE INTO products (name, sku, description, price_retail, price_b2b, stock_quantity, attributes, category, sub_category, brand, image_url) VALUES
('iPad Pro 12.9"', 'TAB-APL-01', 'M2 Chip, Liquid Retina XDR', 1099.00, 999.00, 60, '{"chip": "M2", "storage": "128GB"}', 'Tablets', 'Pro Tablets', 'Apple', NULL),
('Samsung Galaxy Tab S9 Ultra', 'TAB-SAM-01', '14.6 inch AMOLED display', 1199.00, 1000.00, 40, '{"pen": "Included", "water_resistant": true}', 'Tablets', 'Android Tablets', 'Samsung', NULL),
('Lenovo Tab P12 Pro', 'TAB-LEN-01', 'Productivity tablet with pen', 699.00, 600.00, 30, '{"os": "Android"}', 'Tablets', 'Android Tablets', 'Lenovo', NULL);

-- NEW: Powerbanks (Anker, Xiaomi)
INSERT OR IGNORE INTO products (name, sku, description, price_retail, price_b2b, stock_quantity, attributes, category, sub_category, brand, image_url) VALUES
('Anker 737 Power Bank', 'PWR-ANK-01', '24000mAh 140W Output', 149.00, 120.00, 200, '{"capacity": "24000mAh", "fast_charging": true}', 'Powerbanks', 'Portable Chargers', 'Anker', NULL),
('Xiaomi Power Bank 3 Pro', 'PWR-XIA-01', '20000mAh 45W Two-Way Charging', 49.00, 35.00, 150, '{"capacity": "20000mAh"}', 'Powerbanks', 'Portable Chargers', 'Xiaomi', NULL),
('Anker MagGo', 'PWR-ANK-02', 'Magnetic Battery 10000mAh', 89.00, 70.00, 100, '{"type": "Magnetic", "capacity": "10000mAh"}', 'Powerbanks', 'Portable Chargers', 'Anker', NULL);

-- NEW: Monitors (Dell, LG, Samsung)
INSERT OR IGNORE INTO products (name, sku, description, price_retail, price_b2b, stock_quantity, attributes, category, sub_category, brand, image_url) VALUES
('Dell UltraSharp U2723QE', 'MON-DEL-01', '27 inch 4K USB-C Hub Monitor', 620.00, 550.00, 40, '{"resolution": "4K", "panel": "IPS Black"}', 'Monitors', 'Professional', 'Dell', NULL),
('LG UltraGear 27GR95QE', 'MON-LG-01', '27 inch OLED Gaming Monitor', 999.00, 850.00, 30, '{"refresh_rate": "240Hz", "response": "0.03ms"}', 'Monitors', 'Gaming', 'LG', NULL),
('Samsung Odyssey G9', 'MON-SAM-01', '49 inch Curved Gaming Monitor', 1299.00, 1100.00, 20, '{"curve": "1000R", "refresh_rate": "240Hz"}', 'Monitors', 'Gaming', 'Samsung', NULL);
