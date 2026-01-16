const express = require('express');
const router = express.Router();
const { db, runCommand } = require('../data/db');

// Create Order (Checkout)
router.post('/', async (req, res) => {
    const { userId, totalAmount, items, shippingAddress, paymentMethod } = req.body;

    // Start "Transaction" (Mocked via Promise chaining/Sequential logic for SQLite)
    // 1. Validate Inventory
    // 2. Create Order
    // 3. Create Order Items
    // 4. Update Inventory
    // 5. Create Payment Record (Mock)

    try {
        // Step 1: Validate Inventory logic would go here (omitted for brevity in MVP)

        // Step 2: Create Order
        const orderResult = await runCommand(
            'INSERT INTO orders (user_id, total_amount, shipping_address, status) VALUES (?, ?, ?, ?)',
            [userId, totalAmount, JSON.stringify(shippingAddress), 'paid']
        );
        const orderId = orderResult.id;

        // Step 3 & 4: Items & Inventory
        for (const item of items) {
            await runCommand(
                'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)',
                [orderId, item.productId, item.quantity, item.price]
            );

            // Deduct stock
            await runCommand(
                'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?',
                [item.quantity, item.productId]
            );
        }

        // Step 5: Payment
        await runCommand(
            'INSERT INTO payments (order_id, amount, method, status) VALUES (?, ?, ?, ?)',
            [orderId, totalAmount, paymentMethod, 'success']
        );

        res.json({ message: 'Order placed successfully', orderId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Transaction failed', details: err.message });
    }
});

// Get User Orders
router.get('/user/:userId', (req, res) => {
    db.all('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [req.params.userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

module.exports = router;
