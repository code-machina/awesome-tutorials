// 비동기 버전

/* console.log('Before');
// const user = getUser(1, (user)=>{console.log(user)});
getUser(1, (user)=>{
    console.log(user)

    // Get the repository
    getRepos(user.user, (repos) => {
        console.log('Repos', repos)
        getCommits(repos[0], (commits) => {
            // 그러나 콜백 방식은 `콜백 지옥` 이라고 부름.
        });
        getCommits(repos[0], displayCommits);
    })
}); // callback example...

// 위의 방식보다 더 쉽게 하는 방법 : Named Function
getUser(1, getRepos)
// console.log(user); // it will print undefined
console.log('After');
 */
// 동기 버전
/* console.log('Before');
const user = await getUser(1);
const repos = await getRepos(user.user);
const commits = getCommits(repos[0]);
console.log('After')
 */

// Callbacks
// Promises
// Async/await

// 비동기 코드 패턴
function getUser(id){ // , callback) {
    // setTimeout(() => {
    //     console.log('Reading a user from a database....');
    //     callback({ id: id, user: 'mosh'})
    //     // return { id: id, user: 'mosh'};
    // }, 2000); // 단지 예약할뿐....

    return new Promise((resolve, reject) => {
        // 비동기 동작 
        setTimeout(() => {
            console.log('Reading a user from a database....');
            resolve({ id: id, user: 'mosh'})
            // return { id: id, user: 'mosh'};
        }, 2000); // 단지 예약할뿐....
    })
}

// Callbacks...
function getRepos(username){ // , callback){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling Github API....');
            // return ['repo1', 'repo2', 'repo3'];
            resolve(['repo1', 'repo2', 'repo3'])
        }, 2000);   
    });
    // setTimeout(() => {
    //     console.log('Calling Github API....');
    //     // return ['repo1', 'repo2', 'repo3'];
    //     callback(['repo1', 'repo2', 'repo3'])
    // }, 2000);   
}

function getCommits(repo){ // , callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve(['#1', '#2', '#3'])
            reject(new Error("commits error"))
        }, 2000)
    });
    
}
function displayCommits(commits) {
    console.log(commits);
}


console.log('After');
/* getUser(1)
    .then(user => getRepos(user.user) )
    .then(repos => getCommits(repos[0]) )
    .then(commits => displayCommits(commits) )
    .catch(error => console.log(error))
 */
// Creating Settled Promise

async function displayCommits() {
    try{
        const user = await getUser(1);
        console.log('call repos')
        const repos = await getRepos(user.user);
        console.log('call commits')
        const commits = await getCommits(repos[0]);
        console.log(commits);        
    }catch(err) {
        console.log('Error', err.message);
    }

}

displayCommits();

console.log('Before');