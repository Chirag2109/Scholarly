import React, { useState, useEffect } from 'react';
import "./style.css";
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Profile from '../../components/Profile';
import Publications from '../../components/Publications';
import Achievements from '../../components/Achievements';
import Lectures from '../../components/Lectures';
import Notes from '../../components/Notes';
import Footer from '../../layout/Footer';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('Profile');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch scholar details
    fetch(`${import.meta.env.VITE_NODEJS_BACKEND}/user/${localStorage.getItem("loggedInUserName")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user details.");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => {
        setError(err.message);
        console.error(err);
      });
  }, []);

  const handleUpload = (section, uploadedData) => {
    // Handle uploads for different sections
    const endpointMap = {
      Profile: '/updateProfile',
      Publications: '/uploadPublication',
      Achievements: '/uploadAchievement',
      Lectures: '/uploadLecture',
      Notes: '/uploadNote',
    };

    fetch(`${import.meta.env.VITE_NODEJS_BACKEND}${endpointMap[section]}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to upload to ${section}`);
        }
        return response.json();
      })
      .then((updatedData) => {
        setUserData(updatedData); // Update the userData after successful upload
      })
      .catch((err) => {
        console.error(`Upload error in ${section}:`, err.message);
      });
  };

  const renderSection = () => {
    if (error) {
      return <div className="error">{error}</div>;
    }

    if (!userData) {
      return <div>Loading...</div>;
    }

    switch (activeSection) {
      case 'Profile':
        return <Profile userData={userData} onUpload={(data) => handleUpload('Profile', data)} />;
      case 'Publications':
        return <Publications publications={userData.publications} onUpload={(data) => handleUpload('Publications', data)} />;
      case 'Achievements':
        return <Achievements achievements={userData.achievements} onUpload={(data) => handleUpload('Achievements', data)} />;
      case 'Lectures':
        return <Lectures lectures={userData.lectures} onUpload={(data) => handleUpload('Lectures', data)} />;
      case 'Notes':
        return <Notes notes={userData.notes} onUpload={(data) => handleUpload('Notes', data)} />;
      default:
        return <Profile userData={userData} onUpload={(data) => handleUpload('Profile', data)} />;
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