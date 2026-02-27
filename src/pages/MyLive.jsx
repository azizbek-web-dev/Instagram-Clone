import { useNavigate } from 'react-router-dom';
import { MdSend } from 'react-icons/md';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { FiHeart } from 'react-icons/fi';
import { IoAdd } from 'react-icons/io5';
import './Live.css';

function MyLive() {
  const navigate = useNavigate();

  return (
    <div className="live-container my-live">
      <div className="live-video-bg">
        <img src="/images/main-post.png" alt="live" className="live-video-placeholder" />
      </div>

      <div className="live-top-bar">
        <span className="live-time">9:41</span>
        <div className="live-top-center">
          <button className="live-switch-camera">
            <span className="camera-icon">↻</span>
          </button>
          <div className="live-badge-top my-live-badge">
            <span>LIVE</span>
            <span className="live-viewers">1</span>
          </div>
        </div>
        <button className="live-end-btn" onClick={() => navigate(-1)}>
          End
        </button>
      </div>

      <div className="my-live-messages">
        <p className="live-message">We're telling your followers that you've started a live video.</p>
        <p className="live-message">Hang on! We're telling more followers to join your video.</p>
        <div className="live-join-notification">
          <img src="/images/profile-image7.png" alt="" className="join-avatar" />
          <span>maxjacobson joined</span>
          <button className="wave-btn">👋 Wave</button>
        </div>
      </div>

      <div className="live-bottom-bar">
        <div className="live-comment-input">
          <input type="text" placeholder="Comment" />
          <span className="comment-ellipsis">⋯</span>
        </div>
        <div className="live-actions my-live-actions">
          <AiOutlineQuestionCircle className="live-action-icon" />
          <MdSend className="live-action-icon" />
          <FiHeart className="live-action-icon" />
          <IoAdd className="live-action-icon" />
        </div>
      </div>
    </div>
  );
}

export default MyLive;
