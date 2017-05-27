<template>
  <div id="textbookManagement_topBar">
    <div class="topBarDiv am-btn-group">
      <button id="topBarButton" class="am-btn am-btn-success btn-active" @click="hrefClick(1)">教材管理</button>
      <button class="am-btn am-btn-success" @click="hrefClick(2)">年级管理</button>
      <button class="am-btn am-btn-success" @click="hrefClick(3)">课程类型管理</button>
      <button class="am-btn am-btn-success" @click="hrefClick(4)">教室管理</button>
    </div>
    <div class="positionBar">
      <span>您的当前位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span> > <a href="#/login/main/eduAdminHome?baseSetting" class="returnHome">基本设置</a> > 资源管理设置 > 教材管理</span>
    </div>
    <div id="whiteDiv">
      <div id="buttonDiv">
        <span class="operationSpan"><form action="./textbookManage/exportTextbookInfoTemplet" method="get"><button class="am-btn am-btn-success am-radius" type="submit">下载模版</button></form></span>
        <span id="uploadSpan" class="operationSpan">
          <!--<button id="uploadButton" class="am-btn am-btn-success am-radius" @click="uploadClick">导入</button>-->
          <Upload
              id="upload"
              ref="uploadForTextbook"
              :show-upload-list="false"
              :format="['xls','xlsx']"
              :max-size="1024"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleSize"
              :on-success="handleSuccess"
              :on-progress="handleProgress"
              :on-error="handleError"
              action="./textbookManage/uploadTextbookInfo">
              <!--action="../updateTest/updata.php">-->
              <!--headers={"Content-Type":"multipart/form-data;charset=UTF-8"}>-->
            <i-button type="ghost" id="importButton">导入</i-button>
          </Upload>
        </span>
        <span class="operationSpan"><button id="downloadButton" class="am-btn am-btn-success am-radius" @click="downloadClick">导出</button></span>
      </div>
    </div>
    <Modal
        v-model="modal"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>文件内容格式有误：{{ errorInfo }}</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="modal = false">确定</button>
      </div>
    </Modal>
    <Modal
        v-model="modal1"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>{{ errorMessage }}</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="modal1 = false">确定</button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'textbookManagement_topBar',
    data () {
      return {
        errorInfo: '',
//        上传内容有误对话框提示
        modal: false,
        modal1: false,
//        对话框显隐
        errorMessage: ""
//        复用的对话框提示
      }
    },
    mounted: function(){
//      dom加载后改变上传插件默认的按钮样式
      var importButton = document.getElementById("importButton");
      importButton.className = "am-btn am-btn-success am-radius";
      try{
        var buttons = document.getElementById("textbookManagement_topBar").getElementsByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
//        console.log(this.authorityList);
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if(this.authorityList[i] == "27"){
            buttons[0].style.display = "block";
          }else if(this.authorityList[i] == "21"){
            buttons[1].style.display = "block";
          }else if(this.authorityList[i] == "65"){
            buttons[2].style.display = "block";
          }else if(this.authorityList[i] == "20"){
            buttons[3].style.display = "block";
          }
        }
      }catch(e){}
    },
    methods:{
      hrefClick: function (num) {
        if (num == 1) {
          location.href = "#/eduAdmin/baseSetting/resource/textbookMgmt"
        } else if (num == 2) {
          location.href = "#/eduAdmin/baseSetting/resource/eduAdminManageGrade"
        } else if (num == 3) {
          location.href = "#/eduAdmin/baseSetting/resource/courseTypeMgmt"
        } else if (num == 4) {
          location.href = "#/eduAdmin/baseSetting/resource/classroomMgmt"
        }
      },
      downloadClick: function(){
        location.href = "./textbookManage/exportTextbookInfo"
      },
      handleFormatError: function(){
//        this.$Message.error('文件格式错误！限制格式为'+this.$refs.uploadForTextbook.format,3);
        this.errorMessage = "文件格式错误！限制格式为"+this.$refs.uploadForTextbook.format;
        this.modal1 = true;
      },
      handleSize: function(){
//        this.$Message.error('文件大小超出范围！限制最大（KB）为'+this.$refs.uploadForTextbook.maxSize,3);
        this.errorMessage = "文件大小超出范围！限制最大（KB）为"+this.$refs.uploadForTextbook.maxSize;
        this.modal1 = true;
      },
      handleError: function(res){
        var msg = document.getElementsByClassName("ivu-message-notice");
        if(this.loadingMsg){
//            结束进度条
          this.$Loading.error();
//            移除“正在上传……”的msg
          if(!!window.ActiveXObject || "ActiveXObject" in window){
            msg[0].parentNode.innerHTML = "";
//                IE浏览器对removeChild实现有问题
          }else{
            msg[0].parentNode.removeChild(msg[0]);
          }
        }
//        this.$Message.error('文件上传失败！'+res,3);
        this.errorMessage = "文件上传失败！"+res;
        this.modal1 = true;
        this.loadingMsg = false;
      },
      handleProgress: function(){
        this.$Loading.start();
        this.$Message.loading('正在上传中……', 0);
        this.loadingMsg = true;
      },
      handleSuccess: function(res) {
        console.log(res);
        if (res.result == 1) {
          this.$Loading.finish();
          var msg = document.getElementsByClassName("ivu-message-notice");
          if (!!window.ActiveXObject || "ActiveXObject" in window) {
            msg[0].parentNode.innerHTML = "";
          } else {
            msg[0].parentNode.removeChild(msg[0]);
          }
          this.$Message.success('上传成功！3s后自动刷新页面！', 3);
          console.log(res);
          this.loadingMsg = false;
          setTimeout("location.reload(true)", 4000);
        }else{
          this.$Loading.error();
          var msg = document.getElementsByClassName("ivu-message-notice");
          if (!!window.ActiveXObject || "ActiveXObject" in window) {
            msg[0].parentNode.innerHTML = "";
          } else {
            msg[0].parentNode.removeChild(msg[0]);
          }
          this.loadingMsg = false;
          this.errorInfo = res.result;
          this.modal = true;
        }
      }
    }
  }
</script>

<style scoped>
  html {
  }
  #topBarButton{
    margin-left: 5rem;
  }
  #buttonDiv{
    /*按钮*/
    display: flex;
    margin: 0 5rem;
    align-items: center;
    justify-content: center;
    padding-top: 0.3rem;
  }
  .positionBar{
    /*首页导航*/
    position: absolute;
  }
  #whiteDiv{
    /*按钮外层区域*/
    background-color: white;
    text-align: center;
    padding-bottom: 0.5rem;
  }
  #uploadSpan{
    /*上传按钮外层*/
    position: relative;
  }
  .operationSpan{
    /*按钮*/
    margin-right: 1.6rem;
  }
  @media screen and (max-width: 1023px) {
    html {
    }
  }
</style>

