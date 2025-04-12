const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM blogs';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching blog posts:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM blogs WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error fetching blog post:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(results[0]);
    });
});

router.post('/', (req, res) => {
    const { title, content, category } = req.body;
    const sql = 'INSERT INTO blogs (title, content, category, created_at) VALUES (?, ?, ?, NOW())';
    db.query(sql, [title, content, category], (err, results) => {
        if (err) {
            console.error('Error inserting blog post:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ id: results.insertId, title, content, category });
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, content, category } = req.body;
    const sql = 'UPDATE blogs SET title = ?, content = ?, category = ? WHERE id = ?';
    db.query(sql, [title, content, category, id], (err, results) => {
        if (err) {
            console.error('Error updating blog post:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Blog post updated' });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM blogs WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error deleting blog post:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Blog post deleted' });
    });
});

module.exports = router;


  