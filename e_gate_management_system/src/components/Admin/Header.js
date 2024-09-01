import React, { useEffect, useState } from 'react';
import kceLogo from '../../images/kce.gif';
import { Link } from 'react-router-dom';
import './Header.css';
import Message from './Message';
import Error from './Error';

const Header = ({ handleLogout }) => {
  const [logoutError, setLogoutError] = useState(null);
  const [logoutConfirmation, setLogoutConfirmation] = useState(false);

  useEffect(() => {
    const header = document.getElementById("header");
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOkMessage = async () => {
    setLogoutConfirmation(false);
    const response = await handleLogout();
    if (response) {
      setLogoutError(null);
    } else {
      setLogoutError('Error logging out');
    }
  };

  const handleClose=()=>{
    setLogoutError(null);
  }
  const handleCancelMessage = () => {
    setLogoutConfirmation(false);
  };

  return (
    <header id="header" className="navbar navbar-expand-lg header-gradient">
      <div className="brand_name">
        <Link className="navbar-brand" to="/admin/home">
          <img src={kceLogo} alt="Admin Logo" className="kce_logo" />
        </Link>
        <span className="egate_header">E-Gate</span>
      </div>
      <nav className="navbar-nav">
        <Link className="nav-item nav-link" to="/admin/home">Home</Link>
        <Link className="nav-item nav-link" to="/admin/search">Search</Link>
        <Link className="nav-item nav-link" to="/admin/manage-batch">Manage Batch</Link>
        {/* <Link className="nav-item nav-link" to="/admin/visual">Visual</Link> */}
        <Link className="nav-item nav-link" to="/admin/account">Account</Link>
        <button className="nav-item logout" onClick={() => setLogoutConfirmation(true)}>Logout</button>
      </nav>
      {logoutConfirmation && (
        <Message
          message={"Are you sure to Logout?"}
          buttons={[
            { label: 'Yes', onClick: handleOkMessage, className: 'ok-btn' },
            { label: 'Cancel', onClick: handleCancelMessage, className: 'close-btn' }
          ]}
        />
      )}
      {logoutError && (
        <Error
          error={logoutError}
          onClose={handleClose}
        />
      )}
    </header>
  );
};

export default Header;
