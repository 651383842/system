<template>
<div>
	<!-- 导航栏路径跳转返回首页 -->
	<div class="positionBar">
		<span>您的当前位置：</span>
		<span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
		<span> > 教师课表</span>
	</div>
	<div class="tableSelect">
		<select style="width: 11.5rem" v-model="selSemester">
			<option disabled value="">选择学期</option>
			<option v-for="semesterOpt in yearSemester" :value="semesterOpt.semValue" >
				{{semesterOpt.semName}}
				<!-- {{ semesterOpt.year }}第{{ semesterOpt.term }}学期 -->
			</option>
		</select>
		<select v-model="selWeek" style="width: 7rem">
			<option disabled value="">选择周数</option>
			<option v-for="weekOpt in week" :value="weekOpt">
				第{{ weekOpt }}周
			</option>
		</select>
		<button class="am-btn am-btn-success am-radius" @click="checkTableBtn()">查看课表</button>
	</div>

	<div id="timetable">
		<!-- 教师课表 -->
		<div class="timetableBody">
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
		<!-- 所有课程信息列表 -->
		<div class="timetableList">
			<table class="normalTable">
				<thead>
					<tr>
						<th width="">课程编码</th>
						<th width="">课程名称</th>
						<th width="">课程序号</th>
						<th width="">教师</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="data in teacherDetailCurriculum">
						<td v-text="data.courseSerial"></td>
						<td v-text="data.courseName"></td>
						<td v-text="data.courseSerialNumber"></td>
						<td v-text="data.courseTeacher"></td>
					</tr>
				</tbody>
			</table>
		</div>

		<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
			<div style="text-align:center; font-size:1.1rem;">
			    <p>请选择学期和周数！</p>
			</div>
		    <div slot="footer" style="text-align:center;">
		        <Button id="modalBtn" @click="resultOk()">确认</Button>
		    </div>
		</Modal>
    <Modal v-model="modal1" id="modalBody" :styles="{top:'10rem'}">
      <div style="text-align:center; font-size:1.1rem;">
        <p>没有查询到课程！</p>
      </div>
      <div slot="footer" style="text-align:center;">
        <Button id="modalBtn" @click="modal1 = false">确认</Button>
      </div>
    </Modal>
	</div>
</div>
</template>

