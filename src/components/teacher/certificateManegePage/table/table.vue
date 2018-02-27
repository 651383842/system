<template>
  <div>
    <div  class="positionBar">
      <span>您当前的位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span> > 个人信息</span>
    </div>
    <div id="workExperience-teacher-tableDiv">
            <div id="tableLeft">
                <span id="subtitle1">{{subtitle1}}</span>
              <ul>
                <li id="li"><a href="#/teacher/personInfo/basicMessage">基本信息</a></li>
                <li><a href="#/teacher/info/educationManege">教育经历</a></li>
                <li><a href="#/teacher/info/certificateManege">资格证书</a></li>
                <li><a href="#/teacher/info/experience">临床经历</a></li>
                <!--<li><a href="#">教学进修</a></li>-->
                <li><a href="#/teacher/info/passwdChange">密码修改</a></li>
              </ul>
            </div>
            <div id="tableRight">
                <span id="subtitle2">{{subtitle2}}</span>
                <div id="tableDiv">
                    <table class="headTr">
                      <thead>
                      <tr>
                        <th width="%20">证书类型</th>
                        <th width="%20">证书编号</th>
                        <th width="%15">证书名称</th>
                        <th width="%15">证书等级</th>
                        <th width="%10">评审机构</th>
                        <th width="%10">评审时间</th>
                        <th width="%10">操作</th>
                      </tr>
                      </thead>
                      <tbody>
                      <!--循环生成信息，index作为data数组的下标索引，将index用作id的一部分，便于准确定位操作DOM，key用于绑定课程信息，保证索引不随着数组元素增删自动发生变化-->
                      <tr v-for="(certificate,index) in certificates" :id="'InputTr'+index" :key="certificate.certificateId">
                        <td>
                          <select :id="'certificateSelect'+index" v-model="certificate.certificateType" disabled="disabled">
                            <!--<option>请选择证书类型</option>-->
                            <option v-for="certificateType in certificateTypes">{{ certificateType }}</option>
                          </select>
                        </td>
                        <td><input onkeyup="value=value.replace(/[^\w\.\/]/ig,'')" v-model.lazy="certificate.certificateNum" readonly></td>
                        <td><input v-model.lazy="certificate.certificateName" onkeyup="this.value=this.value.replace(/\s+/g,'')"  readonly></td>
                        <td>
                          <!--<input v-model.lazy="certificate.certificateLevel" onkeyup="this.value=this.value.replace(/\s+/g,'')"  readonly>-->
                          <select :id="'certificateSelect2'+index" v-model="certificate.certificateLevel" disabled="disabled">
                            <!--<option>请选择证书等级</option>-->
                            <option v-for="certificateLevel in certificateLevels">{{ certificateLevel }}</option>
                          </select>
                        </td>
                        <td><input v-model.lazy="certificate.reviewIstitution" onkeyup="this.value=this.value.replace(/\s+/g,'')"  readonly></td>
                        <td>
                          <!--<input v-model.lazy="certificate.reviewTime" onkeyup="this.value=this.value.replace(/\s+/g,'')"  readonly>-->
                          <Date-picker  v-model.lazy="certificate.reviewTime" type="date" placeholder="选择日期" style="width: 6rem;margin-left: 1rem;"></Date-picker>
                        </td>

                        <td class="operationTd">
                          <!--编辑功能，初始显示，编辑时隐藏-->
                          <img title="编辑" :id="'EditImg'+index" src="./images/edit.png" @click="editClick(index)">
                          <!--保存功能，初始隐藏，编辑时显示-->
                          <img title="保存" :id="'SaveImg'+index" class="saveImg" src="./images/save.png" @click="operationClick(index,'save')">
                          <!--取消编辑并重置，初始隐藏，编辑时显示-->
                          <img title="取消" :id="'RestoreImg'+index" class="restoreImg" src="./images/restore.png" @click="operationClick(index,'restore')">
                          <!--删除功能，初始显示，编辑时隐藏-->
                          <img title="删除" :id="'DeleteImg'+index" src="./images/delete.png" @click="operationClick(index,'delete')">
                        </td>
                      </tr>
                      <tr>
                        <!--增加功能，通过vue增加循环数组元素，但input DOM不会即时创建，所以暂时无法增加的同时处于编辑状态-->
                        <td><img title="添加" src="./images/add.png" @click="addClick(certificates)"></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      </tbody>
                    </table>
                </div>
         </div>
            <Modal
        v-model="modal1"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
        <div style="font-size: 1.1rem;text-align: center;">
          <p>您确定取消编辑吗?</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="restoreClick(operationIndex)">确定</button>
          <button id="modalBtn" @click="modal1 = false">取消</button>
        </div>
      </Modal>
            <Modal
        v-model="modal2"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
        <div style="font-size: 1.1rem;text-align: center;">
          <p>您确定要删除该资格证书吗？</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="deleteClick(operationIndex)">确定</button>
          <button id="modalBtn" @click="modal2 = false">取消</button>
        </div>
      </Modal>
            <Modal
        v-model="modal3"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
        <div style="font-size: 1.1rem;text-align: center;">
          <p>您确定提交保存该信息吗？</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="saveClick(operationIndex)">确定</button>
          <button id="modalBtn" @click="modal3 = false">取消</button>
        </div>
      </Modal>
      <Modal
        v-model="modal4"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
        <div style="font-size: 1.1rem;text-align: center;">
          <p>请填写完整信息！</p>
        </div>
        <div slot="footer" style="text-align: center">
          <!--<button id="modalBtn" @click="saveClick(operationIndex)">确定</button>-->
          <button id="modalBtn" @click="modal4 = false">确定</button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
    export default {
        name:'workExperience-teacher-tableDiv',
        data () {
            return {
                subtitle1:'个人信息',
                subtitle2:'资格证书',
                certificates:[],
                certificateTypes:['教师资格证','护师职业资格证','医师职业资格证'],
                certificateLevels:['特级','高级','中级','初级'],
                modal1: false,
                modal2: false,
                modal3: false,
                modal4:false,
                operationIndex: 0
            }
        },
      beforeMount:function(){
        this.$http.post('./teacherManage/getTeacherCertInfo',{},
//        this.$http.post('../jsonphp/certificate.php',{},
          {"Content-Type":"application/json"}).then(function (response) {
            console.log(response);
            this.certificates = response.body.certificatemanage;
            for(var i=0;i<response.body.certificatemanage.length;i++){
              if(response.body.certificatemanage[i].certificateType=="1"){
                this.certificates[i].certificateType="教师资格证"
              }else if(response.body.certificatemanage[i].certificateType=="2"){
                this.certificates[i].certificateType="护师职业资格证"
              }else if(response.body.certificatemanage[i].certificateType=="3"){
                this.certificates[i].certificateType="医师职业资格证"
              }
            }
            for(var i=0;i<response.body.certificatemanage.length;i++){
              if(response.body.certificatemanage[i].certificateLevel=="1"){
                this.certificates[i].certificateLevel="特级"
              }else if(response.body.certificatemanage[i].certificateLevel=="2"){
                this.certificates[i].certificateLevel="高级"
              }else if(response.body.certificatemanage[i].certificateLevel=="3"){
                this.certificates[i].certificateLevel="中级"
              }else if(response.body.certificatemanage[i].certificateLevel=="4"){
                this.certificates[i].certificateLevel="初级"
              }
            }
          },
          function(error){
            console.log("获取error:");
            console.log(error);
          });
      },
        methods: {
          //对话框打开
          operationClick: function(operationIndex,operation){
            this.operationIndex = operationIndex;
            if(operation == "restore"){
              this.modal1 = true;
            }else if(operation == "delete"){
              this.modal2 = true;
            }else if(operation == "save"){
              if(this.certificates[operationIndex].certificateType==''||this.certificates[operationIndex].certificateNum==''||
                this.certificates[operationIndex].certificateName==''||this.certificates[operationIndex].certificateLevel==''||
                this.certificates[operationIndex].reviewIstitution==''||this.certificates[operationIndex].reviewTime==''){
                this.modal4=true;
              }else{
              this.modal3 = true;}
            }
          },
//        编辑功能
          editClick: function(index){
            var inputTr = document.getElementById("InputTr"+index);
            var input = inputTr.getElementsByTagName("input");
            var select = document.getElementById("certificateSelect"+index);
            var select2 = document.getElementById("certificateSelect2"+index);
            var editImg = document.getElementById("EditImg"+index);
            var saveImg = document.getElementById("SaveImg"+index);
            var restoreImg = document.getElementById("RestoreImg"+index);
            var deleteImg = document.getElementById("DeleteImg"+index);
            var i = null;
//          使课程信息的输入标签变为可输入，显示边框
            for(i = 0;i<input.length;i++){
              select.disabled = false;
              select2.disabled = false;
              input[i].readOnly = false;
              input[i].style.border = "0.1rem solid #d4d4d9";
            }
//        隐藏编辑和删除功能图标,显示保存和重置功能图标
            editImg.style.display = "none";
            saveImg.style.display = "inline";
            deleteImg.style.display = "none";
            restoreImg.style.display = "inline";
          },
//        取消修改,重置数据,退出编辑
          restoreClick: function(index){
            location.reload();
          },
          deleteClick: function(index){
            this.modal2 = false;
            if(this.certificates[index].certificateType =="")
            {
              this.certificates.splice(index, 1);
              this.$Message.success('操作成功！');
              return;
            }
              this.$http.post('./teacherManage/deleteTeacherCertInfo',{
                "certificateId":this.certificates[index].certificateId
              },{"Content-Type":"application/json"}).then(function (response){
                if(response.body.result=='1')
                { this.$Message.success('操作成功！');
                  this.certificates.splice(index, 1);
                }
              }, function(error){
                console.log("传递error:");
                console.log(error);
              });
            this.modal2 = false;
//            }
          },
//        保存功能
          saveClick: function(index){

              if(this.certificates[index].certificateType=="教师资格证"){
                this.certificates[index].certificateType="1"
              }else if(this.certificates[index].certificateType=="护师职业资格证"){
                this.certificates[index].certificateType="2"
              }else if(this.certificates[index].certificateType=="医师职业资格证"){
                this.certificates[index].certificateType="3"
              }
            if(this.certificates[index].certificateLevel=="特级"){
              this.certificates[index].certificateLevel="1"
            }else if(this.certificates[index].certificateLevel=="高级"){
              this.certificates[index].certificateLevel="2"
            }else if(this.certificates[index].certificateLevel=="中级"){
              this.certificates[index].certificateLevel="3"
            }else if(this.certificates[index].certificateLevel=="初级"){
              this.certificates[index].certificateLevel="4"
            }
//            if(confirm("您确定提交保存该课程吗？")){
//            alert(this.certificates[index].certificateType);
//            alert(this.certificates[index].certificateName);
//            alert(this.certificates[index].certificateLevel);
//            alert(this.certificates[index].reviewTime);
              this.$http.post('./teacherManage/editTeacherCertInfo',{
//                this.$http.post('../jsonphp/certificate.php',{
                "certificateType":this.certificates[index].certificateType,
                "certificateNum":this.certificates[index].certificateNum,
                "certificateName":this.certificates[index].certificateName,
                "certificateLevel":this.certificates[index].certificateLevel,
                "reviewIstitution":this.certificates[index].reviewIstitution,
                "reviewTime":this.certificates[index].reviewTime,
                "certificateId":this.certificates[index].certificateId
              },{"Content-Type":"application/json"}).then(function (response){
                if(response.body.result=='1')
                {this.$Message.success('操作成功！');}
              }, function(error){
                console.log("传递error:");
                console.log(error);
              });
            if(this.certificates[index].certificateType=="1"){
              this.certificates[index].certificateType="教师资格证"
            }else if(this.certificates[index].certificateType=="2"){
              this.certificates[index].certificateType="护师职业资格证"
            }else if(this.certificates[index].certificateType=="3"){
              this.certificates[index].certificateType="医师职业资格证"
            }
            if(this.certificates[index].certificateLevel=="1"){
              this.certificates[index].certificateLevel="特级"
            }else if(this.certificates[index].certificateLevel=="2"){
              this.certificates[index].certificateLevel="高级"
            }else if(this.certificates[index].certificateLevel=="3"){
              this.certificates[index].certificateLevel="中级"
            }else if(this.certificates[index].certificateLevel=="4"){
              this.certificates[index].certificateLevel="初级"
            }

              var inputTr = document.getElementById("InputTr"+index);
              var input = inputTr.getElementsByTagName("input");
              var select = document.getElementById("certificateSelect"+index);
            var select2 = document.getElementById("certificateSelect2"+index);
              var editImg = document.getElementById("EditImg"+index);
              var saveImg = document.getElementById("SaveImg"+index);
              var restoreImg = document.getElementById("RestoreImg"+index);
              var deleteImg = document.getElementById("DeleteImg"+index);
              var i = null;
//            向后端发送需要保存的数据，并处理回调
              this.certificates[index].certificateNum = input[0].value;
              for(i = 0;i<input.length;i++){
                select.disabled = true;
                select2.disabled = true;
                input[i].readOnly = true;
                input[i].style.border = "none";
              }

//          预留功能,将data提交到后端,实现保存数据,处理回调
              editImg.style.display = "inline";
              saveImg.style.display = "none";
              deleteImg.style.display = "inline";
              restoreImg.style.display = "none";
//            }
            this.modal3 = false;
          },
//        增加功能
          addClick: function (courses){
            courses.push(
              { certificateType:'', certificateNum:'', certificateName:'', certificateLevel:'', reviewIstitution:'', reviewTime:'',certificateId:''
              }
            );
          }
        }

    }

