<template>
  <div id="studentStatusChangeExaminationDiv">
    <div id="operationDiv">
      <div class="positionBar">
        <span>您的当前位置：</span>
        <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
        <span> > 人员管理设置 > <a href="#/eduAdmin/person/eduAdminManageClass" class="returnHome">学生异动管理</a> > 异动审批</span>
      </div>
      <div id="selectDiv">
        <select v-model="applicationType" @change="typeChange()">
          <option disabled>选择申请类型</option>
          <option value="2">休学申请</option>
          <option value="3">退学申请</option>
          <option value="4">复学申请</option>
        </select>
        <span style="margin-left: 15rem;">未毕业年级中共退学{{ dropoutNumber }}人，休学{{ quitNumber }}人</span>
      </div>
    </div>
    <div id="tableDiv">
        <table class="operationTable">
          <thead>
          <tr>
            <th class="headTh">申请学生</th>
            <th class="headTh">学号</th>
            <th class="headTh">学制</th>
            <th class="headTh">专业</th>
            <th class="headTh">班级</th>
            <th class="headTh">异动原因</th>
            <th class="headTh">生效时间</th>
            <th class="headTh">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(application,index) in applications" :id="index">
            <td>{{ application.studentName }}</td>
            <td>{{ application.studentId }}</td>
            <td>{{ application.schoolYearType }}</td>
            <td>{{ application.specialityName }}</td>
            <td>{{ application.className }}</td>
            <td>{{ application.changeReason }}</td>
            <td>{{ application.changeDate }}</td>
            <td>
              <button class="operationButton" @click="operation(index,'true')" title="通过">√</button>
              <!--<button @click="setTrue(index)">√</button>-->
              <!--申请通过批准-->
              <button class="operationButton" @click="operation(index,'false')" title="不通过">×</button>
              <!--申请拒绝-->
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    <Modal
        v-model="modal4"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
      <div slot="header" style="font-size: 1rem;text-align: center;padding: 0.5rem 0;" id="modalHeader">
        <!--对话框页头标题栏-->
        <span>分配复学新班级</span>
      </div>
      <div style="font-size: 1.1rem;text-align: center;">
        <!--对话框主体-->
        请选择年级：
        <select v-model="gradeId">
          <option v-for="grade in gradeList" :value="grade.gradeId">{{ grade.gradeName }}</option>
        </select>
        <div v-if="gradeId != ''" style="margin-top: 1rem">
          请选择班级：
          <select v-model="classId">
            <option v-for="classEach in classList" :value="classEach.classId">{{ classEach.className }}</option>
          </select>
        </div>
      </div>
      <div slot="footer" style="text-align: center">
        <!--对话框页脚按钮区域-->
        <button id="modalBtn" @click="modal1 = true">确定</button>
        <button id="modalBtn" @click="modal4 = false">取消</button>
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
        <p>您确定通过该申请吗?</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="setTrue(applications,operationIndex)">确定</button>
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
        <p>您确定拒绝该申请吗?</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="setFalse(applications,operationIndex)">确定</button>
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
      <div style="font-size: 1.1rem;text-align: center;">
        <p>{{ errorMessage }}</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="modal3 = false">确定</button>
      </div>
    </Modal>
    </div>
</template>

