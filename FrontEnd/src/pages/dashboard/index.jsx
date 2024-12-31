import React, { useState, useEffect } from 'react';
import './style.css';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Profile from '../../components/Profile';
import Achievements from '../../components/Achievements';
import Lectures from '../../components/Lectures';
import Notes from '../../components/Notes';
import Footer from '../../layout/Footer';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('Profile');
  const [userData, setUserData] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Helper to fetch data
  const fetchData = async (url, setter) => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data.');
      }
      const data = await response.json();
      setter(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data on mount
  useEffect(() => {
    fetchData(
      `${import.meta.env.VITE_NODEJS_BACKEND}/user/${localStorage.getItem('loggedInUserName')}`,
      setUserData
    );
  }, []);

  // Load section data dynamically
  useEffect(() => {
    switch (activeSection) {
      case 'Achievements':
        fetchData(
          `${import.meta.env.VITE_NODEJS_BACKEND}/achievements/${localStorage.getItem('loggedInUserName')}`,
          setAchievements
        );
        break;
      case 'Lectures':
        fetchData(
          `${import.meta.env.VITE_NODEJS_BACKEND}/videos/${localStorage.getItem('loggedInUserName')}`,
          setLectures
        );
        break;
      case 'Notes':
        fetchData(
          `${import.meta.env.VITE_NODEJS_BACKEND}/notes/${localStorage.getItem('loggedInUserName')}`,
          setNotes
        );
        break;
      default:
        break;
    }
  }, [activeSection]);

  // Render sections dynamically
  const renderSection = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    switch (activeSection) {
      case 'Profile':
        return <Profile userData={userData}/>;
      case 'Achievements':
        return <Achievements achievements={achievements.achievements}/>;
      case 'Lectures':
        return <Lectures lectures={lectures.videos}/>;
      case 'Notes':
        return <Notes notes={notes.notes}/>;
      default:
        return <Profile userData={userData}/>;
    }
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1>Scholar Dashboard</h1>
        <Header />
      </header>

      <div className="dashboard-body">
        <Sidebar setActiveSection={setActiveSection} />
        <div className="content">{renderSection()}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;