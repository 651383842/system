<template>
  <div>
    <div id="noSupervisorDiv" style="display: inline">
      <div id="tchDropdown" style="height: 3rem;margin: 0.6rem 5rem;background-color: white;">
        <select id="teacherSelect" class="selectWM" v-model="noSupervisorinfoKey.teacherId" @change="teacherClick()">
          <option value="" disabled>任课教师</option>
          <option v-for="teacher in teacherList" :value="teacher.teacherId">{{teacher.teacherName}}</option>
        </select>
        <!--任课教师选择下拉列表-->
        <select id="courseSelect" class="selectWM" v-model="noSupervisorinfoKey.courseId" @click="courseClick()">
          <option value="" disabled>选择课程</option>
          <option v-for="course in courseList" :value="course.courseId">{{course.courseName}}</option>
        </select>
        <!--课程选择下拉列表-->
        <span><button id="searchFor" class="am-btn am-btn-success am-radius buttonWM" @click="checkNoSupervisorInfoClick()">查找</button></span>
        <span><button id="goTo" class="am-btn am-btn-success am-radius" @click="goToClick()">查看已设置督导课程</button></span>
        <!--查找，下载按钮-->
      </div>
      <div id="noSupervisorTable" style="padding: 0.6rem 5rem;background-color: #f3f3f3">
        <table id="noSupervisorTableSy" class="normalTable" style="table-layout: fixed;">
          <thead>
          <tr>
            <th width="15%">请选择</th>
            <th width="25%">班级名称</th>
            <th width="20%">课程编号</th>
            <th width="25%">课程名称</th>
            <th width="15%">任课老师</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for=" notSettedSupervisorCourseInfo in notSettedSupervisorCourseInfoList">
            <td @click="setSupervisorClick(notSettedSupervisorCourseInfo.courseId,notSettedSupervisorCourseInfo.courseName,notSettedSupervisorCourseInfo.classId,notSettedSupervisorCourseInfo.teacherId)" class="setSupervisor"><u>设置督导</u></td>
            <td v-text="notSettedSupervisorCourseInfo.className"></td>
            <td v-text="notSettedSupervisorCourseInfo.courseId"></td>
            <td v-text="notSettedSupervisorCourseInfo.courseName"></td>
            <td v-text="notSettedSupervisorCourseInfo.teacherName"></td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--未设置督导的课程的表格-->
    </div>
    <!--未设置督导页面-->
    <div id="supervisorDiv" style="display: none">
      <div id="setSupervisorDropdown">
        <div style="height: 5rem;margin: 0.6rem 5rem;background-color: white;">
          <span><p>课程名称:{{setCourseName}}</p></span>
          <div>
            <span id="setSupSpan">设置督导员:</span>
            <select id="supervisorSelect" class="selectWM" v-model="supervisorinfoKey.supervisorId" @change="supervisorClick()">
              <option value="">选择督导员</option>
              <option v-for="supervisor in supervisorList" :value="supervisor.supervisorId">{{supervisor.supervisorName}}</option>
            </select>
            <!--督导员选择下拉列表-->
            <span><button id="save" class="am-btn am-btn-success am-radius buttonWM" @click="saveSupervisorInfoClick()">保存</button></span>
            <span><button id="cancel" class="am-btn am-btn-success am-radius buttonWM" @click="restoreSupervisorInfoClick()">取消</button></span>
            <!--保存，取消保存督导员设置按钮-->
          </div>
          <div>
            <modal v-model="modalSetBool" width="400" id="modalBody">
              <div style="text-align: center;font-size: 1.1rem;">
                <p v-if="operateMsg=='1'">是否确定保存</p>
                <p v-else-if="operateMsg=='2'">是否确定取消保存</p>
              </div>
              <div slot="footer" style="text-align: center">
                <button v-if="operateMsg=='1'" id="modalBtn" @click="saveOk()">确定</button>
                <button v-if="operateMsg=='2'" id="modalBtn" @click="cancelOk()">确定</button>
                <button id="modalBtn" @click="operateCancel">取消</button>
              </div>
            </modal>
            <!--确认保存、删除操作弹窗-->
            <modal v-model="modalSetResultBool" width="400" id="modalBody">
              <div style="text-align: center;font-size: 1.1rem;">
                <p v-if="operateMsg == '1'">保存失败</p>
                <p v-else>处理出错</p>
              </div>
              <div slot="footer" style="text-align: center">
                <button id="modalBtn" @click="resultOk">确定</button>
              </div>
            </modal>
            <!--操作失败提示弹窗-->
          </div>
        </div>
      </div>
      <!--督导员设置div-->
      <div style="padding: 0.6rem 5rem;background-color: #f3f3f3">
        <div id="supervisorTable" style="background-color: white">
          <span><p>*下面是已分配督导员的课程</p></span>
          <table id="supervisorTableSy" class="operationTable" style="table-layout: fixed;">
            <thead>
            <tr>
              <th width="10%">当前状态</th>
              <th width="10%">督导老师</th>
              <th width="20%">班级名称</th>
              <th width="20%">课程编号</th>
              <th width="20%">课程名称</th>
              <th width="10%">任课老师</th>
              <th width="10%">督导反馈</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for=" settedSupervisorCourseInfo in settedSupervisorCourseInfoList">
              <td v-if="settedSupervisorCourseInfo.status == 1">已读</td>
              <td v-if="settedSupervisorCourseInfo.status == 0"><u>未读</u></td>
              <td v-text="settedSupervisorCourseInfo.supervisorName"></td>
              <td v-text="settedSupervisorCourseInfo.className"></td>
              <td v-text="settedSupervisorCourseInfo.courseId"></td>
              <td v-text="settedSupervisorCourseInfo.courseName"></td>
              <td v-text="settedSupervisorCourseInfo.teacherName"></td>
              <td><button class="am-btn am-btn-success am-radius" @click="checksupervisorBackInfoClick(settedSupervisorCourseInfo.supervisorId,settedSupervisorCourseInfo.classId,settedSupervisorCourseInfo.courseId,settedSupervisorCourseInfo.teacherId)">查看</button></td>
            </tr>
            </tbody>
          </table>
          <!--已分配督导员的课程的表格-->
          <div class="buttonDiv">
            <span><button id="goBack" class="bottomButton am-btn am-btn-success am-radius" @click="supervisorTableGoBackClick()">返回</button></span>
          </div>
          <!--返回未设置督导员页面-->
        </div>
      </div>
    </div>
    <!--已设置督导员页面-->
    <div id="superviseBackTable" style="display: none">
      <div id="superviseBackShow" style="padding: 0.6rem 5rem;background-color: #f3f3f3;">
        <div v-for="(superviseInfo,index) in superviseInfoList">
          <div class="superviseDiv">
            <span><img :id="'arrow'+index" class="superviseImg" @click="tableSlideToggle(index)" :src="arrowright"></span>
            <span class="superviseP" @click="tableSlideToggle(index)">{{superviseInfo.superviseTime}}</span>
            <!--督导时间下拉导航栏，点击后下拉该时间的督导反馈表格-->
            <span><button :id="'submit'+index" v-if="superviseInfo.forwardInfo == ''" class="superviseButton" @click="submitClick(superviseInfo.superviseTime,index)">提交</button></span>
            <!--提交，取消提交教务评价按钮-->
          </div>
          <div :id="'superviseTableDiv' + index" style="display: none">
            <table class="normalTable">
              <tbody>
              <tr>
                <td rowspan=8>评分</td>
                <td>学生出勤情况</td> <td>{{superviseInfo.attendanceInfo}}</td>
              </tr>
              <tr><td>授课内容</td> <td>{{superviseInfo.teachContent}}</td></tr>
              <tr><td>教师素养得分</td> <td>{{superviseInfo.teacherQualityScored}}</td></tr>
              <tr><td>教学目标得分</td> <td>{{superviseInfo.teachGoalsScored}}</td></tr>
              <tr><td>教学内容得分</td> <td>{{superviseInfo.teachContentScored}}</td></tr>
              <tr><td>教学方法得分</td> <td>{{superviseInfo.teachMethodsScored}}</td></tr>
              <tr><td>教学常规得分</td> <td>{{superviseInfo.teachRoutineScored}}</td></tr>
              <tr><td>教学效果得分</td> <td>{{superviseInfo.teachEffectScored}}</td></tr>
              <tr><td>督导员意见</td>
                <td colspan=3>{{superviseInfo.commentsInfo}}</td>
              </tr>
              <tr><td>教务人员意见</td>
                <td colspan=3 v-if="superviseInfo.forwardInfo == ''"><input class="supervisorBackInput" type="text" v-model="superviseBackinfoKey.forwardInfo"></td>
                <td colspan=3 v-else>{{superviseInfo.forwardInfo}}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--督导反馈表格-->
        </div>
        <div class="buttonDiv">
          <span><button class="bottomButton am-btn am-btn-success am-radius" @click="superviseBackTableGoBackClick()">返回</button></span>
        </div>
        <!--返回已设置督导页面按钮-->
      </div>
    </div>
    <!--督导反馈页面-->
    <div>
      <modal v-model="modalSubmitBool" width="400" id="modalBody">
        <div style="text-align: center;font-size: 1.1rem;">
          <p v-if="operateSubmitMsg=='1'">是否确定提交</p>
          <p v-else-if="operateSubmitMsg=='2'">是否确定取消提交</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button v-if="operateSubmitMsg=='1'" id="modalBtn" @click="submitOk()">确定</button>
          <button v-else-if="operateSubmitMsg=='2'" id="modalBtn" @click="cancelSubmitOk()">确定</button>
          <button id="modalBtn" @click="operateSubmitCancel">取消</button>
        </div>
      </modal>
      <!--用户提交、取消提交时，弹窗确认-->
      <modal v-model="modalSubmitResultBool" width="400" id="modalBody">
        <div style="text-align: center;font-size: 1.1rem;">
          <p v-if="operateSubmitMsg == '1'">提交失败</p>
          <p v-else-if="operateSubmitMsg == '3'">您没有输入教务人员意见</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="resultSubmitOk">确定</button>
        </div>
      </modal>
      <!--弹窗提示确认提交结果信息-->
    </div>
  </div>

