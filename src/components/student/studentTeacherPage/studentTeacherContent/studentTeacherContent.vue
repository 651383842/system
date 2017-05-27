<template>
    <div id="myTeacher">
      <div class="positionBar">
        <span>你的当前位置：</span>
        <span><a :href="studentPageUrl" class="returnHome">首页</a></span>
        <span> > 学生教师信息</span>
      </div>
      <!--div class="contentTitle">
        <button id="refreshButton" class="am-btn am-btn-success am-radius" @click="refreshClick">刷新</button>
      </div-->
      <div class="tableDiv">
        <table class="normalTable">
          <tr>
            <th>学期学年</th>
            <th>课程名称</th>
            <th>教师</th>
            <th>性别</th>
            <th>移动电话</th>
            <th>电子邮箱</th>
          </tr>
          <!--表头-->
          <tr v-for="teacher in teachers">
            <td>{{ teacher.teacher }}</td>
            <td>{{ teacher.className }}</td>
            <td>{{ teacher.teacherName }}</td>
            <td>{{ teacher.sex }}</td>
            <td>{{teacher.phone}}</td>
            <td>{{teacher.email}}</td>
          </tr>
        </table>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'myTeacherPage',
        data () {
            return {
              studentPageUrl:'#/login/main/studentHome',
              teachers: [],
            }
        },
      beforeMount:function(){
          this.$http.post('./studentManage/getStudentCourseTeacher').then(function(response) {
          this.teachers=response.body.teachers;
        });
      },
      methods:
      {
        refreshClick:function(){
          window.location.reload();//刷新页面
        }
      }
    }
</script>

<style scoped>
    html {
        font-size: 100%;
    }
    #myTeacher{
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
