<template>
  <div>
    <div id="dropdownInfo">
      <span><input type="text" id="tchName" class="inputWM" placeholder="请输入姓名" v-model="teacherinfoKey.teacherName" @click="tchNameClick"></span>
      <span><input type="text" id="tchID" class="inputWM" placeholder="请输入编号" v-model="teacherinfoKey.teacherId" @click="tchIdClick"></span>
      <!--教师姓名，编号输入框-->
      <span><button id="searchFor" class="am-btn am-btn-success am-radius buttonWM" @click="checkTchInfoClick()">查找</button></span>
      <span><button id="downloadForm" class="am-btn am-btn-success am-radius buttonWM" @click="downloadFormClick()">下载模板</button></span>
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
          action="./teacherManage/uploadTeacherInfo">
          <!--:on-progress="handleProgress"-->
        <button type="ghost" id="leadIn" class="am-btn am-btn-success am-radius buttonWM">上传</button>
        </Upload>
      </span>
      <span><button id="leadOut" class="am-btn am-btn-success am-radius buttonWM" @click="downloadClick">下载全部</button></span>
      <span><button id="addTch" class="am-btn am-btn-success am-radius buttonWM" @click="modalAdd = true">新增教师</button></span>
      <span style="margin-left: 10rem;">共检索到{{tchSize}}条记录</span>
      <!--查找，上传，下载按钮-->
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
    <!--文件上传失败信 息弹窗-->
    <div id="tchTable" style="padding: 0.6rem 5rem;background-color: #f3f3f3">
      <table id="eduAdminTchTableSy" class="operationTable" style="table-layout: fixed;">
        <!--table-layout: fixed;固定表格格局-->
        <thead>
        <tr>
          <th width="10%">教师编号</th>
          <th width="6%">姓名</th>
          <th width="15%">身份证号</th>
          <th width="3%">性别</th>
          <th width="8%">手机号码</th>
          <th width="10%">聘用校区</th>
          <th width="10%">教学职称</th>
          <th width="12%">工作职称</th>
          <th width="6%">是否双师</th>
          <th width="10%">教师类型</th>
          <th width="10%">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(teacherSimpleInfo,index) in teacherSimpleInfoList" :id="'inputTable'+index">
          <td><input :id="index + 'input1'" :value="teacherSimpleInfo.teacherId" readonly="readonly" style="border: none"></td>
          <td><input :id="index + 'input2'" v-model="teacherSimpleInfo.teacherName" readonly="readonly" style="border: none"></td>
          <td><input :id="index + 'input3'" :value="teacherSimpleInfo.teacherIdcard" readonly="readonly" style="border: none"></td>
          <td><input :id="index + 'input4'" :value="teacherSimpleInfo.teacherGender" readonly="readonly" style="border: none"></td>
          <td><input :id="index + 'input5'" :value="teacherSimpleInfo.phoneNumber" readonly="readonly" style="border: none"></td>
          <td>
            <span v-if="teacherSimpleInfo.hireCampus==='1'"><input value="校本部" readonly="readonly" style="border: none;"></span>
            <span v-else><input value="新校区" readonly="readonly" style="border: none;"></span>
            <select :id="index + 'select'" class="selectWM" v-model="hireCampusEle" style="display: none">
              <option v-for="hireCampus in hireCampusList" :value="hireCampus">{{hireCampus}}</option>
            </select>
          </td>
          <td>
            <span v-if="teacherSimpleInfo.currentWorkTitle==='1'"><input value="助教" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkTitle==='2'"><input value="讲师" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkTitle==='3'"><input value="副教授" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkTitle==='4'"><input value="教授" readonly="readonly" style="border: none;"></span>
            <span v-else><input value="无" readonly="readonly" style="border: none;"></span>
            <select :id="index + 'select'" class="selectWM" v-model="currentWorkTitleEle" style="display: none">
              <option v-for="currentWorkTitle in currentWorkTitleList" :value="currentWorkTitle">{{currentWorkTitle}}</option>
            </select>
          </td>
          <td>
            <span v-if="teacherSimpleInfo.currentWorkDuty==='1'"><input value="医师" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkDuty==='2'"><input value="主治医师" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkDuty==='3'"><input value="副主任医师" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkDuty==='4'"><input value="主任医师" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkDuty==='5'"><input value="护士" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkDuty==='6'"><input value="护师" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkDuty==='7'"><input value="主管护师" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkDuty==='8'"><input value="副主任护师" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkDuty==='9'"><input value="主任护师" readonly="readonly" style="border: none;"></span>
            <span v-else><input value="无" readonly="readonly" style="border: none;"></span>
            <select :id="index + 'select'" class="selectWM" v-model="currentWorkDutyEle" style="display: none">
              <option v-for="currentWorkDuty in currentWorkDutyList" :value="currentWorkDuty">{{currentWorkDuty}}</option>
            </select>
          </td>
          <td>
            <span v-if="teacherSimpleInfo.isDoubleTeacher=='true'"><input value="是" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.isDoubleTeacher=='false'"><input value="否" readonly="readonly" style="border: none;"></span>
            <span v-else><input value="无" readonly="readonly" style="border: none;"></span>
            <select :id="index + 'select'" class="selectWM" v-model="isDoubleTeacher" style="display: none">
              <option value="true">是</option>
              <option value="false">否</option>
            </select>
          </td>
          <td>
            <span v-if="teacherSimpleInfo.teacherType==='1'"><input value="在职" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.teacherType==='2'"><input value="离职" readonly="readonly" style="border: none;"></span>
            <span v-else><input value="外聘" readonly="readonly" style="border: none;"></span>
            <select :id="index + 'select'" class="selectWM" v-model="teacherTypeEle" style="display: none">
              <option v-for="teacherType in teacherTypeList" :value="teacherType">{{teacherType}}</option>
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
    </div>
    <!--教师信息表格-->
    <div>
      <modal v-model="modalOperateBool" width="400" id="modalBody">
        <div style="text-align: center;font-size: 1.1rem;">
          <p v-if="operateMsg==='1'">是否确定保存修改</p>
          <p v-else-if="operateMsg==='2'">是否确定取消修改</p>
          <p v-else>是否确定删除</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button v-if="operateMsg==='1'" id="modalBtn" @click="saveOk()">确定</button>
          <button v-else-if="operateMsg==='2'" id="modalBtn" @click="cancelOk()">确定</button>
          <button v-else id="modalBtn" @click="deleteOk()">确定</button>
          <button id="modalBtn" @click="modalOperateBool =false">取消</button>
        </div>
      </modal>
      <!--用户修改，取消修改教师信息，删除教师时，弹窗确认-->
      <modal v-model="modalResultBool" width="400" id="modalBody">
        <div style="text-align: center;font-size: 1.1rem;">
          <p v-if="operateMsg == '1'">保存修改失败</p>
          <p v-else-if="operateMsg == '3'">删除失败</p>
          <p v-else>处理出错</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="resultOk">确定</button>
        </div>
      </modal>
      <!--弹窗提示确认保存修改，删除失败信息-->
      <Modal
        v-model="modalAdd"
        width="520"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
        <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
        <div>
          <span style="font-size: medium;padding: 0.5rem">教师编号:</span>
          <input placeholder="教师编号（必填）" style="width: 8rem;text-align: left" v-model="newTch.teacherId">
          <span style="font-size: medium;padding: 0.5rem">教师姓名:</span>
          <input placeholder="教师姓名（必填）" style="width: 8rem;text-align: left" v-model="newTch.teacherName">
        </div>
        <div style="margin: 0.2rem 0">
          <span style="font-size: medium;padding: 0.5rem">身份证:</span>
          <input placeholder="教师身份证号码（必填）" style="width: 11.6rem;text-align: left" v-model="newTch.teacherIDcard">
          <span style="font-size: medium;padding: 0.5rem">性别:</span>
          <select style="width: 7.4rem" v-model="newTch.teacherGender">
            <option value="" disabled>选择性别</option>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </div>
        <div style="margin: 0.2rem 0">
          <span style="font-size: medium;padding: 0.5rem">手机号码:</span>
          <input placeholder="教师手机号码" style="width: 8rem;text-align: left" type="number" v-model="newTch.contactNumber">
          <span style="font-size: medium;padding: 0.5rem">聘用校区:</span>
          <select style="width: 8rem" v-model="newTch.hireCampus">
            <option value="">选择校区</option>
            <option value="1">校本部</option>
            <option value="2">新校区</option>
          </select>
        </div>
        <div style="margin: 0.2rem 0">
          <span style="font-size: medium;padding: 0.5rem">教学职称:</span>
          <select style="width: 8rem" v-model="newTch.currentWorkTitle">
            <option value="5">无</option>
            <option value="1">助教</option>
            <option value="2">讲师</option>
            <option value="3">副教授</option>
            <option value="4">教授</option>
          </select>
          <span style="font-size: medium;padding: 0.5rem">工作职称:</span>
          <select style="width: 8rem" v-model="newTch.currentWorkDuty">
            <option value="10">无</option>
            <option value="1">医师</option>
            <option value="2">主治医师</option>
            <option value="3">副主任医师</option>
            <option value="4">主任医师</option>
            <option value="5">护士</option>
            <option value="6">护师</option>
            <option value="7">主管护师</option>
            <option value="8">副主任护师</option>
            <option value="9">主任护师</option>
          </select>
        </div>
        <div style="margin: 0.2rem 0">
          <span style="font-size: medium;padding: 0.5rem">是否双师:</span>
          <select style="width: 8rem" v-model="newTch.isDoubleTeacher">
            <option value="" disabled>选择双师型</option>
            <option value="true">是</option>
            <option value="false">否</option>
          </select>
          <span style="font-size: medium;padding: 0.5rem">教师类型:</span>
          <select style="width: 8rem" v-model="newTch.teacherType">
            <option value="" disabled>选择类型</option>
            <option value="1">在职</option>
            <option value="2">离职</option>
            <option value="3">外聘</option>
          </select>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="addTchOK()">新增</button>
          <button id="modalBtn" @click="modalAdd = false">取消</button>
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
              tchSize:0,
              modalAdd:false,
              newTch:
                {
                  teacherId:'',
                  teacherName:'',
                  teacherIDcard:'',
                  teacherGender:'',
                  currentWorkTitle:'5',
                  currentWorkDuty:'10',
                  isDoubleTeacher:'',
                  hireCampus:'',
                  contactNumber:'',
                  teacherType:''
                },
              teacherinfoKey: {
                teacherName: '',
                teacherNameList:[],
                teacherNames: '',
                teacherId:''
            },
              hireCampusList:[
                '1:校本部','2:新校区'
              ],
              currentWorkTitleList:[
                '1:助教','2:讲师','3:副教授','4:教授','5:无'
              ],
              currentWorkDutyList:[
                '1:医师','2:主治医师','3:副主任医师','4:主任医师','5:护士','6:护师','7:主管护师','8:副主任护师','9:主任护师','10:无'
              ],
              teacherTypeList:[
                '1:在职','2:离职','3:外聘'
              ],
              hireCampusEle:'',
              isDoubleTeacher:'',
              currentWorkTitleEle:'',
              currentWorkDutyEle:'',
              teacherTypeEle:'',
              index:'',
              modalDownloadBool:false,
              modalOperateBool:false,
              modalResultBool:false,
              downloadMsg:'',
              operateMsg:'',
              resultMsg:'1',
              teacherSimpleInfoList:[
//                  {isDoubleTeacher:'false',teacherId:'11234567',teacherName:'何平何平',teacherIdcard:'321281199503285555',teacherGender:'男',phoneNumber:'15680991111',hireCampus:'1',currentWorkTitle:'1',currentWorkDuty:'3',teacherType:'1'},
//                  {isDoubleTeacher:'true',teacherId:'21234567',teacherName:'何平',teacherIdcard:'321281199503285555',teacherGender:'男',phoneNumber:'15680991111',hireCampus:'2',currentWorkTitle:'3',currentWorkDuty:'7',teacherType:'2'}
                ]
            }
        },
      beforeMount:function() {
        this.$http.post('./teacherManage/getTeacherInfo',{},{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          this.teacherSimpleInfoList = response.body.teacherSimpleInfoList;
          this.tchSize = this.teacherSimpleInfoList.length;
        },function(error){
          console.log("获取error");
        });
      },
      methods:{
            addTchOK:function () {
                if(this.newTch.teacherId==""||this.newTch.teacherName==""||this.newTch.teacherIDcard=="")
                {
                  this.$Message.warning("请填写完整的教师信息！");
                  return;
                }
              if(this.newTch.teacherGender=='')
              {
                this.$Message.warning("请选择性别！");
                return;
              }
              if(this.newTch.hireCampus=='')
              {
                this.$Message.warning("请选择聘用校区！");
                return;
              }
              if(this.newTch.isDoubleTeacher=='')
              {
                this.$Message.warning("请选择双师型！");
                return;
              }
              if(this.newTch.teacherType=='')
              {
                this.$Message.warning("请选择教师类型！");
                return;
              }
              this.$http.post('./teacherManage/addTeacherForOne',{
                "teacherId":this.newTch.teacherId,
                "teacherName":this.newTch.teacherName,
                "teacherIDcard":this.newTch.teacherIDcard,
                "teacherGender":this.newTch.teacherGender,
                "currentWorkTitle":this.newTch.currentWorkTitle,
                "currentWorkDuty":this.newTch.currentWorkDuty,
                "isDoubleTeacher":this.newTch.isDoubleTeacher,
                "hireCampus":this.newTch.hireCampus,
                "contactNumber":this.newTch.contactNumber,
                "teacherType":this.newTch.teacherType
              },{
                "Content-Type":"application/json"
              }).then(function (response) {
                var result = response.body.result;
                if(result === "0"){
                  this.$Message.error("新增失败，请输入正确的教师信息！");
                }else{
                  this.$Message.success("新增成功！");
                  this.modalAdd = false;
                }
              },function(error){
                this.$Message.warning("网络错误！");
              });
            },
        tchNameClick:function(){
          this.teacherinfoKey.teacherId = "";
        },
//        点击教师姓名输入框时，清空教师编号输入框
        tchIdClick:function(){
          this.teacherinfoKey.teacherName = "";
        },
//        点击教师编号输入框时，清空教师姓名输入框
        checkTchInfoClick:function() {
          this.$http.post('./teacherManage/findTeacherInfo',{
            "teacherName":this.teacherinfoKey.teacherName,
            "teacherId":this.teacherinfoKey.teacherId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            var result = response.body.result;
            if(result === "0"){
              this.$Message.warning("查询结果为空！");
            }else{
              this.teacherSimpleInfoList = response.body.teacherSimpleInfoList;
              this.tchSize = this.teacherSimpleInfoList.length;
            }
          },function(error){
            console.log("获取error");
          });
        },
//        提交教师姓名和编号，接收教师信息
        handleFormatError:function(){
          this.downloadMsg = "1";
          this.modalDownloadBool = true;
        },
//        处理上传文件格式不正确问题
        handleSizeError:function(){
          this.downloadMsg = "2";
          this.modalDownloadBool = true;
        },
//        处理上传文件过大问题
        handleProgress:function(){
          this.$Message.loading("正在上传中...");
        },
//        message提示：上传文件中
        handleSuccess:function(res){
          if(res.result==='1'){
            this.downloadMsg = "3";
            setTimeout("location.reload(true)", 4000); //4秒后刷新页面
          }else{
            this.downloadMsg = res.result;
          }
          this.modalDownloadBool = true;
        },
//        文件上传成功后，如果上传文件没有问题，4秒后刷新页面，如果文件内容出错，提示文件出错信息
        handleError:function(){
          this.downloadMsg = "4";
          this.modalDownloadBool = true;
        },
//        提示文件上传失败
        downloadFormClick:function(){
          location.href="./teacherManage/exportTeacherInfoTemplet";
        },
//        下载上传模板
        downloadClick:function(){
          location.href="./teacherManage/exportTeacherInfo";
        },
//        下载教师信息Excel表
        checkOk:function(){
          this.modalDownloadBool = false;
        },
//        用户确认文件上传操作结果
        editClick: function(index){
          var inputTable = document.getElementById("inputTable"+index);
          var input = inputTable.getElementsByTagName("input");
          input[1].removeAttribute("readOnly");
          input[1].style.color = "#ff3438";
          this.teacherNames = input[1].value;
          var select = inputTable.getElementsByTagName("select");
          var editImg = document.getElementById("editImg"+index);
          var saveImg = document.getElementById("saveImg"+index);
          var deleteImg = document.getElementById("deleteImg"+index);
          var restoreImg = document.getElementById("restoreImg"+index);
          for(var i1=0;i1<2;i1++){
            var hireCampusSplit = this.hireCampusList[i1].split(":");
            if(this.teacherSimpleInfoList[index].hireCampus === hireCampusSplit[0]){
              this.hireCampusEle = this.hireCampusList[i1];
            }
          }
          for(var i2=0;i2<5;i2++){
            var currentWorkTitleSplit = this.currentWorkTitleList[i2].split(":");
            if(this.teacherSimpleInfoList[index].currentWorkTitle === currentWorkTitleSplit[0]){
              this.currentWorkTitleEle = this.currentWorkTitleList[i2];
            }
          }
          for(var i3=0;i3<10;i3++){
            var currentWorkDutySplit = this.currentWorkDutyList[i3].split(":");
            if(this.teacherSimpleInfoList[index].currentWorkDuty === currentWorkDutySplit[0]){
              this.currentWorkDutyEle = this.currentWorkDutyList[i3];
            }
          }
          for(var i4=0;i4<3;i4++){
            var teacherTypeSplit = this.teacherTypeList[i4].split(":");
            if(this.teacherSimpleInfoList[index].teacherType === teacherTypeSplit[0]){
              this.teacherTypeEle = this.teacherTypeList[i4];
            }
          }
          this.isDoubleTeacher = this.teacherSimpleInfoList[index].isDoubleTeacher;
//          用户点击编辑图标时，下拉框内默认为当前用户信息
          for(var i = 5;i<10;i++){
            input[i].style.display = "none";
            select[i-5].style.display = "inline";
          }
          editImg.style.display = "none";
          saveImg.style.display = "inline";
          deleteImg.style.display = "none";
          restoreImg.style.display = "inline";
        },
//        修改教师信息
        saveClick:function(index){
          var inputTable = document.getElementById("inputTable"+index);
          var input = inputTable.getElementsByTagName("input");
          if(input[1].value == "")
          {
              this.$Message.error("教师姓名不能为空！");
              return;
          }
          this.modalOperateBool = true;
          this.operateMsg = "1";
          this.index = index;
        },
//        保存对教师信息的修改时，弹窗确认
        restoreClick:function(index){
          this.modalOperateBool = true;
          this.operateMsg = "2";
          this.index = index;
        },
//        取消对教师信息的修改时，弹窗确认
        deleteClick:function(index){
          this.modalOperateBool = true;
          this.operateMsg = "3";
          this.index = index;
        },
//        删除教师时，弹窗确认
        saveOk: function(){
          var inputTable = document.getElementById("inputTable"+this.index);
          var input = inputTable.getElementsByTagName("input");
          var select = inputTable.getElementsByTagName("select");
          var editImg = document.getElementById("editImg"+this.index);
          var saveImg = document.getElementById("saveImg"+this.index);
          var deleteImg = document.getElementById("deleteImg"+this.index);
          var restoreImg = document.getElementById("restoreImg"+this.index);
          var hireCampusSplit = this.hireCampusEle.split(":");
          var currentWorkTitleSplit = this.currentWorkTitleEle.split(":");
          var currentWorkDutySplit = this.currentWorkDutyEle.split(":");
          var teacherTypeSplit = this.teacherTypeEle.split(":");
          this.$http.post('./teacherManage/editTeacherInfo',{
            "teacherId":input[0].value,
            "teacherName":input[1].value,
            "hireCampus":hireCampusSplit[0],
            "currentWorkTitle":currentWorkTitleSplit[0],
            "currentWorkDuty":currentWorkDutySplit[0],
            "teacherType":teacherTypeSplit[0],
            "isDoubleTeacher":select[3].value
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            this.resultMsg=response.body.result;
            if(this.resultMsg==='1'){
              this.teacherSimpleInfoList[this.index].hireCampus = hireCampusSplit[0];
              this.teacherSimpleInfoList[this.index].currentWorkTitle = currentWorkTitleSplit[0];
              this.teacherSimpleInfoList[this.index].currentWorkDuty = currentWorkDutySplit[0];
              this.teacherSimpleInfoList[this.index].teacherType = teacherTypeSplit[0];
              this.teacherSimpleInfoList[this.index].isDoubleTeacher = select[3].value;
              this.$Message.success("保存成功！");
            }else{
              this.modalResultBool = true;
              this.teacherSimpleInfoList[this.index].teacherName=this.teacherNames;
            }
          },function(error){
            this.modalResultBool = true;
            this.teacherSimpleInfoList[this.index].teacherName=this.teacherNames;
          });
          for(var i = 5;i<10;i++){
            input[i].style.display = "inline";
            select[i-5].style.display = "none";
          }
          input[1].readOnly = "readOnly";
          input[1].style.color = "#030203";
          this.modalOperateBool = false;
          editImg.style.display = "inline";
          saveImg.style.display = "none";
          deleteImg.style.display = "inline";
          restoreImg.style.display = "none";
        },
//        保存对教师信息的修改
        cancelOk: function(){
          var inputTable = document.getElementById("inputTable"+this.index);
          var input = inputTable.getElementsByTagName("input");
          input[1].readOnly = "readOnly";
          input[1].style.color = "#030203";
          this.teacherSimpleInfoList[this.index].teacherName=this.teacherNames;
          var select = inputTable.getElementsByTagName("select");
          var editImg = document.getElementById("editImg"+this.index);
          var saveImg = document.getElementById("saveImg"+this.index);
          var deleteImg = document.getElementById("deleteImg"+this.index);
          var restoreImg = document.getElementById("restoreImg"+this.index);
          for(var i = 5;i<10;i++){
            input[i].style.display = "inline";
            select[i-5].style.display = "none";
          }
          this.modalOperateBool = false;
          editImg.style.display = "inline";
          saveImg.style.display = "none";
          deleteImg.style.display = "inline";
          restoreImg.style.display = "none";
        },
//        取消对教师信息的修改
        deleteOk: function(){
          this.$http.post('./teacherManage/deleteTeacherInfo',{
            "teacherId":this.teacherSimpleInfoList[this.index].teacherId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            this.resultMsg=response.body.result;
            if(this.resultMsg==='1'){
              this.teacherSimpleInfoList.splice(this.index,1);
              this.tchSize -=1;
              this.$Message.success("删除成功！");
            }else{
              this.modalResultBool = true;
            }
          },function(error){
            console.log("获取error");
          });
          this.modalOperateBool = false;
        },
//        删除教师及其所有信息
        resultOk: function(){
          this.modalResultBool = false;
        }
//        确认操作失败信息
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
    .inputWM{
      width: 8rem;
      margin: 0 0.7rem;
      text-align: left;
    }
    .buttonWM{
      width: 5.6rem;
      margin: 0 0.7rem;
    }
    .selectWM{
      width: 80%;
    }
    input{
      width: 80%;
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
    }
</style>
