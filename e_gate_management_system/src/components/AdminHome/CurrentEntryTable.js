import React from 'react';
import './CurrentEntryTable.css';   

const CurrentEntryTable = ({ currentEntries, totalEntries, pageSize, pageNo, onPageChange }) => {
  const totalPages = Math.ceil(totalEntries / pageSize);

  const handlePrevPage = () => {
    if (pageNo > 0) {
      onPageChange(pageNo - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNo < totalPages - 1) {
      onPageChange(pageNo + 1);
    }
  };

  const handlePageClick = (pageIndex) => {
    onPageChange(pageIndex);
  };

  return (
    <div className="person-info-container">
      <div className="table-container">
        <table className="person-info-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Batch</th>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Department</th>
              <th>In Date</th>
              <th>In Time</th>
              <th>Out Date</th>
              <th>Out Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1 + pageNo * pageSize}</td>
                <td>{entry.batch}</td>
                <td>{entry.rollNum}</td>
                <td>{entry.name}</td>
                <td>{entry.department}</td>
                <td>{entry.inDate}</td>
                <td>{entry.inTime}</td>
                <td>{entry.outDate}</td>
                <td>{entry.outTime}</td>
                <td>{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={pageNo === 0}>
          Previous
        </button>
        {[...Array(totalPages).keys()].map((pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => handlePageClick(pageIndex)}
            className={pageIndex === pageNo ? 'active' : ''}
          >
            {pageIndex + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={pageNo === totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CurrentEntryTable;
