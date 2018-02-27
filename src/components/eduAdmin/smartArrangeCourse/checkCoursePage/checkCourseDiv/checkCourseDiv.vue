<template>
    <div id="checkCourseDiv">
        <div id="operationDiv">
            <div id="selectDiv">
                <select id="termSelect" v-model="termSelect">
                    <option disabled>请选择学期</option>
                    <option v-for="term in terms" :value="term.semValue">{{ term.semName }}</option>
                </select>
              <select v-model="classType" @change="geclassList()">
                <option disabled value="">选择年制</option>
                <option value="5">五年制</option>
                <option value="3">三年制</option>
              </select>
              <select v-model="classSelect">
                <option disabled value="">请选择班级</option>
                <option v-for="term in classListt" :value="term.classId">{{ term.className }}</option>
              </select>
                <button  @click="searchCourseClick()" class="am-btn am-btn-success am-radius">查询</button>
                <button  @click="exportClick()" class="am-btn am-btn-success am-radius">导出</button>
            </div>
        </div>
        <div class="positionBar">
            <span>您的当前位置：</span>
            <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
            <span> > 课表查询</span>
        </div>
        <div id="mainDiv">
            <p>
                <form action="./acdemicCurriculumExcel" method="get">
                <!--使用form表单进行文件下载-->
                    <input type="text" v-model="termSelect" name="yearSemester" style="display: none">
                    <input type="text" v-model="classType" name="schoolYearType" style="display: none">
                    <input type="text" v-model="classSelect" name="classId" style="display: none">
                    <!--通过隐藏的input进行form表单参数传递-->
                    <!--函数方法预处理数据后再触发submit-->
                    <button id="exportButton" style="display: none" type="submit"></button>
                </form>
            </p>
            <!--<tableDiv :queryCourse="queryCourse"></tableDiv>&lt;!&ndash;表格组件，传递表格内容&ndash;&gt;-->
          <div>
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
        </div>
        <Modal
            v-model="modal"
            width="400"
            :mask-closable="false"
            id="modalBody"
            :styles="{top:'10rem'}">
            <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
            <div style="font-size: 1.1rem;text-align: center;">
                <p>{{ errorMessage }}</p>
            </div>
            <div slot="footer" style="text-align: center">
                <button id="modalBtn" @click="modal = false">确定</button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import tableDiv from '../tableDiv/tableDiv.vue'
    export default {
        name: 'checkCourseDiv',
        data () {
            return {
                classType:'',
                termSelect: '请选择学期',
                classSelect: '',
//                选择值绑定
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
//                课表内容
                termExport: "",
                weekExport: "",
                terms:[],
//                学期选择
                modal: false,
//                对话框显隐
                errorMessage: "",
              classList:[
//                  {classHeadmaster: "李贵远", classId: "201451", className: "高2014级1班", classroom: "2-202", yearType: "5"},
//                {classHeadmaster: "李贵远", classId: "201451", className: "高2015级5班", classroom: "2-202", yearType: "5"},
//                {classHeadmaster: "李贵远", classId: "201451", className: "中2014级3班", classroom: "2-202", yearType: "3"},
//                {classHeadmaster: "李贵远", classId: "201451", className: "中2017级5班", classroom: "2-202", yearType: "3"},
              ],
              classListt:[]
//                复用对话框内容
            }
        },
        components: {
            tableDiv
        },
        beforeMount: function() {
          this.$http.post('./getCurrentYearAndSemester',{},{//获取当前学期周数
            "Content-Type":"application/json"
          }).then(function(response){
            this.generateSemester();
            var data = response.body;
            this.termSelect = data.yearAndSemester;
          },function(error){});

          this.$http.post('./autoArrangeSeeCurriculum',{},{
            "Content-Type":"application/json"
          }).then(function(response){
            this.classList = response.body;
          },function(error){
            this.$Message.error("连接失败，请重试！");
          });
        },
        methods: {
          exportClick:function(){//导出
                if(this.classType == ""){
                    this.$Message.error("请选择年制！");
                    return;
                }
                if(this.classSelect == ""){
                  this.$Message.error("请选择班级！");
                  return;
                }
                document.getElementById("exportButton").click();
            }, //导出当前显示的课表
          geclassList:function () {
                this.classSelect = "";
                this.classListt.splice(0,this.classListt.length);
                for(var i=0;i<this.classList.length;i++)
                {
                    if(this.classList[i].yearType == this.classType)
                    {
                      this.classListt.push(this.classList[i]);
                    }
                }
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
      searchCourseClick:function () {
        if(this.classType == ""){
          this.$Message.error("请选择年制！");
          return;
        }
        if(this.classSelect == ""){
          this.$Message.error("请选择班级！");
          return;
        }
        this.$http.post('./acdeminSeeCurriculum', {
          "yearSemester": this.termSelect,
          "schoolYearType": this.classType,
          "classId": this.classSelect
        }, {
          "Content-Type": "application/json"
        }).then(function (response) {
          if(response.body.length>0)
          {
            this.$Message.success('查询成功！');
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
            this.queryCourse = response.body;
            this.generateClass();
          }else {
            this.$Message.warning('查询结果为空！');
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
            return;
          }
//                        显示课表信息
        }, function (error) {
          this.$Message.error('连接失败，请重试！');
        });
      },
          generateClass:function () {
            for(var i=0;i <this.queryCourse.length;i++)
            {
              var Course = this.queryCourse[i];
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
    #checkCourseDiv{
        background-color: #f3f3f3;
    }
    #mainDiv{
        /*页面*/
        /*background-color: white;*/
        margin: 0 5rem;
        min-height: 33rem;
    }
    select{
        margin-right: 1.4rem;
    }
    #operationDiv{
        /*查找区域*/
        background-color: white;
        margin: 0 0 0.6rem;
    }
    #selectDiv{
        /*选择框区域*/
        padding: 0.6rem 5rem;
    }
    #tableTipP{
        /*功能页面标题*/
        color: #C1C1C1;
        position: relative;
        text-align: left;
        z-index: 1;
        padding: 1rem;
        margin: 0;
    }
    #tableInfoP{
        /*表格课表标题*/
        text-align: left;
        position: relative;
        left: 1rem;
    }
    @media screen and (max-width:1025px) {
        html {
            font-size: 56%;
        }
    }
</style>
