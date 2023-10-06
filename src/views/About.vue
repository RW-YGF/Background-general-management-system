<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>{{cc}}</p>
    
  </div>
	
</template>

<script>
// @ is an alias to /src
import {ref } from 'vue'


export default {
  name: 'About',
  components: {
     
  },
  setup(){
	const cc = ref(7);
	return {
		cc
	}
  },
  
}
</script>


