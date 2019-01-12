// Trade of between query performance vs consistency

// 접근법 1: Using References (Normalization) -> CONSISTENCY, performance bad
let author = {
    name: 'Mosh'
};

let course = {
    author: 'id',
    // authors: [
    //     'id1',
    //     'id2'
    // ]
};

// 접근법 2: Using Embedded Documents (Denormalization) -> inconsitency, performance well

let course = {
    author: {
        name: 'Mosh'
    }
}

// 접근법 3 : Hybrid

let author = {
    name: 'Mosh'
    // 50 other properties
};

// Optimization of performance and keep consistent
// 부분적으로 document 를 embed  함으로써 달성가능한 하이브리드 전략
let course = {
    author: {
        id: 'ref',
        name: 'Mosh'
    }
}