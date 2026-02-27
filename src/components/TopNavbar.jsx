import { Link } from 'react-router-dom';
import './Navbar.css';

function TopNavbar() {
  return (
    <div className="top-navbar">
      <div className="top-nav-left">
        <span className="time">9:41</span>
      </div>
      <div className="top-nav-center">
        <h1 className="instagram-logo-nav">Instagram</h1>
      </div>
      <div className="top-nav-right">
        <img src="/icons/camera.png" alt="camera" className="nav-icon" />
        <div className="nav-icon-wrapper">
          <div className="notification-dot"></div>
          <img src="/icons/messanger.png" alt="messages" className="nav-icon" />
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;
