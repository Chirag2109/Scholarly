import React from 'react';

const Publications = ({ publications }) => {
  return (
    <div className="publications">
      <h2>Publications</h2>
      <ul>
        {publications.map((pub, index) => (
          <li key={index}>{pub}</li>
        ))}
      </ul>
    </div>
  );
};

export default Publications;