export default({
  state: {
	count :　'一万',
	isCollapse :　false,		//	用于菜单的展开还是收起
	//面包屑数据
	tabsList : [
			{
        		path : '/',
        		name : 'home',
        		label : '首页',
        		icon : 's-home',
        		url : 'Home/Home',
        	},
		],
	//
	//menuList : [],
	
  },
  mutations: {
  	//修改菜单展开收起的方法
	collapseMenu(state){
		state.isCollapse = !state.isCollapse;
	},
	//更新面包屑数据
	selectMenu(state, itemNew){
		let index = state.tabsList.findIndex((item) => item.name == itemNew.name);
		//首页不在添加，已经点击过的菜单不再添加
		if(itemNew.name == 'home' || index!= -1){
			return ;
		}
		state.tabsList.push(itemNew);
	},
  	//关闭tag标签
  	closeTag(state, tag){
  		let index = state.tabsList.findIndex((item) => item.name == tag.name);
  		
  		if(index!= 0){
  			state.tabsList.splice(index, 1);
  		}
  	},
  },
  actions: {
  },
  modules: {
  	
  }
})