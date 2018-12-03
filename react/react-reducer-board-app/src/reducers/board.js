const board = (state = {page: 1, unit:5}, action) => {
  switch(action.type) {
    case 'TURN_PAGE':
      return {...state,  page: action.page};
    case 'CHNG_UNIT': // 게시판 노출 항목의 수를 변경
      return {...state, unit: action.unit};
    default:
      return state;
  }
};

export default board;
