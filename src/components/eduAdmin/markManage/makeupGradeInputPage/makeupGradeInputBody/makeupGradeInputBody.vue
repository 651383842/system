<template>
<div>
	<!-- 导航栏路径跳转返回首页 -->
	<div class="positionBar">
		<span>您的当前位置：</span>
		<span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
		<!-- <span> > <a href="#/login/main/eduAdminHome?eduAdmin" class="returnHome">成绩管理</a></span> -->
		<!-- <span> > <a href="#/login/main/eduAdminHome?gradeManage" class="returnHome">补考</a></span> -->
		<span> > 补考成绩录入</span>
	</div>
	<!-- 填选信息进行查询学生补考成绩输入 -->
	<div class="tableSelectSpan">
    <select style="width:11.5rem" v-model="selYearTerm" @change="classChange()">
      <option disabled value="">选择学年</option>
      <option v-for="yearTermOne in yearTerm" :value="yearTermOne.semValue">{{yearTermOne.semName}}</option>
    </select>
		<select style="width:7rem" v-model="selGradeType" @change="termChange()">
			<option disabled value="">选择年制</option>
			<option v-for="gradeTypeOne in gradeType" :value="gradeTypeOne.value">{{gradeTypeOne.text}}</option>
		</select>
    <select  style="width:8.2rem" v-model="selClass" @change="classChange()">
      <option disabled value="">选择班级</option>
      <option v-for="classinfo in classList" :value="classinfo.classId">{{classinfo.className}}</option>
    </select>
		<select v-model="selCourseName" @change="courseChange()">
			<option disabled value="">选择课程</option>
			<option v-for="courseNameOne in courseInfo" :value="courseNameOne.courseId">{{courseNameOne.courseName}}</option>
		</select>
		<!-- 在未查询之前，编辑、保存、提交按钮隐藏 -->
		<button class="am-btn am-btn-success am-radius"  v-show="buttonShow" @click="submitBtn()">提交</button>
		<button class="am-btn am-btn-success am-radius"  v-show="buttonShow" @click="saveAllBtn()">保存</button>
		<button class="am-btn am-btn-success am-radius"  v-show="buttonShow" @click="compileBtn()">编辑</button>
    <button class="am-btn am-btn-success am-radius" @click="downloadClick()">下载模版</button>
    <span >
				<Upload
          ref="upload"
          :data="{'courseAssociationId': courseAssociationId}"
          :show-upload-list="false"
          :format="['xls', 'xlsx']"
          :max-size="5120"
          :on-format-error = "handleFormatError"
          :on-exceeded-size="handleSizeError"
          :on-success="handleSuccess"
          :on-error="handleError"
          action="./importMakeUpScoreList">
            <button  style=" height: 2.46rem" id="uploadBtn" v-if="selCourseName!=''">导入</button>
				</Upload>
			</span>
    <button class="am-btn am-btn-success am-radius" @click="findBtn()">查询</button>
  </div>

	<div id="makeupGradeInputBody">
		<!-- 补考成绩输入 -->
		<div class="makeupScoreTable">
			<table class="normalTable" id="inputGroup">
				<thead>
					<tr>
						<th width="34%">学号</th>
						<th width="33%">姓名</th>
						<th width="33%">补考成绩</th>
					</tr>
				</thead>
				<tbody>
					<tr  v-for="(makeupScore, index) in makeUpGradeInputList" :key="makeupScore">
						<td v-html="makeupScore.studentId"></td>
						<td v-html="makeupScore.studentName"></td>
						<td>
							<input type="number" v-model="makeupScore.makeUpGrade" readonly="true">
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<!-- 操作二次确认弹窗 -->
	<Modal v-model="modalOperation" id="modalBody" :styles="{top:'10rem'}">
		<div style="text-align:center; font-size:1.1rem;">
			<p v-if="opertaionBool === '1'">您确定要保存所修改内容吗？</p>
			<p v-else-if="opertaionBool === '2'">您确定要提交成绩单吗？</p>
			<p v-else-if="opertaionBool === '2'" style="color:red;">（提交后成绩将不可修改）</p>
		</div>
		<div slot="footer" style="text-align:center;">
			<Button v-if="opertaionBool === '1'" id="modalBtn" @click="saveOk()">确定</Button>	<!-- 保存确定 -->
			<Button v-else-if="opertaionBool === '2'" id="modalBtn" @click="submitOk()">确定</Button>	<!-- 提交确定 -->
			<Button id="modalBtn" @click="cancel()">取消</Button>
		</div>
	</Modal>

	<!-- 操作结果弹窗提示 -->
	<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
		<div style="text-align:center; font-size:1.1rem;">
		    <p v-if="remindResult === '1'">操作失败！请重试</p>
		    <p v-else-if= "remindResult === '2'">保存成功！</p>
		    <p v-else-if= "remindResult === '3'">提交成功！成绩将不可再修改。</p>
		    <p v-else-if= "remindResult === '4'">保存失败！</p>
		    <p v-else-if= "remindResult === '5'">提交失败！</p>
		    <p v-else-if= "remindResult === '6'">该课程没有可编辑的成绩！</p>
		    <p v-else-if= "remindResult === '7'">请输入所有成绩！</p>
    		<p v-else-if="remindResult === '8'">请选择年制！</p>
    		<p v-else-if="remindResult === '9'">请选择后进行查询！</p>
		    <p v-else-if= "remindResult === '10'">请正确输入成绩分值（0-100）！</p>
		</div>
	    <div slot="footer" style="text-align:center;">
	        <Button id="modalBtn" @click="resultOk()">确认</Button>
	    </div>
	</Modal>
