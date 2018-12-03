import { connect } from 'react-redux';
import Board from './Board';
import { turnPage } from '../actions';

const mapStateToProps = state => ({
  posts: state.posts,
  board: state.board
});

const mapDispatchToProps = dispatch => ({
  turnPage: page => dispatch(turnPage(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
