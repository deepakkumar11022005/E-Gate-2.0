import React, { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';  
import './logoutBar.css';   

const LogoutBar = ({ handleLogout }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleBar = () => {
        setExpanded(!expanded);
    };
    const onLogout= async ()=>{
        try{
            await handleLogout();
        }
        catch{
            console.log('Error')
        }
    }

    return (
        <div className={`logout-bar ${expanded ? 'expanded' : ''}`}>
            <div className="toggle-button" onClick={toggleBar}>
                <FiLogOut size={20} color="#fff" />  {/* Show the icon */}
            </div>
            {expanded && (
                <button className="logout-button" onClick={onLogout}>
                    Logout
                </button>
            )}
        </div>
    );
};

export default LogoutBar;
