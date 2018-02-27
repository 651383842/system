<template>
  <!--登录页面-->
  <div id="login" :style="{ backgroundImage: 'url(' + img1 + ')' }" >
    <!--背景图片地址不能在css中设置，否则可能导致打包图片失败，这是因为vue会解析图片路径，在加载的时候使用解析过的路径，如果设置在css中,路径并不会被解析。在data中定义地址是最稳妥的。-->
    <div id="loginDiv" :style="{ backgroundImage: 'url(' + img2 + ')' }">
      <a href="http://www.samsph.com/hsxx/1092/1/"><img id="schoolImg" src="../../../assets/images/title.png" :alt="imgAlt" ></a>
      <p id="hospitalMottoP">厚德 至善 求精 图强</p>
      <p id="loginTitleP">用户登录</p>
      <span id="loginTipSpan">不清楚登录规则？请点击<span id="tipSpan" @click="modal1 = true">这里</span>查看</span>
      <div id="userNumDiv" class="inputDiv">
        <span class="inputSpan">帐号</span><br/>
        <input id="userNumInput" class="loginInput" type="text" v-model="userId">
      </div>
      <div id="passwordDiv" class="inputDiv">
        <span class="inputSpan">密码</span><br/>
        <input id="passwordInput" class="loginInput" type="password" v-model="passwordValue" @keyup.enter="loginClick()">
        <!--回车监听，触发登录按钮-->
      </div>
      <p></p>
      <p></p>
      <div>
        <button id="loginButton" @click="loginClick()" class="am-btn am-btn-success am-radius">登录</button>
        <span id="forgetSpan" @click="forgetPwClick">忘记密码？</span>
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
    <Modal
        v-model="modal1"
        width="400"
        id="modalBody">
      <div slot="header" style="font-size: 1rem;text-align: center;padding: 0.5rem 0;" id="modalHeader">
        <span>登录规则</span>
      </div>
      <div style="font-size: 0.9rem;text-align: left;">
        <p>用户帐号通过教师或学生信息生成，一般为学号或者职工号。</p>
        <p>密码限制为6-15位数字或字母的组合。</p>
        <p>找回功能必须预先设置邮箱。</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="modal1 = false">确定</button>
      </div>
    </Modal>
  </div>
</template>

<script>
    var CryptoJS = require("crypto-js");
//    相当于import加密js库
    export default {
        name: 'login',
        data () {
            return {
              imgAlt: '四川省医科科学院·四川省人民医院·护士学校',//学校图标
              img1: require('../../../assets/images/login-background.jpg'),//页面背景图片
              img2: require('./images/loginDiv.jpg'),//登录背景图片
              userId: '',//用户名
              passwordValue: '',//用户密码
              modal1: false,//登录规则
              modal: false, //错误提示对话框
              errorMessage: ""//错误提示
            }
        },
        beforeMount: function () {
          if(sessionStorage.getItem("userType") == "1"){
            location.href = '#/login/main/studentHome';
          }else if(sessionStorage.getItem("userType") != null){
            location.href = '#/login/main/eduAdminHome';
          }
        },//简单判断是否已经处于登录状态
        mounted: function() {
          var dom = document.getElementById("login");
          dom.style.height = window.innerHeight + "px";
        }, //dom加载后调整页面高度
        methods: {
          loginClick: function(){
            if(this.userNumValue == "" || this.passwordValue == "" ) {
//              验证输入是否为空
              this.errorMessage = "帐号或密码不能为空!";
              this.modal = true;
            }else{
              var a = CryptoJS.MD5(this.passwordValue + this.userId + "护士学校");
//              MD5加密前加盐
              a = a.toString().toUpperCase();
//              MD5加密，字母大写化
              function encrypt(data) {
                var key  = CryptoJS.enc.Latin1.parse('uestc2017nurse01');
                var iv   = CryptoJS.enc.Latin1.parse('10esrun7102ctseu');
                return CryptoJS.AES.encrypt(data, key, {iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding}).toString();
              }//AES加密函数
              this.$http.post('./login', {
                "userId": this.userId,
                "loginPwd": JSON.stringify(encrypt(a))
              }, {
                "Content-Type": "application/json"
              }).then(function (response) {
                if(response.body.result == "1"){
                  sessionStorage.setItem("userType", response.body.userType);
//                  登录成功，获取用户类型
                  sessionStorage.removeItem("lastClickRole");
//                  移除之前登录的帐号的首页角色最后一次选择记录
                  if(response.body.userType == "1"){
//                    根据用户类型跳转首页
                    location.href = '#/login/main/studentHome';
                  }else{
                    location.href = '#/login/main/eduAdminHome';
                  }
                }else{
//                  登录失败
                  this.errorMessage = "帐号或密码有误，请确认重试！";
                  this.modal = true;
                }
              }, function (error) {
                this.$Message.error('连接失败，请重试！',3);
              });
            }
          }, //登录验证
          forgetPwClick: function(){
            location.href='#/login/operation/forgetPassword';
          }//忘记密码,跳转到找回密码页面
        }
    }