<script>
  export default {
    name: 'studentStatusChangeExaminationDiv',
    data () {
      return {
        applicationType: "2",
//        申请类型
        dropoutNumber: 0,
//        未毕业年级的所有退学人数
        quitNumber: 0,
//        未毕业年级的所有休学人数
        applications: [
          /*{
            "schoolYearType": "3",
            "specialityName": "123",
            "className": "123",
            "studentId": "123",
            "studentName": "123",
            "changeType": "2",
            "changeReason": "123",
            "changeDate": "123"
          },
          {
            "schoolYearType": "3",
            "specialityName": "123",
            "className": "123",
            "studentId": "456",
            "studentName": "456",
            "changeType": "3",
            "changeReason": "123",
            "changeDate": "123"
          },
          {
            "schoolYearType": "3",
            "specialityName": "123",
            "className": "123",
            "studentId": "789",
            "studentName": "789",
            "changeType": "4",
            "changeReason": "123",
            "changeDate": "123"
          }*/
        ],
//        申请信息
        gradeList:[
          /*{
            "gradeId":"20165",
            "gradeName":"2016"
          }*/
        ],
//        年级列表
        classList:[
          /*{
          "classId":"201653",
          "className":" 高2016 级3 班"
          }*/
        ],
//        班级列表
        gradeId: "",
//        复学年级
        classId: "",
//        复学班级
        operationIndex: null,
//        对话框参数传递
        modal1: false,
//        对话框显隐
        modal2: false,
        modal3: false,
        modal4: false,
        errorMessage: ""
      }
    },
    beforeMount: function() {
//    页面dom加载前获取后端数据
      this.$http.post('./stateManage/getNoGraduationOfGrade',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        var data = response.body;
        this.dropoutNumber = data.dropoutNumber;
        this.quitNumber = data.quitNumber;
      },function(error){
        this.$Message.error('连接失败，请重试！');
      });//获取未毕业年级的所有退学以及休学人数
      this.$http.post('./stateManage/getApplyQuitStudentList',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        console.log("获取申请:");
        console.log(response.body);
        var data = response.body;
        this.applications = data.quitSchoolList;
      },function(error){
        this.$Message.error('连接失败，请重试！');
      });
    },//获取休学学生列表
    watch: {
      gradeId: function () {
        this.$http.post('./stateManage/getClassList',{
          "gradeId": this.gradeId
        },{
          "Content-Type":"application/json"
        }).then(function(response){
          console.log(response.body);
          var data = response.body;
          this.classList = data.classList;
        },function(error){
          this.$Message.error('连接失败，请重试！');
        });
      }//获取复学可选班级列表
    },
    methods: {
      typeChange: function () {
        var url = null;
        if(this.applicationType == "2"){
          url = "./stateManage/getApplyQuitStudentList";
        }else if(this.applicationType == "3"){
          url = "./stateManage/getApplyDropStudentList";
        }else if(this.applicationType == "4"){
          url = "./stateManage/getApplyReinstatingStudentList";
        }
        this.$http.post(url,{},{
          "Content-Type":"application/json"
        }).then(function(response){
          console.log(response.body);
          var data = response.body;
          if(this.applicationType == "2"){
            this.applications = data.quitSchoolList;
          }else if(this.applicationType == "3"){
            this.applications = data.dropSchoolList;
          }else if(this.applicationType == "4"){
            this.applications = data.reinstateSchoolList;
          }
        },function(error){
          this.$Message.error('连接失败，请重试！');
        });
      },//选择显示不同类型的异动申请
      operation: function(operationIndex,type){
//                对话框参数传递，触发对应对话框
        this.operationIndex = operationIndex;
        if (type == "true") {
//          触发申请通过
          if(this.applications[operationIndex].changeType == "4"){
//            判断是否为复学申请
            this.$http.post('./stateManage/getGradeList',{
              "studentId":this.applications[operationIndex].studentId
            },{
              "Content-Type":"application/json"
            }).then(function(response){
              if(response.body.gradeList.length == 0){
                this.errorMessage = "没有可选复学年级!";
                this.modal3 = true;
                this.modal4 = false;
              }else {
                this.gradeList = response.body.gradeList;
              }
            },function(error){
              this.$Message.error('连接失败，请重试！');
            });//获取复学可选年级
            this.modal4 = true;
          }else {
            this.modal1 = true;
          }
        } else {
          this.modal2 = true;
        }
      },
      setTrue: function(applications,index){
        var url = null;
        if(applications[index].changeType == "4"){
          if(this.classId == ""){
            this.errorMessage = "选择不能为空,请重试!";
            this.modal3 = true;
            this.modal1 = false;
          }else {
            this.$http.post("./stateManage/pendReinstating", {
              "studentId": applications[index].studentId,
              "pendResult": "1",
              "classId": this.classId
            }, {
              "Content-Type": "application/json"
            }).then(function (response) {
              this.modal4 = false;
              this.modal1 = false;
              console.log(response);
              var data = response.body;
              if (data.result == "1") {
                applications.splice(index, 1);
                this.$Message.success('申请审批成功！');
              } else {
                this.errorMessage = "操作失败,请重试!";
                this.modal3 = true;
              }
            }, function (error) {
              this.modal1 = false;
              this.$Message.error('连接失败，请重试！');
            });
          }
        }else {
          if (applications[index].changeType == "2") {
            url = "./stateManage/pendQuitStudent";
          } else if (applications[index].changeType == "3") {
            url = "./stateManage/pendDropStudent";
          }
          this.$http.post(url, {
            "studentId": applications[index].studentId,
            "pendResult": "1"
          }, {
            "Content-Type": "application/json"
          }).then(function (response) {
            this.modal1 = false;
            console.log(response);
            var data = response.body;
            if (data.result == "1") {
              applications.splice(index, 1);
            } else {
              this.errorMessage = "操作失败,请重试!";
              this.modal3 = true;
            }
          }, function (error) {
            this.modal1 = false;
            this.$Message.error('连接失败，请重试！');
          });
        }
      },//异动申请通过
      setFalse: function(applications,index){
        var url = null;
        if(applications[index].changeType == "4"){
          this.$http.post("./stateManage/pendReinstating", {
            "studentId": applications[index].studentId,
            "pendResult": "0",
            "classId":""
          }, {
            "Content-Type": "application/json"
          }).then(function (response) {
            this.modal2 = false;
            console.log(response);
            var data = response.body;
            if (data.result == "1") {
              applications.splice(index, 1);
              this.$Message.success('申请审批成功！');
            } else {
              this.errorMessage = "操作失败,请重试!";
              this.modal3 = true;
            }
          }, function (error) {
            this.modal2 = false;
            this.$Message.error('连接失败，请重试！');
          });
        }else {
          if (applications[index].changeType == "2") {
            url = "./stateManage/pendQuitStudent";
          } else if (applications[index].changeType == "3") {
            url = "./stateManage/pendDropStudent";
          }
          this.$http.post(url, {
            "studentId": applications[index].studentId,
            "pendResult": "0"
          }, {
            "Content-Type": "application/json"
          }).then(function (response) {
            this.modal2 = false;
            console.log(response);
            var data = response.body;
            if (data.result == "1") {
              applications.splice(index, 1);
            } else {
              this.errorMessage = "操作失败,请重试!";
              this.modal3 = true;
            }
          }, function (error) {
            this.modal2 = false;
            this.$Message.error('连接失败，请重试！');
          });
        }
      }//异动申请不通过
    }
  }
</script>

<style scoped>
  #studentStatusChangeExaminationDiv{
    /*页面*/
    margin: 0 auto;
    background-color: #f3f3f3;
    height: 100%;
  }
  #operationDiv{
    /*选择框、位置导航区域*/
    background-color: white;
  }
  #selectDiv{
    /*选择框区域*/
    margin: 0 5rem;
    padding-bottom: 0.8rem;
  }
  #tableDiv{
    /*申请表格区域*/
    margin: 0 5rem;
    padding-top: 0.5rem;
  }
  .operationButton{
    /*操作按钮*/
    outline: none;
    border: thin solid #A6A6A6;
    background-color: white;
    color: #A6A6A6;
    border-radius: 1rem;
    font-size: 1rem;
    width: 1.45rem;
  }
  .operationButton:hover{
    background-color: red;
    color: white;
    border: red;
  }
</style>