<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="selectDiv">
    <div class="positionBar">
      <span>你的当前位置：</span>
      <span><a :href="eduAdminPageUrl" class="returnHome">首页</a></span>
      <span> > 考务管理</span>
    </div>
    <div class="blank">
      <select class="selectStyle1"v-model="yearSelect" @change="yearClick">
        <option value="选择年制（必选项）" disabled selected>选择年制（必选项）</option>
        <option v-for="year in years" v-bind:value="year">{{year}}</option>
      </select>

      <select class="selectStyle2" v-model="gradeSelect" @change="gradeClick">
        <option value="选择年级（必选项）" disabled selected>选择年级（必选项）</option>
        <option v-for="grade in grades" v-bind:value="grade">{{grade}}</option>
      </select>

      <select class="selectStyle2" v-model="courseSelect" @change="courseClick">
        <option value="选择课程（必选项）" disabled selected>选择课程（必选项）</option>
        <option v-for="course in courses" v-bind:value="course">{{course}}</option>
      </select>
      <button class="restartButton am-btn am-btn-success am-radius" @click="restartClick">重新安排考场</button>
    </div>
    <div id="tableDiv">
      <table id="tableStyle" class="normalTable">
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
        <tr v-for="(information,index) in informations" :id="information.id">
          <td><a class="editSpan" @click="checkClick(index)">{{ information.edit }}</a></td>
          <td>{{ information.id }}</td>
          <td>{{ information.courseName }}</td>
          <td>{{ information.className }}</td>
          <td>{{ information.teacherName }}</td>
          <td>{{ information.classPersonNumber }}</td>
          <td>{{ information.testTime }}</td>
          <td>{{ information.testTeacherName }}</td>
          <td>{{ information.testRoom }}</td>
        </tr>
      </table>
    </div>
    <div id="setting" v-if="setting">

      <span class="spanStyle">对序号为<span>{{number}}</span>的课程进行设置：</span><br>

      <select class="selectStyle2" v-model="dateSelect" @change="dateClick">
        <option value="选择日期（必选项）" disabled selected>选择日期（必选项）</option>
        <option v-for="(time,index) in times" v-bind:value="(index+1)">{{time}}</option>
      </select>

      <select class="selectStyle2" v-model="timesSelect" @change="timesClick">
        <option value="选择场次（必选项）" disabled selected>选择场次（必选项）</option>
        <option v-for="num in nums" v-bind:value="num.number">{{num.world}}</option>
      </select>

      <div class="roomStyle">
        <select class="selectStyle3" v-model="roomSelect" @change="roomAddClick">
          <option value="选择教室（必选项）" disabled selected>选择教室（必选项）</option>
          <option v-for="room in rooms" v-bind:value="room" >{{room}}</option>
        </select>

        <ul class="ulStyle">
          <li class="listyle" v-for="(todo, index) in todos">

            <div class="teacher">
              {{todo}}<button class="buttonStyle" @click="roomRemoveClick">X</button>

              <!--label class="spanStyle">监考老师1:</label-->
              <select class="selectStyle1" v-model="teacherSelects[2*index]" @change="teacherClick1">
                <option value="监考老师1（必选项）" disabled selected>监考老师1（必选项）</option>
                <option v-for="teacher1 in teachers1" v-bind:value="teacher1">{{teacher1}}</option>
              </select>

              <!--span class="spanStyle">监考老师2:</span-->
              <select class="selectStyle1" v-model="teacherSelects[2*index+1]" @change="teacherClick2">
                <option value="监考老师2（必选项）" disabled selected>监考老师2（必选项）</option>
                <option v-for="teacher2 in teachers2" v-bind:value="teacher2">{{teacher2}}</option>
              </select>
            </div>

          </li>
        </ul>
      </div>

      <div>
        <button class="changeTermButton am-btn am-btn-success am-radius" @click="confirm">保存</button>
        <button class="updateButton am-btn am-btn-success am-radius" @click="cancel">取消</button>
      </div>
    </div>

    <div id="tableDivFinish">
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
          <td><a class="editSpan" @click="removeClick(index)">{{ information.remove }}</a></td>
          <td>{{ information.id }}</td>
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
        <Button id="modalBtn" @click="ok2()">确定</Button>
        <Button id="modalBtn" @click="cancel2()">取消</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        modal1:false,
        modal2:false,
        okValue:0,//值为0无法执行，为1可以执行
        messageStr:'',
        eduAdminPageUrl:'#/login/main/eduAdminHome',
        teacherSelects:[
          'teacherSelect1',
          'teacherSelect2',
          'teacherSelect3',
          'teacherSelect4',
          'teacherSelect5',
          'teacherSelect6',
          'teacherSelect7',
          'teacherSelect8'
        ],
        setting:false,//编辑状态栏的显隐
        nowIndex:-1,//当前选中index
        number:1,//当前选中序号
        yearSelect:'选择年制（必选项）',//年制默认值
        gradeSelect:'选择年级（必选项）',//年级默认值
        courseSelect:'选择课程（必选项）',//课程默认值

        dateSelect:'选择日期（必选项）',//日期默认值
        timesSelect:'选择场次（必选项）',//场次默认值
        teacherSelect1:'监考老师1（必选项）',//监考老师1默认值
        teacherSelect2:'监考老师2（必选项）',//教考老师2默认值
        teacherSelect3:'监考老师1（必选项）',//监考老师1默认值
        teacherSelect4:'监考老师2（必选项）',//监考老师1默认值
        teacherSelect5:'监考老师1（必选项）',//监考老师1默认值
        teacherSelect6:'监考老师2（必选项）',//监考老师1默认值
        teacherSelect7:'监考老师1（必选项）',//监考老师1默认值
        teacherSelect8:'监考老师2（必选项）',//监考老师1默认值
        roomSelect:'选择教室（必选项）',//教室默认值
        years:[
          '三年制',
          '五年制',
        ],
        grades:[

          '一年级',
          '二年级',

        ],
        courses: [

          '课程01',
          '课程02',
          '课程03',
          '课程04',
          '课程05',

        ],
        informations: [
          //未完成课表

          { courseAssociationId:'0',edit:'编辑',id:'1',courseName:'护理管理学',className: '护理二班', teacherName:'何平', classPersonNumber: '135', testTime: '2016.10.9{19:00-21:00}', testTeacherName:'李晓红',testRoom:'教学楼408,409'},
          { courseAssociationId:'1',edit:'编辑',id:'2',courseName:'护理管理学',className: '护理一班', teacherName:'何平', classPersonNumber: '135', testTime: '2016.10.9{19:00-21:00}', testTeacherName:'肖老师',testRoom:'教学楼408,409'},

        ],
        informationsFinish: [
          /*完成课表
           { courseAssociationId:'0',remove:'删除',id:'1',courseName:'护理管理学',className: '护理二班', teacherName:'何平', classPersonNumber: '135', examTime: '2016.10.9{19:00-21:00}', examTeacher:'李晓红',examClassroom:'教学楼408,409'},
           { courseAssociationId:'1',remove:'删除',id:'2',courseName:'护理管理学',className: '护理一班', teacherName:'何平', classPersonNumber: '135', examTime: '2016.10.9{19:00-21:00}', examTeacher:'肖老师',examClassroom:'教学楼408,409'},
          */
        ],
        terms:[

          '2016-2017-1',
          '2016-2017-2',
          '2017-2018-1',
          '2017-2018-2',

        ],
        times:[
          '周一',
          '周二',
          '周三',
          '周四',
          '周五'
        ],
        nums:[
          {world:'上午 第一场（08:30-10:00）',number:'10'},
          {world:'上午 第二场（10:20-11:50',number:'20'},
          {world:'下午 第一场（14:00-16:00）',number:'30'}
        ],
        teachers1:[

          '老师1',
          '老师2',
          '老师3',

        ],
        teachers2:[

          '老师1',
          '老师2',
          '老师3',

        ],
        rooms:[

          '教室1',
          '教室2',
          '教室3',

        ],
        todos:[
          /*
          '教室a',
          '教室b',
          '教室c'
          */
        ],
      }
    },
  methods:
  {
    ok2 () {
      if(this.okValue==0) {
        this.modal2 = false;
      }else if(this.okValue==1){
        var year=0;
        if(this.yearSelect=="三年制"){
          year=3;
        }else if(this.yearSelect=="五年制"){
          year=5;
        }
        this.$http.post('./examManagementResetOne', {
          courseAssociationId: this.informationsFinish[index].courseAssociationId,
          schoolYear:year,
          grade: this.gradeSelect,
          courseId:this.courseSelect
        }, {"Content-Type": "application/json"}).then(function(response) {
          var data=response.body;
          if(data.result.result==1) {
            var info=response.body.gradeCourseDetail;
            for(var i=0;i<info.length;i++) {
              info[i]['edit'] = '编辑';
              info[i]['id'] = i+1;
              info[i]['testTime']='';
              info[i]['testTeacherName']='';
              info[i]['testRoom']='';
            }
            this.informations=info;//未完成表格

            var finishInfo=response.body.alreadyGradeCourseDetail;
            for(var i=0;i<finishInfo.length;i++) {
              finishInfo[i]['remove'] = '删除';
              finishInfo[i]['id'] = i+1;
            }
            this.informationsFinish=finishInfo;//完成表格
          }else if(data.result.result==0){
            this.$Message.error('删除失败！');
          }
        });

      }
    },
    cancel2(){
      this.modal2 = false;
    },
    //重置考试信息
    restartClick:function(){
      this.$http.post('./examManagementReset').then(function(response) {
        if(response.body.result.result==0){
          this.$Message.error('重置失败！');
        }else if(response.body.result.result==1){
          this.$Message.success('重置成功！');
          window.location.reload();//刷新页面
        };
      });
    },
    //年制选择
    yearClick:function(){

      this.grades=[];
      this.gradeSelect="选择年级（必选项）";
      this.courses=[];
      this.courseSelect="选择课程（必选项）";
      var year=0;
      if(this.yearSelect=="三年制") {
        year = 3;
      }else if(this.yearSelect=="五年制"){
        year=5;
      }
      this.$http.post('./examManagementGetGrade', {
        schoolYear: year,
      }, {"Content-Type": "application/json"}).then(function (response) {
        this.grades=response.body.grades;
        this.todos=[];
      });
    },
    //年级选择
    gradeClick:function(){
      this.courses=[];
      this.courseSelect="选择课程（必选项）";
      var year=0;
      if(this.yearSelect=="选择年制（必选项）"){
          this.modal2=true;
          this.messageStr="未选择年制！";
          this.okValue=0;
        return;
      }
      else if(this.yearSelect=="三年制"){
        year=3;
      }else if(this.yearSelect=="五年制"){
        year=5;
      }
      this.$http.post('./examManagementGetGradeCourse', {
        schoolYear:year,
        grade: this.gradeSelect,
      }, {"Content-Type": "application/json"}).then(function(response) {
        this.courses=response.body.gradeCourse;
      });
    },
    //课程选择
    courseClick:function(){

      if(this.yearSelect=="选择年制（必选项）"){
        this.modal2=true;
        this.messageStr="未选择年制！";
        this.okValue=0;
        this.courseSelect='选择课程（必选项）';
        return;
      }

      if(this.gradeSelect=='选择年级（必选项）'){
        this.modal2=true;
        this.messageStr="未选择年级！";
        this.okValue=0;
        this.courseSelect='选择课程（必选项）';
        return;
      }

      var year=0;
      if(this.yearSelect=="三年制"){
        year=3;
      }else if(this.yearSelect=="五年制"){
        year=5;
      }
      this.$http.post('./examManagementGetGradeCourseDetail', {
        schoolYear:year,
        grade: this.gradeSelect,
        courseId:this.courseSelect
      }, {"Content-Type": "application/json"}).then(function(response) {
        var info=response.body.gradeCourseDetail;
        for(var i=0;i<info.length;i++) {
          info[i]['edit'] = '编辑';
          info[i]['id'] = i+1;
          info[i]['testTime']='';
          info[i]['testTeacherName']='';
          info[i]['testRoom']='';
        }
        this.informations=info;//未完成表格

        var finishInfo=response.body.alreadyGradeCourseDetail;
        for(var i=0;i<finishInfo.length;i++) {
          finishInfo[i]['remove'] = '删除';
          finishInfo[i]['id'] = i+1;
        }
        this.informationsFinish=finishInfo;//完成表格
      });
    },
    //编辑
    checkClick:function(index){
        if (!this.setting&&this.nowIndex==-1) {
          this.number = index + 1;
          this.setting = true;
          this.informations[index].edit = '修改中';
          this.nowIndex=this.number;
        } else if(this.setting&&this.nowIndex==(index+1)){
          this.setting = false;
          this.informations[index].edit = '编辑';
          this.nowIndex=-1;
        }else{
          //nothing
        }
    },
    //删除
    removeClick:function(index){
      this.modal2=true;
      this.messageStr="确认删除信息？";
      this.okValue=1;
    },
    //时间选择
    dateClick:function(){
      //nothing
    },
    //场次选择
    timesClick:function(){

      if(this.dateSelect=='选择日期（必选项）'){
        this.modal2=true;
        this.messageStr="未选择时间！";
        this.okValue=0;
        this.timesSelect='选择场次（必选项）';
        return;
      }

      this.$http.post('./examManagementGetTeacherAndClassroom', {
        weekDays:this.dateSelect,
        sessionTimes:this.timesSelect,
      }, {"Content-Type": "application/json"}).then(function(response) {
        this.rooms=response.body.classroomList;
        this.teachers1=response.body.teacherList;
        this.teachers2=response.body.teacherList;
      });
    },
    //教师1选择
    teacherClick1:function(){
      //nothing
    },
    //教师2选择
    teacherClick2:function(){
      //nothing
    },
    //添加教室选择
    roomAddClick:function(){
      this.todos.push(this.roomSelect);
    },
    //删除教室
    roomRemoveClick:function(index){
      this.todos.splice(index,1);
      if(this.todos.length==0){
        this.roomSelect = '选择教室（必选项）';
      }
    },//保存
    confirm:function() {

      var tcInfo = [];
      for (var i = 0; i < this.todos.length; i++) {
        tcInfo.push(this.todos[i] + this.teacherSelects[2 * i] + this.teacherSelects[2 * i + 1]);
      }

      if (this.dateSelect == '选择日期（必选项）') {
        this.modal2 = true;
        this.messageStr = "未选择日期！";
        this.okValue = 0;
        return;
      }

      if (this.timesSelect == '选择场次（必选项）') {
        this.modal2 = true;
        this.messageStr = "未选择场次！";
        this.okValue = 0;
        return;
      }

      if (tcInfo.length == 0) {
        this.modal2 = true;
        this.messageStr = "未选择教室！";
        this.okValue = 0;
        return;
      }else{
        var chooseTeacher=true;
        for (var i = 0; i < this.todos.length; i++) {
          var a=eval("this."+this.teacherSelects[2 * i])
          if(a=='监考老师1（必选项）'){
            chooseTeacher=false;
          }
        }

        if(!chooseTeacher){//没选监考老师的情况
          this.modal2 = true;
          this.messageStr = "每个教室至少一个教师！";
          this.okValue = 0;
          return;
        }
      }

      var year = 0;
      if (this.yearSelect == "三年制") {
        year = 3;
      } else if (this.yearSelect == "五年制") {
        year = 5;
      }

      this.$http.post('./examManagementArrangement', {
        courseAssociationId: this.informations[this.number - 1].courseAssociationId,
        schoolYear: year,
        grade: this.gradeSelect,
        courseId: this.courseSelect,
        teacherClassroomInfo: tcInfo,
        weekDays: this.dateSelect,
        sessionTimes: this.timesSelect,
      }, {"Content-Type": "application/json"}).then(function (response) {
        var result = response.body.result;
        if (result.result == 1) {

          //this.$Message.success('保存成功！');
          this.modal2 = true;
          this.messageStr = "保存成功！";
          this.okValue = 0;

          var info = response.body.gradeCourseDetail;
          for (var i = 0; i < info.length; i++) {
            info[i]['edit'] = '编辑';
            info[i]['id'] = i + 1;
            info[i]['testTime'] = '';
            info[i]['testTeacherName'] = '';
            info[i]['testRoom'] = '';
          }
          this.informations = info;//未完成表格

          var finishInfo = response.body.alreadyGradeCourseDetail;
          for (var i = 0; i < finishInfo.length; i++) {
            finishInfo[i]['remove'] = '删除';
            finishInfo[i]['id'] = i + 1;
          }
          this.informationsFinish = finishInfo;//完成表格

          this.informationsFinish = finishInfo;//完成表格

          this.setting = false;
          for (var i = 0; i < this.informations.length; i++) {
            this.informations[i].edit = '编辑';
          }
          this.nowIndex = -1;
          this.dateSelect = '选择日期（必选项）';//日期默认值
          this.timesSelect = '选择场次（必选项）';//场次默认值
          this.teacherSelect1 = '监考老师1（必选项）';//监考老师1默认值
          this.teacherSelect2 = '监考老师2（可选项）';//教考老师2默认值
          this.roomSelect = '选择教室（必选项）';//教室默认值
          this.todos = [];
        } else if (result.result == 0) {
          //this.$Message.error('保存失败！');
          this.modal2 = true;
          this.messageStr = "保存失败！";
          this.okValue = 0;
        }
      });
    },
    //取消
    cancel:function(){
      this.nowIndex=-1;
      for(var i=0;i<this.informations.length;i++) {
        this.informations[i].edit = '编辑';
      }
      this.informationsFinish=finishInfo;//完成表格

      this.setting=false;
      this.dateSelect='选择日期（必选项）';//日期默认值
      this.timesSelect='选择场次（必选项）';//场次默认值
      this.teacherSelect1='监考老师1（必选项）';//监考老师1默认值
      this.teacherSelect2='监考老师2（必选项）';//教考老师2默认值
      this.roomSelect='选择教室（必选项）';//教室默认值
      this.todos=[];
    }
   }
  }