</script>

<style scoped>
    #login{
      /*页面*/
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      min-height: 45.9rem;
      align-items: center;
      justify-content: center;
    }
    #loginDiv{
      /*登录模块*/
      width: 50%;
      height: 70%;
      min-height: 27rem;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      box-shadow: 0 0 0.5rem;
      display: flex;
      flex-direction: column;
      padding: 2rem 3rem;
      text-align: left;
    }
    #schoolImg{
      /*学校图标*/
      width: 21rem;
      height: 3rem;
    }
    #hospitalMottoP{
      /*医训*/
      color: #34B064;
    }
    #loginTitleP{
      /*用户登录*/
      font-size: 1.4rem;
    }
    #loginTipSpan{
      /*规则查看*/
      color: #727272;
      font-size: 0.8rem;
      position: relative;
      bottom: 1rem;
    }
    .inputDiv{
      /*帐号密码div*/
      border: none;
      text-align: left;
      height: 4rem;
      width: 15rem;
    }
    .loginInput{
      /*帐号密码输入框*/
      outline: none;
      border: thin solid #CECECE;
      height: 2.5rem;
      width: 15rem;
      font-size: 1rem;
    }
    #tipSpan{
      /*规则查看*/
      color: #00A64A;
    }
    #tipSpan:hover{
      cursor: pointer;
    }
    .inputSpan{
      /*帐号密码*/
      position: relative;
      top: 0.7rem;
      left: 1.5rem;
      background-color: white;
    }
    #loginButton{
      /*登录按钮*/
      min-width: 5rem;
      min-height: 2.3rem;
      width: 8rem;
    }
    #loginButton:hover{
      cursor: pointer;
    }
    #loginButton:active{
      background-color: green;
    }
    #forgetSpan{
      /*忘记密码*/
      font-size: 0.75rem;
      position: relative;
      left: 1rem;
    }
    #forgetSpan:hover{
      cursor: pointer;
    }
    @media screen and (max-width:1025px) {
      #login{
        /*页面*/
        display: flex;
        align-items: flex-start;
        justify-content: center;
        min-height: 114.75rem;
      }
      #loginDiv{
        /*登录模块*/
        margin-top: 7.5rem;
        width: 75%;
        height: 50%;
        padding: 5rem 7.5rem;
        box-shadow: 0 0 1.25rem;
        min-height: 67.5rem;
      }
      #schoolImg{
        /*学校图标*/
        width: 47.5rem;
        height: 6.25rem;
        position: relative;
        right: 6.25rem;
      }
      #hospitalMottoP{
        font-size: 2.67rem;
      }
      #loginTitleP{
        /*用户登录*/
        font-size: 3.75rem;
      }
      #loginTipSpan{
        /*规则查看*/
        font-size: 2.15rem;
        bottom: 2.5rem;
      }
      .inputDiv{
        /*帐号密码div*/
        height: 10rem;
        width: 37.5rem;
      }
      .loginInput{
        /*帐号密码输入框*/
        height: 6.25rem;
        width: 37.5rem;
      }
      input{
        font-size: 2.67rem;
        border-radius: 0.8rem;
        padding: 0.75rem 1.25rem;
      }
      .inputSpan{
        /*帐号密码*/
        font-size: 2.67rem;
        top: 1.75rem;
        left: 3.75rem;
      }
      #passwordDiv{
        margin-bottom: 6rem;
      }
      #loginButton{
        /*登录按钮*/
        min-width: 12.5rem;
        min-height: 5.75rem;
        height: 5.84rem;
        width: 20rem;
        padding: 1.5rem 2.75rem;
        border-radius: 0.8rem;
        line-height: 1.2;
        font-size: 2.67rem;
      }
      #forgetSpan{
        /*忘记密码*/
        font-size: 1.875rem;
        position: relative;
        left: 2.67rem;
      }
    }
</style>
