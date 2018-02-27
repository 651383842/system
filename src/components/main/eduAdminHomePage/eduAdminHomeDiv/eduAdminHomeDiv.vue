 <template>
  <div id="eduAdminHomeDiv">
    <div id="menuDiv">
      <!--角色类型列表，显示当前用户拥有所有角色-->
      <Menu
          ref="roleMenu"
          id="menu"
          :active-name="activeName"
          @on-select="roleChange"
          width="auto">
        <Menu-group title="角色类型">
          <Menu-item v-for="(role,index) in roleList" :name="role.roleId" :key="role.roleId">
            {{ role.roleName }}
          </Menu-item>
        </Menu-group>
      </Menu>
      <!--iview的菜单组件-->

      <button class="am-btn am-btn-success am-radius" id="termStartButton" @click="setTermStartTime" v-if="isEduAdmin">设置学期开始时间</button>
      <button class="am-btn am-btn-success am-radius" id="evaluationStartButton" @click="modal2 = true" v-if="isEduAdmin">设置评教起止时间</button>
      <button class="am-btn am-btn-success am-radius" id="gradeStartButton" @click="modal3 = true" v-if="isEduAdmin">设置成绩录入时间</button>
      <Modal
          v-model="modal1"
          width="400"
          :mask-closable="false"
          id="modalBody"
          :styles="{top:'10rem'}">
        <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
        <div slot="header" style="font-size: 1rem;text-align: center;padding: 0.5rem 0;" id="modalHeader">
          <!--对话框页头标题栏-->
          <span>设置学期开始时间</span>
        </div>
        <div style="font-size: 0.9rem;">
          <!--对话框主体-->
          <div style="display: flex;align-items: center;justify-content: center;margin: 0.9rem 0">选择学年：
            <select clearable  style="width: 12rem" v-model="selYear" @change="setTermStartTimeChange">
              <option value="" selected="selected">请选择学年</option>
              <option v-for="sem in yearSemester" :value="sem.semValue" :key="sem.semValue">{{sem.semName}}</option>
            </select>
          </div>
          <div style="display: flex;align-items: center;justify-content: center">第一学期：
            <Row>
              <Col span="12">
                <DatePicker  v-model="firstDate" format="yyyy年MM月dd日" type="date" placeholder="选择日期" style="width: 12rem"></DatePicker >
              </Col>
            </Row>
          </div>
          <div style="display: flex;align-items: center;justify-content: center;margin-top: 1rem">第二学期：
            <Row>
              <Col span="12">
                <DatePicker  v-model="secondDate" format="yyyy年MM月dd日" type="date" placeholder="选择日期" style="width: 12rem"></DatePicker >
              </Col>
            </Row>
          </div>
          <div style="margin-top: 1rem">
            <span v-show="termStartTimeBool" style="margin: 1rem 1rem;color: #ff3300">{{selYear}}学年的开学时间都已设置</span>
          </div>
        </div>
        <div slot="footer" style="text-align: center">
          <!--对话框页脚按钮区域-->
          <button id="modalBtn" @click="termStart()">确定</button>
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
        <div slot="header" style="font-size: 1rem;text-align: center;padding: 0.5rem 0;" id="modalHeader">
          <!--对话框页头标题栏-->
          <span>设置评教起止时间</span>
        </div>
        <div style="font-size: 0.9rem;display: flex;flex-direction: column;align-items: center">
          <!--对话框主体-->
          <span style="margin-bottom: 0.5rem" v-text="latelyEvaTime"></span>
          <Row>
            <Col span="12">
            <Date-picker v-model="evaluationDate" format="yyyy年MM月dd日" type="daterange" placeholder="选择日期" style="width: 20rem"></Date-picker>
            </Col>
          </Row>
        </div>
        <div slot="footer" style="text-align: center">
          <!--对话框页脚按钮区域-->
          <button id="modalBtn" @click="evaluationStart()">确定</button>
          <button id="modalBtn" @click="modal2 = false">取消</button>
        </div>
      </Modal>
      <Modal
          v-model="modal3"
          width="400"
          :mask-closable="false"
          id="modalBody"
          :styles="{top:'10rem'}">
        <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
        <div slot="header" style="font-size: 1rem;text-align: center;padding: 0.5rem 0;" id="modalHeader">
          <!--对话框页头标题栏-->
          <span>设置成绩录入时间</span>
        </div>
        <div style="font-size: 0.9rem;display: flex;flex-direction: column;align-items: center">
          <!--对话框主体-->
          <span style="margin-bottom: 0.5rem" v-text="latelyGradeTime"></span>
          <Row>
            <Col span="12">
            <Date-picker v-model="gradeDate" format="yyyy年MM月dd日" type="daterange" placeholder="选择日期" style="width: 20rem"></Date-picker>
            </Col>
          </Row>
        </div>
        <div slot="footer" style="text-align: center">
          <!--对话框页脚按钮区域-->
          <button id="modalBtn" @click="gradeStart()">确定</button>
          <button id="modalBtn" @click="modal3 = false">取消</button>
        </div>
      </Modal>
    </div>
    <div id="pageDiv">
      <div id="topFuncDiv">
        <span class="pageSpan" v-for="(authorityModel,index) in authorityModels" @click="inFuncClick(index)">
          <Tooltip placement="right" :disabled="authorityModel.disabled">
            <Badge :count="authorityModel.msgNum">
              <img class="modelImg" src="" :alt="authorityModel.name"><div>{{ authorityModel.name }}</div>
            </Badge>
            <div slot="content" style="color: black">
              <p v-html="authorityModel.msgNumTips"></p>
            </div>
          </Tooltip>
          <!--tooltip为气泡提示，badge为徽标提示，用于未处理信息提示。-->
        </span>
      </div>
      <!--功能块-->
    </div>
    <div id="announcementDiv">
      <span id="topSpan"></span>
      <!--制造边框-->
      <ul id="nameUl">
        <li v-for="announcement in announcementList" :class="announcement.announcementType" :title="announcement.announcementName"  @click="announcementClick(announcement.announcementId)">
          <span class="announcementName">{{ announcement.announcementName }}</span><span>[{{ announcement.announcementTime }}]</span>
        </li>
      </ul>
      <!--公告-->
      <span id="bottomSpan"></span>
      <!--制造边框-->
      <p id="detail"><a href="#/eduAdmin/information/noticeManage">详情</a></p>
    </div>
    <Back-top :height="100" :bottom="50"></Back-top>
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
  export default {
    name: 'eduAdminHomeDiv',
    data () {
      return {
        baseImg: require("./images/基本设置.png"),
        manageImg: require("./images/教务审批.png"),
        courseImg: require("./images/智能排课.png"),
        informationImg: require("./images/教务公告.png"),
        gradeManageImg: require("./images/成绩管理.png"),
        directionImg: require("./images/教务督导管理.png"),
        eduAdminManageImg: require("./images/考务管理.png"),
        emolumentImg: require("./images/课酬管理.png"),
        personImg: require("./images/培养方案管理.png"),
        resourceImg: require("./images/人员管理设置.png"),
        checkCourseImg: require("./images/课表查询.png"),
        roleImg: require("./images/权限管理.png"),
        myCourseImg: require("./images/我的课程.jpg"),
        teachImg: require("./images/教学活动.png"),
        personInfoImg: require("./images/个人信息维护.jpg"),
        groupImg: require("./images/组别管理.png"),
        classImg: require("./images/班级管理.png"),
        directionResultImg: require("./images/督导反馈.png"),
//        功能块图标地址
        roleList: [
          /*{roleId: 3,roleName:"教务"},
          {roleId: 2,roleName:"教师"}*/
        ],
//        角色列表
        authorityList: [],
//        权限id列表
        authorityModels: [],
//        一级功能列表
        activeName: "",
//        当前选中角色
        announcementList: [],
        yearSemester:[],
        selYear:'',
//        公告信息
        isEduAdmin: false,
//        时间设置功能按钮显隐
        modal: false,
        modal1: false,
        modal2: false,
        modal3: false,
//        对话框显隐
        errorMessage: "",
        startSchoolTimeList:[
        ],
        termStartTimeBool:false,
//        对话框内容
        firstDate: "",
//        第一学期开始时间
        secondDate: "",
//        第二学期开始时间
        dateError: "",
//        学期设置失败回调
        evaluationDate: null,
//        评教起止时间
        gradeDate: null,
//        成绩录入起止时间
        latelyEvaTime: "",
//        最近的评教时间
        latelyGradeTime: "",
//        最近的成绩录入时间
      }
    },
    beforeMount: function() {
      this.generateSemester();
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
        "Content-Type":"application/json"
      }).then(function(response){
        sessionStorage.setItem("authorityList", JSON.stringify(response.body.currentPermissionList));
//        保存用户权限列表
      },function(error){
        this.$Message.error('连接失败，请重试！');
      });
    }, //页面dom加载前获取后端数据
    mounted: function() {
//      dom加载后调整页面高度
      var dom = document.getElementById("eduAdminHomeDiv");
      dom.style.minHeight = window.innerHeight*0.92 + "px";

      this.$http.post('./getCurrentUser',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        for (var i = 0; i < response.body.currentRoleList.length; i++) {
          if(response.body.currentRoleList[i].roleId == 1){
//            如果用户角色为学生，跳转到学生首页
            location.href = '#/login/main/studentHome';
          }
        }
        this.roleList = response.body.currentRoleList;
//        获取角色列表
        this.$nextTick(function () {
//          vue视图更细回调，确保角色列表更新完成
          try {
            if(sessionStorage.getItem("lastClickRole") != null){
//              判断是否有用户最后一次角色选中纪录
              this.roleChange(parseInt(sessionStorage.getItem("lastClickRole")));
//              触发角色切换
            }else{
//              没有用户最后一次角色选中纪录。默认选中第一个角色
              this.roleChange(this.roleList[0].roleId);
            }
          }catch (e){}
        });
      },function(error){});
    },//获取角色列表，如果有最后一次点击纪录就点击对应角色，否则点击第一个角色
    watch:{
      activeName: function () {
//        监听角色选择绑定的变化，生成一级功能块
        if(this.activeName == 3){
//          判断是否为教务角色，是则显示三个时间设置按钮
          this.isEduAdmin = true;
        }else{
//          判断是否为教务角色，不是则隐藏三个时间设置按钮
          this.isEduAdmin = false;
        }
        this.$http.post('./getRoleAuthority',{
          "roleId": this.activeName
        },{
          "Content-Type":"application/json"
        }).then(function(response){
//          获取相中角色的权限
          this.authorityList = response.body.getRoleAuthorityList.authorityIdList;
          this.authorityModels = [];
//          根据权限显示功能模块，msgNum为未处理信息数量，disabled为数量信息提示是否禁用，index为功能显示优先级
          for (var i = 0; i < this.authorityList.length; i++) {
//            生成功能块列表
            if(this.authorityList[i] == "17" || this.authorityList[i] == "12" || this.authorityList[i] == "13" || this.authorityList[i] == "11" || this.authorityList[i] == "8" || this.authorityList[i] == "62" || this.authorityList[i] == "30") {
              var isExist = false;
//              判断是否重复生成
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "教务审批") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"教务审批", msgNum:"0", disabled:true, index:1 });
              }
            }else if(this.authorityList[i] == "14" || this.authorityList[i] == "9" || this.authorityList[i] == "7") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "智能排课") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"智能排课", msgNum:"0", disabled:true, index:2 });
              }
            }else if(this.authorityList[i] == "19") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "教务公告") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"教务公告", msgNum:"0", disabled:true, index:3 });
              }
            }else if(this.authorityList[i] == "28" || this.authorityList[i] == "29" || this.authorityList[i] == "31" || this.authorityList[i] == "32") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "成绩管理") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"成绩管理", msgNum:"0", disabled:true, index:4 });
              }
            }else if(this.authorityList[i] == "34") {
              this.authorityModels.push({ name:"教务督导管理", msgNum:"0", disabled:true, index:5 });
            }else if(this.authorityList[i] == "10") {
              this.authorityModels.push({ name:"考务管理", msgNum:"0", disabled:true, index:6 });
            }else if(this.authorityList[i] == "5" || this.authorityList[i] == "66" || this.authorityList[i] == "22") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "课酬管理") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"课酬管理", msgNum:"0", disabled:true, index:7 });
              }
            }else if(this.authorityList[i] == "15" || this.authorityList[i] == "16") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "培养方案管理") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"培养方案管理", msgNum:"0", disabled:true, index:8 });
              }
            }else if(this.authorityList[i] == "24" || this.authorityList[i] == "23" || this.authorityList[i] == "26" || this.authorityList[i] == "64") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "人员管理设置") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"人员管理设置", msgNum:"0", disabled:true, index:9 });
              }
            }else if(this.authorityList[i] == "27" || this.authorityList[i] == "21" || this.authorityList[i] == "65" || this.authorityList[i] == "20") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "资源管理设置") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"资源管理设置", msgNum:"0", disabled:true, index:10 });
              }
            }else if(this.authorityList[i] == "6") {
              this.authorityModels.push({ name:"课表查询", msgNum:"0", disabled:true, index:11 });
            }else if(this.authorityList[i] == "1" || this.authorityList[i] == "2") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "权限管理") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"权限管理", msgNum:"0", disabled:true, index:12 });
              }
            }else if(this.authorityList[i] == "39" || this.authorityList[i] == "42" || this.authorityList[i] == "41" || this.authorityList[i] == "40" || this.authorityList[i] == "38") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "我的课程") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"我的课程", msgNum:"0", disabled:true, index:13 });
              }
            }else if(this.authorityList[i] == "37" || this.authorityList[i] == "36" || this.authorityList[i] == "67" || this.authorityList[i] == "63" || this.authorityList[i] == "25") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "教学活动") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"教学活动", msgNum:"0", disabled:true, index:14 });
              }
            }else if(this.authorityList[i] == "33") {
              this.authorityModels.push({ name:"成绩管理", msgNum:"0", disabled:true, index:15 });
            }else if(this.authorityList[i] == "35") {
              this.authorityModels.push({ name:"课酬管理", msgNum:"0", disabled:true, index:16 });
            }else if(this.authorityList[i] == "43") {
              this.authorityModels.push({ name:"个人信息", msgNum:"0", disabled:true, index:17 });
            }else if(this.authorityList[i] == "52") {
              this.authorityModels.push({ name:"督导反馈", msgNum:"0", disabled:true, index:18 });
            }else if(this.authorityList[i] == "54") {
              this.authorityModels.push({ name:"班级管理", msgNum:"0", disabled:true, index:19 });
            }else if(this.authorityList[i] == "56" || this.authorityList[i] == "55") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "组别管理") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"组别管理", msgNum:"0", disabled:true, index:20 });
              }
            }
          }
          var sortA = [];
          var sortB = [];
          for (var i = 0; i < this.authorityModels.length; i++) {
//            获取功能显示优先级
            sortA.push(this.authorityModels[i].index);
          }
          sortA = sortA .sort (function(a,b){return a-b});
