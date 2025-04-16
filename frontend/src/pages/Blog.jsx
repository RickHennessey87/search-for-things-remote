import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Blog() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/posts')
          .then(res => res.json())
          .then(data => setPosts(data))
          .catch(err => console.error('Error fetching posts:', err));
      }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Blog Posts</h1>
            {posts.map(post => (
                <div key={post.id} style={{ marginBottom: '20px' }}>
                    <Link to={`/blog/${post.id}`}>
                        <h2>{post.title}</h2>
                    </Link>
                    <p>{post.content.substring(0, 100)}</p>
                </div>
            ))}
        </div>
    );
}

export default Blog;