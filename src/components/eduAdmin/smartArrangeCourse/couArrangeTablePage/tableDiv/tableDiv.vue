<template>
    <div id="couArrangeTable_tableDiv">
      <div>
        <button class="amButtom" @click="DivCtl('five')"><img id="fiveArrow" class="iconImg" :src="arrowright"><span class="subtitle">五年制</span></button>
        <div id="fiveDiv">
        <div v-for="(item,index) in classList" v-if="item.yearType=='5'">
          <div v-if="item.yearType=='5'" :id="'5Div' + index" class="gradePlanDiv">
            <span><img :id="'Arrow' + index" class="gradePlanImg" @click="tableSlideToggle(index)" :src="arrowright"></span>
            <span class="gradePlanTitle1">{{item.className}}</span>
            <span class="gradePlanTitle2">班主任：{{item.classHeadmaster}}</span>
            <span class="gradePlanTitle3">教室：{{item.classroom}}</span>
            <span><button class="gradeButton" @click="save(index)" :id="'save'+index" style="display: none">保存</button></span>
            <span><button class="gradeButton" @click="reset(index)" :id="'reset'+index" style="display: none">重置</button></span>
          </div>
          <div v-if="item.yearType=='5'" :id="'Table'+index" style="display: none">
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
                <td id="1-1@firstCourse@5" v-html="courseList[index].firstCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                <td id="1-2@secondCourse@5" v-html="courseList[index].secondCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                <td id="1-3@thirdCourse@5" v-html="courseList[index].thirdCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                <td id="1-4@fourthCourse@5" v-html="courseList[index].fourthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                <td id="1-5@fifthCourse@5" v-html="courseList[index].fifthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
              </tr>
              <tr>
                <td>第三~四节<br>10:20-11:50</td>
                <td id="2-1@sixthCourse@5" v-html="courseList[index].sixthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                <td id="2-2@seventhCourse@5" v-html="courseList[index].seventhCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                <td id="2-3@eightCourse@5" v-html="courseList[index].eightCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                <td id="2-4@ninthCourse@5" v-html="courseList[index].ninthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                <td id="2-5@tenthCourse@5" v-html="courseList[index].tenthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
              </tr>
              <tr>
                <td>第五~六节<br>14:30-16:00</td>
                <td id="3-1@eleventhCourse@5" v-html="courseList[index].eleventhCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                <td id="3-2@twelfthCourse@5" v-html="courseList[index].twelfthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                <td id="3-3@thirteenthCourse@5" v-html="courseList[index].thirteenthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                <td id="3-4@fourteenthCourse@5" v-html="courseList[index].fourteenthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                <td v-html="">安全教育</td>
              </tr>
              <tr>
                <td>第八~九节<br>17:30-19:05</td>
                <td id="4-1@fifteenthCourse@5" v-html="courseList[index].fifteenthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                <td id="4-2@sixteenthCourse@5" v-html="courseList[index].sixteenthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                <td id="4-3@seventeenthCourse@5" v-html="courseList[index].seventeenthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                <td id="4-4@eighteenthCourse@5" v-html="courseList[index].eighteenthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                <td></td>
              </tr>
              <tr>
                <td>第十~十一节<br>19:20-20:55</td>
                <td id="5-1@nineteenthCourse@5" v-html="courseList[index].nineteenthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                <td id="5-2@twentiethCourse@5" v-html="courseList[index].twentiethCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                <td id="5-3@twentyfirstCourse@5" v-html="courseList[index].twentyfirstCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                <td id="5-4@twentytwoCourse@5" v-html="courseList[index].twentytwoCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
      <div>
        <button class="amButtom" @click="DivCtl('three')"><img id="threeArrow" class="iconImg" :src="arrowright"><span class="subtitle">三年制</span></button>
        <div id="threeDiv">
          <div v-for="(item,index) in classList" v-if="item.yearType=='3'">
            <div v-if="item.yearType=='3'" :id="'3Div' + index" class="gradePlanDiv">
              <span><img :id="'Arrow' + index" class="gradePlanImg" @click="tableSlideToggle(index)" :src="arrowright"></span>
              <span class="gradePlanTitle1">{{item.className}}</span>
              <span class="gradePlanTitle2">班主任：{{item.classHeadmaster}}</span>
              <span class="gradePlanTitle3">教室：{{item.classroom}}</span>
              <span><button class="gradeButton" @click="save(index)" :id="'save'+index" style="display: none">保存</button></span>
              <span><button class="gradeButton" @click="reset(index)" :id="'reset'+index" style="display: none">重置</button></span>
            </div>
            <div v-if="item.yearType=='3'" :id="'Table'+index" style="display: none">
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
                  <td id="1-1@firstCourse@3" v-html="courseList[index].firstCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                  <td id="1-2@secondCourse@3" v-html="courseList[index].secondCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                  <td id="1-3@thirdCourse@3" v-html="courseList[index].thirdCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                  <td id="1-4@fourthCourse@3" v-html="courseList[index].fourthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                  <td id="1-5@fifthCourse@3" v-html="courseList[index].fifthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                </tr>
                <tr>
                  <td>第三~四节<br>10:20-11:50</td>
                  <td id="2-1@sixthCourse@3" v-html="courseList[index].sixthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                  <td id="2-2@seventhCourse@3" v-html="courseList[index].seventhCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                  <td id="2-3@eightCourse@3" v-html="courseList[index].eightCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                  <td id="2-4@ninthCourse@3" v-html="courseList[index].ninthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                  <td id="2-5@tenthCourse@3" v-html="courseList[index].tenthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                </tr>
                <tr>
                  <td>第五~六节<br>14:30-16:00</td>
                  <td id="3-1@eleventhCourse@3" v-html="courseList[index].eleventhCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                  <td id="3-2@twelfthCourse@3" v-html="courseList[index].twelfthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                  <td id="3-3@thirteenthCourse@3" v-html="courseList[index].thirteenthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                  <td id="3-4@fourteenthCourse@3" v-html="courseList[index].fourteenthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                  <td v-html="">安全教育</td>
                </tr>
                <tr>
                  <td>第八~九节<br>17:30-19:05</td>
                  <td id="4-1@fifteenthCourse@3" v-html="courseList[index].fifteenthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                  <td id="4-2@sixteenthCourse@3" v-html="courseList[index].sixteenthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                  <td id="4-3@seventeenthCourse@3" v-html="courseList[index].seventeenthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                  <td id="4-4@eighteenthCourse@3" v-html="courseList[index].eighteenthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                  <td></td>
                </tr>
                <tr>
                  <td>第十~十一节<br>19:20-20:55</td>
                  <td id="5-1@nineteenthCourse@3" v-html="courseList[index].nineteenthCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                  <td id="5-2@twentiethCourse@3" v-html="courseList[index].twentiethCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                  <td id="5-3@twentyfirstCourse@3" v-html="courseList[index].twentyfirstCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                  <td id="5-4@twentytwoCourse@3" v-html="courseList[index].twentytwoCourse" draggable="true" @drop="drop($event,index)" @dragover="allowdrop($event)" @dragstart="drag($event,index)"></td>
                  <td></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
        <Modal
            v-model="modal1"
            width="400"
            :mask-closable="false"
            id="modalBody"
            :styles="{top:'10rem'}">
            <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
            <div style="font-size: 1.1rem;text-align: center;">
                <p>确定重置已做的调整吗？</p>
            </div>
            <div slot="footer" style="text-align: center">
              <button id="modalBtn" @click="resetOK()">确定</button>
              <button id="modalBtn" @click="modal1 = false">取消</button>
            </div>
        </Modal>
      <Modal
        v-model="modal2"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
        <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
        <div style="font-size: 1.1rem;text-align: center;">
          <p>确定保存已做的调整吗？</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="saveOK()">确定</button>
          <button id="modalBtn" @click="modal2 = false">取消</button>
        </div>
      </Modal>
    </div>

