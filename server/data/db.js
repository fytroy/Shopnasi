const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'shopnasi.db');
const schemaPath = path.resolve(__dirname, 'schema.sql');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initDb();
    }
});

function initDb() {
    const schema = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schema, (err) => {
        if (err) {
            console.error('Error initializing database schema', err.message);
        } else {
            console.log('Database schema initialized.');
        }
    });
}

// "Stored Procedure" execution helper
// This mimics the 'Performance Middleware' / 'Stored Procedure' requirement
// by encapsulating DB logic in a transaction-safe wrapper (when we implement transactions)
function runQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function runCommand(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) { // Use standard function to access 'this'
            if (err) reject(err);
            else resolve({ id: this.lastID, changes: this.changes });
        });
    });
}

module.exports = {
    db,
    runQuery,
    runCommand
};
