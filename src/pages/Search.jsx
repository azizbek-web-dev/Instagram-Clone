import { useState } from 'react';
import SearchTopBar from '../components/SearchTopBar';
import BottomNavbar from '../components/BottomNavbar';
import './Search.css';

const gridImages = [
  '/images/main-post.png',
  '/images/profile-image1.png',
  '/images/profile-image2.png',
  '/images/profile-image3.png',
  '/images/profile-image4.png',
  '/images/profile-image5.png',
  '/images/profile-image6.png',
  '/images/profile-image7.png',
  '/images/main-post.png'
];

function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="search-container">
      <SearchTopBar value={searchQuery} onChange={setSearchQuery} />
      <div className="search-content">
        <div className="search-grid">
          {gridImages.map((img, index) => (
            <div key={index} className="search-grid-item">
              <img src={img} alt="" className="search-grid-image" />
              {(index === 0 || index === 2 || index === 4) && (
                <div className="carousel-badge"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}

export default Search;
