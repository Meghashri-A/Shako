// EditProfilePage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EditProfilePage() {
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3003/edit-profile', formData); // Replace with your endpoint
      // Redirect to profile page after successful edit
    } catch (error) {
      console.error('Error editing profile:', error);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Bio:</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} />
        </div>
        {/* Add fields for profile picture and other information */}
        <button type="submit">Save</button>
      </form>
      <div>
        <Link to="/profile"><button>Back to Profile</button></Link>
      </div>
    </div>
  );
}

export default EditProfilePage;
