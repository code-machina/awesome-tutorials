const request = require('supertest');
const { Rental } = require('../../models/rental');
const { User } = require('../../models/user');
const { Movie } = require('../../models/movie');
const mongoose = require('mongoose');
const moment = require('moment');

/* jshint ignore:start */

// test suite
describe('/api/returns', () => {
  let server;
  let customerId;
  let movieId;
  let rental;
  let token; 
  let movie;
  beforeEach(async () => { 
    server = require('../../index'); 
    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();
    token = new User().generateAuthToken();

    movie = new Movie({
      _id: movieId,
      title: '12345',
      dailyRentalRate: 2,
      genre: { name: '12345' },
      numberInStock: 10
    });

    await movie.save();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: '12345',
        phone: '12345',
      },
      movie: {  
        _id: movieId,
        title: '12345',
        dailyRentalRate: 2,
      }
    });
    await rental.save();
  });

  afterEach(async () => { 
    await server.close(); 
    await Rental.remove({});
    await Movie.remove({});
    // 생성한 모든 도큐먼트를 삭제한다.
  });

  const exec = () => {
    return request(server)
    .post('/api/returns')
    .set('x-auth-token', token)
    .send({ customerId, movieId });
  }

  it('should work!', async () => {
    const result = await Rental.findById(rental._id);
    expect(result).not.toBeNull();
  });

  it('should return 401 if client is not logged in', async () => {
    token = ''

    const res = await exec();
    // request(server).post('/api/retuns').send({ customerId: customerId, movieId: movieId });
    // const res = await request(server)
    //   .post('/api/returns')
    //   .send({ customerId, movieId });
    expect(res.status).toBe(401);
  });

  // 아래의 코드는 customerId 가 제공되지 않은 경우이다. 
  // 그리고 테스트 코드는 일부로 customerId 를 누락한다. 
  // 그리고 jest 를 통해서 에러 코드를 확인하고, /routes/returns.js 파일에 코드를 추가한다.
  // 아래의 테스트 케이스를 통해 if(!res.body.customerId) return res.status(400).send('customerId is not provided') 를 구현한다.
  it('should return 400 if customerId is not provided', async () => {
    // request(server).post('/api/retuns').send({ customerId: customerId, movieId: movieId });
    // const token = new User().generateAuthToken();
    // const res = await request(server)
    //   .post('/api/returns')
    //   .set('x-auth-token', token)
    //   .send({ movieId });
    customerId = '';
    const res = await exec();
    expect(res.status).toBe(400);
  });

  // 위의 내용과 마찮가지로 movieId 를 일부러 제공하지 않는다. 
  // 그리고 아래의 테스트 케이스를 통해서 401 에러를 확인한다. 즉, 에러 처리가 제대로 이루어지지 않는 것이다.
  // 따라서, if(!res.body.movieId) return res.status(400).send('movieId is not provided') 를 구현한다.
  it('should return 400 if movieId is not provided.', async () => {
    // request(server).post('/api/retuns').send({ customerId: customerId, movieId: movieId });
    // const token = new User().generateAuthToken();
    // const res = await request(server)
    //   .post('/api/returns')
    //   .set('x-auth-token', token)
    //   .send({ customerId });
    movieId = '';
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 404 if no rental found in this customer/movie', async () => {
    await Rental.remove({});

    const res = await exec();

    expect(res.status).toBe(404);
  });

  it('should return 400 if rental already processed.', async () => {
    rental.dateReturned = new Date();
    await rental.save();
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 200 if valid request', async () => {

    const res = await exec();

    expect(res.status).toBe(200);
  });

  it('should set the return date', async () => {

    const res = await exec();

    const rentalInDb = await Rental.findById(rental._id);
    const diff = new Date() - rentalInDb.dateReturned;
    expect(diff).toBeLessThan(10* 1000);
    // expect(rentalInDb.dateReturned).toBeDefined();

  });

  it('should caculate rental fee (numberOfDays * movie.dailyRentalRate)', async () => {
    // dateOut (current time);
    rental.dateOut = moment().add(-7, 'days').toDate(); // 7 days ago
    await rental.save();

    const res = await exec();

    const rentalInDb = await Rental.findById(rental._id);
    expect(rentalInDb.rentalFee).toBe(14);

  });

  it('should increase the stock', async () => {
    const res = await exec();

    const movieInDb = await Movie.findById(movie._id);
    expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);

  });

  it('should return the rental if input is valid', async () => {
    const res = await exec();

    const rentalInDb = await Rental.findById(rental._id);
    // 아래의 코드는 너무 중복이다. 
    // expect(res.body).toHaveProperty('dateOut');
    // expect(res.body).toHaveProperty('dateReturned');
    // expect(res.body).toHaveProperty('rentalFee');
    // expect(res.body).toHaveProperty('customer');
    // expect(res.body).toHaveProperty('movie');

    // 아래와 같이 작성하는 것이 더 좋다.
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(['dateOut', 'dateReturned', 'rentalFee', 'customer', 'movie'])
    );

  });

});