<template>
<div>
	<!-- 导航栏路径跳转返回首页 -->
	<div class="positionBar">
		<span>您的当前位置：</span>
		<span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
		<span> > 成绩统计</span>
	</div>
	<!-- 填选信息进行查询学生成绩 -->
	<div class="tableGrade">
		<select v-model="selGradeType" @change="showLessons">
			<option disabled value="">选择年制</option>
			<option v-for="gradeTypeOne in gradeType" :value="gradeTypeOne.value">{{gradeTypeOne.text}}</option>
		</select>
		<select v-model="selYearTerm" @change="showLessons">
			<option disabled value="">选择学期</option>
			<option v-for="yearTermOne in yearTerm" :value="yearTermOne.semValue">{{yearTermOne.semName}}</option>
		</select>
		<select v-model="selSpeciality">
			<option disabled value="">选择专业</option>
			<option v-for="specialityOne in specialityInfo" :value="specialityOne.specialityId">{{specialityOne.specialityName}}</option>
		</select>
		<select v-model="selCourseName">
			<option disabled value="">选择课程</option>
			<option v-for="courseNameOne in courseInfo" :value="courseNameOne.courseId">{{courseNameOne.courseName}}</option>
		</select>
    <span class="inputFraction">
	        <input v-model="minScore" class="inputGrade">分 — 	<!-- 默认0 -->
	       	<input v-model="maxScore" class="inputGrade">分	<!-- 默认100 -->
    </span>
        <button class="am-btn am-btn-success am-radius" @click="inquireBtn()">查询</button>
		<button class="am-btn am-btn-success am-radius" @click="exportBtn()">导出</button>
		<!-- <td class="textBtn"><form action="./exportScoreList" method="get"><button :value="data.courseAssociationId" name="courseAssociationId" type="submit" style="display:visibility;"><a>导出</a></button></form></td> -->
	</div>

	<!-- 成绩单列表 -->
	<div id="gradeTable">
		<div class="gradeTableBody">
			<table class="normalTable">
				<thead>
					<tr>
						<th>学号</th>
						<th>姓名</th>
						<th>年级</th>
						<th>专业</th>
						<th>学期</th>
						<th>课程</th>
						<th>分数</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="data in scoreList">
						<td v-text="data.studentId"></td>
						<td v-text="data.studentName"></td>
						<td v-text="data.gradeId"></td>
						<td v-text="data.specialityName"></td>
						<td v-text="data.yearTerm"></td>
						<td v-text="data.courseId"></td>
						<td v-text="data.grade"></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<!-- 错误弹窗提示 -->
	<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
		<div style="text-align:center; font-size:1.1rem;">
		    <p v-if="resultBool === '1'">未找到所查询内容！</p>
		    <p v-else-if="resultBool === '2'">未找到可下载的内容！</p>
		    <p v-else-if="resultBool === '3'">请选择年制！</p>
		    <p v-else-if="resultBool === '4'">请选择后进行查询！</p>
		</div>
	    <div slot="footer" style="text-align:center;">
	        <Button id="modalBtn" @click="resultOk()">确认</Button>
	    </div>
	</Modal>
</div>
</template>

