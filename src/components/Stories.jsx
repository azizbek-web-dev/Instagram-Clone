import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { storiesApi } from '../services/stories';
import './Stories.css';

function Stories() {
  const [stories, setStories] = useState([]);
  const fileInputRef = useRef(null);

  const load = async () => {
    try {
      const { stories: data } = await storiesApi.getStories();
      setStories(data || []);
    } catch (e) {
      setStories([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAddStory = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await storiesApi.createStory(file);
      load();
    } catch (err) {}
  };

  return (
    <div className="stories-container">
      <div className="stories-scroll">
        <div
          className="story-item"
          onClick={() => fileInputRef.current?.click()}
          style={{ cursor: 'pointer' }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAddStory}
            style={{ display: 'none' }}
          />
          <div className="story-circle add">
            <span className="story-add-icon">+</span>
          </div>
          <p className="story-username">Your Story</p>
        </div>
        {stories.map((item) => {
          const username = item.user?.username || item.user?.id;
          const avatar = item.user?.avatar || '/images/profile-image1.png';
          const content = (
            <>
              <div className={`story-circle ${item.viewed ? 'viewed' : ''}`}>
                <img src={avatar} alt={username} className="story-image" />
              </div>
              <p className="story-username">{username}</p>
            </>
          );
          return (
            <Link key={item.user?.id} to={`/stories/${username}`} className="story-item">
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Stories;
