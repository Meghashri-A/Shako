import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
  const [profileData, setProfileData] = useState({});
  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3003/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfileData(); // Fetch profile data when the component mounts
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <p>Username: {profileData.username}</p>
        <p>Bio: {profileData.bio}</p>
      </div>
      <div>
        <Link to="/editpf"><button>Edit Profile</button></Link>
      </div>
    </div>
  );
}

export default ProfilePage;
