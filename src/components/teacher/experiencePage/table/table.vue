<template>
  <div>
    <div  class="positionBar">
      <span>您当前的位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span> > 个人信息</span>
    </div>
    <div id="table">
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
                <th width="%25">临床工作单位</th>
                <th width="%25">工作岗位</th>
                <th width="%20">开始时间</th>
                <th width="%20">结束时间</th>
                <th width="%10">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data,index) in tableList" :key="data.workExperienceId">
                <td width="%25"><input style="width: 10rem;" readonly onkeyup="this.value=this.value.replace(/\s+/g,'')"  :id="'clinicWorkUnit'+index" type="text" v-model.lazy="data.clinicWorkUnit"></td>
                <td width="%25"><input style="width: 10rem;" readonly onkeyup="this.value=this.value.replace(/\s+/g,'')"  :id="'workPost'+index" type="text" v-model.lazy="data.workPost"></td>
                <!--<td width="%20"><input readonly onkeyup="this.value=this.value.replace(/\s+/g,'')"  :id="'startTime'+index" type="text" v-model.lazy="data.startTime"></td>-->
                <td style="align:center" width="20%"><Date-picker v-model.lazy="data.startTime" :id="'startTime'+index" type="date" placeholder="选择日期" style="width: 6rem;margin-left: 1rem;"></Date-picker></td>
                <!--<td width="%20"><input readonly onkeyup="this.value=this.value.replace(/\s+/g,'')"  :id="'endTime'+index" type="text" v-model.lazy="data.endTime"></td>-->
                <td width="20%"><Date-picker v-model.lazy="data.endTime" :id="'endTime'+index" type="date" placeholder="选择日期" style="width: 6rem;margin-left: 1rem;"></Date-picker></td>
                <td width="%10">
                  <img title="保存" @click="operationClick(index,'save')" class='img'style="display:none;" :src="imgSrc1" :id="'save'+index">
                  <img title="取消" @click="operationClick(index,'edit')"class='img'style="display:none;" :src="imgSrc2" :id="'edit'+index">
                  <img title="编辑" @click="chang(index)" class='img' style="display:inline;" :src="imgSrc3" :id="'chang'+index">
                  <img title="删除" @click="operationClick(index,'del')" class='img' style="display:inline;" :src="imgSrc4" :id="'del'+index">
                </td>
              </tr>
              <tr>
               <td>  <img  @click="add" id='img5' title="添加"  :src="imgSrc5" ></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
         </div>
        <div>
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
          <button id="modalBtn" @click="edit(operationIndex)">确定</button>
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
          <p>您确定要删除该临床经验吗？</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="del(operationIndex)">确定</button>
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
          <button id="modalBtn" @click="save(operationIndex)">确定</button>
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
        <p>请输入完整信息！</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="modal4 = false">确定</button>
      </div>
    </Modal>
      <Modal
        v-model="modal5"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
        <div style="font-size: 1.1rem;text-align: center;">
          <p>请重新确认工作时间段！</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="modal5 = false">确定</button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import icon1 from'./right.png'
  import icon2 from'./wrong.png'
  import icon3 from'./change.png'
  import icon4 from'./delete.png'
  import icon5 from'./plus.png'
    export default {
      name: '',
      data () {
        return {
          imgSrc1: icon1,
          imgSrc2: icon2,
          imgSrc3: icon3,
          imgSrc4: icon4,
          imgSrc5: icon5,
          subtitle1: '个人信息',
          subtitle2: '临床经历',
          tableList: [],
          modal1: false,
          modal2: false,
          modal3: false,
          modal4: false,
          modal5: false,
          operationIndex: 0
        }
      },
      beforeMount: function () {
        this.$http.post('./teacherManage/getTeacherWorkInfo',{},
          {"Content-Type": "application/json"}).then(function (response) {
            this.tableList = response.body.workexperienceList;
          },
          function (error) {
          });
      },
      methods: {
        //打开对话框
        operationClick: function (operationIndex, operation) {
          this.operationIndex = operationIndex;
          if (operation == "edit") {
            this.modal1 = true;
          } else if (operation == "del") {
            this.modal2 = true;
          } else if (operation == "save") {
            if(this.tableList[operationIndex].clinicWorkUnit==''||this.tableList[operationIndex].workPost==''||
              this.tableList[operationIndex].startTime==''){
              this.modal4=true;
            }else {
              this.modal3 = true;
            }
          }
        },
        //添加
        add: function () {
          this.tableList.push({clinicWorkUnit: '', workPost: '', startTime: '', endTime: '', workExperienceId: ''});
        },
        //保存
        save: function (index) {
          if(this.tableList[index].startTime<=this.tableList[index].endTime) {
            this.modal3 = false;
//          var unit = document.getElementById("clinicWorkUnit" + index);
//          if (unit.value != "") {
//            this.$http.post('../jsonphp/experience.php', {
//          alert( this.tableList[index].startTime);
            this.$http.post('./teacherManage/editTeacherWorkInfo', {
              "clinicWorkUnit": this.tableList[index].clinicWorkUnit,
              "workPost": this.tableList[index].workPost,
              "startTime": this.tableList[index].startTime,
              "endTime": this.tableList[index].endTime,
              "workExperienceId": this.tableList[index].workExperienceId
            }, {"Content-Type": "application/json"}).then(function (response) {
              if (response.body.result == '1') {
                this.$Message.success('操作成功！');
                var t = setTimeout(" location.reload();", 2000)
              }
            }, function (error) {
              console.log("传递error:");
              console.log(error);
            });
            var save = document.getElementById("save" + index);
            save.style.display = 'none';
            var edit = document.getElementById("edit" + index);
            edit.style.display = 'none';
            var chang = document.getElementById("chang" + index);
            chang.style.display = 'inline';
            var del = document.getElementById("del" + index);
            del.style.display = 'inline';
            unit.readOnly = true;
            unit.style.border = 'none';
            var job = document.getElementById("workPost" + index);
            job.readOnly = true;
            job.style.border = 'none';
//            var begin = document.getElementById("startTime" + index);
//            begin.readOnly = true;
//            begin.style.border = 'none';
//            var last = document.getElementById("endTime" + index);
//            last.readOnly = true;
//            last.style.border = 'none';
//          }
//          else {
//            alert('请输入临床工作单位！');
//          }
          }else{
            this.modal3 = false;
            this.modal5 = true;
          }
        },
        //取消保存
        edit: function (index) {
//            this.modal1 = false;
          location.reload();
//            if(confirm('取消保存？')) {
//              var save=document.getElementById("save"+index);
//              save.style.display='none';
//              var edit=document.getElementById("edit"+index);
//              edit.style.display='none';
//              var chang=document.getElementById("chang"+index);
//              chang.style.display='inline';
//              var del=document.getElementById("del"+index);
//              del.style.display='inline';
//              var unit = document.getElementById("clinicWorkUnit"+index);
//              unit.readOnly=true;
//              unit.style.border='none';
//              var job = document.getElementById("workPost"+index);
//              job.readOnly=true;
//              job.style.border='none';
//              var begin = document.getElementById("startTime"+index);
//              begin.readOnly=true;
//              begin.style.border='none';
//              var last = document.getElementById("endTime"+index);
//              last.readOnly=true;
//              last.style.border='none';
//              取消保存时后台应返回之前的值
        },
        //删除
        del: function (index) {
          this.modal2 = false;
          if(this.tableList[index].workExperienceId =="")
          {
            this.tableList.splice(index, 1);
            this.$Message.success('操作成功！');
            return;
          }
          this.$http.post('./teacherManage/deleteTeacherWorkInfo',{
            "workExperienceId": this.tableList[index].workExperienceId
          }, {"Content-Type": "application/json"}).then(function (response) {
            if (response.body.result == '1') {
              this.$Message.success('操作成功！');
              this.tableList.splice(index, 1);
            }
          }, function (error) {
          });
        },
        //进行编辑
        chang: function (index) {
//            this.modal1 = true;
          var unit = document.getElementById("clinicWorkUnit" + index);
          unit.readOnly = false;
          unit.style.border = ' 0.1rem solid #d4d4d9';
          var job = document.getElementById("workPost" + index);
          job.readOnly = false;
          job.style.border = ' 0.1rem solid #d4d4d9';
//          var begin = document.getElementById("startTime" + index);
//          begin.readOnly = false;
//          begin.style.border = ' 0.1rem solid #d4d4d9';
//          var last = document.getElementById("endTime" + index);
//          last.readOnly = false;
//          last.style.border = ' 0.1rem solid #d4d4d9';

          var save = document.getElementById("save" + index);
          save.style.display = 'inline';
          var edit = document.getElementById("edit" + index);
          edit.style.display = 'inline';
          var chang = document.getElementById("chang" + index);
          chang.style.display = 'none';
          var del = document.getElementById("del" + index);
          del.style.display = 'none';
        }
      }
    }
</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  html{
    font-size: 16px;
  } /*整个页面的样式*/
  #table{
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
    overflow: auto;
    display: flex;
    justify-content: space-between;
    padding-top: 0.5rem;
    border-top: 0.15rem solid #158064;
    position: relative;
    top:1rem;
    height:25rem;
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

  button{
    color: white;
    background-color: mediumseagreen;
    border: none;
    border-radius: 0.2rem;
    width: 5rem;
    height: 2rem;
    min-width: 5rem;
  }
  .img{
    width:1.5rem;
    height:1.5rem;
  }
  #img5{
    width:1.5rem;
    height:1.5rem;
    position:relative;
    left:1rem;
  }
  input{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.3rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    font-size: 0.8rem;
    width:6rem;
    margin-left:2rem;
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
</style>
