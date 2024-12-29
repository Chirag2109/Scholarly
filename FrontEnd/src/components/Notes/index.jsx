import React, { useState } from 'react';

const Notes = ({ notes, onUpload }) => {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('note', file);

      onUpload({ note: formData });
      setFile(null);
    }
  };

  return (
    <div>
      <h2>Notes</h2>
      <div>
        <input type="file" accept=".txt,.pdf,.doc,.md" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload Note</button>
      </div>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;