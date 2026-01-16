import { db } from '../../../../lib/db';

export default function handler(req, res) {
    const { userId } = req.query;

    db.all('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
}
