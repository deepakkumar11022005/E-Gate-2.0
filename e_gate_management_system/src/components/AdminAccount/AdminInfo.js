import React, { useState } from 'react';
import './AdminInfo.css';

const AdminInfo = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [password, setPassword] = useState('password123');

    return (
        <div className="container">
            <h2>Account Info</h2>
            <div className="main">
                <div className="infoContainer">
                    <div className='details'>
                        <span className='username'>717822P212@kce.ac.in</span>
                    </div>

                </div>
                {/* <img
                    src="https://via.placeholder.com/100"
                    alt="Admin"
                    className="roundImage"
                /> */}



            </div>
        </div>
    );
};

export default AdminInfo;
