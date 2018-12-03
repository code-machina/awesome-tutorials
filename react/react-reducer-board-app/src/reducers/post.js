const posts = (state = [], action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [
        {
          id: action.id,
          author: action.author,
          title: action.title,
          content: action.content
        },
        ...state
      ];
    default:
      return state;
  }
};

export default posts;
