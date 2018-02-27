<template>
	<div id="classList">
		<topTitle></topTitle>
    	<topBar></topBar>
      <myClassList></myClassList>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar from '../../../../components/eduAdmin/markManage/tchSeeScore/topBar.vue'
import myClassList from '../../../../components/eduAdmin/markManage/tchSeeScore/courseScorePage.vue'

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
