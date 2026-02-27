import { api } from './api';

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

  getStory(username) {
    return api.get(`/api/stories/${username}`);
  },

  deleteStory(id) {
    return api.delete(`/api/stories/${id}`);
  },
};

