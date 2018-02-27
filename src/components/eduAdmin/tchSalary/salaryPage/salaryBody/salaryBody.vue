<template>
<div>
	<!-- 导航栏路径跳转返回首页 -->
	<div class="positionBar">
		<span>您的当前位置：</span>
		<span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
		<span> > 薪酬单</span>
	</div>
	<!-- 选择教师查询，可导出所查询列表信息 -->
	<div class="tableSelect">
      	<select v-model="selTeacher">
			<option value="">选择教师</option>
			<option v-for="teacherListOne in teacherInfo" :value="teacherListOne.teacherId">{{teacherListOne.teacherName}}</option>
		</select>
      	<button class="am-btn am-btn-success am-radius" @click="searchBtn()">查询</button>
      	<!-- <button class="am-btn am-btn-success am-radius" @click="exportTemplateBtn()">下载模板</button> -->
      	<button class="am-btn am-btn-success am-radius rightBtn" @click="exportBtn()">导出</button>
      	<!-- <button class="am-btn am-btn-success am-radius buttonPart" @click="inportBtn()">导入</button> -->
    </div>

	<div id="salaryBody">
		<!-- 薪酬列表信息展示 -->
		<div class="salaryContent">
			<table class="normalTable">
				<thead>
					<tr>
						<th width="">教师编码</th>
						<th width="">教师姓名</th>
						<th width="">职称(职务)</th>
						<th width="">所授课程</th>
						<th width="">授课班级</th>
						<th width="">计划课时</th>
						<th width="">课酬/课时</th>
						<th width="">总课酬(已签到)</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="data in teacherPayrollList">
						<td v-text="data.teacherId"></td>
						<td v-text="data.teacherName"></td>
						<td>{{data.workDuty}}({{data.workTitle}})</td>
						<td>{{data.courseName}}({{data.courseId}})</td>
						<td>{{data.className}}</td>
						<td v-text="data.courseHours"></td>
						<!-- <td class="textBtn"><a @click="periodBtn">{{data.period}}</a></td> -->
						<td v-text="data.payPerCourse"></td>
						<td v-text="data.wage"></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- 弹窗提示 -->
	<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
		<div style="text-align:center; font-size:1.1rem;">
		    <p>请选择教师后导出！</p>
		</div>
	    <div slot="footer" style="text-align:center;">
	        <Button id="modalBtn" @click="resultOk()">确认</Button>
	    </div>
	</Modal>
</div>
</template>

<script>
export default {
	name: 'salaryBody',
	data () {
		return {
			selTeacher: '',
			teacherInfo: [],
			teacherPayrollList: [],
			allteacherPayrollList: [],
			modalResult: false
		}
	},
	beforeMount: function() {
		// 初始化获取薪酬表格信息
        this.$http.post('./checkSalaryByEdu',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.teacherPayrollList = data.allteacherPayrollList;
            this.allteacherPayrollList = data.allteacherPayrollList;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
        // 获取下拉框教师列表
        this.$http.post('./teacherManage/getAllTeacherNameAndId',{},{
        // this.$http.post('./courseManage/getCourseAndClassInfo',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.teacherInfo = data;
            // this.teacherInfo = data.teacherNameAndIdList;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
	methods: {
		// 查询按钮
		searchBtn: function () {
			if (this.selTeacher == '') {
				this.teacherPayrollList = data.allteacherPayrollList;
			}else {
				this.$http.post('./checkSalaryByTeacher',{
					"teacherId": this.selTeacher
				},{
		            "Content-Type":"application/json"
		        }).then(function(response){
		            console.log("获取申请:");
		            console.log(response.body);
		            var data = response.body;
	                this.teacherPayrollList = data.teacherPayrollList;
		        },function(error){
		            console.log("获取申请error:");
		            console.log(error);
		        });
			}
	    },
	    // 下载按钮
	    exportBtn: function () {
        location.href = "./downloadallSalaryList"
	    },
	    // 弹窗提示确认，点击消失
	    resultOk: function () {
	    	this.modalResult = false;
	    }
	}
}
</script>

<style scoped>
#salaryBody {
	width: 100%;
	background-color: #f3f3f3;
	position: relative;
	display: inline-block;
	overflow: auto;
}
.salaryContent {
	text-align: center;
	background-color: white;
	margin: 1rem 5rem;
}
#salary input {
  margin-right: 1.4rem;
}
.buttonPart {
  float: right;
}

</style>
