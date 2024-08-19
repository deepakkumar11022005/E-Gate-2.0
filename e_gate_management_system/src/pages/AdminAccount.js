import React from 'react'
import Header from '../components/Admin/Header';
import AdminInfo from '../components/AdminAccount/AdminInfo';
import PwdAndAdmin from '../components/AdminAccount/PwdAndAdmin';
const AdminAccount = () => {
  return (
    <div>
      <Header />
      <AdminInfo/>
      <PwdAndAdmin/>
    </div>
  )
}

export default AdminAccount