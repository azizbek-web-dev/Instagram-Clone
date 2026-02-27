import { Link, useLocation } from 'react-router-dom';
import { AiFillHome, AiOutlineHome, AiOutlineSearch, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { MdAddBox, MdAdd } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

function BottomNavbar() {
  const location = useLocation();

  return (
    <div className="bottom-navbar">
      <Link to="/home" className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}>
        {location.pathname === '/home' ? <AiFillHome className="nav-icon-bottom" /> : <AiOutlineHome className="nav-icon-bottom" />}
      </Link>
      <Link to="/search" className={`nav-item ${location.pathname === '/search' ? 'active' : ''}`}>
        <AiOutlineSearch className="nav-icon-bottom" />
      </Link>
      <Link to="/add" className={`nav-item ${location.pathname === '/add' ? 'active' : ''}`}>
        {location.pathname === '/add' ? <MdAddBox className="nav-icon-bottom" /> : <MdAdd className="nav-icon-bottom" />}
      </Link>
      <Link to="/activity" className={`nav-item ${location.pathname === '/activity' ? 'active' : ''}`}>
        {location.pathname === '/activity' ? <AiFillHeart className="nav-icon-bottom" /> : <AiOutlineHeart className="nav-icon-bottom" />}
      </Link>
      <Link to="/profile" className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
        <FaUserCircle className="nav-icon-bottom profile-icon" />
      </Link>
    </div>
  );
}

export default BottomNavbar;
