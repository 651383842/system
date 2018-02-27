<template>
    <div id="eduResearchGroupManagementDiv">
      <div class="positionBar">
        <span>您的当前位置：</span>
        <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
        <span> > 人员管理设置 > 教研组管理</span>
      </div>
      <div id="mainDiv">
        <div id="groupDiv">
          <p id="headP">教研组名称</p>
          <div id="grpListDiv">
            <!--循环生成教研组信息，index作为data数组的下标索引，key用于绑定课程信息，保证索引不随着数组元素增删自动发生变化-->
            <p v-for="(group,index) in groups" class="groupP">
              <span class="operationSpan">
                <input class="groupInput" v-model="group.name" type="text" readonly="true" @click="operationClick(index,'click',1)">
                <span class="delSpan" @click="operationClick(index,'delete',1)" title="删除">×</span>
              </span>
            </p>
          </div>
          <p id="operationP">
            <!--增加功能-->
            <span class="operationSpan" @click="addClick"><img src="./images/addCircle.png"><p class="operation">增加</p></span>
            <!--删除u功能-->
            <span class="operationSpan" @click="deleteClick"><img src="./images/blackDelete.png"><p id="addP" class="operation">删除</p></span>
            <!--<span class="operationSpan" @click="editClick"><img src="./images/blackEdit.png"><p id="editP" class="operation">编辑</p></span>-->
          </p>
        </div>
        <div id="grpInfoDiv">
          <p id="grpNameP"><input id="grpNameInput" type="text" v-model="groupName"></p>
          <div id="infoEditDiv">
            <p id="groupNumP" style="display: none">教研组编号：<input id="groupInput" type="text" v-model="groupNumber" readonly></p>
            <!--教研组编号取消显示-->
            类别：
            <select id="typeSelect" v-model="targroupType">
              <option disabled value="">选择类别</option>
              <option>普通课程</option>
              <option>基础专业</option>
              <option>临床</option>
              <option>基础护理</option>
            </select>
            <p id="leaderP">
              <!--keyup监听enter按键，回车触发添加-->
              组长：
              <select id="leaderSelect">
                <option selected disabled value="">选择组长</option>
                <option v-for="teacher in teachers">{{ teacher }}</option>
              </select>
              <span class="tipSpan" @click="addPerson('leader')"><img src="./images/addCircle.png" title="添加"></span>
              <div class="personDiv">
              <!--成员显示组件-->
                <eduResGroupPerson v-for="(leader,index) in leaders" :key="leader" @remove="operationClick(index,'remove',leaders)" :person="leader"></eduResGroupPerson>
              </div>
            </p>
            <p id="memberP">
              组员：
              <select id="memberSelect">
                <option selected disabled value="">选择组员</option>
                <option v-for="teacher in teachers">{{ teacher }}</option>
              </select>
              <span class="tipSpan" @click="addPerson('member')"><img src="./images/addCircle.png" title="添加"></span>
              <div class="personDiv">
                <eduResGroupPerson v-for="(member,index) in members" :key="member" @remove="operationClick(index,'remove',members)" :person="member"></eduResGroupPerson>
              </div>
            </p>
          </div>
          <div id="operationDiv">
            <button @click="operationClick(operationIndex,'save',operationObj)" class="am-btn am-btn-success am-radius">保存</button>
            <button @click="operationClick(operationIndex,'cancel',operationObj)" class="am-btn am-btn-success am-radius">取消</button>
          </div>
        </div>
      </div>
      <Modal
          v-model="modal1"
          width="400"
          :mask-closable="false"
          id="modalBody"
          :styles="{top:'10rem'}">
        <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
        <div style="font-size: 1.1rem;text-align: center;">
          <p>右侧存在编辑过的信息，是否继续？</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="groupClick(operationIndex)">确定</button>
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
          <p>您确定要删除该教研组吗？</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="delGrpClick(operationIndex)">确定</button>
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
          <p>您确定删除该成员吗？</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="removePerson(operationIndex,operationObj)">确定</button>
          <button id="modalBtn" @click="modal3 = false">取消</button>
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
          <p>您确定保存修改吗？</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="save()">确定</button>
          <button id="modalBtn" @click="modal4 = false">取消</button>
        </div>
      </Modal>
      <Modal
          v-model="modal5"
          width="400"
          :mask-closable="false"
          id="modalBody"
          :styles="{top:'10rem'}">
        <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
        <div style="font-size: 1.1rem;text-align: center;">
          <p>您确定取消修改并刷新页面吗？</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="cancel()">确定</button>
          <button id="modalBtn" @click="modal5 = false">取消</button>
        </div>
      </Modal>
      <Modal
          v-model="modal6"
          width="400"
          :mask-closable="false"
          id="modalBody"
          :styles="{top:'10rem'}">
        <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
        <div style="font-size: 1.1rem;text-align: center;">
          <p>{{ errorMessage }}</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="modal6 = false">确定</button>
        </div>
      </Modal>
    </div>
