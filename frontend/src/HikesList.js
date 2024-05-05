import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';


function HikesList() {
  const [hikes, setHikes] = useState([]);

  useEffect(() => {
    const fetchHikes = async () => {
      const response = await fetch('http://localhost:3000/api/auth/hikes');
      const data = await response.json();
      setHikes(data);
    };

    fetchHikes();
  }, []);

  return (
    <div>
      {hikes.map(hike => (
        <div key={hike._id}>
          <h2>{hike.title}</h2>
          <p>{hike.description}</p>
          {hike.comments.map(comment => (
            <p key={comment._id}>{comment.text} - {comment.author.username}</p> 
          ))}
          <CommentForm hikeId={hike._id} />
        </div>
      ))}
    </div>
  );
}

export default HikesList;
