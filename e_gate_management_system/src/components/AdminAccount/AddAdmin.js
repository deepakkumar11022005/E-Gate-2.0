import React, { useEffect, useState } from 'react';
import './AddAdmin.css';
import Message from '../Admin/Message';
import Error from '../Admin/Error';

const AddAdmin = ({
  newAdminEmail,
  setNewAdminEmail,
  handleAddAdmin,
  addAdminError,
  setAddAdminError,
  addAdminLoading,
  AddAdminMsg,
  setAddAdminMsg,
  setAddAdminLoading
}) => {
  const [AddAdminMsgSuccess, setAddAdminMsgSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleAddAdmin(newAdminEmail);
    if (success)  {
      setAddAdminError(null);
      setNewAdminEmail("");
      setAddAdminLoading(false);
      setAddAdminMsgSuccess(true);
    }
    else {
      setAddAdminLoading(false);
      // setAddAdminError("Invalid Email");
    }
  };

 


  const handleOkMessage = () => {
    setAddAdminMsgSuccess(false);
    setAddAdminMsg(null);
  }
  const handleCancelMessage = () => {
    setAddAdminError(null);
  }
  return (
    <div className="add-admin-container">
      {AddAdminMsgSuccess && <Message
        message={AddAdminMsg}
        buttons={[
          { label: 'Ok', onClick: handleOkMessage, className: 'ok-btn' }
        ]}
      />}
      {addAdminError && (
         <Error error={addAdminError} onClose={handleCancelMessage}/>
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
        <button   className="add-admin-btn">
          {addAdminLoading ? 'Adding...' : 'Add Admin'}
        </button>
      </form>
    </div>
  );
};

export default AddAdmin;
