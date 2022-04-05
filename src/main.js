import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import AddActivity from "./views/AddActivity";
import Login from "./views/Login";
import Register from "./views/Register";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-admin')
    next()
  } else {
    let admin=JSON.parse(window.localStorage.getItem('access-admin'))
    if (!admin) {
      next({path:'/login'})
    } else {
      axios({
        url:'http://localhost:8181/user/checkToken',
        method:'get',
        headers:{
          token:admin.token
        }
      }).then((resp) => {
        console.log(resp.data)
        if(!resp.data){
          alert("身份已过期")
          this.$router.go(0)
          next({path:'/login'})
        }
      })
      next()
    }
  }
})
