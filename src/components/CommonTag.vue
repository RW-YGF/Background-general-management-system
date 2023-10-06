<template>
<div class="tag">
<el-tag
    v-for="(tag, index) in tags"
    :key="tag.name"
    class="mx-1"
	:closable="tag.name !== 'home'"
	:effect="$route.name === tag.name ? 'dark' : 'plain' "
    type="" 
    @close="handleClose(tag, index)"
    style="padding:0px 15px;margin-right:10px;"
>
    {{ tag.name }}
  </el-tag>
</div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies"

export default {
  name: '',
  setup(){
	const store = useStore();
	const route = useRoute();
	const router = useRouter();
	const  { cookies}   = useCookies();
	//加载tag标签
	const tags = computed(()=>{
		return  store.state.tab.tabsList;
	});
	
	
	//关闭tag标签
	const handleClose = (tag, index)=>{
		let tagLen = tags.value.length;
		store.commit('closeTag', tag);
		//如果删除的是高亮标签
		if(route.name === tag.name){
			//高亮标签不是最后一个,跳转到后一个
			if(index !== tagLen-1 ){
				router.push(tags.value[index].path)
			}else{
			//高亮标签是最后一个,跳到前一个标签页面
				router.push(tags.value[index-1].path);
			}
		}
		
		
	};
	
	onMounted(() => {
		//刷新以后非主页的tag消失
		if(tags.value.length ===1 && route.name!= 'home'){
			//tags
			let menuList = [];
			menuList = JSON.parse(cookies.get("menuList"));
			menuList.filter((item)=>{
				//console.log(item);
				if(!item.children){
				//没有子目录
					if(item.name === route.name){
						tags.value.push(item);
					}
				}else{
				//有子目录
					item.children.filter((itemChild)=>{
						if(itemChild.name === route.name){
							tags.value.push(itemChild);
						}
					});
				
				}
			});
		}
	})

	return {tags, handleClose }
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.tag{
margin:10px 0 0 10px;
display:flex;
justify-content:left;
}
</style>
