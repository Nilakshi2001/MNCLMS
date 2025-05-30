import React, { useState } from 'react';

function Notifications() {
  const [message, setMessage] = useState('');

  const sendNotification = () => {
    // TODO: axios.post('http://localhost:5000/api/notifications', { message })
    alert('Notification sent (mock)');
  };

  return (
    <div>
      <h2>Send Notification</h2>
      <textarea 
        rows="5" 
        cols="50" 
        placeholder="Type your message here..." 
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button onClick={sendNotification}>Send</button>
    </div>
  );
}

export default Notifications;
