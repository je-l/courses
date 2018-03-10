const blogs = [
  {
    adult: true,
    blogs: [],
    _id: '5a999fd19d0a8a0269a301f8',
    username: 'aaa',
    name: 'bbb',
    __v: 0,
  },
  {
    adult: true,
    blogs: [],
    _id: '5a999fd19d0a8a0269a301f9',
    username: 'bloguser11',
    name: 'bloguser',
    __v: 3,
  },
  {
    adult: true,
    blogs: [],
    _id: '5a999fd49d0a8a0269a301fe',
    username: 'abfewafc',
    name: 'afewaaa',
    __v: 0,
  },
  {
    adult: true,
    blogs: [],
    _id: '5a999fd49d0a8a0269a301ff',
    username: '132131232',
    name: '12345',
    __v: 0,
  },
  {
    adult: true,
    blogs: [
      {
        likes: 3,
        _id: '5a99c79517a8c542069cef65',
        author: 'kirjailija kalle',
        url: 'http://example.com',
        title: 'kirja',
        __v: 0,
      },
      {
        likes: 4,
        _id: '5a99c7a117a8c542069cef66',
        author: 'a a',
        url: 'www.google.com',
        title: 'toinen kirja',
        __v: 0,
      },
      {
        likes: 4,
        _id: '5a9bce6a17a8c542069cef68',
        author: 'a',
        url: 'a',
        title: 'a',
        __v: 0,
      },
      {
        likes: 0,
        _id: '5a9bd16117a8c542069cef69',
        author: 'juuu',
        url: 'jaa',
        title: 'aaa',
        __v: 0,
      },
      {
        likes: 0,
        _id: '5a9bd2f517a8c542069cef6a',
        author: 'jaa',
        url: 'joo',
        title: 'testuserin lisäämä',
        __v: 0,
      },
      {
        likes: 0,
        _id: '5a9c05e517a8c542069cef6d',
        author: 'jaa',
        url: 'joo',
        title: 'juu',
        __v: 0,
      },
    ],
    _id: '5a99a1813287cb197da1512c',
    username: 'testuser',
    name: 'Test User',
    __v: 15,
  },
  {
    adult: true,
    blogs: [
      {
        likes: 0,
        _id: '5a9bd43c17a8c542069cef6c',
        author: 'aa',
        url: 'aa',
        title: 'toinenlisäämä',
        __v: 0,
      },
    ],
    _id: '5a9bcbea17a8c542069cef67',
    username: 'toinen',
    name: 'Toinen T',
    __v: 2,
  },
];

const getAll = () => {
  return Promise.resolve(blogs);
};

module.exports = { getAll };
