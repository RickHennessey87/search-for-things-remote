import { useState, useEffect } from 'react';

function App() {
  // variables for blog posts and form inputs
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Fetch blog posts from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error fetching posts:', err));
  }, []);

  // Form submission for new blog posts
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content });
    });

    const newPost = await res.json();
    setPosts([...posts, newPost]);
    setTitle('');
    setContent('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>A Search for Things Remote</h1>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='Post Title'
          required
        />

        <br />

        <textarea 
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder='Post Content'
          required
        />

        <br />

        <button type='submit'>Add Post</button>
      </form>

      <hr />

      <h2>Posts</h2>
      {posts.map(post => (
        <div key={post.id} style={{ marginBottom: '20px' }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>Posted on: {new Date(post.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default App;
