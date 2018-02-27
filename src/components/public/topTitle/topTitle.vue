<template>
  <div id="topTitleDiv">
    <a :href="imgHref"><img id="schoolImg" src="./images/title.png" :alt="imgAlt" ></a>
    <div id="userExitDiv">
      <a id="user" :href="userHref">您好,{{ userName }}!</a>
      <span style="font-size: 0.8rem;margin-left: 0.5rem;color: red">{{ emailStatus }}</span>
      <a><img id="exitImg" src="./images/exit.png" alt="exitAlt" @click="modal = true" title="退出"></a>
      <Modal
          v-model="modal"
          width="400"
          :mask-closable="false"
          id="modalBody"
          :styles="{top:'10rem'}">
        <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
        <div slot="header" style="font-size: 1rem;text-align: center;padding: 0.5rem 0;" id="modalHeader">
          <span>注销登录</span>
        </div>
        <div style="font-size: 0.9rem;text-align: left;">
          <p>您确定要注销并返回登录页面？</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="exitAlert">确定</button>
          <button id="modalBtn" @click="modal = false">取消</button>
        </div>
      </Modal>
      <Modal
          v-model="modal1"
          width="400"
          :mask-closable="false"
          id="modalBody"
          :styles="{top:'10rem'}">
        <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
        <div style="font-size: 1.1rem;text-align: center;">
          <p>{{ errorMessage }}</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="modal1 = false">确定</button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'topTitleDiv',
    data () {
      return {
        imgHref: 'http://www.samsph.com/hsxx/1092/1/',//医院官网
        userHref: '',//点击用户欢迎信息跳转
        userName: '',//显示用户名
        imgAlt: '四川省医科科学院·四川省人民医院',
        exitAlt: '退出图标',
        modal: false,//对话框显隐
        modal1: false,
        errorMessage: "",//对话框内容
        emailStatus: "",//邮箱填写提示
      }
    },
    beforeMount: function() {
      this.$http.post('./getCurrentUser',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        if (sessionStorage.getItem("userType") == "1") {
//          根据用户类型，设置用户欢迎信息点击跳转
          this.userHref = "#/student/setting/studentInformation";
        } else {
          this.userHref = "#/teacher/personInfo/basicMessage";
        }
        if (response.body.emailStatus == 0) {
//          邮箱未填写安全提示
          this.emailStatus = "您的邮箱未填写，无法使用密码找回功能，为了您的帐号安全，请尽快填写邮箱地址！";
        }
        this.userName = response.body.currentUserName + "(" + response.body.currentUserId + ") ";
//        显示用户名信息
        sessionStorage.setItem("userInfo", JSON.stringify(response.body));
//        保存用户信息
      },function(error){
      });
    },
    methods: {
      exitAlert: function () {
        this.$http.post('./logout',{},{
          "Content-Type":"application/json"
        }).then(function(response){
//          注销成功，移除用户类型纪录，移除用户角色最后一次点击选择纪录，移除用户具体信息纪录
          sessionStorage.removeItem("userType");
          sessionStorage.removeItem("lastClickRole");
          sessionStorage.removeItem("userInfo");
          location.href = "#/login";
//          跳转到登录页面
        },function(error){
          this.$Message.error('连接失败，请重试！',3);
        });
      }//注销登录
    }
  }
</script>

<style scoped>
  a{
    text-decoration: none;
  }
  #topTitleDiv{
    text-align: left;
    background-color: white;
    margin: 0 5rem;
    display: flex;
    justify-content: space-between;
  }
  #schoolImg{
    /*学校图标*/
    height: 3rem;
    /*border-right: 0.1rem solid whitesmoke;*/
  }
  #userExitDiv{
    /*用户姓名与退出*/
    display: flex;
    align-items: center;
    margin-left: 5rem;
  }
  #user{
    /*用户姓名 */
    color: black;
    text-decoration: none;
    font-size: 1rem;
  }
  #exitImg{
    /*退出图标*/
    position: relative;
    top: 0.2rem;
    padding-left: 0.7rem;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
  @media screen and (max-width:1025px){
    html{
      font-size: 56%;
    }
  }
</style>
