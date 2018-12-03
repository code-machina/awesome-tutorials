/*
Board 를 React.Component 를 통해서 재작성해 본다.
Board 는 함수형 컴포넌트로 Life Cycle 이 없다.
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'


export class NewBoard extends React.Component {
  constructor(props) {
      super(props);
  }
  componentWillMount() {
    console.log("componentWillMount");
  }
  componentDidMount() {
    console.log("componentDidMount");
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}

NewBoard.propTypes = {

};

function mapStateToProps(state) {

  return {};
}

export default connect(mapStateToProps)(NewBoard);
