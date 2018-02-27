<template>
  <div id="suspendCouApplyDiv">
    <div class="blank">
      <div class="positionBar">
        <span>您的当前位置：</span>
        <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
        <span> > 教务审批 > 停课审批</span>
      </div>
    </div>
    <div id="tableDiv">
      <table class="operationTable">
      <thead>
        <tr>
          <td class="headTd">申请教师</td>
          <td class="headTd">课程名称</td>
          <td class="headTd">上课班级</td>
          <td class="headTd">上课时间</td>
          <td class="headTd">申请时间</td>
          <td class="headTd">具体理由</td>
          <td class="headTd">操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(application,index) in applications" :id="index">
          <td>{{ application.teacherName }}</td>
          <td>{{ application.courseName }}</td>
          <td>{{ application.className }}</td>
          <td>{{ application.courseTime }}</td>
          <td>{{ application.appTime }}</td>
          <td>{{ application.reason }}</td>
          <td v-if="application.operation == 1">
            <button class="completedOperationBtn" title="已通过">√</button>
          </td>
          <td v-else-if="application.operation == 2">
            <button class="operationButton" @click="operation(application.lessonsChangeId,'true',index)" title="通过">√</button>
            <!--<button @click="setTrue(index)">√</button>-->
            <!--申请通过批准-->
            <button class="operationButton" @click="operation(application.lessonsChangeId,'false',index)" title="不通过">×</button>
            <!--申请拒绝-->
          </td>
          <td v-else>
            <button class="completedOperationBtn" title="不通过">×</button>
          </td>
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
      <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定通过该申请吗?</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="setTrue(applications,operationId,operationIndex)">确定</button>
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
        <button id="modalBtn" @click="setFalse(applications,operationId,operationIndex)">确定</button>
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
    name: 'suspendCouApplyDiv',
    data () {
      return {
        applications: [

        ],
//        申请信息
        operationIndex: null,
        operationId: null,
//        对话框参数传递
        modal1: false,
//        对话框显隐
        modal2: false,
//        对话框显隐
        modal3: false,
//        对话框显隐
        errorMessage: ""
//        复用对话框内容
      }
    },
    beforeMount: function() {
      this.$http.post('./closedCourseApplyShow',{
      },{
        "Content-Type":"application/json"
      }).then(function(response){
        var data = response.body;
        this.applications = data;
      },function(error){
        this.$Message.error('连接失败，请重试！');
      });
    },
//页面dom加载前获取后端数据
    methods: {
      operation: function(operationId,type,operationIndex){
        this.operationId = operationId;
        this.operationIndex = operationIndex;
//        保存操作的数据的索引和id
        if(type == "true"){
          this.modal1 = true;
//          打开通过申请对话框
        }else{
          this.modal2 = true;
//          打开不通过申请对话框
        }
      }, //对话框参数传递，触发对应对话框
      setTrue: function(applications,id,index){
        this.$http.post('./closedCourseApplyHandle',{
          "lessonsChangeId": id,
          "operation": 1
        },{
          "Content-Type":"application/json"
        }).then(function(response){
          this.modal1 = false;
//          关闭对话框
          var  data = response.body;
          if(data.result == 1) {
            this.$Message.success("处理成功！");
            this.applications[index].operation = 1;
//            处理完毕，改变申请状态
          }else{
            this.$errorMessage = "操作失败,请重试!";
            this.modal3 = true;
//            打开错误提示
          }
        },function(error){
          this.modal1 = false;
//          关闭对话框
          this.$Message.error('连接失败，请重试！');
        });
      },
      setFalse: function(applications,id,index){
        this.$http.post('./closedCourseApplyHandle',{
          "lessonsChangeId": id,
          "operation": 0
        },{
          "Content-Type":"application/json"
        }).then(function(response){
          this.modal2 = false;
//          关闭对话框
          var data = response.body;
          if(data.result == 1) {
            this.$Message.success("处理成功！");
            this.applications[index].operation = 0;
//            处理完毕，改变申请状态
          }else{
            this.$errorMessage = "操作失败,请重试!";
            this.modal3 = true;
//            打开错误提示
          }
        },function(error){
          this.modal2 = false;
//          关闭对话框
          this.$Message.error('连接失败，请重试！');
        });
      }
    }
  }
</script>

<style scoped>
  html{
  }
  #suspendCouApplyDiv{
    /*页面*/
    margin: 0 auto;
    background-color: #f3f3f3;
    height: 100%;
  }
  #tableDiv{
    margin: 0 5rem;
  }
  .operationButton{
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
  .completedOperationBtn{
      outline: none;
      border: thin solid #A6A6A6;
      background-color: white;
      color: #A6A6A6;
      border-radius: 1rem;
      font-size: 1rem;
      width: 1.45rem;
  }
  @media screen and (max-width:1025px) {
    html {
    }
  }
</style>
