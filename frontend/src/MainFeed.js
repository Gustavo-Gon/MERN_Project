import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HikesList from './HikesList'; 



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
      <HikesList />
    </div>
  );
}

export default MainFeed;
