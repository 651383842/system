<template>
  <div>
    <div  class="positionBar">
      <span>您当前的位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span>>评教结果</span>
    </div>
    <div id="table">
      <div id="sel">
        <select @change="chooseTerm(option1)"  v-model="option1">
          <option v-for="option1 in semesterList" :value="option1.semValue">
            {{ option1.semName}}
          </option>
        </select>
        <!--<button class="am-btn am-btn-success am-radius">查看学生留言</button>-->
      </div>
      <div id="back">
      <div id="show">
        <table class="operationTable">
          <thead>
            <tr>
              <th>课程代码</th>
              <th>课程名称</th>
              <th>课程类型</th>
              <th>授课班级</th>
              <th>参评人数</th>
              <th>综合得分</th>
              <th></th>
              <!--<th width="15%">等级</th>-->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data,index) in evaluationResult" :key="data.courseId">
              <td v-text="data.courseId"></td>
              <td v-text="data.courseName"></td>
              <td v-text="data.courseTypeName"></td>
              <td v-text="data.classId" ></td>
              <td v-text="data.evaStudentCount"></td>
              <td v-text="data.evaRecord"></td>
              <td><span :id="'stuMessage'+index" style="text-decoration: underline; cursor: pointer"  @click="stuMessage(index)">查看学生留言</span></td>
              <!--<td v-text="data.grade"></td>-->
            </tr>
          </tbody>
          </table>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'table',
        data () {
            return {
              semesterList:[],
              option1:'',
              currentSemester: '',
              evaluationResult:''
            }
        },
      beforeMount:function(){
        this.generateSemester();
        var url = document.URL;
        if(url.indexOf("?") > 0)
        {
          this.option1 = url.split("teachingEvaluate?")[1];
          this.chooseTerm(this.option1);
        }else
        {
          this.$http.post('./teacherCheckEvaResultNew',{},
            {"Content-Type":"application/json"}).then(function(response){
              this.evaluationResult = response.body.evaResult;
              this.currentSemester = response.body.currentSemester;
              this.option1 = this.currentSemester;
            },
            function(error){
            });
        }
      },
      methods:{
        //选择学期
        chooseTerm:function(value){
          this.$http.post('./teacherCheckEvaResult',{
            "yearTerm": value
          },{"Content-Type":"application/json"}).then(function (response) {
              if(response.body.evaResult!='')
              {
                this.evaluationResult = response.body.evaResult;}
              else
              { this.$Message.error('暂无数据！');
                this.evaluationResult = response.body.evaResult;}
            },
            function(error){
              console.log("结果error:");
              console.log(error);
            });
        },
        generateSemester:function () {
          var nDate = new Date();
          var nYear = parseInt(nDate.getFullYear())+1;
          var stl="";
          var st2="";
          for(var i=1;i<=4;i++)
          {
            stl = nYear-1+'-'+nYear+'.'+'1';
            st2 = nYear-1+'-'+nYear+'学年（上）';
            this.semesterList.push({semName:st2,semValue:stl});
            stl = nYear-1+'-'+nYear+'.'+'2';
            st2 = nYear-1+'-'+nYear+'学年（下）';
            this.semesterList.push({semName:st2,semValue:stl});
            nYear--;
          }
        },
        //查看学生留言
        stuMessage:function(index){
          var id=this.evaluationResult[index].courseAssociationId;
          location.href='#/teacher/studentMessage?Id='+id+'&Sem='+this.option1;
        }
      }
    }
</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  #sel{
    display: flex;
    padding-left:5rem;
    background-color: white;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
   justify-content: space-between;
    width: 11.5rem;
  }
  #back{    background-color: #f3f3f3;}
  select{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.7rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    /*margin-left:3rem;*/
    font-size: 0.8rem;
  }
  input{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.3rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    margin-left:3rem;
    font-size: 0.8rem;
  }
  button{
  margin-right:5rem;

  }
  #space{
    display: flex;
    justify-content:space-between;
  }
  table{
    /*border: solid 1px lightgray;*/
    border-collapse: collapse;
    /*width:100%;*/
    /*font-size: 0.8rem;*/
  }
  #show{
    background-color: white;
    margin-right:5rem;
    margin-left:5rem;
    height:30rem;
    position: relative;
    top:2rem;
  }
  tr{
    height:3rem;
  }
  td{
    /*border:solid 1px lightgrey;*/
  }
  th{
    /*border:solid 1px lightgrey;*/
    /*height: 2.5rem;*/
  }
</style>
