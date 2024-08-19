import React from 'react';
import Header from '../components/Admin/Header';
import './AdminSearchEntry.css'; // Add this CSS file for styling
import Filter from '../components/AdminSearch/Filter';
import PersonInfoTable from '../components/Admin/PersonInfoTable';
import FilterCountAndDownload from '../components/AdminSearch/FilterCountAndDownload';
const AdminSearchEntry = ({data}) => {
 
  return (
    <div>
      <Header />
      <Filter />
      <FilterCountAndDownload
        dataCount={data.length}
      />
      <PersonInfoTable data={data} />
    </div>
  );
};

export default AdminSearchEntry;
