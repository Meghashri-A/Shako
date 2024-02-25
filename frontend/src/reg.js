import React, { useState } from 'react';
import axios from 'axios';

function Reg() {
    const [formData, setFormData] = useState({
      username: '',
      password: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3003/reg', formData);
        console.log(response.data);
        // Optionally, you can redirect the user to the login page after successful registration
        // history.push('/login');
      } catch (error) {
        console.error('Error registering user:', error);
      }
    };
  
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
  
export default Reg;