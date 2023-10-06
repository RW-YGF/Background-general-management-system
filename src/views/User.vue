<template>
  <div class="manage">
  <div class="manage-header">
	<el-button type="primary" @click="dialogFormOpen" style="height:50%;">+新增</el-button>
	<!-- form search-->	
	<el-form :model="userForm" :inline="true">
		<el-form-item>
      		<el-input v-model="userForm.name" placeHolder="请输入名称" />
    	</el-form-item>
    	<el-form-item>
    		<el-button type="primary" @click="handSearch">+查询</el-button>
    	</el-form-item>
	</el-form>
  </div>
  
  <!--提示框怎么调节？？？？-->
  <!--
  <el-alert title="success alert" type="success" center effect="dark"  closable="true"
  	style="width:400px;margin:0 auto;display:none;"/>
  -->
    <!--用户列表-->
	<el-table :data="userList" style="width: 100%" height="400" stripe>
    	<el-table-column fixed prop="name" label="姓名" width="100" />
    	<el-table-column prop="age" label="年龄" width="80" />
    	<el-table-column prop="sex" label="性别" width="80" />
    	<el-table-column prop="birth" label="生日" width="180" />
    	<el-table-column prop="addr" label="地址" />
    	
    	<el-table-column label="操作" width="150">
      		<template #default="scope">
       		<el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        	<el-button size="small"  type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      		</template>
		</el-table-column>
	</el-table>
	
	<!-- 新增用户对话框 -->
  	<el-dialog
	    v-model="dialogVisible"
	    :title="dialogTitle"
	    width="45%"
	    :before-close="handleClose">
	    
	    <el-form  :model="form" label-width="120px" ref="ruleFormRef"
	    :rules="rules" class="demo-ruleForm" :size="formSize" status-icon
	    >
		    <el-form-item label="姓名" prop="name">
		    	<el-input v-model="form.name" placeholder="请输入姓名"/>
    		</el-form-item>
    		<el-form-item label="年龄" prop="age">
		    	<el-input  v-model.number="form.age" placeholder="请输入年龄"/>
    		</el-form-item>
    		<el-form-item label="性别" prop="sex">
				<el-select v-model="form.sex" placeholder="请选择性别">
					<el-option label="男" value="1" />
					<el-option label="女" value="0" />
				</el-select>
			</el-form-item>
    		
    		<el-form-item label="出生日期" prop="birth">
		    	<el-col :span="11">
			        <el-date-picker
			          v-model="form.birth"
			          type="date"
			          placeholder="请选择日期"
			          style="width: 100%"
			        />
			     </el-col>
			</el-form-item>
    		
    		<el-form-item label="地址" prop="addr">
		    	<el-input v-model="form.addr" placeholder="请输入地址" />
    		</el-form-item>
    		
    	</el-form>
	    
	    <template #footer>
	      <span class="dialog-footer">
	        <!--<el-button @click="dialogVisible = false">取消</el-button>-->
	        <el-button @click="resetUserForm(ruleFormRef)">取消</el-button>
	        <el-button type="primary" @click="submitUser(ruleFormRef)">提交</el-button>
	      </span>
	    </template>
	</el-dialog>
	
	<!--分页-->
	<div style="border:none;margin:30px 0 0 0;">
  		<el-pagination background layout="prev, pager, next" 
  		:page-size=pageSize   :total=userTotal :page-count=pageCount
  		 @currentChange="handlePage" />
	</div>
	
  		
  </div>
</template>

