import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LeftSidebar from '../components/Login/LeftSidebar';
import LoginForm from '../components/Login/LoginForm';
import OtpVerification from '../components/Admin/OtpVerification';
import Message from '../components/Admin/Message';

const Login = ({ onLogin, API_URL, setLoggedEmail }) => {
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showOtpBox, setShowOtpBox] = useState(false);
    const [uniqueId, setUniqueId] = useState(null);
    const [passwordChangedMsg, setPasswordChangedMsg] = useState(false);
    const [roleUrl, setRoleUrl] = useState('');
    const [showExpiresMsg, setShowExpiresMsg] = useState(false);
    const [loadingOtp,setLoadingOtp]=useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname.includes('/admin')) {
            setRole('admin');
        } else if (location.pathname.includes('/entry')) {
            setRole('Entry');
        }
        setRoleUrl(role === "Entry" ? "/kce/entry/login" : "/auth/login");
    }, [location, role]);

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}${roleUrl}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const commonResponse = await response.json();
            if (response.ok) {
                setLoggedEmail(email);
                onLogin(role, commonResponse.data, email);
            } else {
                setError(commonResponse.errorMessage);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword =  () => {
        setShowOtpBox(true);
        
    };

    const handleSendOtp= async( email)=>{
       setLoadingOtp(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/auth/pwd/forgot?email=${email}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
               return true;

            } else {
                const data = await response.json();
                setError(data.errorMessage || 'Failed to send OTP');
                return false;
            }
        } catch (error) {
            setError('Something went wrong, please try again.');
            return false
        } finally {
            setLoadingOtp(false);
        }
    }

    const handleVerifyOtp = async (email, otp) => {
        setLoadingOtp(true);

        try {
            const response = await fetch(`${API_URL}/auth/pwd/otp/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });

            const commonResponse = await response.json();
            if (response.ok) {
                setUniqueId(commonResponse.data);
                return true;
            } else {
                setError(commonResponse.errorMessage);
                return false;
            }
        } catch (error) {
            setError(error.message);
            return false;
        } finally {
            setLoadingOtp(false);
        }
    };

    const handleChangePassword = async (email, newPassword) => {
        setLoadingOtp(true);

        try {
            const response = await fetch(`${API_URL}/auth/pwd/change/${uniqueId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email:email, password: newPassword })
            });

            const commonResponse = await response.json();
            if (response.ok) {
                setPasswordChangedMsg(true);
                setShowOtpBox(false);
                if (role === 'admin') {
                    navigate('/admin/home');
                } else if (role === 'Entry') {
                    navigate('/entry');
                }
            } else {
                setError('Password not changed. Please try again!');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoadingOtp(false);
        }
    };

    const handleOkMessage = () => {
        setError('');
    };

    const handleExpireMsg = () => {
        setShowExpiresMsg(false);
    };

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
                <Message
                    message="Time expired. Please try again!"
                    buttons={[{ label: 'Ok', onClick: handleExpireMsg, className: 'ok-btn' }]}
                />
            )}

            {showOtpBox && (
                <OtpVerification
                    otp={otp}
                    setOtp={setOtp}
                    error={error}
                    loading={loadingOtp}
                    setError={setError}
                    onSubmit={handleVerifyOtp}
                    setShowExpiresMsg={setShowExpiresMsg}
                    setShowOtpBox={setShowOtpBox}
                    handleSendOtp={handleSendOtp}
                    handleChangePassword={handleChangePassword}
                />
            )}

            {passwordChangedMsg && (
                <Message
                    message="Password successfully changed"
                    buttons={[{ label: 'Ok', onClick: () => setPasswordChangedMsg(false), className: 'ok-btn' }]}
                />
            )}

            {error && (
                <Message
                    message={error}
                    buttons={[{ label: 'Ok', onClick: handleOkMessage, className: 'ok-btn' }]}
                />
            )}
        </div>
    );
};

export default Login;
