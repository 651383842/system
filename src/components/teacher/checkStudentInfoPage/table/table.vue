<template>
  <div>
    <div  class="positionBar">
      <span>您当前的位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span>><a href="#/teacher/classList" class="returnHome">班级管理</a></span>
      <span>>学生个人信息</span>
    </div>
    <div id="selfInformation">
      <div class="tableBox">
        <table id="tableDiv" class="normalTable" border="1">
          <tr><td>姓名</td><td><input type="text" readonly class="inputStyle"  v-model="teacherMessage.studentName"></td><td>身份证</td><td><input readonly type="text" class="inputStyle"  v-model="teacherMessage.studentIDcard"/></td></tr>
          <tr><td>曾用名</td><td><input type="text" readonly class="inputStyle" v-model="teacherMessage.formerName"/></td><td>高考准考证号</td><td><input readonly type="text" class="inputStyle"   v-model="teacherMessage.NCEERegistrationId"/></td></tr>
          <tr><td>性别</td><td><input type="text" readonly class="inputStyle"  v-model="teacherMessage.studentGender"/></td><td>生源地</td><td><input readonly type="text" class="inputStyle" v-model="teacherMessage.originOfStudent"/></td></tr>
          <tr><td>目前状态</td><td><input type="text" readonly class="inputStyle"  v-model="teacherMessage.currentState"/></td><td>学生邮箱</td><td><input readonly type="text" class="inputStyle" v-model="teacherMessage.emailAddress"/></td></tr>
          <tr><td>出生日期</td><td><input type="text" readonly class="inputStyle"  v-model="teacherMessage.birthdate"/></td><td>学生手机</td><td><input readonly type="text" class="inputStyle" v-model="teacherMessage.phoneNumber"/></td></tr>
          <tr><td>入学日期</td><td><input type="text" readonly class="inputStyle"  v-model="teacherMessage.admissionDate"/></td><td>学生电话</td><td><input readonly type="text" class="inputStyle" v-model="teacherMessage.homeTelephone"/></td></tr>
          <tr><td>婚否</td><td><input type="text" readonly class="inputStyle" v-model="teacherMessage.maritalStatus"/></td><td>家庭地址</td><td><input type="text" readonly class="inputStyle" v-model="teacherMessage.houseAddress"/></td></tr>
          <tr><td>籍贯</td><td><input type="text" readonly class="inputStyle" v-model="teacherMessage.nativePlace"/></td><td>班级职务</td><td><input type="text"  readonly class="inputStyle"  v-model="teacherMessage.classDuty"/></td></tr>
          <tr><td>学制</td><td><input type="text" readonly class="inputStyle"  v-model="teacherMessage.schoolYearType"/></td><td>文化程度</td><td><input type="text" readonly class="inputStyle" v-model="teacherMessage.literacyLevels"/></td></tr>
          <tr><td>学校层次</td><td><input type="text" readonly class="inputStyle"  v-model="teacherMessage.schoolLevel"/></td><td>毕业时间</td><td><input type="text" readonly class="inputStyle"  v-model="teacherMessage.graduationTime"/></td></tr>
          <tr><td>入学成绩</td><td><input type="text" readonly class="inputStyle"  v-model="teacherMessage.entranceScores"/></td><td>毕业证号</td><td><input type="text" readonly class="inputStyle"  v-model="teacherMessage.graduationNum"/></td></tr>
          <tr><td>体重</td><td><input type="text" readonly class="inputStyle" v-model="teacherMessage.weight"/></td><td>教学班</td><td><input type="text" class="inputStyle"  readonly v-model="teacherMessage.className"/></td></tr>
          <tr><td>身高</td><td><input type="text" readonly class="inputStyle" v-model="teacherMessage.height"/></td><td>专业</td><td><input type="text" class="inputStyle"  readonly v-model="teacherMessage.specialityName"/></td></tr>
          <tr><td>学号</td><td><input type="text" readonly class="inputStyle"  v-model="teacherMessage.studentId"/></td><td>政治面貌</td><td><input type="text" class="inputStyle" readonly v-model="teacherMessage.politicalStatus"/></td></tr>
          <tr><td>学习年制</td><td><input type="text" readonly class="inputStyle" v-model="teacherMessage.studyMode"/></td><td>备注</td><td><input type="text" readonly class="inputStyle"/></td></tr>
        </table>
        <div class="updatePicture" align="center">
          <!--<select class="selectStyle" v-model="selected" @change="selectChange">-->
            <!--<option  value="身份证照" selected @click="selectClick">身份证照</option>-->
            <!--<option  value="证件照" @click="selectClick">证件照</option>-->
            <!--<option  value="生活照" @click="selectClick">生活照</option>-->
          <!--</select>-->
          <img :src="path" class="image" id="picture"/>
          <span>身份证证件照</span>
          <!--<span class="spanStyle">*图片须小于2M</span>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//  import logo from './images/logo.png';
    export default {
        name: 'studentInformationPage',
        data () {
            return {
              buttonShow:false,
//              selected:'身份证照',
//              filePathRequest:'./studentManage/uploadStudentIDcardPhoto',
//              path:'',//图片路径
              teacherMessage: {}
            }
        },
      //打开页面获取信息
      beforeMount:function() {
        var thisURL = document.URL;
        var studentId =thisURL.split("checkStudentInfo?")[1];
        this.$http.post('./studentManage/getStudentDetailInfoByStudentId',JSON.stringify({
          "studentId":studentId
        }),{"Content-Type":"application/json"}).then(function (response) {
          var data = response.body;
          this.teacherMessage=data.studentMessage;
          this.path=this.teacherMessage.iDcardPhoto;
        });
      },
//      mounted:function(){
//        var button  = document.getElementById("updateImage");
//        button.className="am-btn am-btn-success am-radius";//修改上传按钮为需要样式。
//      },
      methods:
      {
//        selectChange:function(){
//          if(this.selected=="身份证照"){
//            if(this.teacherMessage.iDcardPhoto!="") {
//              this.path = this.teacherMessage.iDcardPhoto;
//            }
//            this.filePathRequest='./studentManage/uploadStudentIDcardPhoto';
//          }else if(this.selected=="证件照"){
//              if(this.teacherMessage.credentialsPhoto!="") {
//              this.path = this.teacherMessage.credentialsPhoto;
//            }
//            this.filePathRequest='./studentManage/uploadStudentCredentialsPhoto';
//          }else if(this.selected=="生活照"){
//            if(this.teacherMessage.livePhoto!="") {
//              this.path = this.teacherMessage.livePhoto;
//            }
//            this.filePathRequest='./studentManage/uploadStudentLivePhoto';
//          }
//        },
//        updateImageClick:function(){
//          if(this.selected=="身份证照"){
//            this.path=this.teacherMessage.iDcardPhoto;
//            this.$Message.success('上传文件成功！');
//          }else if(this.selected=="证件照"){
//            this.path=this.teacherMessage.credentialsPhoto;
//            this.$Message.success('上传文件成功！');
//          }else if(this.selected=="生活照"){
//            this.path=this.teacherMessage.livePhoto;
//            this.$Message.success('上传文件成功！');
//          }
//        },
//        updateInforClick:function(){
//          this.$http.post('./studentManage/editStudentDetailInfo', {
//            studentId:this.teacherMessage.studentId,
//            studentIDcard:this.teacherMessage.studentIDcard,
//            studentName:this.teacherMessage.studentName,
//            formerName:this.teacherMessage.formerName,
//            studentGender:this.teacherMessage.studentGender,
//            currentState:this.teacherMessage.currentState,
//            birthdate:this.teacherMessage.birthdate,
//            admissionDate:this.teacherMessage.admissionDate,
//            maritalStatus:this.teacherMessage.maritalStatus,
//            nativePlace:this.teacherMessage.nativePlace,
//            schoolYearType:this.teacherMessage.schoolYearType,
//            schoolLevel:this.teacherMessage.schoolLevel,
//            entranceScores:this.teacherMessage.entranceScores,
//            NCEERegistrationId:this.teacherMessage.NCEERegistrationId,
//            originOfStudent:this.teacherMessage.originOfStudent,
//            phoneNumber:this.teacherMessage.phoneNumber,
//            emailAddress:this.teacherMessage.emailAddress,
//            homeTelephone:this.teacherMessage.homeTelephone,
//            houseAddress:this.teacherMessage.houseAddress,
//            height:this.teacherMessage.height,
//            weight:this.teacherMessage.weight,
//            studyMode:this.teacherMessage.studyMode,
//            gradeName:this.teacherMessage.gradeName,
//            classDuty:this.teacherMessage.classDuty,
//            specialityName:this.teacherMessage.specialityName,
//            ethno:this.teacherMessage.ethno,
//            politicalStatus:this.teacherMessage.politicalStatus,
//            literacyLevels:this.teacherMessage.literacyLevels,
//            graduationTime:this.teacherMessage.graduationTime,
//            graduationNum:this.teacherMessage.graduationNum,
//            examineeId:this.teacherMessage.examineeId,
//            className:this.teacherMessage.className,
//          }, {"Content-Type": "application/json"}).then(function (response) {
//            var data=response.body;
//            if(data.result==1){
//              this.$Message.success('提交成功！');
//            }
//          });
//        },
//        handleFormatError: function(){
//          this.$Message.error('文件格式错误！限制格式为'+this.$refs.uploadForTextbook.format,3);
//        },
//        handleSize: function(){
//          this.$Message.error('文件大小超出范围！限制最大（KB）为'+this.$refs.uploadForTextbook.maxSize,3);
//        },
//        handleError: function(res){
//          var msg = document.getElementsByClassName("ivu-message-notice");
//          if(this.loadingMsg){
////            结束进度条
//            this.$Loading.error();
////            移除“正在上传……”的msg
//            if(!!window.ActiveXObject || "ActiveXObject" in window){
//              msg[0].parentNode.innerHTML = "";
////                IE浏览器对removeChild实现有问题
//            }else{
//              msg[0].parentNode.removeChild(msg[0]);
//            }
//          }
//          this.$Message.error('文件上传失败！'+res,3);
//          this.loadingMsg = false;
//        },
//        handleProgress: function(){
//          this.$Loading.start();
//          this.$Message.loading('正在上传中……', 0);
//          this.loadingMsg = true;
//        },
//        handleSuccess: function(res){
//          this.$Loading.finish();
//          var msg = document.getElementsByClassName("ivu-message-notice");
//          if(!!window.ActiveXObject || "ActiveXObject" in window){
//            msg[0].parentNode.innerHTML = "";
//          }else{
//            msg[0].parentNode.removeChild(msg[0]);
//          }
//          this.$Message.success('上传成功！',3);
//          this.loadingMsg = false;
//          var data=res;
//          console.log(res);
//          this.path=data.path;
//          if(this.selected=="身份证照"){
//            this.teacherMessage.iDcardPhoto=this.path;
//          }else if(this.selected=="证件照"){
//            this.teacherMessage.credentialsPhoto=this.path;
//          }else if(this.selected=="生活照"){
//            this.teacherMessage.livePhoto=this.path;
//          }
//        }
//
      }
    }
