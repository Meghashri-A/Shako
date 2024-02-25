import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Welcome to SHAKO</h1>
      </header>
      <div className="buttons-container d-flex flex-column align-items-center">
        <Link to='/reg' className="btn btn-primary btn-lg mb-3">Register</Link>
        <Link to='/log' className="btn btn-success btn-lg">Login</Link>
      </div>
    </div>
  );
}

export default App;
