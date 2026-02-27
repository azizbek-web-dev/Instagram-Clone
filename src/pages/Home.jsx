import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import Stories from '../components/Stories';
import Post from '../components/Post';
import './Home.css';

const posts = [
  {
    id: 1,
    username: 'joshua_l',
    profileImage: '/images/profile-image1.png',
    verified: true,
    location: 'Tokyo, Japan',
    image: '/images/main-post.png',
    isCarousel: true,
    currentImage: 1,
    totalImages: 3,
    likes: '44,686',
    caption: 'The game in Japan was amazing and I want to share some photos'
  }
];

function Home() {
  return (
    <div className="home-container">
      <TopNavbar />
      <div className="home-content">
        <Stories />
        <div className="posts-container">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}

export default Home;
