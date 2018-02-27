<template>
  <div id="stdInquireGradeBar" class="topBarDiv am-btn-group">
    <a :href="teacherNormalScheduleUrl">
      <button id="manualCouButton" class="topBarButton am-btn am-btn-success">上课签到</button>
    </a>
    <a :href="teacherCourseListUrl">
      <button class="topBarButton am-btn am-btn-success">教学计划</button>
    </a>
    <a :href="teacherDirectorUrl">
      <button class="topBarButton am-btn am-btn-success">听课反馈</button>
    </a>
    <a :href="teachingEvaluateUrl">
      <button class="topBarButton am-btn am-btn-success">评教结果</button>
    </a>
    <a :href="teacherTestInfoUrl">
      <button class="topBarButton am-btn am-btn-success btn-active">查看考场</button>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        teacherNormalScheduleUrl: '#/teacher/teach/normalSchedule',//上课签到url
        teacherCourseListUrl: '#/teacher/teach/courseList',//教学计划url
        teacherDirectorUrl: '#/teacher/teach/teacherDirector',//教师查看督导结果url
        teachingEvaluateUrl:'#/teacher/teach/teachingEvaluate',//评教结果url
        teacherTestInfoUrl:'#/teacher/teach/teacherTestInfo',//查看考场url
        authorityList:null//导航栏数组
      }
    },
    mounted: function () {
      try {
        var buttons = document.getElementById("stdInquireGradeBar").getElementByTagName("button");//获取所有导航栏button元素
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));//将button元素放在list中
        for (var i = 0; i < buttons.length; i++) {//把所有按钮变为不可见
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {//通过权限管理判定导航是否为可见
          if (this.authorityList[i] == "37") {
            buttons[0].style.display = "block";
          } else if (this.authorityList[i] == "36") {
            buttons[1].style.display = "block";
          } else if (this.authorityList[i] == "53") {
            buttons[2].style.display = "block";
          } else if (this.authorityList[i] == "63") {
            buttons[3].style.display = "block";
          } else if (this.authorityList[i] == "25") {
            buttons[4].style.display = "block";
          }
        }
      } catch (e) {
      }
    }
  }
</script>

<style lang="css" scoped>

  html {
    font-size: 16px;
  }
  #manualCouButton {
    margin-left: 5rem;
  }
  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