</template>

<script>
    import eduResGroupPerson from '../eduResGrpMgmtDiv_person/eduResGrpMgmtDiv_person.vue'
    export default {
        name: 'eduResearchGroupManagementDiv',
        data () {
            return {
              isAdd: false,
              groups: [
//                {name:"护士管理学"}, {name:"临床护理学"}
              ],
//              教研组信息
              TARgroupInfoList: [],
              groupId: 0,
//              当前显示的教研组信息
              groupName: "",
              targroupType: "",
              groupNumber: "",
              leaders: [],
//              组长
              members: [],
//              组员
              teachers: [],
//              学校老师信息，用于添加教研组成员
              isChange: false,
//              当前教研组信息是否编辑过
              operationObj: null,
              operationIndex: null,
//        对话框参数传递
              modal1: false,
//        对话框显隐
              modal2: false,
              modal3: false,
              modal4: false,
              modal5: false,
              modal6: false,
              errorMessage: ""
//        复用的对话框提示
            }
        },
        components: {
          eduResGroupPerson
        },
        beforeMount: function() {
//          this.$http.post('../testPhp/eduResearchGroupManagement.php',{},{
          this.$http.post('./targroupManage/getAllInfo',{},{
            "Content-Type":"application/json"
          }).then(function(response){
            console.log("获取教研组:");
            console.log(response.body);
            var data = response.body;
            this.TARgroupInfoList = data.TARgroupInfoList;
            for(var i = 0;i < data.TARgroupInfoList.length;i++){
              this.groups.push({ "name":data.TARgroupInfoList[i].targroupName,"id":data.TARgroupInfoList[i].targroupId,"index": i});
            }
            this.teachers = data.allTeacherNameAndId;
          },function(error){
            this.$Message.error("连接失败，请重试！");
          });
        }, //    页面dom加载前获取后端数据
        watch: {
          groupName: function () {
            this.isChange = true;
          },
          targroupType: function () {
            this.isChange = true;
          },
          leaders: function () {
            this.isChange = true;
          },
          members: function () {
            this.isChange = true;
          },
        },
        methods: {
          operationClick: function(operationIndex,type,operationObj){
            this.operationIndex = operationIndex;
            if(type == "click"){
              if(this.groupName != "" && this.isChange == true) {
                this.modal1 = true;
              }else{
                this.groupClick(operationIndex);
              }
            }else if(type == "delete"){
              this.modal2 = true;
            }else if(type == "remove"){
              this.modal3 = true;
              this.operationObj = operationObj;
            }else if(type == "save"){
              this.modal4 = true;
            }else if(type == "cancel"){
              this.modal5 = true;
            }
          },
//          教研组点击监听，用于展示相应的教研组详细信息
          groupClick: function(index){
            console.log(this.groups);
            if(this.groups[index].index == null){
//              判断是否为未保存的新增教研组
              this.isAdd = true;
              this.groupId = index;
              this.groupName = JSON.parse(JSON.stringify(this.groups[index].name));
              this.groupNumber = JSON.parse(JSON.stringify(this.groups[index].id));
              this.targroupType = "";
              this.leaders = [];
              this.members = [];
              this.$nextTick(function () {
                this.isChange = false;
              });
              try{
//                选择框清空
                document.getElementById("leaderSelect").value = "";
                document.getElementById("memberSelect").value = "";
              }catch (e){}
            }else{
              this.isAdd = false;
              var n = JSON.parse(JSON.stringify(this.groups[index].index));
              this.groupId = index;
              this.groupName = JSON.parse(JSON.stringify(this.TARgroupInfoList[n].targroupName));
              this.groupNumber = JSON.parse(JSON.stringify(this.TARgroupInfoList[n].targroupId));
              this.targroupType = JSON.parse(JSON.stringify(this.TARgroupInfoList[n].targroupType));
              this.leaders = JSON.parse(JSON.stringify(this.TARgroupInfoList[n].targroupLeader));
              this.members = JSON.parse(JSON.stringify(this.TARgroupInfoList[n].targroupTeacher));
              document.getElementById("groupInput").readOnly = true;
              document.getElementById("groupInput").style.border = "none";
              this.$nextTick(function () {
                this.isChange = false;
              });
              try{
//                选择框清空
                document.getElementById("leaderSelect").value = "";
                document.getElementById("memberSelect").value = "";
              }catch (e){}
            }
            this.modal1 = false;
          },
          delGrpClick: function(index){
//              if(confirm("您确定要删除该教研组吗？")){
//              判断当前详细信息是否为操作删除的教研组
              /*var n = 0;
              for(var i = 0;i < this.TARgroupInfoList.length;i++){
                if(this.TARgroupInfoList[i].targroupName == this.groups[index]){
                  n = i;
                  break;
                }
              }*/
            if(this.groups[index].id == "") {
//              判断是否为未保存的新增教研组
              if (this.groupId == index) {
                this.groupId = 0;
                this.groupName = "";
                this.groupNumber = "";
                this.targroupType = "";
                this.leaders = [];
                this.members = [];
                try {
                  document.getElementById("leaderSelect").value = "";
                  document.getElementById("memberSelect").value = "";
                } catch (e) {
                }
              }
              this.groups.splice(index, 1);
              this.modal2 = false;
            }else {
//              this.$http.post('../testPhp/classroomMgmtSave.php',{
              this.$http.post('./targroupManage/deleteTargroup', {
                "targroupId": this.groups[index].id
              }, {
                "Content-Type": "application/json"
              }).then(function (response) {
                this.modal2 = false;
                console.log("删除教研组:");
                console.log(response.body);
                var data = response.body;
                if (data.result == "1") {
                  if (this.groupId == index) {
                    this.groupId = 0;
                    this.groupName = "";
                    this.groupNumber = "";
                    this.targroupType = "";
                    this.leaders = [];
                    this.members = [];
                    try {
                      document.getElementById("leaderSelect").value = "";
                      document.getElementById("memberSelect").value = "";
                    } catch (e) {
                    }
                  }
                  this.groups.splice(index, 1);
                } else {
                  this.$Message.error("操作失败，请重试！");
                }
              }, function (error) {
                this.modal2 = false;
                this.$Message.error("连接失败，请重试！");
              });
            }
//            }
          },
//          删除功能
          addClick: function(){
            for (var i = 0; i < this.groups.length; i++) {
              if (this.groups[i].id == "") {
                this.errorMessage = "请不要多次添加未编辑录入的教研组！";
                this.modal6 = true;
                return;
              }
            }
            this.groups.push({name:"请编辑后保存",id:"",index:null});
          },
//          增加功能
          deleteClick: function(){
            var delSpan = document.getElementsByClassName("delSpan");
            var addP = document.getElementById("addP");
            var i = 0 ;
            if (addP.innerHTML == "删除") {
              for (i = 0; i < delSpan.length; i++) {
                delSpan[i].style.display = "inline";
                addP.innerHTML = "取消"
              }
            } else if (addP.innerHTML == "取消") {
              for (i = 0; i < delSpan.length; i++) {
                delSpan[i].style.display = "none";
                addP.innerHTML = "删除";
              }
            }
          },
//          删除功能点击监听，改变删除状态，显示或隐藏删除小图标
          /*editClick: function(){
            var groupInput = document.getElementsByClassName("groupInput");
            var state = document.getElementById("editP");
            var i = 0;
            if(state.innerHTML == "编辑"){
              for( i = 0; i < groupInput.length; i++) {
//          使课程信息的输入标签变为可输入，显示边框,显示保存功能
                groupInput[i].style.border = "thin solid";
                groupInput[i].style.cursor = "text";
                groupInput[i].readOnly = false;
                state.innerHTML = "保存";
              }
            }else if(state.innerHTML == "保存"){
              if(!confirm("您确定保存修改吗？")) {
                if(confirm("是否取消修改并退出编辑？")) {
                  for ( i = 0; i < groupInput.length; i++) {
//                    不保存修改，重置数据并退出编辑,使课程信息的输入标签变为不可输入，隐藏边框
                    groupInput[i].value = this.groups[i];
                    groupInput[i].style.border = "none";
                    groupInput[i].style.cursor = "pointer";
                    groupInput[i].readOnly = true;
                    state.innerHTML = "编辑";
                  }
                }
              }else{
                var index = 0;
                var res = false;
                for(var i = 0;i < this.groups.length;i++){
                  if(groupInput[i].value != this.groups[i]){//如果名称发生修改
                    index = i;
                    for(var i = 0;i < this.TARgroupInfoList.length;i++){
                      if(this.TARgroupInfoList[i].targroupName == this.groups[index]){//找到对应发生修改的data
                        this.$http.post('../testPhp/classroomMgmtSave.php',{//提交名称修改
                          "targroupId": this.TARgroupInfoList[i].targroupId,
                          "targroupName": groupInput[i].value,
                          "targroupType": this.TARgroupInfoList[i].targroupType,
                          "targroupLeader": this.TARgroupInfoList[i].targroupLeader,
                          "targroupTeacher": this.TARgroupInfoList[i].targroupTeacher
                        },{
                          "Content-Type":"application/json"
                        }).then(function(response){
                          console.log("保存教研组:");
                          console.log(response.body);
                          var data = response.body;
                          if(data.result == "1"){
                            res = true;
                          }else{
                            res = false;
                            this.$Message.error("操作失败！请重试");
                          }
                        },function(error){
                          this.$Message.error("连接失败！请重试");
                        });
                      }
                    }
                    if(res){//全部名称修改成功，退出编辑状态
                      for (i = 0; i < groupInput.length; i++) {
                        groupInput[i].style.border = "none";
                        groupInput[i].style.cursor = "pointer";
                        groupInput[i].readOnly = true;
                        state.innerHTML = "编辑";
                      }
                    }
                  }
                }
                if(this.groups.length > this.TARgroupInfoList.length){
                  if(confirm("存在待添加的新教研组，是否清空右侧详细信息进行该新教研组的录入？(录入后才能修改教研组名称)")){
                    this.groupId = this.groups.length - 1;
                    this.groupName = this.groups[this.groupId];
                    this.groupNumber = "";
                    this.targroupType = "";
                    this.leaders = [];
                    this.members = [];
                  }else{
                    this.groups.splice(this.TARgroupInfoList.length - 1,this.groups.length - this.TARgroupInfoList.length);//删除未编辑保存的待添加新教研组
                  }
                }
              }
            }
          },
//          编辑功能*/
          addPerson: function(type){
            var select = document.getElementById(type+"Select");
            if(select.value != "") {
              if(type == "member") {
                for(var i = 0;i < this.members.length;i++){
                  if(select.value == this.members[i]){
                    this.errorMessage = "请勿重复添加！";
                    this.modal6 = true;
                    return;
                  }
                }
                this.members.push(select.value);
              }else{
                for(var i = 0;i < this.leaders.length;i++){
                  if(select.value == this.leaders[i]){
                    this.errorMessage = "请勿重复添加！";
                    this.modal6 = true;
                    return;
                  }
                }
                this.leaders.push(select.value);
                for(var i = 0;i < this.members.length;i++){
                  if(select.value == this.members[i]){
                    return;
                  }
                }
                this.members.push(select.value);
              }
            }
          },
//          教研组成员增加功能
          removePerson: function(index,persons){
            persons.splice(index,1);
            this.modal3 = false;
          },
//          教研组成员删除功能
          save: function(){
            if(this.targroupType == ""){
              this.modal4 = false;
              this.errorMessage = "教研组类别不能为空！";
              this.modal6 = true;
            }else if(this.leaders.length == 0 || this.members.length == 0){
              this.modal4 = false;
              this.errorMessage = "组长和成员不能为空！";
              this.modal6 = true;
            }else {
              var operationDiv = document.getElementById("operationDiv");
              operationDiv.style.display = "none";
              if(this.isAdd) {
//                  判断是否为未保存的新增教研组
//                  this.$http.post('../testPhp/classroomMgmtSave.php', {
                this.$http.post('./targroupManage/addTargroup', {
                  "targroupId": this.groupNumber,
                  "targroupName": this.groupName,
                  "targroupType": this.targroupType,
                  "targroupLeader": this.leaders,
                  "targroupTeacher": this.members
                }, {
                  "Content-Type": "application/json"
                }).then(function (response) {
                  this.modal4 = false;
                  console.log("添加教研组:");
                  console.log(response.body);
                  var data = null;
                  data = response.body;
                  if (data.result == "1") {
                    this.isAdd = false;
                    this.$Message.success("保存成功!");
                    setTimeout("location.reload()",2000);
                  } else {
                    operationDiv.style.display = "block";
                    this.modal4 = false;
//                      this.$Message.error("操作失败，请重试！");
                    this.errorMessage = "操作失败，请重试！";
                    this.modal6 = true;
                  }
                }, function (error) {
                  operationDiv.style.display = "block";
                  this.modal4 = false;
                  this.$Message.error("连接失败，请重试！");
                });
              }else{
//                  this.$http.post('../testPhp/classroomMgmtSave.php', {
                this.$http.post('./targroupManage/editTargroup', {
                  "targroupId": this.groupNumber,
                  "targroupName": this.groupName,
                  "targroupType": this.targroupType,
                  "targroupLeader": this.leaders,
                  "targroupTeacher": this.members
                }, {
                  "Content-Type": "application/json"
                }).then(function (response) {
                  this.modal4 = false;
                  console.log("保存教研组:");
                  console.log(response.body);
                  var data = null;
                  data = response.body;
                  if (data.result == "1") {
                    this.isAdd = false;
                    this.$Message.success("保存成功!");
                    setTimeout("location.reload()",2000);
                  } else {
                    operationDiv.style.display = "block";
                    this.modal4 = false;
//                      this.$Message.error("操作失败，请重试！");
                    this.errorMessage = "操作失败，请重试！";
                    this.modal6 = true;
                  }
                }, function (error) {
                  operationDiv.style.display = "block";
                  this.modal4 = false;
                  this.$Message.error("连接失败，请重试！");
                });
              }
            }
          },
//          教研组成员删除功能
          cancel: function(){
            location.reload();
            this.modal5 = false;
          }
        }
    }
