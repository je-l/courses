const dummy = () => {
  return 1;
};

const totalLikes = blogs => (
  blogs.reduce((acc, blog) => {
    return acc + blog.likes;
  }, 0)
);

const favoriteBlog = blogs => {
  const sorted = blogs.sort((a, b) => {
    return a.likes - b.likes;
  });

  return sorted[sorted.length - 1];
};

const keyWithHighestVal = map => {
  const sorted = Object.keys(map).sort((a, b) => (
    map[a] - map[b]
  ));

  return sorted[sorted.length - 1];
};

const mostBlogs = blogs => {
  const writerBlogCounts = blogs.reduce((acc, { author }) => {
    if (!acc[author]) {
      acc[author] = 0;
    }

    acc[author] += 1;
    return acc;
  }, {});

  const author = keyWithHighestVal(writerBlogCounts);

  return { author, blogs: writerBlogCounts[author] };
};

const mostLikes = blogs => {
  const writerLikeCounts = blogs.reduce((acc, { author, likes }) => {
    if (!acc[author]) {
      acc[author] = 0;
    }

    acc[author] += likes;
    return acc;
  }, {});

  const author = keyWithHighestVal(writerLikeCounts);

  return { author, likes: writerLikeCounts[author] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
