import React, { useState, useEffect } from 'react';
import './EntryMessage.css';

const EntryMessage = ({ message }) => {
  return (
    <div className="message-dialog-overlay">
      <div className="message-dialog-content">
        <h2>Message</h2>
        <div className="message-body">
          <p>{message || 'Try Again'}</p>
        </div>
      </div>
    </div>
  );
}

export default EntryMessage;
