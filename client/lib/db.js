import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'shopnasi.db');

export const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database at ' + dbPath);
    }
});

export const getProducts = (params) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM products WHERE 1=1';
        const queryParams = [];

        if (params.q) {
            sql += ' AND (name LIKE ? OR description LIKE ? OR sku LIKE ?)';
            const term = `%${params.q}%`;
            queryParams.push(term, term, term);
        }
        if (params.category) {
            sql += ' AND category = ?';
            queryParams.push(params.category);
        }
        if (params.limit) {
            sql += ' LIMIT ?';
            queryParams.push(params.limit);
        }
        // Add other filters as needed

        db.all(sql, queryParams, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

export const getProductById = (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

export const runCommand = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, changes: this.changes });
        });
    });
};
