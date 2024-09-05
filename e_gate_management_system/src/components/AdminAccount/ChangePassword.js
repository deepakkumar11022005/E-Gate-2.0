import React, { useState } from 'react';
import Loading from '../Admin/Loading';
import Message from '../Admin/Message';
import './ChangePassword.css';  // Ensure this path is correct
 
import OtpVerification from '../Admin/OtpVerification';
const ChangePassword = ({
    verifyAndChangePassword,
    setOldPassword,
    changePassword,
    setConfirmPassword,
    setNewPassword,
    sendOtp,
    verifyOtp,
    oldPassword,
    newPassword,
    confirmPassword,
    loading,
    otp,
    error,
    setOtp,
    setError
}) => {
    const [showMessage, setShowMessage] = useState(false);
    const [step, setStep] = useState(1);
    const [showOtpBox, setShowOtpBox] = useState(false);
    const [passwordChangedMsg, setPasswordChangedMsg] = useState(false);
      const [togetEmailOrNot,setTogetEmailOrNot]=useState(false)
    // Handle password submission logic
    const handlePasswordSubmit = async () => {
        try {
            if (newPassword !== confirmPassword) {
                setError('New password and confirm password do not match.');
                return;
            }
            const isValid = await verifyAndChangePassword(oldPassword, newPassword);
            if (!isValid) {
                // Show message if the old password is incorrect
                setShowMessage(true);
            } else {
                // If password change is successful
                setPasswordChangedMsg(true);
            }
        } catch (err) {
            setError('An error occurred while processing your request.');
        }
    };

   
    const handleOtpSubmit = async () => {
        try {
            const isOtpValid = await verifyOtp(otp);
            if (isOtpValid) {
                setPasswordChangedMsg(true);
                setShowOtpBox(false);
                setStep(1);
                setError(null);
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (err) {
            setError('An error occurred while verifying the OTP.');
        }
    };

    // Handle "Ok" action when password is incorrect
    const handleOkMessage = async () => {
        setShowMessage(false);
        await sendOtp();  // Send OTP to email
        setStep(2);  // Move to OTP step
        setShowOtpBox(true);  // Show OTP box
    };

    // Handle "Cancel" action
    const handleCancelMessage = () => {
        setError(null);
        setShowMessage(false);
        setStep(1);   
        setShowOtpBox(false);
    };
    

    // Handle password changed success message
    const handleOkOfPwdChanged = () => {
        setPasswordChangedMsg(false);
    };

    return (
        <div className="edit-pwd-container">
            <h2 className="title">Change Password</h2>

            {/* Show message when password is incorrect */}
            {showMessage && (
                <Message
                    message="Incorrect old password. Are you sure you want to send an OTP to your email?"
                    buttons={[
                        { label: 'Ok', onClick: handleOkMessage, className: 'ok-btn' },
                        { label: 'Cancel', onClick: handleCancelMessage, className: 'close-btn' }
                    ]}
                />
            )}

            {/* Show message when password is changed successfully */}
            {passwordChangedMsg && (
                <Message
                    message="Password changed successfully!"
                    buttons={[
                        { label: 'Ok', onClick: handleOkOfPwdChanged, className: 'ok-btn' }
                    ]}
                />
            )}

            {loading ? <Loading /> : (
                <div>
                     
                    {step === 1 && (
                        <form onSubmit={(e) => { e.preventDefault(); handlePasswordSubmit(); }}>
                            <div className="form-group">
                                <label htmlFor="oldPassword">Old Password</label>
                                <input
                                    type="password"
                                    id="oldPassword"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                    placeholder='Enter Old Password here'
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPassword">New Password</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    placeholder='Enter New Password here'
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm New Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder='Confirm New Password here'
                                />
                            </div>
                            <button type="submit" className="change-pwd-btn" disabled={loading}>
                                Change Password
                            </button>
                        </form>
                    )}

              
                    {step === 2 && showOtpBox && (
                        <>
                         
                        <OtpVerification
                            otp={otp}
                            setOtp={setOtp}
                            onSubmit={handleOtpSubmit}
                            loading={loading}
                            error={error}
                            setShowOtpBox={setShowOtpBox}
                            togetEmailOrNot={togetEmailOrNot}
                            handleCloseModal={handleCancelMessage}
                        /> 
                        
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChangePassword;
