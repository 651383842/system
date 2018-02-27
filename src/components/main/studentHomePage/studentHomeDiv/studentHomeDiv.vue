<template>
  <div id="studentHomeDiv">
    <div id="menuDiv">
      <p style="margin-left: 0.5rem">公告：</p>
      <div id="announcementDiv">
        <!--制造边框-->
        <ul id="nameUl">
          <li v-for="announcement in announcementList" :class="announcement.announcementType" :title="announcement.announcementName"  @click="announcementClick(announcement.announcementId)">
            <span class="announcementName">{{ announcement.announcementName }}</span><span>[{{ announcement.announcementTime }}]</span>
          </li>
        </ul>
      </div>

      <button class="am-btn am-btn-success am-radius" id="backButton" @click="modal1 = true" v-if="isSuspend">申请复学</button>
      <Modal
          v-model="modal1"
          width="400"
          :mask-closable="false"
          id="modalBody"
          :styles="{top:'10rem'}">
        <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
        <div slot="header" style="font-size: 1rem;text-align: center;padding: 0.5rem 0;" id="modalHeader">
          <span>申请复学</span>
        </div>
        <div style="font-size: 0.9rem;">
          您确定要申请复学吗？
        </div>
        <div slot="footer" style="text-align: center">
          <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
          <button id="modalBtn" @click="back()">确定</button>
          <button id="modalBtn" @click="modal1 = false">取消</button>
        </div>
      </Modal>
    </div>
    <div id="pageDiv">
      信息查询
      <div id="firstDiv" class="pageDiv">
        <span class="pageSpan">
          <ul>
            <a href="#/student/query/studentLesson"><img src="./images/课表查询.png" class="pageImg"><li>课表查询</li></a>
          </ul>
        </span>
        <span class="pageSpan">
          <ul>
            <a href="#/student/query/studentTestInfo"><img src="./images/考场查询.png" class="pageImg"><li>考场查询</li></a>
          </ul>
        </span>
        <span class="pageSpan">
          <ul>
            <a href="#/student/query/stInquireGrade"><img src="./images/成绩查询.png" class="pageImg"><li>成绩查询</li></a>
          </ul>
        </span>
        <span class="pageSpan">
          <ul>
            <a href="#/student/query/studentTeacher"><img src="./images/任课教师信息.jpg" class="pageImg"><li>任课教师信息</li></a>
          </ul>
        </span>
      </div>
      信息设置
      <div id="secondDiv" class="pageDiv">
        <span class="pageSpan">
          <ul>
            <a href="#/student/setting/studentInformation"><img src="./images/个人信息维护.jpg" class="pageImg"><li>个人信息维护</li></a>
          </ul>
        </span>
        <span class="pageSpan">
          <ul>
            <a href="#/student/setting/changPassword"><img src="./images/修改密码.jpg" class="pageImg"><li>修改密码</li></a>
          </ul>
        </span>
      </div>
      学生评教
      <div id="thirdDiv" class="pageDiv">
        <span class="pageSpan">
          <ul>
            <a href="#/student/studentEvaluation"><img src="./images/学生评教.png" class="pageImg"><li>评教提交</li></a>
          </ul>
        </span>
      </div>
    </div>
    <Modal
        v-model="modal"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
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
  export default {
    name: 'studentHomeDiv',
    data () {
      return {
        announcementList: [],
//        公告信息
        quitSchoolList:[],
//        休学学生信息
        isSuspend: false,
//        是否处于休学状态
        modal: false,
        modal1: false,
//        对话框显隐
        errorMessage: "",
//        对话框内容
      }
    },
    beforeMount: function () {
      this.$http.post('./announcementManage/getAllAnnouncement',{},{
        "Content-Type":"application/json"
      }).then(function(response){
//        获取公告信息
        this.announcementList = response.body.announcementList;
        this.announcementList = this.announcementList.reverse();
//        公告颠倒顺序，使最新的公告显示在前面
        if(this.announcementList.length == 0){
//          如果没有公告，填充一条空公告，减少公告区域布局变形
          this.announcementList.push({
            "announcementId": "null",
            "announcementName": "……",
            "announcementContent": "null",
            "announcementTime": "",
            "announcementType": "null"
          })
        }
      },function(error){
        this.$Message.error('连接失败，请重试！');
        if(this.announcementList.length == 0){
//          如果没有公告，填充一条空公告，减少公告区域布局变形
          this.announcementList.push({
            "announcementId": "null",
            "announcementName": "……",
            "announcementContent": "null",
            "announcementTime": "…",
            "announcementType": "null"
          })
        }
      });

      this.$http.post('./getPermissionByUser',{},{
//      this.$http.post('../testPhp/getPermissionByUser.php',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        sessionStorage.setItem("authorityList", JSON.stringify(response.body.currentPermissionList));
      },function(error){
        this.$Message.error('连接失败，请重试！');
      });
    },
    mounted: function() {
//      dom加载后调整页面高度
      var dom = document.getElementById("studentHomeDiv");
      dom.style.minHeight = window.innerHeight*0.92 + "px";

      this.$http.post('./stateManage/getQuitSchoolList',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        var isSuspend = false;
        this.quitSchoolList = response.body.quitSchoolList;
//        获取休学学生列表
        if(sessionStorage.getItem("userInfo") == null){
//          如果没有用户信息，向后端获取用户信息
          this.$http.post('./getCurrentUser',{},{
            "Content-Type":"application/json"
          }).then(function(response){
            for (var i = 0; i < this.quitSchoolList.length; i++) {
              if (this.quitSchoolList[i].studentId == response.body.currentUserId) {
//                判断当前用户是否休学
                isSuspend = true;
                break;
              }
            }
            if (isSuspend) {
              this.isSuspend = true;
//              显示复学申请按钮
            } else {
              this.isSuspend = false;
//              隐藏复学申请按钮
            }
          },function(error){
          });
        }else {
          for (var i = 0; i < response.body.quitSchoolList.length; i++) {
            if (response.body.quitSchoolList[i].studentId == JSON.parse(sessionStorage.getItem("userInfo")).currentUserId) {
//                判断当前用户是否休学
              isSuspend = true;
              break;
            }
          }
          if (isSuspend) {
            this.isSuspend = true;
//              显示复学申请按钮
          } else {
            this.isSuspend = false;
//              隐藏复学申请按钮
          }
        }
      },function(error){});//
    },
    methods: {
      announcementClick: function (id) {
        if(id != "null") {
          location.href = "#/eduAdmin/information/notifyInformation?Id=" + id+'&Type=Stu';
        }
      },//公告点击跳转详情
      back: function () {
        this.$http.post('./stateManage/applyReinstating',{
          "studentId":JSON.parse(sessionStorage.getItem("userInfo")).currentUserId
        },{
          "Content-Type":"application/json"
        }).then(function(response){
          if(response.body.result == "1"){
            this.errorMessage = "申请成功，请耐心等候教务审批，通过后将分配新的班级，请密切留意个人信息的变化！";
            this.isSuspend = false;
            this.modal1 = false;
//            隐藏原有对话框，显示操作提示对话框
            this.modal = true;
          }else{
            this.errorMessage = "申请失败，请重试！";
            this.modal = true;
          }
        },function(error){
        });
      },//复学申请
    }
  }