<script>
// @ is an alias to /src
import {computed, ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import { FormInstance, FormRules } from 'element-plus'
import {getUser, addUser, editUser, deleteUser} from '../api';

export default {
  name: 'User',
  components: {},
  setup(){
	const dialogVisible = ref(false);	//新增按钮的设置
	const centerDialogVisible = ref(false);	//新增用户成功
	const dialogTitle = ref('');	//对话框标题
	const dialogType = ref(0);	//对话框内容
	
	const pageSize = 7;	//每页的数据个数
	const userTotal = ref(0);	//数据总量
	const currentPage = ref(1);	//当前页面
	const pageCount = ref();	//多少个页面
	let searchName = '';
	
	let userList = ref([]);	//用户列表
	const ruleFormRef = ref();
	
	//获取用户列表
	const getUserList = ()=>{
		getUser(pageSize, currentPage.value, searchName).then(value=>{
			userList.value = value.data.user;
			userList.value.map(item=>{
				if(item.sex === 0){
					item.sex = '女';
				}else{
					item.sex = '男';
				}
			});
			userTotal.value = value.data.userCount;
			pageCount.value = Math.ceil(userTotal.value /pageSize);
		});
	}
	
	const form = reactive({
		name: '',
		age : '',
		sex : '',
		birth : '',
		addr : '',
		fid : 0,
	});
	
	//验证规则
	const rules = reactive({
		name: [
    		{ required: true, message: '必须输入姓名', trigger: 'blur' },
    		{ min: 2, max: 5, message: '姓名长度必须在2位到5位之间', trigger: 'blur' },
  		],
  		age : [
  			{ required: true, message: '必须输入年龄' },
        	{ type: 'number', message: '年龄必须是一个数字' },
  		],
  		sex: [{
      			required: true,
      			message: '必须选择性别',
      			trigger: 'change',
      			
    			},
    		],
  		birth : [
  			{
		      type: 'date',
		      required: true,
		      message: '必须选择日期',
		      trigger: 'change',
		    },
  		],
  		addr : [
  			{ required: true, message: '必须输入地址', trigger: 'blur' },
  		],
	});
	//查询数据
	const userForm = reactive({
		name : '',
	});
	
	//重置表单，清空表单数据
	const resetForm = () =>{
		form.name = '';
		form.age = '';
		form.addr = '';
		form.birth = '';
		form.sex = 0;
	}
	
	//点击新增按钮
	const dialogFormOpen = () =>{
		dialogVisible.value = true;	//显示新增表单对话框
		dialogTitle.value='新增用户';
		dialogType.value = 0;
		resetForm();
	}
	
	//点击查询按钮
	const handSearch = () =>{
		//console.log(userForm.name);
		searchName = userForm.name;
		getUserList();
	}
	
	//点击用户提交
	const submitUser = async(FormE1) =>{
		//console.log(dialogType.value);
		//新增用户
		if(dialogType.value === 0){
			//验证
			if (!FormE1) return;
			await FormE1.validate((valid, fields) => {
			    if (valid) {
			      //提交表单
					const birthday = form.birth.getFullYear()+'-'+(form.birth.getMonth()+1)+'-'+form.birth.getDate();
					form.birth = birthday;
					addUser(form).then(value=>{
						if(value.data.code === 203){
							//添加用户成功以后
							//alert('添加用户成功');
							ElMessage({
						        type: 'success',
						        message: '添加用户成功',
						        showClose : true,
						     });
							//关闭新增对话框
							dialogVisible.value = false;
							//重置表单，清空表单数据
							resetForm();
							//刷新用户列表
							searchName = '';
							getUserList();
							
						}
					});
			      
			    } else {
			    	//添加用户失败
			      return;
			    }
			  })
			
			
		}
		
		//修改用户
		if(dialogType.value === 1){
			//console.log(form.fid);
			//验证
			if (!FormE1) return;
			await FormE1.validate((valid, fields)=>{
				if (valid){
					//验证成功
					//发送修改用户请求，并且执行成功
					editUser(form).then(value=>{
						if(value.data.code === 201){
							dialogVisible.value = false;	//关闭对话框
							//alert('修改用户成功');
							ElMessage({
						        type: 'success',
						        message: '修改用户成功',
						        showClose : true,
						     });
							searchName = '';
							getUserList();    //列表更新
						}
					});
					
				}else{
					//验证失败
					return ;
				}
			});
			
		}
		
	}
	
	//新增或者修改用户取消
	const resetUserForm = async(FormE1)=>{
		dialogVisible.value = false;	//关闭新增表单对话框
		//重置表单，清空表单数据
		resetForm();
		if (!FormE1) return
  		FormE1.resetFields();
	}
	
	//点击修改事件
	const handleEdit = (index, row) => {
  		//console.log(index, row.birth);
  		dialogVisible.value = true;
  		dialogTitle.value='修改用户';
  		dialogType.value = 1;
  		//表单显示用户信息
  		form.name = row.name;
		form.age = row.age;
		form.addr = row.addr;
		form.birth = row.birth;
		form.sex = row.sex;
		form.fid = row.id;
	}

	//点击删除事件
	const handleDelete = async(index, row) => {
		
		ElMessageBox.confirm(
    		'确定要删除此用户吗？',
    		//'Warning',
   			 {
     		 	confirmButtonText: '确定',
      			cancelButtonText: '取消',
      			type: 'warning',
    		}
  		).then(async()=>{
  			//删除用户
  			await deleteUser(row.id);
  			searchName = '';
  			getUserList();
  			
  			ElMessage({
		        type: 'success',
		        message: '删除用户成功',
		        showClose : true,
		     });
		     
  		}).catch(()=>{
  			ElMessage({
        		type: 'info',
        		message: '取消删除',
      		})
  		});
	}
	
	//分页发生变化
	const handlePage = (value)=> {
		//console.log('size change--'+value);
		currentPage.value = value;
		//更新列表
		getUserList();
	}
	
	onMounted(() => {
		getUserList();
	});
	
	return {
		dialogVisible, centerDialogVisible,  dialogTitle,
		userList, handleEdit, handleDelete, handSearch, dialogFormOpen, resetUserForm,
		form, rules, userForm, submitUser, getUserList,
		handlePage,  userTotal, currentPage, pageCount,
		ruleFormRef,
	}
	
	
  },
  
}
</script>

<style lang="less" scope>
.manage{
	height:90%;
	.manage-header{
		display:flex;
		justify-content:space-between;
		align-item:center;
	}
}


.el-alert {
  margin: 20px auto;
  border:1px solid red;
  z-index:9999;
  width:400px;
}
.el-alert:first-child {
  margin: 0;
}

</style>

