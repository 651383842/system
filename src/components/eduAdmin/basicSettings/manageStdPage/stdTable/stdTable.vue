<template>
    <div>
      <div id="dropdownInfo">
        <select id="yearTypeSelect" class="selectWM" v-model="studentinfoKey.schoolYearType" @change="indexYearTypeClick()">
          <option value="0" disabled>选择年制</option>
          <option v-for="yearAndClass in yearAndClassList" :value="yearAndClass.yearType">{{yearAndClass.yearType}}年制</option>
        </select>
        <!--年制选择下拉列表-->
        <select id="gradeSelect" class="selectWM" v-model="studentinfoKey.gradeId" @click="indexYearTypeClick()" @change="indexGradeClick()">
          <option value="0" disabled>选择年级</option>
          <option v-if="studentinfoKey.schoolYearType!='0'" v-for="yearEle in yearAndClassList[indexYearType].gradeList" :value="yearEle.gradeId">{{yearEle.gradeName}}级</option>
        </select>
        <!--年级选择下拉列表-->
        <select id="classSelect" class="selectWM" v-model="studentinfoKey.classId" @click="indexGradeClick()">
          <option value="0" disabled>选择班级</option>
          <option v-if="studentinfoKey.gradeId!='0'" v-for="classEle in yearAndClassList[indexYearType].gradeList[indexGrade].classList " :value="classEle.classId">{{classEle.className}}</option>
        </select>
        <!--班级选择下拉列表-->
        <span><input type="text" id="stdID" class="inputWM" placeholder="请输入学号" v-model="studentinfoKey.studentId"></span>
        <span><button id="searchFor" class="am-btn am-btn-success am-radius buttonWM" @click="checkStdInfoClick()">查找</button></span>
        <span><button id="downloadForm" class="am-btn am-btn-success am-radius buttonWM" @click="downloadFormClick">下载模板</button></span>
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
            action="./studentManage/uploadStudentSimpleInfo">
          <button type="ghost" id="leadIn" class="am-btn am-btn-success am-radius buttonWM">上传</button>
          </Upload>
        </span>
        <span><button id="leadOut" class="am-btn am-btn-success am-radius buttonWM" @click="downloadClick">下载</button></span>
        <!--查找，下载，上传按钮-->
        <modal v-model="modalCheckBool" width="400" id="modalBody">
          <div style="text-align: center;font-size: 1.1rem;">
            <p >请输入正确的学生信息!</p>
          </div>
          <div slot="footer" style="text-align: center">
            <button id="modalBtn" @click="resultCheckOk">确定</button>
          </div>
        </modal>
        <!--查找时学生信息不明确，弹窗提示-->
      </div>
      <div>
        <modal v-model="modalDownloadBool" width="400" id="modalBody">
          <div style="text-align: center;font-size: 1.1rem;">
            <p v-if="downloadMsg === '1'">文件格式不正确，请上传xls或xlsx表格。</p>
            <p v-else-if="downloadMsg === '2'">文件太大，不能超过 2M</p>
            <p v-else-if="downloadMsg === '3'">上传成功!</p>
            <p v-else-if="downloadMsg === '4'">上传失败!</p>
            <p v-else>{{downloadMsg}}</p>
          </div>
          <div slot="footer" style="text-align: center">
            <button id="modalBtn" @click="checkOk">确定</button>
          </div>
        </modal>
      </div>
      <!--上传文件出错信息提示弹窗-->
      <div style="padding: 0.6rem 5rem;background-color: #f3f3f3">
        <div id="stdTable" style="background-color: white">
          <table id="eduAdminStdTableSy" class="operationTable" style="table-layout: fixed;">
            <!--table-layout: fixed;固定表格格局-->
            <thead>
            <tr>
              <th width="16%">学号</th>
              <th width="10%">姓名</th>
              <th width="20%">身份证号码</th>
              <th width="8%">性别</th>
              <th width="7%">学制</th>
              <th width="10%">年级</th>
              <th width="10%">专业</th>
              <th width="13%">班级</th>
              <th width="10%">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(studentSimpleInfo,index) in studentSimpleInfoList" :id="'inputTable'+index">
              <td><input :id="index + 'input1'" :value="studentSimpleInfo.studentId" readonly="readonly" style="border: none"></td>
              <td><input :id="index + 'input2'" v-model="studentSimpleInfo.studentName" readonly="readonly" style="border: none"></td>
              <td><input :id="index + 'input3'" v-model="studentSimpleInfo.studentIDcard" readonly="readonly" style="border: none"></td>
              <td>
                <input :id="index + 'input4'" v-model="studentSimpleInfo.studentGender" readonly="readonly" style="border: none">
                <select :id="index + 'select1'" class="selectWM currentOperaStdGender" v-model="currentOperaStd.studentGender" style="display: none">
                  <option disabled>选择性别</option>
                  <option>男</option>
                  <option>女</option>
                </select>
              </td>
              <td><input :id="index + 'input5'" :value="studentSimpleInfo.schoolYearType" readonly="readonly" style="border: none"></td>
              <td><input :id="index + 'input6'" :value="studentSimpleInfo.gradeName" readonly="readonly" style="border: none"></td>
              <td><input :id="index + 'input7'" :value="studentSimpleInfo.specialityName" readonly="readonly" style="border: none"></td>
              <td>
                <input :id="index + 'input8'" v-model="studentSimpleInfo.className" readonly="readonly" style="border: none;">
                <select :id="index + 'select2'" class="selectWM currentOperaSelect" v-model="currentOperaStd.className" style="display: none">
                  <option disabled>选择班级</option>
                  <option v-for="currentOperaSelect in currentOperaSelects">{{ currentOperaSelect.className }}</option>
                </select>
              </td>
              <td>
                <img :id="'editImg'+index" title="修改" src="./images/edit.png" @click="editClick(index)">
                <img :id="'saveImg'+index" title="保存" src="./images/save.png" style="display: none" @click="saveClick(index)">
                <img :id="'deleteImg'+index" title="删除" src="./images/delete.png" @click="deleteClick(index)">
                <img :id="'restoreImg'+index" title="取消" src="./images/restore.png" style="display: none" @click="restoreClick(index)">
              </td>
            </tr>
            </tbody>
          </table>
          <!--学生信息表格-->
        </div>
        <div style="float: right">
          <span style="font-size: medium;">共有{{studenSize}}条记录</span>
          <span><button style="margin-top: 0.5rem" class="am-btn am-btn-success am-radius buttonWM" @click="page('first')">首页</button></span>
          <span><button style="margin-top: 0.5rem" class="am-btn am-btn-success am-radius buttonWM" @click="page('front')">上一页</button></span>
          <span><button style="margin-top: 0.5rem" class="am-btn am-btn-success am-radius buttonWM" @click="page('next')">下一页</button></span>
          <span><button style="margin-top: 0.5rem" class="am-btn am-btn-success am-radius buttonWM" @click="page('end')">尾页</button></span>
          <input type="number" style="width: 1.4rem;" v-model="currentPage">
          <span id="stotalPage" style="font-size: medium; " :value="totalPage">/{{totalPage}}</span>
          <span><button style="margin-top: 0.5rem" class="am-btn am-btn-success am-radius buttonWM" @click="page('jump')">跳转</button></span>
        </div>
      </div>
      <div>
        <modal v-model="modalOperateBool" width="400" id="modalBody">
          <div style="text-align: center;font-size: 1.1rem;">
            <p v-if="operateMsg==='1'">是否确定保存修改</p>
            <p v-else-if="operateMsg==='2'">是否确定取消修改</p>
            <p v-else-if="operateMsg==='3'">是否确定删除</p>
          </div>
          <div slot="footer" style="text-align: center">
            <button v-if="operateMsg==='1'" id="modalBtn" @click="saveOk()">确定</button>
            <button v-else-if="operateMsg==='2'" id="modalBtn" @click="cancelOk()">确定</button>
            <button v-else-if="operateMsg==='3'" id="modalBtn" @click="deleteOk()">确定</button>
            <button id="modalBtn" @click="operateCancel">取消</button>
          </div>
        </modal>
        <modal v-model="modalResultBool" width="400" id="modalBody">
          <div style="text-align: center;font-size: 1.1rem;">
            <p v-if="operateMsg === '3'">删除失败</p>
            <p v-else>处理出错</p>
          </div>
          <div slot="footer" style="text-align: center">
            <button id="modalBtn" @click="resultOk">确定</button>
          </div>
        </modal>
      </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
              totalPage:'50',
              currentPage:'1',
              indexYearType:'0',
              indexGrade:'0',
              studentinfoKey:{
                schoolYearType:'0',
                gradeId:'0',
                classId:'0',
                studentId:''
              },
              yearAndClassList:[
                {
                  yearType:'',
                  gradeList:[
                    {
                      gradeName:'',
                      gradeId:'',
                      classList:[
                        {className:'',classId:''},
                        {className:'',classId:''}
                      ]
                    },
                    {
                      gradeName:'',
                      gradeId:'',
                      classList:[
                        {className:'',classId:''},
                        {className:'',classId:''}
                      ]
                    }
                  ]
                },
                {
                  yearType:'',
                  gradeList:[
                    {
                      gradeName:'',
                      gradeId:'',
                      classList:[
                        {className:'',classId:''},
                        {className:'',classId:''}
                      ]
                    }
                  ]
                }
              ],
              studenSize:0,
              studentSimpleInfoList:[
                //{studentId: "20155101", studentName: "123", studentIDcard: "123", studentGender: "123", schoolYearType: "123", gradeName: "123", specialityName: "123", className: "123"},
                //{studentId: "20155101"},{studentId: "20155101"},{studentId: "20155101"},{studentId: "20155101"},{studentId: "20155101"},{studentId: "20155101"},{studentId: "20155101"},{studentId: "20155101"},{studentId: "20155101"},
                ],
              currentOperaStd: {
                studentId: "", studentName: "", studentIDcard: "", studentGender: "", schoolYearType: "", className: ""
              },
              currentOperaSelects:[],
              classList:{},
              isEditing: false,
              //classNameEle:'',
              index:'0',
              modalCheckBool: false,
              //yearTypeClassIndex:'0',
              //gradeClassIndex:'0',
              modalDownloadBool:false,
              modalOperateBool:false,
              modalResultBool:false,
              downloadMsg:'',
              operateMsg:'',
              resultMsg:''
            }
        },
      beforeMount:function() {
        this.$http.post('./studentManage/getGradeAndClassList',{
          curPage:"1"
        },{
          "Content-Type":"application/json"
        }).then(function (response) {
          this.yearAndClassList = response.body.getGradeAndClassObj.yearAndClassList;
          this.studentSimpleInfoList = response.body.getGradeAndClassObj.studentSimpleInfoList;
          this.studenSize = response.body.getGradeAndClassObj.pageUtil.totalRecord;
          this.totalPage = response.body.getGradeAndClassObj.pageUtil.totalPage;

          for(var i = 0; i < this.yearAndClassList.length; i++) {
            if (this.yearAndClassList[i].yearType == "3") {
              var classList = [];
              for (var j = 0; j < this.yearAndClassList[i].gradeList.length; j++) {
                for (var k = 0; k < this.yearAndClassList[i].gradeList[j].classList.length; k++) {
                  classList.push(this.yearAndClassList[i].gradeList[j].classList[k]);
                }
              }
              this.classList.three = classList;
            }else if (this.yearAndClassList[i].yearType == "5") {
              var classList = [];
              for (var j = 0; j < this.yearAndClassList[i].gradeList.length; j++) {
                for (var k = 0; k < this.yearAndClassList[i].gradeList[j].classList.length; k++) {
                  classList.push(this.yearAndClassList[i].gradeList[j].classList[k]);
                }
              }
              this.classList.five = classList;
            }
          }
        },function(error){
        });
      },
