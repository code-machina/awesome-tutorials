/* eslint no-shadow: ["error", { "allow": ["state"] }] */
/* eslint-env es6 */
/* no-shadow 설정을 해야 state 선언 후 mutations 에서 state 를 변수 이름으로 사용할 수 있다. */
/* 참고: https://stackoverflow.com/questions/43843180/eslint-state-already-declared-vuex */
import stocks from '../../data/stocks';

const state = {
  stocks: [],
};

const mutations = {
  SET_STOCKS: (state, stocks) => {
    state.stocks = stocks;
  },
  RND_STOCKS: (state) => {
    // return state;
    state.stocks.forEach(stock => {
      stock.price = Math.round(stock.price * ( 1 + Math.random() - 0.5));
    });
  },
};

const actions = {
  buyStock: ({ commit }, order) => {
    commit('BUY_STOCK', order);
  },
  initStocks: ({ commit }) => {
    commit('SET_STOCKS', stocks);
  },
  randomizeStocks: ({ commit }) => {
    commit('RND_STOCKS');
  },
};

const getters = {
  stocks: state => (state.stocks),

};

export default {
  state,
  mutations,
  actions,
  getters,
};
