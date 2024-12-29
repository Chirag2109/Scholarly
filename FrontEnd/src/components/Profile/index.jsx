import React from 'react';

const Profile = ({ userData }) => {
  return (
    <div className="profile">
      <h2>Welcome, {userData.name}</h2>
      <p>Email: {userData.email}</p>
      <p>Affiliation: {userData.affiliation}</p>
    </div>
  );
};

export default Profile;