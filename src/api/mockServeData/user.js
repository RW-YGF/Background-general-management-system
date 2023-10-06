import Mock from 'mockjs'
//get请求从config.url获取参数，post从config.body中获取参数

let List = [];
const count = 50;

//id自增1
let uid = {
	"id|+1" : 1000
};

for(let i=0; i<count; i++){
	List.push(
		Mock.mock({
			id : Mock.mock(uid).id,
			name: '@cname',
			addr: Mock.mock('@county(true)'),
			'age|18-60': 1,
			birth: Mock.Random.date(),
			"sex|1": [1,0],
		})
		
	);
	
}


export default{
	//获取列表
	getUserList : (data) =>{
		let pageObj = JSON.parse(data.body);
		let begin = (pageObj.currentPage-1)*pageObj.pagesize;
		let end = begin+pageObj.pagesize;
		
		if(pageObj.searchName === '' ){
			//不带查询功能的列表
			return {
				code : 200,
				userCount : List.length,
				user : List.filter((item, index)=> index>=begin && index<end),
			}
		}else{
			//带查询功能的列表
			let listNow = [];
			listNow = List.filter((item, index)=> item.name === pageObj.searchName);
			return {
				code : 200,
				userCount : listNow.length,
				user : listNow.filter((item, index)=> index>=begin && index<end),
			}
		}
		
	},
	
	//添加用户
	addUser : (data)=>{
		let userData = JSON.parse(data.body);
		List.push({
			id : 3000,
			name : userData.user.name,
			age : userData.user.age,
			addr : userData.user.addr,
			birth : userData.user.birth,
			sex : userData.user.sex,
		});
		return {
			code : 203,
		};
	},
	
	//修改用户
	editUser : (data)=>{
		//参数data是一个对象，可以用JSON.stringify()方法查看其具体信息
		let newUser = JSON.parse(data.body);
		//console.log('edit user mock--'+newUser.user.name);
		List.map((item)=>{
			if(item.id === newUser.user.fid){
				item.name = newUser.user.name;
				item.addr = newUser.user.addr;
				item.birth = newUser.user.birth;
				item.sex = newUser.user.sex;
				item.age = newUser.user.age;
			}
		})
		return {
			code : 201,
		}
	},
	
	//删除用户
	deleteUser : (data)=>{
		let delUser = JSON.parse(data.body);
		console.log('deluser--', delUser);
		let index = List.findIndex(item=> item.id ==delUser.id);
		List.splice(index, 1);
		return {
			code : 202,
		}
	},
	
}
