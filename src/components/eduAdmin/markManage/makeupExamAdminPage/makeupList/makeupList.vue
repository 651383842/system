<template>
<div>
	<!-- 导航栏路径跳转返回首页 -->
	<div class="positionBar">
		<span>您的当前位置：</span>
		<span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
		<span> > 补考成绩管理</span>
	</div>
	<!-- 填选信息进行查询学生成绩 -->
	<div class="tableSelect">
        <select v-model="selGradeType" @change="gradeChange()">
			<option disabled value="">选择年制</option>
			<option v-for="gradeTypeOne in gradeType" :value="gradeTypeOne.value">{{gradeTypeOne.text}}</option>
		</select>
		<select v-model="selYearTerm">
			<option disabled value="">选择学期</option>
			<option v-for="yearTermOne in yearTerm" :value="yearTermOne.semValue">{{yearTermOne.semName}}</option>
		</select>
		<select v-model="selCourseName">
			<option disabled value="">选择课程</option>
			<option v-for="courseNameOne in courseInfo" :value="courseNameOne.courseId">{{courseNameOne.courseName}}</option>
		</select>
		<select v-model="selClassId">
			<option disabled value="">选择班级</option>
			<option v-for="classIdOne in classInfo" :value="classIdOne.classId">{{classIdOne.className}}</option>
		</select>
        <button class="am-btn am-btn-success am-radius" @click="findBtn()">查询</button>
        <button class="am-btn am-btn-success am-radius" @click="exportBtn()">导出</button>
        <!-- <td class="textBtn"><form action="./exportMakeUpList" method="get"><button :value="data.courseAssociationId" name="courseAssociationId" type="submit" style="display:visibility;"><a>导出</a></button></form></td> -->
      </div>

	<div id="makeupList">
		<div class="makeupListBody">
    		<!-- 需要补考的学生名单 -->
			<div class="needMakeupList">
				<span>*以下是需要补考的名单</span>
				<div class="list1">
					<table class="normalTable">
						<thead>
							<tr>
								<td>年制</td>
								<td>年级</td>
								<td>专业</td>
								<td>学号</td>
								<td>学生姓名</td>
								<td>课程名称</td>
								<td>正考成绩</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="data in makeUpList">
								<td v-text="data.gradeType"></td>
								<td v-text="data.gradeId"></td>
								<td v-text="data.specialityName"></td>
								<td v-text="data.studentId"></td>
								<td v-text="data.studentName"></td>
								<td v-text="data.courseName"></td>
								<td v-text="data.finalGrade"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<!-- 补考不通过需要申请的学生名单 -->
			<div class="doubleFailList">
				<span>*以下是申请补考的学生</span>
				<div class="list2">
					<table class="operationTable">
						<thead>
							<tr>
								<td width="23%">申请学生</td>
								<td width="23%">申请课程</td>
								<td width="25%">申请时间</td>
								<td width="21%">操作</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(data, index) in makeUpAskList" :key="data">
								<td :value="data.studentId">{{data.studentName}}</td>
								<td :value="data.courseId">{{data.courseName}}</td>
								<td>{{data.makeUpAskTime}}</td>
								<td>
									<!-- <img class="rightImg" width="25px" height="25px" @click="rightBtn(index)">
									<img class="wrongImg" width="25px" height="25px" @click="wrongBtn(index)"> -->
		                            <!--申请通过批准-->
									<button class="operationBtn" @click="rightBtn(index)" title="申请批准">√</button>
		                            <!--申请拒绝-->
									<button class="operationBtn" @click="wrongBtn(index)" title="申请拒绝">×</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
            <button class="am-btn am-btn-success am-radius" @click="applyAll()">同意申请</button>
            <button class="am-btn am-btn-success am-radius" @click="cancelAll()">撤销申请</button>

            <!-- 同意申请 -->
            <Modal v-model="modal1" id="modalBody" :styles="{top:'10rem'}">
				<div style="text-align:center; font-size:1.1rem;">
					<!-- 单个学生申请批准 -->
					<p v-if="yesOk === '1'">您确定同意该学生的补考申请吗？</p>
					<!-- 所有学生申请批准 -->
					<p v-else-if="yesOk === '2'">您确定要提交查看所有信息吗？</p>
				</div>
				<div slot="footer" style="text-align:center;">
					<Button v-if="yesOk === '1'" id="modalBtn" @click="okSingle1()">确定</Button>
					<Button v-else-if="yesOk === '2'" id="modalBtn" @click="okAll1()">确定</Button>
					<Button id="modalBtn" @click="cancel1()">取消</Button>
				</div>
			</Modal>
			<!-- 撤销申请 -->
            <Modal v-model="modal2" id="modalBody" :styles="{top:'10rem'}">
				<div style="text-align:center; font-size:1.1rem;">
					<!-- 单个学生申请拒绝 -->
					<p v-if="noCancel === '1'">您确定要撤销该学生的补考申请吗？</p>
					<!-- 所有学生申请拒绝 -->
					<p v-else-if="noCancel === '2'">您确定要撤销所有信息吗？</p>
				</div>
				<div slot="footer" style="text-align:center;">
					<Button  v-if="noCancel === '1'" id="modalBtn" @click="okSingle2()">确定</Button>
					<Button v-else-if="noCancel === '2'" id="modalBtn" @click="okAll2()">确定</Button>
					<Button id="modalBtn" @click="cancel2()">取消</Button>
				</div>
			</Modal>

			<!-- 操作结果弹窗提示 -->
			<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
				<div style="text-align:center; font-size:1.1rem;">
				    <p v-if="remindResult === '1'">查询失败！请重试</p>
				    <p v-else-if= "remindResult === '2'">导出失败！请重试</p>
				    <p v-else-if= "remindResult === '3'">补考申请批准失败！</p>
				    <p v-else-if= "remindResult === '4'">补考申请否决失败！</p>
				    <p v-else-if= "remindResult === '5'">操作失败！请重试</p>
				    <p v-else-if= "remindResult === '6'">未找到可下载的内容！</p>
		    		<p v-else-if="remindResult === '7'">请选择年制！</p>
		    		<p v-else-if="remindResult === '8'">请选择后进行查询！</p>
				</div>
			    <div slot="footer" style="text-align:center;">
			        <Button id="modalBtn" @click="resultOk()">确定</Button>
			    </div>
			</Modal>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'makeupList',
	data () {
		return {
			selGradeType: '',
			selYearTerm: '',
			selCourseName: '',
			selClassId: '',
			gradeType: [
				{text: '三年制', value: '3'},
				{text: '五年制', value: '5'}
			],
			yearTerm: [],
			courseInfo: [],
			classInfo: [],
			makeUpList: [		// 获取补考名单
				// {},{},{},{}
			],
			makeUpAskList: [
				// {studentName: '李华', studentId:'aa', courseId:'123', courseName: '护理学', makeUpAskTime: '2017-04-10'},
				// {studentName: '李华', studentId:'bb', courseId:'12', courseName: '护理学', makeUpAskTime: '2017-04-10'}
			],
			modal1: false,		// 同意所有申请弹出框
			modal2: false,		// 不同意所有申请弹出框
			modalResult: false,
			remindResult: '',
			yesOk: '',
			noCancel: '',
			index: ''
		}
	},
	beforeMount: function() {
    //this.generateSemester();
    //this.selYearTerm = "2016-2017.1";
		// 页面初始化，获取学期下拉数据
        this.$http.post('./getYearTermList',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            var data = response.body;
            this.generateSemester();
            this.selYearTerm = data.currentYearTerm;
        },function(error){
        });
        // 页面初始化，获取课程下拉数据
        this.$http.post('./courseManage/getCourseAndClassInfoN',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            var data = response.body;
            this.courseInfo = data.courseInfo;
        },function(error){
        });
    },
  	methods: {
  		// 选择年制后，班级列表对应更改
    	gradeChange: function () {
    		// alert("1")
    		this.$http.post('./courseManage/getCourseAndClassInfoN',{},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            var data = response.body.classInfo;
	            // this.classInfo = [];
	            if(this.selGradeType==3){
	            	this.classInfo=(data.three);
	            }else if(this.selGradeType==5){
	            	this.classInfo=(data.five);
	            }
	        },function(error){
	        });
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
  		// 查找名单***********************************************************************************
  		findBtn: function () {
  			// 判断所有下拉框是否已全选，若未选择，则弹窗提示
    		if (this.selGradeType == "") {
    			// this.selGradeType = '0';
    			this.modalResult = true;
    			this.remindResult = '7';
    		}else if (this.selYearTerm == "" || this.selCourseName == "" || this.selClassId == "") {
    			this.modalResult = true;
    			this.remindResult = '8';
    		}else {
    			// var findResult = '0';
	    		// 获取需要补考名单*************************************************
	  			this.$http.post('./findMakeUpList',{
		        	"gradeType": this.selGradeType,
		        	"yearTerm": this.selYearTerm,
		        	"courseId": this.selCourseName,
		        	"classId": this.selClassId
		        },{
		            "Content-Type":"application/json"
		        }).then(function(response){
		            var data = response.body;
		            if (data.makeUpList.length != 0) {
		            	this.makeUpList = data.makeUpList;
		            }else {
				        // findResult++;
				        this.$Message.warning("未找到所查询内容！");
				    }
		        },function(error){
	        	});
	        	// 获取补考申请同意名单*********************************************
	        	this.$http.post('./findMakeUpAskList',{
		        	"gradeType": this.selGradeType,
		        	"yearTerm": this.selYearTerm,
		        	"courseId": this.selCourseName,
		        	"classId": this.selClassId
		        },{
		            "Content-Type":"application/json"
		        }).then(function(response){
		            var data = response.body;
		            if (data.makeUpAskList.length != 0) {
		            	this.makeUpAskList = data.makeUpAskList;
		            }else {
				        // findResult++;
				        this.$Message.warning("未找到所查询内容！");
				    }
		        },function(error){
		        });
	    // 		if (findResult != '0') {
		   //  		this.modalResult = true;
					// this.remindResult = '1';
	    // 		}
    		}
	    },
	    // 下载按钮********************************************************************
	    exportBtn: function () {
  			// 判断所有下拉框是否已全选，若未选择，则弹窗提示，若已全选，则可下载所查询内容
    		if (this.selGradeType == "") {
    			// this.selGradeType = '0';
    			this.modalResult = true;
    			this.remindResult = '7';
    		}else if (this.selYearTerm == "" || this.selCourseName == "" || this.selClassId == "") {
    			this.modalResult = true;
    			this.remindResult = '8';
    		}else {
	    		location.href = "./exportMakeUpList?gradeType="+this.selGradeType+"&"+"yearTerm="+this.selYearTerm+"&"+"courseId="+this.selCourseName+"&"+"classId="+this.selClassId;
	    	}
	    },
	    // 单个批准补考申请********************************************************
  		rightBtn: function (index) {
  			this.modal1 = true;
  			this.yesOk = '1';
			this.index = index;
  		},
  		// 单个批准补考申请弹窗点击确定
  		okSingle1: function () {
  			this.modal1 = false;
  			var makeUpAskListPut = [];
			makeUpAskListPut.push({studentId:this.makeUpAskList[this.index].studentId, courseId:this.makeUpAskList[this.index].courseId});
			this.$http.post('./makeUpAskAgree',{
				"makeUpAskList": makeUpAskListPut
			},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            var data = response.body;
	            if (data.result == "1") {
	            	this.$Message.success("补考申请批准！");
					this.makeUpAskList.splice(this.index, 1);
	            }else{
	            	this.modalResult = true;
			        this.remindResult = '3';
			    }
	        },function(error){
        	});
  		},
	    // 单个不同意补考申请**********************************************************
  		wrongBtn: function (index) {
  			this.modal2 = true;
  			this.noCancel = '1';
  			this.index = index;
  		},
  		// 单个不同意补考申请弹窗点击确定
  		okSingle2: function () {
  			this.modal2 = false;
			var makeUpAskListPut = [];
			makeUpAskListPut.push({studentId:this.makeUpAskList[this.index].studentId, courseId:this.makeUpAskList[this.index].courseId});
			this.$http.post('./makeUpAskDisagree',{
				"makeUpAskList": makeUpAskListPut
			},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            var data = response.body;
	            if (data.result == "1") {
	            	this.$Message.success("补考申请否决！");
					this.makeUpAskList.splice(this.index, 1);
	            }else{
	            	this.modalResult = true;
			        this.remindResult = '4';
			    }
	        },function(error){
        	});
  		},
  		// 点击提交，所选名单同意申请，并删除**************************************************
  		applyAll: function () {
  			this.modal1 = true;
  			this.yesOk = '2';
  		},
  		// 全部同意申请弹窗点击确定
  		okAll1 () {
  			var makeUpAskListPut = [];
  			for (var i = 0; i < this.makeUpAskList.length; i++) {
  				makeUpAskListPut.push({studentId:this.makeUpAskList[i].studentId, courseId:this.makeUpAskList[i].courseId});
  			}
  			if (makeUpAskListPut != []) {
	  			this.modal1 = false;
	            this.$http.post('./makeUpAskAgree',{
	  				"makeUpAskList": makeUpAskListPut
	  			},{
		            "Content-Type":"application/json"
		        }).then(function(response){
		            var data = response.body;
		            // 请求成功，则清空补考申请名单
		            if (data.result == "1") {
		            	this.makeUpAskList = [];
		            	this.$Message.success('所有学生补考申请成功！');
		            }else{
		            	this.modalResult = true;
				        this.remindResult = '3';
				    }
		        },function(error){
	        	});
  			}
        },
  		// 点击取消，所选名单不同意申请，并删除*****************************************************
  		okAll2 () {
  			var makeUpAskListPut = [];
  			for (var i = 0; i < this.makeUpAskList.length; i++) {
  				makeUpAskListPut.push({studentId:this.makeUpAskList[i].studentId, courseId:this.makeUpAskList[i].courseId});
  			}
  			if (makeUpAskListPut != []) {
	            this.modal2 = false;
	            this.$http.post('./makeUpAskDisagree',{
	  				"makeUpAskList": makeUpAskListPut
	  			},{
		            "Content-Type":"application/json"
		        }).then(function(response){
		            var data = response.body;
		            // 请求成功，则清空补考申请名单
				    if (data.result == "1") {
			            this.$Message.success('撤销所有学生补考申请！');
		            	this.makeUpAskList = [];
		            }else{
		            	this.modalResult = true;
				        this.remindResult = '4';
				    }
		        },function(error){
	        	});
	        }
        },
        // 同意申请弹窗取消
        cancel1 () {
            this.modal1 = false;
        },
        // 撤销申请弹窗取消
        cancel2 () {
            this.modal2 = false;
        },
        // 弹窗提示点击确定，弹窗消失
        resultOk () {
        	this.modalResult = false;
        }
  	}
}
</script>

