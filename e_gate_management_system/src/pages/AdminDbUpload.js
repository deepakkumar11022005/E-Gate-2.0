import React from 'react'
import Header from '../components/Admin/Header';
 
import FileUpload from '../components/AdminDbUpload/FileUpload';
import ExistingDb from '../components/AdminDbUpload/ExcistingDb';
import Footer from '../components/Admin/Footer';
const AdminDbUpload = () => {
  return (
    <div>
      <Header />
      <FileUpload/>
      <ExistingDb/>
      <Footer/>
    </div>
  )
}

export default AdminDbUpload