<template>
  <div id="banCouApplyDiv">
    <div class="blank">
      <div class="positionBar">
        <span>您的当前位置：</span>
        <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
        <span> > 教务审批 > 禁排审批</span>
      </div>
    </div>
    <div id="tableDiv">
      <table class="operationTable">
        <thead>
          <tr>
            <th class="headTd">申请教师</th>
            <th class="headTd">禁排时间（星期）</th>
            <th class="headTd">申请时间</th>
            <th class="headTd">审核状态</th>
            <th class="headTd">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(application,index) in applications" :id="application.forbiddentimeId">
            <td>{{ application.teacherName }}</td>
            <td>{{ application.appContent }}</td>
            <td>{{ application.appTime }}</td>
            <td>
              <input v-if="application.auditType=='0'" class="bantableinput" value="未审核">
              <input v-if="application.auditType=='1'" class="bantableinput" value="审核通过">
              <input v-if="application.auditType=='2'" class="bantableinput" value="审核不通过">
            </td>
            <td>
              <button v-if="application.auditType=='0'" class="operationButton" @click="operation(application.forbiddentimeId,'1',index)" title="通过">√</button>
              <!--申请通过批准-->
              <button v-if="application.auditType=='0'" class="operationButton" @click="operation(application.forbiddentimeId,'2',index)" title="不通过">×</button>
              <button v-if="application.auditType=='1'" class="operationButton" @click="operation(application.forbiddentimeId,'3',index)" title="撤销">↻</button>
              <!--申请拒绝-->
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
      v-model="modal4"
      width="400"
      :mask-closable="false"
      id="modalBody"
      :styles="{top:'10rem'}">
      <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定撤销该申请吗?</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="backoutApplyResult()">确定</button>
        <button id="modalBtn" @click="modal4 = false">取消</button>
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
    name: 'banCouApplyDiv',
    data () {
      return {
        applications: [
//          {
//            appContent: 0,
//            auditType:0,
//            appTime: "2017.09.11",
//            forbiddentimeId: 81,
//            teacherName: "李贵远"
//          },
//          {
//            appContent: 1,
//            auditType:1,
//            appTime: "2017.09.11",
//            forbiddentimeId: 81,
//            teacherName: "李贵远"
//          },
//          {
//            appContent: 2,
//            auditType:2,
//            appTime: "2017.09.11",
//            forbiddentimeId: 81,
//            teacherName: "李贵远"
//          }
        ],
//                申请信息
        operationIndex: null,
//        操作数据的索引，对话框参数传递
        operationId: null,
//        操作数据的id，对话框参数传递
        modal1: false,
//        对话框显隐
        modal2: false,
        modal3: false,
        modal4: false,
        errorMessage: ""
//        复用对话框内容
      }
    },
    beforeMount: function() {
      this.$http.post('./forbiddenTimeApplyShow',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        var data = response.body;
        this.sortapplications(data);
      },function(error){
        this.$Message.error('连接失败，请重试！');
      });
    },//页面dom加载前获取后端数据
    methods: {
      sortapplications:function (arr) {//对查询到的数据依据审核状态排序
          if(arr.length > 0)
          {
              var a=[],b=[],c=[];
              for(var i=0;i<arr.length;i++)
              {
                  if(arr[i].auditType == '0')
                  {
                      a.push(arr[i]);
                  }else if(arr[i].auditType == '1')
                  {
                    b.push(arr[i]);
                  }else if(arr[i].auditType == '2')
                  {
                    c.push(arr[i]);
                  }
              }
              this.applications = a.concat(b).concat(c);
          }
          return;
        },
      operation: function(operationId,type,operationIndex){
        this.operationId = operationId;
        this.operationIndex = operationIndex;
//      保存操作的数据的索引和id
        if(type == "1"){
          this.modal1 = true;
//          打开通过申请对话框
        }else if(type == "2"){
          this.modal2 = true;
//          打开不通过申请对话框
        }else if(type == "3"){
          this.modal4 = true;
//          打开不通过申请对话框
        }
      },//对话框参数传递，触发对应对话框
      setTrue: function(applications,id,index){
        this.$http.post('./forbiddenTimeApplyHandle',{
          "forbiddentimeId": id,
          "operation": 1
        },{
          "Content-Type":"application/json"
        }).then(function(response){
          this.modal1 = false;
//          关闭原有对话框
          var data = response.body;
          if(data.result == "1") {
            this.$Message.success("处理成功,2s后刷新页面！");
            setTimeout("location.reload()",3000);//2秒后刷新页面
//            处理完毕，移除申请
          }else{
            this.errorMessage = "操作失败,请重试!";
            this.modal3 = true;
//            打开错误提示
          }
        },function(error){
          this.modal1 = false;
          this.$Message.error('连接失败，请重试！');
        });
      },
      setFalse: function(applications,id,index){
        this.$http.post('./forbiddenTimeApplyHandle',{
          "forbiddentimeId": id,
          "operation": 0
        },{
          "Content-Type":"application/json"
        }).then(function(response){
          this.modal2 = false;
//            关闭原有对话框
          var data = response.body;
          if(data.result == "1") {
            this.$Message.success("处理成功,2s后刷新页面！");
            setTimeout("location.reload()",3000);//2秒后刷新页面
//              处理完毕，移除申请
          }else{
            this.errorMessage = "操作失败,请重试!";
            this.modal3 = true;
//            打开错误提示
          }
        },function(error){
          this.modal2 = false;
//        关闭对话框
          this.$Message.error('连接失败，请重试！');
        });
      },
      backoutApplyResult:function () {
        this.$http.post('./backoutApplyResult',{
          "forbiddentimeId": this.operationId,
          "operation": 2
        },{
          "Content-Type":"application/json"
        }).then(function(response){
          this.modal4 = false;
//            关闭原有对话框
          var data = response.body;
          if(data.result == "1") {
            this.$Message.success("处理成功,3s后刷新页面！");
            setTimeout("location.reload()",3000);//2秒后刷新页面
          }else{
            this.errorMessage = "操作失败,请重试!";
            this.modal3 = true;
          }
        },function(error){
          this.modal4 = false;
//        关闭对话框
          this.$Message.error('连接失败，请重试！');
        });
      }
    }
  }
</script>

<style scoped>
  html{
  }
  #banCouApplyDiv{
    /*页面*/
    margin: 0 auto;
    background-color: #f3f3f3;
    height: 100%;
  }
  #tableDiv{
    margin: 0 5rem;
  }
  .operationButton{
    /*操作图标*/
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
  @media screen and (max-width:1025px) {
    html {
    }
  }
</style>
