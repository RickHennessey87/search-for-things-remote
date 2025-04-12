const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

app = express();
const port = 5000;

//middleware for JSON parsing
app.use(express.json());
app.use(cors());

// MySQL Connectopm pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog_portfolio'
});

// Endpoint for all blog posts
app.get('/api/posts', (req, res) => {
    pool.query('SELECT * FROM posts ORDER BY created_at DESC', (error, results) => {
        if (error) {
            console.error('Error fetching blog posts:', error);
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

// Endpoint for creating new blog post
app.post('/api/posts', (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({error: 'Title and content are required.' });
    }

    pool.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], (error, results) => {
        if (error) {
            console.error('Error adding post:', error);
            return res.status(500).json({ error: error.message });
        }
        // respond with post details
        res.json({ id: results.insertId, title, content, created_at: new Date() });
    });
});

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`)
})

