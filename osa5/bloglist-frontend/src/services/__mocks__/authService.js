const response = {
  name: 'Test User',
  username: 'testuser',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiX2lkIjoiNWE5OWExODEzMjg3Y2IxOTdkYTE1MTJjIiwiaWF0IjoxNTIwMTc4Mzk1fQ.F8_wn4RBO-o3WG7AofN2G--S_X6ZIzxgCktDgOZcz80', // eslint-disable-line
};

module.exports = () => Promise.resolve(response);
