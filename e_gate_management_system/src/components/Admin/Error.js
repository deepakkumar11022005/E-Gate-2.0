import React from 'react';
import './Error.css'; // Import the CSS file for styling

const Error = ({ error, onClose }) => {
  return (
    <div className="error-dialog-overlay">
      <div className="error-dialog-content">
        <h2>Error</h2>
        <p>{error || 'An unexpected error has occurred.'}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Error;

