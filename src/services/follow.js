import { api } from './api';

// obuna bo'lish / olib tashlash
export const followApi = {
  follow(userId) {
    return api.post(`/api/users/${userId}/follow`);
  },

  unfollow(userId) {
    return api.delete(`/api/users/${userId}/follow`);
  },

  getFollowers(userId) {
    return api.get(`/api/users/${userId}/followers`);
  },

  getFollowing(userId) {
    return api.get(`/api/users/${userId}/following`);
  },
};

