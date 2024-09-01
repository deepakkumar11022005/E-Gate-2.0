// pages/Login.js
import React, { useState, useEffect } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LeftSidebar from '../components/Login/LeftSidebar';
import LoginForm from '../components/Login/LoginForm';
import OtpVerification from '../components/Admin/OtpVerification';
import Error from '../components/Admin/Error';
import Message from '../components/Admin/Message';

const Login = ({ onLogin, API_URL, token, setToken ,setLoggedEmail}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState(0);
    const [error, setError] = useState('');
    // const [showMessage, setShowMessage] = useState(false);
    // const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const { pathname } = location;
    const [showOtpBox, setShowOtpBox] = useState(false);
    const [showExpiresMsg, setShowExpiresMsg] = useState(false);
    const [uniqueId, setUniqueId] = useState(null);
    const [role, setRole] = useState("");
    const [PasswordChangedMsg, setPasswordChangedMsg] = useState(false);
    const [roleUrl, setRoleUrl] = useState("");
    useEffect(() => {

        if (location.pathname.includes('/admin')) {
            setRole('admin');
        } else if (location.pathname.includes('/entry')) {
            setRole('Entry');
        }
    }, [location]);

    const handleLogin = async () => {
        setLoading(true);
        // e.preventDefault();
        try {

            if (role === "Entry") setRoleUrl("/kce/entry/login");
            else setRoleUrl("/auth/login");

            const response = await fetch(`${API_URL}${roleUrl}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password })
            });
            const commonResponse = await response.json();
            if (response.ok  ) {

                setLoggedEmail(email);
                setToken((commonResponse.data));
                onLogin();
            }
            else {
                setError(commonResponse.errorMessage);
            }
        } catch (Error) {
            setError(Error.message);
        }
        finally {
            setLoading(false);
        }

    };

    const handleForgotPassword = async () => {
        setShowOtpBox(true);
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}`, {
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
            setError("Something went wrong!,Please try again");
        }
        finally {
            setLoading(false);
        }

    };
    const handleVerifyOtp = async (email, otp) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/pwd/otp/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, otp: otp })
            })
            const commonResponse = await response.json()
            if (response.ok) {
                setUniqueId(commonResponse.data);
                return true;
            }
            else {
                setError(commonResponse.errorMessage);
                return false;
            }
        }
        catch (error) {
            setError(error.message);
            return false;
        }

    };
    const handleOkMessage = () => {
        setError('');
    };
    const handleExpireMsg = () => {
        setShowExpiresMsg(false);
    };
    const handleSendOtp = async (email) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/pwd/forgot?email=${email}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }

            });
            const commonResponse = await response.json();
            if (response.ok) {
                
                return true;
            }
            else {
                setError(commonResponse.errorMessage);
                return false;
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

    const handleChangePassword = async (email, newPassword) => {
        setLoading(true);
        try {

            const response = await fetch(`${API_URL}/${uniqueId}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email, password: newPassword })
                }
            )
            const commonResponse = await response.json();
            if (response.ok) {
                setPasswordChangedMsg(true); /// to send msg
                const navigate = navigate();
                if (role === 'admin') {
                    navigate('/admin/home');
                } else if (role === 'Entry') {
                    navigate('/entry');
                }
            }
            else {
                setError("Password not changed. Please try again !");
            }
        }
        catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    const handelPasswordChangedMsg = () => {
        setPasswordChangedMsg(false);
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
                loading={loading}

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
                    handleChangePassword={handleChangePassword}
                />
            )}
            {PasswordChangedMsg && (
                <Message
                    message={"Password  Successfully changed"}
                    buttons={[
                        { label: 'Ok', onClick: handelPasswordChangedMsg, className: 'ok-btn' }
                    ]}
                />
            )}
            {error && <Message message={error}
                buttons={[
                    { label: 'Ok', onClick: handleOkMessage, className: 'ok-btn' }
                ]}
            />}
        </div>
    );
};

export default Login;
