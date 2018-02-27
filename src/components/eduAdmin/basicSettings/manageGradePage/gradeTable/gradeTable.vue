<template>
  <div style="padding: 0.6rem 5rem;margin-top: 0.5rem;background-color: #f3f3f3">
    <div id="gradeManagementDiv" style="background-color: white">
      <div id="fiveYearDiv" v-show="gradeManagement">
        <button class="amButtom" @click="fiveYearClick"><img id="fiveYearArrow" class="iconImg" :src="icon2"><span class="subtitle">{{firstYearType}}年制</span></button>
        <table id="fiveYearTable" v-show="fiveYearTable"  class="operationTable" style="table-layout: fixed;">
          <tr>
            <td>年级</td>
            <td>班级数</td>
            <td>班级管理</td>
            <td>操作</td>
          </tr>
          <tr v-for="(fiveGrade,index) in fiveGrades" :id="'fiveInputTr'+index">
            <td><input class="gradeInput" type="text" :value="fiveGrade.gradeName" readonly="readonly"></td>
            <td><input class="gradeInput" type="text" :value="fiveGrade.studentNum" readonly="readonly"></td>
            <td class="checkGradeInfo" @click="checkGradeInfoClick(firstYearType,fiveGrade.gradeName)"><u>班级管理</u></td>
            <td>
              <img :id="'fiveDeleteImg'+index" title="删除" src="./images/delete.png" @click="deleteGradeClick(firstYearType,fiveGrades[index].gradeName,'1',index)">
            </td>
          </tr>
          <tr>
            <td><img src="../../../../../assets/images/add.png" @click="modal1 = true" title="新增三年制"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <!--第一个年制年级基本信息表格-->
      <!--由于年制数据由后台传输过来，所以并不知道5年制和3年制谁先谁后，代码中的fiveYearType,threeYearType不代表年制-->
      <div id="threeYearDiv" v-show="gradeManagement">
        <button class="amButtom" @click="threeYearClick"><img id="threeYearArrow" class="iconImg" :src="icon1"><span class="subtitle">{{secondYearType}}年制</span></button>
        <table id="threeYearTable" v-show="threeYearTable"  class="operationTable" style="table-layout: fixed;">
          <tr>
            <td>年级</td>
            <td>班级数</td>
            <td>班级管理</td>
            <td>操作</td>
          </tr>
          <tr v-for="(threeGrade,index) in threeGrades" :id="'threeInputTr'+index">
            <td><input class="gradeInput" type="text" :value="threeGrade.gradeName" readonly="readonly"></td>
            <td><input class="gradeInput" type="text" :value="threeGrade.studentNum" readonly="readonly"></td>
            <td class="checkGradeInfo" @click="checkGradeInfoClick(secondYearType,threeGrade.gradeName)"><u>班级管理</u></td>
            <td>
              <img :id="'threeDeleteImg'+index" title="删除" src="./images/delete.png" @click="deleteGradeClick(secondYearType,threeGrades[index].gradeName,'2',index)">
            </td>
          </tr>
          <tr>
            <td><img src="../../../../../assets/images/add.png" @click="modal2 = true" title="新增五年制"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <!--第二个年制年级基本信息表格-->
      <div>
        <modal v-model="modalOperateBool" width="400" id="modalBody">
          <div style="text-align: center;font-size: 1.1rem;">
            <p>该年级的所有教学计划和班级信息都会被删除，请谨慎对待！是否确定删除</p>
          </div>
          <div slot="footer" style="text-align: center">
            <button id="modalBtn" @click="deleteOk()">确定</button>
            <button id="modalBtn" @click="operateCancel">取消</button>
          </div>
        </modal>
        <!--确认删除操作弹窗-->
        <modal v-model="modalResultBool" width="400" id="modalBody">
          <div style="text-align: center;font-size: 1.1rem;">
            <p>删除失败</p>
          </div>
          <div slot="footer" style="text-align: center">
            <button id="modalBtn" @click="resultOk">确定</button>
          </div>
        </modal>
        <!--确认删除失败弹窗-->
      </div>
      <div v-show="gradeTable">
        <table id="gradeClassInfoDiv" class="operationTable" style="table-layout: fixed;">
          <thead>
          <tr>
            <th>年级</th>
            <th>专业名称</th>
            <th>班级ID</th>
            <th>班级名称</th>
            <th>班主任姓名</th>
            <th>学制</th>
            <th>班级人数</th>
            <th>教室</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(classinfoStr,index) in classinfoStrList" :id="'inputTable'+index">
            <td><input id="input1" :value="classinfoStr.gradeName" readonly="readonly" style="border: none"></td>
            <td><input id="input2" :value="classinfoStr.specialityName" readonly="readonly" style="border: none"></td>
            <td><input id="input3" :value="classinfoStr.classId" readonly="readonly" style="border: none"></td>
            <td><input id="input4" :value="classinfoStr.className" readonly="readonly" style="border: none"></td>
            <td>
              <input id="input5" :value="classinfoStr.classTeacherName" readonly="readonly" style="border: none">
              <select :id="index + 'select1'" class="selectWM" v-model="editBuffer[index].classTeacherId" style="display: none">
                <option v-for="teacher in teacherList" :value="teacher.teacherId">{{teacher.teacherName}}</option>
              </select>
            </td>
            <td><input id="input6" :value="classinfoStr.schoolYearType" readonly="readonly" style="border: none"></td>
            <td><input id="input7" :value="classinfoStr.classSize" readonly="readonly" style="border: none"></td>
            <td>
              <input id="input8" :value="classinfoStr.classroomId" readonly="readonly" style="border: none">
              <select :id="index + 'select2'" class="selectWM" v-model="editBuffer[index].classroomId"  style="display: none">
                <option :value="classinfoStr.classroomId">{{classinfoStr.classroomId}}</option>
                <option v-for="room in classroomList" :value="room.classroomId">{{room.classroomId}}</option>
              </select>
            </td>
            <td>
              <img :id="'editImg'+index" title="修改" class="btnImg" src="./images/edit.png" @click="editClick(index)">
              <img :id="'saveImg'+index" title="保存" class="btnImg" src="./images/save.png" style="display: none" @click="saveClick(index)">
              <img :id="'deleteImg'+index" title="删除" class="btnImg" src="./images/delete.png" @click="deleteClick(index)">
              <img :id="'restoreImg'+index" title="取消" class="btnImg" src="./images/restore.png" style="display: none" @click="restoreClick(index)">
            </td>
          </tr>
          </tbody>
        </table>
        <!--班级信息表格-->
        <div>
          <modal v-model="modalGradeOperateBool" width="400" id="modalBody">
            <div style="text-align: center;font-size: 1.1rem;">
              <p v-if="operateMsg==='1'">是否确定保存修改</p>
              <p v-else-if="operateMsg==='2'">是否确定取消修改</p>
              <p v-else>该班级的所有课程信息都会被删除，请谨慎对待！是否确定删除</p>
            </div>
            <div slot="footer" style="text-align: center">
              <button v-if="operateMsg==='1'" id="modalBtn" @click="saveGradeOk()">确定</button>
              <button v-else-if="operateMsg==='2'" id="modalBtn" @click="cancelGradeOk()">确定</button>
              <button v-else id="modalBtn" @click="deleteGradeOk()">确定</button>
              <button id="modalBtn" @click="operateGradeCancel">取消</button>
            </div>
          </modal>
          <!--用户修改，取消修改班级信息，删除班级时，弹窗提醒确认-->
          <modal v-model="modalGradeResultBool" width="400" id="modalBody">
            <div style="text-align: center;font-size: 1.1rem;">
              <p v-if="operateMsg === '1'">保存修改失败</p>
              <p v-else-if="operateMsg === '3'">删除失败</p>
              <p v-else>{{errMsg}}</p>
            </div>
            <div slot="footer" style="text-align: center">
              <button id="modalBtn" @click="resultGradeOk">确定</button>
            </div>
          </modal>
          <!--弹窗提醒修改，取消修改班级信息，删除班级操作结果-->
        </div>
        <div id="buttonDiv">
          <span><button id="downloadForm" class="bottomButton am-btn am-btn-success am-radius" @click="downloadFormClick">下载模板</button></span>
          <span style="display: inline-block">
            <Upload
              ref="upload"
              :show-upload-list = false
              :format="['xls','xlsx']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleSizeError"
              :on-success="handleSuccess"
              :on-error="handleError"
              action="./gradeManage/uploadClassInfo">
              <button type="ghost" id="leadIn" class="bottomButton am-btn am-btn-success am-radius">上传</button>
            </Upload>
          </span>
          <span><button id="leadOut" class="bottomButton am-btn am-btn-success am-radius" @click="downloadClick">下载</button></span>
          <span><button id="goBack" class="bottomButton am-btn am-btn-success am-radius" @click="goBackClick()">返回</button></span>
        </div>
      </div>
      <!--上传，下载按钮，返回按钮-->
      <Modal
        v-model="modal1"
        width="250"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}" draggable="true">
        <div style="text-align:center; font-size:1.1rem;">
          <p>年级</p>
          <input type="number" v-model="tGrade" style="width: 10rem">
        </div>
        <div slot="footer" style="text-align:center;">
          <Button id="modalBtn" @click="addGrade('three')">添加</Button>
          <Button id="modalBtn" @click="modal1 = false">取消</Button>
        </div>
      </Modal>

      <Modal
        v-model="modal2"
        width="250"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}" draggable="true">
        <div style="text-align:center; font-size:1.1rem;">
          <p>年级</p>
          <input v-model="fGrade" type="number" style="width: 10rem">
        </div>
        <div slot="footer" style="text-align:center;">
          <Button id="modalBtn" @click="addGrade('five')">添加</Button>
          <Button id="modalBtn" @click="modal2 = false">取消</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import arrowright from "./images/arrowright.png"
  import arrowdown from "./images/arrowdown.png"
  export default {
    name: 'gradeManagementDiv',
    data () {
      return {
        firstYearType:'3',
        secondYearType:'5',
        icon1:arrowright,
        icon2:arrowdown,
        gradeManagement: true,
        fiveArrow: true,
        threeArrow: false,
        fiveYearTable: true,
        threeYearTable: false,
        modalOperateBool:false,
        modalResultBool:false,
        gradeTable: false,
        modal1:false,
        modal2:false,
        teacherIdEle:'',
        yearTypeEle:'',
        fGrade:'',
        tGrade:'',
        opengrade:'',
        opentype:'',
        gradeNameEle:'',
        indexEle:'',
        gradeNum:'',
        errMsg:'出错啦!',
        editBuffer:[
            //{classroomId:'201',classTeacherId:'67843'},{classroomId:'121',classTeacherId:'453453'},{classroomId:'102',classTeacherId:'4965'},
        ],
        fiveGrades: [
//          { gradeName:"2014", studentNum:"167" },
//          { gradeName:"2013", studentNum:"167" },
//          { gradeName:"2012", studentNum:"167" }
        ],
        threeGrades: [
//          { gradeName:"2016", studentNum:"167" },
//          { gradeName:"2015", studentNum:"167" },
//          { gradeName:"2014", studentNum:"167" }
        ],
       classinfoStrList:[
//          {classroomId:'201',gradeName:'04',specialityName:'护理',classId:'03',className:'护理3班',classTeacherId:'67843',classTeacherName:'何平',schoolYearType:'五年制',classSize:'43'},
//          {classroomId:'121',gradeName:'04',specialityName:'临床医学',classId:'05',className:'临床医学5班',classTeacherId:'453453',classTeacherName:'季军',schoolYearType:'五年制',classSize:'54'},
//          {classroomId:'102',gradeName:'04',specialityName:'护理',classId:'01',className:'护理1班',classTeacherId:'4965',classTeacherName:'李磊',schoolYearType:'五年制',classSize:'31'}
        ],
        teacherList:[
//          {teacherName:'何平',teacherId:'67843'},
//          {teacherName:'季军',teacherId:'453453'},
//          {teacherName:'李磊',teacherId:'4965'}
        ],
        index:"",
        modalGradeOperateBool:false,
        modalGradeResultBool:false,
        operateMsg:"",
        resultMsg:"1",
        classroomList:[
            //{classroomId:'101'},{classroomId:'211'},{classroomId:'104'},{classroomId:'122'}
            ]
      }
    },
    beforeMount:function() {
      this.$http.post('./gradeManage/getGradeInfo',{},{
        "Content-Type":"application/json"
      }).then(function (response) {
        this.firstYearType = response.body.yearList[0].yearType;
        this.secondYearType = response.body.yearList[1].yearType;
        this.fiveGrades = response.body.yearList[0].gradeList;
        this.threeGrades = response.body.yearList[1].gradeList;
      },function(error){
        console.log("获取error");
      });
    },
//    初始化页面时，获取3年制和5年制年级信息
    methods: {
      addGrade:function (type) {
          switch (type)
          {
            case "three":
            {
                if(this.tGrade != "")
                {
                  this.$http.post('./gradeManage/addGrade',{
                      "gradeName":this.tGrade+3,
                      "yearType":'3'
                  },{
                    "Content-Type":"application/json"
                  }).then(function (response) {
                      if(response.body.result == "1")
                      {
                        this.$Message.success("添加成功,2s后刷新！");
                        setTimeout("window.location.reload()",2000)
                      }else
                      {
                        this.$Message.warning("添加失败！");
                      }
                  },function(error){
                    this.$Message.warning("添加失败！");
                  });
                }else
                {
                    this.$Message.warning("年级不能为空！");
                }
            }
            break;
            case "five":
            {
              if(this.fGrade != "")
              {
                this.$http.post('./gradeManage/addGrade',{
                  "gradeName":this.fGrade+5,
                  "yearType":'5'
                },{
                  "Content-Type":"application/json"
                }).then(function (response) {
                  if(response.body.result == "1")
                  {
                    this.$Message.success("添加成功,2s后刷新！");
                    setTimeout("window.location.reload()",2000)
                  }else
                  {
                    this.$Message.warning("添加失败！");
                  }
                },function(error){
                  this.$Message.warning("添加失败！");
                });
              }else
              {
                this.$Message.warning("年级不能为空！");
              }
            }
            break;
          }
      },
      fiveYearClick: function () {
        var fiveYearArrow = document.getElementById("fiveYearArrow");
        if (!this.fiveArrow) {
//              alert("open");
          this.fiveArrow = true;
          this.fiveYearTable = true;
          fiveYearArrow.src = this.icon2;
        } else {
//              alert("close");
          this.fiveArrow = false;
          this.fiveYearTable = false;
          fiveYearArrow.src = this.icon1;
        }
      },
//      点击5年制下拉按钮时，展示或隐藏5年制年级表格
      threeYearClick: function () {
        var threeYearArrow = document.getElementById("threeYearArrow");
        if (!this.threeArrow) {
//              alert("open");
          this.threeArrow = true;
          this.threeYearTable = true;
          threeYearArrow.src = this.icon2;
        } else {
//              alert("close");
          this.threeArrow = false;
          this.threeYearTable = false;
          threeYearArrow.src = this.icon1;
        }
      },
//      点击3年制下拉按钮时，展示或隐藏3年制年级表格
      deleteGradeClick: function (yearType,gradeName,gradeNum,index) {
        this.yearTypeEle = yearType;
        this.gradeNameEle = gradeName;
        this.gradeNum = gradeNum;
        this.indexEle = index;
        this.modalOperateBool = true;
      },
//      删除年级信息时，弹窗让用户确认
      deleteOk: function(){
        this.$http.post('./gradeManage/deleteGrade',{
          "yearType":this.yearTypeEle,
          "gradeName":this.gradeNameEle
        },{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          var resultMsg = response.body.result;
          if(resultMsg === "1"){
            if(this.gradeNum === "1"){
              this.fiveGrades.splice(this.indexEle, 1);
            }else{
              this.threeGrades.splice(this.indexEle, 1);
            }
            this.$Message.success("删除成功！");
          }else{
            this.modalResultBool = true;
          }
        },function(error){
          console.log("获取error");
        });
        this.modalOperateBool = false;
      },
//      确认删除年级信息
      operateCancel:function(){
        this.modalOperateBool = false;
      },
//      取消学生信息操作
      resultOk: function(){
        this.modalResultBool = false;
      },
//      确认删除年级信息操作结果
      checkGradeInfoClick: function(yearType,gradeName){
          this.opengrade = gradeName;
          this.opentype = yearType;
        this.$http.post('./gradeManage/getGradeDetail',{
          "yearType":yearType,
          "gradeName":gradeName
        },{
          "Content-Type":"application/json"
        }).then(function (response) {
          this.editBuffer.splice(0,this.editBuffer.length );
          this.classinfoStrList = response.body.classAndTeacherList.classinfoStrList;
          for(var i=0;i<this.classinfoStrList.length;i++)
          {
            this.editBuffer.push({classroomId:this.classinfoStrList[i].classroomId,classTeacherId:this.classinfoStrList[i].classTeacherId});
          }
          this.teacherList = response.body.classAndTeacherList.teacherList;
          this.classroomList = response.body.classAndTeacherList.classroomList;
        },function(error){
        });
        this.gradeTable = true;
        this.gradeManagement = false;
      },
//      查看年级具体班级信息，从年级信息页面跳转的班级信息页面
      editClick: function(index){
        var inputTable = document.getElementById("inputTable"+index);
        var input = inputTable.getElementsByTagName("input");
        var select1 = document.getElementById(index + "select1");
        var select2 = document.getElementById(index + "select2");
        var editImg = document.getElementById("editImg"+index);
        var saveImg = document.getElementById("saveImg"+index);
        var deleteImg = document.getElementById("deleteImg"+index);
        var restoreImg = document.getElementById("restoreImg"+index);
        for(var i=0;i<this.teacherList.length;i++){
          if(this.classinfoStrList[index].classTeacherName === this.teacherList[i].teacherName){
            this.teacherIdEle = this.teacherList[i].teacherId;
          }
        }
        input[4].style.display = "none";
        input[7].style.display = "none";
        select1.style.display = "inline";
        select2.style.display = "inline";
        editImg.style.display = "none";
        saveImg.style.display = "inline";
        deleteImg.style.display = "none";
        restoreImg.style.display = "inline";
      },
//      修改班级信息，包括教师
      saveClick:function(index){
        this.modalGradeOperateBool = true;
        this.operateMsg = "1";
        this.index = index;
      },
//      保存修改时，弹窗提醒用户确认
      restoreClick:function(index){
        this.modalGradeOperateBool = true;
        this.operateMsg = "2";
        this.index = index;
      },
//      取消修改时，弹窗提醒用户确认
      deleteClick:function(index){
        this.modalGradeOperateBool = true;
        this.operateMsg = "3";
        this.index = index;
      },
//      删除班级时，弹窗提醒用户确认
      saveGradeOk: function(){
        var inputTable = document.getElementById("inputTable"+this.index);
        var input = inputTable.getElementsByTagName("input");
        var select1 = document.getElementById(this.index + "select1");
        var select2 = document.getElementById(this.index + "select2");
        var editImg = document.getElementById("editImg"+this.index);
        var saveImg = document.getElementById("saveImg"+this.index);
        var deleteImg = document.getElementById("deleteImg"+this.index);
        var restoreImg = document.getElementById("restoreImg"+this.index);
        this.$http.post('./gradeManage/editClassInfo',{
          "classId":this.classinfoStrList[this.index].classId,
          "classTeacherId":this.editBuffer[this.index].classTeacherId,
          "classroomId":this.editBuffer[this.index].classroomId
        },{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          this.resultMsg=response.body.result;
          if(this.resultMsg==="1"){
            for(var i=0;i<this.teacherList.length;i++){
              this.classinfoStrList[this.index].classTeacherId = this.editBuffer[this.index].classTeacherId;
              this.classinfoStrList[this.index].classroomId = this.editBuffer[this.index].classroomId;
              if(this.editBuffer[this.index].classTeacherId === this.teacherList[i].teacherId){
                this.classinfoStrList[this.index].classTeacherName = this.teacherList[i].teacherName;
              }
            }
            this.modalGradeOperateBool=false;
            this.$Message.success("保存成功！");
            input[4].style.display = "inline";
            input[7].style.display = "inline";
            select1.style.display = "none";
            select2.style.display = "none";
            editImg.style.display = "inline";
            saveImg.style.display = "none";
            deleteImg.style.display = "inline";
            restoreImg.style.display = "none";
            this.checkGradeInfoClick(this.opentype,this.opengrade);
          }else{
            this.modalGradeOperateBool=false;
            this.modalGradeResultBool=true;
          }
        },function(error){
        });
      },
//      保存对班级信息的修改
      cancelGradeOk: function(){
        var inputTable = document.getElementById("inputTable"+this.index);
        var input = inputTable.getElementsByTagName("input");
        var select1 = document.getElementById(this.index + "select1");
        var select2 = document.getElementById(this.index + "select2");
        var editImg = document.getElementById("editImg"+this.index);
        var saveImg = document.getElementById("saveImg"+this.index);
        var deleteImg = document.getElementById("deleteImg"+this.index);
        var restoreImg = document.getElementById("restoreImg"+this.index);
        this.modalGradeOperateBool=false;
        input[4].style.display = "inline";
        input[7].style.display = "inline";
        select1.style.display = "none";
        select2.style.display = "none";
        editImg.style.display = "inline";
        saveImg.style.display = "none";
        deleteImg.style.display = "inline";
        restoreImg.style.display = "none";
      },
//      取消班级信息修改
      deleteGradeOk: function(){
        this.$http.post('./gradeManage/deleteClassInfo',{
          "classId":this.classinfoStrList[this.index].classId
        },{
          "Content-Type":"application/json"
        }).then(function (response) {
          this.resultMsg=response.body.result;
          if(this.resultMsg==="0"){
            this.$Message.success("删除成功！");
            this.classinfoStrList.splice(this.index,1);
            this.modalGradeOperateBool=false;
          }else{
            this.modalGradeOperateBool=false;
            this.errMsg = this.resultMsg;
            this.operateMsg = "99";
            this.modalGradeResultBool=true;
          }
        },function(error){
          console.log("获取error");
        });
      },
//      删除该班级以及该班级的所有信息
      operateGradeCancel:function(){
        this.modalGradeOperateBool = false;
      },
//      取消保存，删除，取消保存等操作
      resultGradeOk: function(){
        this.modalGradeResultBool = false;
      },
//      弹窗让用户确认操作失败信息
      handleFormatError:function(file){
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传xls或xlsx表格。'
        });
      },