<style scoped>
#makeupList {
	background-color: #f3f3f3;
	width: 100%;
	text-align: center;
	position: relative;
	display: inline-block;
	overflow: hidden;
}
.makeupListBody {
	margin: 1rem 5rem;
	padding: 1.4rem 0;
	background-color: white;
}
.makeupListBody button {
	/*width: 5.6rem;*/
	margin: 0 0.7rem;
}
.needMakeupList span,
.doubleFailList span {
	float: left;
	padding-left: 2rem;
}

/*#required {
	background: url(../../../../components/public/images/star.png) 2% 50% no-repeat;
}*/

.list1, .list2 {
	padding: 2rem;
}
.list2 {
	padding-bottom: 0.8rem;
}
.doubleFailList table {
	border: 2px solid #ececec;
	width: 100%;
}

/*ul {
	list-style: none;
	text-align: center;
	margin: 0;
	width: 100%;
}
li {
	float: left;
	margin: 0 5%;
	cursor: pointer;
}
.rightImg {
	margin: 0 5%;
	border: 0;
	vertical-align: text-bottom;
	background: url(./images/right.png) 50% 50% no-repeat;
	border: none;
	cursor: pointer;
}
.wrongImg {
	margin: 0 5%;
	padding: 0;
	vertical-align: text-bottom;
	background: url(./images/wrong.png) 50% no-repeat;
	cursor: pointer;
}
.rightImg:hover {
	background: url(./images/right-on.png) 50% no-repeat;
}
.wrongImg:hover {
	background: url(./images/wrong-on.png) 50% no-repeat;
}*/

.operationBtn {
	outline: none;
    border: thin solid #666;
    background-color: white;
    color: #666;
    border-radius: 50%;
    font-size: 1rem;
    width: 1.45rem;
}
.operationBtn:hover {
	background-color: red;
    color: white;
    border: red;
}
</style>
