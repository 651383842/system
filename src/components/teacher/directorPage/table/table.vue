<template>
  <div>
    <div  class="positionBar">
      <span>您当前的位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span>>督导反馈</span>
    </div>
    <div id="table">
      <div id="show">
        <!--<button>一键提交</button>-->
        <table class="operationTable">
          <thead>
          <tr>
            <!--<th>课程代码</th>-->
            <th>课程名称</th>
            <th>班级名称</th>
            <th>授课教师</th>
            <!--<th>上课时间</th>-->
            <th>确认已读</th>
            <th>督导结果</th>
            <!--<th>操作</th>-->
          </tr>
          </thead>
          <tbody>
          <tr v-for="(data,index) in tableList">
            <!--<td v-text="data.courseId"></td>-->
            <td v-text="data.courseName"></td>
            <td v-text="data.className"></td>
            <td v-text="data.teacherName"></td>
            <!--<td v-text="data.courseTime"></td>-->
            <td v-text="data.status"></td>
            <td >
              <span v-if="data.status=='未读'" style="text-decoration: underline; cursor: pointer" @click="directorResult(index,'w')" >在线填写</span>
              <span v-if="data.status=='已读'" style="text-decoration: underline; cursor: pointer" @click="directorResult(index,'r')" >查看</span>
            </td>
            <!--<td v-text="data.statuss" :id="'up'+index" @click="up(index)"></td>-->
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'table',
        data () {
            return {
              tableList:[
//                  {classId: "201451", className: "高2014级1班",
//                courseId: "GGBX0013", courseName: "安全教育", status: "未读",
//                teacherId: "1058", teacherName: "向国平"}
                ],
            }
        },
      beforeMount:function(){
//        this.$http.post('../jsonphp/director.php',{},
        this.$http.post('./teachingSupervision/showTeachingSupervision',{},
          {"Content-Type":"application/json"}).then(function (response) {
            console.log(response);
            this.tableList = response.body.teacherSupervision;
            for(var i = 0;i < response.body.teacherSupervision.length;i++){
              if(response.body.teacherSupervision[i].status == "0"){
                this.tableList[i].status="未读";
//                this.tableList[i].statuss="提交";
              }else{
                this.tableList[i].status="已读";
//                this.tableList[i].statuss="提交";
              }
//              else if(response.body.teacherSupervision[i].status == "2"){
//                this.tableList[i].status="已读";
//                this.tableList[i].statuss="已提交";}
          }
        },
          function(error){
            console.log("获取error:");
            console.log(error);
          });
      },
      methods:{
        //确认已读信息
          confirm:function(index){
            console.log(index);
            console.log(this.tableList[index].status);
          if(this.tableList[index].status=="未读")
//          this.$http.post('../jsonphp/director.php',{
              this.$http.post('./teachingSupervision/updateSupervision',{
                "courseId": this.tableList[index].courseId,
                "classId":this.tableList[index].classId,
                "teacherId":this.tableList[index].teacherId
          },{"Content-Type":"application/json"}).then(function (response) {
              if(response.body.result=="1")
              {
              this.tableList[index].status="已读"}
              console.log( this.tableList[index].status);
              console.log("保存:");
              console.log(response.body);
            },
            function(error){
              console.log("保存error:");
              console.log(error);
            });
        },
        //跳转传值
        directorResult:function(index,msg){
          if(msg=='w')
          {
            location.href="#/teacher/directorResult?type="+'w'+'&courseId='+this.tableList[index].courseId+'&classId='+this.tableList[index].classId+'&teacherId='+this.tableList[index].teacherId;
          }else if(msg=='r')
          {
            location.href='#/teacher/directorResult?type='+'r'+'&courseId='+this.tableList[index].courseId+'&classId='+this.tableList[index].classId+'&teacherId='+this.tableList[index].teacherId;
          }
        }
//        up:function(index){
//          console.log(index);
//          console.log(this.tableList[index].status);
//          if(this.tableList[index].status=="已读"&&this.tableList[index].statuss=="提交")
//            this.$http.post('./teachingSupervision/submitSupervision',{
//              "superviseId":"this.tableList[index].superviseId"
//            },{"Content-Type":"application/json"}).then(function (response) {
//                if(response.body.result=="1")
//                {
//                  this.tableList[index].statuss="已提交"}
//                console.log( this.tableList[index].statuss);
//                console.log("保存:");
//                console.log(response.body);
//              },
//              function(error){
//                console.log("保存error:");
//                console.log(error);
//              });
//        }
      }
    }
</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  #table{
    background-color: #f3f3f3;
  }
  #sel{
    display: flex;
    padding-left:6rem;
    background-color: white;

    padding-top: 1rem;
    padding-bottom: 1rem;

  }
  select{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.7rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    margin-left:3rem;
    font-size: 0.8rem;
  }
  button{
    color: white;
    background-color: mediumseagreen;
    border: none;
    border-radius: 0.2rem;
    width: 6rem;
    height: 2rem;
    min-width: 5rem;
    position: relative;
    left:64rem;
    outline:none;
  }
  #show{
    background-color: white;
    margin-right:5rem;
    margin-left:5rem;
    height:30rem;
    position: relative;
    top:2rem;
  }
  /*table{*/
    /*border: solid 1px white;*/
    /*border-collapse: collapse;*/
    /*margin-left:1rem;*/
    /*margin-right:1rem;*/
    /*width:96%;*/

  /*}*/
  thead{
    border-bottom:solid 2px lightgrey;
  }

  tr{
    height:2.5rem;
  }

</style>
