// pages/Login.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LeftSidebar from '../components/Login/LeftSidebar';
import LoginForm from '../components/Login/LoginForm';
import OtpVerification from '../components/Admin/OtpVerification';
import Error from '../components/Admin/Error';
import Message from '../components/Admin/Message';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const { pathname } = location;
    const [showOtpBox, setShowOtpBox] = useState(false);
    const [showExpiresMsg, setShowExpiresMsg] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        // e.preventDefault();
        try {

            const response = await fetch("url", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            if (response.ok) {
                const data = await response.json();
                if (data.status === 'success') {
                    /// login boolean value
                }
            }
            else {
                // setError('Invalid credentials');
                onLogin()
            }
        } catch (Error) {
            setError(Error.message);
            onLogin();

        }
        finally {
            setLoading(false);
        }

    };

    const handleForgotPassword = async () => {
        setShowOtpBox(true);
        setLoading(true);
        try {
            const response = await fetch("url", {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                body: null
            });
            if (response.ok) {
                const data = await response.json();
                if (data.status === 'success') {
                    setShowOtpBox(true);
                }
                else {
                    setError('Failed to send OTP');

                }
            }
        }
        catch (Error) {
            // setError("Something went wrong!,Please try again");
        }
        finally {
            setLoading(false);
        }

    };
    const handleVerifyOtp = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (otp === '1234') { // Replace with actual OTP verification logic
                console.log('OTP verified successfully');
                setShowOtpBox(false);
                setShowExpiresMsg(false);
                // Proceed with password reset or further actions
            } else {
                setError('Invalid OTP. Please try again.');
            }
        }, 1000); // Simulate an API call with a timeout
    };
    const handleOkMessage = () => {
        setError('');
    };
    const handleExpireMsg = () => {
        setShowExpiresMsg(false);
    };
    const handleSendOtp = async(email)=>{
        setLoading(true);
        try {
            const response = await fetch("ahdebwd/email", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: null
            });
            if (response.ok) {
                const data = await response.json();
                if (data.status === 'success') {
                     return true;
                }
                else {
                    setError('Failed to send OTP');
                    return false;
                }
            }
        }
        catch (Error) {
            setError("Something went wrong!,Please try again");
            return false;
        }
        finally {
            setLoading(false);
        }
    }
    
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Helmet>
                <title>Login | E-Gate Management System</title>
            </Helmet>

            <LeftSidebar />

            <LoginForm
                onSubmit={handleLogin}
                onForgotPassword={handleForgotPassword}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
            
            />
            {showExpiresMsg && (

                <Message message={"Time expired Please try again !"}
                    buttons={[
                        { label: 'Ok', onClick: handleExpireMsg, className: 'ok-btn' }
                    ]}
                />
            )}

            {showOtpBox && (
                <OtpVerification
                    otp={otp}
                    setOtp={setOtp}
                    error={error}
                    setError={setError}
                    onSubmit={handleVerifyOtp}
                    setShowExpiresMsg={setShowExpiresMsg}
                    setShowOtpBox={setShowOtpBox}
                    handleSendOtp={handleSendOtp}
                />
            )}
            {/* {showMessage && (
                <Message
                    message={message}
                    setMessage={setMessage}
                />
            )} */}
            {error && <Message message={error}
                buttons={[
                    { label: 'Ok', onClick: handleOkMessage, className: 'ok-btn' }
                ]}
            />}
        </div>
    );
};

export default Login;