//      提醒用户上传文件格式不正确
      handleSizeError:function(file){
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        });
      },
//      提醒用户上传文件大小超过限制
      handleProgress:function(){
        this.$Message.loading("正在上传中...");
      },
//      提醒用户文件正在上传
      handleSuccess:function(res){
        if(res.result==='1'){
          this.$Message.success("上传成功！");
        }else{
          this.$Message.error(res.result);
        }
      },
//      提醒用户上传成功或者失败的原因（文件已上传到数据库，但文件内容问题）
      handleError:function(){
        this.$Message.error("上传失败");
      },
//      提醒用户上传失败（文件未上传到数据库）
      downloadFormClick:function(){
        location.href="./gradeManage/exportClassInfoTemplet";
      },
//      下载模板
      downloadClick:function(){
        location.href="./gradeManage/exportClassInfo";
      },
//      下载班级信息
      goBackClick: function(){
        this.gradeTable = false;
        this.gradeManagement = true;
      }
//      从班级信息页面返回年级信息页面
    }
  }
</script>

<style scoped>
  html {
  }
  .dropDown{
    margin: 0.5rem 5rem;
  }
  input{
    text-align: center;
    width: 80%;
  }
  .checkGradeInfo{
    color: #158064;
    cursor: pointer;
  }
  .checkGradeInfo:hover{
    color: black;
  }
  .bottomButton{
    margin-top: 1rem;
    margin-right: 1.4rem;
    min-width: 5.6rem;
  }
  #buttonDiv{
    text-align: center;
  }
  .gradeInput{
    font-size: 0.9rem;
    width: 35%;
    border: none;
    outline: none;
  }
  img{
     position: relative;
     margin: 0.5rem 0.2rem;
     width: 1.5rem;
     height: 1.5rem
   }
  img:hover{
    cursor: pointer;
  }
  .btnImg{
    width: 2rem;
    height: 2rem;
    border: thin solid white;
  }
  .btnImg:hover{
    cursor: pointer;
    border: thin solid grey;
  }
  .imgLeft{
    float:left;
    margin-left: 5rem;
  }
  .selectWM{
    width: 80%;
  }
  @media screen and (max-width: 1023px) {
    html {
    }
  }
</style>
