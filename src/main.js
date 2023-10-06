import { createApp } from 'vue'
//import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import './api/mock'
//import VueCookies from 'vue3-cookies'
import { useCookies } from "vue3-cookies";
const  { cookies}   = useCookies();

const app = createApp(App)

app.config.warnHandler = () => null

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

//注册一个全局前置守卫
router.beforeEach((to, from, next)=>{
	//没有登录
	if(cookies.get('token') === null){
		if(to.name === 'login'){
  			next();
  		}else{
  			next('/login');
  		}
	}
	
	//已经登录
	if(cookies.get('token') !== null){
	  	if(to.name === 'login'){
	  		next('/')
	  	}else{
	  		next();
	  	}
  	}
});


app.use(store).use(router).use(ElementPlus, {locale}).mount('#app');

