import { db } from '../../../lib/db';

export default function handler(req, res) {
    const { q, category, sub_category, brand, minPrice, maxPrice, limit } = req.query;
    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (q) {
        sql += ' AND (name LIKE ? OR description LIKE ? OR sku LIKE ?)';
        const term = `%${q}%`;
        params.push(term, term, term);
    }

    if (category) {
        sql += ' AND category = ?';
        params.push(category);
    }

    if (sub_category) {
        sql += ' AND sub_category = ?';
        params.push(sub_category);
    }

    if (brand) {
        sql += ' AND brand = ?';
        params.push(brand);
    }

    if (minPrice) {
        sql += ' AND price_retail >= ?';
        params.push(minPrice);
    }

    if (maxPrice) {
        sql += ' AND price_retail <= ?';
        params.push(maxPrice);
    }

    if (limit) {
        sql += ' LIMIT ?';
        params.push(limit);
    }

    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        // Parse JSON attributes
        const products = rows.map(p => ({
            ...p,
            attributes: JSON.parse(p.attributes || '{}')
        }));

        res.status(200).json(products);
    });
}
