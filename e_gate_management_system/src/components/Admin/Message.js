import React from 'react';
import './Message.css';  // Ensure to import the CSS file

const Message = ({ message, buttons = [] }) => {
  return (
    <div className="message-dialog-overlay">
      <div className="message-dialog-content">
        <h2>Message</h2>
        <div className="message-body">
        <p>{message || 'Try Again'}</p>
        <div className="button-group">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={button.className || 'default-btn'}
            >
              {button.label}
            </button>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Message;