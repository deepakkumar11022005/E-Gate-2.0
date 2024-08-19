import React from 'react'
import Header from '../components/Admin/Header';
 
import FileUpload from '../components/AdminDbUpload/FileUpload';
import ExistingDb from '../components/AdminDbUpload/ExcistingDb';
const AdminDbUpload = () => {
  return (
    <div>
      <Header />
      <FileUpload/>
      <ExistingDb/>
    </div>
  )
}

export default AdminDbUpload