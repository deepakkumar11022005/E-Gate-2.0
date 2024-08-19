import React from 'react'
import ChangePassword from './ChangePassword'
import AddAdmin from './AddAdmin'
import './PwdAndAdmin.css';
const PwdAndAdmin = () => {
    return (
       <div className="container-flex">
         <ChangePassword />
         <AddAdmin />
       </div>
    )
}

export default PwdAndAdmin