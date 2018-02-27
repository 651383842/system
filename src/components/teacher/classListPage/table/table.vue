<template>
  <div>
    <div  class="positionBar">
      <span>您当前的位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span>>班级管理</span>
    </div>
    <div id="back">
    <div id="table">
      <div>
        <span v-show="!selShow" style="margin-left: 1rem">班级名称：{{className}}</span>
        <span v-show="selShow">
          <select style="margin-left: 1rem" v-model="classId" @change="classChange">
            <option value="">请选择班级</option>
            <option v-for="classinfo in classinfoList" :value="classinfo.classId">{{classinfo.className}}</option>
          </select>
        </span>
        <button style="margin-left: 5rem;" class="am-btn am-btn-success am-radius" @click="saveDia">保存</button>
        <button class="am-btn am-btn-success am-radius" @click="load">导出</button>
      </div>
      <div id="bottom">
        <span>班级名单</span>
      </div>
      <div id="show">
        <table class="operationTable">
          <thead>
            <tr>
              <th>序号</th>
              <th>姓名</th>
              <th>学号</th>
              <th>班级任职</th>
              <th>状态</th>
              <th>备注</th>
              <th>学生信息</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data,index) in studentList" :key="data.studentId">
              <td>{{ index+1 }}</td>
              <td  v-text="data.studentName"></td>
              <td  v-text="data.studentId"></td>
              <td>
                <select v-model="data.studentDuty">
                <option  v-for="studentDuty in studentDutys">
                  {{ studentDuty }}
                </option>
              </select>
              </td>
              <td>
                <select @change="canInput(index)"  :id="'currentStates'+index" v-model="data.currentState">
                <option v-for="currentState in currentStates">
                  {{ currentState }}
                </option>
              </select>
              </td>
              <td>
                <textarea :id="'canInput'+index" readonly v-model="data.changeReason"></textarea>
                <!--<input :id="'canInput'+index" readonly v-model="data.changeReason">-->
              </td>
              <td>
                <span :id="'selfInfo'+index" style="text-decoration: underline; cursor: pointer"  @click="selfInfo(index)">查看学生个人信息</span>
              </td>
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
          <p>您确定保存信息吗？</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="save()">确定</button>
          <button id="modalBtn" @click="modal1 = false">取消</button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
              className:'',
              classSize:'',
              classinfoList:[
//                {classId: "201451", className: "高2014级1班",classSize: 54, classTeacherId: "0112",gradeId: "20145",specialityId: "护理",studyMode: "5"},
//                {classId: "201452", className: "高2014级2班",classSize: 54, classTeacherId: "0112",gradeId: "20145",specialityId: "护理",studyMode: "5"}
              ],
              selShow:true,
              classId:'',
              tableList:[
//                {changeReason: null, classId: null, currentState: "1",pendResult: null, studentDuty: "1", studentId: "20145101", studentName: "柏"},
//                {changeReason: null, classId: null, currentState: "2",pendResult: null, studentDuty: "2", studentId: "20145102", studentName: "柏文"},
//                {changeReason: null, classId: null, currentState: "3",pendResult: null, studentDuty: "3", studentId: "20145103", studentName: "柏文静"}
              ],
              studentList:[],
              studentDutys:[
                '班长',
                '副班长',
                '学习委员',
                '纪律委员',
                '无'
              ],
              modal1: false,
              currentStates:[
                '在读',
                '申请休学',
                '申请退学'
              ]
            }
        },
      beforeMount:function(){
        this.$Loading.start();
        this.$http.post('./classManage/getStudentStateInfo',{},
          {"Content-Type":"application/json"}).then(function (response) {
            this.tableList = response.body.studentAndStateList;
            for(var i=0;i<this.tableList.length;i++){
              if(this.tableList[i].currentState=="1"){
                this.tableList[i].currentState="在读";
              }else if(this.tableList[i].currentState=="2"){
                this.tableList[i].currentState="申请休学";
              }else if(this.tableList[i].currentState=="3"){
                this.tableList[i].currentState="申请退学";
              }
            }
            for(var n=0;n<this.tableList.length;n++){
              if(this.tableList[n].studentDuty=="1"){
                this.tableList[n].studentDuty="班长";
              }else if(this.tableList[n].studentDuty=="2"){
                this.tableList[n].studentDuty="副班长";
              }else if(this.tableList[n].studentDuty=="3"){
                this.tableList[n].studentDuty="学习委员";
              }else if(this.tableList[n].studentDuty=="4"){
                this.tableList[n].studentDuty="生活委员";
              }else if(this.tableList[n].studentDuty=="5"){
                this.tableList[n].studentDuty="纪律委员";
              }else if(this.tableList[n].studentDuty=="6"){
                this.tableList[n].studentDuty="文体委员";
              }else{ this.tableList[n].studentDuty="无";}
            }
            if(response.body.classinfoList.length == 1)
            {
              this.selShow  = false;
              this.className = response.body.classinfoList[0].className;
              this.classId = response.body.classinfoList[0].classId;
              this.studentList = this.tableList;
            }else
            {
              this.classinfoList = response.body.classinfoList;
            }
            this.$Loading.finish();
          },
          function(error){
            this.$Loading.error();
            this.$Message.error("网络错误，请稍后重试！");
          });
      },
      methods: {
        classChange:function () {
//          console.log("@@@");
//          console.log(this.studentList.length);
//          console.log(this.tableList.length);
//          console.log(this.classId);
            if(this.classId.length>0)
            {
              this.studentList.splice(0,this.studentList.length);
              for(var i = 0;i < this.tableList.length;i++)
              {
                if(this.tableList[i].studentId.substring(0,6) == this.classId)
                {
                  this.studentList.push(this.tableList[i]);
                }
              }
            }
        },
        saveDia:function(){
          this.modal1 = true;
        },
        canInput:function(index){
          var canInput = document.getElementById("canInput"+index);
          canInput.readOnly = false;
        },
        save:function(){
          this.modal1 = false;
          for(var i=0;i<this.studentList.length;i++){
            if(this.studentList[i].currentState=="在读"){
              this.studentList[i].currentState="1"
            }else if( this.studentList[i].currentState=="申请休学"){
              this.studentList[i].currentState="2"
            }else if( this.studentList[i].currentState=="申请退学"){
              this.studentList[i].currentState="3"
            }
          }
          for(var n=0;n<this.studentList.length;n++){
            if(this.studentList[n].studentDuty=="班长"){
              this.studentList[n].studentDuty="1"
            }else if( this.studentList[n].studentDuty=="副班长"){
              this.studentList[n].studentDuty="2"
            }else if( this.studentList[n].studentDuty=="学习委员"){
              this.studentList[n].studentDuty="3"
            }else if(this.studentList[n].studentDuty=="生活委员"){
              this.studentList[n].studentDuty="4"
            }else if(this.studentList[n].studentDuty=="纪律委员"){
              this.studentList[n].studentDuty="5"
            }else if(this.studentList[n].studentDuty=="文体委员"){
              this.studentList[n].studentDuty="6"
            }else if(this.studentList[n].studentDuty=="无"){
              this.studentList[n].studentDuty="7"
            }
              }
          this.$http.post('./classManage/editStudentStateInfo',
            JSON.stringify({
            "studentAndStateList":this.studentList,
              "classId":this.classId
          }),{"Content-Type":"application/json"}).then(function (response) {
              if(response.body.result=="1")
              {this.$Message.success('操作成功！2s后刷新');
               setTimeout(" location.reload();",2000);}
            },
            function(error){
            });
        },
        //导出
        load:function(){
          location.href='./classManage/exportClassStudentInfo?classId='+this.classId;
        },
        //跳转到学生个人信息
        selfInfo:function(index){
          var id=this.studentList[index].studentId;
          location.href='#/teacher/class/checkStudentInfo?'+id;
        }

      }
    }
</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  #back{
    background-color: #f3f3f3;
    padding-left: 5rem;
    padding-right: 5rem;
  }
#table{
  background-color: white;
  /*margin-right:5rem;*/
  /*margin-left:5rem;*/
  height:30rem;
  position: relative;
  top:0.5rem;
}
#bottom{
    background-color: #158064;
    color:white;
    text-align: left;
    position: relative;
    padding-left:2rem;
   padding-top:0.7rem;
  padding-bottom: 0.7rem;

  }
  textarea{
    border: 0.1rem solid #d4d4d9;
  }
  button{

  }
  /*table{*/
    /*width:96%;*/
    /*margin-left:1rem;*/
    /*margin-right:1rem;*/
    /*border: solid 1px white;*/
    /*border-collapse: collapse;*/
  /*}*/
/*thead{*/
  /*border-bottom:solid 2px lightgrey;*/
/*}*/

tr{
  height:3rem;
}
select{
  border: 0.1rem solid #d4d4d9;
  border-radius: 0.7rem;
  outline: none;
  padding: 0.3rem 0.5rem;
  font-size: 0.8rem;
}
</style>
