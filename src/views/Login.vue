<template>
	<el-form :inline="true" :model="formLogin" class="demo-form-inline">
		<h3 class="login_title">系统登录</h3>
	    <el-form-item label="用户名">
	      <el-input v-model="formLogin.user" placeholder="请输入用户名" clearable />
	    </el-form-item>
	    
	    <el-form-item label="密 	 码">
	      <el-input v-model="formLogin.password" placeholder="请输入密码" type="password" clearable />
	    </el-form-item>
	    
	    <el-form-item style="margin:10px 0 0 0px;">
    	  	<el-button type="primary" @click="submit">登录</el-button>
    	</el-form-item>
    
  </el-form>
	
</template>

<script>
// @ is an alias to /src
import {computed, ref, reactive, onMounted } from 'vue';
import {login } from '../api';
import { useStore } from 'vuex'
import { useCookies } from "vue3-cookies"
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import Mock from 'mockjs'

export default {
  name: 'login',
  components: {},
  setup(){
  	//Vuex 4 引入了一个新的 API 用于在组合式 API 中与 store 进行交互
  	const store = useStore();
  	//vue3引入cookie
  	const  { cookies}   = useCookies();
  	const router = useRouter();
	const formLogin = reactive({
		user : '',
		password : '',
	});
	//登录
	const submit = async() =>{
		//console.log('login', formLogin.user, formLogin.password);
		let adminLogin = await login(formLogin);
		if(adminLogin.data.code === 200){
			//登录后权限判断
			let menu = adminLogin.data.data.menu;
			//左侧导航存入cookie,存入cookie为了防止刷新，vuex在刷新以后会消失
			cookies.set("menuList", JSON.stringify(menu));
			//token信息
			const token = Mock.Random.guid();
			//设置token
			cookies.set("token", token);
			cookies.set("admin", formLogin.user, 60 * 60 * 12);
			router.push('/home');
		}else{
			//登录失败
			ElMessage({
        		type: 'warning',
        		message: '用户名或者密码错误',
      		})
		}
		
	}
	return {
		formLogin,	submit, 
	}
  },
  
}
</script>

<style scoped>
.demo-form-inline{
	border:1px solid #ccc;
	width:360px;
	margin:100px auto;
	border-radius : 15px;
	box-shadow:3px 3px 13px 3px rgba(0, 0, 0, 0.3);
	padding:35px 35px 15px 35px;
	box-sizing:border-box;
}

.demo-form-inline .el-input {
  --el-input-width: 220px;
}
.login_title{
		width: 100%;
		text-align : center;
		color:#888;
		letter-spacing:2px;
		margin-bottom:40px;
	}
</style>

