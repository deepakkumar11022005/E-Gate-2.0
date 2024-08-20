import React from 'react';
import './Main.css';

const Main = ({todayEntryInCount,todayEntryOutCount,studentEntryInCount,studentEntryOutCount,staffEntryInCount,staffEntryOutCount}) => {
    if(todayEntryInCount<10) todayEntryInCount+="0";
    if(todayEntryOutCount<10) todayEntryOutCount+="0";
    if(studentEntryInCount<10) studentEntryInCount+="0";
    if(studentEntryOutCount<10) studentEntryOutCount+="0";
    if(staffEntryInCount<10) staffEntryInCount+="0";
    if(staffEntryOutCount<10) staffEntryOutCount+="0";
        
    return (
        <main className="container-fluid  content">
            <div  className='home-content'>
                <h1>Welcome to the Admin Dashboard</h1>
                <p>E-Gate is an access management system for faculty and students, streamlining entry, exit, and real-time movement tracking.
</p>
            </div>
            
            <div className="TodayData">
                <div className="dialogue-box">
                    <h3>Total</h3>
                    <p>In Count: <span className="count">{todayEntryInCount}</span></p>
                    <p>Out Count: <span className="count">{todayEntryOutCount}</span></p>
                </div>

                <div className="dialogue-box">
                    <h3>Student</h3>
                    <p>In Count: <span className="count">{studentEntryInCount}</span></p>
                    <p>Out Count: <span className="count">{studentEntryOutCount}</span></p>
                </div>

                <div className="dialogue-box">
                    <h3>Staff</h3>
                    <p>In Count: <span className="count">{staffEntryInCount}</span></p>
                    <p>Out Count: <span className="count">{staffEntryOutCount}</span></p>
                </div>

                {/* <div className="dialogue-box">
                    <h3>Pharmacy/Nursing</h3>
                    <p>In Count: <span className="count">50</span></p>
                    <p>Out Count: <span className="count">40</span></p>
                </div> */}
            </div>
        </main>
    );
}

export default Main;
