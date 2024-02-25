import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AccountPage() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);
  
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.get('http://localhost:3003/profile', {
        headers: { Authorization: `Bearer ${token}` } // Include token in request headers
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from local storage upon logout
    navigate('/log');
  };
  

  return (
    <div>
      <h2>Welcome, {userData.username}</h2>
      <div>
        <p>Interests: {userData.interests}</p>
      </div>
      <div>
      <Link to={`/profile/${userData.username}`}><button>Profile</button></Link>

        <Link to="/search"><button>Search</button></Link>
        <Link to="/friends"><button>Friends</button></Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default AccountPage;
