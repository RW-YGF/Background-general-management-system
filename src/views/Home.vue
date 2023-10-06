<template>
	
<el-row :gutter="20">
	<!--left-->
	<el-col :span="8">
		<div class="grid-content bg-purple">
		<el-card class="box-card" shadow="hover">
			<div class="user">
		  		<img src="../assets/Images/user.png" alt=""/>
		  		<div class="userinfo">
		  			<p class="name">{{adminName}}</p>
		  			<p class="access">超级管理员</p>
		  		</div>
			</div>
			
			<div class="login-info">
		  		<p>上次登录时间：<span>2023-6-30</span></p>
		  		<p>上传登录地点：<span>中国</span></p>
	  	  	</div>
	  	</el-card>
	  	
	  	<el-card style="margin-top:20px; height:400px;">
	  		<el-table :data="tableData" style="width: 100%">
	  			<el-table-column prop="name" label="课程">
			    </el-table-column>
			    <el-table-column prop="todayBuy" label="今日购买">
			    </el-table-column>
			    <el-table-column prop="monthBuy"  label="本月购买">
			    </el-table-column>
			    <el-table-column prop="totalBuy" label="总购买">
			    </el-table-column>
	  		</el-table>
	  	</el-card>
		</div>
	</el-col>
	
	<!--right-->
    <el-col :span="16">
    	<!---->
    	<div class="num">
	  	<el-card  v-for="(item) in countData" :key="item.name"  :body-style="{display:'flex',padding:0,}">
		  <!--<i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>-->
		  <el-icon  size="small" :style="{background: item.color}"  class="icon">
			<component is="edit" />
		  </el-icon>
		  <div class="detail">
		  	<p class="price">￥{{item.value}}</p>
		  	<p class="desc">{{item.name}}</p>
		  </div>
		</el-card>
	  </div>
	  
	  <el-card style="height:280px;">
	  <!--折线图-->
	  	<div id="echarts1" style="height:280px;"></div>
	  </el-card>

	  <div  class="graph">
	  	<el-card style="height:260px;width:48%;">
	  	<!--柱状图 -->
	  	<div id="echarts2" style="height:260px;"></div>
	  	</el-card>
	  	
	  	<el-card style="height:260px;width:48%;">
	  	<!--饼状图-->
	  	<div id="echarts3" style="height:200px;"></div>
	  	</el-card>
	  	
	  </div>
    
    </el-col>
</el-row>
</template>

<script>
// @ is an alias to /src
import {ref, onMounted, computed } from 'vue';
import axios from "axios";
import * as echarts from 'echarts';
import { useCookies } from "vue3-cookies";
import {getData } from '../api';

export default {
  name: 'Home',
  components: {
     
  },
  setup(){
  	const  { cookies}   = useCookies();
	let tableData = ref([]);
	let orderData = ref([]);
	//vue3引入cookie
  	let adminName = cookies.get("admin");
  	//console.log('logined:', adminName);
	//左下角的表格
	/*const getTableList = async()=>{
		await axios.get('/api/home/getData').then((res)=>{
			tableData.value　=　res.data.tableData;
		});
	}*/
	const getTableList = async()=>{
		/*(getData()).then((res)=>{
			tableData.value　=　res.data.tableData;
		});
		*/
		let homeObject = (await getData()).data;
  		tableData.value　=　homeObject.tableData;
  		
  		//折线图
  		orderData.value = homeObject.orderdata;
  		let echarts1 = echarts.init(document.getElementById('echarts1'));
  		let orderLen  = orderData.value.data.length;
  		let orderKey = Object.keys(orderData.value.data[0]);
  		let orderValue = [];
  		for(let i=0; i<orderLen; i++){
  			orderValue.push(Object.values(orderData.value.data[i]));
  		}
  		
  		let seriesData = [];
  		for(let i=0; i<orderKey.length; i++){
  			
  			let itemdata = [];
  			for(let j=0; j<orderLen; j++){
  				itemdata.push(orderValue[j][i]);
  			}
  			seriesData.push({
  				data: itemdata,
  				type: 'line',
  				name : orderKey[i],
  				//name : 'aa',
  			});
  		}
  		
  		let option1 = {
		  xAxis: {
		    type: 'category',
		    data : orderData.value.date,
		  },
		  yAxis: {
		    type: 'value'
		  },
		  series: seriesData,
		};
  		echarts1.setOption(option1);
  		
  		////柱状图
		let echarts2 = echarts.init(document.getElementById('echarts2'));
		let echarts2Option = {};
		let userData = homeObject.userData;
		
		let xAxis2 = [], userSeries1 = [], userSeries2=[];
     	userData.forEach(key =>{
     		xAxis2.push(key.data);
     		userSeries1.push(key.new);
     		userSeries2.push(key.active);
     	})
     	echarts2Option.xAxis = {
     		data: xAxis2
     	};
     	echarts2Option.yAxis = {};
     	echarts2Option.series = [{
     		type: 'bar',
     		name : '新增用户',
     		data: userSeries1
     	},{
     		type: 'bar',
     		name : '活跃用户',
     		data: userSeries2
     	}];
     	echarts2.setOption(echarts2Option);
     	
     	//饼状图
     	let echarts3 = echarts.init(document.getElementById('echarts3'));
     	let echarts3Option = {};
     	let videoData = homeObject.videoData;
     	echarts3Option.series = {
     		type: 'pie',
     		data: videoData,
     		radius: '70%'
     	};
     	echarts3.setOption(echarts3Option);
	}
	
	
	
	//右上部分的卡片区域
	let countData = [
  			{name : '今日支付订单', value:1234, icon: "success", color: "#2ec7c9"},
  			{name : '今日收藏订单', value:210, icon: "star-on", color: "#ffb980"},
  			{name : '今日未支付订单', value:234, icon: "s-goods", color: "#5ab1ef"},
  			{name : '本月支付订单', value:1234, icon: "success", color: "#2ec7c9"},
  			{name : '本月收藏订单', value:210, icon: "star-on", color: "#ffb980"},
  			{name : '本月未支付订单', value:234, icon: "s-goods", color: "#5ab1ef"},
  	];
	
	
	onMounted(() => {
		getTableList();
	});
	
	return {
		tableData, orderData,  countData, adminName
	}
  },
  
}
</script>

<style lang="less" scope>
.user{
	padding-bottom: 20px;
	margin-bottom:20px;
	border-bottom:1px solid #ccc;
	
	display:flex;
	align-items : center;
	img{
		margin-right:40px;
		display:inline-block;
		width:150px;
		height:150px;
		border-radius: 50%;
	}
	
}

.num{
	display:flex;
	flex-wrap: wrap;
	justify-content:space-between;
	margin-left:5px;
	.icon{
		width:80px;
		height:80px;
		font-size:30px;
		line-height:80px;
		text-align:center;
	}
	.detail {
		margin-left:5px;
		display: flex;
		flex-direction: column;
		justify-content:　center;
		.price{
			font-size:28px;
			margin-bottom:10px;
			line-height:30px;
			height:30px;
		}
		.desc{
			line-height:35px;
			height:35px;
			font-size: 14px;
			text-align: left;
			color: #999;
		}
	}
	
	.el-card{
		width:30%;
		margin-bottom:10px;
		margin-right:10px;
		
	}
}

.graph{
	display:flex;
	justify-content: space-between;
	padding-top:20px;
}

</style>>

