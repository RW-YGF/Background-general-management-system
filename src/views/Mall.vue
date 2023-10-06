<template>
  <div class="home">
    <p>mall{{cc}}</p>
    
  </div>
	
</template>

<script>
// @ is an alias to /src
import {ref } from 'vue'


export default {
  name: 'mall',
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