//          根据优先级先后重新进行排序
          for (var i = 0; i < sortA.length; i++) {
            for (var j = 0; j < this.authorityModels.length; j++) {
              if(this.authorityModels[j].index == sortA[i]){
                sortB.push(JSON.parse(JSON.stringify(this.authorityModels[j])));
              }
            }
          }
//            根据排好的顺序重新显示功能模块
          this.authorityModels = JSON.parse(JSON.stringify(sortB));
          this.$nextTick(function(){
//            功能模块视图更新回调，触发图片对应显示和未处理数量提示
            var img = document.getElementById("topFuncDiv").getElementsByTagName("img");
            for (var i = 0; i < img.length; i++) {
//              根据功能模块匹配图标
              if (img[i].alt == "教务审批") {
                img[i].src = this.manageImg;
              } else if (img[i].alt == "智能排课") {
                img[i].src = this.courseImg;
              } else if (img[i].alt == "教务公告") {
                img[i].src = this.informationImg;
              } else if (img[i].alt == "成绩管理") {
                img[i].src = this.gradeManageImg;
              } else if (img[i].alt == "教务督导管理") {
                img[i].src = this.directionImg;
              } else if (img[i].alt == "考务管理") {
                img[i].src = this.eduAdminManageImg;
              } else if (img[i].alt == "课酬管理") {
                img[i].src = this.emolumentImg;
              } else if (img[i].alt == "培养方案管理") {
                img[i].src = this.personImg;
              } else if (img[i].alt == "人员管理设置") {
                img[i].src = this.resourceImg;
              } else if (img[i].alt == "资源管理设置") {
                img[i].src = this.baseImg;
              } else if (img[i].alt == "课表查询") {
                img[i].src = this.checkCourseImg;
              } else if (img[i].alt == "权限管理") {
                img[i].src = this.roleImg;
              } else if (img[i].alt == "我的课程") {
                img[i].src = this.myCourseImg;
              } else if (img[i].alt == "教学活动") {
                img[i].src = this.teachImg;
              } else if (img[i].alt == "个人信息") {
                img[i].src = this.personInfoImg;
              } else if (img[i].alt == "班级管理") {
                img[i].src = this.classImg;
              } else if (img[i].alt == "组别管理") {
                img[i].src = this.groupImg;
              } else if (img[i].alt == "督导反馈") {
                img[i].src = this.directionResultImg;
              } else{
                img[i].src = this.baseImg;
              }
            }
            this.$http.post('./getTipsNum',{},{
              "Content-Type":"application/json"
            }).then(function(response){
//              获取未处理信息数量，启用对应信息提示
              for (var i = 0; i < this.authorityModels.length; i++) {
                if(this.authorityModels[i].name == "人员管理设置"){
                  this.authorityModels[i].msgNum = response.body.applyQuitStudentNum + response.body.applyDropStudentNum + response.body.applyReinstatingStudentNum;
                  this.authorityModels[i].msgNumTips = "休学申请："+ response.body.applyQuitStudentNum +"<br>退学申请："+ response.body.applyDropStudentNum +"<br>复学申请："+ response.body.applyReinstatingStudentNum;
                  this.authorityModels[i].disabled = false;
                }else if(this.authorityModels[i].name == "教务审批"){
                  this.authorityModels[i].msgNum = response.body.makeupNum + response.body.teacherApplyNumber+response.body.stopCourseNum+
                    response.body.makeUpAskNum+response.body.teachPlanNum+response.body.alternateLessionNum;
                  this.authorityModels[i].msgNumTips = "教学计划审批："+ response.body.teachPlanNum +"<br>调课申请："+ response.body.alternateLessionNum+"<br>补课申请："+ response.body.makeupNum +
                    "<br>停课申请："+ response.body.stopCourseNum+ "<br>禁排申请："+ response.body.teacherApplyNumber+"<br>补考申请："+ response.body.makeUpAskNum;
                  this.authorityModels[i].disabled = false;
                }else if(this.authorityModels[i].name == "督导反馈"){
                  this.authorityModels[i].msgNum = response.body.noCheckSupNum;
                  this.authorityModels[i].msgNumTips = "未确认的任务："+ response.body.noCheckSupNum;
                  this.authorityModels[i].disabled = false;
                }else{
                  this.authorityModels[i].disabled = true;
                }
              }
            },function(error){
            });
          });
        },function(error){
//          测试代码
          /*this.authorityList = [];
          this.authorityModels = [];
          for (var i = 0; i < 70; i++) {
            this.authorityList.push(i);
          }*/
        });
        sessionStorage.setItem("lastClickRole", this.activeName);
