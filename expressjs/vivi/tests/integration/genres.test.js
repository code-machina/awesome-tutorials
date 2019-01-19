const request = require('supertest');
const { Genre } = require('../../models/genre'); // object destructor syntax : { Genres }
const { User } = require('../../models/user');
const mongoose = require('mongoose');

let server;
/* jshint ignore:start */
describe('/api/genres', () => {
  beforeEach(() => { server = require('../../index'); });
  afterEach(async () => { 
    await Genre.remove({});
    await server.close(); // close will return Promise object.

    // 생성한 모든 도큐먼트를 삭제한다.
    // await Genre.remove({});
  });
  describe('GET / ', () => {
    it('should return all genres', async () => {
      
      await Genre.collection.insertMany([
        {name: 'genre1'},
        {name: 'genre2'},
      ]);
      const res = await request(server).get('/api/genres');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
      expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
    });
  })
  describe('GET /:id', () => {
    it('should return a genre if valid id is passed', async () => {
      const genre = new Genre({ name: 'genre1'});
      await genre.save();

      const res = await request(server).get('/api/genres/' + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
    });
    it('should return 404 if invalid id is passed', async () => {
      const res = await request(server).get('/api/genres/1');

      expect(res.status).toBe(404);
    });
    it('should return 404 if no genere with given id exists', async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get('/api/genres/'+ id);

      expect(res.status).toBe(404);
    });
  });
  
  describe('POST /', () => {

    // QUOTES " Define the happy path, and then in each test, we change 
    // one parameter that clearly aligns with the name of the test.

    // what is happy path?
    // In the context of software or information modeling, a happy path is a default scenario featuring no exceptional or error conditions
    // See document, => https://en.wikipedia.org/wiki/Happy_path :joy:
    // it( /* this is happy path -> */ 'should return 401 if client is not logged in', async() => {

    let token;
    let name;

    const exec = async () => {
      return await request(server)
      .post('/api/genres')
      .set('x-auth-token', token)
      .send({name: name});
    }

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = 'genre1';
    });
    it('should return 401 if client is not logged in', async() => {
      // const res = await request(server)
      // .post('/api/genres')
      // .send({name: 'genre1'});
      token = '';
      const res = await exec();

      expect(res.status).toBe(401);
    });
    it('should return 400 if genre is less than 5 characters', async() => {

      // Step 1. Create Token 
      // FIXME: Below code is moved to `beforeEach` lifecycle function.
      // const token = new User().generateAuthToken();
      name = '1234';
      const res = await exec();

      // const res = await request(server)
      // .post('/api/genres')
      // .set('x-auth-token', token)
      // .send({name: '1234'});

      expect(res.status).toBe(400);
    });

    it('should return 400 if genre is greater than 50 characters', async() => {

      // Step 1. Create Token 
      // const token = new User().generateAuthToken();
      // Step 2. Dynamically genereate long string...
      // Tip for that...
      /*
        // to genreate string which has more than 50 characters, you should pass 52 to Array constructor
        // I don't know the reason why I have to do this. but testing is simple. Just accept it.
        > (new Array(52).join('a')).length;
        51
        > (new Array(51).join('a')).length;
        50
        // To test it properly, the input string length must be greater than 50. 
        // So, I typed a code block like the below
      */
      name = new Array(52).join('a');
      // const res = await request(server)
      // .post('/api/genres')
      // .set('x-auth-token', token)
      // .send({name: name});
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should save the genre if it is valid', async() => {

      // Step 1. Create Token 
      token = new User().generateAuthToken();

      // const res = await request(server)
      // .post('/api/genres')
      // .set('x-auth-token', token)
      // .send({name: 'genre1'});

      // TODO: remove duplate codes
      await exec();

      const genre = await Genre.find({ name: 'genre1'});
      expect(genre).not.toBeNull();
    });

    it('should return the genre if it is valid', async() => {

      // Step 1. Create Token 
      // every test codes contains same code 
      // const token = new User().generateAuthToken();
      token = new User().generateAuthToken();

      // const res = await request(server)
      // .post('/api/genres')
      // .set('x-auth-token', token)
      // .send({name: 'genre1'});
      const res = await exec();
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genre1');
    });

    
  });
});