<template>
  <div>
    <div  class="positionBar">
      <span>您当前的位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span>>补课申请</span>
    </div>
	 <div id="back">
    <!--<div class="applyTable">-->

    <div id="adjShow">

      <div id="adjTop1">
        <span>当前学年学期：{{year}}学年第{{semester}}学期</span>
        <span>当前周数：{{week}}</span>
        <span>请提前2天申请，若当前时间是17：00后，则顺延一天</span>
      </div>
      <div id="adjTop2">
        <span>{{teacher}}老师，您在【{{year}}学年第{{semester}}学期】共停了【{{stopLessonNum}}】门课，在调课补课时您所选上课时已过冲突筛选请留意。</span>
      </div>
      <div class="adjShowDiv">
        <table class="table table-hover table-bordered" cellspacing="1">
          <thead >
          <tr>
            <th width="10%">请选择</th>
            <th width="15%">序号</th>
            <th width="15%">班级名称</th>
            <th width="15%">课程名称</th>
            <th width="15%">课程编号</th>
            <th width="15%">任课老师</th>
            <th width="15%">课程详情</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(data,index) in tableList">
              <td width="10%">
                <span :id="'show'+index" style="text-decoration:underline;cursor: pointer;"  @click="show(index)">申请补课</span>
              </td>
              <td width="15%" v-text="index+1"></td>
              <td width="15%" v-text="data.className"></td>
              <td width="15%" v-text="data.courseName"></td>
              <td width="15%" v-text="data.courseId"></td>
              <td width="15%" v-text="data.teacherName"></td>
              <td width="15%" v-text="data.lessonChangeInfo"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-show="seenS" id="adjSel">
      <div id="adjTop3"><span>温馨提示:调课时需要实验室、机房等重要设备的教室时，请与相关教务员或实验员联系，否则申请教室不能使用后果自负。注：请先选择补课周数与教室。</span></div>
      <table>
        <tbody>
            <tr>
          <td class="designation" width="8%">
            <span>补课周数：</span>
          </td>
          <td class="choice" width="24%">
            <select @change="choose(selected1,selected4)" v-model="selected1">
              <option>选择周数</option>
              <option v-for="option1 in options1">
                {{ option1 }}
              </option>
            </select>
          </td>
          <td class="designation" width="8%">
            <span>补课时段：</span>
          </td>
          <td class="choice" width="24%">
            <select v-model="selected3" >
              <option>选择时段</option>
              <option v-for="option3 in options3" :value="option3.weekday+'-'+option3.lessonNum">
                第{{option3.weekday}}天-第{{option3.lessonNum}}节
              </option>
            </select>
          </td>
            </tr>
          <tr>
          <td class="designation" width="8%">
            <span>教室：</span>
            </td>
          <td class="choice" width="24%">
            <select v-model="selected4" @change="choose(selected1,selected4)" >
              <option>选择教室</option>
              <option v-for="option4 in options4" >
                {{ option4 }}
              </option>
            </select>
          </td>

          <td class="designation" width="8%">
            <span>具体理由：</span>
          </td>
          <td class="choice" width="24%">
            <textarea v-model="message2"></textarea>
          </td>
            </tr>
          </tbody>
      </table>
      <div style="text-align: center">
      <button  class="am-btn am-btn-success am-radius" @click="saveDia(selected1,selected3,selected4,message2)">提交</button>
      <button class="am-btn am-btn-success am-radius" @click="cancel">取消</button>
      </div>
    </div>
    <div class="adjShowDiv">
      <table class="table table-hover table-bordered" cellspacing="1">
        <thead >
        <tr>
          <th>课程编号</th>
          <th>课程名称</th>
          <th>申请教师</th>
          <th>班级名称</th>
          <th>课程详情</th>
          <th>申请教室</th>
          <th>具体理由</th>
          <th>状态</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="app in applicationList">
          <td  v-text="app.courseId"></td>
          <td  v-text="app.courseName"></td>
          <td  v-text="app.teacherName"></td>
          <td  v-text="app.className"></td>
          <td  v-text="app.lessonChangeInfo"></td>
          <td  v-text="app.useClassroom"></td>
          <td  v-text="app.mediationReason"></td>
          <td  v-text="app.auditType"></td>
        </tr>
        </tbody>
      </table>
    </div>
	<!--</div>-->
    <Modal
      v-model="modal1"
      width="400"
      :mask-closable="false"
      id="modalBody"
      :styles="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定提交该申请？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="saveSel(oselected1,oselected3,oselected4,omessage2)">确定</button>
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
         <p>你确定取消编辑吗？</p>
       </div>
       <div slot="footer" style="text-align: center">
         <button id="modalBtn" @click="cancelOK">确定</button>
         <button id="modalBtn" @click="modal2 = false">取消</button>
       </div>
     </Modal>
  </div>
  </div>
