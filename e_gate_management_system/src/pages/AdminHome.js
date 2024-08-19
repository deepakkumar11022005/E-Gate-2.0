import React from 'react';
import Header from '../components/Admin/Header';
import './AdminHome.css';
import Main from '../components/AdminHome/Main';
import PersonInfoTable from '../components/Admin/PersonInfoTable';
import { dark } from '@mui/material/styles/createPalette';
const AdminHome = ({data}) => {
  return (
    <div className="admin-home">
      <Header />
      <Main/>
      <h2>Today Entries</h2>
      <PersonInfoTable
      data={data}
      />
    </div>
  );
};

export default AdminHome;
