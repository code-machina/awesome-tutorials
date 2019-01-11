const express = require('express');
const Joi = require('joi');
const router = express.Router();

// 
const courses = [
    {
        id: 1, name: 'course1'
    },
    {
        id: 2, name: 'course2'
    },
    {
        id: 3, name: 'course3'
    },

];

// 아래의 코드의 URI 는 상대 URI 로 변경된다. 
// 이는 index.js 파일에서 `app.use('/api/courses', courses);` 라고 정의하여
// 이미 /api/courses 라우팅을 걸어놓았기 때문이다.
// router.get('/api/courses', (req, res) => {
router.get('/', (req, res) => {
    // res.send([1,2,3,4]);
    res.send(courses);
});

// /api/courses/1
// router.get('/api/courses/:id', (req, res) => {
router.get('/:id', (req, res) => {
    // res.send(req.params.id);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if ( !course ) res.status(404).send('Not Found'); // 404
    res.send(course);
});

// router.get('/api/posts/:year/:month', (req, res) => {
router.get('/:year/:month', (req, res) => {
    // javascript interpolation style
    // res.send(`${req.params.year}  /  ${req.params.month}`);
    res.send({...req.params, query: req.query});
});

/* Post 요청은 아래와 같이 정의하고 
 ** postman 을 통해서 테스트 한다.
 */
// create new course
// router.post('/api/courses', (req, res) => {
router.post('/', (req, res) => {
    // joi 를 사용하기 위해 schema 를 정의 한다.
    const schema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, schema);
    // console.log(result);
    if ( result.error ) return res.status(400).send(result.error.details[0].message);
    // if ( !req.body.name || req.body.name.length < 3 ) { // joi 라는 모듈로 대체가 가능
    //     // 400 Bad Request
    //     res.status(400).send('minimum 3 characters needed');
    //     return; // must return; 
    // }
    const course = {
        id: courses.length +1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});

// update courses 
// router.put('/api/courses/:id', (req, res) => {
router.put('/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Not Found');

    // Validate
    // If invalid, return 400 - Bad request

    
    const { error } = validateCourse(req.body);
    if ( error )
    {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
});

// router.delete('/api/courses/:id', (req, res) => {
router.delete('/:id', (req, res) => {
    // Look up the course
    // Not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Not Found');

    // Delete
    const index = courses.indexOf(course)
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});

// 중복된 검증 로직을 함수로 만든다.
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}

module.exports = router;