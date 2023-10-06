import http from '../utils/request.js'

//请求首页数据
export  const  getData = async() =>{
	return http.get('/home/getData');
	//return '123';
}


//获取用户列表
export  const  getUser = async(pagesize, currentPage, searchName) =>{
	return http.post('/user/getUser', {pagesize : pagesize, 
		currentPage : currentPage,
		searchName : searchName
		});
	//return 'user123';
}

//新增用户
export  const  addUser = async(data) =>{
	return http.post('/user/addUser',  { user: data });
}

//修改用户
export  const  editUser = async(data) =>{
	return http.post('/user/editUser',  { user: data });
	//return http.post('/user/editUser', id);
	//return 'edit id--'+id;
}

//删除用户
export  const  deleteUser = async(data) =>{
	return http.post('/user/deleteUser',  { id: data });
	//return 'delete--'+data;
}

//登录
export  const  login = async(data) =>{
	return http.post('/login',  { admin: data });
	//return data;
}