</template>

<script>
// import bootPage from './components/bootPage'

export default {
	name: 'nameUp',
	data () {
		return {
      teacher:'',
			year:'',
      semester:'',
			week:'',
			stopLessonNum:'',
      applicationList:'',
			seenS:false,
      modal2:false,
			tableList: [],
			selected1: '选择周数',
      selected2: '选择星期',
      selected3: '选择时段',
      selected4: '选择教室',
      message2:'',
			options1: [],
			options2: [],
			options3: [],
			options4: [],
      change:'',
      modal1:false,
      oselected1:'',
      oselected3:'',
      oselected4:'',
      omessage2:''
		}
	},
  beforeMount:function(){
    this.$http.post('./makeUpLessionApplication.action',{
        flag:0
      },
//      this.$http.post('../jsonphp/makeup.php',{},
      {"Content-Type":"application/json"}).then(function (response) {
        console.log(response);
        this.teacher = response.body.teacher;
        this.year = response.body.year;
        this.semester = response.body.semester;
        this.week = response.body.week;
        this.stopLessonNum = response.body.stopLessonNum;
        this.tableList = response.body.lessonList;
        this.applicationList = response.body.applicationList;
        for(var i=0;i<response.body.applicationList.length;i++){
          if(response.body.applicationList[i].auditType=="2"){
            this.applicationList[i].auditType="审核中";
          }else if(response.body.applicationList[i].auditType=="1"){
            this.applicationList[i].auditType="审核通过";
          }else{
            this.applicationList[i].auditType="审核不通过";
          }
        }
      },
      function(error){
        console.log("获取error:");
        console.log(error);
      });
  },
    methods:{
      //打开保存对话框
      saveDia:function(selected1,selected3,selected4,message2){
        this.oselected1=selected1;
        this.oselected3=selected3;
        this.oselected4=selected4;
        this.omessage2=message2;
        this.modal1 = true;
      },
      //点击申请补课 进行填写申请内容
      show:function(index){
          if(this.seenS)
          {
              this.$Message.warning("正在编辑中！");
              return;
          }
        var txt = document.getElementById('show'+index);
        txt.innerHTML = "编辑中...";
        this.seenS=true;
        this.change=index;
          this.$http.post('./makeUpLessionApplication/application-button.action',{
          "teacherName": this.tableList[index].teacherName,
          "courseId":this.tableList[index].courseId,
          "className":this.tableList[index].className,
          "lessonChangeInfo":this.tableList[index].lessonChangeInfo,
          "courseName":this.tableList[index].courseName,
          "applicationTime":this.tableList[index].applicationTime ,
          "execWeek":this.tableList[index].execWeek,
          "useClassroom":this.tableList[index].useClassroom,
          "giveLessonsDetailsId":this.tableList[index].giveLessonsDetailsId,
            "courseAssociationId":this.tableList[index].courseAssociationId,
            "teacherId":this.tableList[index].teacherId
        },{"Content-Type":"application/json"}).then(function (response) {
            for(var x=0;x<response.body.selectiveWeekSet.length;x++){
              this.options1.push(response.body.selectiveWeekSet[x]);}
            for(var n=0;n<response.body.selectiveClassroomSet.length;n++){
              this.options4.push(response.body.selectiveClassroomSet[n]);}
          },
          function(error){
          });
      },
      //选择周数与教室  与后端交互传过来剩下的下拉的内容
      choose:function(sel1,sel4){
        if(sel1!="选择周数"&&sel4!="选择教室"){
         this. $http.post('./makeUpLessionApplication/application-select.action',{
//           this. $http.post('../jsonphp/makeup.php',{
           "teacherName": this.tableList[this.change].teacherName,
           "courseId":this.tableList[this.change].courseId,
           "className":this.tableList[this.change].className,
           "lessonChangeInfo":this.tableList[this.change].lessonChangeInfo,
           "courseName":this.tableList[this.change].courseName,
           "applicationTime":this.tableList[this.change].applicationTime,
           "execWeek":this.tableList[this.change].execWeek,
           "useClassroom":this.tableList[this.change].useClassroom,
           "giveLessonsDetailsId":this.tableList[this.change].giveLessonsDetailsId,
           "courseAssociationId":this.tableList[this.change].courseAssociationId,
           "teacherId":this.tableList[this.change].teacherId,
           "selectedWeek":sel1,
           "selectedClassroom":sel4
         },{"Content-Type":"application/json"}).then(function(response){
//           for(var i=0;i<response.body.selectiveList.length;i++){
//             this.options3.push(response.body.selectiveList[i][0]);
//             this.options3.s.push(response.body.selectiveList[i]);
//           }
           this.options3=response.body.selectiveList;
         },function(error){
         })
        }
      },
      //保存
      saveSel:function(sele1,sele3,sele4,message){
        this.modal1=false;
        var weekday = sele3.split("-")[0];
        var lessonNum = sele3.split("-")[1];
//        this.$http.post('../jsonphp/makeup.php',{
        this.$http.post('./makeUpLessionApplication/application-submit.action',{
            "teacherName": this.tableList[this.change].teacherName,
            "courseId":this.tableList[this.change].courseId,
            "className":this.tableList[this.change].className,
            "lessonChangeInfo":this.tableList[this.change].lessonChangeInfo,
            "courseName":this.tableList[this.change].courseName,
            "applicationTime":this.tableList[this.change].applicationTime,
            "execWeek":this.tableList[this.change].execWeek,
            "useClassroom":this.tableList[this.change].useClassroom,
            "giveLessonsDetailsId":this.tableList[this.change].giveLessonsDetailsId,
            "courseAssociationId":this.tableList[this.change].courseAssociationId,
            "teacherId":this.tableList[this.change].teacherId,
            "mediationReason":message,
            "selectedWeek":sele1,
            "selectedWeekday":weekday,
            "selectedLessonNum":lessonNum,
            "selectedClassroom":sele4
        },{"Content-Type":"application/json"}).then(function (response) {
            if(response.body.result=="1")
            {this.$Message.success('操作成功！');
              var t=setTimeout(" location.reload();",3000)
            }
          },
          function(error){
          });
        this.seenS=false;
      },
      //取消
      cancel:function(){
        this.modal2 = true;
      },
      cancelOK:function () {
        this.modal2 = false;
        this.seenS=false;
        var txt = document.getElementById('show'+this.change);
        txt.innerHTML = "申请补课";
      }
    }


}
</script>

