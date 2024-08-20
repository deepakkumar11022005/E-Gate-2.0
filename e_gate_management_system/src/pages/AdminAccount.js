import React from 'react'
import Header from '../components/Admin/Header';
import AdminInfo from '../components/AdminAccount/AdminInfo';
import PwdAndAdmin from '../components/AdminAccount/PwdAndAdmin';
import Footer from '../components/Admin/Footer';
const AdminAccount = () => {
  return (
    <div>
      <Header />
      <AdminInfo/>
      <PwdAndAdmin/>
      <Footer/>
    </div>
  )
}

export default AdminAccount