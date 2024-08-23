import React, { useEffect } from 'react';
import kceLogo from '../../images/kce.gif';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({handleLogout}) => {

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

  return (
    <header id="header" className="navbar navbar-expand-lg header-gradient">
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
        <button className="nav-item logout" onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;
