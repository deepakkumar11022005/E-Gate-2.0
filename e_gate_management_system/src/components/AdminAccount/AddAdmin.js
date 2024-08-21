import React, { useState } from 'react';
import './AddAdmin.css';

const AddAdmin = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting the traditional way
    console.log('Admin added with email:', email);

    setEmail('');
  };

  return (
    <div className="add-admin-container">
      <h2 className="title">Add Admin</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="input_group">
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter admin email"
            className="email_input"
            required
            aria-label="add Admin"
          />
        </div>
        <div className="rules">
          <h4> Terms and Condition Apply *</h4>
          <p>
            As an authorized personnel, you are responsible for adding an Admin. Ensure that the individual meets all necessary criteria. A confirmation email will be sent to the provided email address above, granting all the necessary rights. You will face all consequences of this action.
            </p>
        </div>
        <button type="submit" className="add-admin-btn">
          Add Admin
        </button>
      </form>
    </div>
  );
};

export default AddAdmin;
