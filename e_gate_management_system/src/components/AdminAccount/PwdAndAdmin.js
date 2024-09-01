import React from 'react';
import ChangePassword from './ChangePassword';
import AddAdmin from './AddAdmin';
import './PwdAndAdmin.css';

const PwdAndAdmin = ({
  setConfirmPassword,
  setOldPassword,
  oldPassword,
  newPassword,
  otp,
  setOtp,
  confirmPassword,
  setNewPassword,
  verifyAndChangePassword,
  sendOtp,
  changePassword,
  verifyOtp,
  loading,
  error,
  setError,
  newAdminEmail,
  setNewAdminEmail,
  handleAddAdmin,
  addAdminError,
  setAddAdminError,
  addAdminLoading,
  AddAdminMsg,
  setAddAdminMsg,
  setAddAdminLoading,
}) => {
  return (
    <div className="container-flex">
      <ChangePassword
        verifyAndChangePassword={verifyAndChangePassword}
        sendOtp={sendOtp}
        verifyOtp={verifyOtp}
        oldPassword={oldPassword}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        otp={otp}
        setNewPassword={setNewPassword}
        setOldPassword={setOldPassword}
        setConfirmPassword={setConfirmPassword}
        setOtp={setOtp}
        loading={loading}
        error={error}
        setError={setError}
        changePassword={changePassword}
      />
      <AddAdmin
        newAdminEmail={newAdminEmail}
        setNewAdminEmail={setNewAdminEmail}
        handleAddAdmin={handleAddAdmin}
        error={error}
        addAdminLoading={addAdminLoading}
        addAdminError={addAdminError}
        setAddAdminError={setAddAdminError}
        AddAdminMsg={AddAdminMsg}
        setAddAdminMsg={setAddAdminMsg}
        setAddAdminLoading={setAddAdminLoading}
      />
    </div>
  );
};

export default PwdAndAdmin;
