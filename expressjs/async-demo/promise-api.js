const p = Promise.resolve({id: 1});
p.then(result => console.log(result));

const p2 = Promise.reject(new Error('Error is Error'));
p2.then(result => console.log(result)).catch(err => console.log(err.message));


// Parallel Promise

const p3= new Promise((resolve, rejected) => {
    setTimeout(() => {
        console.log('Async Operation 1...');
        // resolve({id: 1});
        rejected(new Error('error is occured by p3'));
    }, 2000);
});

const p4 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2...');
        resolve({id: 2});
    }, 1500);
})

// 동시에 실행, 두 동작이 모두 끝나야하는 조건을 걸 수 있음
Promise.all([p3, p4]).then(result => console.log('all' + result)).catch(err => console.log(err.message));
Promise.race([p3, p4]).then(result => console.log('race' + result)).catch(err => console.log(err.message));

// async & await
