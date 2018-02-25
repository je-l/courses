const testHelper = require('./helper');
const User = require('../model/user');

let api;
let close;

beforeAll(async done => {
  const { api: newApi, close: newClose } = await testHelper.createApi();
  api = newApi;
  close = newClose;
  await testHelper.clearDb();
  done();
});

const auth = () => {
  return api.post('/api/login')
    .send({ username: 'bloguser11', password: '12345' })
    .expect(200);
};

describe('/api/users', () => {
  test('post with too short password receives 400', async () => {
    const newUser = {
      username: 'abc',
      name: 'abc',
      password: 'a',
    };
    await api.post('/api/users').send(newUser).expect(400);
  });

  test('username must be unique', async () => {
    const user = {
      username: 'aaa',
      name: 'bbb',
      password: 'abr4t43t34t',
    };

    await User.remove({ });
    await api.post('/api/users').send(user).expect(201);
    await api.post('/api/users').send(user).expect(400);
  });
});

describe('/api/blogs', () => {
  const testUser = {
    name: 'bloguser',
    username: 'bloguser11',
    password: '12345',
  };

  beforeAll(async () => {
    await api.post('/api/users').send(testUser).expect(201);
  });

  test('should fail to add new blog when not logged in', async () => {
    await api.post('/api/blogs').send({ title: 'a', url: 'a' })
      .expect(401);
  });

  test('get all blogs returns 200', async () => {
    await api.get('/api/blogs')
      .expect(200);
  });

  test('can add new blog with post request', async () => {
    const blogsBefore = await testHelper.blogsInDb();
    const { body: tokenBody } = await auth();

    const newBlog = { title: 'importance of testing', url: 'abc' };
    const { body } = await api.post('/api/blogs')
      .set('Authorization', `bearer ${tokenBody.token}`)
      .send(newBlog)
      .expect(201);

    const blogsAfter = await testHelper.blogsInDb();

    expect(body.title).toBe('importance of testing');
    expect(blogsAfter.length).toBe(blogsBefore.length + 1);

    const addedBlog = blogsAfter.find(i => i.title === newBlog.title);
    expect(addedBlog).toBeTruthy();
  });

  test('new blog gets 0 likes by default', async () => {
    const { body: { token } } = await auth();
    const { body } = await api.post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send({ title: '123', url: 'abc' })
      .expect(201);

    expect(body.likes).toBe(0);
  });

  test('should fail without url property', async () => {
    const { body: tokenBody } = await auth();

    await api.post('/api/blogs')
      .set('Authorization', `bearer ${tokenBody.token}`)
      .send({ title: '123' })
      .expect(400);
  });

  test('should remove blog from database with delete request', async () => {
    const beforeDelete = await testHelper.blogsInDb();

    const { body: { token } } = await auth();
    await api.delete(`/api/blogs/${beforeDelete[1]._id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200);

    const afterDelete = await testHelper.blogsInDb();
    expect(afterDelete.length).toBe(beforeDelete.length - 1);
  });

  test('should fail when removing nonexistent blog', async () => {
    await api.delete('/api/blogs/afewafewa')
      .expect(404);
  });

  test('should update blog title with patch request', async () => {
    const { body: { token } } = await auth();

    const { body: { _id } } = await api.post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send({ title: 'a', url: 'a' })
      .expect(201);

    await api.patch(`/api/blogs/${_id}`)
      .send({ title: 'newtitle' })
      .expect(200);

    const { body: { title } } = await api
      .get(`/api/blogs/${_id}`)
      .expect(200);

    expect(title).toBe('newtitle');
  });

  test('should return 404 when trying to modify missing', async () => {
    await api.patch('/api/blogs/12321321321')
      .expect(404);
  });
});

describe('/api/login', () => {
  test('should return 400 for missing password', async () => {
    await api.post('/api/login')
      .send({ username: 'abc' })
      .expect(400);
  });

  test('should return username with correct pw', async () => {
    const newUser = {
      name: 'afewaaa',
      username: 'abfewafc',
      password: '1234',
    };

    await api.post('/api/users').send(newUser).expect(201);
    const { body } = await api.post('/api/login')
      .send(newUser)
      .expect(200);

    expect(body.username).toBe(newUser.username);
  });

  test('should fail on incorrect pw', async () => {
    const newUser = {
      name: '12345',
      username: '132131232',
      password: 'abcdef',
    };

    const wrongUser = {
      username: '132131232',
      password: 'a',
    };

    await api.post('/api/users').send(newUser).expect(201);
    await api.post('/api/login').send(wrongUser).expect(401);
  });
});

afterAll(() => {
  close();
});
