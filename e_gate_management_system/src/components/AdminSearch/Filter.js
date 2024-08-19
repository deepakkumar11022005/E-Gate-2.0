import React from 'react';
import './Filter.css';

const Filter = () => {
  return (
    <div className="filter-container">
      <h2>Filter Records</h2>
      <form className="filter-form">
        <div className="form-row">
          {/* From Date */}
          <div className="form-group">
            <label htmlFor="fromDate">From Date:</label>
            <input type="date" id="fromDate" name="fromDate" />
          </div>

          {/* To Date */}
          <div className="form-group">
            <label htmlFor="toDate">To Date:</label>
            <input type="date" id="toDate" name="toDate" />
          </div>
        </div>

        <div className="form-row">
          {/* From Time */}
          <div className="form-group">
            <label htmlFor="fromTime">From Time:</label>
            <input type="time" id="fromTime" name="fromTime" />
          </div>

          {/* To Time */}
          <div className="form-group">
            <label htmlFor="toTime">To Time:</label>
            <input type="time" id="toTime" name="toTime" />
          </div>
        </div>

        <div className="form-row">
          {/* Roll Number */}
          <div className="form-group">
            <label htmlFor="rollNumber">Roll Number:</label>
            <input type="text" id="rollNumber" name="rollNumber" placeholder="Enter Roll Number" />
          </div>

          {/* Batch */}
          <div className="form-group">
            <label htmlFor="batch">Batch:</label>
            <select id="batch" name="batch">
              <option value="">Select Batch</option>
              <option value="batch1">Batch 1</option>
              <option value="batch2">Batch 2</option>
              {/* Add more batches as needed */}
            </select>
          </div>
        </div>
         <br />
        <div className="form-row">
          <button type="submit" className="filter-submit">Search</button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
