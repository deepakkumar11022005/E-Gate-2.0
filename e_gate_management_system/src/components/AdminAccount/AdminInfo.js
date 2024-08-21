import React, { useState } from 'react';
import './AdminInfo.css';

const AdminInfo = ({email}) => {
 

    return (
        <div className="container">
            <h2>Account Info</h2>
            <div className="main">
                <div className="infoContainer">
                    <div className='details'>
                        <span className='username'>{email}</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminInfo;
