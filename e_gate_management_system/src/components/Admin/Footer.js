import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const currentYear=new Date().getUTCFullYear();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">About Us</h3>
          <p className="footer-text">We are dedicated to providing the best e-gate management solutions.</p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/admin/home" className="footer-link">Home</Link></li>
            <li><Link to="/admin/search" className="footer-link">Search</Link></li>
            <li><Link to="/admin/manage-batch" className="footer-link">Manage Batch</Link></li>
            <li><Link to="/admin/account" className="footer-link">Account</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <p className="footer-text">Karpagam College of Engineering, Coimbatore</p>
          <p className="footer-text">Email: 717822P212@kce.ac.in </p>
          <p className="footer-text">Email: 717822F110@kce.ac.in</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">&copy; {currentYear} KCE. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
