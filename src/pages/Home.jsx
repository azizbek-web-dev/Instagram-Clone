import { useState, useEffect } from 'react';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import Stories from '../components/Stories';
import Post from '../components/Post';
import { postsApi } from '../services/posts';
import './Home.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { posts: data } = await postsApi.getFeed();
        setPosts(data || []);
      } catch (e) {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onPostUpdate = (id, updates) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  return (
    <div className="home-container">
      <TopNavbar />
      <div className="home-content">
        <Stories />
        <div className="posts-container">
          {loading ? (
            <div className="posts-loading">Loading...</div>
          ) : posts.length === 0 ? (
            <div className="posts-empty">No posts yet</div>
          ) : (
            posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onUpdate={(updates) => onPostUpdate(post.id, updates)}
              />
            ))
          )}
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}

export default Home;
