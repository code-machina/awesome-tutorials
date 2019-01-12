const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  // author: authorSchema,
  // author: {
  //   type: authorSchema,
  //   required: true
  // }
  authors: [authorSchema],
}));

/* jshint ignore:start */
async function createCourse(name, author) {
  const course = new Course({
    name, 
    authors : author,
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.findById(courseId);
  course.author.name = 'Mosh Hamedani is awesome';
  course.save();
}
async function updateAuthor2(courseId) {
  // const course = await Course.update({ _id: courseId}, {
  //   $set: {
  //     'author.name' : 'John smith'
  //   }
  // });
  const course = await Course.updateOne({ _id: courseId}, {
    $unset: {
      'author' : ''
    }
  });
  // course.author.name = 'Mosh Hamedani is awesome';
  // course.save();
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}
// createCourse('Node Course', new Author({ name: 'Mosh' }));
// updateAuthor2('5c3a47e6b672ed2c5004f8ee')
// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'James' })
// ]);

// addAuthor('5c3a4a7b445e222b7c20edc7', new Author({name: 'Amy'}))

// remove amy 
removeAuthor('5c3a4a7b445e222b7c20edc7','5c3a4b00319a52332474a2bd');