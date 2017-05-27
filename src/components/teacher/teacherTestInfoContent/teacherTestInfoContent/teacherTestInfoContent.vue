<template>
  <div id="testInfo">
    <div class="positionBar">
      <span>你的当前位置：</span>
      <span><a :href="eduAdminPageUrl" class="returnHome">首页</a></span>
      <span> > 教师查看考场</span>
    </div>
    <div class="tableDiv">
      <table class="normalTable">
        <tr>
          <th>课程编号</th>
          <th>课程名称</th>
          <th>考试日期</th>
          <th>考试安排</th>
          <th>考试地点</th>
        </tr>
        <!--表头-->
        <tr v-for="test in tests">
          <td>{{ test.courseId }}</td>
          <td>{{ test.courseName }}</td>
          <td>{{ test.examDate }}</td>
          <td>{{ test.examTime }}</td>
          <td>{{ test.examPlace}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'testInfo',
    data () {
      return {
        eduAdminPageUrl:'#/login/main/eduAdminHome',
        tests: [],
      }
    },
    beforeMount:function(){
      this.$http.post('./teacherManage/getExamArrangement').then(function(response) {
        this.tests=response.body.examArrangementList;
      });
    }
  }
</script>

<style scoped>
  html {
    font-size: 100%;
  }
  #testInfo{
    height:30rem;
  }
  #refreshButton{
    float:right;
    color: white;
    width: 5.6rem;
    margin-top:0.2rem;
  }
  .contentTitle{
    height:2rem;
    padding: 0rem 5rem;
    margin-bottom: 1rem;
  }
  .tableDiv{
    /*页面*/
    padding: 2rem 5rem;
    text-align: center;
    height:30rem;
    background-color:#F3F3F3;
  }
  table{
    width: 100%;
  }
  td{
    min-width: 4rem;
    height: 3rem;
  }

  @media screen and (max-width: 1023px) {
    html {
      font-size: 56%;
    }
  }
</style>


