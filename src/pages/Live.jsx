import { useParams, useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { MdSend } from 'react-icons/md';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { FiHeart } from 'react-icons/fi';
import './Live.css';

const liveUsers = {
  karennne: { image: '/images/profile-image2.png', name: 'karennne' },
  maxjacobson: { image: '/images/profile-image7.png', name: 'maxjacobson' }
};

function Live() {
  const { username } = useParams();
  const navigate = useNavigate();
  const user = liveUsers[username] || liveUsers.karennne;

  return (
    <div className="live-container">
      <div className="live-video-bg">
        <img src="/images/main-post.png" alt="live" className="live-video-placeholder" />
      </div>

      <div className="live-top-bar">
        <span className="live-time">9:41</span>
        <div className="live-broadcaster">
          <img src={user.image} alt={user.name} className="live-broadcaster-avatar" />
          <span className="live-broadcaster-name">{user.name}</span>
        </div>
        <div className="live-top-right">
          <div className="live-badge-top">
            <span>LIVE</span>
            <span className="live-viewers">1</span>
          </div>
          <button className="live-close-btn" onClick={() => navigate(-1)}>
            <IoClose className="close-icon" />
          </button>
        </div>
      </div>

      <div className="live-notifications">
        <div className="live-join-notification">
          <img src="/images/profile-image2.png" alt="" className="join-avatar" />
          <span>karennne joined</span>
        </div>
        <div className="live-request-bubble">
          <img src="/images/profile-image1.png" alt="" className="request-avatar" />
          <div className="request-text">
            <p>Send a request to be in {user.name}'s live video.</p>
            <button className="request-btn">Request</button>
          </div>
        </div>
      </div>

      <div className="live-reactions">
        <button className="reaction-btn">Hello</button>
        <button className="reaction-btn">😂</button>
        <button className="reaction-btn">😍</button>
        <button className="reaction-btn">👋</button>
        <button className="reaction-btn">👍</button>
      </div>

      <div className="live-bottom-bar">
        <div className="live-comment-input">
          <input type="text" placeholder="Comment..." />
          <span className="comment-ellipsis">⋯</span>
        </div>
        <div className="live-actions">
          <AiOutlineQuestionCircle className="live-action-icon" />
          <MdSend className="live-action-icon" />
          <FiHeart className="live-action-icon" />
        </div>
      </div>
    </div>
  );
}

export default Live;
