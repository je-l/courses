import authenticate from './services/authService';
import {
  deleteBlog,
  likeBlog,
  createBlog,
  getAll as getAllBlogs,
} from './services/blogs';

const NOTIFICATION_SHOW = 'notification/SHOW';
const NOTIFICATION_HIDE = 'notification/HIDE';

const LOADING_START = 'loading/START';
const LOADING_END = 'loading/END';

const USER_LOGOUT = 'user/LOGOUT';

const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';

const BLOG_CREATE = 'blog/CREATE';
const BLOG_FETCH = 'blog/FETCH';
const BLOG_SELECT = 'blog/SELECT';
const BLOG_DESELECT = 'blog/DESELECT';
const BLOG_LIKE = 'blog/LIKE';
const BLOG_DELETE = 'blog/DELETE';

export const createLoadingStart = () => ({
  type: LOADING_START,
});

export const createLoadingEnd = () => ({
  type: LOADING_END,
});

export const selectBlog = _id => ({
  type: BLOG_SELECT,
  _id,
});

export const deselectBlog = () => ({
  type: BLOG_DESELECT,
});

export const fetchBlogs = () => dispatch => {
  dispatch(createLoadingStart());

  getAllBlogs()
    .then(blogs => {
      dispatch({ type: BLOG_FETCH, blogs });
    })
    .then(() => dispatch(createLoadingEnd()));
};

export const createNotification = (text, isError) => dispatch => {
  dispatch({
    type: NOTIFICATION_SHOW,
    text,
    isError,
  });

  setTimeout(() => dispatch({ type: NOTIFICATION_HIDE }), 3000);
};

export const createDeleteAction = _id => dispatch => {
  deleteBlog(_id).then(() => {
    dispatch(createNotification('deleted blog successfully'));
    dispatch({ type: BLOG_DELETE, _id });
  });
};

export const createBlogLike = blog => dispatch => {
  likeBlog(blog).then(
    () => {
      dispatch({ type: BLOG_LIKE, _id: blog._id });
      dispatch(createNotification('liked successfully'));
    },
    () => dispatch(createNotification('err')),
  );
};

export const createBlogAction = (title, { author, url }) => dispatch => {
  dispatch(createLoadingStart());

  createBlog(title, { author, url }).then(
    res => {
      dispatch({ type: BLOG_CREATE, blog: res.data });
      dispatch(createNotification('added new'));
      dispatch(createLoadingEnd());
    },
    err => {
      dispatch(createNotification('err', err.response.data.error));
      dispatch(createLoadingEnd());
    },
  );
};

export const createLogout = () => {
  window.localStorage.removeItem('token');

  return {
    type: USER_LOGOUT,
  };
};

export const fetchUserToken = (username, password) => dispatch => {
  dispatch(createLoadingStart());

  authenticate(username, password).then(
    res => {
      window.localStorage.setItem('token', JSON.stringify(res));
      dispatch({ type: LOGIN_SUCCESS, ...res });
      dispatch(createLoadingEnd());
    },
    err => {
      const errMessage = err.response.data.error || 'login failed';

      dispatch(createNotification(errMessage, true));
      dispatch(createLoadingEnd());
      throw err;
    },
  );
};

const initialState = {
  notificationText: null,
  notificationError: null,
  loading: false,
  blogs: [],
  selection: null,
  ...JSON.parse(window.localStorage.getItem('token')),
};

export default (store = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_SHOW:
      const { isError, text } = action;
      return {
        ...store,
        notificationText: text,
        notificationError: isError,
      };
    case NOTIFICATION_HIDE:
      return { ...store, notificationText: null, notificationError: null };
    case LOADING_START:
      return { ...store, loading: true };
    case LOADING_END:
      return { ...store, loading: false };
    case LOGIN_SUCCESS:
      const { name, username, token } = action;
      return { ...store, name, username, token };
    case USER_LOGOUT:
      return { ...store, name: null, username: null, token: null };
    case BLOG_CREATE:
      return { ...store, blogs: store.blogs.concat(action.blog) };
    case BLOG_FETCH:
      return { ...store, blogs: action.blogs };
    case BLOG_SELECT:
      return { ...store, selection: action._id };
    case BLOG_DESELECT:
      return { ...store, selection: null };
    case BLOG_LIKE:
      return {
        ...store,
        blogs: store.blogs.map(b => {
          if (b._id === action._id) {
            return { ...b, likes: b.likes + 1 };
          }

          return b;
        }),
      };
    case BLOG_DELETE:
      return {
        ...store,
        blogs: store.blogs.filter(blog => {
          return blog._id !== action._id;
        }),
      };
    default:
      return store;
  }
};
