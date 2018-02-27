<template>
  <div>
    <div  class="positionBar">
      <span>您当前的位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span> > <a href="#/teacher/director" class="returnHome">督导反馈</a></span>
      <span> > 督导结果</span>
    </div>
    <div id="table">

    <div id="show">
      <table class="normalTable">
        <thead>
        <tr>
          <th colspan=4>督导反馈</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>督导日期</td>
          <td colspan=3><input v-model="SuperviseTime" class="big" type="text" placeholder="请输入日期"></td>
        </tr>
        <tr><td rowspan=8>评分</td>
             <td>学生出勤情况</td><td><input v-model="AttendanceInfo" class="sma" type="text" placeholder="请输入出勤情况"></td></tr>
        <tr><td>授课内容</td> <td><input v-model="TeachContent" class="sma" type="text" placeholder="请输入授课内容"></td></tr>
        <tr><td>教师素养得分</td> <td><input v-model="TeacherQualityScored" class="sma" type="number" placeholder="请输入得分（0-100）"></td></tr>
        <tr><td>教学目标得分</td> <td><input v-model="TeachGoalsScored" class="sma" type="number" placeholder="请输入得分（0-100）"></td></tr>
        <tr><td>教学内容得分</td> <td><input v-model="TeachContentScored" class="sma" type="number" placeholder="请输入得分（0-100）"></td></tr>
        <tr><td>教学方法得分</td> <td><input v-model="TeachMethodsScored" class="sma" type="number" placeholder="请输入得分（0-100）"></td></tr>
        <tr><td>教学常规得分</td> <td><input v-model="TeachRoutineScored" class="sma" type="number" placeholder="请输入得分（0-100）"></td></tr>
        <tr><td>教学内容得分</td> <td><input v-model="TeachEffectScored" class="sma" type="number" placeholder="请输入得分（0-100）"></td></tr>
        <tr><td>督导员意见</td>
             <td colspan=3><input v-model="CommentsInfo" class="big" type="text" placeholder="请输入您的意见"></td>
        </tr>
        </tbody>
      </table>
      <div style="text-align: center">
      <button v-show="subBtn" class="am-btn am-btn-success am-radius" @click="saveDia(SuperviseTime,AttendanceInfo,TeachContent,TeacherQualityScored,
      TeachGoalsScored,TeachContentScored,TeachMethodsScored,TeachRoutineScored,TeachEffectScored,CommentsInfo,ForwardInfo)">提交</button>
      <button class="am-btn am-btn-success am-radius" @click="cancel()">返回</button>
      </div>
    </div>
    <div id="grey"></div>
    <div id="recordTable">
      <table class="operationTable">
        <thead>
        <tr id="recordTr">
          <th class="recordTh">督导时间</th>
          <th class="recordTh">提交时间</th>
          <th class="recordTh">状态</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="data in tableList">
          <td  v-text="data.supervisionTime"></td>
          <td  v-text="data.upTime"></td>
          <td>提交成功</td>
        </tr>
        </tbody>
      </table>
    </div>
    <Modal
      v-model="modal1"
      width="400"
      :mask-closable="false"
      id="modalBody"
      :styles="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定提交反馈吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="save(oSuperviseTime,oAttendanceInfo,oTeachContent,oTeacherQualityScored,
      oTeachGoalsScored,oTeachContentScored,oTeachMethodsScored,oTeachRoutineScored,oTeachEffectScored,oCommentsInfo,oForwardInfo)">确定</button>
        <button id="modalBtn" @click="modal1 = false">取消</button>
      </div>
    </Modal>
    <Modal
      v-model="modal2"
      width="400"
      :mask-closable="false"
      id="modalBody"
      :styles="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定返回吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="cancel()">确定</button>
        <button id="modalBtn" @click="modal2 = false">取消</button>
      </div>
    </Modal>
      <Modal
        v-model="modal3"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
        <div style="font-size: 1.1rem;text-align: center;">
          <p>请填写完整信息！</p>
        </div>
        <div slot="footer" style="text-align: center">
          <!--<button id="modalBtn" @click="cancel()">确定</button>-->
          <button id="modalBtn" @click="modal3 = false">确定</button>
        </div>
      </Modal>
      <Modal
        v-model="modal4"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
        <div style="font-size: 1.1rem;text-align: center;">
          <p>得分不合法！</p>
        </div>
        <div slot="footer" style="text-align: center">
          <!--<button id="modalBtn" @click="cancel()">确定</button>-->
          <button id="modalBtn" @click="modal4 = false">确定</button>
        </div>
      </Modal>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'table',
    data () {
      return {
//        tableList:[{supervisionTime:"0102",upTime:"0103"},{supervisionTime:"0102",upTime:"0103"}],
        tableList:'',
        subBtn:true,
        SuperviseTime:'',
        AttendanceInfo:'',
        TeachContent:'',
        TeacherQualityScored:'',
        TeachGoalsScored:'',
        TeachContentScored:'',
        TeachMethodsScored:'',
        TeachRoutineScored:'',
        TeachEffectScored:'',
        CommentsInfo:'',
        ForwardInfo:'',
        modal1: false,
        modal2: false,
        modal3: false,
        modal4:false,
        oSuperviseTime:'',
        oAttendanceInfo:'',
        oTeachContent:'',
        oTeacherQualityScored:'',
        oTeachGoalsScored:'',
        oTeachContentScored:'',
        oTeachMethodsScored:'',
        oTeachRoutineScored:'',
        oTeachEffectScored:'',
        oCommentsInfo:'',
        oForwardInfo:''
      }
    },
    //打开页面
    beforeMount:function(){
      var thisURL = document.URL;
      var id =thisURL.split("directorResult?")[1];
      var idArr = id.split("&");
      var courseId =idArr[1].split("=")[1];
      var classId =idArr[2].split("=")[1];
      var teacherId =idArr[3].split("=")[1];
      this.$http.post('./teachingSupervision/getSupervisionRecord',{
        "courseId":courseId,
        "classId":classId,
        "teacherId":teacherId
      },
        {"Content-Type":"application/json"}).then(function (response) {
          this.tableList=response.body.supervisionRecordList;
          this.SuperviseTime=response.body.supervisionInfoList[0].superviseTime;
          this.AttendanceInfo=response.body.supervisionInfoList[0].attendanceInfo;
          this.TeachContent=response.body.supervisionInfoList[0].teachContent;
          this.TeacherQualityScored=response.body.supervisionInfoList[0].teacherQualityScored;
          this.TeachGoalsScored=response.body.supervisionInfoList[0].teachGoalsScored;
          this.TeachContentScored=response.body.supervisionInfoList[0].teachContentScored;
          this.TeachMethodsScored=response.body.supervisionInfoList[0].teachMethodsScored;
          this.TeachRoutineScored=response.body.supervisionInfoList[0].teachRoutineScored;
          this. TeachEffectScored=response.body.supervisionInfoList[0].teachEffectScored;
          this. CommentsInfo=response.body.supervisionInfoList[0].commentsInfo;
          this. ForwardInfo=response.body.supervisionInfoList[0].forwardInfo;
        },
        function(error){
        });
    },
    mounted:function () {
      var thisURL = document.URL;
      var id =thisURL.split("directorResult?")[1];
      var idArr = id.split("&");
      if(idArr[0].split("=")[1]=='r')
      {
          this.subBtn = false;
        var inputs = document.getElementsByTagName("input");
        for(var i= 0;i<inputs.length;i++)
        {
          inputs[i].disabled="disabled";
        }

      }else if(idArr[0].split("=")[1]=='w')
      {
          var date = new Date();
          this.SuperviseTime = date.toLocaleDateString();
      }
    },
    methods: {
      //打开保存对话框
      saveDia:function(SuperviseTime,AttendanceInfo,TeachContent,TeacherQualityScored,
                       TeachGoalsScored,TeachContentScored,TeachMethodsScored,TeachRoutineScored,TeachEffectScored,CommentsInfo,ForwardInfo){
        if(SuperviseTime==''||AttendanceInfo==''||TeachContent==''||CommentsInfo==''||TeacherQualityScored==''||
            TeachGoalsScored==''||TeachContentScored==''||TeachMethodsScored==''||TeachRoutineScored==''||TeachEffectScored==''){
          this.modal3 = true;
          return;
        } else{
          this.oCommentsInfo=CommentsInfo;
          this.oSuperviseTime=SuperviseTime;
          this.oAttendanceInfo=AttendanceInfo;
          this.oTeachContent=TeachContent;
          this.oForwardInfo=ForwardInfo;
        }
        try
        {
          this.oTeacherQualityScored = parseInt(TeacherQualityScored);
          this.oTeachGoalsScored = parseInt(TeachGoalsScored);
          this.oTeachContentScored = parseInt(TeachContentScored);
          this.oTeachMethodsScored = parseInt(TeachMethodsScored);
          this.oTeachRoutineScored = parseInt(TeachRoutineScored);
          this.oTeachEffectScored = parseInt(TeachEffectScored);
          if(this.oTeacherQualityScored>100||this.oTeacherQualityScored<=0||this.oTeachGoalsScored>100||this.oTeachGoalsScored<=0
            ||this.oTeachContentScored>100||this.oTeachContentScored<=0||this.oTeachMethodsScored>100||this.oTeachMethodsScored<=0
            ||this.oTeachRoutineScored>100||this.oTeachRoutineScored<=0||this.oTeachEffectScored>100||this.oTeachEffectScored<=0)
          {
            this.modal4 = true;
            return;
          }
        }catch(e)
          {
            this.modal4 = true;
            return;
          }
        this.modal1 = true;
      },
      //打开取消对话框
      cancelDia:function(){
        this.modal2 = true;
      },
      //保存
      save:function(SuperviseTime,AttendanceInfo,TeachContent,TeacherQualityScored,
                    TeachGoalsScored,TeachContentScored,TeachMethodsScored,TeachRoutineScored,TeachEffectScored,CommentsInfo,ForwardInfo){
        this.modal1=false;
        var thisURL = document.URL;
        var id =thisURL.split("directorResult?")[1];
        var idArr = id.split("&");
        var courseId =idArr[1].split("=")[1];
        var classId =idArr[2].split("=")[1];
        var teacherId =idArr[3].split("=")[1];
        this.$http.post('./teachingSupervision/addSupervision',{
          "courseId":courseId,
          "classId":classId,
          "teacherId":teacherId,
          "superviseTime":SuperviseTime,
          "attendanceInfo":AttendanceInfo,
          "teachContent":TeachContent,
          "teacherQualityScored":TeacherQualityScored,
          "teachGoalsScored":TeachGoalsScored,
          "teachContentScored":TeachContentScored,
          "teachMethodsScored":TeachMethodsScored,
          "teachRoutineScored":TeachRoutineScored,
          "teachEffectScored":TeachEffectScored,
          "commentsInfo":CommentsInfo,
          "forwardInfo":ForwardInfo
        },{"Content-Type":"application/json"}).then(function (response) {
            if(response.body.result=="1")
            {
                this.$Message.success('保存成功！');
                setTimeout("window.history.back(-1);",3000);
            }else
            {
              this.$Message.error('保存失败！');
            }
          },
          function(error){
            this.$Message.error('网络错误！');
          });
      },
      //返回上一页面
      cancel:function(){
        window.history.back(-1);
      }
    }

  }
</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  #table{
    background-color: #f3f3f3;
    width:100%;
  }
 .big{width:98%;  height:2rem;}
 .sma{width:97%;}
 #recordTable{
   background-color: white;
   margin-right:5rem;
   margin-left:5rem;
   padding-bottom: 1rem;
   position: relative;
   top:2rem;
 }
 #recordTr{

 }
 .recordTh{
  width:20rem;
 }
 #grey{
   background-color: #f3f3f3;
   margin-right:5rem;
   margin-left:5rem;
   height:2rem;
 }
 input{
   border:1px solid white;
 }
  button{
   width:5.6rem;
    margin:0.7rem;
    margin-top:2rem;
    /*display: flex;*/
    /*justify-content: center;*/
  }
  #show{
    background-color: white;
    margin-right:5rem;
    margin-left:5rem;
    padding-bottom: 1rem;
    position: relative;
    top:2rem;
  }
  thead{
    border-bottom:solid 2px lightgrey;
  }

  tr{
    height:2.5rem;
  }

</style>



