import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Header = () => {
  const [profilePic, setProfilePic] = useState('cropped_image.png');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // useEffect(() => {
  //   const fetchProfilePic = async () => {
  //     try {
  //       const response = await fetch('http://localhost:4000/profilepic/getprofilepic');
  //       if (response.ok) {
  //         const data = await response.json();
  //         setProfilePic(data.profilePicURL);
  //       } else {
  //         useState('cropped_image.png');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching profile picture:', error);
  //     }
  //   };

  //   fetchProfilePic();
  // }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setProfilePic(fileURL);
      try {
        const formData = new FormData();
        formData.append('photos', file);
        formData.append('username', localStorage.getItem('loggedInUserName'));

        const response = await fetch('http://localhost:4000/profilepic/addprofilepic', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Upload successful!');
        } else {
          throw new Error('Upload failed!');
        }
      } catch (error) {
        setUploadStatus('Failed to upload the image.');
        console.error(error);
      }
    }
  };

  return (
    <div className="profile-info">
      <img src={profilePic} alt="." className="profile-pic" onClick={handleDropdownToggle} />
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <label htmlFor="upload-profile-pic" className="dropdown-item">
            Upload Profile Picture
          </label>
          <input
            type="file"
            id="upload-profile-pic"
            name="photos"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleProfilePicChange}
          />
        </div>
      )}
      <Link to="/Sign_Out" id="out">Sign Out</Link>
    </div>
  );
};

export default Header;