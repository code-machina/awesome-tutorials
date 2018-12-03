# redux-tutorial-2

Advanced Redux Tutorial [Advanced Redux Tutorial][1]

**저자 주: 영어로 요약하면서 rephrasing 을 연습한다. 영어는 생활!**

## Async Actions

- build asynchronous application
  - fetch the current headlines using Reddit API

### Actions

- Call an asynchronous API (ajax)
- there are two crucial moments in time
  - the moment you start the Call
  - the moment when you receive an answer (or a timeout)
- each moments require a change of application state
  - Need to dispatch normal actions, which will be processed synchronously
- for any API request dispatch at least three different kinds of actions
  - Action 1. Informing the reducers that the request began
    - toggle `isFetching` on
    - show a spinner
    - show the response in a rendered way
  - Action 2. Informing the reducers that the request finished successfully
    - toggle `isFetching` off
    - hide a spinner
  - Action 3. Informing the reducers that the request failed
    - toggle `isFetching` off
    - hide a spinner
    - show the error message

### Need to decide

It's a convent you need to decide with your team.

- **use a single action type with flags**
```javascript
{ type: 'FETCH_POSTS' }
{ type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
{ type: 'FETCH_POSTS', status: 'success', response: { ... } }
```
- **use multiple action types**
```javascript
{ type: 'FETCH_POSTS_REQUEST' }
{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }
```

### Configure Synchronous Action Creators

1. define action types and creators

**action.js**
```javascript
/* the user can select a subreddit to display */
// action type
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
// action creator, which will return object
export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}
```
action for pressing refresh button
```javascript
/* action type */
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
/* action creator */
export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}
```

the actions were governed by the user interaction. Now, there will be another kind of action, governed by the network requests.
```javascript
/*when we fetch the posts, dispatch a `REQUEST_POSTS` action*/
export const REQUEST_POSTS = 'REQUEST_POSTS'

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}
```
when the response arrive, dispatch `RECEIVE_POSTS` action
```javascript
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
​
function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}
```

### Design the State Shape

Roughly Design App's State Shape like below snippet

#### Notes
- store each subreddit's info separately
  - so that we can cache it

**Below paragraphs may be important later, but not now**
> In this example, we store the received items together with the pagination information. However, this approach won't work well if you have nested entities referencing each other, or if you let the user edit items. Imagine the user wants to edit a fetched post, but this post is duplicated in several places in the state tree. This would be really painful to implement.

> If you have nested entities, or if you let users edit received entities, you should keep them separately in the state as if it was a database. In pagination information, you would only refer to them by their IDs. This lets you always keep them up to date. The real world example shows this approach, together with normalizr to normalize the nested API responses. With this approach, your state might look like this:

Before normalizing
```javascript
{
  selectedSubreddit: 'frontend',
  postsBySubreddit: {
    frontend: {
      isFetching: true,
      didInvalidate: false,
      items: []
    },
    reactjs: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1439478405547,
      items: [
        {
          id: 42,
          title: 'Confusion about Flux and Relay'
        },
        {
          id: 500,
          title: 'Creating a Simple Application Using React JS and Flux Architecture'
        }
      ]
    }
  }
}
```
After normalizing using mormalizr
```javascript
{
  selectedSubreddit: 'frontend',
  entities: {
    users: {
      2: {
        id: 2,
        name: 'Andrew'
      }
    },
    posts: {
      42: {
        id: 42,
        title: 'Confusion about Flux and Relay',
        author: 2
      },
      100: {
        id: 100,
        title: 'Creating a Simple Application Using React JS and Flux Architecture',
        author: 2
      }
    }
  },
  postsBySubreddit: {
    frontend: {
      isFetching: true,
      didInvalidate: false,
      items: []
    },
    reactjs: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1439478405547,
      items: [ 42, 100 ]
    }
  }
}
```

#### Memo: enhanced object literals

