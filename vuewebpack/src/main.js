import Vue from 'vue'
import axios from 'axios'         // 主要ajax 套件
import VueAxios from 'vue-axios'  // 轉vue 套件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';

import App from './App'
import router from './router';
//evenbus
import './bus';
//先import檔案進來
import currencyFilter from './filters/currency'


//在呼叫使用
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);

axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components:{App},
  // template: '<App/>',
  render: h => h(App),
  router,
})

router.beforeEach((to, from, next) => {
  if( to.meta.requiresAuth ){
    //需要驗證
    console.log('需要重新驗證')
    const api = `${process.env.API_PATH}/api/user/check`;
    /*
      this.$http.post(api) 無法使用
      因為不是在vue元件內，因此無法使用this
      所以只能用axios.post
    */
    axios.post(api).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          // vm.$router.push('/login');
          next();
        }else{
          next({
            path: '/login',
          });
        }
      })

  }else{
    //不需要驗證
    next();
  }
})