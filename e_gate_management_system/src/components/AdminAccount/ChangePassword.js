
import React, { useState } from 'react';
import './ChangePassword.css';
const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const handleEditClick = (e) => {
        e.preventDefault();
        setIsEditing(true);
    };
    const handleSaveClick = (e) => {
        e.preventDefault();
        setIsEditing(false);
        // Here you would typically save the password, e.g., by making an API call
        console.log('Password saved:', password);
    };

    return (
        <div className="edit-pwd-container">
            <h2 className="title">Change Password</h2>
            <form className="admin-form">
                <div className='input_group'>
                    <label htmlFor="password" type="password">Password :</label>
                    <span>{isEditing ? (
                        <input
                            type="password"
                            value={password}
                            className="pwd-input"
                            onChange={(e) => setPassword(e.target.value)}
                            aria-label="Edit Password"
                        />
                    ) : (
                        <span><input type="password" className="pwd-input" placeholder={"-----------"} disabled /></span>
                    )}

                    </span>

                </div>
                <span>
                    {isEditing ? (
                        <button onClick={handleSaveClick} className="edit-pwd-btn" aria-label="Save Password">
                            Save
                        </button>
                    ) : (
                        <button onClick={handleEditClick} className="edit-pwd-btn" aria-label="Edit Password">
                            Edit
                        </button>
                    )}
                </span>
            </form >
        </div >
    )
}

export default ChangePassword