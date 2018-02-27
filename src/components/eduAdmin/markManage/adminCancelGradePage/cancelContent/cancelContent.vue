  <template>
<div>
	<!-- 导航栏路径跳转返回首页 -->
	<div class="positionBar">
		<span>您的当前位置：</span>
		<span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
		<span> > 成绩撤销</span>
	</div>
	<!-- 选择课程、教师，进行查询可撤销成绩列表 -->
	<div class="tableSelect">
      <select v-model="teacher" @change="teacherClick()">
        <option disabled value="">选择教师</option>
        <option v-for="option2 in teacherInfo" :value="option2.teacherId">
          {{ option2.teacherName }}
        </option>
      </select>
	    <select v-model="course">
			<option disabled value="">选择课程</option>
			<option v-for="option1 in courseInfo" :value="option1.courseId">
				{{ option1.courseName }}
			</option>
	    </select>
		<button class="am-btn am-btn-success am-radius" @click="checkTableBtn()">查询</button>
	</div>
	<!-- 可撤销成绩列表展示 -->
	<div id="cancelContent">
		<div class="cancelContentBody">
			<table class="operationTable">
				<thead>
					<tr>
						<th width="14%">课程编号</th>
						<th width="14%">课程名称</th>
						<th width="14%">教师编号</th>
						<th width="14%">上传教师</th>
						<th width="14%">班级</th>
						<th width="16%">上传时间</th>
						<th width="14%">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(data, index) in scoreCommitList" :key="data">
						<td v-text="data.courseId"></td>
						<td v-text="data.courseName"></td>
						<td v-text="data.teacherId"></td>
						<td v-text="data.teacherName"></td>
						<td v-text="data.className"></td>
						<td v-text="data.commitTime"></td>
						<td class="textBtn">
							<a @click="backoutClick(index)">撤销</a>
              <a @click="exportClick(index)">导出</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<!-- 撤销二次确认弹窗 -->
	<Modal v-model="modalOperation" id="modalBody" :styles="{top:'10rem'}">
		<div style="text-align:center; font-size:1.1rem;">
			<p>您确定要撤销成绩提交？</p>
		</div>
		<div slot="footer" style="text-align:center;">
			<Button id="modalBtn" @click="backoutOk()">确定</Button>
			<Button id="modalBtn" @click="backoutCancel()">取消</Button>
		</div>
	</Modal>

	<!-- 错误弹窗提示 -->
	<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
		<div style="text-align:center; font-size:1.1rem;">
		    <p v-if="remindResult === '1'">操作失败！请重试</p>
		    <p v-if="remindResult === '2'">未找到所查询内容！</p>
		    <p v-if="remindResult === '3'">请选择后进行查询！</p>
		</div>
	    <div slot="footer" style="text-align:center;">
	        <Button id="modalBtn" @click="resultOk()">确认</Button>
	        <!-- <Button id="modalBtn" @click="submitCancel()">取消</Button> -->
	    </div>
	</Modal>
</div>
</template>

<script>
export default {
	data () {
		return {
			course: '',
			teacher: '',
			courseInfo: [],		// 课程下拉信息数组
			teacherInfo: [],	// 教师下拉信息数组
			// 可撤销成绩列表定义
			scoreCommitList: [
				// {courseId: '010203', courseName: '护理学', teacherId: '010203', teacherName: '何平', commitTime: '06.01.23 12:55', classId: '01020'},
				// {courseId: '010203', courseName: '基础护理学', teacherId: '010203', teacherName: '何平', commitTime: '06.01.23 12:55', classId: '未查看'}
			],
			modalResult: false,
			remindResult: '',
			modalOperation: false,
			index: ''
		}
	},
	// 页面初始化，获取下拉信息
	beforeMount: function () {
		this.$http.post('./courseManage/getCourseAndClassInfo',{
            "Content-Type":"application/json"
        }).then(function(response){
            var data = response.body;
            this.courseInfo = data.courseInfo;
            this.teacherInfo = data.teacherInfo;
            if(data.scoreCommitList.length != 0) {
              this.scoreCommitList = data.scoreCommitList;
            }else {
              this.$Message.warning("没有可执行的操作！");
            }
        },function(error){
        });
	},
  	methods: {
      exportClick:function (index) {
        location.href = './downloadScoreList?courseAssociationId='+ this.scoreCommitList[index].courseAssociationId;
      },
      teacherClick:function(){
        this.$http.post('./teachingSupervision/noSupervisorTeacherClickJson',{
          "teacherId":this.teacher
        },{
          "Content-Type":"application/json"
        }).then(function (response) {
          this.courseInfo = response.body.courseList;
          if(this.courseInfo.length == 0)
          {
            this.$Message.warning("该老师没有对应的课程！");
          }
        },function(error){
        });
        this.course = "";
      },
  		// 点击查询，回调表单************************************************
  		checkTableBtn: function () {
  			// 判断是否选择，若未选择，则弹窗提示
  			if (this.course == "" || this.teacher == "") {
  				this.modalResult = true;
  				this.remindResult = '3';
  			}else {
		  		this.$http.post('./getScoreCommitted', {
	  				"courseId": this.course,
	  				"teacherId": this.teacher
	  			}, {
	  				"Content-Type":"application/json"
	  			}).then(function(response){
              var data = response.body;
              if(data.scoreCommitList.length != 0) {
                  this.scoreCommitList = data.scoreCommitList;
              }else {
                  this.scoreCommitList.splice(0,this.scoreCommitList.length);
                  this.$Message.warning("未找到所查询内容！");
                  // this.modalResult = true;
                  // this.remindResult = '2';
              }
	  			});
  			}
  		},
  		// 撤销该条信息，弹窗二次确认********************************************
  		backoutClick: function (index) {
  			// alert(this.scoreCommitList[index].courseId);
  			this.modalOperation = true;
  			this.index = index;
  		},
  		// 弹窗点击确定，在列表中清除该条信息
  		backoutOk: function () {
  			this.modalOperation = false;
  			this.$http.post('./cancelScoreCommitted', {
  				"courseId": this.scoreCommitList[this.index].courseId,
  				"teacherId": this.scoreCommitList[this.index].teacherId,
  				"classId": this.scoreCommitList[this.index].classId
  			}, {
  				"Content-Type":"application/json"
  			}).then(function(response){
  				console.log("通过申请:");
                console.log(response);
                var data = response.body;
                if(data.result == "1") {
                	// 撤销请求成功，将删除该条信息
					this.$Message.success("已撤回！");
					this.scoreCommitList.splice(this.index,1);
                }else{
                    // this.$Message.error("操作失败！请重试");
                    this.modalResult = true;
                    this.remindResult = '1';
                }
  			});
  		},
  		// 弹窗点击取消
  		backoutCancel: function () {
  			this.modalOperation = false;
  		},
  		// 弹窗提示点击确定，弹窗消失
    	resultOk: function () {
    		this.modalResult = false;
    	}
  	}
}


</script>

<style scoped>
#cancelContent {
	background-color: #f3f3f3;
	width: 100%;
	text-align: center;
}
.cancelContentBody {
	padding: 1rem 5rem;
}
.cancelContentBody table {
	width: 100%;
	/*margin-bottom: 1.6rem;*/
	/*padding: 0.5rem 0.5rem;*/
	border-spacing: 0;
	border-collapse: separate;
	background: white;
}
.cancelContentBody button {
	width:  5.6rem;
}
</style>
