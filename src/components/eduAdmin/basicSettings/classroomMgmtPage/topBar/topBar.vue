<template>
  <div id="classroomManagement_topBar" class="topBarDiv am-btn-group">
    <button id="topBarButton" class="am-btn am-btn-success" @click="hrefClick(1)">教材管理</button>
    <button class="am-btn am-btn-success" @click="hrefClick(2)">年级管理</button>
    <button class="am-btn am-btn-success" @click="hrefClick(3)">课程类型管理</button>
    <button class="am-btn am-btn-success btn-active" @click="hrefClick(4)">教室管理</button>
  </div>
</template>

<script>
  export default {
    name: 'classroomManagement_topBar',
    data () {
      return {
        authorityList: ''
      }
    },
    mounted: function() {
      try{
        var buttons = document.getElementById("classroomManagement_topBar").getElementsByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
//        获取权限列表
        for (var i = 0; i < buttons.length; i++) {
//          隐藏导航按钮
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
//          根据权限显示导航栏按钮
          if(this.authorityList[i] == "27"){
            buttons[0].style.display = "block";
          }else if(this.authorityList[i] == "21"){
            buttons[1].style.display = "block";
          }else if(this.authorityList[i] == "65"){
            buttons[2].style.display = "block";
          }else if(this.authorityList[i] == "20"){
            buttons[3].style.display = "block";
          }
        }
      }catch(e){}
    },
//    权限控制导航显隐
    methods: {
      hrefClick: function (num) {
        if (num == 1) {
          location.href = "#/eduAdmin/resource/textbookMgmt"
        } else if (num == 2) {
          location.href = "#/eduAdmin/resource/eduAdminManageGrade"
        } else if (num == 3) {
          location.href = "#/eduAdmin/resource/courseTypeMgmt"
        } else if (num == 4) {
          location.href = "#/eduAdmin/resource/classroomMgmt"
        }
      }
//      路由跳转
    }
  }
</script>

<style scoped>
  html {
  }
  #topBarButton{
    margin-left: 5rem;
  }
  @media screen and (max-width: 1025px) {
    html {
    }
  }
</style>

