import Mock from 'mockjs'

let List  = [];

export default{
	getStatisticalData: ()=>{
		for(let i=0; i<7; i++){
			List.push(
				Mock.mock(
					{
						苹果 : Mock.Random.float(100, 8000, 0, 0),
						vivo : Mock.Random.float(100, 8000, 0, 0),
						oppo : Mock.Random.float(100, 8000, 0, 0),
						华为 : Mock.Random.float(100, 8000, 0, 0),
						三星 : Mock.Random.float(100, 8000, 0, 0),
						小米 : Mock.Random.float(100, 8000, 0, 0),
					}
				)
			);
			
		}
		
		return {
			code: 20000,
			//左下角的数据表格
			tableData : [
					{name:'oppo', todayBuy:500, monthBuy:3500, totalBuy: 4000},
					{name:'小米', todayBuy:340, monthBuy:2500, totalBuy: 4000},
					{name:'苹果', todayBuy:230, monthBuy:3660, totalBuy: 4000},
					{name:'vivo', todayBuy:140, monthBuy:1500, totalBuy: 4000},
					{name:'华为', todayBuy:550, monthBuy:2400, totalBuy: 4000},
					{name:'三星', todayBuy:260, monthBuy:1700, totalBuy: 4000},
			],
			
			////折线图
			orderdata : {
				date : ['20191001', '20191002', '20191003', '20191004', '20191005','20191006', '20191007'],
				data : List,
			},
			
			//饼图
			videoData :[
					{name: '小米', value : 2999},
					{name: '苹果', value : 999},
					{name: 'vivo', value : 1599},
					{name: 'oppo', value : 1999},
					{name: '华为', value : 2999},
					{name: '三星', value : 3999},
			],
			//柱状图
			userData : [
					{data : '周一', new :5, active : 200},
					{data : '周二', new :58, active : 500},
					{data : '周三', new :18, active : 550},
					{data : '周四', new :42, active : 630},
					{data : '周五', new :34, active : 700},
					{data : '周六', new :23, active : 480},
					{data : '周日', new :21, active : 574},
			],
			
		};
		
	},
	
	
	
}
