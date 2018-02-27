<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div>
      <div class="positionBar">
        <span>您的当前位置：</span>
        <span><a :href="studentPageUrl" class="returnHome">首页</a></span>
        <span> > 学生课表信息</span>
      </div>
      <div class="tableSelect">
      <select style="width: 11.5rem" v-model="yearSelect">
        <option value="选择学期" disabled selected>选择学期</option>
        <option v-for="year in years" v-bind:value="year">{{year}}</option>
      </select>

        <select style="width: 7rem" v-model="weekSelect">
          <option value="选择周数" disabled selected>选择周数</option>
          <option v-for="(week,index) in weeks" v-bind:value=(index+1)>{{week}}</option>
        </select>
      <button class="am-btn am-btn-success am-radius" @click="searchClick">查找</button>
        </div>

      <div id="checkCourse_tableDiv">
        <table class="arrangeTable">
          <thead>
          <tr>
            <th width="10%">节次/周次</th>
            <th width="14.8%">星期一</th>
            <th width="14.8%">星期二</th>
            <th width="14.8%">星期三</th>
            <th width="14.8%">星期四</th>
            <th width="14.8%">星期五</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>第一~二节<br>8:30-10:00</td>
            <td v-html="firstCourse"></td>
            <td v-html="secondCourse"></td>
            <td v-html="thirdCourse"></td>
            <td v-html="fourthCourse"></td>
            <td v-html="fifthCourse"></td>
          </tr>
          <tr>
            <td>第三~四节<br>10:20-11:50</td>
            <td v-html="sixthCourse" ></td>
            <td v-html="seventhCourse" ></td>
            <td v-html="eightCourse" ></td>
            <td v-html="ninthCourse"></td>
            <td v-html="tenthCourse"></td>
          </tr>
          <tr>
            <td>第五~六节<br>14:30-16:00</td>
            <td v-html="eleventhCourse" ></td>
            <td v-html="twelfthCourse" ></td>
            <td v-html="thirteenthCourse" ></td>
            <td v-html="fourteenthCourse" ></td>
            <td v-html="">安全教育</td>
          </tr>
          <tr>
            <td>第八~九节<br>17:30-19:05</td>
            <td v-html="fifteenthCourse" ></td>
            <td v-html="sixteenthCourse" ></td>
            <td v-html="seventeenthCourse" ></td>
            <td v-html="eighteenthCourse" ></td>
            <td></td>
          </tr>
          <tr>
            <td>第十~十一节<br>19:20-20:55</td>
            <td v-html="nineteenthCourse" ></td>
            <td v-html="twentiethCourse" ></td>
            <td v-html="twentyfirstCourse" ></td>
            <td v-html="twentytwoCourse" ></td>
            <td></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div id="DivNext">
        <table id="tableDivNext" class="normalTable" border="1">
          <tr  id="weekdayTrs">
            <th>课程编码</th>
            <th>课程名称</th>
            <th>课程序号</th>
            <th>教师</th>
          </tr>
          <tr  v-for="course2 in courses2" id="courseTrs">
            <td>{{ course2.courseSerial }} </td>
            <td>{{ course2.courseName }}</td>
            <td>{{ course2.courseSerialNumber }}</td>
            <td>{{ course2.courseTeacher }}</td>
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
        name: 'myLessonContent',
        data () {
            return {
              modal1:false,//模态对话框1隐藏
              modal2:false,//模态对话框2隐藏
              okValue:0,//值为0无法执行，为1可以执行
              messageStr:'',//模态对话框文字信息
              studentPageUrl:'#login/main/studentHome',//学生首页
              yearSelect:"选择学期",//选择学期下拉框默认值
              weekSelect:'选择周数',//选择周数下拉框默认值
              years:[],
              weeks: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周',
                '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周'
              ],
              firstCourse: '',
              secondCourse: '',
              thirdCourse: '',
              fourthCourse: '',
              fifthCourse: '',
              sixthCourse: '',
              seventhCourse: '',
              eightCourse: '',
              ninthCourse: '',
              tenthCourse: '',
              eleventhCourse: '',
              twelfthCourse: '',
              thirteenthCourse: '',
              fourteenthCourse: '',
              fifteenthCourse:'',
              sixteenthCourse:'',
              seventeenthCourse:'',
              eighteenthCourse:'',
              nineteenthCourse:'',
              twentiethCourse:'',
              twentyfirstCourse:'',
              twentytwoCourse:'',
              course1:{},
              courses2:[],
              courseList:[]
            }
        },
      //初始化请求一组默认的学期，周数
      beforeMount:function(){
        this.$http.post('./studentSeeCurriculum', {
          yearSemester: '',
          week: ''
        }, {"Content-Type": "application/json"}).then(function(response) {
          this.courseList = response.body.courseList;
          this.courses2 = response.body.courseDetailList;
          this.generateClass();
        });
        this.$http.post('./getCurrentYearAndSemester',{},{//获取当前学期周数
          "Content-Type":"application/json"
        }).then(function(response){
          this.generateSemester();
          var data = response.body;
          this.weekSelect = data.week;
          this.yearSelect = data.yearAndSemester;
        },function(error){});
      },
      methods:
      {
        ok2 () {//模态对话框点击
          if(this.okValue==0){
            this.modal2 = false;
          }
        },
        cancel2(){//模态对话框点击去取消
          this.modal2=false;
        },
        searchClick:function(){
          if(this.weekSelect =='10'||this.weekSelect =='20')
          {
            this.courseList.splice(0,this.courseList.length);
            this.courses2.splice(0,this.courses2.length);
            this.firstCourse='';
            this.secondCourse= '';
            this.thirdCourse= '';
            this.fourthCourse= '';
            this.fifthCourse= '';
            this.sixthCourse= '';
            this.seventhCourse= '';
            this.eightCourse='';
            this.ninthCourse= '';
            this.tenthCourse= '';
            this.eleventhCourse= '';
            this.twelfthCourse= '';
            this.thirteenthCourse= '';
            this.fourteenthCourse= '';
            this.fifteenthCourse='';
            this.sixteenthCourse='';
            this.seventeenthCourse='';
            this.eighteenthCourse='';
            this.nineteenthCourse='';
            this.twentiethCourse='';
            this.twentyfirstCourse='';
            this.twentytwoCourse='';
            this.$Message.success("第十周和第二十周没有课程！");
            return;
          }
          if(this.yearSelect=="选择学期"){
            this.modal2=true;
            this.messageStr="未选择学期！";
            this.okValue=0;
          }else if(this.weekSelect=='选择周数'){
            this.modal2=true;
            this.messageStr="未选择周数！";
            this.okValue=0;
          }else{
            this.$http.post('./studentSeeCurriculum', {
              yearSemester: this.yearSelect,
              week: this.weekSelect
            }, {"Content-Type": "application/json"}).then(function (response) {
              this.$Message.success("查询成功!")
              this.courseList = response.body.courseList;
              this.courses2 = response.body.courseDetailList;
              this.firstCourse='';
              this.secondCourse= '';
              this.thirdCourse= '';
              this.fourthCourse= '';
              this.fifthCourse= '';
              this.sixthCourse= '';
              this.seventhCourse= '';
              this.eightCourse='';
              this.ninthCourse= '';
              this.tenthCourse= '';
              this.eleventhCourse= '';
              this.twelfthCourse= '';
              this.thirteenthCourse= '';
              this.fourteenthCourse= '';
              this.fifteenthCourse='';
              this.sixteenthCourse='';
              this.seventeenthCourse='';
              this.eighteenthCourse='';
              this.nineteenthCourse='';
              this.twentiethCourse='';
              this.twentyfirstCourse='';
              this.twentytwoCourse='';
              this.generateClass();
              if(this.courseList.length==0){
                this.modal2=true;
                this.messageStr="无对应课表数据！";
                this.okValue=0;
              }
            });
          }
        },
        generateSemester:function () {
          var nDate = new Date();
          var nYear = parseInt(nDate.getFullYear())+1;
          var stl="";
          for(var i=1;i<=4;i++)
          {
            stl = nYear-1+'-'+nYear+'.'+'2';
            this.years.push(stl);
            stl = nYear-1+'-'+nYear+'.'+'1';
            this.years.push(stl);
            nYear--;
          }
        },
        generateClass:function () {
          for(var i=0;i <this.courseList.length;i++)
          {
            var Course = this.courseList[i];
            switch (Course.courseLinkId)
            {
              case "1-1":
                if(this.firstCourse != ""&& Course.weeks != this.firstCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.firstCourse.split("<br>")[0])
                  {
                    this.firstCourse = this.firstCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.firstCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.firstCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.firstCourse = this.firstCourse+'<br>'+'大课';
                }
                break;
              case "1-2":
                if(this.secondCourse != ""&& Course.weeks != this.secondCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.secondCourse.split("<br>")[0])
                  {
                    this.secondCourse = this.secondCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.secondCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.secondCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.secondCourse = this.secondCourse+'<br>'+'大课';
                }
                break;
              case "1-3":
                if(this.thirdCourse != ""&& Course.weeks != this.thirdCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.thirdCourse.split("<br>")[0])
                  {
                    this.thirdCourse = this.thirdCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.thirdCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.thirdCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.thirdCourse = this.thirdCourse+'<br>'+'大课';
                }
                break;
              case "1-4":
                if(this.fourthCourse != ""&& Course.weeks != this.fourthCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.fourthCourse.split("<br>")[0])
                  {
                    this.fourthCourse = this.fourthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.fourthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.fourthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.fourthCourse = this.fourthCourse+'<br>'+'大课';
                }
                break;
              case "1-5":
                if(this.fifthCourse != ""&& Course.weeks != this.fifthCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.fifthCourse.split("<br>")[0])
                  {
                    this.fifthCourse = this.fifthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.fifthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.fifthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.fifthCourse = this.fifthCourse+'<br>'+'大课';
                }
                break;
              case "2-1":
                if(this.sixthCourse != ""&& Course.weeks != this.sixthCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.sixthCourse.split("<br>")[0])
                  {
                    this.sixthCourse = this.sixthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.sixthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.sixthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.sixthCourse = this.sixthCourse+'<br>'+'大课';
                }
                break;
              case "2-2":
                if(this.seventhCourse != ""&& Course.weeks != this.seventhCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.seventhCourse.split("<br>")[0])
                  {
                    this.seventhCourse = this.seventhCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.seventhCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.seventhCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.seventhCourse = this.seventhCourse+'<br>'+'大课';
                }
                break;
              case "2-3":
                if(this.eightCourse != ""&& Course.weeks != this.eightCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.eightCourse.split("<br>")[0])
                  {
                    this.eightCourse = this.eightCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.eightCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.eightCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.eightCourse = this.eightCourse+'<br>'+'大课';
                }
                break;
              case "2-4":
                if(this.ninthCourse != ""&& Course.weeks != this.ninthCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.ninthCourse.split("<br>")[0])
                  {
                    this.ninthCourse = this.ninthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.ninthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.ninthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.ninthCourse = this.ninthCourse+'<br>'+'大课';
                }
                break;
              case "2-5":
                if(this.tenthCourse != ""&& Course.weeks != this.tenthCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.tenthCourse.split("<br>")[0])
                  {
                    this.tenthCourse = this.tenthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.tenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.tenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.tenthCourse = this.tenthCourse+'<br>'+'大课';
                }
                break;
              case "3-1":
                if(this.eleventhCourse != ""&& Course.weeks != this.eleventhCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.eleventhCourse.split("<br>")[0])
                  {
                    this.eleventhCourse = this.eleventhCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.eleventhCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.eleventhCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.eleventhCourse = this.eleventhCourse+'<br>'+'大课';
                }
                break;
              case "3-2":
                if(this.twelfthCourse != ""&& Course.weeks != this.twelfthCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.twelfthCourse.split("<br>")[0])
                  {
                    this.twelfthCourse = this.twelfthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.twelfthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.twelfthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.twelfthCourse = this.twelfthCourse+'<br>'+'大课';
                }
                break;
              case "3-3":
                if(this.thirteenthCourse != ""&& Course.weeks != this.thirteenthCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.thirteenthCourse.split("<br>")[0])
                  {
                    this.thirteenthCourse = this.thirteenthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.thirteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.thirteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.thirteenthCourse = this.thirteenthCourse+'<br>'+'大课';
                }
                break;
              case "3-4":
                if(this.fourteenthCourse != ""&& Course.weeks != this.fourteenthCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.fourteenthCourse.split("<br>")[0])
                  {
                    this.fourteenthCourse = this.fourteenthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.fourteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.fourteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.fourteenthCourse = this.fourteenthCourse+'<br>'+'大课';
                }
                break;
              case "4-1":
                if(this.fifteenthCourse != ""&& Course.weeks != this.fifteenthCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.fifteenthCourse.split("<br>")[0])
                  {
                    this.fifteenthCourse = this.fifteenthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.fifteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.fifteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.fifteenthCourse = this.fifteenthCourse+'<br>'+'大课';
                }
                break;
              case "4-2":
                if(this.sixteenthCourse != ""&& Course.weeks != this.sixteenthCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.sixteenthCourse.split("<br>")[0])
                  {
                    this.sixteenthCourse = this.sixteenthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.sixteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.sixteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.sixteenthCourse = this.sixteenthCourse+'<br>'+'大课';
                }
                break;
              case "4-3":
                if(this.seventeenthCourse != ""&& Course.weeks != this.seventeenthCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.seventeenthCourse.split("<br>")[0])
                  {
                    this.seventeenthCourse = this.seventeenthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.seventeenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.seventeenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.seventeenthCourse = this.seventeenthCourse+'<br>'+'大课';
                }
                break;
              case "4-4":
                if(this.eighteenthCourse != ""&& Course.weeks != this.eighteenthCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.eighteenthCourse.split("<br>")[0])
                  {
                    this.eighteenthCourse = this.eighteenthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.eighteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.eighteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.eighteenthCourse = this.eighteenthCourse+'<br>'+'大课';
                }
                break;
              case "5-1":
                if(this.nineteenthCourse != ""&& Course.weeks != this.nineteenthCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.nineteenthCourse.split("<br>")[0])
                  {
                    this.nineteenthCourse = this.nineteenthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.nineteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.nineteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.nineteenthCourse = this.nineteenthCourse+'<br>'+'大课';
                }
                break;
              case "5-2":
                if(this.twentiethCourse != ""&& Course.weeks != this.twentiethCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.twentyfirstCourse.split("<br>")[0])
                  {
                    this.twentyfirstCourse = this.twentyfirstCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.twentyfirstCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.twentiethCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.twentiethCourse = this.twentiethCourse+'<br>'+'大课';
                }
                break;
              case "5-3":
                if(this.twentyfirstCourse != ""&& Course.weeks != this.twentyfirstCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.twentyfirstCourse.split("<br>")[0])
                  {
                    this.twentyfirstCourse = twentyfirstCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.twentyfirstCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.twentyfirstCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.twentyfirstCourse = this.twentyfirstCourse+'<br>'+'大课';
                }
                break;
              case "5-4":
                if(this.twentytwoCourse != ""&& Course.weeks != this.twentytwoCourse.split("<br>")[2].split(",")[0])
                {
                  if(Course.courseName != this.twentytwoCourse.split("<br>")[0])
                  {
                    this.twentytwoCourse = this.twentytwoCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.twentytwoCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.twentytwoCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.twentytwoCourse = this.twentytwoCourse+'<br>'+'大课';
                }
                break;
              default:
                break;
            }
          }
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
      margin-left:1rem;
    }
    #myLessonContent{
      height:2.2rem;
    }
    .searchButton{
      float:right;
      margin-right:65rem;
      margin-top:0.5rem;
      width:5.6rem;
      outline: none;
    }
    #checkCourse_tableDiv{
      padding:0.5rem 5rem;
      background-color:#f3f3f3;
    }
    #tableDiv{
      position: relative;
      width: 100%;
      border: 0 solid #d4d4d9;
      border-collapse: collapse;
      table-layout: fixed;
      text-align: center;
    }
    #DivNext{
      padding:0rem 5rem 4rem 5rem;
      background-color:#f3f3f3;
    }
    #tableDivNext{
      position: relative;
      width: 100%;
      border: 0 solid #d4d4d9;
      border-collapse: collapse;
      table-layout: fixed;
      text-align: center;
    }

</style>