</script>

<style scoped>
  html {
    font-size: 100%;
  }
  .selectStyle1{
    margin-left:5rem;
  }
  .selectStyle2{
    margin-left:5rem;
  }
  #selectDiv{
    height:2.2rem;
  }
  .restartButton{
    float:right;
    margin-right: 5rem;;
    width:8rem;
    outline: none;
  }
  #tableDiv{
    padding:1rem 5rem;
    background-color: #f3f3f3;
  }
  #tableDivFinish{
    padding:1rem 5rem;
    background-color: #f3f3f3;
  }
  #tableStyleFinish{
    text-align: center;
  }
  .editSpan{
    text-decoration:underline;
    cursor: pointer;
  }
  #setting{
    width:100%;
    padding:0 5rem;
  }
  .selectStyle2{
    margin-left:5rem;
  }
  .selectStyle3{
    margin-left:5rem;
    float:left;
  }
  ul{
    width:100%;
    float:left;
    margin: 0 0 0 6rem;
    padding: 0.3rem 0 0 0;
  }
  .changeTermButton{
    margin-left:5rem;
    width:5.6rem;
  }
  .updateButton{
    width:5.6rem;
    margin-left:2rem;
  }
  .spanStyle{
    display: block;
    height:1rem;
  }
  .teacher{
    width:100%;
    padding:1rem 0;
    float:left;
  }
  .roomStyle{
    width:100%;
    padding:2rem 0;
  }
  .listyle{
    width:100%;
    font-size: 0.8rem;
    margin-right:1rem;
    float:left;
  }
  .buttonStyle{
    /*background-color: white;*/
  }


  @media screen and (max-width: 1023px) {
    html {
      font-size: 56%;
    }
  }
</style>
