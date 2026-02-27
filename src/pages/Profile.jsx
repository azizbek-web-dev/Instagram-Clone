import { useState } from 'react';
import BottomNavbar from '../components/BottomNavbar';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { MdOutlineKeyboardArrowDown, MdOutlineMenu } from 'react-icons/md';
import { BsGrid3X3, BsPersonBadge } from 'react-icons/bs';
import { IoAdd } from 'react-icons/io5';
import './Profile.css';

const highlights = [
  { id: 1, label: 'New', image: null },
  { id: 2, label: 'Friends', image: '/images/profile-image1.png' },
  { id: 3, label: 'Sport', image: '/images/profile-image2.png' },
  { id: 4, label: 'Design', image: '/images/profile-image3.png' }
];

const gridImages = Array(9).fill('/images/main-post.png');

function Profile() {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="profile-container">
      <div className="profile-header-top">
        <span className="profile-username">
          <HiOutlineLockClosed className="lock-icon" />
          jacob_w
          <MdOutlineKeyboardArrowDown className="chevron-icon" />
        </span>
        <MdOutlineMenu className="menu-icon" />
      </div>

      <div className="profile-main">
        <div className="profile-info">
          <div className="profile-avatar-wrapper">
            <img src="/images/profile-image1.png" alt="profile" className="profile-avatar" />
          </div>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">54</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">834</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">162</span>
              <span className="stat-label">Following</span>
            </div>
          </div>
        </div>

        <div className="profile-details">
          <h2 className="profile-name">Jacob West</h2>
          <p className="profile-bio">
            Digital goodies designer<br />
            <span className="bio-link">@pixsellz</span><br />
            Everything is designed.
          </p>
          <button className="edit-profile-btn">Edit Profile</button>
        </div>

        <div className="profile-highlights">
          {highlights.map((item) => (
            <div key={item.id} className="highlight-item">
              <div className={`highlight-circle ${!item.image ? 'new' : ''}`}>
                {item.image ? (
                  <img src={item.image} alt={item.label} />
                ) : (
                  <IoAdd className="highlight-add-icon" />
                )}
              </div>
              <span className="highlight-label">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="profile-tabs">
          <button
            className={`profile-tab ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            <BsGrid3X3 className="tab-icon" />
          </button>
          <button
            className={`profile-tab ${activeTab === 'tagged' ? 'active' : ''}`}
            onClick={() => setActiveTab('tagged')}
          >
            <BsPersonBadge className="tab-icon" />
          </button>
        </div>

        <div className="profile-grid">
          {gridImages.map((img, index) => (
            <div key={index} className="profile-grid-item">
              <img src={img} alt="" />
            </div>
          ))}
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
}

export default Profile;
