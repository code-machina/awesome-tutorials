
// resolve 와 reject 를 인자로 받는다.
const p = new Promise((resolve, reject) => {
    // 비동기 동작을 진행한다.
    // ... 
    setTimeout(() => {
        // resolve(1); // pneding => resolved, fulfilled 
        reject(new Error('에러가 발생했네요?')); // pending => rejected
    }, 2000);
    
});

p.then(
    (res) => {
        console.log(res);
    }
).catch(
    (e) => {console.log(e.message)}
);