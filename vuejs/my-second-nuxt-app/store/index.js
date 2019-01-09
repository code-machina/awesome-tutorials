import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPost : []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPost = posts;
      }
    },
    actions: {
      async nuxtServerInit({commit}, { $axios }) {
        // Promise 를 리턴한다.
        if(!process.client) {
          // console.log(context.req);
        }
        return $axios.get('https://my-posts-beta.firebaseio.com/posts.json')
        .then(res => { 
          const postsArray = [];
          for (const key in res.data) {
            postsArray.push({...res.data[key], id: key})
          }
          commit('setPosts', postsArray)
        })
        .catch(e => context.error(e));
        /* return new Promise((resolve, reject) => {
          setTimeout(() => {
            vuexContext.commit('setPosts', [
                  {
                    id: '1',
                    thumbnail: 'https://cdn.static-economist.com/sites/default/files/images/2015/09/blogs/economist-explains/code2.png',
                    title: 'My first post',
                    previewText: 'This my first post!'
                  },
                  {
                    id: '2',
                    thumbnail: 'https://cdn.static-economist.com/sites/default/files/images/2015/09/blogs/economist-explains/code2.png',
                    title: 'My second post',
                    previewText: 'This my second post!'
                  },
                  {
                    id: '3',
                    thumbnail: 'https://cdn.static-economist.com/sites/default/files/images/2015/09/blogs/economist-explains/code2.png',
                    title: 'My third post',
                    previewText: 'This my third post!'
                  },
                ]);
                resolve();
              }, 1000);
          }) */
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      }
    },
    getters: {
      loadedPost(state) {
        return state.loadedPost;
      }
    },
  });
}

export default createStore;