import { AiOutlineSearch } from 'react-icons/ai';
import './SearchTopBar.css';

function SearchTopBar({ value, onChange, placeholder = 'Search' }) {
  return (
    <div className="search-top-bar">
      <div className="search-bar-inner">
        <AiOutlineSearch className="search-bar-icon" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="search-bar-input"
        />
      </div>
    </div>
  );
}

export default SearchTopBar;
