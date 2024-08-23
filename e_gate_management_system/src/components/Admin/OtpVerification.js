import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import './OtpVerification.css';  // Updated CSS

const OtpVerification = ({handleSendOtp, otp, setOtp, onSubmit, loading, error, setShowOtpBox, setShowExpiresMsg }) => {
    const [timeLeft, setTimeLeft] = useState(10); // 10 seconds for demonstration
    const [email, setEmail] = useState(''); // State for email
    const [otpSent, setOtpSent] = useState(false); // State to check if OTP has been sent
    
    useEffect(() => {
        if (timeLeft <= 0) {
            setShowExpiresMsg(true);
            setShowOtpBox(false); 
            return;
        }
        
        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, setShowOtpBox]);

    const handleSendOtpStatus = () => {
        
              if(handleSendOtp(email)){
                setOtpSent(true);  
                setTimeLeft(10); 
              }
            
          
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div className="otp-modal-overlay">
            <div className="otp-modal">
                <h2 className="otp-title">OTP Verification</h2>

                {!otpSent ? (
                    <div className="send-otp-container">
                        <div className="input_group">
                            <label className='email-label' htmlFor="email">Enter your email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                className="email-input"
                                onChange={(e) => setEmail(e.target.value)}
                                aria-label="Email"
                                placeholder="Enter your email here"
                            />
                        </div>
                       <div className="btn-body">
                       {error && <p className="error-message">{error}</p>}
                       <button
                        
                        type="button"
                        className="send-otp-btn"
                        onClick={handleSendOtpStatus}
                        aria-label="Send OTP"
                    >
                        Send OTP
                    </button>
                       </div>
                    </div>
                ) : (
                    <form className="otp-form" onSubmit={handleSubmit}>
                        {loading ? (
                            <Loading />
                        ) : (
                            <div>
                                <div className="input_group">
                                    <label className='otp-label' htmlFor="otp">Enter OTP:</label>
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
                )}
            </div>
        </div>
    );
};

export default OtpVerification;
