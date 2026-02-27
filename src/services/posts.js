import { api } from './api';

// postlar bilan ishlash
export const postsApi = {
  getFeed() {
    return api.get('/api/posts/feed');
  },

  // rasm + caption + location
  createPost(data) {
    const formData = new FormData();
    formData.append('image', data.image);
    if (data.caption) formData.append('caption', data.caption);
    if (data.location) formData.append('location', data.location);
    return api.request('/api/posts', {
      method: 'POST',
      body: formData,
    });
  },

  getPost(id) {
    return api.get(`/api/posts/${id}`);
  },

  deletePost(id) {
    return api.delete(`/api/posts/${id}`);
  },

  likePost(id) {
    return api.post(`/api/posts/${id}/like`);
  },

  unlikePost(id) {
    return api.delete(`/api/posts/${id}/like`);
  },

  savePost(id) {
    return api.post(`/api/posts/${id}/save`);
  },

  unsavePost(id) {
    return api.delete(`/api/posts/${id}/save`);
  },

  addComment(id, body) {
    return api.post(`/api/posts/${id}/comments`, { body });
  },

  getComments(id) {
    return api.get(`/api/posts/${id}/comments`);
  },
};

