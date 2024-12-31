import React, { useState } from 'react';
import './style.css';

const Notes = ({ notes, get, upload }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [note, setNote] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const notesList = Array.isArray(notes) ? notes : [];

  const handleFileChange = (e) => {
    setNote(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleNoteUpload = async () => {
    if (!title || !note) {
      setUploadStatus('Title and document are required.');
      return;
    }

    if (
      !note.type.startsWith('application/pdf') &&
      !note.type.startsWith('application/msword') &&
      !note.type.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document') &&
      !note.type.startsWith('application/vnd.ms-excel') &&
      !note.type.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') &&
      !note.type.startsWith('text/plain')
    ) {
      setUploadStatus('Invalid file format. Please upload a PDF, Word, Excel, or Text file.');
      return;
    }

    try {
      setUploadStatus('Uploading...');
      const formData = new FormData();
      formData.append('note', note);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('username', localStorage.getItem('loggedInUserName'));

      const response = await fetch(`${import.meta.env.VITE_NODEJS_BACKEND}/notes/addnote`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('Upload successful!');
        setTitle('');
        setDescription('');
        setNote(null);
      } else {
        throw new Error('Upload failed.');
      }
    } catch (error) {
      setUploadStatus('Failed to upload note.');
      console.error(error);
    }
  };

  return (
    <div className="lectures">
      {/* Display Notes */}
      {(get) && (
      <div className="lecture-list">
        <h3>Notes</h3>
        {notesList.length > 0 ? (
          <ul>
            {notesList.map((noteItem, index) => (
              <li key={index}>
                <strong>{noteItem.title}</strong>
                <p>{noteItem.description}</p>
                <a href={noteItem.fileUrl} target="_blank" rel="noopener noreferrer">
                  Download
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notes available</p>
        )}
      </div>
      )}

      {/* Upload Notes Form */}
      {(upload) && (
      <div className="upload-lecture">
        <h3>Upload New Note</h3>
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
            <label htmlFor="note">Document File:</label>
            <input
              type="file"
              id="note"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
              onChange={handleFileChange}
            />
          </div>
          <button type="button" onClick={handleNoteUpload}>
            Upload Note
          </button>
        </form>
        {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
      </div>
      )}
    </div>
  );
};

export default Notes;