</template>

<script>
  import arrowright from "./images/arrowright.png"
  import arrowdown from "./images/arrowdown.png"
    export default {
        name: 'couArrangeTable_tableDiv',
        data () {
            return {
              resetIndex:'',
              saveIndex:'',
              dragIndex:'',
              srcev:'',
              arrowright:arrowright,
              arrowdown:arrowdown,
              modal1: false,
              modal2: false,
              classList:[
//                 {classId:'8222',yearType:'5',className:'高2015级4班',classHeadmaster:'高老师',classroom:'1-205'},
//                {classId:'8222',yearType:'3',className:'高2015',classHeadmaster:'高老师',classroom:'1-205'},
//                {classId:'8222',yearType:'3',className:'高2015',classHeadmaster:'高老师',classroom:'1-205'},
//                {classId:'8222',yearType:'5',className:'高2015',classHeadmaster:'高老师',classroom:'1-205'},
//                {classId:'8222',yearType:'5',className:'高2015',classHeadmaster:'高老师',classroom:'1-205'},
//                {classId:'8222',yearType:'5',className:'高2015',classHeadmaster:'高老师',classroom:'1-205'},
//                {classId:'8222',yearType:'5',className:'高2015',classHeadmaster:'高老师',classroom:'1-205'}
              ],
              courseList:[
                  { firstCourse: '', secondCourse: '', thirdCourse: '', fourthCourse: '', fifthCourse: '', sixthCourse: '', seventhCourse: '',
                eightCourse: '', ninthCourse: '', tenthCourse: '', eleventhCourse: '', twelfthCourse: '', thirteenthCourse: '', fourteenthCourse: '',
                fifteenthCourse:'', sixteenthCourse:'', seventeenthCourse:'', eighteenthCourse:'', nineteenthCourse:'', twentiethCourse:'',
                twentyfirstCourse:'', twentytwoCourse:''},
                { firstCourse: '', secondCourse: '', thirdCourse: '', fourthCourse: '', fifthCourse: '', sixthCourse: '', seventhCourse: '',
                  eightCourse: '', ninthCourse: '', tenthCourse: '', eleventhCourse: '', twelfthCourse: '', thirteenthCourse: '', fourteenthCourse: '',
                  fifteenthCourse:'', sixteenthCourse:'', seventeenthCourse:'', eighteenthCourse:'', nineteenthCourse:'', twentiethCourse:'',
                  twentyfirstCourse:'', twentytwoCourse:''}
                ],//存放处理后的课程
              classcourseList:[
//                  {courses:[
//                    {classroomID: "2-202", courseId: "02017-201810121.2-202", courseLinkId: "5-2", courseName: "哲学与人生", isBigclass: 1, teacher: "罗晋", weeks: "1-9"},
//                    {classroomID: "2-202", courseId: "02017-201810121.2-202", courseLinkId: "1-5", courseName: "哲学与人生", isBigclass: 1, teacher: "罗晋", weeks: "1-9"},
//                    {classroomID: "2-202", courseId: "02017-201810121.2-202", courseLinkId: "5-3", courseName: "营养与健康", isBigclass: 1, teacher: "东坡", weeks: "11-19"}
//                ]}
                ],//存放原始课程以供还原和保存
              oindex:'',
              changeCourseList: []
        }
        },
        beforeMount: function() {
            this.$http.post('./autoArrangeSeeCurriculum',{},{
                "Content-Type":"application/json"
            }).then(function(response){
                this.classList = response.body;
                for(var i=0;i<this.classList.length;i++)
                {
                    this.courseList.push({ firstCourse: '', secondCourse: '', thirdCourse: '', fourthCourse: '', fifthCourse: '', sixthCourse: '', seventhCourse: '',
                      eightCourse: '', ninthCourse: '', tenthCourse: '', eleventhCourse: '', twelfthCourse: '', thirteenthCourse: '', fourteenthCourse: '',
                      fifteenthCourse:'', sixteenthCourse:'', seventeenthCourse:'', eighteenthCourse:'', nineteenthCourse:'', twentiethCourse:'',
                      twentyfirstCourse:'', twentytwoCourse:''});
                    this.classcourseList.push({courses:[]});
                }
            },function(error){
                this.$Message.error("连接失败，请重试！");
            });
        },
        methods:
          {
            DivCtl:function (msg) {//年级div折叠
              var div = document.getElementById(msg+'Div');
              var img = document.getElementById(msg+'Arrow');
              if(div.style.display == "none")
              {
                img.src = this.arrowdown;
                div.style.display = "inline";
              }else{
                img.src = this.arrowright;
                div.style.display = "none";
              }
            },
            tableSlideToggle:function (index) {//课表折叠
              this.oindex = index;
              this.generateClass();
              var table = document.getElementById('Table'+index);
              var tables = table.getElementsByTagName("table");
              var img = document.getElementById('Arrow'+index);
              if(table.style.display == "none")
              {
                for(var i = 1;i<=5;i++)
                {
                  for(var j=1;j<=5;j++)
                  {
                    if(tables[0].rows[i].cells[j].style.backgroundColor !="")
                    {
                      img.src = this.arrowdown;
                      table.style.display = "inline";
                      return;
                    }
                  }
                }
                this.$Loading.start();
                this.$http.post('./getNextSemesterClassCourse',this.classList[index].classId,{
                }).then(function(response){
                  //this.courseList[index].courses = response.body;
                  this.classcourseList[index].courses = response.body;
                  this.oindex = index;
                  this.generateClass();
                  this.$Loading.finish();
                },function(error){
                  this.$Loading.error();
                  this.$Message.error("网络错误,请稍后重试！");
                });
                img.src = this.arrowdown;
                table.style.display = "inline";
              }else{
                img.src = this.arrowright;
                table.style.display = "none";
              }
            },
            drop:function (event,index) {//课程单元格拖动结束
              event.preventDefault();
              if(this.dragIndex != index)
              {
                this.$Message.warning("不同班级之间不能调整！");
                return;
              }
              if(event.target.innerHTML == event.dataTransfer.getData("text/html"))
              {
                this.$Message.warning("相同的课程无需调整！");
                return;
              }
              if(this.srcev.target.innerHTML.split("<br>").length % 4 == 0)
              {
                  if(event.target.id.split("-")[0] == '2'||event.target.id.split("-")[0] == '4'||event.target.id.split("-")[0] == '5')
                  {
                      this.$Message.error("大课只能调整到一~二或五~六节！");
                      return;
                  }
              }else if(event.target.innerHTML.split("<br>").length %4 ==0)
              {
                if(this.srcev.target.id.split("-")[0] == '2'||this.srcev.target.id.split("-")[0] == '4'||this.srcev.target.id.split("-")[0] == '5')
                {
                  this.$Message.error("大课只能被调整到一~二或五~六节！");
                  return;
                }
              }
              if(event.target.id != this.srcev.target.id)
              {
                var idn1 = this.srcev.target.id.split("@")[1];
                var idn2 = event.target.id.split("@")[1];
                this.changeLinkId(index,this.srcev.target.id.split("@")[0],event.target.id.split("@")[0]);
                this.courseList[index][idn1] = event.target.innerHTML;
                this.srcev.target.innerHTML = event.target.innerHTML;
                event.target.innerHTML = event.dataTransfer.getData("text/html");
                this.courseList[index][idn2] = event.target.innerHTML;
                event.target.style.backgroundColor = "#1fa573";
                event.target.style.color = "white";
                this.srcev.target.style.backgroundColor = "#1fa573";
                this.srcev.target.style.color = "white";
                var buttonr = document.getElementById('reset'+index);
                var buttons = document.getElementById('save'+index);
                buttonr.style.display = "inline";
                buttons.style.display = "inline";
              }
            },
            allowdrop:function (event) {//拖动中
                event.preventDefault();
            },
            drag:function (event,index) {//拖动开始
              this.dragIndex = index;
              this.srcev = event;
              event.dataTransfer.setData("text/html", event.target.innerHTML);
            },
            reset:function (index) {
              this.resetIndex = index;
              this.modal1 = true;
            },
            resetOK:function () {//重置拖动结果
              var div = document.getElementById('Table'+this.resetIndex);
              var table = div.getElementsByTagName("table");
              this.$http.post('./getNextSemesterClassCourse',this.classList[this.resetIndex].classId,{
              }).then(function(response){
                this.classcourseList[this.resetIndex].courses.splice(0,this.classcourseList[this.resetIndex].courses.length);
                for(var i = 1;i<=5;i++)
                {
                  for(var j=1;j<=5;j++)
                  {
                    if(table[0].rows[i].cells[j].style.backgroundColor !="")
                    {
                      //table[0].rows[i].cells[j].innerHTML = "";
                      table[0].rows[i].cells[j].style.backgroundColor = "";
                      table[0].rows[i].cells[j].style.color = "black";
                    }
                  }
                }
                this.classcourseList[this.resetIndex].courses = response.body;
                this.oindex = this.resetIndex;
                this.generateClass();
                this.modal1 = false;
                var buttonr = document.getElementById('reset'+this.resetIndex);
                var buttons = document.getElementById('save'+this.resetIndex);
                buttonr.style.display = "none";
                buttons.style.display = "none";
                this.$Message.success("已成功重置！");
              },function(error){
                this.$Message.error("网络错误,重置失败！");
              });
            },
            save:function (index) {
              this.saveIndex = index;
              this.modal2 = true;
            },
            saveOK:function () {//保存排课结果
              var div = document.getElementById('Table'+this.saveIndex);
              var table = div.getElementsByTagName("table");
              if(table.length == 1)
              {
                  this.changeCourseList.splice(0,this.changeCourseList.length);
              }else
              {
                this.$Message.error("发生未知错误，请刷新重试！");
                return;
              }
              for(var i = 1;i<=5;i++)
              {
                for(var j=1;j<=5;j++)
                {
                  if(table[0].rows[i].cells[j].style.backgroundColor !="") {
                    for(var k=0;k<this.classcourseList[this.saveIndex].courses.length;k++)
                    {
                        if(this.classcourseList[this.saveIndex].courses[k].courseLinkId == table[0].rows[i].cells[j].id.split("@")[0])
                        {
                          this.changeCourseList.push(this.classcourseList[this.saveIndex].courses[k]);
                        }
                    }
                  }
                }
              }
              this.$http.post('./arrangedCourseAdjust',
                this.changeCourseList
              ,{//调整保存
                "Content-Type":"application/json"
              }).then(function(response){
                  if(response.body.result!=1)
                  {
                    this.modal2 = false;
                    this.$Message.error("保存失败，请重试！");
                    return;
                  }
                for(var i = 1;i<=5;i++)
                {
                  for(var j=1;j<=5;j++)
                  {
                    if(table[0].rows[i].cells[j].style.backgroundColor !="") {
                      table[0].rows[i].cells[j].style.backgroundColor = "";
                      table[0].rows[i].cells[j].style.color = "black";
                    }}}
                var buttonr = document.getElementById('reset'+this.saveIndex);
                var buttons = document.getElementById('save'+this.saveIndex);
                buttonr.style.display = "none";
                buttons.style.display = "none";
                this.modal2 = false;
                this.$Message.success("保存成功！");
              },function(error){
                this.$Message.error("连接失败，请重试！");
              });
            },
            changeLinkId:function (index,id1,id2) {
                for(var i=0;i<this.classcourseList[index].courses.length;i++)
                {
                    if(this.classcourseList[index].courses[i].courseLinkId == id1)
                    {
                      this.classcourseList[index].courses[i].courseLinkId = id2;
                    }else if(this.classcourseList[index].courses[i].courseLinkId == id2)
                    {
                      this.classcourseList[index].courses[i].courseLinkId = id1;
                    }
                }
            },
            classClear:function () {
              this.courseList[this.oindex].firstCourse='';
              this.courseList[this.oindex].secondCourse= '';
              this.courseList[this.oindex].thirdCourse= '';
              this.courseList[this.oindex].fourthCourse= '';
              this.courseList[this.oindex].fifthCourse= '';
              this.courseList[this.oindex].sixthCourse= '';
              this.courseList[this.oindex].seventhCourse= '';
              this.courseList[this.oindex].eightCourse='';
              this.courseList[this.oindex].ninthCourse= '';
              this.courseList[this.oindex].tenthCourse= '';
              this.courseList[this.oindex].eleventhCourse= '';
              this.courseList[this.oindex].twelfthCourse= '';
              this.courseList[this.oindex].thirteenthCourse= '';
              this.courseList[this.oindex].fourteenthCourse= '';
              this.courseList[this.oindex].fifteenthCourse='';
              this.courseList[this.oindex].sixteenthCourse='';
              this.courseList[this.oindex].seventeenthCourse='';
              this.courseList[this.oindex].eighteenthCourse='';
              this.courseList[this.oindex].nineteenthCourse='';
              this.courseList[this.oindex].twentiethCourse='';
              this.courseList[this.oindex].twentyfirstCourse='';
              this.courseList[this.oindex].twentytwoCourse='';
            },
            generateClass:function () {
              this.classClear();
              for(var i=0;i <this.classcourseList[this.oindex].courses.length;i++)
              {
                var Course = this.classcourseList[this.oindex].courses[i];
                switch (Course.courseLinkId)
                {
                  case "1-1":
                    if(this.courseList[this.oindex].firstCourse !=""&&Course.weeks != this.courseList[this.oindex].firstCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].firstCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].firstCourse = this.courseList[this.oindex].firstCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].firstCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].firstCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].firstCourse = this.courseList[this.oindex].firstCourse+'<br>'+'大课';
                    }
                    break;
                  case "1-2":
                    if(this.courseList[this.oindex].secondCourse !=""&&Course.weeks != this.courseList[this.oindex].secondCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].secondCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].secondCourse = this.courseList[this.oindex].secondCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].secondCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].secondCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].secondCourse = this.courseList[this.oindex].secondCourse+'<br>'+'大课';
                    }
                    break;
                  case "1-3":
                    if(this.courseList[this.oindex].thirdCourse !=""&&Course.weeks != this.courseList[this.oindex].thirdCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].thirdCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].thirdCourse = this.courseList[this.oindex].thirdCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].thirdCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].thirdCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].thirdCourse = this.courseList[this.oindex].thirdCourse+'<br>'+'大课';
                    }
                    break;
                  case "1-4":
                    if(this.courseList[this.oindex].fourthCourse !=""&&Course.weeks != this.courseList[this.oindex].fourthCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].fourthCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].fourthCourse = this.courseList[this.oindex].fourthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].fourthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].fourthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].fourthCourse = this.courseList[this.oindex].fourthCourse+'<br>'+'大课';
                    }
                    break;
                  case "1-5":
                    if(this.courseList[this.oindex].fifthCourse !=""&&Course.weeks != this.courseList[this.oindex].fifthCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].fifthCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].fifthCourse = this.courseList[this.oindex].fifthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].fifthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].fifthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].fifthCourse = this.courseList[this.oindex].fifthCourse+'<br>'+'大课';
                    }
                    break;
                  case "2-1":
                    if(this.courseList[this.oindex].sixthCourse !=""&&Course.weeks != this.courseList[this.oindex].sixthCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].sixthCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].sixthCourse = this.courseList[this.oindex].sixthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].sixthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].sixthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].sixthCourse = this.courseList[this.oindex].sixthCourse+'<br>'+'大课';
                    }
                    break;
                  case "2-2":
                    if(this.courseList[this.oindex].seventhCourse !=""&&Course.weeks != this.courseList[this.oindex].seventhCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].seventhCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].seventhCourse = this.courseList[this.oindex].seventhCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].seventhCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].seventhCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].seventhCourse = this.courseList[this.oindex].seventhCourse+'<br>'+'大课';
                    }
                    break;
                  case "2-3":
                    if(this.courseList[this.oindex].eightCourse !=""&&Course.weeks != this.courseList[this.oindex].eightCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].eightCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].eightCourse = this.courseList[this.oindex].eightCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].eightCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].eightCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].eightCourse = this.courseList[this.oindex].eightCourse+'<br>'+'大课';
                    }
                    break;
                  case "2-4":
                    if(this.courseList[this.oindex].ninthCourse !=""&&Course.weeks != this.courseList[this.oindex].ninthCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].ninthCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].ninthCourse = this.courseList[this.oindex].ninthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].ninthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].ninthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].ninthCourse = this.courseList[this.oindex].ninthCourse+'<br>'+'大课';
                    }
                    break;
                  case "2-5":
                    if(this.courseList[this.oindex].tenthCourse !=""&&Course.weeks != this.courseList[this.oindex].tenthCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].tenthCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].tenthCourse = this.courseList[this.oindex].tenthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].tenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].tenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].tenthCourse = this.courseList[this.oindex].tenthCourse+'<br>'+'大课';
                    }
                    break;
                  case "3-1":
                    if(this.courseList[this.oindex].eleventhCourse !=""&&Course.weeks != this.courseList[this.oindex].eleventhCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].eleventhCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].eleventhCourse = this.courseList[this.oindex].eleventhCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].eleventhCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].eleventhCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].eleventhCourse = this.courseList[this.oindex].eleventhCourse+'<br>'+'大课';
                    }
                    break;
                  case "3-2":
                    if(this.courseList[this.oindex].twelfthCourse !=""&&Course.weeks != this.courseList[this.oindex].twelfthCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].twelfthCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].twelfthCourse = this.courseList[this.oindex].twelfthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].twelfthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].twelfthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].twelfthCourse = this.courseList[this.oindex].twelfthCourse+'<br>'+'大课';
                    }
                    break;
                  case "3-3":
                    if(this.courseList[this.oindex].thirteenthCourse !=""&&Course.weeks != this.courseList[this.oindex].thirteenthCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].thirteenthCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].thirteenthCourse = this.courseList[this.oindex].thirteenthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].thirteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].thirteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].thirteenthCourse = this.courseList[this.oindex].thirteenthCourse+'<br>'+'大课';
                    }
                    break;
                  case "3-4":
                    if(this.courseList[this.oindex].fourteenthCourse !=""&&Course.weeks != this.courseList[this.oindex].fourteenthCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].fourteenthCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].fourteenthCourse = this.courseList[this.oindex].fourteenthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].fourteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].fourteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].fourteenthCourse = this.courseList[this.oindex].fourteenthCourse+'<br>'+'大课';
                    }
                    break;
                  case "4-1":
                    if(this.courseList[this.oindex].fifteenthCourse !=""&&Course.weeks != this.courseList[this.oindex].fifteenthCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].fifteenthCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].fifteenthCourse = this.courseList[this.oindex].fifteenthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].fifteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].fifteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].fifteenthCourse = this.courseList[this.oindex].fifteenthCourse+'<br>'+'大课';
                    }
                    break;
                  case "4-2":
                    if(this.courseList[this.oindex].sixteenthCourse !=""&&Course.weeks != this.courseList[this.oindex].sixteenthCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].sixteenthCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].sixteenthCourse = this.courseList[this.oindex].sixteenthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].sixteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].sixteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].sixteenthCourse = this.courseList[this.oindex].sixteenthCourse+'<br>'+'大课';
                    }
                    break;
                  case "4-3":
                    if(this.courseList[this.oindex].seventeenthCourse !=""&&Course.weeks != this.courseList[this.oindex].seventeenthCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].seventeenthCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].seventeenthCourse = this.courseList[this.oindex].seventeenthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].seventeenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].seventeenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].seventeenthCourse = this.courseList[this.oindex].seventeenthCourse+'<br>'+'大课';
                    }
                    break;
                  case "4-4":
                    if(this.courseList[this.oindex].eighteenthCourse !=""&&Course.weeks != this.courseList[this.oindex].eighteenthCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].eighteenthCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].eighteenthCourse = this.courseList[this.oindex].eighteenthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].eighteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].eighteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].eighteenthCourse = this.courseList[this.oindex].eighteenthCourse+'<br>'+'大课';
                    }
                    break;
                  case "5-1":
                    if(this.courseList[this.oindex].nineteenthCourse !=""&&Course.weeks != this.courseList[this.oindex].nineteenthCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].nineteenthCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].nineteenthCourse = this.courseList[this.oindex].nineteenthCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].nineteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].nineteenthCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].nineteenthCourse = this.courseList[this.oindex].nineteenthCourse+'<br>'+'大课';
                    }
                    break;
                  case "5-2":
                    if(this.courseList[this.oindex].twentiethCourse !=""&&Course.weeks != this.courseList[this.oindex].twentiethCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].twentiethCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].twentiethCourse = this.courseList[this.oindex].twentiethCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].twentiethCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].twentiethCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].twentiethCourse = this.courseList[this.oindex].twentiethCourse+'<br>'+'大课';
                    }
                    break;
                  case "5-3":
                    if(this.courseList[this.oindex].twentyfirstCourse !=""&&Course.weeks != this.courseList[this.oindex].twentyfirstCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].twentyfirstCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].twentyfirstCourse = this.courseList[this.oindex].twentyfirstCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].twentyfirstCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].twentyfirstCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].twentyfirstCourse = this.courseList[this.oindex].twentyfirstCourse+'<br>'+'大课';
                    }
                    break;
                  case "5-4":
                    if(this.courseList[this.oindex].twentytwoCourse !=""&&Course.weeks != this.courseList[this.oindex].twentytwoCourse.split("<br>")[2].split(",")[0])
                    {
                      if(Course.courseName != this.courseList[this.oindex].twentytwoCourse.split("<br>")[0])
                      {
                        this.courseList[this.oindex].twentytwoCourse = this.courseList[this.oindex].twentytwoCourse+'<br>'+Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                      }else
                      {
                        this.courseList[this.oindex].twentytwoCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+'1-19,'+Course.classroomID;
                      }
                    }else
                    {
                      this.courseList[this.oindex].twentytwoCourse = Course.courseName+'<br>'+Course.teacher+'<br>'+Course.weeks+','+Course.classroomID;
                    }
                    if(Course.isBigclass == 1)
                    {
                      this.courseList[this.oindex].twentytwoCourse = this.courseList[this.oindex].twentytwoCourse+'<br>'+'大课';
                    }
                    break;
                  default:
                    break;
                }
              }
            }
          },
    }