</script>

<style scoped>
    html {
    }
    /*最上层Div*/
    #eduResearchGroupManagementDiv {
      margin: 0 auto;
      background-color: #f3f3f3;
      height: 100%;
    }
    .positionBar {
      /*首页导航*/
      margin: .8rem 5rem 0;
    }
    /*页面主要内容*/
    #mainDiv{
      min-height: 36rem;
      display: flex;
      align-items: center;
    }
    /*教研组区域*/
    #groupDiv{
      border: thin solid #6D6D6D;
      background-color: white;
      width: 15rem;
      height: 32rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 5rem;
    }
    /*“教研组名称”标题*/
    #headP{
      font-size: 1.5rem;
      border-bottom: solid #158064;
      text-align: center;
      padding: 0.5rem 0;
      height: 6%;
      width: 96%;
      margin: 0;
    }
    /*教研组名称列表*/
    #grpListDiv{
      background-color: white;
      list-style: none;
      height: 83%;
      width: 96%;
      overflow-y: auto;
    }
    /*教研组名称*/
    .groupP{
      border-bottom: thin solid #6D6D6D;
      padding: 0.8rem 0;
      width: 100%;
      margin: 0;
      text-align: center;
    }
    /*删除小图标*/
    .delSpan{
      color: red;
      display: none;
    }
    #groupInput{
      border: none;
    }
    /*教研组名称输入框*/
    .groupInput{
      border: none;
      text-align: center;
    }
    .groupInput:hover{
      cursor: pointer;
    }
    /*操作区域*/
    #operationP{
      background-color: white;
      border-top: solid #158064;
      display: flex;
      align-items: stretch;
      justify-content: space-around;
      width: 96%;
      font-size: 0.8rem;
      height: 10%;
      margin: 0;
    }
    /*操作名称*/
    .operation{
      margin: 0;
    }
    img{
      width: 1.2rem;
    }
    /*操作图标*/
    .operationSpan{
      margin: 0.5rem;
    }
    span:hover{
      cursor: pointer;
    }
    /*教研组详细信息区域*/
    #grpInfoDiv{
      background-color: white;
      border: thin solid black;
      width: 48rem;
      height: 32rem;
      margin-left: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    /*详细信息中教研组名称标题*/
    #grpNameP{
      width: 96%;
      border-bottom: solid #158064;
      min-height: 1rem;
      padding: 0.5rem;
      text-align: left;
      margin: 0;
    }
    /*详细信息编辑区域*/
    #infoEditDiv{
      padding-top: 1rem;
      text-align: left;
      /*border: solid;*/
      width: 96%;
      height: 70%;
      overflow-y: auto;
    }
    /*成员区域*/
    .personDiv{
      display: flex;
      flex-wrap: wrap;
      padding-left: 2.5rem;
    }
    /*提示语*/
    .tipSpan{
      position: relative;
      top: 0.3rem;
    }
    button{
      width: 5.6rem;
      margin-right: 1.4rem;
    }
    button:hover{
      cursor: pointer;
    }
    button:active{
      background-color: #00a539;
    }
    @media screen and (min-width: 1201px) {
      #grpInfoDiv{
        margin-left: 0;
      }
      #groupDiv{
        margin-left: 0;
      }
      #mainDiv{
        justify-content: space-around;

      }
    }
</style>
