import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import adminApi from './mockServeData/permission'
//定义mock请求拦截

//Mock.mock('/home/getData', homeApi.getStatisticalData);
Mock.mock('/api/home/getData',  homeApi.getStatisticalData);

//Mock.mock(/user\/getUser/,'get',  userApi.getUserList);
Mock.mock('/api/user/getUser',  'post', userApi.getUserList);

Mock.mock('/api/user/addUser', 'post',  userApi.addUser);

Mock.mock('/api/user/editUser', 'post',  userApi.editUser);

Mock.mock('/api/user/deleteUser', 'post',  userApi.deleteUser);

Mock.mock('/api/login', 'post',  adminApi.getMenu);
