import Vuex from 'vuex';
import axios from 'axios';
import Cookie from 'js-cookie';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPost : [],
      token: null,
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPost = posts;
      },
      addPost(state, post){
        state.loadedPost.push(post);
      },
      editPost(state, editedPost){
        const postIndex = state.loadedPost.findIndex(
          post => post.id === editedPost.id
        );
        state.loadedPost[postIndex] = editedPost;

      },
      setToken(state, token){
        state.token = token;  
      },
      clearToken(state){
        state.token = null;
      }
    },
    actions: {
      async nuxtServerInit({commit, context}, { $axios }) {
        // Promise 를 리턴한다.
        if(!process.client) {
          console.log(context);
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
      },
      addPost(vuexContext, post){
        const createdPost = {...post, updatedDate: new Date()}
        return axios.post('https://my-posts-beta.firebaseio.com/posts.json?auth=' + vuexContext.state.token, createdPost)
        .then(
          res => {
            // Print Debug 
            // console.log(result)
            vuexContext.commit('addPost', {...createdPost, id: res.data.name});
            // After finishing Data Insert, App would go back to '/admin/' page.

          }
        )
        .catch(e => console.log(e));
      },
      editPost(vuexContext, editedPost) {
        return axios.put(
          "https://my-posts-beta.firebaseio.com/posts/" + editedPost.id + ".json?auth=" + vuexContext.state.token, editedPost
        ).then(res => {
          vuexContext.commit('editPost', editedPost)
        })
        .catch(e => console.log(e))
      },
      authenticateUser(vuexContext, authData) {
         // Google API 
        let trackUrl = `http://localhost:${process.env.PORT}/api/track-data`
        console.log(trackUrl);
        let authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + process.env.fbAPIKey 
        if(!authData.isLogin) {
          authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + process.env.fbAPIKey
        }
        return axios.post(authUrl,
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        }).then(res => { 
          // 인증 시 데이터를 두 곳에 저장한다. 
          // 첫째는 쿠키 정보
          // 둘째는 localStorage
          const expirationDate = new Date().getTime() + parseInt(res.data.expiresIn,10) * 1000
          // const expirationDate = new Date().getTime() + Number.parseInt(res.data.expiresIn,10)
          vuexContext.commit('setToken', res.data.idToken);
          localStorage.setItem('token', res.data.idToken);
          localStorage.setItem('tokenExpiration', expirationDate)
          Cookie.set('jwt', res.data.idToken);
          Cookie.set('expirationDate', expirationDate)
          return this.$axios.$post(trackUrl, {data: 'Authenticated!'});
          // vuexContext.dispatch('setLogoutTimer', res.data.expiresIn * 1000);
        }).catch(e => console.log(e))
        
      },
      // setLogoutTimer(vuexContext, duration){
      //   setTimeout(() => {
      //     vuexContext.commit('clearToken')
      //   }, duration)
      // },
      initAuth(vuexContext, req){
        let token;
        let expirationDate;
        if(req) {
          if(!req.headers.cookie){
            return;
          }
          const jwtCookie = req.headers.cookie
          .split(';')
          .find(c => c.trim().startsWith('jwt='));

          if(!jwtCookie) {
            return;
          }
          token = jwtCookie.split('=')[1];

          expirationDate = req.headers.cookie
          .split(';')
          .find(c => c.trim().startsWith('expirationDate='))
          .split('=')[1]

        }else if (process.client){ // for generation mode
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
        } else {
          token = null;
          expirationDate = null;
        }
        console.log(''+ new Date().getTime() )
        console.log('' + expirationDate)
        if (new Date().getTime() > +expirationDate || !token)
        {
          console.log('No token or invalid token');
          vuexContext.commit('clearToken')
          return;
        }
        vuexContext.commit("setToken", token);
        if(process.client) {
        // vuexContext.dispatch('setLogoutTimer', expirationDate - new Date().getTime())
        }
      },
      logout(vuexContext){
        vuexContext.commit('clearToken');
        Cookie.remove('jwt');
        Cookie.remove('expirationDate');
        if(process.client){
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration')
        }
      }
    },
    getters: {
      loadedPost(state) {
        return state.loadedPost;
      },
      isAuthenticated(state) {
        return state.token != null;
      }
    },
  });
}

export default createStore;