</div>
</template>

<script>
export default {
	data () {
		return {
			buttonShow: false, // 初始化，编辑、保存、提交按钮不显示
			selGradeType: '',
			selYearTerm: '',
			selCourseName: '',
      selClass:'',
      courseAssociationId:'',
			gradeType: [		// 选择年制
				{text: '三年制', value: '3'},
				{text: '五年制', value: '5'}
			],
			yearTerm: [],		// 选择学期
			courseInfo: [
        {
          courseId:'FVG51',courseName:'哲学'
        }
      ],		// 选择课程
			makeUpGradeInputList: [
//        {studentId: '010203',studentName: '何平',makeUpGrade: 0 },
//        {studentId: '010203',studentName: '何平',makeUpGrade: 0 }
      ],
			modalOperation: false,
			modalResult: false,
			opertaionBool: '',
			remindResult: '',
      threeClass:[],
      fiveClass:[],
      classList:[]
		}
	},
	beforeMount: function() {
    // 页面初始化，获取学期下拉数据
    this.$http.post('./getCurrentYearAndSemester',{},{//获取当前学期周数
      "Content-Type":"application/json"
    }).then(function(response){
      var data = response.body;
      this.generateSemester();
      this.selYearTerm = data.yearAndSemester;
    },function(error){});
      this.$http.post('./courseManage/getCourseAndClassInfo',{},{
          "Content-Type":"application/json"
      }).then(function(response){
          var data = response.body;
          this.threeClass = data.classInfo.three;
          this.fiveClass = data.classInfo.five;
      },function(error){
      });
    this.$Notice.success({
      title: '提醒',
      desc: '选择课程后才能进行补考成绩导入！',
      duration: 5,
      top:40
    });
    },
    methods: {
    	// 查询按钮************************************************************************
    	findBtn: function () {
  			// 判断所有下拉框是否已全选，若未选择，则弹窗提示
    		if (this.selGradeType == "") {
    			this.modalResult = true;
    			this.remindResult = '8';
    		}else if (this.selYearTerm == "" || this.selCourseName == "") {
    			this.modalResult = true;
    			this.remindResult = '9';
    		}else {
	    		this.$http.post('./getMakeUpGradeInputList',{
					"gradeType": this.selGradeType,
					"yearTerm": this.selYearTerm,
					"courseId": this.selCourseName,
            "classId":this.selClass
				},{
		            "Content-Type":"application/json"
		        }).then(function(response){
		            var data = response.body;
                  this.makeUpGradeInputList = data.makeUpGradeInputList;
                  if (this.makeUpGradeInputList.length != 0) {
                    this.buttonShow = true;
                  }else {
                    this.modalResult = true;
                    this.remindResult = '6';
                  }
		        },function(error){});
    		}
    	},
      handleFormatError:function () {
        this.$Message.warning("只能导入格式为'xls', 'xlsx'的文件！");
      },
      handleSizeError:function () {
        this.$Message.warning("文件太大了，最大只能5120kb！");
      },
      handleSuccess:function (res) {
        if(res.result == 1)
        {
          this.$Message.success("导入成功！");
        }else
        {
            var msg = "导入失败:"+res.result;
            this.$Message.error(msg);
        }
      },
      handleError:function () {
        this.$Message.error("导入失败，请检查导入文件内容！");
      },
      termChange:function () {
        this.selClass = "";
        this.selCourseName="";
        if(this.selGradeType == '3')
        {
          this.classList = this.threeClass;
        }else
        {
          this.classList = this.fiveClass;
        }
      },
      classChange:function () {
    	    if(this.selClass == "")
          {
              return;
          }
    	    this.selCourseName="";
        this.$http.post('./courseAssociationManege/showLessonsBySemester',{
          "yearSemester": this.selYearTerm,
          "schoolYearType": this.selGradeType,
          "classId": this.selClass
        },{
          "Content-Type":"application/json"
        }).then(function(response){
          this.courseInfo = response.body;
          if(response.body.length==0)
          {
            this.$Message.warning("没有查询到课程！");
          }
        },function(error){
        });
      },
      courseChange:function () {
        for(var i=0;i<this.courseInfo.length;i++)
        {
            if(this.courseInfo[i].courseId == this.selCourseName)
            {
                this.courseAssociationId = this.courseInfo[i].courseAssociationId;
                return;
            }
        }
      },
      generateSemester:function () {
        var nDate = new Date();
        var nYear = parseInt(nDate.getFullYear())+1;
        var stl="";
        var st2="";
        for(var i=1;i<=4;i++)
        {
          stl = nYear-1+'-'+nYear+'.'+'1';
          st2 = nYear-1+'-'+nYear+'学年（上）';
          this.yearTerm.push({semName:st2,semValue:stl});
          stl = nYear-1+'-'+nYear+'.'+'2';
          st2 = nYear-1+'-'+nYear+'学年（下）';
          this.yearTerm.push({semName:st2,semValue:stl});
          nYear--;
        }
      },
    	// 编辑修改补考成绩*****************************************************************
    	compileBtn: function () {
    		var inputGroup = document.getElementById("inputGroup");
    		var input = inputGroup.getElementsByTagName("input");
    		for (var i = 0; i < this.makeUpGradeInputList.length; i++) {
    		    if(input[i].readOnly == false)
            {
              input[i].readOnly = true;
              input[i].style.border = "none";
            }else{
              input[i].readOnly = false;
              input[i].style.border = "0.1rem solid #d4d4d9";
            }
    		}
    	},
    	// 点击保存**************************************************************************
    	saveAllBtn: function () {
    		var inputGroup = document.getElementById("inputGroup");
    		var input = inputGroup.getElementsByTagName("input");
    		var emptyNum = '0';
    		var wrongNum = '0';
    		// 判断是否有未输入空值
        for (var i = 0; i < this.makeUpGradeInputList.length; i++) {
          if (input[i].value == "") {
            emptyNum++;
    			}else if (this.makeUpGradeInputList[i].makeUpGrade>100||this.makeUpGradeInputList[i].makeUpGrade<0) {
					wrongNum++;
				}
    		}
        if (emptyNum == '0' && wrongNum == '0') {
    			this.modalOperation = true;
    			this.opertaionBool = '1';
    		}else if (wrongNum != '0') {
    			this.modalResult = true;
          this.remindResult = '10';
    		}else {
    			this.modalResult = true;
    			this.remindResult = '7';
    		}
    	},
    	// 确认保存修改成绩
    	saveOk: function () {
    		var inputGroup = document.getElementById("inputGroup");
    		var input = inputGroup.getElementsByTagName("input");
    		for (var i = 0; i < this.makeUpGradeInputList.length; i++) {
    			input[i].readOnly = true;
    			input[i].style.border = "none";
    		}
        this.modalOperation = false;
        this.$http.post('./saveMakeUpScore',{
    			"operateType": "1",
    			"gradeType": this.selGradeType,
				"yearTerm": this.selYearTerm,
				"courseId": this.selCourseName,
				"makeUpGradeInputList": this.makeUpGradeInputList
			},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            var data = response.body;
	            if(data.result == "1") {
                this.$Message.success('保存成功！');
                }else {
	            	this.modalResult = true;
                this.remindResult = '4';
                }
	        },function(error){
          this.$Message.error('网络错误，请稍后重试！');
        });
    	},
    	// 点击提交***********************************************************
    	submitBtn: function () {
    		this.modalOperation = true;
    		this.opertaionBool = '2';
    	},
    	submitOk: function () {
    		this.modalOperation = false;
    		this.$http.post('./saveMakeUpScore',{
    			"operateType": "2",
    			"gradeType": this.selGradeType,
				"yearTerm": this.selYearTerm,
          "courseId": this.selCourseName,
				"makeUpGradeInputList": this.makeUpGradeInputList
			},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            var data = response.body;
	            if(data.result == "1") {
                    this.$Message.success('提交成功！成绩将不可再修改。');
                    this.buttonShow = false;
                }else {
                    this.modalResult = true;
                    this.remindResult = '5';
                }
	        },function(error){
          this.$Message.error('网络错误，请稍后重试！');
        });
    	},
    	cancel: function () {
    		this.modalOperation = false;
    	},
    	resultOk: function () {
    		this.modalResult = false;
    	},
      downloadClick:function(gradeId){//下載模板
        location.href="./exportMakeUpScoreModule";
      }
    }
}
</script>

<style scoped>
#makeupGradeInputBody {
	width: 100%;
	background-color: #f3f3f3;
	position: relative;
	display: inline-block;
	overflow: auto;
}
.makeupScoreTable {
	text-align: center;
	background-color: white;
	margin: 1rem 5rem;
}
.makeupScoreTable input {
  outline: none;
  border: none;
  margin: 0;
  text-align: center;
}

.tableSelectSpan {
  margin: 0.8rem 5rem;
  /*height: 3.5rem;
  line-height: 3.5rem;
  overflow: hidden;*/
}
.tableSelectSpan select {
  margin-right: 1rem;
  width: 11.5rem;
  font-size: 0.9rem;
  outline: none;
}
.tableSelectSpan button {
  width: 5.2rem;
  margin: 0 0.7rem;
  outline: none;
  float: right;
}

.tableSelectSpan span {
  width: 5.6rem;
  margin: 0 1rem;
  float: right;
}
</style>
