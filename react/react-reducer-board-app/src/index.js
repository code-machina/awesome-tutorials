import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
// import './index.css';

/* eslint-disable no-underscore-dangle */
const store = createStore(
 rootReducer, /* preloadedState, */
 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

const render = Component =>
  ReactDOM.render(
    <Provider store={store}>
    <AppContainer>
      <Component />
    </AppContainer>
    </Provider>,
    document.getElementById('root')
  );

render(App);
if (module.hot) module.hot.accept('./App', () => render(App));
