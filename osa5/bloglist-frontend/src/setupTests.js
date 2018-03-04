import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const mockLocalStorage = {};

window.localStorage = {
  getItem: key => mockLocalStorage[key] || null,
  setItem: (key, value) => {
    mockLocalStorage[key] = value;
  },
};
