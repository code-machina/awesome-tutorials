import { combineReducers } from 'redux';
import posts from './post';
import board from './board';

export default combineReducers({
  posts,
  board
});
