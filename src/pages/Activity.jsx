import { useState } from 'react';
import BottomNavbar from '../components/BottomNavbar';
import './Activity.css';

const youActivities = [
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

const followingActivities = [
  {
    id: 1,
    users: [{ name: 'karennne', image: '/images/profile-image2.png', hasStory: true }],
    message: 'karennne liked 3 posts. 3h',
    thumbnails: ['/images/main-post.png', '/images/main-post.png', '/images/main-post.png'],
    layout: 'below'
  },
  {
    id: 2,
    users: [
      { name: 'kiero_d', image: '/images/profile-image4.png' },
      { name: 'zackjohn', image: '/images/profile-image3.png' },
      { name: 'craig_love', image: '/images/profile-image5.png' }
    ],
    message: 'kiero_d, zackjohn and craig_love liked joshua_l photo. 3h',
    thumbnail: '/images/main-post.png',
    layout: 'right'
  },
  {
    id: 3,
    users: [{ name: 'kiero_d', image: '/images/profile-image4.png' }],
    message: 'kiero_d started following craig_love. 3h',
    layout: 'none'
  },
  {
    id: 4,
    users: [{ name: 'craig_love', image: '/images/profile-image5.png' }],
    message: 'craig_love liked 8 posts. 3h',
    thumbnails: Array(6).fill('/images/main-post.png'),
    layout: 'below'
  },
  {
    id: 5,
    users: [
      { name: 'maxjacobson', image: '/images/profile-image7.png' },
      { name: 'zackjohn', image: '/images/profile-image3.png' }
    ],
    message: "maxjacobson and zackjohn liked mis_potter's post. 3h",
    thumbnail: '/images/main-post.png',
    layout: 'right'
  },
  {
    id: 6,
    users: [
      { name: 'maxjacobson', image: '/images/profile-image7.png' },
      { name: 'craig_love', image: '/images/profile-image5.png' }
    ],
    message: "maxjacobson and craig_love liked martini_rond's post. 3h",
    thumbnail: '/images/main-post.png',
    layout: 'right'
  },
  {
    id: 7,
    users: [{ name: 'karennne', image: '/images/profile-image2.png', hasStory: true }],
    message: "karennne liked martini_rond's comment: @martini_rond Nice! 3h",
    thumbnail: '/images/main-post.png',
    layout: 'right'
  },
  {
    id: 8,
    users: [{ name: 'maxjacobson', image: '/images/profile-image7.png', hasStory: true }],
    message: 'maxjacobson liked 3 posts. 3h',
    thumbnails: ['/images/main-post.png', '/images/main-post.png', '/images/main-post.png'],
    layout: 'below'
  }
];

function Activity() {
  const [activeTab, setActiveTab] = useState('following');

  const getSectionGroups = () => {
    const groups = {};
    youActivities.forEach((item) => {
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
        {activeTab === 'following' ? (
          <div className="following-list">
            {followingActivities.map((item) => (
              <div key={item.id} className={`activity-item following-item ${item.layout}`}>
                <div className="activity-users">
                  {item.users.slice(0, 2).map((user, i) => (
                    <div
                      key={i}
                      className={`activity-avatar-wrapper ${user.hasStory ? 'has-story' : ''} ${i === 1 && item.users.length > 1 ? 'overlap' : ''}`}
                    >
                      <img src={user.image} alt={user.name} className="activity-avatar" />
                    </div>
                  ))}
                </div>
                <div className="activity-info">
                  <p className="activity-text">{item.message}</p>
                  {item.layout === 'below' && item.thumbnails && (
                    <div className={`activity-thumbnails-grid ${item.thumbnails.length === 6 ? 'grid-6' : 'grid-3'}`}>
                      {item.thumbnails.map((img, i) => (
                        <img key={i} src={img} alt="" />
                      ))}
                    </div>
                  )}
                </div>
                {item.layout === 'right' && item.thumbnail && (
                  <img src={item.thumbnail} alt="" className="activity-thumbnail" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
      <BottomNavbar />
    </div>
  );
}

export default Activity;
