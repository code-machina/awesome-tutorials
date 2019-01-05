export const state = () => ({
  users: [{
      id: 1,
      username: "행운의 사나이",
      pic: "https://randomuser.me/api/portraits/lego/1.jpg",
      age: 100,
    },
    {
      id: 2,
      username: "기쁨의 사나이",
      pic: "https://randomuser.me/api/portraits/lego/2.jpg",
      age: 30,
    },
    {
      id: 3,
      username: "눈물의 사나이",
      pic: "https://randomuser.me/api/portraits/lego/3.jpg",
      age: 20,
    },
    {
      id: 4,
      username: "궁지의 사나이",
      pic: "https://randomuser.me/api/portraits/lego/4.jpg",
      age: 44,
    },
  ],
  value : "This is the thing which we want to change. :)"
})

export const mutations = {
  add(state, _user) {
    state.users.push({
      username: _user.username,
      pic: _user.pic
    })
  },
  remove(state, {
    _user
  }) {
    // state.list.splice(state.list.indexOf(todo), 1)
    state.users.splice(state.users.indexOf(_user), 1)
  },
  updateName: (state, {
    _id,
    newName
  }) => {
    // state.users.state.users.indexOf(_user)
    // id 를 찾는다.
    const targ = state.users.findIndex(x => x.id == _id);
    // console.log(targ);
    // console.log(state.users[targ]);
    if (targ > -1) // id 와 매칭되는 정보를 찾는 경우 
    {
      // state.users[targ].username = newName; // 새로운 이름을 부여
      // Vue.set(state.users[targ], 'username', newName );
      state.users[targ].username = newName;
    }
  },
  updateAge(state, {
    _id,
    newAge
  }) {
    const targ = state.users.findIndex(x => x.id == _id);
    if (targ > -1)
      state.users[targ].age = newAge;
  },
  updatePic(state, {
    _id,
    newUrl
  }) {
    const targ = state.users.findIndex(x => x.id == _id);
    console.log(newUrl)
    if (targ > -1)
      state.users[targ].pic = newUrl;
  },
  updateValue: function(state, payload){
    state.value = payload;
  }
}

export const getters = {
  users(state) {
    return state.users;
  },
  value(state) {
    return state.value;
  }
}

export const actions = {
  asyncSetNewName: ({commit}, payload) => {
    setTimeout(
      () => {
        commit('updateName', { _id: payload._id, newName: payload.newName} );
      },
      payload.duration // Can Set Timeout seconds.
    )
  },
  updateValue: ({commit}, payload) => {
    // Call 'updateValue' Mutation 
    commit('updateValue', payload);
  }
}

