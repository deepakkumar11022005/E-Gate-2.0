import React from 'react';

const Pagination = ({ totalPages, pageNo, onPageChange }) => {
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
    <div className="pagination">
      <style>
        {`
          .pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
          }

          .pagination button {
            margin: 0 5px;
            padding: 8px 12px;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            cursor: pointer;
            font-family: inherit;
          }

          .pagination button:disabled {
            cursor: not-allowed;
            opacity: 0.5;
          }

          .pagination button.active {
            background-color: #007bff;
            color: white;
            border-color: #007bff;
          }
        `}
      </style>

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
  );
};

export default Pagination;
