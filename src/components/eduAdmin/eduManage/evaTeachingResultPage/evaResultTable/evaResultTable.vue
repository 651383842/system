<template>
  <div>
    <div id="evaScorePage">
      <div id="courseTchInfo">
        <select id="termSelect" class="selectWM" v-model="evaluateinfoKey.term" >
          <option value="">选择学期</option>
          <option v-for="term in terms" :value="term.semValue">{{term.semName}}</option>
        </select>
        <!--学期选择下拉列表-->
        <select id="teacherSelect" class="selectWM" v-model="evaluateinfoKey.teacherId" @change="checkEvaInfoClick()">
          <option value="">选择教师</option>
          <option v-if="evaluateinfoKey.term!='0'" v-for="teacher in teacherList" :value="teacher.teacherId">{{teacher.teacherName}}</option>
        </select>
        <!--教师选择下拉列表-->
        <span>
          <button id="searchFor" class="am-btn am-btn-success am-radius buttonWM" @click="checkEvaInfoClick()">查询</button>
          <button id="searchFor" class="am-btn am-btn-success am-radius buttonWM" @click="modalOperation=true">导出</button>
        </span>
        <!--查询按钮-->
      </div>
      <div id="evaResultTable" style="padding: 0.6rem 5rem;background-color: #f3f3f3">
        <table id="stdInfoTableSy" class="operationTable" style="table-layout: fixed;">
          <thead>
          <tr>
            <th>课程代码</th>
            <th>课程名称</th>
            <th>教师编码</th>
            <th>教师姓名</th>
            <th>参评人数</th>
            <th>综合得分</th>
            <th v-if="evaluateinfoKey.teacherId !=''">查看留言</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(result,index) in results">
            <td v-text="result.courseId"></td>
            <td v-text="result.courseName"></td>
            <td v-text="result.teacherId"></td>
            <td v-text="result.teacherName"></td>
            <td v-text="result.evaStudentCount"></td>
            <td v-text="result.evaRecord"></td>
            <td v-if="evaluateinfoKey.teacherId !=''"><button class="am-btn am-btn-success am-radius" @click="checkEvaText(result.courseAssociationId)">查看</button></td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--评教结果表格-->
    </div>
    <div id="evaTipsPage" style="display: none">
      <div style="padding: 0.6rem 5rem;background-color: #f3f3f3">
        <table class="normalTable" style="table-layout: fixed;">
          <thead>
          <tr>
            <th width="3%">学生</th>
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
          <tr v-for="evaResultEle in evaResultText">
            <td>***</td>
            <td v-html="evaResultEle.record"></td>
            <td v-html="evaResultEle.evaDate"></td>
            <td v-html="evaResultEle.score"></td>
            <td v-html="evaResultEle.text"></td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--学生评教留言表格-->
      <div class="buttonDiv">
        <span><button class="bottomButton am-btn am-btn-success am-radius" @click="goBackClick()">返回</button></span>
      </div>
      <!--返回评教结果页面-->
    </div>
    <Modal v-model="modalOperation" id="modalBody" :styles="{top:'10rem'}">
      <div style="text-align:center; font-size:1.1rem;">
        <p>您确定导出所有老师的评教结果？</p>
      </div>
      <div slot="footer" style="text-align:center;">
        <Button id="modalBtn" @click="exportEvaInfoClick()">确定</Button>
        <Button id="modalBtn" @click="modalOperation = false">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
              modalOperation:false,
              evaluateinfoKey:{
                term:'',
                teacherId:''
              },
              terms:[],
              teacherList:[
                {teacherName:'',teacherId:''}
              ],
                results:[],
              evaResultText:[]
            }
        },
      beforeMount:function() {
        //this.generateSemester();
        //this.evaluateinfoKey.term = "2016-2017.2"
        this.$http.post('./getYearTermList',{},{
          "Content-Type":"application/json"
        }).then(function (response) {
            this.generateSemester();
            this.evaluateinfoKey.term = response.body.currentYearTerm;
        },function(error){
          console.log("获取error");
        });

        this.$http.post('./teacherManage/getTeacherInfo',{},{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          var teacherJ = response.body.teacherSimpleInfoList;
          this.teacherList.splice(0,1);
          for(var j=0;j<teacherJ.length;j++){
            this.teacherList.push(
              {teacherName:teacherJ[j].teacherName,teacherId:teacherJ[j].teacherId}
            );
          }
        },function(error){
        });
      },
//      初始化页面时，获取学期列表，教师列表，课程列表，课程信息列表
      methods:{
        exportEvaInfoClick:function () {
            this.modalOperation = false;
          location.href = "./exportCheckEvaResult?yearAndSemester="+this.evaluateinfoKey.term;
        },
        checkEvaInfoClick: function(){
          this.$http.post('./acdCheckEvaResult',{
            "yearTerm":this.evaluateinfoKey.term,
            "teacherId":this.evaluateinfoKey.teacherId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.results = response.body.evaResult;
          },function(error){
            console.log("获取error");
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
            this.terms.push({semName:st2,semValue:stl});
            stl = nYear-1+'-'+nYear+'.'+'2';
            st2 = nYear-1+'-'+nYear+'学年（下）';
            this.terms.push({semName:st2,semValue:stl});
            nYear--;
          }
        },
//        提交学期，教师，课程，从后台获取相应课程信息
        checkEvaText:function(courseAssociationId){
          var evaScorePage = document.getElementById("evaScorePage");
          var evaTipsPage = document.getElementById("evaTipsPage");
          this.$http.post('./teacherCheckEvaResultText',{
            "courseAssociationId":courseAssociationId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            var data= response.body.evaResultText;
            for(var i=0;i<data.length;i++)
            {
              this.evaResultText.push({record:data[i].record,evaDate:data[i].evaDate,score:data[i].textEva.split("@")[0],text:data[i].textEva.split("@")[1]});
            }
            evaScorePage.style.display="none";
            evaTipsPage.style.display="inline";
            this.$Notice.open({
              title: '八项评分内容',
              name:'noticeeight',
              desc: '1、课前准备充分，按时上、下课(满分10)<br>2、上课情绪饱满，语速、音量适中，表达流畅(满分10)<br>3、目标明确，重点难点突出，条理清晰(满分20)<br>4、联系实际，内容深浅适度(满分10)<br>5、讲课方法灵活，不照本宣科，师生互动好(满分20)<br>6、作业布置、批改、讲评及时认真(满分10)<br>7、板书（投影）字迹清晰，展示重点知识点(满分10)<br>8、教学效果好(满分10)',
              duration: 30
            });
          },function(error){
            console.log("获取error");
          });
        },
//        查看学生评教留言
        goBackClick:function(){
          this.$Notice.close("noticeeight");
          var evaScorePage = document.getElementById("evaScorePage");
          var evaTipsPage = document.getElementById("evaTipsPage");
          evaScorePage.style.display="inline";
          evaTipsPage.style.display="none";
        }
//        返回学生评教结果页面
      }
    }
</script>

<style scoped>
    html {
        font-size: 100%;
    }
    #courseTchInfo{
      margin: 0.6rem 5rem;
      background-color: white;
    }
    .selectWM{
      width: 11.5rem;
      margin: 0 0.7rem;
    }
    .inputWM{
      width: 8rem;
      margin: 0 0.7rem;
    }
    .buttonWM{
      width: 5.6rem;
      margin: 0 0.7rem;
    }
    .buttonDiv{
      text-align: center;
    }
    .bottomButton{
      margin-top: 1rem;
      margin-right: 1.4rem;
      min-width: 5.6rem;
    }
    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