<style scoped>
  @import '../../../../assets/css/external.css';
  #back{
    background-color: #f3f3f3;
    padding-top:0.1rem;
  }
#adjTop1{
	background-color: white;
	position: relative;
	height:2rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.3rem;

}       /*提示1*/
#adjTop2{
	background-color: white;
	position: relative;
	height:2rem;
	display: flex;
	align-items: center;
	padding: 0.3rem;
}       /*提示2*/
#adjTop3{
	background-color: white;
	position: relative;
	height:2rem;
	display: flex;
	align-items: center;
	padding: 0.3rem;
}       /*提示3*/
#adjShow {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 1.5rem;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
	/*background-color: #f3f3f3;*/



}

.adjShowDiv {
	background-color: white;
	border: thin solid lightgrey;
	font-size: 1rem;
	position: relative;
	top:1rem;
   margin-bottom: 2rem;

}
table{
  border-collapse:collapse ;
  width:100%
}

.table th {
	font-size: 0.9rem;
	font-weight: bold;
	background-color: white;
	height: 2rem;
	border:thin solid lightgrey;
}    /*表格菜单*/
.table td {
	font-size: 0.9rem;
	background-color: white;
	height: 2rem;
	border:thin solid lightgrey;
}    /*表格内容*/
 #adjSel {
	 text-align: center;
	 margin: 20px;
	margin-top: 0.2rem;
	background: white;
	height: 12rem;
}     /*选择框的背景*/
#adjSel table {
	width: 100%;
}
.designation {
	text-align: right;
}
.choice {
	text-align: left;
}
#adjSel tr {
	height: 2.4rem;
}
#adjSel td {
	position: relative;
}
textarea{
		border: 0.1rem solid #d4d4d9;
}
button{
   width:5.6rem;
  margin:0.7rem;
}
select{
	border: 0.1rem solid #d4d4d9;
	        border-radius: 0.7rem;
	        outline: none;
	        padding: 0.3rem 0.5rem;
	        margin: 0.1rem;
	        font-size: 0.8rem;
        }

</style>
