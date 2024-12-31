import React from 'react';

const Achievements = ({ achievements }) => {
  return (
    <div className="achievements">
      <h2>Achievements</h2>
      <ul>
        {achievements?.map((ach, index) => (
          <li key={index}>{ach}</li>
        ))}
      </ul>
    </div>
  );
};

export default Achievements;