<template>
  <div id="stdInquireGradeBar" class="topBarDiv am-btn-group">
    <a :href="studentCourseUrl">
      <button id="manualCouButton" class="topBarButton am-btn am-btn-success">学生课表查询</button>
    </a>
    <a :href="studentTestUrl">
      <button  class="topBarButton am-btn am-btn-success btn-active">学生考场查询</button>
    </a>
    <a :href="studentGradeUrl">
      <button  class="topBarButton am-btn am-btn-success">学生成绩查询</button>
    </a>
    <a :href="studentTeacherUrl">
      <button  class="topBarButton am-btn am-btn-success">任课教师信息</button>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        studentCourseUrl: '#/student/query/studentLesson',
        studentTeacherUrl: '#/student/query/studentTeacher',
        studentTestUrl:'#/student/query/studentTestInfo',
        studentGradeUrl:'#/student/query/stInquireGrade',
        authorityList:null
      }
    },
    mounted: function () {
      try {
        var buttons = document.getElementById("stdInquireGradeBar").getElementByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if (this.authorityList[i] == "59") {
            buttons[0].style.display = "block";
          } else if (this.authorityList[i] == "50") {
            buttons[1].style.display = "block";
          } else if (this.authorityList[i] == "61") {
            buttons[2].style.display = "block";
          }else if (this.authorityList[i] == "51") {
            buttons[3].style.display = "block";
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
