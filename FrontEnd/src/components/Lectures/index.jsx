import React, { useState } from 'react';
import './style.css';

const Lectures = ({ lectures }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  // Ensure lectures is an array or fallback to an empty array if null or undefined
  const lectureList = Array.isArray(lectures) ? lectures : [];

  const handleVideoUpload = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLectureUpload = async () => {
    if (!title || !description || !video) {
      setUploadStatus('All fields are required.');
      return;
    }

    try {
      setUploadStatus('Uploading...');
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('username', localStorage.getItem('loggedInUserName'));
      formData.append('video', video);

      const response = await fetch(`${import.meta.env.VITE_NODEJS_BACKEND}/videos/addvideo`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.ok) {
        setUploadStatus('Upload successful!');
        setTitle('');
        setDescription('');
        setVideo(null);
      } else {
        throw new Error('Upload failed!');
      }
    } catch (error) {
      setUploadStatus('Failed to upload lecture.');
      console.error(error);
    }
  };

  return (
    <div className="lectures">
      {/* Display Lectures */}
      <div className="lecture-list">
        <h3>Lectures</h3>
        {lectureList.length > 0 ? (
          <ul>
            {lectureList.map((lecture, index) => (
              <li key={index}>
                <strong>{lecture.title}</strong>
                <p>{lecture.description}</p>
                <video width="320" height="240" controls>
                  <source src={lecture.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </li>
            ))}
          </ul>
        ) : (
          <p>No lectures available</p>
        )}
      </div>

      {/* Upload Lecture Form */}
      <div className="upload-lecture">
        <h3>Upload New Lecture</h3>
        <form>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter title"
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter description"
            ></textarea>
          </div>
          <div>
            <label htmlFor="video">Video File:</label>
            <input
              type="file"
              id="video"
              accept="video/*"
              onChange={handleVideoUpload}
            />
          </div>
          <button type="button" onClick={handleLectureUpload}>
            Upload Lecture
          </button>
        </form>
        {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
      </div>
    </div>
  );
};

export default Lectures;