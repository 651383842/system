<template>
  <div id="courseArrangeSettingDiv">
    <div class="blank"></div>
    <div class="dropDown">
      <div id="fiveYearDiv">
        <button class="amButtom" @click="fiveYearClick"><img id="fiveYearArrow" class="iconImg" :src="icon2"><span class="subtitle">五年制</span></button>
        <!--按钮实现点击显示或隐藏，p标签通过css模拟箭头符号-->
        <table id="fiveYearTable" v-show="fiveYearTable">
          <thead>
            <tr class="headTr">
            <td>课程名称</td>
            <td>课程编号</td>
            <td>任课教师</td>
            <td>教师编号</td>
            <td>班级</td>
            <!--<td class="operationTd"><button class="importButton" @click="ImportClick('five')">导入</button></td>-->
            <td class="portTd">
              <button id="downloadButton" class="am-btn am-btn-success am-radius" @click="downloadClick">下载模版</button>
              <Upload
                id="upload"
                ref="uploadForTextbook"
                :data = "{ 'schoolYearType':'5'}"
                :show-upload-list="false"
                :format="['xls','xlsx']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleSize"
                :on-success="handleSuccess"
                :on-error="handleError"
                action="./courseAssociationManege/import.action">
              <i-button type="ghost" id="importButton1">导入</i-button>
              </Upload>
              <!--操作-->
            </td>
          </tr>
          </thead>
          <tbody>
            <!--循环生成课程信息，index作为data数组的下标索引，将index用作id的一部分，便于准确定位操作DOM，key用于绑定课程信息，保证索引不随着数组元素增删自动发生变化-->
            <tr v-for="(fiveCourse,index) in fiveCourses" :id="'fiveInputTr'+index" :key="fiveCourse.id">
              <td>
                <select v-model="fiveCourse.number" disabled @change="courseChange(fiveCourses,index,'five')">
                  <option disabled value="">选择课程</option>
                  <option v-for="course in course5s" :value="course.id">{{ course.name }}</option>
                </select>
              </td>
              <td><input type="text" v-model="fiveCourse.number" readonly="readonly"></td>
              <td>
                <select v-model="fiveCourse.teacherId" disabled @change="teacherChange(fiveCourses,index)">
                  <option disabled value="">选择教师</option>
                  <option v-for="teacher in teachers" :value="teacher.id">{{ teacher.name }}</option>
                </select>
              </td>
              <td><input type="text" v-model="fiveCourse.teacherId" readonly="readonly"></td>
              <td class="classTd">
                <select v-model="fiveCourse.classId" disabled @change="classChange(fiveCourses,index,'five')">
                  <option disabled value="">选择班级</option>
                  <option v-for="className in className5s" :value="className.id">{{ className.name }}</option>
                </select>
                <!--<select v-model="fiveCourse.class2" disabled>
                  <option v-for="className in classNames" :value="className.id">{{ className.name }}</option>
                </select>-->
              </td>
              <td class="operationTd">
                <!--编辑功能，初始显示，编辑时隐藏-->
                <img :id="'fiveEditImg'+index" src="../../../../../assets/images/edit.png" @click="editClick('five',index)">
                <!--保存功能，初始隐藏，编辑时显示-->
                <img :id="'fiveSaveImg'+index" class="saveImg" src="../../../../../assets/images/save.png" @click="operationClick('five',index,'save')">
                <!--取消编辑并重置，初始隐藏，编辑时显示-->
                <img :id="'fiveRestoreImg'+index" class="restoreImg" src="../../../../../assets/images/restore.png" @click="operationClick('five',index,'restore')">
                <!--删除功能，初始显示，编辑时隐藏-->
                <img :id="'fiveDeleteImg'+index" src="../../../../../assets/images/delete.png" @click="operationClick('five',index,'delete')">
              </td>
            </tr>
            <tr>
              <!--增加功能，通过vue增加循环数组元素，但input DOM不会即时创建，所以暂时无法增加的同时处于编辑状态-->
              <td><img src="../../../../../assets/images/add.png" @click="addClick(fiveCourses,'five')"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="threeYearDiv">
        <button class="amButtom" @click="threeYearClick"><img id="threeYearArrow" class="iconImg" :src="icon1"><span class="subtitle">三年制</span></button>
        <table id="threeYearTable" v-show="threeYearTable">
          <thead>
            <tr class="headTr">
            <td>课程名称</td>
            <td>课程编号</td>
            <td>任课教师</td>
            <td>教师编号</td>
            <td>班级</td>
            <td class="portTd">
              <button id="downloadButton3" class="am-btn am-btn-success am-radius" @click="downloadClick">下载模版</button>
              <Upload
                id="upload"
                ref="uploadForTextbook"
                :data = "{ 'schoolYearType':'3'}"
                :show-upload-list="false"
                :format="['xls','xlsx']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleSize"
                :on-success="handleSuccess"
                :on-error="handleError"
                action="./courseAssociationManege/import.action">
                <i-button type="ghost" id="importButton2">导入</i-button>
              </Upload>
              <!--操作-->
            </td>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(threeCourse,index) in threeCourses" :id="'threeInputTr'+index" :key="threeCourse.id">
              <td>
                <select v-model="threeCourse.number" disabled @change="courseChange(threeCourses,index,'three')">
                  <option disabled value="">选择课程</option>
                  <option v-for="course in course3s"  :value="course.id">{{ course.name }}</option>
                </select>
              </td>
              <td><input type="text" v-model="threeCourse.number" readonly="readonly"></td>
              <td>
                <select v-model="threeCourse.teacherId" disabled @change="teacherChange(threeCourses,index)">
                  <option disabled value="">选择教师</option>
                  <option v-for="teacher in teachers"  :value="teacher.id">{{ teacher.name }}</option>
                </select>
              </td>
              <td><input type="text" v-model="threeCourse.teacherId" readonly="readonly"></td>
              <td class="classTd">
                <select v-model="threeCourse.classId" disabled @change="classChange(threeCourses,index,'three')">
                  <option disabled>选择班级</option>
                  <option v-for="className in className3s" :value="className.id">{{ className.name }}</option>
                </select>
                <!--<select v-model="threeCourse.class2" disabled>
                  <option v-for="className in classNames" :value="className.id">{{ className.name }}</option>
                </select>-->
              </td>
              <td class="operationTd">
                <img :id="'threeEditImg'+index" src="../../../../../assets/images/edit.png" @click="editClick('three',index)">
                <img :id="'threeSaveImg'+index" class="saveImg" src="../../../../../assets/images/save.png" @click="operationClick('three',index,'save')">
                <img :id="'threeRestoreImg'+index" class="restoreImg" src="../../../../../assets/images/restore.png" @click="operationClick('three',index,'restore')">
                <img :id="'threeDeleteImg'+index" src="../../../../../assets/images/delete.png" @click="operationClick('three',index,'delete')">
              </td>
            </tr>
            <tr>
              <td><img src="../../../../../assets/images/add.png" @click="addClick(threeCourses,'three')"></td>
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
        <p>您确定取消编辑并重置该课程信息吗?</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="restoreClick(operationYear,operationIndex)">确定</button>
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
        <p>您确定删除该课程吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="deleteClick(operationYear,operationIndex)">确定</button>
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
        <p>您确定提交保存该课程信息吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="saveClick(operationYear,operationIndex)">确定</button>
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
        <p>{{ errorMessage }}</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="modal4 = false">确定</button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'courseArrangeSettingDiv',
    data () {
      return {
        icon1:require('../../../../../assets/images/icon1.png'),
        icon2:require('../../../../../assets/images/icon2.png'),
        fiveArrow: true,
//        五年制课程下拉箭头，初始为下拉显示
        threeArrow: false,
//        三年制课程下拉箭头，初始为下拉隐藏
        fiveYearTable: true,
//        五年制课程下拉内容，初始为下拉显示
        threeYearTable: false,
//        三年制课程下拉内容，初始为下拉隐藏
        fiveCourses: [
          /*{ id:"1", name:"护理学管理", number:"123", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"2", name:"护理学管理", number:"123", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"3", name:"护理学管理", number:"123", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"4", name:"护理学管理", number:"123", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"5", name:"护理学管理", number:"123", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"6", name:"护理学管理", number:"123", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"7", name:"护理学管理", number:"123", teacher:"1", teacherId:"1", class1:"1", class2:"1" },*/
        ],
//              五年制课程信息
        threeCourses: [
          /*{ id:"1", name:"护理学管理", number:"123", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"2", name:"护理学管理", number:"123", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"3", name:"护理学管理", number:"123", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"4", name:"护理学管理", number:"123", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"5", name:"护理学管理", number:"123", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"6", name:"护理学管理", number:"123", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"7", name:"护理学管理", number:"123", teacher:"", teacherId:"", class1:"", class2:"" },*/
        ],
        course3s:[
          /*{ id:"123", name:"护理学管理" },
          { id:"456", name:"临床护理学" },
          { id:"789", name:"护理基础" }*/
        ],
        course5s:[],
        teachers:[
          /*{ id:"111", name:"张苏纳" },
          { id:"222", name:"李斯" },
          { id:"333", name:"王舞" },
          { id:"666", name:"马六" }*/
        ],
        className3s: [
          /*{ id:"101", name:"高职2013级1班" },
          { id:"102", name:"高职2013级2班" },
          { id:"103", name:"高职2014级1班" },
          { id:"104", name:"高职2014级2班" },
          { id:"105", name:"高职2015级1班" },
          { id:"106", name:"高职2015级2班" },
          { id:"107", name:"高职2016级1班" },
          { id:"108", name:"高职2016级2班" },
          { id:"109", name:"中职2015级1班" },
          { id:"110", name:"中职2015级2班" },
          { id:"111", name:"中职2015级3班" },
          { id:"112", name:"中职2015级4班" },
          { id:"113", name:"中职2015级5班" },
          { id:"114", name:"中职2016级1班" },
          { id:"115", name:"中职2016级2班" },
          { id:"116", name:"中职2016级3班" },
          { id:"117", name:"中职2016级4班" }*/
        ],
        className5s: [],
        buffer_fiveCourses: [],
        buffer_threeCourses: [],
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        operationYear: "",
        operationIndex: "",
        errorMessage:""
      }
    },
    mounted: function(){
      var importButton1 = document.getElementById("importButton1");
      var importButton2 = document.getElementById("importButton2");
      importButton1.className = "am-btn am-btn-success am-radius";
      importButton2.className = "am-btn am-btn-success am-radius";
    },
    beforeMount: function() {
      this.$http.post('./courseAssociationManege.action',{},{
//      this.$http.post('../testPhp/courseArrangeSetting.php',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        var data = response.body.courseTeacherList;
        this.fiveCourses = [];
        this.threeCourses = [];
        for(var i = 0;i < data.length;i++){
          if(data[i].schoolYearType == 5){
            this.fiveCourses.push({ "id":data[i].courseAssociationId, "name":data[i].courseName, "number":data[i].courseId, "teacher":data[i].teacherName, "teacherId":data[i].teacherId, "classId":data[i].classId, "className": data[i].className, "coursePlanId":data[i].coursePlanId });
          }else if(data[i].schoolYearType == 3){
            this.threeCourses.push({ "id":data[i].courseAssociationId, "name":data[i].courseName, "number":data[i].courseId, "teacher":data[i].teacherName, "teacherId":data[i].teacherId, "classId":data[i].classId, "className": data[i].className, "coursePlanId":data[i].coursePlanId });
            }
        }
        for(var i = 0;i < this.fiveCourses.length;i++){
          this.buffer_fiveCourses.push({ id:"", name:"", number:"", teacher:"", teacherId:"", classId:"", className:"", coursePlanId:"" });
        }
        for(var i = 0;i < this.threeCourses.length;i++){
          this.buffer_threeCourses.push({ id:"", name:"", number:"", teacher:"", teacherId:"", classId:"", className:"", coursePlanId:"" });
        }

        for(var i = 0;i < response.body.course3List.length;i++){
          this.course3s.push({ id:response.body.course3List[i].split("(")[0], name:response.body.course3List[i].split("(")[1].split(")")[0]})
        }
        for(var i = 0;i < response.body.course5List.length;i++){
          this.course5s.push({ id:response.body.course5List[i].split("(")[0], name:response.body.course5List[i].split("(")[1].split(")")[0]})
        }
        for(var i = 0;i < response.body.teacherList.length;i++){
          this.teachers.push({ id:response.body.teacherList[i].split("(")[0], name:response.body.teacherList[i].split("(")[1].split(")")[0]})
        }
        for(var i = 0;i < response.body.classList.length;i++){
          if(response.body.classList[i].split("(")[0].substring(4,5) == "5") {
            this.className5s.push({
              id: response.body.classList[i].split("(")[0],
              name: response.body.classList[i].split("(")[1].split(")")[0]
            });
          }else if(response.body.classList[i].split("(")[0].substring(4,5) == "3") {
            this.className3s.push({
              id: response.body.classList[i].split("(")[0],
              name: response.body.classList[i].split("(")[1].split(")")[0]
            });
          }
        }
      },function(error){
        console.log("获取error:");
        console.log(error);
      });
    },
    methods: {
      operationClick: function(year,operationIndex,operation){
        this.operationYear = year;
        this.operationIndex = operationIndex;
        if(operation == "restore"){
          this.modal1 = true;
        }else if(operation == "delete"){
          this.modal2 = true;
        }else if(operation == "save"){
          this.modal3 = true;
        }
      },
      downloadClick: function(){
        location.href = "./courseAssociationManege/download.action";
      },
//        点击显示或隐藏五年制下拉课程信息
      fiveYearClick: function(){
        var fiveYearArrow = document.getElementById("fiveYearArrow");
//              显示下拉课程信息
        if(!this.fiveArrow){
          this.fiveArrow = true;
          this.fiveYearTable = true;
          fiveYearArrow.src = this.icon2;
        }else{
          this.fiveArrow = false;
          this.fiveYearTable = false;
          fiveYearArrow.src = this.icon1;
        }
//              隐藏下拉课程信息
      },
//        点击显示或隐藏三年制下拉课程信息
      threeYearClick: function(){
        var threeYearArrow = document.getElementById("threeYearArrow");
        if(!this.threeArrow){
          this.threeArrow = true;
          this.threeYearTable = true;
          threeYearArrow.src = this.icon2;
        }else{
          this.threeArrow = false;
          this.threeYearTable = false;
          threeYearArrow.src = this.icon1;
        }
      },
//        编辑功能
      courseChange: function(courses,index,year){
        if(year == "five") {
          for (var i = 0; i < this.course5s.length; i++) {
            if (this.course5s[i].id == courses[index].number) {
              courses[index].name = this.course5s[i].name;
              break;
            }
          }
        }else if(year == "three"){
          for (var i = 0; i < this.course3s.length; i++) {
            if (this.course3s[i].id == courses[index].number) {
              courses[index].name = this.course3s[i].name;
              break;
            }
          }
        }
      },
      teacherChange: function(courses,index){
        for(var i = 0;i < this.teachers.length;i++){
          if(this.teachers[i].id == courses[index].teacherId){
            courses[index].teacher = this.teachers[i].name;
            break;
          }
        }
      },
      classChange: function(courses,index,year){
       if(year == "five") {
         for (var i = 0; i < this.className5s.length; i++) {
           if (this.className5s[i].id == courses[index].classId) {
             courses[index].className = this.className5s[i].name;
             break;
           }
         }
       }else if(year == "three"){
         for (var i = 0; i < this.className3s.length; i++) {
           if (this.className3s[i].id == courses[index].classId) {
             courses[index].className = this.className3s[i].name;
             break;
           }
         }
       }
      },
      editClick: function(year,index){
        var inputTr = document.getElementById(year+"InputTr"+index);
//        var input = inputTr.getElementsByTagName("input");
        var select = inputTr.getElementsByTagName("select");
        var editImg = document.getElementById(year+"EditImg"+index);
        var saveImg = document.getElementById(year+"SaveImg"+index);
        var restoreImg = document.getElementById(year+"RestoreImg"+index);
        var deleteImg = document.getElementById(year+"DeleteImg"+index);
        var i = null;
        for(i = 0;i<select.length;i++){
          select[i].removeAttribute("disabled");
        }
        if(year == "five"){
          this.buffer_fiveCourses.splice(index, 1, JSON.parse(JSON.stringify(this.fiveCourses[index])));
          console.log(this.buffer_fiveCourses[index]);
        }
        if(year == "three"){
          this.buffer_threeCourses.splice(index, 1, JSON.parse(JSON.stringify(this.threeCourses[index])));
        }
//        隐藏编辑和删除功能图标,显示保存和重置功能图标
        editImg.style.display = "none";
        saveImg.style.display = "inline";
        deleteImg.style.display = "none";
        restoreImg.style.display = "inline";
      },
//        取消修改,重置数据,退出编辑
      restoreClick: function(year,index){
//        if(confirm("您确定取消编辑并重置该课程信息吗？")){
          var inputTr = document.getElementById(year+"InputTr"+index);
          var select = inputTr.getElementsByTagName("select");
          var editImg = document.getElementById(year+"EditImg"+index);
          var saveImg = document.getElementById(year+"SaveImg"+index);
          var restoreImg = document.getElementById(year+"RestoreImg"+index);
          var deleteImg = document.getElementById(year+"DeleteImg"+index);
          var i = null;
//            重置数据到value
          if(year == "five"){
            this.fiveCourses.splice(index, 1, JSON.parse(JSON.stringify(this.buffer_fiveCourses[index])));
          }
          if(year == "three"){
            this.threeCourses.splice(index, 1, JSON.parse(JSON.stringify(this.buffer_threeCourses[index])));
          }
          for(i = 0;i<select.length;i++){
            select[i].disabled = true;
          }
          editImg.style.display = "inline";
          saveImg.style.display = "none";
          deleteImg.style.display = "inline";
          restoreImg.style.display = "none";
//        }
          this.modal1 = false;
      },
      deleteClick: function(year,index){
//          从data中的课程信息数组中删除
//          预留功能,将data提交到后端,实现删除数据,处理回调
//        if(confirm("您确定删除该课程吗？")){
          var courses = null;
          if (year == "five") {
            courses = this.fiveCourses;
          }
          if (year == "three") {
            courses = this.threeCourses;
          }
        if(courses[index].id == ""){
          if (year == "five") {
            this.fiveCourses.splice(index, 1);
            this.buffer_fiveCourses.splice(index, 1);
          }
          if (year == "three") {
            this.threeCourses.splice(index, 1);
            this.buffer_threeCourses.splice(index, 1);
          }
          this.$Message.success('删除成功！');
          this.modal2 = false;
        }else {
//          this.$http.post('../testPhp/adjustCouApplySetTrue.php', {
          this.$http.post('./courseAssociationManege/delete.action',{
            "courseAssociationId": courses[index].id
          }, {
            "Content-Type": "application/json"
          }).then(function (response) {
            this.modal2 = false;
            console.log("删除：");
            console.log(response);
            if (response.body.result == 1) {
              if (year == "five") {
                this.fiveCourses.splice(index, 1);
                this.buffer_fiveCourses.splice(index, 1);
              }
              if (year == "three") {
                this.threeCourses.splice(index, 1);
                this.buffer_threeCourses.splice(index, 1);
              }
              this.$Message.success('删除成功！');
            }else{
//              this.$Message.error("操作失败，请重试！");
              this.errorMessage = "操作失败,请重试!";
              this.modal4 = true;
            }
          }, function (error) {
            this.modal2 = false;
            this.$Message.error("连接失败,请重试!");
          });
//        }
        }
      },
//        保存功能
      saveClick: function(year,index){
        var courses = null;
        if(year == "five"){
          courses = this.fiveCourses;
        }else if(year == "three"){
          courses = this.threeCourses;
        }
        console.log(courses[index]);
        if(courses[index].name == "" || courses[index].number == "" || courses[index].teacher == "" || courses[index].teacherId == "" || courses[index].classId == "" || courses[index].className == ""){
//          this.$Message.error('编辑内容不能为空！',3);
          this.modal3 = false;
          this.errorMessage = "编辑内容不能为空!";
          this.modal4 = true;
        }else {
          var isExist = true;
          if(courses.length < 2){
            isExist = false;
          }else if(year == "five"){
            for(var i = 0;i < courses.length;i++){
              if(courses[index].name != courses[i].name){
                isExist = false;
              }else if(courses[index].number != courses[i].number){
                isExist = false;
              }else if(courses[index].teacher != courses[i].teacher){
                isExist = false;
              }else if(courses[index].teacherId != courses[i].teacherId){
                isExist = false;
              }else if(courses[index].classId != courses[i].classId){
                isExist = false;
              }else if(courses[index].className != courses[i].className){
                isExist = false;
              }
            }
          }else if(year == "three"){
            for(var i = 0;i < courses.length;i++){
              if(courses[index].name != courses[i].name){
                isExist = false;
              }else if(courses[index].number != courses[i].number){
                isExist = false;
              }else if(courses[index].teacher != courses[i].teacher){
                isExist = false;
              }else if(courses[index].teacherId != courses[i].teacherId){
                isExist = false;
              }else if(courses[index].classId != courses[i].classId){
                isExist = false;
              }else if(courses[index].className != courses[i].className){
                isExist = false;
              }
            }
          }
          if(isExist) {
//            this.$Message.error("请不要重复设置相同的课程！");
            this.modal3 = false;
            this.errorMessage = "请不要重复设置相同的课程!";
            this.modal4 = true;
//          }else if(confirm("您确定提交保存该课程吗？")) {
          }else{
            var inputTr = document.getElementById(year + "InputTr" + index);
            var select = inputTr.getElementsByTagName("select");
            var editImg = document.getElementById(year + "EditImg" + index);
            var saveImg = document.getElementById(year + "SaveImg" + index);
            var restoreImg = document.getElementById(year + "RestoreImg" + index);
            var deleteImg = document.getElementById(year + "DeleteImg" + index);
            var i = null;
            var url = null;
            var schoolYearType = null;
            if (year == "five") {
              schoolYearType = 5;
            } else if (year == "three") {
              schoolYearType = 3;
            }
            if(courses[index].id == ""){
             url = "./courseAssociationManege/addOne.action"
             }else{
             url = "./courseAssociationManege/update.action"
             }
            this.$http.post(url,{
//            this.$http.post('../testPhp/adjustCouApplySetTrue.php',{
              "courseAssociationId": courses[index].id,
              "courseName": courses[index].name,
              "courseId": courses[index].number,
              "teacherName": courses[index].teacher,
              "teacherId": courses[index].teacherId,
              "schoolYearType": schoolYearType,
              "classId": courses[index].classId,
              "coursePlanId": courses[index].coursePlanId,
              "className": courses[index].className
            }, {
              "Content-Type": "application/json"
            }).then(function (response) {
              this.modal3 = false;
              var data = response.body;
              if (data.result == 1) {
                for (i = 0; i < select.length; i++) {
                  select[i].disabled = true;
                }
                editImg.style.display = "inline";
                saveImg.style.display = "none";
                deleteImg.style.display = "inline";
                restoreImg.style.display = "none";
                this.$Message.success('保存成功！');
              } else {
//                this.$Message.error("操作失败，请重试！");
                this.errorMessage = "操作失败，请重试!";
                this.modal4 = true;
              }
            }, function (error) {
              this.modal3 = false;
              this.$Message.error('连接失败，请重试！');
            });
          }
        }
      },
//        增加功能
      addClick: function (courses,year){
        courses.push(
            { id:"",name:"", "number":"", "teacher":"", "teacherId":"", "classId":"选择班级", className:"", coursePlanId:""}
        );
        if (year == "five") {
          this.buffer_fiveCourses.push(
              { id:"",name:"", "number":"", "teacher":"", "teacherId":"", "classId":"选择班级", className:"", coursePlanId:""}
          );
        }
        if (year == "three") {
          this.buffer_threeCourses.push(
              { id:"",name:"", "number":"", "teacher":"", "teacherId":"", "classId":"选择班级", className:"", coursePlanId:""}
          );
        }
      },
      handleFormatError: function(){
//        this.$Message.error('文件格式错误！限制格式为'+this.$refs.uploadForTextbook.format,3);
        this.errorMessage = "文件格式错误！限制格式为"+this.$refs.uploadForTextbook.format;
        this.modal4 = true;
      },
      handleSize: function(){
//        this.$Message.error('文件大小超出范围！限制最大（KB）为'+this.$refs.uploadForTextbook.maxSize,3);
        this.errorMessage = "文件大小超出范围！限制最大（KB）为"+this.$refs.uploadForTextbook.maxSize;
        this.modal4 = true;
      },
      handleError: function(res){
        var msg = document.getElementsByClassName("ivu-message-notice");
        if(this.loadingMsg){
//            结束进度条
          this.$Loading.error();
//            移除“正在上传……”的msg
          if(!!window.ActiveXObject || "ActiveXObject" in window){
            //msg[0].parentNode.innerHTML = "";
//                IE浏览器对removeChild实现有问题
          }else{
           // msg[0].parentNode.removeChild(msg[0]);
          }
        }
//        this.$Message.error('文件上传失败！'+res,3);
        this.errorMessage = "文件上传失败"+res;
        this.modal4 = true;
        this.loadingMsg = false;
      },
      handleProgress: function(){
        this.$Loading.start();
        this.$Message.loading('正在上传中……', 0);
        this.loadingMsg = true;
      },
      handleSuccess: function(res){
        this.$Loading.finish();
        var msg = document.getElementsByClassName("ivu-message-notice");
        if(!!window.ActiveXObject || "ActiveXObject" in window){
          //msg[0].parentNode.innerHTML = "";
        }else{
         // msg[0].parentNode.removeChild(msg[0]);
        }
        this.$Message.success('上传成功！3s后自动刷新页面！',3);
        console.log(res);
        this.loadingMsg = false;
        setTimeout("location.reload(true)",4000);
      }
    }
  }
</script>

<style scoped>
  /*最上层Div*/
  #courseArrangeSettingDiv{
    margin: 0 auto;
    background-color: #f3f3f3;
    min-height: 38.5rem;
  }
  .dropDown{
    margin: 0.5rem 5rem;
  }
  /*下拉显示或隐藏的按钮标题栏*/
  table{
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
    table-layout: fixed;
    border-right: thin solid #E3E3E3;
    border-left: thin solid #E3E3E3;
  }
  td{
    border-bottom: thin solid #E3E3E3;
    height: 2.5rem;
    text-align: center;
  }
  tbody td{
    height: 3.5rem;
  }
  img{
    position: relative;
    margin: 0.5rem 0.2rem;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
  input{
    outline:none;
    border: none;
    text-align: center;
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
    width: 15rem;
  }
  /*下载和导入*/
  .portTd{
    display: flex;
  }
  .classTd {
  }
  #downloadButton{
    height: 2.35rem;
    margin-right: 1.4rem;
  }
  #downloadButton3{
    height: 2.35rem;
    margin-right: 1.4rem;
  }
  @media screen and (max-width: 1023px) {
    #downloadButton{
      height: 2.47rem;
    }
  }
</style>