</template>

<script>
  import arrowright from "./images/arrowright.png"
  import arrowdown from "./images/arrowdown.png"
    export default {
        name: 'noSupervisorTable',
        data () {
            return {
              arrowright:arrowright,
              arrowdown:arrowdown,
              noSupervisorinfoKey:{
                teacherId:'',
                courseId:''
              },
              teacherList:[
//                {teacherName:'何平',teacherId:'111111'},
//                {teacherName:'张继',teacherId:'222222'},
//                {teacherName:'李伟',teacherId:'333333'}
              ],
              courseList:[
//                {courseName:'护理学',courseId:'123456'},
//                {courseName:'西医',courseId:'223456'},
//                {courseName:'临床',courseId:'323456'}
              ],
              supervisorinfoKey:{
                courseId:'',
                supervisorId:'',
                classId:'',
                teacherId:''
              },
              supervisorList:[
//                {supervisorName:'何平',supervisorId:'111111'},
//                {supervisorName:'张继',supervisorId:'222222'},
//                {supervisorName:'李伟',supervisorId:'333333'}
              ],
              modalSetBool: false,
              modalSetResultBool: false,
              operateMsg:'',
              superviseBackinfoKey:{
                superviseTime:'',
                supervisorId:'',
                classId:'',
                courseId:'',
                teacherId:'',
                forwardInfo:''
              },
              setMsg:'1',
              setCourseName:'请选择',
              times:[
                {week:'1',weekDay:'2',lessonNum:'3'},
                {week:'4',weekDay:'5',lessonNum:'6'},
                {week:'7',weekDay:'8',lessonNum:'9'}
              ],
              notSettedSupervisorCourseInfoList:[
//                  {className:'对口高职 2015 护理1班',classId:'11111',courseName:'护理管理学',courseId:'10300',teacherName:'季军',teacherId:'1111'},
//                  {className:'对口高职 2015 护理2班',classId:'22222',courseName:'护理管理学',courseId:'10300',teacherName:'季军',teacherId:'2222'}
                ],
              settedSupervisorCourseInfoList:[
//                  {status:'1',supervisorName:'李晓',supervisorId:'12345',className:'普通高中 2015 护理1班',classId:'33333',courseName:'护理管理学',courseId:'10301',teacherName:'何平',teacherId:'1111'},
//                  {status:'0',supervisorName:'张玲',supervisorId:'22345',className:'普通高中 2015 护理2班',classId:'44444',courseName:'护理管理学',courseId:'10301',teacherName:'何平',teacherId:'2222'}
              ],
              superviseInfoList:[
//                {
//                  superviseTime:'2016.01.01',
//                  attendanceInfo:'47人，应到47人',
//                  teachContent:'授课内容',
//                  teacherQualityScored:'88',
//                  teachGoalsScored:'88',
//                  teachContentScored:'88',
//                  teachMethodsScored:'88',
//                  teachRoutineScored:'88',
//                  teachEffectScored:'88',
//                  commentsInfo:'督导意见',
//                  forwardInfo:''
//                },
//                {
//                  superviseTime:'2017.01.01',
//                  attendanceInfo:'47人，应到47人',
//                  teachContent:'授课内容',
//                  teacherQualityScored:'88',
//                  teachGoalsScored:'88',
//                  teachContentScored:'88',
//                  teachMethodsScored:'88',
//                  teachRoutineScored:'88',
//                  teachEffectScored:'88',
//                  commentsInfo:'督导意见',
//                  forwardInfo:''
//                }
              ],
              modalSubmitBool:false,
              modalSubmitResultBool:false,
              operateSubmitMsg:'',
              submitIndex:''
            }
        },
      beforeMount:function() {
        this.$http.post('./teachingSupervision/selectNotSupervisorList',{},{
          "Content-Type":"application/json"
        }).then(function (response) {
          this.courseList = response.body.courseList;
          this.teacherList = response.body.teacherList;
          this.notSettedSupervisorCourseInfoList = response.body.notSettedSupervisorCourseInfoList;
        },function(error){
        });
      },
//      初始化页面时，获取课程列表，教师列表，未设置督导课程的课程信息列表
      methods:{
        checkNoSupervisorInfoClick: function(){
          this.$http.post('./teachingSupervision/checkNoSupervisorInfoJson',{
            "teacherId":this.noSupervisorinfoKey.teacherId,
            "courseId":this.noSupervisorinfoKey.courseId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.notSettedSupervisorCourseInfoList = response.body.notSettedSupervisorCourseInfoList;
          },function(error){
            console.log("获取error");
          });
        },
//        查询未设置督导的课程
        teacherClick:function(){
          this.$http.post('./teachingSupervision/noSupervisorTeacherClickJson',{
            "teacherId":this.noSupervisorinfoKey.teacherId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            this.courseList = response.body.courseList;
            if(this.courseList.length == 0)
            {
              this.$Message.warning("该老师没有对应的课程！");
            }
          },function(error){
          });
          this.noSupervisorinfoKey.courseId = "";
        },
//        点击教师select框时，获取对应教师的课程列表
        setSupervisorClick:function(courseId,courseName,classId,teacherId){
          var noSupervisorDiv = document.getElementById("noSupervisorDiv");
          var supervisorDiv = document.getElementById("supervisorDiv");
          this.setCourseName = courseName;
          this.$http.post('./teachingSupervision/selectSupervisorList',{
            "classId":classId,
            "courseId":courseId,
            "teacherId":teacherId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.supervisorList = response.body.supervisorList;
            this.settedSupervisorCourseInfoList = response.body.settedSupervisorCourseInfoList;
          },function(error){
            console.log("获取error");
          });
          this.supervisorinfoKey.courseId = courseId;
          this.supervisorinfoKey.classId = classId;
          this.supervisorinfoKey.teacherId = teacherId;
          supervisorDiv.style.display = "inline";
          noSupervisorDiv.style.display = "none";
        },
//        点击某课程的设置督导按钮，从未设置督导页面跳转到已设置督导页面
        goToClick:function(){
          var noSupervisorDiv = document.getElementById("noSupervisorDiv");
          var supervisorDiv = document.getElementById("supervisorDiv");
          var setSupervisorDropdown = document.getElementById("setSupervisorDropdown");
          supervisorDiv.style.display = "inline";
          noSupervisorDiv.style.display = "none";
          setSupervisorDropdown.style.display = "none";
          this.$http.post('./teachingSupervision/findSettedSupervise',{},{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.settedSupervisorCourseInfoList = response.body.settedSupervisorCourseInfoList;
          },function(error){
            console.log("获取error");
          });
        },
//        直接从未设置督导页面跳转到已设置督导页面
        saveSupervisorInfoClick:function(){
          this.modalSetBool = true;
          this.operateMsg = '1';
        },
//        弹窗确认保存督导设置
        restoreSupervisorInfoClick:function(){
          this.modalSetBool = true;
          this.operateMsg = '2';
        },
//        弹窗确认取消督导设置
        saveOk:function(){
          this.$http.post('./teachingSupervision/setSupervisor',{
            "supervisorId":this.supervisorinfoKey.supervisorId,
            "courseId":this.supervisorinfoKey.courseId,
            "classId":this.supervisorinfoKey.classId,
            "teacherId":this.supervisorinfoKey.teacherId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            var message = response.body.message;
            if(message==1){
              this.settedSupervisorCourseInfoList = response.body.settedSupervisorCourseInfoList;
              this.$Message.success("保存成功！");
            }else{
              this.modalSetResultBool = true;
            }
            this.modalSetBool = false;
          },function(error){
            console.log("获取error");
          });
        },
//        保存督导设置
        cancelOk:function(){
          this.supervisorinfoKey.supervisorId = '';
          this.modalSetBool = false;
        },
//        取消督导设置
        operateCancel:function(){
          this.modalSetBool = false;
        },
//        取消掉保存，删除，取消保存等操作
        resultOk: function(){
          this.modalSetResultBool = false;
        },
//        确认操作失败信息
        checksupervisorBackInfoClick:function(supervisorId,classId,courseId,teacherId){
          var supervisorDiv = document.getElementById("supervisorDiv");
          var superviseBackTable = document.getElementById("superviseBackTable");
          this.superviseBackinfoKey.supervisorId = supervisorId;
          this.superviseBackinfoKey.classId = classId;
          this.superviseBackinfoKey.courseId = courseId;
          this.superviseBackinfoKey.teacherId = teacherId;
          this.superviseBackinfoKey.forwardInfo = "";
          this.$http.post('./teachingSupervision/checkSupervisionResult',{
            "supervisorId":supervisorId,
            "classId":classId,
            "courseId":courseId,
            "teacherId":teacherId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            this.superviseInfoList = response.body.superviseInfoList;
            if(this.superviseInfoList.length == 0)
                this.$Message.error("没有督导反馈");
          },function(error){
          });
          supervisorDiv.style.display = "none";
          superviseBackTable.style.display = "inline"

        },
//        从已设置督导页面跳转到督导反馈页面
        supervisorTableGoBackClick:function(){
          var noSupervisorDiv = document.getElementById("noSupervisorDiv");
          var supervisorDiv = document.getElementById("supervisorDiv");
          var setSupervisorDropdown = document.getElementById("setSupervisorDropdown");
          this.$http.post('./teachingSupervision/selectNotSupervisorList',{},{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.courseList = response.body.courseList;
            this.teacherList = response.body.teacherList;
            this.notSettedSupervisorCourseInfoList = response.body.notSettedSupervisorCourseInfoList;
          },function(error){
            console.log("获取error");
          });
          noSupervisorDiv.style.display = "inline";
          supervisorDiv.style.display = "none";
          setSupervisorDropdown.style.display = "inline";
        },
//        从已设置督导页面跳转到未设置督导页面
        tableSlideToggle:function(index){
          var table = document.getElementById('superviseTableDiv' + index);
          var arrow = document.getElementById('arrow'+index);
          if (arrow.src === this.arrowright){
            table.style.display = "inline";
            arrow.src = this.arrowdown;
          }
          else {
            table.style.display = "none";
            arrow.src = this.arrowright;
          }
        },
//        点击督导时间下拉导航栏后下拉该时间的督导反馈表格
        submitClick:function(superviseTime,index){
          this.superviseBackinfoKey.superviseTime = superviseTime;
          this.modalSubmitBool = true;
          this.submitIndex = index;
          this.operateSubmitMsg = '1';
        },
//        提交教务人员意见时弹窗确认
        cancelSubmitClick:function(){
          this.modalSubmitBool = true;
          this.operateSubmitMsg = '2';
        },
//        取消提交教务人员意见时弹窗确认
        submitOk:function(superviseTime){
            var Btn = document.getElementById('submit'+this.submitIndex);
          if(this.superviseBackinfoKey.forwardInfo.length === 0){
            this.operateSubmitMsg = '3';
            this.modalSubmitBool=false;
            this.modalSubmitResultBool=true;
          }
          else{
            this.$http.post('./teachingSupervision/setFeedbackSupervisionResult',{
              "superviseTime":this.superviseBackinfoKey.superviseTime,
              "supervisorId":this.superviseBackinfoKey.supervisorId,
              "classId":this.superviseBackinfoKey.classId,
              "courseId":this.superviseBackinfoKey.courseId,
              "teacherId":this.superviseBackinfoKey.teacherId,
              "forwardInfo":this.superviseBackinfoKey.forwardInfo
            },{
              "Content-Type":"application/json"
            }).then(function (response) {
              var resultMsg = response.body.result;
              if(resultMsg=='1'){
                this.modalSubmitBool=false;
                this.$Message.success("提交成功！");
                Btn.style.display = "none";
              }else{
                this.modalSubmitResultBool = true;
              }
            },function(error){
              this.$Message.error("网络错误！");
            });
          }
        },
//        提交教务人员意见
        cancelSubmitOk:function(){
          this.superviseBackinfoKey.forwardInfo = "";
        },
//        取消保存教务人员意见
        operateSubmitCancel:function(){
          this.modalSubmitBool=false;
        },
//        取消提交、取消提交操作
        resultSubmitOk:function(){
          this.modalSubmitResultBool=false;
        },
//        确认提交操作结果
        superviseBackTableGoBackClick:function(){
          var supervisorDiv = document.getElementById("supervisorDiv");
          var superviseBackTable = document.getElementById("superviseBackTable");
          supervisorDiv.style.display = "inline";
          superviseBackTable.style.display = "none"
        }
//        从督导反馈页面跳转到已设置督导页面
      }
    }
