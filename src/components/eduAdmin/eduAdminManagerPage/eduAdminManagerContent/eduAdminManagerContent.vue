<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="selectDiv">
    <div class="positionBar">
      <span>您的当前位置：</span>
      <span><a :href="eduAdminPageUrl" class="returnHome">首页</a></span>
      <span> > 考务管理</span>
    </div>
    <div class="blank">
      <select class="selectStyle1" v-model="yearSelect" @change="yearClick">
        <option value="" disabled selected>选择年制（必选项）</option>
        <option value="3">三年制</option>
        <option value="5">五年制</option>
      </select>

      <select class="selectStyle2" v-model="gradeSelect" @change="gradeClick">
        <option value="" disabled selected>选择年级（必选项）</option>
        <option v-for="grade in grades" v-bind:value="grade">{{grade}}级</option>
      </select>

      <select class="selectStyle2" v-model="courseSelect" @change="courseClick">
        <option value="" disabled selected>选择课程（必选项）</option>
        <option v-for="course in courses" v-bind:value="course">{{course}}</option>
      </select>
      <button class="restartButton am-btn am-btn-success am-radius" @click="exportExam">导出已安排考场</button>
      <button class="restartButton am-btn am-btn-success am-radius" @click="moda97 = true">重新安排考场</button>
    </div>
    <div id="tableDiv">
      <span>以下是未安排考场：</span>
      <table id="tableStyle" class="normalTable">
        <tr>
          <th>操作</th>
          <th>序号</th>
          <th>课程名称</th>
          <th>班级名称</th>
          <th>任课教师</th>
          <th>人数</th>
        </tr>
        <!--表头-->
        <tr v-for="(information,index) in informations" :id="information.id">
          <td><a class="editSpan" @click="arrangeClick(index)">安排考场</a></td>
          <td>{{index+1}}</td>
          <td>{{ information.courseName }}</td>
          <td>{{ information.className }}</td>
          <td>{{ information.teacherName }}</td>
          <td>{{ information.classPersonNumber }}</td>
        </tr>
      </table>
    </div>

    <div id="tableDivFinish">
      <span>以下是已安排考场：</span>
      <table id="tableStyleFinish" class="normalTable">
        <tr>
          <th>操作</th>
          <th>序号</th>
          <th>课程名称</th>
          <th>班级名称</th>
          <th>任课教师</th>
          <th>人数</th>
          <th>考试时间</th>
          <th>监考老师</th>
          <th>考试地点</th>
        </tr>
        <!--表头-->
        <tr v-for="(information,index) in informationsFinish" :id="information.id">
          <td><a class="editSpan" @click="removeClick(index)">删除此安排</a></td>
          <td>{{ index+1 }}</td>
          <td>{{ information.courseName }}</td>
          <td>{{ information.className }}</td>
          <td>{{ information.teacherName }}</td>
          <td>{{ information.classPersonNumber }}</td>
          <td>{{ information.examTime }}</td>
          <td>{{ information.examTeacher }}</td>
          <td>{{ information.examClassroom }}</td>
        </tr>
      </table>
    </div>

    <Modal v-model="modal2" id="modalBody" :styles="{top:'10rem'}">
      <p style="text-align:center; font-size:1.1rem;">{{ messageStr }}</p>
      <div slot="footer" style="text-align:center;">
        <Button v-if="okValue == '2'" id="modalBtn" @click="deleteOK()">确定</Button>
        <Button v-if="okValue == '1'" id="modalBtn" @click="modal2 = false">确定</Button>
        <Button v-if="okValue == '2'" id="modalBtn" @click="modal2 = false">取消</Button>
      </div>
    </Modal>

    <Modal v-model="moda97" id="modalBody" :styles="{top:'10rem'}">
      <p style="text-align:center; font-size:1.1rem;">是否确定安排考场</p>
      <div slot="footer" style="text-align:center;">
        <Button id="modalBtn" @click="restartClick()">确定</Button>
        <Button id="modalBtn" @click="moda97 = false">取消</Button>
      </div>
    </Modal>

    <Modal
      v-model="modal3"
      width="460"
      :mask-closable="false"
      id="modalBody"
      :styles="{top:'10rem'}" draggable="true">
      <div>
        <span style="font-size: medium;padding: 0.5rem">选择时间：</span>
        <select style="width: 14rem" v-model="heSelect" @change="dateClick">
          <option value="" disabled>选择时间（必选项）</option>
          <option value="10" selected="selected">第十周</option>
          <option value="20">第二十周</option>
        </select>
      </div>
      <div style="margin: 0.2rem 0">
        <span style="font-size: medium;padding: 0.5rem">选择日期：</span>
        <select style="width: 14rem" v-model="dateSelect" @change="dateClick">
          <option value="" disabled>选择日期（必选项）</option>
          <option v-for="(time,index) in times" :value="(index+1)">{{time}}</option>
        </select>
      </div>
      <div style="margin: 0.2rem 0">
        <span style="font-size: medium;padding: 0.5rem">选择场次：</span>
        <select style="width: 14rem" v-model="timesSelect" @change="timesClick">
          <option value="" disabled>选择场次（必选项）</option>
          <option v-for="num in nums" :value="num.number">{{num.world}}</option>
        </select>
      </div>
      <div style="margin: 0.2rem 0">
        <span style="font-size: medium;padding: 0.5rem">选择教室：</span>
        <select style="width: 14rem" v-model="roomSelect" @change="roomAddClick">
          <option value="" disabled selected>选择教室（必选项）</option>
          <option v-for="room in rooms" :value="room">{{room}}</option>
        </select>
      </div>
      <div style="margin: 0.2rem 0">
        <span style="font-size: medium;padding: 0.5rem">监考老师①：</span>
        <select style="width: 13rem" v-model="teacher1" @change="teacherClick1(index)">
          <option value="">无</option>
          <option v-for="teacher in teachers" :value="teacher">{{teacher}}</option>
        </select>
      </div>
      <div style="margin: 0.2rem 0">
        <span style="font-size: medium;padding: 0.5rem">监考老师②：</span>
        <select style="width: 13rem" v-model="teacher2" @change="teacherClick2(index)">
          <option value="">无</option>
          <option v-for="teacher in teachers" :value="teacher">{{teacher}}</option>
        </select>
      </div>
      <div slot="footer" style="text-align:center;">
        <Button id="modalBtn" @click="confirm()">保存</Button>
        <Button id="modalBtn" @click="modal3 = false">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        okValue:'1',
        modal1: false,//模态对话框1默认隐藏
        modal3: false,//模态对话框1默认隐藏
        modal2: false,//模态对话框2默认隐藏
        moda97: false,//模态对话框3默认隐藏
        messageStr: '',//模态对话框文字内容
        eduAdminPageUrl: '#/login/main/eduAdminHome',//教务首页url
        teacherSelects: [],
        heSelect:'10',
        yearSelect: '',//年制默认值
        gradeSelect: '',//年级默认值
        courseSelect: '',//课程默认值
        teacher1:'',
        selIndex:'',
        teacher2  :'',
        dateSelect: '1',//日期默认值
        timesSelect: '',//场次默认值
        roomSelect: '',//教室默认值
        teacherList: [],//教师名数组
        grades: [],
        courses: [],
        informations: [
//            { courseAssociationId:'0',edit:'编辑',id:'1',courseName:'护理管理学',className: '护理二班', teacherName:'何平', classPersonNumber: '135', testTime: '2016.10.9{19:00-21:00}', testTeacherName:'李晓红',testRoom:'教学楼408,409'},
//        { courseAssociationId:'1',edit:'编辑',id:'2',courseName:'护理管理学',className: '护理一班', teacherName:'何平', classPersonNumber: '135', testTime: '2016.10.9{19:00-21:00}', testTeacherName:'肖老师',testRoom:'教学楼408,409'},
        ],
        informationsFinish: [
//           { courseAssociationId:'0',remove:'删除',id:'1',courseName:'护理管理学',className: '护理二班', teacherName:'何平', classPersonNumber: '135', examTime: '2016.10.9{19:00-21:00}', examTeacher:'李晓红',examClassroom:'教学楼408,409'},
//           { courseAssociationId:'1',remove:'删除',id:'2',courseName:'护理管理学',className: '护理一班', teacherName:'何平', classPersonNumber: '135', examTime: '2016.10.9{19:00-21:00}', examTeacher:'肖老师',examClassroom:'教学楼408,409'},
        ],
        times: [
          '周一',
          '周二',
          '周三',
          '周四',
          '周五'
        ],
        nums: [
          {world: '上午 第一场（08:30-10:00）', number: '10'},
          {world: '上午 第二场（10:20-11:50）', number: '20'},
          {world: '下午 第一场（14:00-16:00）', number: '30'}
        ],
        teachers: [
//           '老师1',
//           '老师2',
//           '老师3',
        ],
        rooms: [
//           '教室1',
//           '教室2',
//           '教室3'
        ],
        todos: [
          //选中教室数组
        ],
      }
    },
    beforeMount: function () {
      this.$http.post('./courseExamInfo', {}, {
        "Content-Type": "application/json"
      }).then(function (response) {
        this.informationsFinish = response.body.arrangeCourseExamInfo;
        this.informations = response.body.notarrangeCourseExamInfo;
      }, function (error) {
      });
    },
    methods: {
        exportExam:function () {
          if(this.informationsFinish.length == 0)
          {
              this.$Message.warning("没有已安排考场，无法导出！");
              return;
          }
          location.href = './examManagementExport';
        },
      deleteOK:function (){
          this.modal2 = false;
          this.$http.post('./examManagementResetOne', {
            courseAssociationId: this.informationsFinish[this.selIndex].courseAssociationId,
            schoolYear: this.yearSelect,
            grade: this.gradeSelect,
            courseId: this.courseSelect
          }, {"Content-Type": "application/json"}).then(function (response) {
            var data = response.body;
            if (data.result.result == 1) {
                this.courseClick();
                this.$Message.success("操作成功！");
//              this.informations = response.body.gradeCourseDetail;
//              this.informationsFinish = response.body.alreadyGradeCourseDetail;
            } else if (data.result.result == 0) {
              this.$Message.error('删除失败！');
            }
          });
      },
      //重置考试信息按钮
      restartClick: function () {
          if(this.informationsFinish.length==0)
          {
              this.$Message.warning("没有已安排的考场，无需重置！");
              this.moda97 = false;
              return;
          }
        this.$http.post('./examManagementReset').then(function (response) {
          if (response.body.result.result == 0) {
            this.$Message.error('重置失败！');
          } else if (response.body.result.result == 1) {
            this.$Message.success('重置成功！');
            window.location.reload();//刷新页面
          }
          ;
        });
      },
      //年制选择
      yearClick: function () {
        this.$http.post('./examManagementGetGrade', {
          schoolYear: this.yearSelect,
        }, {"Content-Type": "application/json"}).then(function (response) {
          this.grades = response.body.grades;
          this.todos = [];
        });
      },
      //年级选择
      gradeClick: function () {
        this.$http.post('./examManagementGetGradeCourse', {
          schoolYear: this.yearSelect,
          grade: this.gradeSelect,
        }, {"Content-Type": "application/json"}).then(function (response) {
          this.courses = response.body.gradeCourse;
        });
      },
      //课程选择
      courseClick: function () {
        this.$http.post('./examManagementGetGradeCourseDetail', {
          schoolYear: this.yearSelect,
          grade: this.gradeSelect,
          courseId: this.courseSelect
        }, {"Content-Type": "application/json"}).then(function (response) {
          this.informations = response.body.gradeCourseDetail;
          this.informationsFinish = response.body.alreadyGradeCourseDetail;
        });
      },
      //删除已安排考试信息
      removeClick: function (index) {
        this.selIndex = index;
        this.modal2 = true;
        this.messageStr = "确认删除信息？";
        this.okValue = '2';
      },
      //时间选择
      dateClick: function () {
          this.teacherList = [];//用于判定教师是否安排冲突
          this.roomSelect = '';
          this.$http.post('./examManagementGetTeacherAndClassroom', {
            weekDays: this.dateSelect,
            sessionTimes: this.timesSelect,
          }, {"Content-Type": "application/json"}).then(function (response) {
            this.rooms = response.body.classroomList;
            this.teachers = response.body.teacherList;
          });

      },
      //场次选择
      timesClick: function () {
        this.teacherList = [];//用于判定教师是否安排冲突
        this.roomSelect = '';
        this.$http.post('./examManagementGetTeacherAndClassroom', {
          weekDays: this.dateSelect,
          sessionTimes: this.timesSelect,
        }, {"Content-Type": "application/json"}).then(function (response) {
          this.rooms = response.body.classroomList;
          this.teachers = response.body.teacherList;
        });
      },
      //添加教室选择
      roomAddClick: function () {
      },
      arrangeClick:function (index) {
        this.modal3 = true;
        this.selIndex = index;
      },
      confirm: function () {
          if(this.timesSelect=="")
          {
            this.$Message.error("请选择场次！");
            return;
          }
        if(this.roomSelect=="")
        {
          this.$Message.error("请选择教室！");
          return;
        }
          if(this.teacher1==""&&this.teacher2=="")
          {
              this.$Message.error("至少选择一位监考老师！");
              return;
          }
          if(this.teacher1==this.teacher2)
          {
            this.$Message.error("请选择两位不同的监考老师！");
            return;
          }
        var tcInfo = [];
        tcInfo[0] = this.roomSelect+this.teacher1+this.teacher2;
        this.$http.post('./examManagementArrangement', {
          courseAssociationId: this.informations[this.selIndex].courseAssociationId,
          schoolYear: this.yearSelect,
          grade: this.gradeSelect,
          halfOrEndSemester:this.heSelect,
          courseId: this.courseSelect,
          teacherClassroomInfo: tcInfo,
          weekDays: this.dateSelect,
          sessionTimes: this.timesSelect,
        }, {"Content-Type": "application/json"}).then(function (response) {
          var result = response.body.result;
          if (result.result == 1) {
            this.modal3 = false;
            this.modal2 = true;
            this.messageStr = "保存成功！";
            this.okValue = 1;
            this.courseClick();
          } else if (result.result == 0) {
              this.$Message.error("保存失败！");
          }
        }, function (error) {
          this.$Message.error("保存失败！");
        });
      }
    }
  }
