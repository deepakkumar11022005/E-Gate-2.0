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
  handleSearch,
  batchLoading,
  selectedBatch,
  setSelectedBatch
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

          <div className="form-group">
            <label htmlFor="batch">Batch:</label>
            <select
              id="batch"
              name="batch"
              value={selectedBatch}
              onChange={(e) => handleInputChange(e, setSelectedBatch)}
            >
              <option value="">Select Batch</option>
              {batchLoading ? (
                <option disabled>Loading...</option>
              ) : (
                batch.map((obj) => (
                  <option key={obj.batchName} value={obj.batchName}>
                    {obj.batchName}
                  </option>
                ))
              )}
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
