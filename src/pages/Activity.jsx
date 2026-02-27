import { useState } from 'react';
import BottomNavbar from '../components/BottomNavbar';
import './Activity.css';

const activities = [
  {
    id: 1,
    section: 'New',
    users: [{ name: 'karennne', image: '/images/profile-image2.png' }],
    message: 'karennne liked your photo. 1h',
    thumbnail: '/images/main-post.png'
  },
  {
    id: 2,
    section: 'Today',
    users: [
      { name: 'kiero_d', image: '/images/profile-image4.png' },
      { name: 'zackjohn', image: '/images/profile-image3.png' }
    ],
    message: 'kiero_d, zackjohn and 26 others liked your photo. 3h',
    thumbnail: '/images/main-post.png'
  },
  {
    id: 3,
    section: 'This Week',
    users: [{ name: 'craig_love', image: '/images/profile-image5.png' }],
    message: 'craig_love mentioned you in a comment: @jacob_w exactly.. 2d',
    thumbnail: '/images/main-post.png',
    showReply: true
  },
  {
    id: 4,
    section: 'This Week',
    users: [{ name: 'martini_rond', image: '/images/profile-image6.png' }],
    message: 'martini_rond started following you. 3d',
    action: 'Message'
  },
  {
    id: 5,
    section: 'This Week',
    users: [{ name: 'maxjacobson', image: '/images/profile-image7.png' }],
    message: 'maxjacobson started following you. 3d',
    action: 'Message'
  },
  {
    id: 6,
    section: 'This Week',
    users: [{ name: 'mis_potter', image: '/images/profile-image1.png' }],
    message: 'mis_potter started following you. 3d',
    action: 'Follow',
    actionPrimary: true
  }
];

function Activity() {
  const [activeTab, setActiveTab] = useState('you');

  const getSectionGroups = () => {
    const groups = {};
    activities.forEach((item) => {
      if (!groups[item.section]) groups[item.section] = [];
      groups[item.section].push(item);
    });
    return groups;
  };

  const sectionOrder = ['Follow Requests', 'New', 'Today', 'This Week', 'This Month'];
  const groups = getSectionGroups();

  return (
    <div className="activity-container">
      <div className="activity-header">
        <h1 className="activity-title">Activity</h1>
      </div>
      <div className="activity-tabs">
        <button
          className={`activity-tab ${activeTab === 'following' ? 'active' : ''}`}
          onClick={() => setActiveTab('following')}
        >
          Following
        </button>
        <button
          className={`activity-tab ${activeTab === 'you' ? 'active' : ''}`}
          onClick={() => setActiveTab('you')}
        >
          You
        </button>
      </div>
      <div className="activity-content">
        <div className="follow-requests-section">
          <span className="section-label">Follow Requests</span>
        </div>
        {sectionOrder.slice(1).map((section) => {
          const items = groups[section];
          if (!items || items.length === 0) return null;
          return (
            <div key={section} className="activity-section">
              <span className="section-label">{section}</span>
              {items.map((item) => (
                <div key={item.id} className="activity-item">
                  <div className="activity-users">
                    {item.users.slice(0, 2).map((user, i) => (
                      <img
                        key={i}
                        src={user.image}
                        alt={user.name}
                        className={`activity-avatar ${i === 1 && item.users.length > 1 ? 'overlap' : ''}`}
                      />
                    ))}
                  </div>
                  <div className="activity-info">
                    <p className="activity-text">{item.message}</p>
                    {item.showReply && (
                      <div className="activity-reply">
                        <span className="reply-heart">♡</span>
                        <span className="reply-text">Reply</span>
                      </div>
                    )}
                  </div>
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt="" className="activity-thumbnail" />
                  ) : (
                    <button
                      className={`activity-btn ${item.actionPrimary ? 'primary' : ''}`}
                    >
                      {item.action}
                    </button>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <BottomNavbar />
    </div>
  );
}

export default Activity;