<script>
export default {
	name: 'gradeTable',
	data () {
		return {
			// 全局变量定义
			selGradeType: '',
			selYearTerm: '',
			selSpeciality: '01',
			selCourseName: '',
			gradeType: [
				{text: '三年制', value: '3'},
				{text: '五年制', value: '5'}
			],
			yearTerm: [
				// "2016-2017学年第一学期"
			],
			specialityInfo: [],
			courseInfo: [
				// {courseName: '护理学', courseId: '123456'}
			],
			minScore: '',
			maxScore: '',
			// 返回学生成绩列表
			scoreList: [
				// {stuNum: '20142201010', stuName: '何平', stuGrade: '大二', stuMajor: '护理学', stuSemester: '2016-2017第一学期', stuCourse: '护理学', stuScore: '80'}
				// {},{},{}
			],
			modalResult: false,
			resultBool: ''
		}
	},
	beforeMount: function() {
    this.$http.post('./getCurrentYearAndSemester',{},{//获取当前学期周数
      "Content-Type":"application/json"
    }).then(function(response){
      var data = response.body;
      this.generateSemester();
      this.selYearTerm = data.yearAndSemester;
    },function(error){});
        // 页面初始化，获取专业下拉数据
        this.$http.post('./specialityList',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            var data = response.body;
            this.specialityInfo = data.specialityInfo;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
        // 页面初始化，获取课程下拉数据
        this.$http.post('./courseManage/getCourseAndClassInfo',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            var data = response.body;
            this.courseInfo = data.courseInfo;
        },function(error){
        });
    },
	methods: {
    showLessons:function () {
      console.log(this.selYearTerm)
      if(this.selGradeType == ""||this.selYearTerm == "")
      {return;}
      this.$http.post('./courseAssociationManege/showLessonsBySemester',{
        "yearSemester": this.selYearTerm,
        "schoolYearType": this.selGradeType,
        "classId": ""
      },{
        "Content-Type":"application/json"
      }).then(function(response){
        this.courseInfo = response.body;
        if(this.courseInfo.length == 0)
        {
            this.$Message.warning("沒有查询到课程！");
        }
      },function(error){
      });
    },
    	// 查询按钮
		inquireBtn: function() {
			// 判断最低分数、最高分数是否已填，若未填，则分别默认为0、100
			if (this.minScore == '') {
    			this.minScore = '0';
    		}
    		if (this.maxScore == '') {
    			this.maxScore = '100';
    		}
    		this.minScore = parseInt(this.minScore);
        this.maxScore = parseInt(this.maxScore);
    		if(this.minScore>this.maxScore||this.minScore<0||this.minScore>100||this.maxScore<0||this.maxScore>100)
        {
            this.$Message.error("分段不合法！");
            return;
        }
    		// 判断所有下拉框是否已选，若未全选，则弹窗提示
    		if (this.selGradeType == "") {
    			this.modalResult = true;
    			this.resultBool = '3';
    		}else if (this.selYearTerm == "" || this.selCourseName == "" || this.selSpeciality == "") {
    			this.modalResult = true;
    			this.resultBool = '4';
    		}else {
	    		this.$http.post('./findScore',{
		        	"gradeType": this.selGradeType,
		        	"yearTerm": this.selYearTerm,
		        	"specialityId": this.selSpeciality,
		        	"courseId": this.selCourseName,
		        	"minScore": this.minScore,
		        	"maxScore": this.maxScore
		        },{
		            "Content-Type":"application/json"
		        }).then(function(response){
		            var data = response.body;
		            if (data.scoreList.length != 0) {
		            	this.scoreList = data.scoreList;
		            }else {
                  this.scoreList.splice(0,this.scoreList.length);
		            	this.$Message.warning("未找到所查询内容！");
				    }
		        },function(error){
	        	});
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
    	// 导出按钮
		exportBtn: function () {
		    if(this.scoreList.length == 0)
        {
          this.$Notice.warning({
            title: '提示！',
            desc: '查询结果为空不能导出，请先进行查询后再导出！'
          });
            return;
        }
			// 判断最低分数、最高分数是否已填，若未填，则分别默认为0、100
    		if (this.minScore == '') {
    			this.minScore = '0';
    		}
    		if (this.maxScore == '') {
    			this.maxScore = '100';
    		}
    		// 判断所有下拉框是否已选，若未全选，则弹窗提示。只有已全选后才能导出查询内容
    		if (this.selGradeType == "") {
    			this.modalResult = true;
    			this.resultBool = '3';
    		}else if (this.selYearTerm == "" || this.selCourseName == "" || this.selSpeciality == "") {
    			this.modalResult = true;
    			this.resultBool = '4';
    		}else {
				location.href = "./exportScoreListByMaxMinScore?gradeType="+this.selGradeType+"&"+"yearTerm="+this.selYearTerm+"&"+"specialityId="+this.selSpeciality+"&"+"courseId="+this.selCourseName+"&"+"minScore="+this.minScore+"&"+"maxScore="+this.maxScore;
			}
  		},
    	// 弹窗提示点击确定，弹窗消失
    	resultOk: function () {
    		this.modalResult = false;
    	}
	}
}
</script>

<style scoped>
.inputGrade {
	width: 2.3rem;
}
.inputFraction {
	margin-right: 1.4rem;
	font-size: 0.8rem;
}

#gradeTable {
	background-color: #f3f3f3;
	width: 100%;
	text-align: center;
}
.gradeTableBody {
	padding: 1rem 5rem;
}
.gradeTableBody select {
	margin: 0 1rem;
}
/*.gradeTableBody table {
	margin-bottom: 1.6rem;
}*/

</style>
