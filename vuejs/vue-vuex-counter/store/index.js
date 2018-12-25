import Vuex from 'vuex'

const store = () => new Vuex.Store({
    state: {
        counter: 0
    },
    mutations: {
        increment(state) {
            state.counter++;
        },
        decrement: state => {
            state.counter -= 2;
        }
    },
    getters: {
        doubleCounter: state => {
            return state.counter *2;
        }
    }
});

export default store;