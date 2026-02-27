import { useParams, useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { MdCameraAlt, MdSend } from 'react-icons/md';
import { MdMoreHoriz } from 'react-icons/md';
import './Story.css';

const storyUsers = {
  'Your Story': { image: '/images/profile-image1.png', storyImage: '/images/main-post.png' },
  zackjohn: { image: '/images/profile-image3.png', storyImage: '/images/main-post.png' },
  kieron_d: { image: '/images/profile-image4.png', storyImage: '/images/main-post.png' },
  craig_: { image: '/images/profile-image5.png', storyImage: '/images/main-post.png' },
  craig_love: { image: '/images/profile-image5.png', storyImage: '/images/main-post.png' }
};

function Story() {
  const { username } = useParams();
  const navigate = useNavigate();
  const user = storyUsers[username] || storyUsers.craig_;

  return (
    <div className="story-view-container">
      <div className="story-progress-bar">
        <div className="story-progress-fill"></div>
      </div>

      <div className="story-header">
        <div className="story-user-info">
          <img src={user.image} alt={username} className="story-header-avatar" />
          <span className="story-username">{username}</span>
          <span className="story-time">4h</span>
        </div>
        <button className="story-close-btn" onClick={() => navigate(-1)}>
          <IoClose className="close-icon" />
        </button>
      </div>

      <div className="story-content">
        <img src={user.storyImage} alt="story" className="story-image-full" />
      </div>

      <div className="story-bottom-bar">
        <div className="story-reply-input">
          <input type="text" placeholder="Send Message" />
          <MdCameraAlt className="story-camera-icon" />
        </div>
        <div className="story-bottom-actions">
          <MdSend className="story-action-icon" />
          <MdMoreHoriz className="story-action-icon" />
        </div>
      </div>
    </div>
  );
}

export default Story;
