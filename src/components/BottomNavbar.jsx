import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function BottomNavbar() {
  const location = useLocation();

  return (
    <div className="bottom-navbar">
      <Link to="/home" className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}>
        <img src="/icons/home.svg" alt="home" className="nav-icon-bottom" />
      </Link>
      <Link to="/search" className={`nav-item ${location.pathname === '/search' ? 'active' : ''}`}>
        <img src="/icons/search.svg" alt="search" className="nav-icon-bottom" />
      </Link>
      <Link to="/add" className={`nav-item ${location.pathname === '/add' ? 'active' : ''}`}>
        <img src="/icons/add.svg" alt="add" className="nav-icon-bottom" />
      </Link>
      <Link to="/activity" className={`nav-item ${location.pathname === '/activity' ? 'active' : ''}`}>
        <img src="/icons/like.svg" alt="activity" className="nav-icon-bottom" />
      </Link>
      <Link to="/profile" className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
        <img src="/icons/profile.png" alt="profile" className="nav-icon-bottom profile-icon" />
      </Link>
    </div>
  );
}

export default BottomNavbar;
