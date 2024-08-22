import React from 'react';
import '../../pages/Login.css'
const WelcomeSection = () => (
    <div className="welcome-section">
        <img src="../images/IdCard.png" alt="ID Card" className="id-card-image" />
        <h1 className="welcome-title">E-Gate Management System</h1>
        <p className="welcome-text">
            Welcome to the E-Gate Management System. This system is designed to manage and track the entry
            and exit of Students and Faculties. It provides a secure and efficient way to manage access and monitor activity.
        </p>
    </div>
);

export default WelcomeSection;
