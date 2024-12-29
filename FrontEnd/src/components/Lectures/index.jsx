import React, { useState } from 'react';

const Lectures = ({ lectures, onUpload }) => {
  const [video, setVideo] = useState(null);

  const handleLectureUpload = async (event) => {
    const formData = new FormData();
    formData.append('video', event.target.files[0]);  // 'video' matches the field name used in the backend
  
    try {
      const response = await fetch(`${import.meta.env.VITE_NODEJS_BACKEND}/user/lectures/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Replace with your actual token
        },
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Upload successful:', data);
      } else {
        console.error('Upload failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading lecture:', error);
    }
  };  

  return (
    <div>
      <h2>Lectures</h2>
      <div>
        <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
        <button onClick={handleLectureUpload}>Upload Lecture</button>
      </div>
      <ul>
        {lectures.map((lecture, index) => (
          <li key={index}>{lecture.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Lectures;