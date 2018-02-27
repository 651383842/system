<template>
  <div id="table">
    <div  class="positionBar">
    <span>您当前的位置：</span>
    <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
    <span> > 教学活动</span>
    <span> > <a href="#/teacher/teach/teacherDirector" class="returnHome">听课反馈</a></span>
    <span> > 反馈结果</span>
  </div>
    <div id="back" style="text-align: center;padding-top: 2rem;" >
      <table  v-for="(data,index) in tableList" :key="data.SuperviseTime">
      <thead  >
         <tr :id="'greenBtn'+index"  @click="unfoldAlert1(index)" style="text-decoration: underline; cursor: pointer" >
           <td class="amButtoms">
             <img :id="'imgSeen'+index" class="iconImg"  :src="iconSrc1">
             <img :id="'imgSeen2'+index" style="display: none" class="iconImg"  :src="iconSrc2">
             <span  class="subtitle" >{{data.superviseTime}}</span>
           </td>
           <td></td>
           <td></td>
         </tr>
        </thead>
      <tbody :id="'seen'+index" style="display:none;">
        <tr><td rowspan=8>评分</td><td>学生出勤情况</td><td><input v-model="data.attendanceInfo" readonly class="sma" type="text"></td></tr>
        <tr><td>授课内容</td> <td><input v-model="data.teachContent" readonly class="sma" type="text"></td></tr>
        <tr><td>教师素养得分</td> <td><input v-model="data.teacherQualityScored" readonly class="sma" type="number"></td></tr>
        <tr><td>教学目标得分</td> <td><input v-model="data.teachGoalsScored" readonly class="sma" type="number"></td></tr>
        <tr><td>教学内容得分</td> <td><input v-model="data.teachContentScored" readonly class="sma" type="number"></td></tr>
        <tr><td>教学方法得分</td> <td><input v-model="data.teachMethodsScored" readonly class="sma" type="number"></td></tr>
        <tr><td>教学常规得分</td> <td><input v-model="data.teachRoutineScored" readonly class="sma" type="number"></td></tr>
        <tr><td>教学内容得分</td> <td><input v-model="data.teachEffectScored" readonly class="sma" type="number"></td></tr>
        <tr><td>督导员意见</td><td colspan=3><input v-model="data.commentsInfo" readonly class="big" type="text"></td></tr>
        <tr><td >教务人员意见(教务人员填写)</td><td colspan=3><input v-model="data.forwardInfo" readonly class="big" type="text"></td></tr>
        </tbody>
    </table>
      <button class="am-btn am-btn-success am-radius" style="margin-top: 1rem;" @click="cancel()">返回</button>
    </div>
  </div>
</template>

<script>
  import icon1 from'./icon1.png'
  import icon2 from'./icon2.png'
  export default {
    name:'table',
    data () {
      return {
        iconSrc1:icon1,
        iconSrc2:icon2,
        tableList:[]
      }
    },
    beforeMount:function(){
      var thisURL = document.URL;
      var courseId =thisURL.split("directorResult?")[1];
      this.$http.post('./teachingSupervision/teacherCheckSupResult',{
        "courseAssociationId":courseId
      },
        {"Content-Type":"application/json"}).then(function (response) {
          this.tableList = response.body.result;
          try{
            if(response.body.result.length == 0){
              this.$Message.warning('暂无督导反馈',3);
            }
          }catch (e){}
          this.$nextTick(function(){
            try{
              this.unfoldAlert1(0);
            }catch (e){}
          });
        },
        function(error){});
    },
    methods:{
      unfoldAlert1: function (index) {
        var seen = document.getElementById("seen"+index);
        var imgSeen = document.getElementById("imgSeen"+index);
        var imgSeen2 = document.getElementById("imgSeen2"+index);
        if(seen.style.display=="none"){
          seen.style.display = "table-row-group";
          imgSeen.style.display="none";
          imgSeen2.style.display="inline";
        }else{
          seen.style.display = "none";
          imgSeen.style.display="inline";
          imgSeen2.style.display="none";
        }
      },
      cancel:function(){
        window.history.back(-1);
      }
    }

  }

</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  #back{
    width:100%;
    height:100%;
    background-color: #f3f3f3;
  }
  html{
    font-size: 16px;
  } /*整个页面的样式*/
  .amButtoms{
    width:100%;
    background-color: #37937a;
    height:2.5rem;
    color:white;
    font-size: 1rem;
    display: flex;
    outline:none
  }/*绿条*/
  li{
    list-style-type: none;
  }/*去点*/
  .iconImg{
    position: relative;
    margin: 0.5rem 0.2rem;
    width: 1.5rem;
    height: 1.5rem;
  }/*绿条上的图标*/
  .subtitle{
    font-size: 1rem;
    display: flex;
    padding:0.5rem 1rem;
    position: relative;
    color:white;
    /*子标题*/
  }
  input{
    border:1px solid white;
  }
  table{
    width:87%;
    border-collapse: collapse;
    margin-left: 5rem;
    margin-right: 5rem;
  }
  thead td{
    border-right: thin solid #37937a;
    background-color: #37937a;
    padding: 0;
  }
  thead{
    padding: 0;
  }
  tbody td{
    border: thin solid #d4d4d9;
  }
</style>
