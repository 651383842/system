<template>
  <div id="class_topBar" class="topBarDiv am-btn-group">
    <a href="#/teacher/classList">
      <button id="checkCouButton" class="topBarButton am-btn am-btn-success btn-active" >班级列表</button>
    </a>
    <a href="#/teacher/seeScore">
      <button  class="topBarButton am-btn am-btn-success">班级成绩</button>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        manualCouButton: '手动排课申请',
        sendApplyButton: '提交排课申请',
        checkCouButton: '教学计划审核',
        arrInfoNum: '2',
        adjInfoNum: '0',
        manualCouUrl: '/teacher/tchManuAdjCl',
        sendApplyUrl: 'http://localhost:8080/',
        checkCouUrl: '',
        authorityList:''
      }
    },
    mounted:function(){
      try{
        var buttons=document.getElementById("class_topBar").getElementsByTagName("button");
        this.authorityList=JSON.parse(sessionStorage.getItem("authorityList"));
        for(var i=0;i<buttons.length;i++){
          buttons[i].style.display="none";
        }
        for(var i=0;i<this.authorityList.length;i++){
          if(this.authorityList[i]=="54"){
            buttons[0].style.display="block";
            buttons[1].style.display="block";
          }
        }
      }catch(e){}
    },
    methods: {

    }
  }
</script>

<style lang="css" scoped>
@import '../../../../assets/css/external.css';

  html {
    font-size: 16px;
  }
  #checkCouButton {
    margin-left: 5rem;
  }

  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