`enhanced object literals` is a kind of ex6's syntax feature. Dictionary is command type for key-value pair structure in `python`. Javascript also provides a same feature, but it go further. In short, `EOL` (enhanced blah ~), which was shortened by me, feature translate variable name into dictionary's keyword literally. See the below code.

In traditional javascript, you have to inform an interpreter that the variable name `foo` is a constant variable `obj`'s `key name`.

In es6, you can put a variable into `dictionary` without designating a key name.

**P.S 영어 표현이 깔끔하지 않을 수 있다. 좀 더 노력한다.**

```javascript
// traditional
const obj = {
  foo: foo,
  bar: 42
}
// es6
const obj = {
  foo,
  bar: 42
}
```

### Babel-Polyfill

Every Tutorial doesn't let you understand everything. ES6 isn't working on every browsers. When you want to use es6 features, You have to apply babel, and babel-polyfill. Especially babel-polyfill is running on run-time.

We can see the description about `babel-polyfill`

Below link is a reference link. It is written in korean.

[babel-이해하기][2]

> babel-polyfill
babel을 사용한다고 자바스크립트 최신 함수를 사용할 수 있는 건 아니다. 초기에 babel만 믿고 최신 함수를 사용했다가 브라우저에서 동작하지 않는 것을 보고 당황했었다. babel은 문법을 변환해주는 역할만 할 뿐이다. polyfill은 프로그램이 처음에 시작될 때 현재 브라우저에서 지원하지 않는 함수를 검사해서 각 object의 prototype에 붙여주는 역할을 한다. 즉, babel은 컴파일-타임에 실행되고 babel-polyfill은 런-타임에 실행된다.

### Middleware

Middleware is a code you can put between the framework receiving a request and the framework generating a response.

- Strength
  - composable in a chain
  - use multiple independent third-party middleware in a single project

#### Redux Middleware

Provides a third-party extension point between dispatching an action, and the moment it reaches the reducer

- Usage
  - logging
  - crash reporting
  - asynchronous API
  - routing
  - etc

I referenced [the official document][3].

##### Step 1. Write some code where there is middleware logic

You can see a basic code structure.
First of all it is based on arrow function syntax. Second it must return a result that is from next function

```javascript
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
​
const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    })
    throw err
  }
}
```

##### Step 2. Apply middleware to A Redux Store

When you create Redux Store, you have to call `applyMiddleware` API from `redux` module.

```javascript
import { createStore, combineReducers, applyMiddleware } from 'redux'
​
const todoApp = combineReducers(reducers)
const store = createStore(
  todoApp,
  // applyMiddleware() tells createStore() how to handle middleware
  applyMiddleware(logger, crashReporter)
)
```


### React Router

Redux will be the source of truth for you data. React Router will be the source of truth for your URL.

Maybe Limitations ...
- unless you need to time travel
  - I think that it means the `redo/undo` action
- or, need to rewind actions that trigger a URL change
  - I think that it means that someone press `back-arrow-button` in a browser

**For further information, See this** [React Router][4]

#### Fallback url

ex. if you access /path/somewhere and refresh, your development server needs to be instructed to serve index.html because it is a SPA!!

##### Note, Note

> you won't need to configure a fallback URL (if you are using Create React APP)

fallback url sample from Express, it is just for a reference
```javascript
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})
```

#### Router

Let's import `<Router />` , `<Route />` from `react-router-dom`.

```javascript
import { BrowserRouter as Router, Route } from 'react-router-dom'

// code structure
const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
)
```


## References

- [Advanced Redux Tutorial][1]
- [Middleware in Redux][3]

<!-- Reference Links -->
[1]: https://redux.js.org/advanced "Advanced Redux Tutorial"
[2]: https://medium.com/@ljs0705/babel-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-a1d0e6bd021a "babel 이해하기"
[3]: https://redux.js.org/advanced/middleware "Middleware in Redux"
[4]: https://reacttraining.com/react-router/ "React-Router"
