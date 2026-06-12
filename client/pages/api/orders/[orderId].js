import { db } from '../../../lib/db';

export default async function handler(req, res) {
    const { orderId } = req.query;

    try {
        const [order, items] = await Promise.all([
            new Promise((resolve, reject) => {
                db.get('SELECT * FROM orders WHERE id = ?', [orderId], (err, row) => err ? reject(err) : resolve(row));
            }),
            new Promise((resolve, reject) => {
                db.all(
                    `SELECT oi.*, p.name, p.image_url FROM order_items oi
                     JOIN products p ON oi.product_id = p.id
                     WHERE oi.order_id = ?`,
                    [orderId],
                    (err, rows) => err ? reject(err) : resolve(rows)
                );
            }),
        ]);

        if (!order) return res.status(404).json({ error: 'Order not found' });

        res.status(200).json({
            ...order,
            shipping_address: JSON.parse(order.shipping_address || '{}'),
            items,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
