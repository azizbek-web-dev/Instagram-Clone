import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BottomNavbar from '../components/BottomNavbar';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { MdOutlineKeyboardArrowDown, MdOutlineMenu } from 'react-icons/md';
import { BsGrid3X3, BsPersonBadge } from 'react-icons/bs';
import { IoAdd } from 'react-icons/io5';
import { profileApi } from '../services/profile';
import './Profile.css';

const highlights = [
  { id: 1, label: 'New', image: null },
  { id: 2, label: 'Friends', image: '/images/profile-image1.png' },
  { id: 3, label: 'Sport', image: '/images/profile-image2.png' },
  { id: 4, label: 'Design', image: '/images/profile-image3.png' }
];

function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posts');
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [profileRes, postsRes] = await Promise.all([
          profileApi.getProfile(),
          profileApi.getPosts()
        ]);
        setProfile(profileRes.user);
        setPosts(postsRes.posts || []);
      } catch (e) {
        if (e?.status === 401) navigate('/login');
        else setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [navigate]);

  const avatarSrc = profile?.avatar || '/images/profile-image1.png';
  const gridImages = posts.length > 0
    ? posts.map((p) => p.image || '/images/main-post.png')
    : Array(9).fill('/images/main-post.png');

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-loading">Loading...</div>
        <BottomNavbar />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header-top">
        <span className="profile-username">
          <HiOutlineLockClosed className="lock-icon" />
          {profile?.username || 'username'}
          <MdOutlineKeyboardArrowDown className="chevron-icon" />
        </span>
        <MdOutlineMenu className="menu-icon" />
      </div>

      <div className="profile-main">
        <div className="profile-info">
          <div className="profile-avatar-wrapper profile-avatar-story">
            <img src={avatarSrc} alt="profile" className="profile-avatar" />
          </div>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">{posts.length}</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">0</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">0</span>
              <span className="stat-label">Following</span>
            </div>
          </div>
        </div>

        <div className="profile-details">
          <h2 className="profile-name">{profile?.name || 'Name'}</h2>
          <p className="profile-bio">
            {profile?.bio?.split('\n').map((line, i) => (
              <span key={i}>{line}<br /></span>
            )) || 'No bio yet.'}
          </p>
          <Link to="/profile/edit" className="edit-profile-btn">Edit Profile</Link>
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
