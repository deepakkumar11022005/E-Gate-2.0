import React, { useState } from 'react';
import Header from '../components/Admin/Header';
import AdminInfo from '../components/AdminAccount/AdminInfo';
import PwdAndAdmin from '../components/AdminAccount/PwdAndAdmin';
import Footer from '../components/Admin/Footer';

const AdminAccount = ({ API_URL, email }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addAdminError ,setAddAdminError]=useState(null);
  const [addAdminLoading,setAddAdminLoading]=useState(false)
  const verifyAndChangePassword = async (oldPassword,newPassword,confirmPassword) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/verify-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, oldPassword }),
      });

      const data = await response.json();

      if (response.ok && data.ResponseStatus === 'SUCCESS') {
        return true;
      } else {
        setError(data.errorMessage || "Invalid old password");
        return false;
      }
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (newPassword) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      if (response.ok) {
        setError(null);
        // Handle success, e.g., logout or show a success message
      } else {
        const data = await response.json();
        setError(data.errorMessage || "Failed to change password");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setError(null);
        // Handle OTP sent success
      } else {
        const data = await response.json();
        setError(data.errorMessage || "Failed to send OTP");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (otp) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        setError(null);
        return true;
      } else {
        const data = await response.json();
        setError(data.errorMessage || "Invalid OTP");
        return false;
      }
    } catch (error) {
      setError(error.message);
      return true;
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async (newAdminEmail) => {
     setAddAdminLoading(true);
     try {
      const response = await fetch(`${API_URL}/admin/add-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
   
        setAddAdminError(null);
        return true;
      } else {
        const data = await response.json();
        setAddAdminError(data.errorMessage || "Something went Wrong! Please try Again");
        return false;
      }
    } catch (error) {
      setAddAdminError(error.message);
      return true;
    } finally {
      setAddAdminLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <AdminInfo email={email} />
      <PwdAndAdmin
        changePassword={changePassword}
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
        addAdminLoading={addAdminLoading}
        
      />
      <Footer />
    </div>
  );
};

export default AdminAccount;
