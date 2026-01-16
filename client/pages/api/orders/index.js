import { runCommand } from '../../../lib/db';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { userId, totalAmount, items, shippingAddress, paymentMethod } = req.body;

    try {
        // Step 1: Create Order
        const orderResult = await runCommand(
            'INSERT INTO orders (user_id, total_amount, shipping_address, status) VALUES (?, ?, ?, ?)',
            [userId, totalAmount, JSON.stringify(shippingAddress), 'paid']
        );
        const orderId = orderResult.id;

        // Step 2: Create items & Update Inventory
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

        // Step 3: Payment Record
        await runCommand(
            'INSERT INTO payments (order_id, amount, method, status) VALUES (?, ?, ?, ?)',
            [orderId, totalAmount, paymentMethod, 'success']
        );

        res.status(200).json({ message: 'Order placed successfully', orderId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Transaction failed', details: err.message });
    }
}
