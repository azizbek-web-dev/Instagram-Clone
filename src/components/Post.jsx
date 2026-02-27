import { useState } from 'react';
import './Post.css';

function Post({ post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <div className="post-user-info">
          <img src={post.profileImage} alt={post.username} className="post-profile-img" />
          <div className="post-user-details">
            <div className="post-username-row">
              <span className="post-username">{post.username}</span>
              {post.verified && (
                <img src="/icons/verifed.png" alt="verified" className="verified-icon" />
              )}
            </div>
            {post.location && <span className="post-location">{post.location}</span>}
          </div>
        </div>
        <img src="/icons/more.png" alt="more" className="more-icon" />
      </div>

      <div className="post-image-wrapper">
        <img src={post.image} alt="post" className="post-image" />
        {post.isCarousel && (
          <div className="carousel-indicator">
            <span>{post.currentImage}/{post.totalImages}</span>
          </div>
        )}
      </div>

      <div className="post-actions">
        <div className="post-actions-left">
          <button onClick={handleLike} className="action-btn">
            <img 
              src="/icons/like.svg" 
              alt="like" 
              className={`action-icon ${liked ? 'liked' : ''}`}
            />
          </button>
          <button className="action-btn">
            <img src="/icons/comment.png" alt="comment" className="action-icon" />
          </button>
          <button className="action-btn">
            <img src="/icons/messanger.png" alt="share" className="action-icon" />
          </button>
          {post.isCarousel && (
            <div className="carousel-dots">
              {[...Array(post.totalImages)].map((_, i) => (
                <span 
                  key={i} 
                  className={`dot ${i === post.currentImage - 1 ? 'active' : ''}`}
                ></span>
              ))}
            </div>
          )}
        </div>
        <button onClick={handleSave} className="action-btn">
          <img 
            src="/icons/save.png" 
            alt="save" 
            className={`action-icon ${saved ? 'saved' : ''}`}
          />
        </button>
      </div>

      <div className="post-likes">
        <span className="likes-count">Liked by <strong>craig_love</strong> and <strong>{post.likes}</strong> others</span>
      </div>

      <div className="post-caption">
        <span className="caption-username">{post.username}</span>
        <span className="caption-text">{post.caption}</span>
      </div>
    </div>
  );
}

export default Post;