</script>

<style scoped>
  html {
    font-size: 100%;
  }

  .selectStyle1 {
    margin-left: 5rem;
  }

  .selectStyle2 {
    margin-left: 5rem;
  }

  #selectDiv {
    height: 2.2rem;
  }

  .restartButton {
    float: right;
    margin-right: 5rem;;
    width: 8rem;
    outline: none;
  }

  #tableDiv {
    padding: 1rem 5rem;
    background-color: #f3f3f3;
  }

  #tableDivFinish {
    padding: 1rem 5rem;
    background-color: #f3f3f3;
  }

  #tableStyleFinish {
    text-align: center;
  }

  .editSpan {
    text-decoration: underline;
    cursor: pointer;
  }

  #setting {
    width: 100%;
    padding: 0 5rem;
  }

  .selectStyle2 {
    margin-left: 5rem;
  }

  .selectStyle3 {
    margin-left: 5rem;
    float: left;
  }

  ul {
    width: 100%;
    float: left;
    margin: 0 0 0 6rem;
    padding: 0.3rem 0 0 0;
  }

  .changeTermButton {
    margin-left: 5rem;
    width: 5.6rem;
  }

  .updateButton {
    width: 5.6rem;
    margin-left: 2rem;
  }

  .spanStyle {
    display: block;
    height: 1rem;
  }

  .teacher {
    width: 100%;
    padding: 1rem 0;
    float: left;
  }

  .roomStyle {
    width: 100%;
    padding: 2rem 0;
  }

  .listyle {
    width: 100%;
    font-size: 0.8rem;
    margin-right: 1rem;
    float: left;
  }

  .buttonStyle {
    /*background-color: white;*/
  }

</style>
