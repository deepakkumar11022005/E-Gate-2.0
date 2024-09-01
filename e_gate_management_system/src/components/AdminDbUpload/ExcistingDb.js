import React from 'react';
import './ExistingDb.css';
import Loading from '../Admin/Loading';
import Error from '../Admin/Error';

const ExistingDb = ({ existingBatch, error, loading, handleCloseError }) => {
  return (
    <div className="existing-db-container">
      <h2>Uploaded Databases</h2>
      <div className="db-list-container">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error={error} onClose={handleCloseError} />
        ) : (
          <ul className="db-list">
            {existingBatch.length < 1 ? (
              <li className="db-item">No Batch Found</li>
            ) : (
              existingBatch.map((obj) => (
                <li key={obj.uniqueId} className="db-item">
                  {obj.batchName}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExistingDb;
