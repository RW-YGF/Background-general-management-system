import Mock from 'mockjs'

export default{
	//权限设置
	getMenu : (config)=>{
		let adminObj = JSON.parse(config.body);
		//超级管理员
		if(adminObj.admin.user ==='admin01' && adminObj.admin.password === '1'){
			//console.log('');
			return {
				code : 200,
				data : {
					//菜单
					menu : [{
		        		path : '/',
		        		name : 'home',
		        		label : '首页',
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
	       			],
					//其他
					
				},
				
			};
		}
		
		//二级管理员
		if(adminObj.admin.user ==='admin02' && adminObj.admin.password === '2'){
			return {
				code : 200,
				data : {
					menu : [
						{
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
					],
					//其他
				}
				
			};
		}
		
		//三姨管理员
		if(adminObj.admin.user ==='admin03' && adminObj.admin.password === '3'){
			return {
				code : 200,
				data : {
					menu : [
						{
							path : '/',
			        		name : 'home',
			        		label : '首页',
			        		//icon : 's-home',
			        		icon : 'Menu',
			        		url : 'Home/Home',
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
						
					],
					////其他
				},
			};
		}
	
		return {
			code : 201,
			
		}
	}
	
	
}
