import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineComment, AiFillCheckCircle } from 'react-icons/ai';
import { MdSend, MdMoreHoriz, MdBookmark, MdBookmarkBorder } from 'react-icons/md';
import { postsApi } from '../services/posts';
import './Post.css';

function Post({ post, onUpdate }) {
  const profileImage = post.user?.avatar || '/images/profile-image1.png';
  const username = post.user?.username || 'user';
  const [liked, setLiked] = useState(post.is_liked || false);
  const [saved, setSaved] = useState(post.is_saved || false);
  const [likesCount, setLikesCount] = useState(post.likes_count ?? 0);
  // izohlar ochiq yoki yopiq
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  const handleLike = async () => {
    try {
      if (liked) {
        const res = await postsApi.unlikePost(post.id);
        setLikesCount(res.likes_count ?? likesCount - 1);
        onUpdate?.({ is_liked: false, likes_count: res.likes_count });
      } else {
        const res = await postsApi.likePost(post.id);
        setLikesCount(res.likes_count ?? likesCount + 1);
        onUpdate?.({ is_liked: true, likes_count: res.likes_count });
      }
      setLiked(!liked);
    } catch (e) {}
  };

  const handleSave = async () => {
    try {
      if (saved) {
        await postsApi.unsavePost(post.id);
        onUpdate?.({ is_saved: false });
      } else {
        await postsApi.savePost(post.id);
        onUpdate?.({ is_saved: true });
      }
      setSaved(!saved);
    } catch (e) {}
  };

  // izohlar ochilganda yuklash
  const handleCommentClick = async () => {
    if (!showComments && !commentsLoaded) {
      try {
        const res = await postsApi.getComments(post.id);
        setComments(res.comments || []);
        setCommentsLoaded(true);
      } catch (e) {
        setComments([]);
      }
    }
    setShowComments(!showComments);
  };

  // yangi izoh yozish
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const res = await postsApi.addComment(post.id, commentText.trim());
      setComments((prev) => [res.comment, ...prev]);
      setCommentText('');
      onUpdate?.({ comments_count: (post.comments_count ?? 0) + 1 });
    } catch (e) {}
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <div className="post-user-info">
          <img src={profileImage} alt={username} className="post-profile-img" />
          <div className="post-user-details">
            <div className="post-username-row">
              <span className="post-username">{username}</span>
              {post.verified && <AiFillCheckCircle className="verified-icon" />}
            </div>
            {post.location && <span className="post-location">{post.location}</span>}
          </div>
        </div>
        <MdMoreHoriz className="more-icon" />
      </div>

      <div className="post-image-wrapper">
        <img src={post.image || '/images/main-post.png'} alt="post" className="post-image" />
      </div>

      <div className="post-actions">
        <div className="post-actions-left">
          <button onClick={handleLike} className="action-btn">
            {liked ? <AiFillHeart className="action-icon liked" /> : <AiOutlineHeart className="action-icon" />}
          </button>
          <button onClick={handleCommentClick} className="action-btn">
            <AiOutlineComment className="action-icon" />
          </button>
          <button className="action-btn">
            <MdSend className="action-icon" />
          </button>
        </div>
        <button onClick={handleSave} className="action-btn">
          {saved ? <MdBookmark className="action-icon saved" /> : <MdBookmarkBorder className="action-icon" />}
        </button>
      </div>

      <div className="post-likes">
        <span className="likes-count">
          {likesCount > 0 ? (
            <>Liked by <strong>{likesCount}</strong> {likesCount === 1 ? 'person' : 'others'}</>
          ) : (
            'No likes yet'
          )}
        </span>
      </div>

      <div className="post-caption">
        <span className="caption-username">{username}</span>
        <span className="caption-text">{post.caption || ''}</span>
      </div>

      {/* izohlar ro'yxati */}
      {showComments && (
        <div className="post-comments">
          {comments.map((c) => (
            <div key={c.id} className="post-comment-item">
              <span className="comment-username">{c.user?.username}</span>
              <span className="comment-body">{c.body}</span>
            </div>
          ))}
          <form onSubmit={handleAddComment} className="post-comment-form">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit" disabled={!commentText.trim()}>Post</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Post;
