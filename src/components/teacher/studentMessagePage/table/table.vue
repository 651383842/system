<template>
  <div>
    <div  class="positionBar">
      <span>您当前的位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span>><a href="#/teacher/class/teachingEvaluate" class="returnHome">评教结果</a></span>
      <span>>学生留言</span>
    </div>
    <div id="table">
      <div id="back">
       <table class="normalTable" id="recordTable">
         <thead>
           <tr>
             <th style="border-color: white" width="3%">序号</th>
             <th style="border-color: white" width="6%">评教分数</th>
             <th style="border-color: white" width="8%">评教时间</th>
             <th style="border-color: white" width="20%"
                 title="1、课前准备充分，按时上、下课(满分10)
 2、上课情绪饱满，语速、音量适中，表达流畅(满分10)
 3、目标明确，重点难点突出，条理清晰(满分20)
 4、联系实际，内容深浅适度(满分10)
 5、讲课方法灵活，不照本宣科，师生互动好(满分20)
 6、作业布置、批改、讲评及时认真(满分10)
 7、板书（投影）字迹清晰，展示重点知识点(满分10)
 8、教学效果好(满分10)"
             >
               八项评分内容得分</th>
             <th style="border-color: white"><img class="Img"  :src="iconSrc1">学生留言</th>
           </tr>
         </thead>
         <tbody>
           <tr v-for="(data,index) in resultList">
             <td>{{index+1}}</td>
             <td v-html="data.record"></td>
             <td v-html="data.evaDate"></td>
             <td v-html="data.score"></td>
             <td v-html="data.text"></td>
           </tr>
         </tbody>
       </table>
      <div style="text-align: center"><button id="turn" class="am-btn am-btn-success am-radius" @click="cancel()">返回</button></div>
      </div>
    </div>
    </div>
</template>

<script>
    import icon1 from'./icon1.png'
    export default {
        name: 'table',
        data () {
            return {
                iconSrc1:icon1,
                semsTer:'',
                resultList:[
//                  {
//                    courseAssociationId: "201452011220145ZYXX0003073",
//                    evaDate: "2017-10-25",
//                    record: 100,
//                    studentId: "20145202",
//                    textEva: "1、课前准备充分，按时上、下课:2、上课情绪饱满，语速、音量适中，表达流畅:3、目标明确，重点难点突出，条理清晰:4、联系实际，内容深浅适度:"
////                    "5、讲课方法灵活，不照本宣科，师生互动好:6、作业布置、批改、讲评及时认真:7、板书（投影）字迹清晰，展示重点知识点:8、教学效果好:"
//                  }
                ]
            }
        },
        beforeMount:function(){
          var thisURL = document.URL;
          var courseId =thisURL.split("studentMessage?")[1].split("&")[0].split("=")[1];
          this.semsTer = thisURL.split("studentMessage?")[1].split("&")[1].split("=")[1];
          this.$http.post('./teacherCheckEvaResultText',JSON.stringify({
              "courseAssociationId":courseId
            }),
            {"Content-Type":"application/json"}).then(function(response){
              var data= response.body.evaResultText;
              for(var i=0;i<data.length;i++)
              {
                  this.resultList.push({record:data[i].record,evaDate:data[i].evaDate,score:data[i].textEva.split("@")[0],text:data[i].textEva.split("@")[1]});
              }
            },
            function(error){
            });
          this.$Notice.open({
            title: '八项评分内容',
            desc: '1、课前准备充分，按时上、下课(满分10)<br>2、上课情绪饱满，语速、音量适中，表达流畅(满分10)<br>3、目标明确，重点难点突出，条理清晰(满分20)<br>4、联系实际，内容深浅适度(满分10)<br>5、讲课方法灵活，不照本宣科，师生互动好(满分20)<br>6、作业布置、批改、讲评及时认真(满分10)<br>7、板书（投影）字迹清晰，展示重点知识点(满分10)<br>8、教学效果好(满分10)',
            duration: 30
          });
        },
      methods:{
        cancel:function(){
          location.href='#/teacher/teach/teachingEvaluate?'+this.semsTer;
        }
      }
    }
</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  #table{
    background-color: #f3f3f3;
    /*width:100%;*/
    height:40rem;
    padding-right:5rem;
    padding-left:5rem;
  }
  #back{
    background-color: white;
    top:2rem;
    position: relative;
  }
  #recordTable{
    /*padding-bottom: 1rem;*/
    /*display: flex;*/
    /*justify-content: center;*/

  }
  .Img{
    width:1.2rem;
    height:1.2rem;
    margin-right:0.5rem;
  }
  #turn{
    margin-top:1rem;
    margin-bottom: 1rem;
  }

</style>
