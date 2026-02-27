import { api } from './api';

export const searchApi = {
  searchUsers(q) {
    return api.get(`/api/search/users?q=${encodeURIComponent(q)}`);
  },

  searchPosts(q) {
    return api.get(`/api/search/posts?q=${encodeURIComponent(q)}`);
  },
};

