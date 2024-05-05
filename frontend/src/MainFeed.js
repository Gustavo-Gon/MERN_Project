import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MainFeed() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to the Main Feed</h1>
      {/* Main Feed content here */}
    </div>
  );
}

export default MainFeed;
