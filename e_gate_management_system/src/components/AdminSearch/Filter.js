import React from 'react';
import './Filter.css';
import Loading from '../Admin/Loading';
const Filter = ({
  fromDate,
  toDate,
  fromTime,
  toTime,
  batch,
  rollNumber,
  setFromDate,
  setToDate,
  setFromTime,
  setToTime,
  setRollNumber,
  setBatch,
  handleSearch,
  batchLoading
}) => {

   
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

 
  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="filter-container">
      <h2>Filter Records</h2>
      <form className="filter-form" onSubmit={onSubmit}>
        <div className="form-row">
          {/* From Date */}
          <div className="form-group">
            <label htmlFor="fromDate">From Date:</label>
            <input
              type="date"
              id="fromDate"
              name="fromDate"
              value={fromDate}
              onChange={(e) => handleInputChange(e, setFromDate)}
            />
          </div>

          {/* To Date */}
          <div className="form-group">
            <label htmlFor="toDate">To Date:</label>
            <input
              type="date"
              id="toDate"
              name="toDate"
              value={toDate}
              onChange={(e) => handleInputChange(e, setToDate)}
            />
          </div>
        </div>

        <div className="form-row">
          {/* From Time */}
          <div className="form-group">
            <label htmlFor="fromTime">From Time:</label>
            <input
              type="time"
              id="fromTime"
              name="fromTime"
              value={fromTime}
              onChange={(e) => handleInputChange(e, setFromTime)}
            />
          </div>

          {/* To Time */}
          <div className="form-group">
            <label htmlFor="toTime">To Time:</label>
            <input
              type="time"
              id="toTime"
              name="toTime"
              value={toTime}
              onChange={(e) => handleInputChange(e, setToTime)}
            />
          </div>
        </div>

        <div className="form-row">
          {/* Roll Number */}
          <div className="form-group">
            <label htmlFor="rollNumber">Roll Number:</label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={rollNumber}
              placeholder="Enter Roll Number"
              onChange={(e) => handleInputChange(e, setRollNumber)}
            />
          </div>

          {/* Batch */}
          <div className="form-group">
            <label htmlFor="batch">Batch:</label>
            <select
              id="batch"
              name="batch"
              value={batch}
              onChange={(e) => handleInputChange(e, setBatch)}
            >
              
              
              <option value="">Select Batch</option>
              {batchLoading ? (<Loading/>):(
                batch.map(( obj)=>{
                  <option value="batch1">(obj.batchName)</option>
                })
              
              
            )};
              {/* Add more batches as needed */}
            </select>
          </div>
        </div>
        <br />
        <div className="form-row">
          <button type="submit" className="filter-submit" onClick={onSubmit}>Search</button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
