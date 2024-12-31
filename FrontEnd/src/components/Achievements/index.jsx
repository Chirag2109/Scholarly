import React, { useState, useEffect } from 'react';
import './style.css';

const Achievements = ({ achievements }) => {
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [certificate, setCertificate] = useState(null);
  const [eventImages, setEventImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');

  // Ensure achievements is an array or fallback to an empty array if null or undefined
  const achievementList = Array.isArray(achievements) ? achievements : [];

  const handleCertificateUpload = (e) => {
    setCertificate(e.target.files[0]);
  };

  const handleEventImagesUpload = (e) => {
    setEventImages([...e.target.files]);
  };

  const handleAchievementUpload = async () => {
    if (!headline || !description || !certificate || eventImages.length === 0) {
      setUploadStatus('All fields are required.');
      return;
    }

    try {
      setUploadStatus('Uploading...');
      const formData = new FormData();
      formData.append('headline', headline);
      formData.append('description', description);
      formData.append('certificate', certificate);
      eventImages.forEach((image, index) => {
        formData.append(`eventImage${index + 1}`, image);
      });

      const response = await fetch(`${import.meta.env.VITE_NODEJS_BACKEND}/achievements/addachievement`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.ok) {
        setUploadStatus('Upload successful!');
        setHeadline('');
        setDescription('');
        setCertificate(null);
        setEventImages([]);
      } else {
        throw new Error('Upload failed!');
      }
    } catch (error) {
      setUploadStatus('Failed to upload achievement.');
      console.error(error);
    }
  };

  return (
    <div className="achievements">
      {/* Display achievements */}
      <div className="achievement-list">
        <h3>Achievements</h3>
        {achievementList.length > 0 ? (
          <ul>
            {achievementList.map((ach, index) => (
              <li key={index}>
                <strong>{ach.headline}</strong>
                <p>{ach.description}</p>
                <p>Certificate Path: {ach.certificatePath}</p>
                <div>
                  Event Images:
                  <ul>
                    {ach.eventImagesPaths.map((imgPath, imgIndex) => (
                      <li key={imgIndex}>
                        <img src={`file://${imgPath}`} alt={`Event ${imgIndex + 1}`} />
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No achievements available</p>
        )}
      </div>

      {/* Upload Achievement Form */}
      <div className="upload-achievement">
        <h3>Upload New Achievement</h3>
        <form>
          <div>
            <label htmlFor="headline">Headline:</label>
            <input
              type="text"
              id="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Enter headline"
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            ></textarea>
          </div>
          <div>
            <label htmlFor="certificate">Certificate (PDF):</label>
            <input
              type="file"
              id="certificate"
              name="certificate"
              accept="application/pdf"
              onChange={handleCertificateUpload}
            />
          </div>
          <div>
            <label htmlFor="eventImages">Event Images:</label>
            <input
              type="file"
              id="eventImages"
              name="eventImage"
              accept="image/*"
              multiple
              onChange={handleEventImagesUpload}
            />
          </div>
          <button type="button" onClick={handleAchievementUpload}>
            Upload Achievement
          </button>
        </form>
        {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
      </div>
    </div>
  );
};

export default Achievements;