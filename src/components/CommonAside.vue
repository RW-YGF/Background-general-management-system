<template>
<el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
>
	<h3>{{ isCollapse ? '后台' : '通用后台管理'}}</h3>
		<el-menu-item :index="item.name"  v-for="(item, index)  in noChildren" @click="clickmenu(item)">
          <el-icon><component :is="item.icon"/></el-icon>
          <span>{{item.label}}</span>
        </el-menu-item>
        
		<!--有子导航的-->
		<el-sub-menu index="4" v-for="(item, index)  in hasChildren">
          <template #title>
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{item.label}}</span>
          </template>
          <el-menu-item-group title="" v-for="(item1, index1)  in item.children">
            <el-menu-item :index="item1.name" @click="clickmenu(item1)">{{item1.label}}</el-menu-item>
          </el-menu-item-group>
          <!--<el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>-->
        </el-sub-menu>

</el-menu>

</template>

<script>
import { ref, onMounted, computed } from 'vue'
import {
	Document,
	Menu as IconMenu,
	Location,
	Setting,
} from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useCookies } from "vue3-cookies"

export default {
	name: '',
	setup(){
		const router = useRouter();
		const store = useStore();
		const  { cookies}   = useCookies();
		//为了防止刷新后左侧导航菜单消失，menuList需要被储存起来
		//菜单列表
		let menuDate = [];
		menuDate = JSON.parse(cookies.get("menuList"));
		/*
		menuDate = [{
	        		path : '/',
	        		name : 'home',
	        		label : '首页',
	        		//icon : 's-home',
	        		icon : 'Menu',
	        		url : 'Home/Home',
        		},
	        	{
	        		path : '/mall',
	        		name : 'mall',
	        		label : '商品管理',
	        		icon : 'video-play',
	        		url : 'MallManage/MallManage',
	        	},
	        	{
	        		path : '/user',
	        		name : 'user',
	        		label : '用户管理',
	        		icon : 'user',
	        		url : 'UserMange/UserManage',
	        	},
	        	{
	        		label : '其他',
	        		icon : 'location',
	        		children : [
	        			{
			        		path : '/page1',
			        		name : 'page1',
			        		label : '页面1',
			        		icon : 'setting',
			        		url : 'Other/PageOne',
	        			},
	        			{
			        		path : '/page2',
			        		name : 'page2',
			        		label : '页面2',
			        		icon : 'setting',
			        		url : 'Other/PageTwo',
	        			},
	        		],
	        	},
	        ];
	      */  
	    //没有子菜单的导航
		const noChildren = computed(()=>{
			return menuDate.filter(item=> !item.children);
		});
		//有子菜单的导航
		const hasChildren = computed(()=>{
			return menuDate.filter(item=> item.children);
		});
		
		//点击菜单
		const clickmenu = (item)=>{
			//页面跳转
			router.push(item.path);
			//抬头tab变化，更新面包屑数据
			store.commit('selectMenu', item);
		}
		
		return {
				isCollapse: computed(() => store.state.tab.isCollapse),	//折叠菜单
				noChildren, hasChildren, clickmenu }
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
/deep/.el-menu-item-group__title
{
	padding:0;
}

.el-menu{
	border:1px solid #545c64;
	border-right: none;
  	height : 100vh;
  	h3{
  		color : #fff;
  		text-align:center;
  		line-height:48px;
  		font-size:16px;
  		font-weight:400;
  		margin:0;
  	}
  }


.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

</style>
