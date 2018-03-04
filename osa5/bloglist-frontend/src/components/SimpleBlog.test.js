import React from 'react';
import { shallow } from 'enzyme';
import SimpleBlog from './SimpleBlog';

const blog = {
  title: 'blogi123',
  author: 'kirjoittaja',
  likes: 5,
};

describe('<SimpleBlog />', () => {
  it('should render title and author', () => {
    const rendered = shallow(<SimpleBlog blog={blog} />);
    const div = rendered.find('.title-author');

    expect(div.text()).toContain('blogi123');

    expect(div.text()).toContain('kirjoittaja');
  });

  it('should render likes', () => {
    const rendered = shallow(<SimpleBlog blog={blog} />);

    expect(rendered.find('.likes').text()).toContain('5');
  });

  it('should call onClick cb two times when clicked twice', () => {
    const cb = jest.fn();

    const rendered = shallow(<SimpleBlog blog={blog} onClick={cb} />);
    const button = rendered.find('button');

    button.simulate('click');
    button.simulate('click');
    expect(cb).toHaveBeenCalledTimes(2);
  });
});
