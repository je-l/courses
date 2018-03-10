import axios from 'axios';

const baseUrl = '/api/blogs';

const decodeLocalStorage = item => {
  return JSON.parse(window.localStorage.getItem(item));
};

export const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

export const createBlog = (title, { author, url }) => {
  const { token } = decodeLocalStorage('token');

  return axios.post(
    baseUrl,
    { author, url, title },
    { headers: { Authorization: `bearer ${token}` } },
  );
};

export const deleteBlog = id => {
  const { token } = decodeLocalStorage('token');

  return axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: `bearer ${token}` },
  });
};

export const likeBlog = blog => {
  return axios.patch(`${baseUrl}/${blog._id}`, {
    ...blog,
    likes: blog.likes + 1,
  });
};
