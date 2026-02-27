import './Stories.css';

const stories = [
  { id: 1, username: 'Your Story', image: '/images/profile-image1.png', isLive: false },
  { id: 2, username: 'karennne', image: '/images/profile-image2.png', isLive: true },
  { id: 3, username: 'zackjohn', image: '/images/profile-image3.png', isLive: false },
  { id: 4, username: 'kieron_d', image: '/images/profile-image4.png', isLive: false },
  { id: 5, username: 'craig_', image: '/images/profile-image5.png', isLive: false },
];

function Stories() {
  return (
    <div className="stories-container">
      <div className="stories-scroll">
        {stories.map((story) => (
          <div key={story.id} className="story-item">
            <div className="story-circle">
              <img src={story.image} alt={story.username} className="story-image" />
            </div>
            {story.isLive && <span className="live-badge">LIVE</span>}
            <p className="story-username">{story.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stories;
