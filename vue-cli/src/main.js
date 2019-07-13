import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue';

// コンポーネントは名前つきの再利用可能なVueインスタンスです。
Vue.component('app-servers-status', Home);

new Vue({
  el: '#app',
  render: h => h(App)
})