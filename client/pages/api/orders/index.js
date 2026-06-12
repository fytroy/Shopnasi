import { db, runCommand } from '../../../lib/db';

const runTransaction = (fn) => new Promise((resolve, reject) => {
    db.run('BEGIN TRANSACTION', async (err) => {
        if (err) return reject(err);
        try {
            const result = await fn();
            db.run('COMMIT', (commitErr) => {
                if (commitErr) reject(commitErr);
                else resolve(result);
            });
        } catch (e) {
            db.run('ROLLBACK', () => reject(e));
        }
    });
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { userId, totalAmount, items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    try {
        const orderId = await runTransaction(async () => {
            const orderResult = await runCommand(
                'INSERT INTO orders (user_id, total_amount, shipping_address, status) VALUES (?, ?, ?, ?)',
                [userId || null, totalAmount, JSON.stringify(shippingAddress), 'paid']
            );
            const id = orderResult.id;

            for (const item of items) {
                await runCommand(
                    'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)',
                    [id, item.productId, item.quantity, item.price]
                );
                await runCommand(
                    'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ? AND stock_quantity >= ?',
                    [item.quantity, item.productId, item.quantity]
                );
            }

            await runCommand(
                'INSERT INTO payments (order_id, amount, method, status) VALUES (?, ?, ?, ?)',
                [id, totalAmount, paymentMethod, 'success']
            );

            return id;
        });

        res.status(200).json({ message: 'Order placed successfully', orderId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Transaction failed', details: err.message });
    }
}
