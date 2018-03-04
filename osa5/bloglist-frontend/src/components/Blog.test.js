import React from 'react';
import { shallow } from 'enzyme';
import Blog from './Blog';

const exampleBlog = {
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

  it('should show likes when opened', () => {
    const wrapper = shallow(<Blog blog={exampleBlog} isOpen />);

    expect(wrapper.html()).toContain(exampleBlog.likes);
  });
});
