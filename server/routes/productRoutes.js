const express = require('express');
const router = express.Router();
const { db } = require('../data/db');

// Get all products with filters
router.get('/', (req, res) => {
    const { q, category, sub_category, brand, minPrice, maxPrice } = req.query;
    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    // Fuzzy search simulation
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

    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        // Parse JSON attributes for easier frontend usage
        const products = rows.map(p => ({
            ...p,
            attributes: JSON.parse(p.attributes || '{}')
        }));
        res.json(products);
    });
});

// Get single product
router.get('/:id', (req, res) => {
    db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Product not found' });

        row.attributes = JSON.parse(row.attributes || '{}');
        res.json(row);
    });
});

module.exports = router;
