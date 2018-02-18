const supertest = require('supertest');
const { app, server } = require('../index');
const testHelper = require('./helper');

const api = supertest(app);

beforeAll(async () => {
  await testHelper.populateDb();
});

describe('/api/blogs', () => {
  test('get all blogs returns 200', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /json/);
  });

  test('can add new blog with post request', async () => {
    const blogsBefore = await testHelper.blogsInDb();
    const newBlog = { title: 'importance of testing', url: 'abc' };
    const { body } = await api.post('/api/blogs')
      .send(newBlog)
      .expect(201);

    const blogsAfter = await testHelper.blogsInDb();

    expect(body.title).toBe('importance of testing');
    expect(blogsAfter.length).toBe(blogsBefore.length + 1);

    const addedBlog = blogsAfter.find(i => i.title === newBlog.title);
    expect(addedBlog).toBeTruthy();
  });

  test('new blog gets 0 likes by default', async () => {
    const { body } = await api.post('/api/blogs')
      .send({ title: '123', url: 'abc' });

    expect(body.likes).toBe(0);
  });

  test('should fail without url property', async () => {
    await api.post('/api/blogs')
      .send({ title: '123' })
      .expect(400);
  });

  test('should remove blog from database with delete request', async () => {
    const beforeDelete = await testHelper.blogsInDb();
    await api.delete(`/api/blogs/${beforeDelete[0]._id}`)
      .expect(200);

    const afterDelete = await testHelper.blogsInDb();
    expect(afterDelete.length).toBe(beforeDelete.length - 1);
  });

  test('should fail when removing nonexistent blog', async () => {
    await api.delete('/api/blogs/afewafewa')
      .expect(404);
  });

  test('should update blog title with put request', async () => {
    const [firstBlog] = await testHelper.blogsInDb();
    await api.patch(`/api/blogs/${firstBlog._id}`)
      .send({ title: 'newtitle' })
      .expect(200);

    const afterPatch = await testHelper.blogsInDb();
    const updated = afterPatch.find(i => i._id.equals(firstBlog._id));

    expect(updated.title).toBe('newtitle');
  });

  test('should return 404 when trying to modify missing', async () => {
    await api.patch('/api/blogs/12321321321')
      .expect(404);
  });
});


afterAll(async () => {
  await testHelper.clearDb();
  server.close();
});
