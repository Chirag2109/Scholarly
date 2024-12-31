import React, { useState } from 'react';

const Sidebar = ({ setActiveSection }) => {
  const [activeItem, setActiveItem] = useState('Profile');

  const handleItemClick = (section) => {
    setActiveItem(section);
    setActiveSection(section);
  };

  return (
    <aside className="sidebar">
      <ul>
        <li
          className={activeItem === 'Profile' ? 'active' : ''}
          onClick={() => handleItemClick('Profile')}
        >
          Profile
        </li>
        <li
          className={activeItem === 'Achievements' ? 'active' : ''}
          onClick={() => handleItemClick('Achievements')}
        >
          Achievements
        </li>
        <li
          className={activeItem === 'Lectures' ? 'active' : ''}
          onClick={() => handleItemClick('Lectures')}
        >
          Lectures
        </li>
        <li
          className={activeItem === 'Notes' ? 'active' : ''}
          onClick={() => handleItemClick('Notes')}
        >
          Notes
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;