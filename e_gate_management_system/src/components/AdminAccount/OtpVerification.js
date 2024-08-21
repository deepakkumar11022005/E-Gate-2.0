import React, { useEffect, useState } from 'react';
import Loading from '../Admin/Loading';
import './OtpVerification.css';  // Updated CSS

const OtpVerification = ({ otp, setOtp, onSubmit, loading, setShowOtpBox ,setShowExpiresMsg}) => {
    const [timeLeft, setTimeLeft] = useState(10); // 90 seconds for 1.5 minutes

    useEffect(() => {
        if (timeLeft <= 0) {
            setShowExpiresMsg(true)
            setShowOtpBox(false); 
            return;
        }
        
        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, setShowOtpBox]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div className="otp-modal-overlay">
            <div className="otp-modal">
                <h2 className="otp-title">OTP Verification</h2>
                <form className="otp-form" onSubmit={handleSubmit}>
                    {loading ? (<Loading/>):(
                        <div className="">
                    <div className="input_group">
                        <label htmlFor="otp">Enter OTP:</label>
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
                         {/* {error && <p className="error-message">{error}</p>} */}
                    <button type="submit" className="verify-btn" aria-label="Verify OTP">
                        {/* {loading ? <Loading /> : 'Verify OTP'} */}
                        Verify OTP
                    </button>
                    </div>
                  
                    </div>
                    )};
                </form>
            </div>
        </div>
    );
};

export default OtpVerification;
