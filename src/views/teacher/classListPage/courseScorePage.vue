<template>
	<div id="classList">
		<topTitle></topTitle>
    	<topBar></topBar>

      <myClassList></myClassList>
	</div>
</template>

<script>
import topTitle from '../../../components/public/topTitle/topTitle'
import topBar from '../../../components/teacher/classScorePage/topBar/topBar.vue'
import myClassList from '../../../components/teacher/classScorePage/table/table.vue'

export default {
	name: 'classList',
  data () {
    return {

    }
  },
	components: {
    	topTitle, topBar, myClassList
  }
}
</script>

<style scoped>
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
