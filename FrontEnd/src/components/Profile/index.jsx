import React from 'react';

const Profile = ({ userData }) => {
  return (
    <div className="profile">
      <h2>Welcome, {userData.username}</h2>
      <p>Email: {userData.email}</p>
      <p>Time since created: {userData.createdAt}</p>
    </div>
  );
};

export default Profile;