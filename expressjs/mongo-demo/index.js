const mongoose = require('mongoose');

// configuration 파일을 통해 mongodb 설정을 한다. (*실제)
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true } ) //=> Return Promise
    .then(() => console.log('Connected to MongoDB....'))
    .catch(err => console.log('Could not connect to MongoDB...', err));


// 스키마를 만들어본다. 
/* const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
}); */

// 실제에는 joi 와 mongoose validation 을 모두 사용해야 한다.
// 아래의 schema 는 위의 schema 에서 validation 을 추가한 버전이다. 
const courseSchema = new mongoose.Schema({
    // 이 validation 은 오로지 mongoose 에서만 적용된다.
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    }, 
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true, // 소문자로 변환해 준다.
        trim: true, // 공백 문자를 제거해 준다.
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(() => {

                    // 실제 작업에서는 파일시스템 혹은 데이터베이스를 조회한다.
                    const result = v && v.length > 0;
                    callback(result);
                }, 1000);
                // Do some async work 
                // callback()
                // return v && v.length > 0; // check v is not null and v.length is greater than 0;
            },
            message: 'A course should hav at least one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        // isPublished 가 true 인 경우 price 가 필요하다는 조건을 담는다.
        required: function() { return this.isPublished; },
        min: 10, // 최소 10 $
        max: 200, // 최대 200 $
        get: v => Math.round(v), 
        set: v => Math.round(v),
    }
});

// Classes, objects
// Human, John
// Course, nodeCourse

const Course = mongoose.model('Course', courseSchema);

// 아래의 Directive 를 통해 JSHINT 를 무시한다.
/* jshint ignore:start */
async function createCourse() {
    const course = new Course({
        name: 'Angular.js Course',
        category: 'Web ',
        author: 'gbkim',
        tags: ['angular', 'backend'],
        // tags: null,
        isPublished: true,
        price: 15.6
    });

    try{
        // await course.validate(err => {
        //     if(err) { console.log(err.message + " : handled by callback ")}
        // })
        await course.validate();
        const result = await course.save();
        console.log(result);
    }catch (ex) {
        // console.log(ex.message)
        // ex.errors
        for ( field in ex.errors )
            console.log(ex.errors[field].message)
    }
};

// test getter, setter of mongoose validator
// first, declare getCourseWithId()
// second, call getCourseWithId and see what's going on.
async function getCourseWithId(id){
    const course = await Course.findById(id) // wait for finishing query documents.
    .select('price');
    console.log(course.price);
}

getCourseWithId('5c3a380e591fc25598edba63')

// name 
/// UnhandledPromiseRejectionWarning: ValidationError: 
/// Course validation failed: name: Path `name` is required.
// createCourse();

async function getCourses() {
 // /api/courses?pageNumber=2&pageSize=10 
 const pageNumber = 1;
 const pageSize = 10;
 
 // eq (equal)
 // ne (not equal)
 // gt (greater than)
 // gte (greater than or equal to)
 // lt (less than)
 // lte (less than or equal to)
 // in 
 // nin (not in)

 // Logical Operator
 // or 
 // and

 // Regular Expression

 const courses = await Course
    // .find({ author: 'gbkim', isPublished: true})
    // .find({ price: { $gt: 10 } }) // price > 10 인 경우
    // .find({ price: { $gte: 10, $lte: 20 }}) // 20 >= price >= 10  인 조건
    // .find({ price: { $in: [10, 15, 20] } }) // 10, 15, 20 인 price 를 필터
    // Logical Operation
    // // .find()
    // // .or([ { author: 'Mosh' }, { isPublished: true} ]) 
    // // .and([ ]) 
    // .find({ author: /^gbkim/ }) // gbkim 으로 시작하는 author 찾기
    // .find({ author: /kim$/ }) // kim 으로 끝나는 author 찾기
    // .find({ author: /kim$/i }) // kim 으로 끝나는 author 찾기 (Case Insensitive: / /i)
    .find({ author: /.*im.*/ }) // im 이 중간에 위치하는 author 찾기
    // .limit(10)
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ 
        name: 1  // 1: ascending , -1: descending
    })
    .select({ // select property to return : 원하는 칼럼을 선택하여 출력
        name: 1, tags: 1
    })
    // .count(); // 카운트를 출력할 때 사용한다. (DeprecationWarning: collection.count is deprecated)
    .countDocuments(); 
 console.log(courses);
}

async function getCourse2(){
    const course = await Course
    .find({ isPublished: true, tags: 'frontend', name: /Xourse/i })
    .sort({ name: -1 })
    .select({ author: 1, name: 1})
    console.log(course);
}

async function getCourse3(){
    const course = await Course
    // .find({ isPublished: true, tags: { $in: ['backend', 'frontend' ]} })
    .find({ isPublished: true })
    .or([{tags: 'backend'}, {tags: 'frontend'}])
    .sort({ price: -1 }) // -1: sort by descending order 
    // .sort('-price') // 위와 동일
    .select({ name: 1, author: 1, price: 1, tags: 1 }) // pick only name, and author
    // .select('name author price tags') // 위와 동일
    // display 
    console.log(course);
}

async function getCourse4(){
    const course = await Course
    .find({ isPublished: true }) // all the published courses
    .or([ { price: { $gte: 15 } }, {name: /.*by.*/ } ])
    .select("name author price")
    console.log(course);
}

/* jshint ignore:end */

// 아래의 함수가 실행되면 데이터가 생성된다.
// createCourse();

// 이제, 데이터를 조회해본다.

// getCourses();
// getCourse4();

// 도큐먼트를 업데이트하는 방법을 다룬다.

/* jshint ignore:start */
async function updateCourse1(id) {
    // 접근법: Query First
    // 사용할 메서드 : findById()
    // 동작: Modify its properties 
    // 커밋: save()
    const course = await Course.findById(id);
    console.log(course);
    if(!course) return;
    course.isPublished = true;
    course.author = 'Another Author';

    // 변경한 내용을 저장
    const result = await course.save();
    console.log(result);
}

async function updateCourse2(id) {
    // 접근법: Update first
    // 방법 : Update Directly
    // get the updated document 
    // 아래의 링크를 참조하여 operator 에 대한 정보를 얻어라.
    // https://docs.mongodb.com/manual/reference/operator/update/
    const result = await Course.update({ _id: id }, {
        $set: {
            author: "Jack Dash",
            isPublished: true,
        }
    });

    
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: "Jack Dash Dash Dash",
            isPublished: true,
        }
    }, { new: true }); // {new: true} 를 추가하여 findByIdAndUpdate 메서드가 리턴하는 
    // 도큐먼트가 갱신 후 도큐먼트이도록 설정한다. {new: true} 가 빠지면 갱신전 도큐먼트를 리턴한다.

    console.log(course);
}

async function removeCourse(id) {
    // Course.deleteOne({ isPublished: false }) // isPublished: false 인 도큐먼트를 하나만 삭제
    // const result = await Course.deleteOne({ _id: id })
    const course = await Course.findByIdAndRemove(id)
    console.log(course);
}
/* jshint ignore:end */

// updateCourse1('5ba63524fb61b41770a24af1');

// updateCourse2('5ba63524fb61b41770a24af1');

// removeCourse('5ba63524fb61b41770a24af1')