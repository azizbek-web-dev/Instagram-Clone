import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { profileApi } from '../services/profile';
import './EditProfile.css';

function EditProfile() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    website: '',
    bio: '',
    email: '',
    phone: '',
    gender: ''
  });
  const [avatar, setAvatar] = useState('/images/profile-image1.png');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const load = async () => {
      try {
        const { user } = await profileApi.getProfile();
        setFormData({
          name: user.name || '',
          username: user.username || '',
          website: user.website || '',
          bio: user.bio || '',
          email: user.email || '',
          phone: user.phone || '',
          gender: user.gender || ''
        });
        setAvatar(user.avatar || '/images/profile-image1.png');
      } catch (e) {
        if (e?.status === 401) navigate('/login');
        else setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSaving(true);
    setError('');
    try {
      const { avatar: newAvatar } = await profileApi.changeAvatar(file);
      setAvatar(newAvatar);
    } catch (err) {
      setError(err.message || 'Failed to upload avatar');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await profileApi.updateProfile(formData);
      navigate('/profile');
    } catch (err) {
      const msg = err.errors ? Object.values(err.errors).flat()[0] : err.message;
      setError(msg || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-profile-container">
        <div className="edit-profile-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-header">
        <button className="header-btn cancel" onClick={() => navigate(-1)} disabled={saving}>
          Cancel
        </button>
        <h1 className="edit-profile-title">Edit Profile</h1>
        <button className="header-btn done" onClick={handleSubmit} disabled={saving}>
          {saving ? 'Saving...' : 'Done'}
        </button>
      </div>

      <div className="edit-profile-content">
        {error && <p className="edit-profile-error">{error}</p>}
        <div className="profile-photo-section">
          <img src={avatar} alt="profile" className="edit-profile-avatar" />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
          <button
            type="button"
            className="change-photo-btn"
            onClick={() => fileInputRef.current?.click()}
            disabled={saving}
          >
            Change Profile Photo
          </button>
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
          <button type="button" className="link-btn">Switch to Professional Account</button>
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
              placeholder="Male, Female, Other"
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
