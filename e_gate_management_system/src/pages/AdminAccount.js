import React, { useState } from 'react';
import Header from '../components/Admin/Header';
import AdminInfo from '../components/AdminAccount/AdminInfo';
import PwdAndAdmin from '../components/AdminAccount/PwdAndAdmin';
import Footer from '../components/Admin/Footer';

const AdminAccount = ({ API_URL, email, handleLogout, token }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addAdminError, setAddAdminError] = useState(null);
  const [addAdminLoading, setAddAdminLoading] = useState(false);
  const [uniqueId, setUniqueId] = useState('');
  const [AddAdminMsg, setAddAdminMsg] = useState('');

  // Function to verify the old password and change it to the new password
  const verifyAndChangePassword = async (oldPassword, newPassword) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/kce/admin/pwd/change`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email, oldPassword, newPassword })
      });

      const data = await response.json();

      if (response.ok) {
        setError(null);
        return true;
      } else {
        // setError(data.errorMessage || "Failed to change password.");
        return false;
      }
    } catch (error) {
      // Log any unexpected errors
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Function to send OTP to the email
  const sendOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/pwd/forgot?email=${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setError(null);
      } else {
        const data = await response.json();
        setError(data.errorMessage || "Failed to send OTP.");
      }
    } catch (error) {
      // Log any unexpected errors
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to change the password after OTP verification
  const changePasswordAfterOtpverification = async (newPassword, uniqueId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/pwd/change/${uniqueId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password: newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setError(null);
        return true;
      } else {
        setError(data.errorMessage || "Failed to change password after OTP verification.");
        return false;
      }
    } catch (error) {
      // Log any unexpected errors
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Function to verify OTP
  const verifyOtp = async (otp) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/pwd/otp/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        const commonResponse = await response.json();
        setUniqueId(commonResponse.data);
        setError(null);

        // Proceed to change password after OTP verification
        const status = await changePasswordAfterOtpverification(newPassword, commonResponse.data);
        if (status) {
          return true;
        } else {
          setError("Password change failed. Please try again.");
          return false;
        }
      } else if (response.status === 500) {
        // Handle 500 Internal Server Error
        setError("Server error occurred while verifying OTP. Please try again later.");
        console.error("Internal Server Error: ", await response.text()); // Log detailed server error (if any)
        return false;
      } else {
        const data = await response.json();
        setError(data.errorMessage || "OTP verification failed. Please check the OTP and try again.");
        return false;
      }
    } catch (error) {
      // Log any unexpected errors
      setError("An unexpected error occurred. Please try again.");
      console.error("Error verifying OTP: ", error); // Log detailed error for debugging
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Function to handle adding a new admin
  const handleAddAdmin = async (newAdminEmail) => {
    setAddAdminLoading(true);
    try {
      const response = await fetch(`${API_URL}/kce/admin/add?email=${newAdminEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const commonResponse = await response.json();

      if (response.ok) {
        setAddAdminError('');
        setAddAdminMsg(commonResponse.successMessage);
        return true;
      } else {
        setAddAdminError(commonResponse.errorMessage || "Failed to add new admin.");
        return false;
      }
    } catch (error) {
      setAddAdminError(error.message || "An unexpected error occurred.");
      return false;
    } finally {
      setAddAdminLoading(false);
    }
  };

  return (
    <div>
      <Header handleLogout={handleLogout} />
      <AdminInfo email={email} />
      <PwdAndAdmin
        verifyAndChangePassword={verifyAndChangePassword}
        handleAddAdmin={handleAddAdmin}
        sendOtp={sendOtp}
        verifyOtp={verifyOtp}
        loading={loading}
        error={error}
        setError={setError}
        newAdminEmail={newAdminEmail}
        setNewAdminEmail={setNewAdminEmail}
        setOldPassword={setOldPassword}
        oldPassword={oldPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        setConfirmPassword={setConfirmPassword}
        confirmPassword={confirmPassword}
        addAdminError={addAdminError}
        setAddAdminError={setAddAdminError}
        otp={otp}
        setOtp={setOtp}
        setAddAdminLoading={setAddAdminLoading}
        addAdminLoading={addAdminLoading}
        AddAdminMsg={AddAdminMsg}
        setAddAdminMsg={setAddAdminMsg}
      />
      <Footer />
    </div>
  );
};

export default AdminAccount;
