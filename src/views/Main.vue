<template>
	<div class="main">
	<el-container>
		<el-aside  width="auto" style="background:#545c64">
			<common-aside/><!--左侧部分-->
		</el-aside>
		<el-container>
			<el-header style="padding:0;">
				<common-header/>	<!--抬头-->
			</el-header>
			<common-tag />	<!--面包屑路径对应的tag导航标签-->
		
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
		
  </el-container>  
  </div>

</template>

<script>
// @ is an alias to /src
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue'

import {ref } from 'vue'

export default {
	name: 'Main',
	components: {
		CommonAside, CommonHeader, CommonTag
	},
	setup(){
	
		
		return {};
		
	}
}	
</script>

<style lang="less">
body{
margin:0;
padding:0;
}

</style>

