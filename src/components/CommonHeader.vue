<template>
<div class="header-container">
	<div class="l-content" style="display:flex;align-items:center;">
		<el-button type="" size="small" @click="handleMenu">
			<el-icon style="vertical-align: left" size="small">
			<Menu :size="20"/>
			</el-icon>
		</el-button>
		
		<!-- 面包屑 -->
		<el-breadcrumb separator="/">
			<!--<el-breadcrumb-item>首页</el-breadcrumb-item>  -->
			<el-breadcrumb-item v-for="item in tabList">{{item.label}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
	
	<!--右侧头像下拉菜单-->
	<div class="r-content">
	
		<el-dropdown @command="handleCommand">
		<span class="el-dropdown-link">
			<img class="user" src="../assets/Images/user.png"/>
				<el-icon class="el-icon--right" style="">
					<arrow-down />
				</el-icon>
		</span>
		<template #dropdown >
			<el-dropdown-menu>
				<el-dropdown-item>个人中心</el-dropdown-item>
				<el-dropdown-item command="exit">退出</el-dropdown-item>
			</el-dropdown-menu>
		</template>
		</el-dropdown>
		
	</div>
	
</div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { ArrowDown } from '@element-plus/icons-vue'
import { useCookies } from "vue3-cookies"
import { useRouter } from 'vue-router'

export default {
	name: '',
	setup(){
		const store = useStore();
		const router = useRouter();
		const  { cookies}   = useCookies();
		//修改菜单展开收起的方法
		const handleMenu = ()=>{
			store.commit('collapseMenu');
		}
		
		//退出
		const handleCommand = (command)=>{
			if(command == "exit")
			{
				//移除cookie
				cookies.remove('admin');
				cookies.remove('token');
				cookies.remove("menuList")
				//一个账号退出以后，可能还有tag储存在vuex中，导致下一个账号登录出现粘连问题
				if(store.state.tab.tabsList.length >1){
					store.state.tab.tabsList.splice(1, store.state.tab.tabsList.length-1);
				}
				router.push('./login');
			}
			
		}
		
		//
		const tabList = computed(()=>{
			return store.state.tab.tabsList;
		});
		
		onMounted(() => {
			
		})
		
		return {handleMenu, tabList, handleCommand };
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.el-dropdown-link {
	cursor: pointer;
	color: #409EFF;
}
.el-icon-arrow-down {
	font-size: 12px;
}

.header-container{
	padding: 0 20px;
	background-color:#333;
	height:60px;
	display : flex;
	justify-content:space-between;
	align-items:center;
	.l-content{
		/deep/.el-breadcrumb__item{
			font-weight:normal;
			&:first-child{
				margin-left: 20px;
			}
			&:last-child{
				.el-breadcrumb__inner{
					color:#fff;
				}
			}
		}
	}
	
	.r-content{
		.el-dropdown{}
		.el-dropdown-link{
			cursor: pointer;
			color: #409EFF;
			.user{
				height:35px;
				weight:35px;
				border-radius:50%;
				padding:0;
				margin:0px;
			}
			
		}
		/deep/.el_dropdown-link button::after, {
			border:none;
		}
		
		.el-icon-arrow-down{
			font-size: 12px;
		}
	}
	
}

</style>
