import React from 'react';
import './Main.css';

const Main = ({
  todayEntryInCount,
  todayEntryOutCount,
  studentEntryInCount,
  studentEntryOutCount,
  staffEntryInCount,
  staffEntryOutCount
}) => {
  
  const formatCount = (count) => (count < 10 ? `0${count}` : count);

  return (
    <main className="container-fluid content">
      <div className="home-content">
        <h1>Welcome to the Admin Dashboard</h1>
        <p>
          E-Gate is an access management system for faculty and students,
          streamlining entry, exit, and real-time movement tracking.
        </p>
      </div>

      <div className="TodayData">
        <div className="dialogue-box">
          <h3>Total</h3>
          <p>
            In Count: <span className="count">{formatCount(todayEntryInCount)}</span>
          </p>
          <p>
            Out Count: <span className="count">{formatCount(todayEntryOutCount)}</span>
          </p>
        </div>

        <div className="dialogue-box">
          <h3>Student</h3>
          <p>
            In Count: <span className="count">{formatCount(studentEntryInCount)}</span>
          </p>
          <p>
            Out Count: <span className="count">{formatCount(studentEntryOutCount)}</span>
          </p>
        </div>

        <div className="dialogue-box">
          <h3>Staff</h3>
          <p>
            In Count: <span className="count">{formatCount(staffEntryInCount)}</span>
          </p>
          <p>
            Out Count: <span className="count">{formatCount(staffEntryOutCount)}</span>
          </p>
        </div>

        {/* <div className="dialogue-box">
          <h3>Pharmacy/Nursing</h3>
          <p>In Count: <span className="count">50</span></p>
          <p>Out Count: <span className="count">40</span></p>
        </div> */}
      </div>
    </main>
  );
};

export default Main;
