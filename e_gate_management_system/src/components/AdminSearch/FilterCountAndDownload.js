import React from 'react';
import "./FilterCountAndDownload.css";

const FilterCountAndDownload = ({ filterCount, handleDownload, loading }) => {
  return (
    <div className="person-info-header">
      <div className=""></div>
      <div className="result">
        <h4>Result</h4>
      </div>
      <div className="count-download">
        <span className='total-entries'>Total Entries: {filterCount}</span>
        <button className="download-btn" onClick={handleDownload}>
          {loading ? ("Downloading") : ("Download")}
        </button>
      </div>
    </div>
  );
};

export default FilterCountAndDownload;
