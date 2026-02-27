import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { MdCameraAlt, MdSend } from 'react-icons/md';
import { MdMoreHoriz } from 'react-icons/md';
import { storiesApi } from '../services/stories';
import { useAuth } from '../context/AuthContext';
import './Story.css';

function Story() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [data, setData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await storiesApi.getStory(username);
        setData(res);
      } catch (e) {
        navigate(-1);
      }
    };
    load();
  }, [username, navigate]);

  if (!data) return null;

  const stories = data.stories || [];
  const currentStory = stories[currentIndex];
  const avatar = data.user?.avatar || '/images/profile-image1.png';

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="story-view-container">
      <div className="story-progress-bar">
        {stories.map((_, i) => (
          <div key={i} className="story-progress-segment">
            <div className={`story-progress-fill ${i < currentIndex ? 'done' : ''} ${i === currentIndex ? 'active' : ''}`} />
          </div>
        ))}
      </div>

      <div className="story-header">
        <div className="story-user-info">
          <img src={avatar} alt={username} className="story-header-avatar" />
          <span className="story-username">{data.user?.username || username}</span>
          <span className="story-time">Now</span>
        </div>
        <button className="story-close-btn" onClick={() => navigate(-1)}>
          <IoClose className="close-icon" />
        </button>
      </div>

      <div className="story-content" onClick={handleNext}>
        {currentStory && (
          <img src={currentStory.image} alt="story" className="story-image-full" />
        )}
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
