import { db } from '../../../lib/db';

export default function handler(req, res) {
    const { id } = req.query;

    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Product not found' });

        row.attributes = JSON.parse(row.attributes || '{}');
        res.status(200).json(row);
    });
}
