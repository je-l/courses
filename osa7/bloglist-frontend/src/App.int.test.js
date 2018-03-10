import React from 'react';
import { mount } from 'enzyme';
import App from '../src/App';

jest.mock('./services/blogs');
jest.mock('./services/authService');

function waitUntilRender(selector) {
  return new Promise(resolve => {
    const intervalId = setInterval(() => {
      this.update();
      const match = this.find(selector);

      if (match.length) {
        clearInterval(intervalId);
        resolve(match);
      }
    }, 10);
  });
}

const withRenderWait = component => {
  return Object.assign(component, { waitUntilRender });
};

describe('<App />', () => {
  let app;

  beforeAll(() => {
    app = withRenderWait(mount(<App />));
  });

  it('should display login form if user is not logged in', () => {
    expect(app.html()).toContain('log in to application');
  });

  it('should display some blogs if logged in', async () => {
    const token = {
      name: 'Test User',
      username: 'testuser',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiX2lkIjoiNWE5OWExODEzMjg3Y2IxOTdkYTE1MTJjIiwiaWF0IjoxNTIwMTc4Mzk1fQ.F8_wn4RBO-o3WG7AofN2G--S_X6ZIzxgCktDgOZcz80', // eslint-disable-line
    };

    window.localStorage.setItem('token', JSON.stringify(token));
    app.update();
    app.find('button.login-btn').simulate('click');

    await app.waitUntilRender('dl.bloglist');

    const blogCount = app.find('.blog-item').length;
    expect(blogCount).toBeGreaterThan(2);
  });
});
