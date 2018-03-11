import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import { Blog as NonRoutedBlog } from './Blog';

const Blog = ({ children, ...rest }) => (
  <MemoryRouter>
    <NonRoutedBlog {...rest}>{children}</NonRoutedBlog>
  </MemoryRouter>
);

const exampleBlog = {
  _id: 'abc',
  url: 'http://example.com',
  title: 'Introduction to blogging I',
  author: 'Matti Meikäläinen',
  likes: 100,
};

describe('<Blog />', () => {
  it('should show only name and and author by default', () => {
    const wrapper = shallow(<Blog blog={exampleBlog} />);
    const html = wrapper.html();

    expect(html).toContain(exampleBlog.title);
    expect(html).toContain(exampleBlog.author);
    expect(html).not.toContain(exampleBlog.likes);
  });

  it('should offer link to invidual blog view', () => {
    const wrapper = shallow(<Blog blog={exampleBlog} />);
    wrapper.update();

    expect(wrapper.html()).toContain('href="/blogs/abc"');
  });
});