</script>

<style scoped>
  #studentHomeDiv {
    /*页面*/
    background-color: white;
    display: flex;
    border: thin solid whitesmoke;
    border-top: thin solid #DCDCDC;
    overflow-x: hidden;
  }
  #menuDiv{
    /*左侧功能栏*/
    width: 15rem;
    height: inherit;
    background-color: #EEF3FA;
    border: thin solid #EEF3FA;
  }
  #pageDiv{
    /*功能块区域*/
    width: 75%;
    height: 100%;
    padding: 2rem;
    margin-left: 2rem;
    font-weight: bold;
  }
  .pageDiv{
    /*功能块区域*/
    display: flex;
    justify-content: flex-start;
    margin: 1rem 0;
  }
  .pageSpan{
    /*功能块*/
    width: 15%;
    font-weight: normal;
    cursor: pointer;
    border: thick solid #E9ECF2;
    /*width: 10rem;*/
    height: 7.5rem;
    margin: 0.7rem 2.5rem;
    background-color: transparent;
    text-align: center;
    border-image:-webkit-linear-gradient(-45deg, #A7C8D9,#B2E9D5) 30 30;
    border-image:-moz-linear-gradient(-45deg,#A7C8D9,#B2E9D5) 30 30;
    border-image:linear-gradient(-45deg,#A7C8D9,#B2E9D5) 30 30;
    box-shadow: 0.2rem 0.2rem 0.5rem 0.1rem grey;
  }
  ul{
    margin: 0.5rem 0 0 0;
    padding: 0;
  }
  a{
    text-decoration: none;
    color: black;
  }
  a:hover{
    cursor: pointer;
    color: red;
  }
  .announcementName{
    /*公告*/
    width: 8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }
  #announcementDiv{
    /*公告区域*/
    display: flex;
    padding: 0.5rem;
    width: 95%;
    height: 70%;
    position: relative;
  }
  #nameUl{
    /*公告列表*/
    overflow-y: auto;
  }
  #nameUl li{
    line-height: 1.5rem;
    display: flex;
    font-size: 0.9rem;
  }
  #nameUl li span{
    display: inline-block;
  }
  #nameUl li:hover{
    text-decoration: underline;
    color: #0DA3E2;
    cursor: pointer;
  }
  #backButton{
    /*复学申请按钮*/
    margin-left: 30%;
    margin-top: 0.5rem;
  }
  .pageImg{
    /*功能模块*/
    font-weight: 400;
    font-size: 0.7rem;
    height: 5rem;
    width: 5rem;
  }
  @media screen and (max-width: 1025px) {
    html {
    }
  }
</style>
