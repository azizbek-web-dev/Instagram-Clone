import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchTopBar from '../components/SearchTopBar';
import BottomNavbar from '../components/BottomNavbar';
import { searchApi } from '../services/search';
import './Search.css';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  // 2 ta belgidan keyin qidiruv boshlanadi
  useEffect(() => {
    if (searchQuery.length < 2) {
      setUsers([]);
      setPosts([]);
      return;
    }
    const search = async () => {
      try {
        const [usersRes, postsRes] = await Promise.all([
          searchApi.searchUsers(searchQuery),
          searchApi.searchPosts(searchQuery),
        ]);
        setUsers(usersRes.users || []);
        setPosts(postsRes.posts || []);
      } catch (e) {
        setUsers([]);
        setPosts([]);
      }
    };
    const t = setTimeout(search, 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const gridImages = posts.length > 0
    ? posts.map((p) => p.image || '/images/main-post.png')
    : Array(9).fill('/images/main-post.png');

  return (
    <div className="search-container">
      <SearchTopBar value={searchQuery} onChange={setSearchQuery} />
      <div className="search-content">
        {searchQuery.length >= 2 && users.length > 0 && (
          <div className="search-users">
            {users.map((u) => (
              <Link key={u.id} to="/profile" className="search-user-item">
                <img src={u.avatar || '/images/profile-image1.png'} alt={u.username} />
                <span>{u.username}</span>
              </Link>
            ))}
          </div>
        )}
        <div className="search-grid">
          {gridImages.map((img, index) => (
            <div key={index} className="search-grid-item">
              <img src={img} alt="" className="search-grid-image" />
            </div>
          ))}
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}

export default Search;
