import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Register from "../views/Register";
import Zone from "../views/discussion/Zone";
// import Discussion from "../views/Discussion";
import Topic from "../views/Topic";
// import Commerce from "../views/Commerce";
// import Goods from "../views/Goods";
// import AddGood from "../views/AddGood";
import Discussion from "../views/discussion/Discussion";
import Reply from "../views/discussion/Reply";
import AddDiscussion from "../views/discussion/AddDiscussion";
import Goods from "../views/transaction/Goods";
import Good from "../views/transaction/Good";
import Transaction from "../views/transaction/Transaction";
import AddGood from "../views/transaction/AddGood";
import Center from "../views/Center";
import Activity from "../views/activity/activity";
import Notice from "../views/notice/notice";
import myAct from "../views/activity/myact";
import joinAct from "../views/activity/joinAct";
import quitAct from "../views/activity/quitAct";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/center',
    component: Center
  },
  {
    path: '/topic',
    component: Topic
  },
  {
    path: '/discussion',
    component: Discussion,
    children: [
      {
        path: '/discussion/zone',
        component: Zone
      }
    ]
  },
  {
    path: '/reply',
    component: Reply
  },
  {
    path: '/addDiscussion',
    component: AddDiscussion
  },
  {
    path: "/transaction",
    component: Transaction,
    children: [
      {
        path: '/transaction/goods',
        component: Goods,
      },
      {
        path: '/transaction/good',
        component: Good
      },
      {
        path: '/transaction/addGood',
        component: AddGood
      }
    ]
  },
  {
    path: '/activity',
    component: Activity
  },
  {
    path: "/myact",
    component: myAct
  },
  {
    path: '/notice',
    component: Notice
  },
  {
    path: '/joinAct',
    component: joinAct
  },
  {
    path: '/quitAct',
    component: quitAct
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
