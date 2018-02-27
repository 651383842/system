<template>
    <div id="selfInformation">
      <div class="positionBar">
        <span>您的当前位置：</span>
        <span><a :href="studentPageUrl" class="returnHome">首页</a></span>
        <span> > 个人信息</span>
      </div>
      <span class="spanStyles"> *信息为可编辑修改</span>
      <div class="tableBox">
        <table id="tableDiv" class="normalTable" border="1">
          <tr><td>姓名</td><td><input type="text" class="inputStyle" readonly v-model="teacherMessage.studentName"></td><td>身份证</td><td><input type="text" class="inputStyle" readonly v-model="teacherMessage.studentIDcard"/></td></tr>
          <tr><td>*曾用名</td><td><input type="text" class="inputStyle" v-model="teacherMessage.formerName"/></td><td>高考准考证号</td><td><input type="text" class="inputStyle" readonly v-model="teacherMessage.NCEERegistrationId"/></td></tr>
          <tr><td>性别</td><td><input type="text" class="inputStyle" readonly v-model="teacherMessage.studentGender"/></td><td>*生源地</td><td><input type="text" class="inputStyle" v-model="teacherMessage.originOfStudent"/></td></tr>
          <tr><td>目前状态</td><td><input type="text" class="inputStyle" readonly v-model="teacherMessage.currentState"/></td><td>*学生邮箱</td><td><input type="text" class="inputStyle" v-model="teacherMessage.emailAddress"/></td></tr>
          <tr><td>出生日期</td><td><input type="text" class="inputStyle" readonly v-model="teacherMessage.birthdate"/></td><td>*学生手机</td><td><input type="text" class="inputStyle" v-model="teacherMessage.phoneNumber"/></td></tr>
          <tr><td>入学日期</td><td><input type="text" class="inputStyle" readonly v-model="teacherMessage.admissionDate"/></td><td>*学生电话</td><td><input type="text" class="inputStyle" v-model="teacherMessage.homeTelephone"/></td></tr>
          <tr><td>*婚否</td>
            <td>
              <select class="selectStyle" v-model="teacherMessage.maritalStatus">
                <option  value="否" selected @click="selectClick">否</option>
                <option  value="是" @click="selectClick">是</option>
                <option  value="离异" @click="selectClick">离异</option>
              </select>
            </td>
            <td>*家庭地址</td><td><input type="text" class="inputStyle" v-model="teacherMessage.houseAddress"/></td></tr>
          <tr><td>*籍贯</td><td><input type="text" class="inputStyle" v-model="teacherMessage.nativePlace"/></td><td>班级职务</td><td><input type="text" class="inputStyle" readonly v-model="teacherMessage.classDuty"/></td></tr>
          <tr><td>学制</td><td><input type="text" class="inputStyle" readonly v-model="teacherMessage.schoolYearType"/></td>
            <td>*文化程度</td>
            <td>
            <select class="selectStyle" v-model="teacherMessage.literacyLevels" @click="selectChange">
              <option  value="小学" selected @click="selectClick">小学</option>
              <option  value="初中" @click="selectClick">初中</option>
              <option  value="中专" @click="selectClick">中专</option>
              <option  value="高中" @click="selectClick">高中</option>
              <option  value="大专" @click="selectClick">大专</option>
            </select>
            </td>
          </tr>
          <tr><td>学校层次</td><td><input type="text" class="inputStyle" readonly v-model="teacherMessage.schoolLevel"/></td><td>毕业时间</td><td><input type="text" class="inputStyle" readonly v-model="teacherMessage.graduationTime"/></td></tr>
          <tr><td>入学成绩(分)</td><td><input type="text" class="inputStyle" readonly v-model="teacherMessage.entranceScores"/></td><td>毕业证号</td><td><input type="text" class="inputStyle" readonly v-model="teacherMessage.graduationNum"/></td></tr>
          <tr><td>*体重(kg)</td><td><input type="text" class="inputStyle" v-model="teacherMessage.weight"/></td><td>教学班</td><td><input type="text" class="inputStyle" readonly v-model="teacherMessage.className"/></td></tr>
          <tr><td>*身高(cm)</td><td><input type="text" class="inputStyle" v-model="teacherMessage.height"/></td><td>专业</td><td><input type="text" class="inputStyle" readonly v-model="teacherMessage.specialityName"/></td></tr>
          <tr>
            <td>学号</td><td><input type="text" class="inputStyle" readonly v-model="teacherMessage.studentId"/></td>
            <td>*政治面貌</td>
            <td>
              <select class="selectStyle" v-model="teacherMessage.politicalStatus" @click="selectChange">
                <option  value="群众" selected @click="selectClick">群众</option>
                <option  value="团员" @click="selectClick">团员</option>
                <option  value="党员" @click="selectClick">党员</option>
              </select>
            </td>
          </tr>
          <tr><td>备注</td><td colspan="3"><input readonly type="text" class="inputStyle"/></td></tr>
        </table>
        <div class="updatePicture" align="center">
          <select class="selectStyle" v-model="selected" @change="selectChange">
            <option  value="身份证照" selected @click="selectClick">身份证照</option>
            <option  value="证件照" @click="selectClick">证件照</option>
            <option  value="生活照" @click="selectClick">生活照</option>
          </select>
          <img :src="path" class="image" id="picture"/>
          <span class="spanStyle">*图片须小于2M</span>
          <Upload
            id="upload"
            ref="uploadForTextbook"
            :show-upload-list="false"
            :format="['png','jpg']"
            :max-size="20000000"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleSize"
            :on-success="handleSuccess"
            :on-error="handleError"
            :action="filePathRequest">
            <!--:on-progress="handleProgress"-->
            <i-button type="ghost" id="updateImage" @click="updateImageClick">上传</i-button><!--修改这个样式改变按钮样式-->
          </Upload>
          <button id="submit" class="am-btn am-btn-success am-radius" @click="modal1 = true">提交</button>
        </div>
      </div>
      <Modal v-model="modal1" id="modalBody" :styles="{top:'10rem'}">
        <p style="text-align:center; font-size:1.1rem;">确认提交修改信息？</p>
        <div slot="footer" style="text-align:center;">
          <Button id="modalBtn" @click="updateInforClick">确定</Button>
          <Button id="modalBtn" @click="modal1 = false">取消</Button>
        </div>
      </Modal>
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
  import logo from './images/logo.png';//引入图片

    export default {
        name: 'studentInformationPage',//模块名
        data () {
            return {
              studentPageUrl:'#/login/main/studentHome',//学生首页
              selected:'身份证照',//照片下拉框默认选项
              filePathRequest:'./studentManage/uploadStudentIDcardPhoto',//图片文件请求路径
              path:'',//图片路径
              teacherMessage: {//个人信息下拉框默认先选
                maritalStatus:"否",
                literacyLevels:"小学",
                politicalStatus:"群众"
              },
              modal1:false,//模态对话框1隐藏
              modal2:false,//模态对话框2隐藏
              okValue:0,//值为0无法执行，为1可以执行
              messageStr:''//模态对话框文字信息
            }
        },
      //页面初始化加载，学生基本信息
      beforeMount:function() {
        this.$http.post('./studentManage/getStudentDetailInfo').then(function (response) {
          var data = response.body;
          this.teacherMessage=data.studentMessage;
          this.path=this.teacherMessage.iDcardPhoto;
        });
      },
      //页面初始化把上传按钮的样式改成需要的样式
      mounted:function(){
        var button  = document.getElementById("updateImage");
        button.className="am-btn am-btn-success am-radius";//修改上传按钮为需要样式。
      },
      methods:
      {
        ok2 () {//模态对画框单击确定
          this.modal2 = false;
        },
        cancel2(){//模态对话框点击取消
          this.modal2 = false;
        },
        selectChange:function(){//选择照片下拉框
          if(this.selected=="身份证照"){
            if(this.teacherMessage.iDcardPhoto!="") {
              this.path = this.teacherMessage.iDcardPhoto;
            }
            this.filePathRequest='./studentManage/uploadStudentIDcardPhoto';
          }else if(this.selected=="证件照"){
              if(this.teacherMessage.credentialsPhoto!="") {
              this.path = this.teacherMessage.credentialsPhoto;
            }
            this.filePathRequest='./studentManage/uploadStudentCredentialsPhoto';
          }else if(this.selected=="生活照"){
            if(this.teacherMessage.livePhoto!="") {
              this.path = this.teacherMessage.livePhoto;
            }
            this.filePathRequest='./studentManage/uploadStudentLivePhoto';
          }
        },
        updateImageClick:function(){//文件上传按钮，根据图片下拉框确定上传哪一种图片
          if(this.selected=="身份证照"){
            this.path=this.teacherMessage.iDcardPhoto;
            //this.$Message.success('上传文件成功！');
          }else if(this.selected=="证件照"){
            this.path=this.teacherMessage.credentialsPhoto;
            //this.$Message.success('上传文件成功！');
          }else if(this.selected=="生活照"){
            this.path=this.teacherMessage.livePhoto;
            //this.$Message.success('上传文件成功！');
          }
        },
        updateInforClick:function(){//上传个人信息按钮
          this.modal1 = false;
          this.numberCheck(this.teacherMessage.weight,"体重数据不合理");
          this.numberCheck(this.teacherMessage.height,"身高数据不合理");
          this.numberCheck(this.teacherMessage.phoneNumber,"手机号码数据不合理");
          this.numberCheck(this.teacherMessage.homeTelephone,"电话号码不合理");
          //获取所有学生信息，发送到界面上
          this.$http.post('./studentManage/editStudentDetailInfo', {
            studentId:this.teacherMessage.studentId,
            studentIDcard:this.teacherMessage.studentIDcard,
            studentName:this.teacherMessage.studentName,
            formerName:this.teacherMessage.formerName,
            studentGender:this.teacherMessage.studentGender,
            currentState:this.teacherMessage.currentState,
            birthdate:this.teacherMessage.birthdate,
            admissionDate:this.teacherMessage.admissionDate,
            maritalStatus:this.teacherMessage.maritalStatus,
            nativePlace:this.teacherMessage.nativePlace,
            schoolYearType:this.teacherMessage.schoolYearType,
            schoolLevel:this.teacherMessage.schoolLevel,
            entranceScores:this.teacherMessage.entranceScores,
            NCEERegistrationId:this.teacherMessage.NCEERegistrationId,
            originOfStudent:this.teacherMessage.originOfStudent,
            phoneNumber:this.teacherMessage.phoneNumber,
            emailAddress:this.teacherMessage.emailAddress,
            homeTelephone:this.teacherMessage.homeTelephone,
            houseAddress:this.teacherMessage.houseAddress,
            height:this.teacherMessage.height,
            weight:this.teacherMessage.weight,
            studyMode:this.teacherMessage.studyMode,
            gradeName:this.teacherMessage.gradeName,
            classDuty:this.teacherMessage.classDuty,
            specialityName:this.teacherMessage.specialityName,
            ethno:this.teacherMessage.ethno,
            politicalStatus:this.teacherMessage.politicalStatus,
            literacyLevels:this.teacherMessage.literacyLevels,
            graduationTime:this.teacherMessage.graduationTime,
            graduationNum:this.teacherMessage.graduationNum,
            examineeId:this.teacherMessage.examineeId,
            className:this.teacherMessage.className,
          }, {"Content-Type": "application/json"}).then(function (response) {
            var data=response.body;
            if(data.result==1){
              this.modal2=true;
              this.messageStr='提交成功！';
            }
          });
        },
        handleFormatError: function(){
          this.$Message.error('文件格式错误！限制格式为'+this.$refs.uploadForTextbook.format,3);
        },
        handleSize: function(){
          this.$Message.error('文件大小超出范围！限制最大（KB）为'+this.$refs.uploadForTextbook.maxSize,3);
        },
        handleError: function(res){
          var msg = document.getElementsByClassName("ivu-message-notice");
          if(this.loadingMsg){
//            结束进度条
            this.$Loading.error();
//            移除“正在上传……”的msg
            if(!!window.ActiveXObject || "ActiveXObject" in window){
              //msg[0].parentNode.innerHTML = "";
//                IE浏览器对removeChild实现有问题
            }else{
              //msg[0].parentNode.removeChild(msg[0]);
            }
          }
          this.$Message.error('文件上传失败！'+res,3);
          this.loadingMsg = false;
        },
        handleProgress: function(){
          this.$Loading.start();
          this.$Message.loading('正在上传中……', 0);
          this.loadingMsg = true;
        },
        handleSuccess: function(res){
          this.$Loading.finish();
          var msg = document.getElementsByClassName("ivu-message-notice");
          if(!!window.ActiveXObject || "ActiveXObject" in window){
            //msg[0].parentNode.innerHTML = "";
          }else{
            //msg[0].parentNode.removeChild(msg[0]);
          }
          this.$Message.success('上传成功！',3);
          this.loadingMsg = false;
          var data=res;
          console.log(res);
          this.path=data.path;
          if(this.selected=="身份证照"){
            this.teacherMessage.iDcardPhoto=this.path;
          }else if(this.selected=="证件照"){
            this.teacherMessage.credentialsPhoto=this.path;
          }else if(this.selected=="生活照"){
            this.teacherMessage.livePhoto=this.path;
          }
        },
        numberCheck:function(str,message){//数字正则校验
          if(str==null){
            //nothing(未填写)
          }else {
            var reg = new RegExp("^[0-9]*$");
            if (!/^[0-9,.]*$/.test(str)) {
              this.modal2=true;
              this.messageStr=message;
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
    #selfInformation {
      min-height: 2.9rem;
      margin-bottom:1rem;
    }
    .tableBox{
      height:35rem;
      padding:1rem 5rem 2rem 5rem;
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
  .spanStyles{
    margin-left:5rem;

  }

</style>