</script>

<style scoped>
    #couArrangeTable_tableDiv{
        position: relative;
    }
    #exchangeButton{
        /*调课按钮*/
        position: absolute;
        top: -3rem;
        right: 1.5rem;
    }
    #checkCourseTable{
        /*课表*/
        position: relative;
        margin: 0.5rem auto;
        width: 97%;
        border: thin solid #d4d4d9;
        border-collapse: collapse;
        text-align: center;
    }
    #checkCourseTable td{
        border: thin solid #d4d4d9;
        /*max-width: 3rem;*/
    }
    .headTr td{
        /*表头*/
        height: 1rem;
    }
    #checkCourseTable td input{
        /*课表内容*/
        outline: none;
        border: none;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        text-align: center;
    }
    #checkCourseTable td:hover{
        cursor: pointer;
    }
    #headTdTime{
        /*表头"表头"*/
        text-align: right;
        border: none !important;
        width: 8.3rem;
    }
    #headTdCourse{
        /*表头"课程"*/
        border: none !important;
    }
    #headTdClass{
        /*表头"班级"*/
        padding-left: 0.5rem;
        text-align: left;
        border: none !important;
    }
    #headTdTime:after{
        /*表头分割线*/
        content: "";
        position: absolute;
        width: 0.05rem;
        height: 6rem;
        top: 0;
        left: 4rem;
        background-color: #d4d4d9;
        display: block;
        transform: rotate(-47deg);
        -ms-transform: rotate(-47deg);/* IE 9 */
        -webkit-transform: rotate(-47deg);/* Safari and Chrome */
        -o-transform: rotate(-47deg);/* Opera */
        -moz-transform: rotate(-47deg);/* Firefox */
        transform-origin: top;
    }
    #headTdClass:before{
        /*表头分割线*/
        content: "";
        position: absolute;
        width: 0.05rem;
        height: 8.75rem;
        top: 2rem;
        left:0;
        background-color: #d4d4d9;
        display: block;
        transform: rotate(-76deg);
        -ms-transform: rotate(-76deg);/* IE 9 */
        -webkit-transform: rotate(-76deg);/* Safari and Chrome */
        -o-transform: rotate(-76deg);/* Opera */
        -moz-transform: rotate(-76deg);/* Firefox */
        transform-origin: top;
    }
    #courseDetailP{
        padding-left: 1rem;
        margin-bottom: 0;
    }
    #courseDetailTable{
        position: relative;
        margin: 0.5rem auto;
        width: 97%;
        border-collapse: collapse;
        table-layout: fixed;
    }
    @media screen and (max-width:1025px) {
        #headTdTime:after{
            width: 0.1rem;
            height: 6.7rem;
            transform: rotate(-43deg);
            -ms-transform: rotate(-43deg);/* IE 9 */
            -webkit-transform: rotate(-43deg);/* Safari and Chrome */
            -o-transform: rotate(-43deg);/* Opera */
            -moz-transform: rotate(-43deg);/* Firefox */
        }
        #headTdClass:before{
            width: 0.1rem;
            height: 9rem;
            transform: rotate(-71.3deg);
            -ms-transform: rotate(-71.3deg);/* IE 9 */
            -webkit-transform: rotate(-71.3deg);/* Safari and Chrome */
            -o-transform: rotate(-71.3deg);/* Opera */
            -moz-transform: rotate(-71.3deg);/* Firefox */
        }
    }
    @media screen and (min-width:1025px) and (max-width:1173px) {
        #headTdTime:after{
            width: 0.1rem;
        }
        #headTdClass:before{
            width: 0.1rem;
        }
    }
</style>