</script>

<style scoped>
    html {
        font-size: 100%;
    }
    #selfInformation {
      min-height: 2.9rem;
      margin-bottom:1rem;
    }
    #backButton{
      /*登录按钮*/
      float:right;
      margin-top:5px;
      color: white;
      width: 5.6rem;
      outline: none;
    }
    .contentTitle{
      padding:0.5rem 5rem;
    }
    .title{
      display: block;
      float:left;
      margin-top:1rem;
    }
    .tableBox{
      height:35rem;
      padding:3rem 5rem 2rem 5rem;
    }
    .inputStyle{
      border:0rem;
      text-align: center;
    }
    #tableDiv{
      float:left;
      width: 80%;
      border: 0 solid #d4d4d9;
      border-collapse: collapse;
      table-layout: fixed;
      text-align: center;
    }
    .updatePicture{
      width: 15%;
      float:right;
    }
    .image{
      background-color: #ffffff;
      width:100%;
      height:auto;
      border: 1px solid black;
    }
    .spanStyle{
      width:100%;
      display: block;
      float:left;
    }
    #updateImage{
      width:5.6rem;
      display: block;
      margin-top: 2rem;
      margin-bottom:10rem;
      outline: none;
    }
    #submit {
      width:5.6rem;
      display: block;
      outline: none;
    }
    #upload {

    }

    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
