<template>
  <div id="classManege">
    <topTitle></topTitle>
    <topBar></topBar>
    <tableDiv></tableDiv>

  </div>
</template>

<script>
  import topTitle from '../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../components/teacher/classManegePage/topBar/topBar.vue'
  import tableDiv from '../../../components/teacher/classManegePage/table/table.vue'
  export default {
    name: 'classManege',
    data () {
      return {
        msg: ''
      }
    },
    components: {
      topTitle,
      topBar,
      tableDiv
      /*   selDiv*/
    }
  }

</script>

<style lang="css" scoped>
  html{
    font-size: 16px;
  }
  body{
    text-align: center;
    background-color: white;
    font-family: 微软雅黑;
  }
  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
