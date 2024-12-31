import React, { useState } from 'react';
import './style.css';

const Lectures = ({ lectures, onUpload }) => {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!video || !title) {
      alert('Please provide a video file and title');
      return;
    }
  
    if (!video.type.startsWith('video/')) {
      alert('Please upload a valid video file');
      return;
    }
  
    const username = localStorage.getItem("loggedInUserName");
    const formData = new FormData();
    formData.append('video', video);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('username', username);
  
    try {
      const response = await fetch(`${import.meta.env.VITE_NODEJS_BACKEND}/videos/addvideo`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Video uploaded successfully!');
        onUpload();
        setVideo(null);
        setTitle('');
        setDescription('');
      } else {
        alert(data.message || 'Error uploading video');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('An error occurred during the upload.');
    }
  };  

  return (
    <div className="lectures-container">
      <h2>Lectures</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="form-container">
        <input
          type="file"
          name="video"
          id="videoInput"
          onChange={handleVideoChange}
          className="input-file"
        />
        <input
          type="text"
          name="title"
          placeholder="Video Title"
          value={title}
          onChange={handleTitleChange}
          className="input-text"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
          className="input-textarea"
        ></textarea>
        <button type="submit" className="submit-button">Upload Video</button>
      </form>
    </div>
  );
};

export default Lectures;