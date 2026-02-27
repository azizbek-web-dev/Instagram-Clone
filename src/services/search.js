import { api } from './api';

// qidiruv - 2 ta belgidan keyin ishlaydi
export const searchApi = {
  searchUsers(q) {
    return api.get(`/api/search/users?q=${encodeURIComponent(q)}`);
  },

  searchPosts(q) {
    return api.get(`/api/search/posts?q=${encodeURIComponent(q)}`);
  },
};

