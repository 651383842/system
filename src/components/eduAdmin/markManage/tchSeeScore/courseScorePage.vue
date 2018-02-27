<template>
  <div>
    <!-- 导航栏路径跳转返回首页 -->
    <div class="positionBar">
      <span>您的当前位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span> > 结业成绩</span>
    </div>
    <!-- 填选信息进行查询学生成绩 -->
    <div class="tableGrade addTableSelect">
      <select v-model="selGradeType" @change="gradeChange()">
        <option disabled value="">选择年制</option>
        <option v-for="gradeTypeOne in gradeType" :value="gradeTypeOne.value">{{gradeTypeOne.text}}</option>
      </select>
      <select v-model="selYearTerm" @change="showLessons">
        <option disabled value="">选择学期</option>
        <option v-for="yearTermOne in yearTerm" :value="yearTermOne.semValue">{{yearTermOne.semName}}</option>
      </select>
      <select v-model="selClassId" @change="showLessons">
        <option disabled value="">选择班级</option>
        <option v-for="classIdOne in classInfo" :value="classIdOne.classId">{{classIdOne.className}}</option>
      </select>
      <!--<select v-model="selCourseName">-->
        <!--<option disabled value="">选择课程</option>-->
        <!--<option v-for="courseNameOne in courseInfo" :value="courseNameOne.courseId">{{courseNameOne.courseName}}</option>-->
      <!--</select>-->
      <span class="inputNumber">
			<input v-model="studentId" type="number" placeholder="输入学号">
		</span>
      <button class="am-btn am-btn-success am-radius" @click="inquireBtn()">查询</button>
      <span>
		<button class="am-btn am-btn-success am-radius" @click="exportBtn">导出</button>
        <!-- <form action="./exportScoreList" method="get"><button :value="this.scoreListByStuNo" name="scoreListByStuNo" type="submit" class="am-btn am-btn-success am-radius">导出</button></form> -->
		</span>
    </div>

    <!-- 成绩单列表 -->
    <div id="gradeContent">
      <div class="gradeContentBody">
        <table class="normalTable">
          <thead>
          <tr>
            <th>学号</th>
            <th>姓名</th>
            <th>课程编号</th>
            <th>课程</th>
            <th>结业成绩</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="data in scoreListByStuNo">
            <td v-text="data.studentId"></td>
            <td v-text="data.studentName"></td>
            <td v-text="data.courseId"></td>
            <td v-text="data.courseName"></td>
            <td v-text="data.endGrade"></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 错误弹窗提示 -->
    <Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
      <div style="text-align:center; font-size:1.1rem;">
        <p v-if="resultBool === '1'">未找到所查询内容！</p>
        <p v-else-if="resultBool === '2'">未找到可下载的内容！</p>
        <p v-else-if="resultBool === '3'">请选择年制！</p>
        <p v-else-if="resultBool === '4'">请选择后进行查询！</p>
      </div>
      <div slot="footer" style="text-align:center;">
        <Button id="modalBtn" @click="resultOk()">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'gradeContent',
    data () {
      return {
        // 全局变量定义
        selGradeType: '',
        selYearTerm: '',
        selCourseName: '',
        selClassId: '',
        gradeType: [
          {text: '三年制', value: '3'},
          {text: '五年制', value: '5'}
        ],
        yearTerm: [
        ],
        courseInfo: [
//				 {courseName: '护理学', courseId: '123456'},
//        {courseName: '理论', courseId: '69852'}
        ],
        classInfo: [
//				 {className: '一班', classId: '1256'},
//        {className: '二班', classId: '20156'}
        ],
        studentId: '',
        // 返回学生成绩列表
        scoreListByStuNo: [
//				 {stuNum: '20142201010', stuName: '何平', stuGrade: '大二', stuMajor: '护理学', stuSemester: '2016-2017第一学期', stuCourse: '护理学', stuScore: '80'}
        ],
        modalResult: false,	// 提示弹窗隐藏
        resultBool: ''
      }
    },
    // 页面初始化，获取学期、课程下拉数据
    beforeMount: function() {
      this.$http.post('./getCurrentYearAndSemester',{},{//获取当前学期周数
        "Content-Type":"application/json"
      }).then(function(response){
        var data = response.body;
        this.generateSemester();
        this.selYearTerm = data.yearAndSemester;
      },function(error){});
    },
    methods: {
      showLessons:function () {
        if(this.selGradeType == ""||this.selYearTerm == ""||this.selClassId == "")
        {return;}
        this.$http.post('./courseAssociationManege/showLessonsBySemester',{
          "yearSemester": this.selYearTerm,
          "schoolYearType": this.selGradeType,
          "classId": this.selClassId
        },{
          "Content-Type":"application/json"
        }).then(function(response){
          this.courseInfo = response.body;
          if(this.courseInfo.length == 0)
          {
            this.$Message.warning("沒有查询到课程！");
          }
        },function(error){
        });
      },
      // 选择年制后，班级列表对应更改
      gradeChange: function () {
        // alert("1")
        this.$http.post('./courseManage/getCourseAndClassInfo',{},{
          "Content-Type":"application/json"
        }).then(function(response){
          var data = response.body.classInfo;
          // this.classInfo = [];
          if(this.selGradeType==3){
            this.classInfo=(data.three);
          }else if(this.selGradeType==5){
            this.classInfo=(data.five);
          }
        },function(error){
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
          this.yearTerm.push({semName:st2,semValue:stl});
          stl = nYear-1+'-'+nYear+'.'+'2';
          st2 = nYear-1+'-'+nYear+'学年（下）';
          this.yearTerm.push({semName:st2,semValue:stl});
          nYear--;
        }
      },
      // 查询按钮
      inquireBtn: function() {
        if(this.studentId != "")
        {
          this.$http.post('./getGraduateScoreList',{
            "classId": this.selClassId,
            "studentId": this.studentId
          },{
            "Content-Type":"application/json"
          }).then(function(response){
            var data = response.body;
            if (data.graduateScoreList.length != 0) {
              this.scoreListByStuNo = data.graduateScoreList;
            }else {
              this.$Message.warning("未找到所查询内容！");
              this.scoreListByStuNo.splice(0,this.scoreListByStuNo.length)
            }
          },function(error){
          });
          return;
        }
        if (this.selGradeType == "") {
          this.modalResult = true;
          this.resultBool = '3';
        }else if (this.selYearTerm == "" || this.selClassId == "") {
          this.modalResult = true;
          this.resultBool = '4';
        }else {
          this.$http.post('./getGraduateScoreList',{
            "classId": this.selClassId,
            "studentId": this.studentId
          },{
            "Content-Type":"application/json"
          }).then(function(response){
            var data = response.body;
            if (data.graduateScoreList.length != 0) {
              this.scoreListByStuNo = data.graduateScoreList;
            }else {
              this.$Message.warning("未找到所查询内容！");
              this.scoreListByStuNo.splice(0,this.scoreListByStuNo.length)
            }
          },function(error){
          });
        }

      },
      // 导出按钮
      exportBtn: function() {
        if(this.scoreListByStuNo.length==0)
        {
          this.$Notice.warning({
            title: '提示',
            desc: '查询结果为空不能导出！'
          });
          return;
        }
        // 判断所有下拉框是否已选，若已全选，下载查询到内容
        location.href = "./exportGraduateScoreList?classId="+this.selClassId+"&"+"studentId="+this.studentId;
      },
      // 弹窗提示点击确定，弹窗消失
      resultOk: function () {
        this.modalResult = false;
      }
    }
  }
</script>

<style scoped>
  #gradeContent {
    background-color: #f3f3f3;
    width: 100%;
    text-align: center;
  }
  .gradeContentBody {
    padding: 1rem 5rem;
  }
  .inputNumber {
    /*margin-right: 1.4rem;*/
  }
  /*.gradeContentBody table {
      margin-bottom: 1.6rem;
  }*/
  .addTableSelect span {
    display: inline-block;
  }

</style>
