import React, { useEffect, useState } from 'react';
import Loading from '../Admin/Loading';
import Message from '../Admin/Message';
import './ChangePassword.css';  // Ensure this path is correct
import OtpVerification from './OtpVerification';

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
    const [showExpiresMsg, setShowExpiresMsg] = useState(false);
    const [passwordChangedMsg,setPasswordChangedMsg]=useState(false);
    // useEffect(()=>{

    // },[showExpiresMsg,showMessage]);

    const handlePasswordSubmit = async () => {
        try {
            if (newPassword !== confirmPassword) {
                setError('New password and confirm password do not match.');
                return;
            }
            else{
            const isValid = await verifyAndChangePassword(oldPassword,newPassword,confirmPassword);
            if (isValid) {
                
                await sendOtp();
                setStep(2);
                setShowOtpBox(true);
                setError(null);
            } else {
                // setError('Incorrect old password.');
                setShowMessage(true);
            }
        }
        } catch (err) {
            setError('An error occurred while processing your request.');
        }
    };

    const handleOtpSubmit = async () => {
        try {
            const isOtpValid = await verifyOtp(otp);
            if (isOtpValid) {
                await changePassword(newPassword);
                setStep(1);
                setPasswordChangedMsg(true);
                setShowOtpBox(false);
                setError(null);
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (err) {
            setError('An error occurred while verifying the OTP.');
        }
    };

    const handleOkMessage = async () => {
        setShowMessage(false);
        await sendOtp();
        setStep(2);
        setShowOtpBox(true);
    };

    const handleCancelMessage = () => {
        setError(null);
        setShowMessage(false);
        setStep(1);
    };

    const handleExpireMsg = () => {
        setStep(1);
        setShowMessage(false);
        setShowExpiresMsg(false);
    };

    const handleOkOfPwdChanged= ()=>{
        setPasswordChangedMsg(false);
    }
    return (
        <div className="edit-pwd-container">
            <h2 className="title">Change Password</h2>
            {showMessage && (
                <Message
                    message="Incorrect old password. Are you sure you want to send an OTP to your email?"
                    buttons={[
                        { label: 'Ok', onClick: handleOkMessage, className: 'ok-btn' },
                        { label: 'Cancel', onClick: handleCancelMessage, className: 'close-btn' }
                    ]}
                />
            )}
            {passwordChangedMsg && (
                <Message
                message="Password changed successfully!"
                buttons={[
                    { label: 'Ok', onClick: handleOkOfPwdChanged , className: 'ok-btn'}
                ]}
            />
            )}
            {loading ? <Loading/>:(
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
                    {/* {error && <p className="error">{error}</p>} */}
                    <button type="submit" className="change-pwd-btn" disabled={loading}>
                        {/* {loading ? <Loading /> : 'Change Password'}
                         */}
                         Change Password
                    </button>
                </form>
            )}
            {step === 2 && showOtpBox ? (
                <OtpVerification
                    otp={otp}
                    setOtp={setOtp}
                    onSubmit={handleOtpSubmit}
                    loading={loading}
                    error={error}
                    setShowOtpBox={setShowOtpBox}
                    setShowExpiresMsg={setShowExpiresMsg}
                />
            ) : (
                showExpiresMsg && (
                    <Message
                        message="Timer expired! Please request for OTP again."
                        buttons={[
                            { label: 'Ok', onClick: handleExpireMsg, className: 'ok-btn' }
                        ]}
                    />
                )
            )}
            </div>
        )}
        </div>
    );
};

export default ChangePassword;
