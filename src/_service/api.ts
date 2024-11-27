import axios from 'axios';
import Cookies from 'universal-cookie';

const getToken = () => {
  const cookies = new Cookies();

  return cookies.get('__session') ?? null;
};

const refresh = async () => {
  try {
    const cookies = new Cookies();
    const refreshToken = cookies.get('refreshToken');

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        refreshToken,
        accessToken: getToken(),
      }
    );

    const { accessToken: token, refreshToken: newRefreshToken } = response.data;

    cookies.set('__session', token, { path: '/' });
    cookies.set('refreshToken', newRefreshToken, { path: '/' });

    return token;
  } catch (err) {
    if (typeof window === 'undefined') return;
    window.location.href = '/login';
  }
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      // eslint-disable-next-line
      config.headers.Authorization = `Bearer ${token}`;
    }
    // eslint-disable-next-line
    config.headers['Accept-Language'] = 'en-US';
    if (config.method === 'post' || config.method === 'put') {
      // eslint-disable-next-line
      config.headers['Content-Type'] =
        config.headers['Content-Type'] ?? 'application/json';
    }

    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refresh();

      return api(originalRequest);
    }
    if (error.response.status === 422) {
      throw new Error(JSON.stringify(error.response.data.Errors));
    }
    if (error.response.status === 403) {
      throw new Error('You are not authorized to perform this action');
    }
    if (error.response.status === 404) {
      throw new Error('Resource not found');
    }
    if (error.response.status === 500) {
      throw new Error('Internal server error');
    }
    if (error.response.status === 503) {
      throw new Error('Service unavailable');
    }

    return Promise.reject(error);
  }
);
export default api;