<script>
export default {
	data () {
		return {
			//year: '',
			// term: '',
			selSemester: '',
      courseList:[
//        {classroomID: "1-106", courseId: "1-106", courseLinkId: "1-1", courseName: "哲学与人生", isBigclass: 1, teacher: "李贵远", weeks: "11-19"},
//        {classroomID: "1-106", courseId: "1-106", courseLinkId: "1-1", courseName: "哲学与人生", isBigclass: 1, teacher: "李贵远", weeks: "11-19"},
//        {classroomID: "1-106", courseId: "1-106", courseLinkId: "3-3", courseName: "哲学与人生", isBigclass: 0, teacher: "李贵远", weeks: "1-9"},
//        {classroomID: "1-106", courseId: "1-106", courseLinkId: "3-3", courseName: "哲学与人生", isBigclass: 0, teacher: "李贵远", weeks: "1-9"},
//        {classroomID: "1-106", courseId: "1-106", courseLinkId: "4-4", courseName: "哲学与人生", isBigclass: 0, teacher: "李贵远", weeks: "1-9"}
        ],
			yearSemester: [],
			selWeek: '',
			week: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"],
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
			classmeeting: '安全教育',
			teacherDetailCurriculum: [
			],
			modalResult: false,
      modal1:false
		}
	},
	beforeMount: function () {
    this.generateClass();
    this.$http.post('./teacherSeeCurriculum',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            this.courseList = response.body.courseList;
            this.teacherDetailCurriculum = response.body.courseDetailList;
            this.generateClass();
        },function(error){
            this.$Message.error("网络错误，请稍后重试！");
        });
    this.$http.post('./getCurrentYearAndSemester',{},{//获取当前学期周数
      "Content-Type":"application/json"
    }).then(function(response){
      this.generateSemester();
      var data = response.body;
      this.selWeek = data.week;
      this.selSemester = data.yearAndSemester;
    },function(error){});
	},
	methods: {
		checkTableBtn: function () {
		    if(this.selWeek =='10'||this.selWeek =='20')
        {
          this.courseList.splice(0,this.courseList.length);
          this.teacherDetailCurriculum.splice(0,this.teacherDetailCurriculum.length);
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
			if (this.selSemester != '' && this.selWeek != '') {
				this.$http.post('./teacherSeeCurriculum',{
		        	"yearSemester": this.selSemester,
		        	"week": this.selWeek
		        },{
		            "Content-Type":"application/json"
		        }).then(function(response){
            this.courseList = response.body.courseList;
            this.teacherDetailCurriculum = response.body.courseDetailList;
            if(this.courseList.length == 0)
            {
                this.modal1 = true;
            }
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
        },function(error){
          this.$Message.error("网络错误，请稍后重试！");
	        	});
			}else {
				this.modalResult = true;
			}
		},
    	resultOk: function () {
    		this.modalResult = false;
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
        this.yearSemester.push({semName:st2,semValue:stl});
        stl = nYear-1+'-'+nYear+'.'+'2';
        st2 = nYear-1+'-'+nYear+'学年（下）';
        this.yearSemester.push({semName:st2,semValue:stl});
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
                  if(this.firstCourse != "" && Course.weeks != this.firstCourse.split("<br>")[1].split(",")[0])
                  {
                     if(Course.courseName != this.firstCourse.split("<br>")[0])
                     {
                       this.firstCourse = this.firstCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                     }else
                     {
                       this.firstCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                     }
                  }else
                  {
                    this.firstCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }
                  if(Course.isBigclass == 1)
                  {
                    this.firstCourse = this.firstCourse+'<br>'+'大课';
                  }
                  break;
              case "1-2":
                if(this.secondCourse != ""&& Course.weeks != this.secondCourse.split("<br>")[1].split(",")[0])
                {
                  if(Course.courseName != this.secondCourse.split("<br>")[0])
                  {
                    this.secondCourse = this.secondCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.secondCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.secondCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.secondCourse = this.secondCourse+'<br>'+'大课';
                }
                break;
              case "1-3":
                if(this.thirdCourse != ""&& Course.weeks != this.thirdCourse.split("<br>")[1].split(",")[0])
                {
                  if(Course.courseName != this.thirdCourse.split("<br>")[0])
                  {
                    this.thirdCourse = this.thirdCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.thirdCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.thirdCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.thirdCourse = this.thirdCourse+'<br>'+'大课';
                }
                break;
              case "1-4":
                if(this.fourthCourse != ""&& Course.weeks != this.fourthCourse.split("<br>")[1].split(",")[0])
                {
                  if(Course.courseName != this.fourthCourse.split("<br>")[0])
                  {
                    this.fourthCourse = this.fourthCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.fourthCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.fourthCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.fourthCourse = this.fourthCourse+'<br>'+'大课';
                }
                break;
              case "1-5":
                if(this.fifthCourse != ""&& Course.weeks != this.fifthCourse.split("<br>")[1].split(",")[0])
                {
                  if(Course.courseName != this.fifthCourse.split("<br>")[0])
                  {
                    this.fifthCourse = this.fifthCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.fifthCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.fifthCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.fifthCourse = this.fifthCourse+'<br>'+'大课';
                }
                break;
              case "2-1":
                if(this.sixthCourse != ""&& Course.weeks != this.sixthCourse.split("<br>")[1].split(",")[0])
                {
                  if(Course.courseName != this.sixthCourse.split("<br>")[0])
                  {
                    this.sixthCourse = this.sixthCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.sixthCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.sixthCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.sixthCourse = this.sixthCourse+'<br>'+'大课';
                }
                break;
              case "2-2":
                if(this.seventhCourse != ""&& Course.weeks != this.seventhCourse.split("<br>")[1].split(",")[0])
                {
                  if(Course.courseName != this.seventhCourse.split("<br>")[0])
                  {
                    this.seventhCourse = this.seventhCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.seventhCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.seventhCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.seventhCourse = this.seventhCourse+'<br>'+'大课';
                }
                break;
              case "2-3":
                if(this.eightCourse != ""&& Course.weeks != this.eightCourse.split("<br>")[1].split(",")[0])
                {
                  if(Course.courseName != this.eightCourse.split("<br>")[0])
                  {
                    this.eightCourse = this.eightCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.eightCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.eightCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.eightCourse = this.eightCourse+'<br>'+'大课';
                }
                break;
              case "2-4":
                if(this.ninthCourse != ""&& Course.weeks != this.ninthCourse.split("<br>")[1].split(",")[0])
                {
                  if(Course.courseName != this.ninthCourse.split("<br>")[0])
                  {
                    this.ninthCourse = this.ninthCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.ninthCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.ninthCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.ninthCourse = this.ninthCourse+'<br>'+'大课';
                }
                break;
              case "2-5":
                if(this.tenthCourse != ""&& Course.weeks != this.tenthCourse.split("<br>")[1].split(",")[0])
                {
                  if(Course.courseName != this.tenthCourse.split("<br>")[0])
                  {
                    this.tenthCourse = this.tenthCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.tenthCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.tenthCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.tenthCourse = this.tenthCourse+'<br>'+'大课';
                }
                break;
              case "3-1":
                if(this.eleventhCourse != ""&& Course.weeks != this.eleventhCourse.split("<br>")[1].split(",")[0])
                {
                  if(Course.courseName != this.eleventhCourse.split("<br>")[0])
                  {
                    this.eleventhCourse = this.eleventhCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.eleventhCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.eleventhCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.eleventhCourse = this.eleventhCourse+'<br>'+'大课';
                }
                break;
              case "3-2":
                if(this.twelfthCourse != ""&& Course.weeks != this.twelfthCourse.split("<br>")[1].split(",")[0])
                {
                  if(Course.courseName != this.twelfthCourse.split("<br>")[0])
                  {
                    this.twelfthCourse = this.twelfthCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.twelfthCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.twelfthCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.twelfthCourse = this.twelfthCourse+'<br>'+'大课';
                }
                break;
              case "3-3":
                if(this.thirteenthCourse != ""&& Course.weeks != this.thirteenthCourse.split("<br>")[1].split(",")[0])
                {
                  if(Course.courseName != this.thirteenthCourse.split("<br>")[0])
                  {
                    this.thirteenthCourse = this.thirteenthCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.thirteenthCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.thirteenthCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.thirteenthCourse = this.thirteenthCourse+'<br>'+'大课';
                }
                break;
              case "3-4":
                if(this.fourteenthCourse != ""&& Course.weeks != this.fourteenthCourse.split("<br>")[1].split(",")[0])
                {
                  if(Course.courseName != this.fourteenthCourse.split("<br>")[0])
                  {
                    this.fourteenthCourse = this.fourteenthCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.fourteenthCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.fourteenthCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.fourteenthCourse = this.fourteenthCourse+'<br>'+'大课';
                }
                break;
              case "4-1":
                if(this.fifteenthCourse != ""&& Course.weeks != this.fifteenthCourse.split("<br>")[1].split(",")[0])
                {
                  if(Course.courseName != this.fifteenthCourse.split("<br>")[0])
                  {
                    this.fifteenthCourse = this.fifteenthCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.fifteenthCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.fifteenthCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.fifteenthCourse = this.fifteenthCourse+'<br>'+'大课';
                }
                break;
              case "4-2":
                if(this.sixteenthCourse != ""&& Course.weeks != this.sixteenthCourse.split("<br>")[1].split(",")[0])
                {
                  if(Course.courseName != this.sixteenthCourse.split("<br>")[0])
                  {
                    this.sixteenthCourse = this.sixteenthCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.sixteenthCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.sixteenthCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.sixteenthCourse = this.sixteenthCourse+'<br>'+'大课';
                }
                break;
              case "4-3":
                if(this.seventeenthCourse != ""&& Course.weeks != this.seventeenthCourse.split("<br>")[1].split(",")[0])
                {
                  if(Course.courseName != this.seventeenthCourse.split("<br>")[0])
                  {
                    this.seventeenthCourse = this.seventeenthCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.seventeenthCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.seventeenthCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.seventeenthCourse = this.seventeenthCourse+'<br>'+'大课';
                }
                break;
              case "4-4":
                if(this.eighteenthCourse != ""&& Course.weeks != this.eighteenthCourse.split("<br>")[1].split(",")[0])
                {
                  if(Course.courseName != this.eighteenthCourse.split("<br>")[0])
                  {
                    this.eighteenthCourse = this.eighteenthCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.eighteenthCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.eighteenthCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.eighteenthCourse = this.eighteenthCourse+'<br>'+'大课';
                }
                break;
              case "5-1":
                if(this.nineteenthCourse != ""&& Course.weeks != this.nineteenthCourse.split("<br>")[1].split(",")[0])
                {
                  if(Course.courseName != this.nineteenthCourse.split("<br>")[0])
                  {
                    this.nineteenthCourse = this.nineteenthCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.nineteenthCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.nineteenthCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.nineteenthCourse = this.nineteenthCourse+'<br>'+'大课';
                }
                break;
              case "5-2":
                if(this.twentiethCourse != "" && Course.weeks != this.twentiethCourse.split("<br>")[1].split(",")[0])
                {
                  if(Course.courseName != this.twentiethCourse.split("<br>")[0])
                  {
                    this.twentiethCourse = this.twentiethCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.twentiethCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.twentiethCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.twentiethCourse = this.twentiethCourse+'<br>'+'大课';
                }
                break;
              case "5-3":
                if(this.twentyfirstCourse != ""&& Course.weeks != this.twentyfirstCourse.split("<br>")[1].split(",")[0])
                {
                  if(Course.courseName != this.twentyfirstCourse.split("<br>")[0])
                  {
                    this.twentyfirstCourse = this.twentyfirstCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.twentyfirstCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.twentyfirstCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                }
                if(Course.isBigclass == 1)
                {
                  this.twentyfirstCourse = this.twentyfirstCourse+'<br>'+'大课';
                }
                break;
              case "5-4":
                if(this.twentytwoCourse != ""&& Course.weeks != this.twentytwoCourse.split("<br>")[1].split(",")[0])
                {
                  if(Course.courseName != this.twentytwoCourse.split("<br>")[0])
                  {
                    this.twentytwoCourse = this.twentytwoCourse+'<br>'+Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
                  }else
                  {
                    this.twentytwoCourse = Course.courseName+'<br>'+'1-19,'+Course.classroomID;
                  }
                }else
                {
                  this.twentytwoCourse = Course.courseName+'<br>'+Course.weeks+','+Course.classroomID;
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
#timetable {
	background-color: #f3f3f3;
	width: 100%;
	text-align: center;
}
.timetableBody,
.timetableList {
	padding: 1rem 5rem;
}
.timetableList {
	padding-bottom: 3.3rem;
}

</style>
