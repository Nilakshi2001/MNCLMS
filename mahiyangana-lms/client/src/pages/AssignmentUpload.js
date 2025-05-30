import React, { useState } from 'react';

function AssignmentUpload() {
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState('');

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('subject', subject);

    // TODO: axios.post('http://localhost:5000/api/assignments/upload', formData)
    alert('Assignment uploaded (mock)');
  };

  return (
    <div>
      <h2>Upload Assignment</h2>
      <input placeholder="Subject" onChange={(e) => setSubject(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default AssignmentUpload;