//        记录最后一次点击角色
      },//监听角色选中变化
      modal2: function () {
        if(this.modal2){
//          判断对话框是否开启
          this.$http.post('./getEvaTime',{},{
            "Content-Type":"application/json"
          }).then(function(response){
//            获取最近评教时间进行显示
            if(response.body.result == "1") {
              this.latelyEvaTime = "最近的评教时间为：" + response.body.evaTime.startEvaTeachTime + "到" + response.body.evaTime.endEvaTeachTime;
            }else if(response.body.result == "0") {
              this.latelyEvaTime = "";
            }
          },function(error){
          });
        }
      },//监听评教时间设置对话框是否开启
      modal3: function () {
        if(this.modal3){
//          判断对话框是否开启
          this.$http.post('./getScoreInputTime',{},{
            "Content-Type":"application/json"
          }).then(function(response){
//            获取最近成绩录入时间进行显示
            if(response.body.result == "1") {
              this.latelyGradeTime = "最近的成绩录入时间为：" + response.body.scoreInputTime.startScoreInputTime + "到" + response.body.scoreInputTime.endScoreInputTime;
            }else if(response.body.result == "0") {
              this.latelyGradeTime = "";
            }
          },function(error){
          });
        }
      },//监听成绩录入时间设置对话框是否开启
    },//data属性变量变化监听
    methods:{
       setTermStartTime:function () {
         this.modal1 = true;
         this.$http.post('./getStartSchoolTimeList',{}, {"Content-Type": "application/json"}).then(function (response) {
           this.startSchoolTimeList = response.body.startSchoolTimeList;
           this.selYear = "";
         });
       },
      setTermStartTimeChange:function () {
        if(this.selYear == "")
           {
               return;
           }
           this.firstDate = "";
           this.secondDate = "";
        this.termStartTimeBool = false;
        for(var i=0;i<this.startSchoolTimeList.length;i++)
        {
          if(this.startSchoolTimeList[i].startYearSemester.split(".")[0]==this.selYear)
          {
              if(this.startSchoolTimeList[i].startYearSemester.split(".")[1] == "1")
              {
                this.firstDate = this.startSchoolTimeList[i].startTime;
              }else if(this.startSchoolTimeList[i].startYearSemester.split(".")[1] == "2")
              {
                this.secondDate = this.startSchoolTimeList[i].startTime;
              }
          }
        }
        if( this.firstDate != ""&&this.secondDate != "")
        {
            this.termStartTimeBool = true;
        }
      },
      generateSemester:function () {
        var nDate = new Date();
        var nYear = parseInt(nDate.getFullYear())-1;
        var stl="";
        var st2="";
        for(var i=1;i<=3;i++)
        {
          stl = nYear+++'-'+nYear;
          this.yearSemester.push({semName:stl ,semValue:stl});
        }
      },
      termStart: function () {
        var firstDate = new Date(this.firstDate);
        var secondDate = new Date(this.secondDate);
//        将用户选择的学期开始时间转化为时间变量格式
        if(this.firstDate == "" || this.secondDate == ""){
//          验证时间选择是否为空
          this.errorMessage = "时间不能为空,请重试!";
          this.modal = true;
        }else if(firstDate >= secondDate){
//          验证第一学期开始时间必须早于第二学期
          this.errorMessage = "第一学期开始时间必须早于第二学期，请重试！";
          this.modal = true;
        }else if((secondDate - firstDate) / (1000 * 3600 * 24) < 120){
//          验证学期间隔时间
          this.errorMessage = "学期间隔时间太短，请重试！";
          this.modal = true;
        }else if(this.selYear=="")
        {
          this.errorMessage = "学年不能为空,请重试!";
          this.modal = true;
        }else if(firstDate.getFullYear() != this.selYear.split('-')[0])
        {
          this.errorMessage = '第一学期应该在'+this.selYear.split('-')[0]+'年'+',请重试！';
          this.modal = true;
        }else if(secondDate.getFullYear() != this.selYear.split('-')[1])
        {
          this.errorMessage = '第二学期应该在'+this.selYear.split('-')[1]+'年'+',请重试！';
          this.modal = true;
        }else {
          this.dateError = "";
//          错误提示信息初始化
//          第一学期信息处理
          this.$http.post('./setSchoolStartTime', {
            "startYearSemester": this.selYear+'.1',
            "startTime": firstDate.getFullYear()+'-'+parseInt(firstDate.getMonth()+1)+'-'+firstDate.getDate()
          }, {
            "Content-Type": "application/json"
          }).then(function (res) {
            this.modal1 = false;
//            隐藏原对话框
            if (res.body.result == "1") {
              this.$Message.success('学期开始时间设置成功！');
            } else {
              this.dateError += res.body.result + "，请重试！";
//              设置错误回调信息，对话框进行提示
              this.errorMessage = this.dateError;
              this.modal = true;
            }
          }, function (error) {
            this.$Message.error('连接失败，请重试！');
          });
//          第二学期信息处理
          this.$http.post('./setSchoolStartTime', {
            "startYearSemester": this.selYear+'.2',
            "startTime": secondDate.getFullYear()+'-'+parseInt(secondDate.getMonth()+1)+'-'+secondDate.getDate()
          }, {
            "Content-Type": "application/json"
          }).then(function (res) {
            this.modal1 = false;
//            隐藏原对话框
            if (res.body.result == "1") {
              this.$Message.success('学期开始时间设置成功！');
            } else {
              this.dateError += res.body.result + "，请重试！";
//              设置错误回调信息，对话框进行提示
              this.errorMessage = this.dateError;
              this.modal = true;
            }
          }, function (error) {
            this.$Message.error('连接失败，请重试！');
          });
        }
      },//学期开始时间设置
      evaluationStart: function () {
        if(this.evaluationDate[0] == "" || this.evaluationDate[1] == ""){
//          验证时间选择是否为空
          this.errorMessage = "时间区间不能为空,请重试!";
          this.modal = true;
        }else {
          this.$http.post('./setEvaTime', {
            "startEvaTeachTime": new Date(this.evaluationDate[0]),
            "endEvaTeachTime": new Date(this.evaluationDate[1])
          }, {
            "Content-Type": "application/json"
          }).then(function (res) {
            this.modal2 = false;
//            隐藏原对话框
            if (res.body.result == "1") {
              this.$Message.success('评教时间设置成功！');
            }else{
              this.errorMessage = res.body.result;
//              设置错误回调信息，对话框进行提示
              this.modal = true;
            }
          }, function (error) {
            this.modal2 = false;
//            隐藏原对话框
            this.$Message.error('连接失败，请重试！');
          });
        }
      },//评教起止时间设置
      gradeStart: function () {
        this.$http.post('./getStartSchoolTime', {}, {
          "Content-Type": "application/json"
        }).then(function (res) {
        }, function (error) {
        });
        if(this.gradeDate[0] == "" || this.gradeDate[1] == ""){
          this.errorMessage = "时间区间不能为空,请重试!";
          this.modal = true;
        }else {
          this.$http.post('./setScoreInputTime', {
            "startScoreInputTime": new Date(this.gradeDate[0]),
            "endScoreInputTime": new Date(this.gradeDate[1])
          }, {
            "Content-Type": "application/json"
          }).then(function (res) {
            this.modal3 = false;
            if (res.body.result == "1") {
              this.$Message.success('成绩录入时间设置成功！');
            }else{
              this.errorMessage = res.body.result;
              this.modal = true;
            }
          }, function (error) {
            this.$Message.error('连接失败，请重试！');
          });
        }
      },//成绩录入起止时间设置
      roleChange: function (name) {
        this.activeName = name;
        this.$nextTick(function () {
          this.$refs.roleMenu.updateActiveName();
//          更新角色选中效果
        });
      },//角色选择触发函数
      inFuncClick: function (index) {
//        判断点击的功能模块内的页面的权限进行跳转
        if(this.authorityModels[index].name == "教务审批"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "17"){
              location.href = "#/eduAdmin/examination/eduAdminTchTeachingPlan";
              return;
            }
          }for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "12"){
              location.href = "#/eduAdmin/examination/adjustCouApply";
              return;
            }
          }for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "13"){
              location.href = "#/eduAdmin/examination/makeupCouApply";
              return;
            }
          }for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "11"){
              location.href = "#/eduAdmin/examination/suspendCouApply";
              return;
            }
          }for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "8"){
              location.href = "#/eduAdmin/examination/banCouApply";
              return;
            }
          }for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "62"){
              location.href = "#/eduAdmin/examination/eduAdminEvaTeachingResult";
              return;
            }
          }for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "30"){
              location.href = "#/eduAdmin/examination/makeupExamAdmin";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "智能排课"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "14"){
              location.href = "#/eduAdmin/course/couArrangeSetting";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "9"){
              location.href = "#/eduAdmin/course/combineCourse";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "7"){
              location.href = "#/eduAdmin/course/couArrangeTable";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "教务公告"){
          location.href = "#/eduAdmin/information/noticeManage";
        }else if(this.authorityModels[index].name == "成绩管理" && this.authorityModels[index].index == 4){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "28"){
              location.href = "#/eduAdmin/gradeManage/gradeStat";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "29"){
              location.href = "#/eduAdmin/gradeManage/gradeQuery";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "31"){
              location.href = "#/eduAdmin/gradeManage/adminCancelGrade";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "32"){
              location.href = "#/eduAdmin/gradeManage/makeupGradeInput";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "教务督导管理"){
          location.href = "#/eduAdmin/eduAdminSupervisorManage";
        }else if(this.authorityModels[index].name == "考务管理"){
          location.href = "#/eduAdmin/eduAdminManage";
        }else if(this.authorityModels[index].name == "课酬管理" && this.authorityModels[index].index == 7){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "5"){
              location.href = "#/eduAdmin/emolument/salary";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "66"){
              location.href = "#/eduAdmin/emolument/seeSigninList";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "22"){
              location.href = "#/eduAdmin/emolument/setPrice";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "培养方案管理"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "15"){
              location.href = "#/eduAdmin/plan/eduAdminEduPlan";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "16"){
              location.href = "#/eduAdmin/plan/eduAdminTeachProcess";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "人员管理设置"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "24"){
              location.href = "#/eduAdmin/person/eduResGroupMgmt";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "23"){
              location.href = "#/eduAdmin/person/eduAdminManageStd";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "26"){
              location.href = "#/eduAdmin/person/eduAdminManageTch";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "64"){
              location.href = "#/eduAdmin/person/eduAdminManageClass";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "资源管理设置"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "27"){
              location.href = "#/eduAdmin/resource/textbookMgmt";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "21"){
              location.href = "#/eduAdmin/resource/eduAdminManageGrade";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "65"){
              location.href = "#/eduAdmin/resource/courseTypeMgmt";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "20"){
              location.href = "#/eduAdmin/resource/classroomMgmt";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "课表查询"){
          location.href = "#/eduAdmin/checkCourse";
        }else if(this.authorityModels[index].name == "权限管理"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "1"){
              location.href = "#/eduAdmin/role/authorityMgmt1";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "2"){
              location.href = "#/eduAdmin/role/eduAdminAuthorityManage2";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "我的课程"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "39"){
              location.href = "#/teacher/course/tchCheckTimetable";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "42"){
              location.href = "#/teacher/course/makeupClass";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "41"){
              location.href = "#/teacher/course/tchManuAdjCl";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "40"){
              location.href = "#/teacher/course/stopClass";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "38"){
              location.href = "#/teacher/course/requirement";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "教学活动"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "37"){
              location.href = "#/teacher/teach/normalSchedule";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "36"){
              location.href = "#/teacher/teach/courseList";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "67"){
              location.href = "#/teacher/teach/teacherDirector";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "63"){
              location.href = "#/teacher/teach/teachingEvaluate";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "25"){
              location.href = "#/teacher/teach/teacherTestInfo";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "成绩管理" && this.authorityModels[index].index == 15){
          location.href = "#/teacher/class/tchGradesInput";
        }else if(this.authorityModels[index].name == "课酬管理" && this.authorityModels[index].index == 16){
          location.href = "#/teacher/classInfo/tchCheckSalary";
        }else if(this.authorityModels[index].name == "个人信息"){
          location.href = "#/teacher/personInfo/basicMessage";
        }else if(this.authorityModels[index].name == "督导反馈"){
          location.href = "#/teacher/director";
        }else if(this.authorityModels[index].name == "班级管理"){
          location.href = "#/teacher/classList";
        }else if(this.authorityModels[index].name == "组别管理"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "56"){
              location.href = "#/teacher/group/research";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "55"){
              location.href = "#/teacher/group/eduAdminTchTeachingPlan";
              return;
            }
          }
        }
      }, //点击功能模块进行跳转
      announcementClick: function (id) {
        if(id != "null") {
          location.href = "#/eduAdmin/information/notifyInformation?Id=" + id+'&Type=Tch';
        }
      }//公告点击跳转详情
    }

  }
