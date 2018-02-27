<template>
  <div id="evaTeachingResultPageTopBar" class="topBarDiv am-btn-group">
    <!--导航栏-->
    <button id="topBarButton" class="am-btn am-btn-success" @click="hrefClick(1)">教学计划审批</button>
    <button class="am-btn am-btn-success" @click="hrefClick(2)">调课审批</button>
    <button class="am-btn am-btn-success" @click="hrefClick(3)">补课审批</button>
    <button class="am-btn am-btn-success" @click="hrefClick(4)">停课审批</button>
    <button class="am-btn am-btn-success" @click="hrefClick(5)">禁排审批</button>
    <button class="am-btn am-btn-success btn-active" @click="hrefClick(6)">教务查看评教</button>
    <button class="am-btn am-btn-success" @click="hrefClick(7)">补考审批</button>
  </div>
</template>

<script>
  export default {
    name: 'evaTeachingResultPageTopBar',
    data () {
      return {
        authorityList: ''
      }
    },
    mounted: function() {
      try{
        var buttons = document.getElementById("banCouApply_topBar").getElementsByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
//        获取权限列表
        for (var i = 0; i < buttons.length; i++) {
//          隐藏导航按钮
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
//          根据权限显示导航栏按钮
          if(this.authorityList[i] == "17"){
            buttons[0].style.display = "block";
          }else if(this.authorityList[i] == "12"){
            buttons[1].style.display = "block";
          }else if(this.authorityList[i] == "13"){
            buttons[2].style.display = "block";
          }else if(this.authorityList[i] == "11"){
            buttons[3].style.display = "block";
          }else if(this.authorityList[i] == "8"){
            buttons[4].style.display = "block";
          }else if(this.authorityList[i] == "62"){
            buttons[5].style.display = "block";
          }else if(this.authorityList[i] == "30"){
            buttons[6].style.display = "block";
          }
        }
      }catch(e){}
    },
//    权限控制导航显隐
    methods: {
      hrefClick: function (num) {
        if (num == 1) {
          location.href = "#/eduAdmin/examination/eduAdminTchTeachingPlan"
        } else if (num == 2) {
          location.href = "#/eduAdmin/examination/adjustCouApply"
        } else if (num == 3) {
          location.href = "#/eduAdmin/examination/makeupCouApply"
        } else if (num == 4) {
          location.href = "#/eduAdmin/examination/suspendCouApply"
        } else if (num == 5) {
          location.href = "#/eduAdmin/examination/banCouApply"
        } else if (num == 6) {
          location.href = "#/eduAdmin/examination/eduAdminEvaTeachingResult"
        } else if (num == 7) {
          location.href = "#/eduAdmin/examination/makeupExamAdmin"
        }
      }
//      路由跳转
    }
  }
</script>


<style scoped>
  .am-btn-group button{
    width: 12rem;
  }
  #topBarButton{
    margin-left: 5rem;
  }
  @media screen and (max-width: 1000px) {
    /*由于导航栏按钮过多，需要媒体查询修改导航栏宽度*/
    .am-btn-group button{
      width: 10rem;
    }
  }
  @media screen and (min-width: 1000px) and (max-width: 1025px) {
    /*由于默认媒体查询会在1024缩放56%，所以需要再次增大宽度*/
    .am-btn-group button{
      width: 13rem;
    }
  }
  @media screen and (min-width: 1025px) and (max-width: 1152px) {
    /*一般情况下屏幕越小，按钮宽度越小*/
    .am-btn-group button{
      width: 7.7rem;
    }
  }
  @media screen and (min-width: 1152px) and (max-width: 1281px) {
    .am-btn-group button{
      width: 8.8rem;
    }
  }
  @media screen and (min-width: 1281px) and (max-width: 1440px) {
    .am-btn-group button{
      width: 10rem;
    }
  }

</style>
