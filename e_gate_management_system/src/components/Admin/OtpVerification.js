import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import './OtpVerification.css'; // Updated CSS

const OtpVerification = ({
  togetEmailOrNot=true,
  handleSendOtp,
  otp,
  setOtp,
  onSubmit,
  loading,
  error,
  setShowOtpBox,
  setShowExpiresMsg,
  handleChangePassword,
  handleCloseModal
}) => {
  const [timeLeft, setTimeLeft] = useState(5*60);  
  const [email, setEmail] = useState('');  
  const [otpSent, setOtpSent] = useState(false);  
  const [otpVerified, setOtpVerified] = useState(false);  
  const [newPassword, setNewPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState('');  

  useEffect(() => {
    if (timeLeft <= 0) {
      setShowExpiresMsg(true);
      setShowOtpBox(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, setShowOtpBox]);

  const handleSendOtpStatus = async () => {
    const response=await handleSendOtp(email);
    if (response) {
      setOtpSent(true);
      setTimeLeft(5*60);
    }
  };

  const handleOtpVerification = async(e) => {
    e.preventDefault();
    const response= await onSubmit(email, otp);
    if (response) {
      setOtpVerified(true);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await handleChangePassword(email, newPassword);
  };
 

  return (
    <div className="otp-modal-overlay">
      <div className="otp-modal">
         
        <button className="close-btn" onClick={handleCloseModal} aria-label="Close">
          &times;
        </button>
        
        <h2 className="otp-title">OTP Verification</h2>

        {!otpSent && togetEmailOrNot ? (
          <form onSubmit={handleSendOtpStatus}>
            <div className="send-otp-container">
              <div className="input_group">
                <label className="email-label" htmlFor="email">Enter your email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  required
                  className="email-input"
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email"
                  placeholder="Enter your email here"
                />
              </div>
              <div className="btn-body">
                {error && <p className="error-message">{error}</p>}
                <button
                  type="submit"
                  className="send-otp-btn"
                  aria-label="Send OTP"
                >
                  {loading ? ("Sending ..."):("Send OTP")}
                </button>
              </div>
            </div>
          </form>
        ) : !otpVerified ? (
          <form className="otp-form" onSubmit={handleOtpVerification}>
            {loading ? (
              <Loading />
            ) : (
              <div>
                <div className="input_group">
                  <label className="otp-label" htmlFor="otp">Enter OTP:</label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    className="otp-input"
                    onChange={(e) => setOtp(e.target.value)}
                    aria-label="OTP"
                    placeholder="Enter OTP here"
                  />
                </div>
                <div className="otp-note">
                  <h4>Note:</h4>
                  <p>OTP has been sent to your email. Please enter it before the timer expires.</p>
                  <p className="timer">
                    Time remaining: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                  </p>
                </div>
                <div className="btn-body">
                  {error && <p className="error-message">{error}</p>}
                  <button type="submit" className="verify-btn" aria-label="Verify OTP">
                    {loading ? 'Verifying ...' : 'Verify OTP'}
                  </button>
                </div>
              </div>
            )}
          </form>
        ) : togetEmailOrNot ? (
          <form className="otp-form" onSubmit={handlePasswordSubmit}>
            <div className="input_group">
              <label className="otp-label" htmlFor="new-password">New Password:</label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                className="otp-input"
                onChange={(e) => setNewPassword(e.target.value)}
                aria-label="New Password"
                placeholder="Enter new password here"
              />
            </div>
            <div className="input_group">
              <label className="otp-label" htmlFor="confirm-password">Confirm Password:</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                className="otp-input"
                onChange={(e) => setConfirmPassword(e.target.value)}
                aria-label="Confirm Password"
                placeholder="Confirm your new password"
              />
            </div>
            <div className="btn-body">
              <button type="submit" className="verify-btn" aria-label="Submit Password">
                {loading ? 'Submitting ...' : 'Submit'}
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default OtpVerification;