</script>

<style scoped>
  #eduAdminHomeDiv {
    /*页面*/
    background-color: white;
    display: flex;
    border: thin solid whitesmoke;
    border-top: thin solid #DCDCDC;
    overflow-x: hidden;
  }
  #menuDiv{
    /*左侧功能栏*/
    width: 13rem;
    min-width: 13rem;
    background-color: #EEF3FA;
    border: thin solid #EEF3FA;
  }
  #menu{
    background-color: transparent;
  }
  #termStartButton{
    /*学期开始时间设置按钮*/
    margin-top: 2rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  #evaluationStartButton{
    /*评教起止时间设置按钮*/
    margin-top: 2rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  #gradeStartButton{
    margin-top: 2rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  .ivu-menu-item-selected{
    /*角色被选中的背景色*/
    background-color: white;
  }
  #pageDiv{
    /*功能块区域*/
    width: 75%;
    height: 100%;
    padding: 1rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
  }
  #topFuncDiv{
    /*一级功能块区域*/
    width: 95% ;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-left: 1rem;
  }
  .modelImg{
    /*一级功能块图片*/
    font-weight: normal;
    font-size: 0.7rem;
    height: 5rem;
  }
  .pageSpan{
    /*功能块*/
    width: 20%;
    min-width: 5rem;
    padding-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    font-weight: bold;
    cursor: pointer;
    height: 7rem;
    margin: 1.5rem 2.5rem;
    background-color: transparent;
    text-align: center;
    border: thick solid #E9ECF2;
    border-image:-webkit-linear-gradient(-45deg, #A7C8D9,#B2E9D5) 30 30;
    border-image:-moz-linear-gradient(-45deg,#A7C8D9,#B2E9D5) 30 30;
    border-image:linear-gradient(-45deg,#A7C8D9,#B2E9D5) 30 30;
    box-shadow: 0.2rem 0.2rem 0.5rem 0.1rem grey;
  }
  .pageSpan li{
    font-weight: normal;
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
    width: 13.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }
  #announcementDiv{
    /*公告区域*/
    display: flex;
    width: 25rem;
    margin-top: 2rem;
    height: 28rem;
    position: relative;
    right: 1.5rem;
  }
  #topSpan:before {
    /*公告区域边框*/
    content: "";
    position: relative;
    width: 0.3rem;
    height: 15rem;
    bottom: 7.5rem;
    left: 5rem;
    background-color: #B2E9D5;
    display: block;
    transform: rotate(90deg);
  }
  #bottomSpan:before{
    /*公告区域边框*/
    content: "";
    position: relative;
    width: 0.3rem;
    height: 15rem;
    right: 4.8rem;
    top: 22.5rem;
    background-color: #B2E9D5;
    display: block;
    transform: rotate(90deg);
  }
  #announcementDiv:before {
    /*公告区域边框*/
    content: "";
    position: relative;
    width: 0.3rem;
    height: 8rem;
    bottom: 0.6rem;
    right: 0.8rem;
    background-color: #A7C8D9;
    display: block;
  }
  #announcementDiv:after {
    /*公告区域边框*/
    content: "";
    position: relative;
    width: 0.3rem;
    height: 8rem;
    left: 1rem;
    top: 22.6rem;
    background-color: #A7C8D9;
    display: block;
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
  #detail{
    /*详情点击*/
    position: absolute;
    top: 27rem;
    left: 15.5rem;
  }
  #detail:hover{
    cursor: pointer;
    color: red;
  }
  img{
    width: 5rem;
  }
  @media screen and (max-width: 1384px) {
    .announcementName{
      width: 10.5rem;
    }
  }
  @media screen and (min-width:320px) and (max-width:769px) {
    #menuDiv{
      min-width: 11rem;
    }
  }
</style>
