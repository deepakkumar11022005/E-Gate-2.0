import React from 'react';
import './Message.css';

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
                className={index === 0 ? 'red-btn' : index === buttons.length - 1 ? 'blue-btn' : ''}
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
