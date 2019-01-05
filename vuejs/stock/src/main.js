// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
// import BootstrapVue from 'bootstrap-vue';
import App from './App';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;

Vue.filter('currency', (value) => {
  return '$' + value.toLocaleString();
});

Vue.use(VueResource);

// Firebase : https://master-gadget.firebaseio.com/
// Firebase 에 데이터를 쓰기, 읽기를한다.
Vue.http.options.root = 'https://master-gadget.firebaseio.com/';

// bootstrap-vue 모듈을 추가
// npm i boostrap-vue

// Vue.use(BootstrapVue);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
