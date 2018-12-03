// action creators

let nextPostId = 0;

export const addPost = (author, title, content) => ({
  type: 'ADD_POST',
  id: nextPostId++,
  author,
  title,
  content
});

export const turnPage = (page) => ({
  type: 'TURN_PAGE',
  page
});

export const chngUnit = (unit) => ({
  type: 'CHNG_UNIT',
  unit
})
