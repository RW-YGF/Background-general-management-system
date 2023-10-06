import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import User from '../views/User.vue'
import Mall from '../views/Mall.vue'
import pageOne from '../views/PageOne.vue'
import pageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'

const routes = [
  /*{
    path: '/',
    name: 'Home',
    component: Home
  },
  */
  //{
  //  path: '/about',
  //  name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
   // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  //}
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: '/home',
    children: [
		{
			path: 'home',
			name : 'home',
			component: Home,
		},
		{
			path: 'user',
			name : 'user',
			component: User,
		},
		{
			path: 'mall',
			name : 'mall',
			component: Mall,
		},
		{
			path: 'page1',
			name : 'page1',
			component: pageOne,
		},
		{
			path: 'page2',
			name : 'page2',
			component: pageTwo,
		},
    ],
    
  },
  
  //
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  
  //
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
