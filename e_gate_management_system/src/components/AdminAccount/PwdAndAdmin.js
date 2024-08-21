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
  verifyOldPassword,
  sendOtp,
  changePassword,
  verifyOtp,
  loading,
  error,
  setError,
  newAdminEmail,
  setNewAdminEmail,
  handleAddAdmin
}) => {
  return (
    <div className="container-flex">
      <ChangePassword
        verifyOldPassword={verifyOldPassword}
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
        loading={loading}
        setError={setError}
      />
    </div>
  );
};

export default PwdAndAdmin;
