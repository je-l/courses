const listHelper = require('../util/listHelper');

const exampleBlogs = require('./fixture/blogFixture');

test('dummy is called', () => {
  expect(listHelper.dummy()).toBe(1);
});

describe('totalLikes', () => {
  test('empty list should have 0 likes', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });


  test('exampleblogs total likes', () => {
    expect(listHelper.totalLikes(exampleBlogs)).toBe(36);
  });

  test('single element should have equal total likes', () => {
    const firstBlog = exampleBlogs[0];

    expect(listHelper.totalLikes([firstBlog]))
      .toEqual(firstBlog.likes);
  });
});

describe('favoriteBlog', () => {
  test('should return same element in one element list', () => {
    const firstBlog = exampleBlogs[0];
    expect(listHelper.favoriteBlog([firstBlog]))
      .toEqual(firstBlog);
  });

  test('should return "Canonical str..." as favorite', () => {
    expect(listHelper.favoriteBlog(exampleBlogs).title)
      .toBe('Canonical string reduction');
  });
});

describe('mostBlogs', () => {
  test('should return Robert Martin from example dataset', () => {
    expect(listHelper.mostBlogs(exampleBlogs).author)
      .toBe('Robert C. Martin');
  });

  test('should return same element with array of length 1', () => {
    const firstBlog = exampleBlogs[0];
    const result = listHelper.mostBlogs([firstBlog]);

    expect(result.author).toBe(firstBlog.author);
    expect(result.votes).toBe(firstBlog.votes);
  });
});

describe('mostLikes', () => {
  test('should return Dijkstra from example dataset', () => {
    const { author, likes } = listHelper.mostLikes(exampleBlogs);
    expect(author).toBe('Edsger W. Dijkstra');
    expect(likes).toBe(17);
  });
});
