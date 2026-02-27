import { api } from './api';

// storylar 24 soat davom etadi
export const storiesApi = {
  getStories() {
    return api.get('/api/stories');
  },

  createStory(file) {
    const formData = new FormData();
    formData.append('image', file);
    return api.request('/api/stories', {
      method: 'POST',
      body: formData,
    });
  },

  // username bo'yicha story ko'rish
  getStory(username) {
    return api.get(`/api/stories/${username}`);
  },

  deleteStory(id) {
    return api.delete(`/api/stories/${id}`);
  },
};

