<template>
  <div>
    <div class="positionBar">
      <span>您的当前位置：</span>
      <span><a :href="studentPageUrl" class="returnHome">首页</a></span>
      <span> > 学生成绩信息</span>
    </div>
    <div id="stdInquireGradeChangeTerm">
      <select class="selectWM" v-model="termEle">
        <option value="0">选择学期</option>
        <option v-for="term in terms" :value="term">{{term}}</option>
      </select>
      <span><button id="changebut" class="am-btn am-btn-success am-radius buttonWM" @click="changeTerm()">切换学期</button></span>
      <span><button id="allbut" class="am-btn am-btn-success am-radius buttonWM" @click="allTerm()">所有学期成绩</button></span>
    </div>
    <div id="stdTable" style="padding: 0.6rem 5rem;background-color: #f3f3f3">
      <table id="stdInquireGradeTableSy" class="normalTable" style="table-layout: fixed;">
        <thead>
        <tr>
          <th>学年学期</th>
          <th>课程代码</th>
          <th>课程名称</th>
          <th>课程类别</th>
          <th>总评成绩</th>
          <th>补考成绩</th>
          <th>最终</th>
          <th>补考申请</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(studentScore,index) in studentScoreList">
          <td v-text="studentScore.yearTerm"></td>
          <td v-text="studentScore.courseId"></td>
          <td v-text="studentScore.courseName"></td>
          <td v-text="studentScore.courseType"></td>
          <td v-text="studentScore.endGrade"></td>
          <td v-text="studentScore.makeUpGrade"></td>
          <td v-text="studentScore.finalGrade"></td>
          <td><a class="point" @click="applyClick(index)">{{studentScore.apply}}</a></td>
        </tr>
        </tbody>
      </table>
    </div>
    <Modal v-model="modal2" id="modalBody" :styles="{top:'10rem'}">
      <p style="text-align:center; font-size:1.1rem;">{{ messageStr }}</p>
      <div slot="footer" style="text-align:center;">
        <Button id="modalBtn" @click="ok2()">确定</Button>
        <Button id="modalBtn" @click="cancel2()">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'stdInquireGradeTableSy',//模块名
    data () {
      return {
        modal1:false,//模态对话框1隐藏
        modal2:false,//模态对话框2隐藏
        nowIndex:0,//值为0无法执行，为1可以执行
        messageStr:'是否确定提交补考申请？',//模态对话框文字内容
        studentPageUrl:'#/login/main/studentHome',//学生首页url
        termEle:'0',//选择学期默认值
        terms:[
          //学期数组
          /*
          '2014-2015.1',
          '2014-2015.2',
          '2015-2016.1',
          '2015-2016.1'
          */
        ],
        studentScoreList:[
          //成绩数组
          /*
          {yearTerm:'2016-2017.2',courseId:'K2210710',courseName:'企业合作课程',courseType:'实践类核心课程',endGrade:'80',makeUpGrade:'--',finalGrade:'80',apply:'提交申请'},
          {yearTerm:'2016-2017.2',courseId:'K2210710',courseName:'企业合作课程',courseType:'实践类核心课程',endGrade:'80',makeUpGrade:'--',finalGrade:'80',apply:'--'},
          {yearTerm:'2016-2017.2',courseId:'K2210710',courseName:'企业合作课程',courseType:'实践类核心课程',endGrade:'80',makeUpGrade:'--',finalGrade:'80',apply:'提交申请'}
          */
        ]
      }
    },
    //页面初始化执行，请求初始表格数据
    beforeMount:function() {
      this.$http.post('./studentFindScore',{
        "yearTerm":""
      },{
        "Content-Type":"application/json"
      }).then(function (response) {
        var a= response.body.studentScoreList;
        for(var i=0;i<a.length;i++){
          /*
          判断每一门课程的状态，“--”为无法提交补课申请，没有提交则为“提交申请”，
          提交后没有审核为“审核中”，通过了为“审核通过”，没通过为“审核未通过”
          */
          if(a[i].endGrade<60) {
            if(a[i].makeupExamNum>1) {
              if(a[i].applyMakeup==0) {
                a[i]['apply'] = '提交申请';
              }else if(a[i].applyMakeup==1){
                a[i]['apply'] = '审核中';
              }else if(a[i].applyMakeup==2){
                a[i]['apply'] = '审核通过';
              }else if(a[i].applyMakeup==3){
                a[i]['apply'] = '审核未通过';
              }
            }else{
              a[i]["apply"] = '--';
            }
          }else{
            a[i]['apply'] = '--';
          }
        }
        this.studentScoreList=a;
      },function(error){
      });
    },
    //页面初始化执行，在beforeMount之后，初始化下拉框学期数组
    mounted:function(){
      this.$http.post('./getYearTermList',{
      },{
        "Content-Type":"application/json"
      }).then(function (response) {
        var a=[];
        for(var i=0;i<response.body.yearTerm.length;i++){
          a.push(response.body.yearTerm[i].startYearSemester);
        }
        this.terms= a;//把后端反馈的学期信息灌注到学期数组
        this.termEle = response.body.currentYearTerm;
      });
    },
    methods:{
      ok2 () {//模态对话框点击确定后执行，提交申请给后端
        this.modal2=false;
        this.$http.post('./applyMakeUp',{
          "courseId":this.studentScoreList[this.nowIndex].courseId
        },{
          "Content-Type":"application/json"
        }).then(function (response) {
          if (response.body.result == 1) {
            this.$Message.success('申请成功！');
            this.studentScoreList[this.nowIndex].apply="审核中";
          } else if(response.body.result == 0){
            this.$Message.error('申请失败！');
          }
        },function(error){
          console.log("获取error");
        });
      },
      cancel2(){//模态对话框点击取消时执行，取消提交补考申请
        this.modal2=false;
      },
      changeTerm: function(){//查询对应学期的成绩信息，并将后端信息转化为申请状态
        this.$http.post('./studentFindScore',{
          "yearTerm":this.termEle
        },{
          "Content-Type":"application/json"
        }).then(function (response) {
          var a= response.body.studentScoreList;
          for(var i=0;i<a.length;i++){
            if(a[i].endGrade<60) {
              if(a[i].makeupExamNum>1) {
                if(a[i].applyMakeup==0) {
                  a[i]["apply"] = '提交申请';
                }else if(a[i].applyMakeup==1){
                  a[i]["apply"] = '审核中';
                }else if(a[i].applyMakeup==2){
                  a[i]["apply"] = '审核通过';
                }else if(a[i].applyMakeup==3){
                  a[i]["apply"] = '审核未通过';
                }
              }else{
                a[i]["apply"] = '--';
              }
            }else{
              a[i]["apply"] = '--';
            }
          }
          this.studentScoreList=a;
        },function(error){
          console.log("获取error");
        });
      },
      allTerm: function(){//查看所有学期成绩
        this.$http.post('./studentFindScore',{
          "yearTerm":""
        },{
          "Content-Type":"application/json"
        }).then(function (response) {
          var a= response.body.studentScoreList;
          for(var i=0;i<a.length;i++){
            if(a[i].endGrade<60) {
              if(a[i].makeupExamNum>1) {
                if(a[i].applyMakeup==0) {
                  a[i]["apply"] = '提交申请';
                }else if(a[i].applyMakeup==1){
                  a[i]["apply"] = '审核中';
                }else if(a[i].applyMakeup==2){
                  a[i]["apply"] = '审核通过';
                }else if(a[i].applyMakeup==3){
                  a[i]["apply"] = '审核未通过';
                }
              }else{
                a[i]["apply"] = '--';
              }
            }else{
              a[i]["apply"] = '--';
            }
          }
          this.studentScoreList=a;
        },function(error){
          console.log("获取error");
        });
      },
      applyClick:function(index){//提交申请，文本点击事件
        if(this.studentScoreList[index].apply=='提交申请') {
          this.modal2 = true;
          this.nowIndex = index;
        }
      }
    }
  }
</script>

<style scoped>
    html{
        font-size: 62.5%;

    }
    #stdInquireGradeChangeTerm{
      margin: 0.6rem 5rem;
      background-color: white;
    }
    .selectWM{
      width: 8rem;
      margin: 0 0.7rem;
    }
    .inputWM{
      width: 8rem;
      margin: 0 0.7rem;
    }
    .buttonWM{
      min-width: 5.6rem;
      margin: 0 0.7rem;
    }
    .point{
      color: #5E96BA;
      cursor: pointer;
    }
</style>
