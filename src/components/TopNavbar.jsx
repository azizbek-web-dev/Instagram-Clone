import { Link } from 'react-router-dom';
import { MdCameraAlt, MdSend } from 'react-icons/md';
import './Navbar.css';

function TopNavbar() {
  return (
    <div className="top-navbar">
      <div className="top-nav-left">
      <MdCameraAlt className="nav-icon" />
      </div>
      <div className="top-nav-center">
        <h1 className="instagram-logo-nav">Instagram</h1>
      </div>
      <div className="top-nav-right">
        <div className="nav-icon-wrapper">
          <div className="notification-dot"></div>
          <MdSend className="nav-icon" />
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;
