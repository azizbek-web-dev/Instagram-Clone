import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';

function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'Jacob West',
    username: 'jacob_w',
    website: '',
    bio: 'Digital goodies designer\n@pixsellz\nEverything is designed.',
    email: 'jacob.west@gmail.com',
    phone: '+1 202 555 0147',
    gender: 'Male'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/profile');
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-header">
        <button className="header-btn cancel" onClick={() => navigate(-1)}>
          Cancel
        </button>
        <h1 className="edit-profile-title">Edit Profile</h1>
        <button className="header-btn done" onClick={handleSubmit}>
          Done
        </button>
      </div>

      <div className="edit-profile-content">
        <div className="profile-photo-section">
          <img src="/images/profile-image1.png" alt="profile" className="edit-profile-avatar" />
          <button className="change-photo-btn">Change Profile Photo</button>
        </div>

        <div className="edit-form-section">
          <div className="edit-field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="edit-field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="edit-field">
            <label>Website</label>
            <input
              type="text"
              name="website"
              placeholder="Website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
          <div className="edit-field">
            <label>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <button className="link-btn">Switch to Professional Account</button>
        </div>

        <div className="private-section">
          <h3 className="section-title">Private Information</h3>
          <div className="edit-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="edit-field">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="edit-field">
            <label>Gender</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
