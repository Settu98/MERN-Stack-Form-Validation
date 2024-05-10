import React from 'react';

const Dashboard = () => {
  // Retrieve user name from local storage
  const userName = localStorage.getItem('userName');

  // Logout function
  const logout = () => {
    localStorage.removeItem('userName');
    window.location.href = '/'; // Redirect to Login
  };

  return (
    <div>
      <div>
        <img src="/logo.png" alt="Logo" />
      </div>
      <h1>Dashboard</h1>
      <div>
        <button onClick={() => window.location.href = '/'}>Home</button>
        <button onClick={() => window.location.href = '/employees'}>Employee List</button>
        <span>User Name: {userName}</span>
        <button onClick={logout}>Logout</button>
      </div>
      <div>
        <p>Welcome to Admin Panel</p>
      </div>
      {/* Implement additional Dashboard content here */}
    </div>
  );
};

export default Dashboard;