</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
    html{
        font-size: 16px;
    } /*整个页面的样式*/
    #workExperience-teacher-tableDiv{
       position:relative;
        display: flex;
        height:30rem;
      background-color: #f3f3f3;
    }/*整个桌面的大小*/
    #tableLeft{
        position:relative;
        top:2rem;
        left:4rem;
        height:30rem;
        width:20%;
        background-color: white;
        text-align: center;
        border:0.15rem solid lightgrey;
    }/*左侧的CSS*/
  #tableRight{
    position: relative;
    float:right;
    top:2rem;
    margin-left:7rem;
    height:30rem;
    width:65%;
    background-color: white;
    text-align: left;
    border:0.15rem solid lightgrey;
    padding-left:1rem;
    padding-right:1rem;
  }/*右侧的CSS*/
    #tableDiv{
        border-top: 0.15rem solid #158064;
        position: relative;
        top:1rem;
        height:85%;
        overflow-y: auto;
    }/*表格的CSS*/
    #subtitle1{
        font-size: 1.3rem;
        position: relative;
        top:0.5rem;

    }/*标题一*/
    #subtitle2{
        font-size: 1.3rem;
        position: relative;
        top:0.5rem;
        left:2rem;
    }/*标题二*/
    ul{ list-style-type:none;}/*去点*/
    li{
        height:3rem;
        border-bottom:0.15rem solid lightgrey ;
        position: relative;
        right: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;

    }/*列表*/
    #li{
        border-top: 0.15rem solid #158064;
    }/*左边绿色的那条线*/
    #certificateTable{
        margin-top: 0.5rem;
        width: 100%;
        table-layout: fixed;
        border: thin solid #E3E3E3;
        border-collapse: collapse;
    }
    img{
      width:1.5rem;
      height:1.5rem;
      position:relative;
      top:0.3rem;
    }
    #certificateTable td{
        border-bottom: thin solid #E3E3E3;
        height: 2.5rem;
        text-align: center;

    }
    /*Select{*/
        /*height: 1.5rem;*/
        /*width: 10rem;*/
        /*outline: none;*/
        /*font-size: 0.8rem;*/

    /*}*/
    input{
        outline:none;
        border: none;
        text-align: center;
        width: 5rem;
        font-size: 0.8rem;
    }

    img:hover{
        cursor: pointer;
    }
    /*保存功能图标*/
    .saveImg{
        display: none;
    }
    /*重置功能图标*/
    .restoreImg{
        display: none;
    }
    /*功能图标*/
    .operationTd{

      display: flex;
      justify-content: center;
    }
    button{
        color: white;
        background-color: mediumseagreen;
        border: none;
        border-radius: 0.2rem;
        width: 5rem;
        height: 2rem;
        min-width: 5rem;
    }
    select{
      border: 0.1rem solid #d4d4d9;
      border-radius: 0.7rem;
      outline: none;
      padding: 0.3rem 0.5rem;
      width:7rem;
      font-size: 0.6rem;
    }
  table{
    margin-top: 0.5rem;
    width: 100%;
    table-layout: fixed;
    border: thin solid #E3E3E3;
    border-collapse: collapse;

  }
  tr{
    height:2.5rem;
  }
  thead{
    border-bottom: thin solid #E3E3E3;
    height: 2.5rem;
    text-align: center;

  }
  td{
    border-bottom: thin solid #E3E3E3;
    height: 2.5rem;
    text-align: center;

  }
  th{
    font-size: 0.9rem;
  }
  /*  input{
      border: 0.1rem solid #d4d4d9;
      border-radius: 0.3rem;
      outline: none;
      padding: 0.3rem 0.5rem;
      font-size: 0.8rem;
      width:6rem;
    }*/
</style>
