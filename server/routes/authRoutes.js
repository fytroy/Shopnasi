const express = require('express');
const router = express.Router();
const { db } = require('../data/db');

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Simple mock authentication
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        // In a real app, check password hash and return JWT
        res.json({
            message: 'Login successful',
            user: { id: user.id, email: user.email, role: user.role, company: user.company_name }
        });
    });
});

// Register
router.post('/register', (req, res) => {
    const { email, password, role, company_name } = req.body;
    const finalRole = role || 'b2c';

    db.run('INSERT INTO users (email, password_hash, role, company_name) VALUES (?, ?, ?, ?)',
        [email, 'hashed_secret', finalRole, company_name],
        function (err) {
            if (err) return res.status(500).json({ error: 'Email already exists' });
            res.json({ message: 'User registered', id: this.lastID });
        }
    );
});

module.exports = router;
