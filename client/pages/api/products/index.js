import { db } from '../../../lib/db';

const ALLOWED_SORT = { price_asc: 'price_retail ASC', price_desc: 'price_retail DESC', newest: 'created_at DESC', name_asc: 'name ASC' };

export default async function handler(req, res) {
    const { q, category, sub_category, brand, minPrice, maxPrice, limit, sort, page } = req.query;
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
        params.push(Number(minPrice));
    }
    if (maxPrice) {
        sql += ' AND price_retail <= ?';
        params.push(Number(maxPrice));
    }
    const orderBy = ALLOWED_SORT[sort] || 'id ASC';
    sql += ` ORDER BY ${orderBy}`;

    const pageSize = limit ? Number(limit) : 20;
    const pageNum = page ? Math.max(1, Number(page)) : 1;
    sql += ' LIMIT ? OFFSET ?';
    params.push(pageSize, (pageNum - 1) * pageSize);

    // Build the WHERE clause for the count query (same filters, no ORDER BY / LIMIT)
    const countSql = sql.replace(/SELECT \*/, 'SELECT COUNT(*) as total').split(' ORDER BY')[0];
    const countParams = params.slice(0, params.length - 2); // strip LIMIT + OFFSET values

    try {
        const [rows, countRow] = await Promise.all([
            new Promise((resolve, reject) => {
                db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows));
            }),
            new Promise((resolve, reject) => {
                db.get(countSql, countParams, (err, row) => err ? reject(err) : resolve(row));
            }),
        ]);
        const products = rows.map(p => ({ ...p, attributes: JSON.parse(p.attributes || '{}') }));
        res.status(200).json({ products, total: countRow.total, page: pageNum, pageSize });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