</script>

<style scoped>
    html {
        font-size: 62.5%;
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
      width: 5.6rem;
      margin: 0 0.7rem;
    }
    p{
      color: grey;
    }
    .setSupervisor{
      color: #158064;
      cursor: pointer;
    }
    .bottomButton{
      margin-top: 1rem;
      margin-right: 1.4rem;
      min-width: 5.6rem;
    }
    .buttonDiv{
      text-align: center;
    }
    .supervisorBackInput{
      width: 80%;
    }

    .superviseDiv{
      position: relative;
      /*background-color: #158064;*/
      background-color: #1fa573;
      border-top:1px solid #ececec;
      height: 2rem;
      width: 100%;
    }
    .superviseP{
      position: absolute;
      height: 1.7rem;
      width: 10rem;
      padding-top: 0.3rem;
      text-align: center;
      font-size: 0.9rem;
      color:#FFF;
      cursor: default;
    }
    .superviseP:hover,.superviseImg:hover{
      background-color: #00a539;
    }
    .superviseImg{
      width: 2rem;
      height: 2rem;
      /*margin-left: 0.7rem;*/
    }
    .superviseButton{
      float: right;
      margin-top: 0.3rem;
      margin-right: 5rem;
      background-color: #1fa573;
      font-size: 0.8rem;
      color:#FFF;
      text-align: center;
      border-radius: 0.5rem;
      padding-bottom: 0.1rem;
      height: 1.4rem;
      min-width: 5rem;
      border-color: white;
      border-style: solid;
      border-width: 0.1rem;
      /*更改button的边框属性*/
    }
    .superviseButton:hover{
      background-color: #00a539;
    }
    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
