import React from 'react';
 import '../../pages/Login.css'
import WelcomeSection from './WelcomeSection';

const LoginForm = () => (
    <div className="login-container">
        <div className="left-sidebar">
            <WelcomeSection />
        </div>
        <div className="login-right-box">
            <form className="login-form">
                <input type="email" placeholder="Email" className="input-field" />
                <input type="password" placeholder="Password" className="input-field" />
                <button type="submit" className="submit-button">Login</button>
                <div className="divider">or</div>
                <button className="google-button">
                    <svg width="20" height="20" viewBox="0 0 48 48">
                        <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 34.7 30.6 39 24 39c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.2 0 5.9 1.2 8 3.1l6.4-6.4C34.5 7.2 29.6 5 24 5 13.5 5 5 13.5 5 24s8.5 19 19 19c10.1 0 18.5-8.2 18.5-18.5 0-1.3-.1-2.6-.3-3.8z"/>
                    </svg>
                    Continue with Google
                </button>
                <a href="#" className="forgot-password">Forgot Password?</a>
            </form>
        </div>
    </div>
);

export default LoginForm;
