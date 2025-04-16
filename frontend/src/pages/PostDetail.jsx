import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PostDetail() {
    const { id } = useParams();
    const [post, setPosts] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/api/posts/${id}`)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error('Error fetching post:', err));
    }, [id]);

    if (!post) return <p style={{ padding: '20px' }}>Loading...</p>

    return (
        <div style={{ padding: '20px' }}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <small>Posted on: {new Date(post.created_at).toLocaleString()}</small>
        </div>
    );
}

export default PostDetail;