//      初始化函数，获取年制、年级、班级信息，用于select下拉框，获取学生信息，用于学生信息table
      methods:{
//        点击年制下拉框时，将年级、班级下拉框清空
        yearTypeClick: function(){
          this.studentinfoKey.gradeId = '0';
          this.studentinfoKey.classId = '0';
          //console.log("1");
        },
//        点击选择年制后，将年级下拉框下拉的可选内容改为相应年制的年级
        indexYearTypeClick: function(){
          //console.log("2");
          this.studentinfoKey.classId = '0';
          for(var i=0;i<this.yearAndClassList.length;i++){
            if(this.studentinfoKey.schoolYearType === this.yearAndClassList[i].yearType){
              this.indexYearType = i;
              break;
            }
          }
        },
//        点击选择年级后，将班级下拉框下拉的可选内容改为相应年级的班级
        indexGradeClick: function(){
          //console.log("3");
          for(var j=0;j<this.yearAndClassList[this.indexYearType].gradeList.length;j++){
            if(this.studentinfoKey.gradeId === this.yearAndClassList[this.indexYearType].gradeList[j].gradeId){
              this.indexGrade = j;
              break;
            }
          }
        },
//        查询学生成绩：向后台提交年制、年级、班级，后台返回相应的学生信息
        checkStdInfoClick: function(){
          if(this.isEditing){
            this.$Message.error("存在正在编辑的信息！");
            return;
          }
          this.$http.post('./studentManage/findStudentInfo',{
            "schoolYearType":this.studentinfoKey.schoolYearType,
            "gradeId":this.studentinfoKey.gradeId,
            "classId":this.studentinfoKey.classId,
            "curPage":'1',
            "studentId":this.studentinfoKey.studentId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            var result = response.body.result;
            if(result === "0"){
              this.modalCheckBool = true;
            }else{
              this.studentSimpleInfoList = response.body.studentSimpleInfoList;
              this.totalPage = response.body.pageUtil.totalPage;
              this.studenSize = response.body.pageUtil.totalRecord;
            }
          },function(error){
              this.$Message.error("网络错误，请稍后重试！");
          });
        },
        page:function (event) {
            if(this.isEditing){
                this.$Message.error("存在正在编辑的信息！");
                return;
            }
            if(event == 'first')
            {
                this.currentPage = 1;
            }else if(event == 'front')
            {
                if(this.currentPage == 1)
                    return;
              this.currentPage-=1;
            }else if(event == 'next')
            {
                if(this.currentPage == this.totalPage)
                    return;
              this.currentPage=(parseInt(this.currentPage)+1).toString();
            }else if(event == 'end')
            {
              if(this.currentPage == this.totalPage)
              {
                return;
              }
              var span = document.getElementById("stotalPage");
              this.currentPage = span.innerText.split("/")[1];
            }else if(event == 'jump')
            {
                if(parseInt(this.currentPage)<1||parseInt(this.currentPage)>parseInt(this.totalPage))
                {
                  this.$Message.error("跳转页不合法！");
                  return;
                }
            }
          this.$http.post('./studentManage/findStudentInfo',{
            "schoolYearType":this.studentinfoKey.schoolYearType,
            "gradeId":this.studentinfoKey.gradeId,
            "classId":this.studentinfoKey.classId,
            "curPage":this.currentPage.toString(),
            "studentId":this.studentinfoKey.studentId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            var result = response.body.result;
            if(result === "0"){
              this.modalCheckBool = true;
            }else{
              this.studentSimpleInfoList = response.body.studentSimpleInfoList;
              this.totalPage = response.body.pageUtil.totalPage;
//              this.studenSize = response.body.getGradeAndClassObj.pageUtil.totalRecord;
              this.studenSize = response.body.pageUtil.totalRecord;//18.1.6-李西炜：运行报错修改
            }
          },function(error){
            this.$Message.error("网络错误，请稍后重试！");
          });
        },
//        确认查询成绩信息错误
        resultCheckOk:function(){
          this.modalCheckBool = false;
        },
//        处理文件格式出错问题
        handleFormatError:function(){
          this.downloadMsg = "1";
          this.modalDownloadBool = true;
        },
//        处理文件大小超过限制问题
        handleSizeError:function(){
          this.downloadMsg = "2";
          this.modalDownloadBool = true;
        },
//        提示用户文件正在上传
        handleProgress:function(){
          this.$Message.loading("正在上传中...");
        },
//        处理文件上传失败（文件已上传到数据库，但文件内容问题）或者成功事件，如果上传成功，4秒后刷新页面
        handleSuccess:function(res){
          if(res.result=='1'){
            this.downloadMsg = "3";
            setTimeout("location.reload(true)", 2000); //4秒后刷新页面
          }else{
            this.downloadMsg = res.result;
          }
          this.modalDownloadBool = true;
        },
//        处理文件上传失败事件（文件未上传到数据库）
        handleError:function(){
          this.downloadMsg = "4";
          this.modalDownloadBool = true;
        },
//        下载模板
        downloadFormClick:function(){
          location.href="./studentManage/exportStudentSimpleInfoTemplet";
        },
//        下载学生信息文件
        downloadClick:function(){
          location.href="./studentManage/exportStudentSimpleInfo";
        },
//        确认文件上传结果弹窗
        checkOk:function(){
          this.modalDownloadBool = false;
        },
//        清空学生信息操作缓存
        cleanCurrentOpera:function(){
          this.currentOperaSelects = [];
          this.currentOperaStd = {
            studentId: "", studentName: "", studentIDcard: "", studentGender: "", schoolYearType: "", className: ""
          };
        },
//        修改学生信息
        editClick: function(index){
          var inputTable = document.getElementById("inputTable"+index);
          var input = inputTable.getElementsByTagName("input");
          var select = inputTable.getElementsByTagName("select");
          var editImg = document.getElementById("editImg"+index);
          var saveImg = document.getElementById("saveImg"+index);
          var deleteImg = document.getElementById("deleteImg"+index);
          var restoreImg = document.getElementById("restoreImg"+index);

          if(this.isEditing){
            this.$Message.error("存在正在编辑的信息！");
            return;
          }
          if(this.studentSimpleInfoList[index].schoolYearType == "3"){
            this.currentOperaSelects = this.classList.three;
          }else if(this.studentSimpleInfoList[index].schoolYearType == "5"){
            this.currentOperaSelects = this.classList.five;
          }
          this.currentOperaStd.studentId = JSON.parse(JSON.stringify(this.studentSimpleInfoList[index].studentId));
          this.currentOperaStd.studentName = JSON.parse(JSON.stringify(this.studentSimpleInfoList[index].studentName));
          this.currentOperaStd.studentIDcard = JSON.parse(JSON.stringify(this.studentSimpleInfoList[index].studentIDcard));
          this.currentOperaStd.studentGender = JSON.parse(JSON.stringify(this.studentSimpleInfoList[index].studentGender));
          this.currentOperaStd.schoolYearType = JSON.parse(JSON.stringify(this.studentSimpleInfoList[index].schoolYearType));
          this.currentOperaStd.className = JSON.parse(JSON.stringify(this.studentSimpleInfoList[index].className));

          input[1].removeAttribute("readOnly");
          input[2].removeAttribute("readOnly");
          input[3].style.display = "none";
          input[7].style.display = "none";
          select[0].style.display = "inline";
          select[1].style.display = "inline";

          editImg.style.display = "none";
          saveImg.style.display = "inline";
          deleteImg.style.display = "none";
          restoreImg.style.display = "inline";
          this.isEditing = true;
        },
//        保存对学生信息的修改时，弹窗确认
        saveClick:function(index){
          var inputTable = document.getElementById("inputTable"+index);
          var input = inputTable.getElementsByTagName("input");
          if(input[1].value == ""){
            this.$Message.error("姓名不能为空！");
            return;
          }
          this.operateMsg = "1";
          this.index = index;
          this.modalOperateBool = true;
        },
//        保存对学生信息的修改
        saveOk: function(){
          var inputTable = document.getElementById("inputTable"+this.index);
          var input = inputTable.getElementsByTagName("input");
          var select = inputTable.getElementsByTagName("select");
          var editImg = document.getElementById("editImg"+this.index);
          var saveImg = document.getElementById("saveImg"+this.index);
          var deleteImg = document.getElementById("deleteImg"+this.index);
          var restoreImg = document.getElementById("restoreImg"+this.index);
          var classID = null;

          if(this.currentOperaStd.schoolYearType == "3"){
            for(var i = 0;i < this.classList.three.length;i++){
              if(this.classList.three[i].className == this.currentOperaStd.className){
                classID = this.classList.three[i].classId;
              }
            }
          }else if(this.currentOperaStd.schoolYearType == "5"){
            for(var i = 0;i < this.classList.five.length;i++){
              if(this.classList.five[i].className == this.currentOperaStd.className){
                classID = this.classList.five[i].classId;
              }
            }
          }
          console.log(classID);
          this.$http.post('./studentManage/editStudentBaseInfo',{
            "studentId": this.currentOperaStd.studentId,
            "studentName": this.studentSimpleInfoList[this.index].studentName,
            "studentIDcard": this.studentSimpleInfoList[this.index].studentIDcard,
            "studentGender": this.currentOperaStd.studentGender,
            "schoolYearType": this.currentOperaStd.schoolYearType,
            "className": this.currentOperaStd.className
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            this.resultMsg=response.body.result;
            if(this.resultMsg=='1'){
              this.$Message.success("保存成功！");
              input[1].readOnly = "readOnly";
              input[2].readOnly = "readOnly";
              input[3].style.display = "inline";
              input[7].style.display = "inline";
              select[0].style.display = "none";
              select[1].style.display = "none";
              this.studentSimpleInfoList[this.index].className = JSON.parse(JSON.stringify(this.currentOperaStd.className));
              this.studentSimpleInfoList[this.index].studentGender = JSON.parse(JSON.stringify(this.currentOperaStd.studentGender));

              editImg.style.display = "inline";
              saveImg.style.display = "none";
              deleteImg.style.display = "inline";
              restoreImg.style.display = "none";
              this.cleanCurrentOpera();
              this.isEditing = false;
            }else{
              this.modalResultBool = true;
            }
          },function(error){
            this.modalResultBool = true;
          });
          this.modalOperateBool = false;
        },
//        取消对学生信息的修改时，弹窗确认
        restoreClick:function(index){
          this.modalOperateBool = true;
          this.operateMsg = "2";
          this.index = index;
        },
//        取消对学生信息的修改
        cancelOk: function(){
          var inputTable = document.getElementById("inputTable"+this.index);
          var input = inputTable.getElementsByTagName("input");
          var select = inputTable.getElementsByTagName("select");
          var editImg = document.getElementById("editImg"+this.index);
          var saveImg = document.getElementById("saveImg"+this.index);
          var deleteImg = document.getElementById("deleteImg"+this.index);
          var restoreImg = document.getElementById("restoreImg"+this.index);

          this.studentSimpleInfoList[this.index].studentName = JSON.parse(JSON.stringify(this.currentOperaStd.studentName));
          this.studentSimpleInfoList[this.index].studentIDcard = JSON.parse(JSON.stringify(this.currentOperaStd.studentIDcard));

          input[1].readOnly = "readOnly";
          input[2].readOnly = "readOnly";
          input[3].style.display = "inline";
          input[7].style.display = "inline";
          select[0].style.display = "none";
          select[1].style.display = "none";

          editImg.style.display = "inline";
          saveImg.style.display = "none";
          deleteImg.style.display = "inline";
          restoreImg.style.display = "none";
          this.modalOperateBool = false;
          this.cleanCurrentOpera();
          this.isEditing = false;
        },
//        删除学生信息时，弹窗让用户确认
        deleteClick:function(index){
          if(this.isEditing){
            this.$Message.error("存在正在编辑的信息！");
            return;
          }
          this.modalOperateBool = true;
          this.operateMsg = "3";
          this.index = index;
        },
//        确认删除学生信息操作
        deleteOk: function(index){
          this.$http.post('./studentManage/deleteStudentInfo',{
            "studentId":this.studentSimpleInfoList[this.index].studentId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.resultMsg=response.body.result;
            if(this.resultMsg==='1'){
              this.studentSimpleInfoList.splice(this.index,1);
              this.studenSize -= 1;
              this.$Message.success("删除成功！");
            }else{
              this.modalResultBool = true;
            }
          },function(error){
            console.log("获取error");
          });
          this.modalOperateBool = false;
        },
//        取消学生信息操作
        operateCancel:function(){
          this.modalOperateBool = false;
        },
//        确认学生信息操作结果
        resultOk: function(){
          this.modalResultBool = false;
        }
      }
    }
</script>

<style scoped>
    html {
        font-size: 62.5%;
    }
    #dropdownInfo{
      margin: 0.6rem 5rem;
      background-color: white;
    }
    .selectWM{
      width: 8rem;
      margin: 0 0.7rem;
    }
    .inputWM{
      width: 8rem;
      margin: 0 0.7rem;
      text-align: left;
    }
    .buttonWM{
      width: 5.6rem;
      margin: 0 0.7rem;
    }
    .currentOperaStdGender{
      width: 5rem;
      margin: 0;
    }
    input{
      width:80%;
      text-align: center;
    }
    img{
      width: 2rem;
      height: 2rem;
      border: thin solid white;
    }
    img:hover{
      cursor: pointer;
      border: thin solid grey;
    }

    @media screen and (max-width: 1023px) {
      html {
          font-size: 56%;
      }
      .currentOperaSelect {
        width: 10rem;
      }
    }
</style>
