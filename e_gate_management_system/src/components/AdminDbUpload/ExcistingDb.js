import React from 'react';
import './ExistingDb.css';

const ExistingDb = () => {
  const databases = [
    'Batch_2020-2026',
    'Batch_2018-2024',
    'Batch_2017-2023',
  ];  // This would typically be fetched from a backend

  return (
    <div className="existing-db-container">
      <h2>Uploaded Databases</h2>
      <div className="db-list-container">
        <ul className="db-list">
          {databases.map((db, index) => (
            <li key={index} className="db-item">
              {db}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExistingDb;
