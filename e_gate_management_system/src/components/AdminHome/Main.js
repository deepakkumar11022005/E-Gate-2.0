import React from 'react';
import './Main.css';

const Main = () => {
    return (
        <main className="container-fluid  content">
            <div>
                <h1>Welcome to the Admin Dashboard</h1>
                <p>Manage entries efficiently, monitor activities, and streamline departmental oversight.</p>
            </div>
            
            <div className="TodayData">
                <div className="dialogue-box">
                    <h3>Total</h3>
                    <p>In Count: <span className="count">1200</span></p>
                    <p>Out Count: <span className="count">950</span></p>
                </div>

                <div className="dialogue-box">
                    <h3>Student</h3>
                    <p>In Count: <span className="count">900</span></p>
                    <p>Out Count: <span className="count">700</span></p>
                </div>

                <div className="dialogue-box">
                    <h3>Staff</h3>
                    <p>In Count: <span className="count">250</span></p>
                    <p>Out Count: <span className="count">200</span></p>
                </div>

                <div className="dialogue-box">
                    <h3>Pharmacy/Nursing</h3>
                    <p>In Count: <span className="count">50</span></p>
                    <p>Out Count: <span className="count">40</span></p>
                </div>
            </div>
        </main>
    );
}

export default Main;
