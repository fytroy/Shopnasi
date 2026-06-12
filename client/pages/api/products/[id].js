import { db } from '../../../lib/db';

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        const row = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => err ? reject(err) : resolve(row));
        });
        if (!row) return res.status(404).json({ error: 'Product not found' });
        row.attributes = JSON.parse(row.attributes || '{}');
        res.status(200).json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
