import { api } from './api';

export const profileApi = {
  getProfile() {
    return api.get('/api/profile');
  },

  updateProfile(data) {
    return api.put('/api/profile', data);
  },

  changeAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.request('/api/profile/avatar', {
      method: 'POST',
      body: formData,
    });
  },

  getPosts() {
    return api.get('/api/profile/posts');
  },
};

