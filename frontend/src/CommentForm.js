import React, { useState } from 'react';

function CommentForm({ hikeId }) {
  const [text, setText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:3000/api/auth/hikes/${hikeId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (response.ok) {
      setText('');
      alert('Comment added');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={text} onChange={e => setText(e.target.value)} required></textarea>
      <button type="submit">Post Comment</button>
    </form>
  );
}

export default CommentForm;
