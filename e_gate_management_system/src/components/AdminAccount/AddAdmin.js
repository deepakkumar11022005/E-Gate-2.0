import React, { useEffect } from 'react';
import './AddAdmin.css';

const AddAdmin = ({
  newAdminEmail,
  setNewAdminEmail,
  handleAddAdmin,
  addAdminError,
  setAddAdminError,
  addAdminLoading,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddAdmin(newAdminEmail);
  };

  useEffect(() => {
    if (addAdminError) {
      const timer = setTimeout(() => {
        setAddAdminError(false);
      }, 3000); // Hides the error message after 3 seconds

      return () => clearTimeout(timer); // Cleanup timeout if the component unmounts
    }
  }, [addAdminError, setAddAdminError]);

  return (
    <div className="add-admin-container">
      {addAdminError && (
        <div className="error-message">An error occurred. Please try again.</div>
      )}
      <h2 className="title">Add Admin</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="input_group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
            placeholder="Enter admin email"
            className="email_input"
            required
            aria-label="add Admin"
          />
        </div>
        <div className="rules">
          <h4>Terms and Conditions Apply *</h4>
          <p>
            As an authorized personnel, you are responsible for adding an Admin. Ensure
            that the individual meets all necessary criteria. A confirmation email will
            be sent to the provided email address above, granting all the necessary
            rights. You will face all consequences of this action.
          </p>
        </div>
        <button type="submit" className="add-admin-btn">
          {addAdminLoading ? 'Adding...' : 'Add Admin'}
        </button>
      </form>
    </div>
  );
};

export default AddAdmin;
