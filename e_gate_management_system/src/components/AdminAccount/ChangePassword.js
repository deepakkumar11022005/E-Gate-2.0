import React, { useState } from 'react';
import Loading from '../Admin/Loading';
import Error from '../Admin/Error.js';
import Message from '../Admin/Message';
import './ChangePassword.css';  // Ensure this path is correct
import OtpVerification from '../Admin/OtpVerification.js';

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
    const [step, setStep] = useState(1);
    const [showOtpBox, setShowOtpBox] = useState(false);
    const [togetEmailOrNot, setTogetEmailOrNot] = useState(false);
    const [passwordChangedMsg, setPasswordChangedMsg] = useState(false);

    const handlePasswordSubmit = async () => {
        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match.');
            return;
        }

        try {
            const isValid = await verifyAndChangePassword(oldPassword, newPassword);
            if (!isValid) {
                await sendOtp();
                setStep(2);
                setShowOtpBox(true);
            } else {
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

    const handleCloseErrorMsg = () => {
        setError(null);
    };

    const handleOkOfPwdChanged = () => {
        setPasswordChangedMsg(false);
    };

    return (
        <div className="edit-pwd-container">
            <h2 className="title">Change Password</h2>
            {error && <Error error={error} onClose={handleCloseErrorMsg} />}
            {passwordChangedMsg && (
                <Message
                    message="Password changed successfully!"
                    buttons={[
                        { label: 'Ok', onClick: handleOkOfPwdChanged, className: 'ok-btn' }
                    ]}
                />
            )}
            {loading ? <Loading /> : (
                <div className="">
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
                        <OtpVerification
                            otp={otp}
                            setOtp={setOtp}
                            onSubmit={handleOtpSubmit}
                            loading={loading}
                            error={error}
                            setShowOtpBox={setShowOtpBox}
                            togetEmailOrNot={togetEmailOrNot}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default ChangePassword;
