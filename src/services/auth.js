import { api } from './api';

export const authApi = {
  register(data) {
    return api.post('/api/auth/register', {
      name: data.fullName || data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password,
    });
  },

  login(data) {
    return api.post('/api/auth/login', {
      email: data.email,
      password: data.password,
    });
  },

  logout() {
    return api.post('/api/auth/logout');
  },
};

