import React from 'react';
import kceLogo from '../../images/kce.gif';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg header-gradient">
      <div className="brand_name">
        <Link className="navbar-brand" to="/admin/home">
          <img src={kceLogo} alt="Admin Logo" className="kce_logo" />
        </Link>
        <span className='egate_header'>E-Gate</span>
      </div>
      <nav className="navbar-nav">
        <Link className="nav-item nav-link" to="/admin/home">Home</Link>
        <Link className="nav-item nav-link" to="/admin/search">Search</Link>
        <Link className="nav-item nav-link" to="/admin/manage-batch">Manage Batch</Link>
        {/* <Link className="nav-item nav-link" to="/admin/visual">Visual</Link> */}
        <Link className="nav-item nav-link" to="/admin/account">Account</Link>
        <button className="nav-item logout" onClick={() => window.location.href = '/admin/logout'}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;
