import React, { useState } from 'react';
import './style.css';

const Notes = ({ notes, onUpload }) => {
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    setNote(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!note || !title) {
      alert('Please provide a notes and title both');
      return;
    }
  
    if (
      !note.type.startsWith('application/pdf') && // PDF
      !note.type.startsWith('application/msword') && // Word (.doc)
      !note.type.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document') && // Word (.docx)
      !note.type.startsWith('application/vnd.ms-excel') && // Excel (.xls)
      !note.type.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') && // Excel (.xlsx)
      !note.type.startsWith('text/plain') // Plain text
    ) {
      alert('Please upload a valid document (PDF, Word, Excel, or Text)');
      return;
    }
    
  
    const username = localStorage.getItem("loggedInUserName");
    const formData = new FormData();
    formData.append('note', note);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('username', username);
  
    try {
      const response = await fetch(`${import.meta.env.VITE_NODEJS_BACKEND}/notes/addnote`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Notes uploaded successfully!');
        onUpload();
        setNote(null);
        setTitle('');
        setDescription('');
      } else {
        alert(data.message || 'Error uploading note');
      }
    } catch (error) {
      console.error('Error uploading note:', error);
      alert('An error occurred during the upload.');
    }
  };  

  return (
    <div className="notes-container">
      <h2>Notes</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="form-container">
        <input
          type="file"
          name="note"
          id="notesInput"
          onChange={handleFileChange}
          className="input-note"
        />
        <input
          type="text"
          name="title"
          placeholder="Document Title"
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
        <button type="submit" className="submit-button">Upload your Notes</button>
      </form>
    </div>
  );
};

export default Notes;