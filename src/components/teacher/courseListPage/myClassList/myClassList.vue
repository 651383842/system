  <template>
<div>
	<!-- 导航栏路径跳转返回首页 -->
	<div class="positionBar">
		<span>您的当前位置：</span>
		<span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
		<span> > 教学计划</span>
	</div>
	<div class="blank">
        <div class="lpart">
            <span class="textWeight">我的教学计划</span>
        	<!-- <span class="textBlue">（注：请在上课后五天内填写）</span> -->
        </div>
    </div>

	<div id="myClassList">
		<div class="myCourseList">
			<table class="operationTable">
				<thead>
					<tr>
						<th width="15%">课程名称</th>
						<th width="13%">授课班级</th>
						<th width="10%">计划课时</th>
						<th width="10%">已上课时</th>
						<th width="12%">教学计划</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(data, index) in teachJournalList">
						<td :value="data.courseId">{{data.courseName}}</td>
						<td>{{data.className}}</td>
						<td>{{data.courseHours}}</td>
						<td>{{data.takedHours}}</td>
						<td class="textBtn">
							<!-- 教学计划 -->
							<span v-show="upLoadBtn" :id="'upload2'+index">
								<Upload
									ref="upload"
									:data="{'courseId': data.courseId,
										'coursewareType': '0'}"
									:show-upload-list="false"
									:format="['xls', 'xlsx','doc','docx']"
									:max-size="2048"
									:on-format-error = "handleFormatError2"
						            :on-exceeded-size="handleSizeError2"
						            :on-success="handleSuccess2"
						            :on-error="handleError2"
							 		action="./courseTeachPlan/uploadTeachPlan">
						            <!-- :on-progress="handleProgress2" -->
									<a :id="'signIn2'+index" title="请上传xls/xlsx/doc/docx文件">上传</a>
								</Upload>
							</span>
							<span :id="'check2'+index">
								<a @click="checkClick2(index)">查看</a>
							</span>
							<span v-show="submitBtn" :id="'submit2'+index">
								<a @click="submitClick2(index)">提交</a>
							</span>
						</td>
						<!-- <td class="textBtn" :value="data.courseAssociationId">
							跳转到教师签到页面
							<a :href="'#/teacher/teach/normalSchedule?courseAssociationId='+data.courseAssociationId+'&'+'courseName='+encodeURIComponent(data.courseName)+'&'+'className='+encodeURIComponent(data.className)">签到</a>
						</td> -->
					</tr>
				</tbody>
			</table>

			<!-- 查看申请状态弹出，并有下载功能按钮 -->
			<Modal v-model="modal" id="modalBody" :styles="{top:'10rem'}">
			    <div>
			    	<p style="text-align:center; font-size:1.8rem; height:3rem;">申请状态：{{uploadState}}</p>
			    </div>
			    <div slot="footer" style="text-align:center;">
			    	<!-- 下载课件 -->
			        <Button v-if="modalBool === '1'" id="modalBtn" @click="ok1()">下载</Button>
			        <!-- 下载教学计划 -->
			        <Button v-else-if="modalBool === '2'" id="modalBtn" @click="ok2()">下载</Button>
			        <Button id="modalBtn" @click="cancel()">取消</Button>
			    </div>
			</Modal>

			<!-- 提交弹窗 -->
			<Modal v-model="modalSubmit" id="modalBody" :styles="{top:'10rem'}">
			    <p style="text-align:center; font-size:1.1rem;">您确定要提交吗？</p>
			    <p style="text-align:center; font-size:0.9rem; color:red;">（提示：提交后将无法上传）</p>
			    <div slot="footer" style="text-align:center;">
			    	<!-- 提交课件 -->
			        <Button v-if="submitBool === '1'" id="modalBtn" @click="submitOk1()">确认</Button>
			        <!-- 提交教学计划 -->
			        <Button v-else-if="submitBool === '2'" id="modalBtn" @click="submitOk2()">确认</Button>
			        <Button id="modalBtn" @click="submitCancel()">取消</Button>
			    </div>
			</Modal>

			<!-- 提交状态返回 -->
			<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
				<div style="text-align:center; font-size:1.1rem;">
				    <p v-if= "uploadResult === '0'">上传失败！</p>
				    <p v-else-if="remindResult === '1'">提交成功！</p>
				    <p v-else-if= "remindResult === '2'">提交失败！</p>
				    <p v-else-if= "remindResult === '3'">文件格式不正确</p>
				    <p v-else-if= "remindResult === '3'">文件 {{fileName}} 格式不正确，请上传xls/xlsx表格或doc/docx文档。</p>
				    <p v-else-if= "remindResult === '4'">文件格式不正确</p>
				    <p v-else-if= "remindResult === '4'">文件 {{fileName}} 格式不正确，请上传zip或rar压缩包。</p>
				    <p v-else-if= "remindResult === '5'">超出文件大小限制</p>
				    <p v-else-if= "remindResult === '5'">文件 {{fileName}} 太大，不能超过 2M。</p>
				</div>
			    <div slot="footer" style="text-align:center;">
			        <Button id="modalBtn" @click="resultOk()">确认</Button>
			        <!-- <Button id="modalBtn" @click="submitCancel()">取消</Button> -->
			    </div>
			</Modal>
		</div>
	</div>

</div>
</template>

<script>
export default {
	name: 'myClassList',
	data () {
		return {
			// coursewareSubmitResult: '',		// 判断课件是否已提交
			// teachPlanSubmitResult: '',		// 判断教学计划是否已提交
			// semester: '',
			modal: false,
			modalSubmit: false,
			modalResult: false,
			modalBool: '',
			submitBool: '',
			remindResult: '',
			uploadResult: '',
			teachJournalList: [
//				 {courseId: 'GGBX0001', className: '一班', courseName: '基础护理技术', courseHours: '76', takedHours: '12',uploadStatus:'0'},
//				 {courseId: 'GGBX0001', className: '一班', courseName: '基础护理技术', courseHours: '76', takedHours: '12',uploadStatus:'1'}
			],
			// 下载课件列表
			// uploadList: [{coursewareName:'123',coursewareId:'aaaa'},{coursewareName:'123',coursewareId:'aaaa'}],
			courseIdPost: '',
			uploadState: '',		// 上传状态
			fileName: '',
			// optHide1: true,		// 初始化时操作隐藏
      upLoadBtn: false,		// 初始化时操作隐藏
      submitBtn: false,		// 初始化时操作隐藏
			index: ''
		}
	},
	// 初始化获取已签到课程列表
	beforeMount: function() {
        this.$http.post('./getTeacherTeachJournal',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            var data = response.body;
            this.teachJournalList = data.teachJournalList;
        },function(error){
//          this.teachJournalList=[
//            {courseId: 'GGBX0001', className: '一班', courseName: '基础护理技术', courseHours: '76', takedHours: '12',uploadStatus:3,auditStatus:0},
//            {courseId: 'GGBX0001', className: '一班', courseName: '基础护理技术', courseHours: '76', takedHours: '12',uploadStatus:3,auditStatus:1}
//          ];
        });
    },
  updated:function () {
//      console.log("打印：");
//      console.log(this.teachJournalList.length);
	    for(var i=0;i<this.teachJournalList.length;i++)
      {
        var upload = document.getElementById("upload2"+i);
        var submit = document.getElementById("submit2"+i);
        var uploadStatus = this.teachJournalList[i].uploadStatus;
        var submitStatus = this.teachJournalList[i].auditStatus;
        if (submitStatus == -1||submitStatus == 0||submitStatus == 3||submitStatus == 5) {
          upload.style.display = "inline-block";
          if(uploadStatus == 1)
          {
            submit.style.display = "inline-block";
          }
        }
      }
  },
	methods: {
		// 点击课件“操作”，显示相关操作按钮***********************************************
		optCoursewareClick: function (index) {
			var optCourseware = document.getElementById("optCourseware"+index);
			var upload1 = document.getElementById("upload1"+index);
			var check1 = document.getElementById("check1"+index);
			var submit1 = document.getElementById("submit1"+index);
      var submit2 = document.getElementById("submit2"+index);
      var signIn1 = document.getElementById("signIn1"+index);
			optCourseware.style.display = "none";
			check1.style.display = "inline-block";
			submit1.style.display = "inline-block";
			this.courseIdPost = this.teachJournalList[index].courseId;
			this.$http.post('./courseTeachPlan/operateTeachPlan',{
				"courseId": this.courseIdPost,
				"coursewareType": '1'
			},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            var data = response.body;
	            // 判断是否已提交，若未提交，则显示“上传”功能
	            if (data.uploadStatus == '0' && data.coursewareType == '1') {
	            	upload1.style.display = "inline-block";
                submit2.style.display = "inline-block";
	            }
	        },function(error){
	        });
		},
		// 点击教学计划“操作”，显示相关操作按钮********************************************
		optTeachPlanClick: function (index) {
			var optTeachPlan = document.getElementById("optTeachPlan"+index);
			var upload2 = document.getElementById("upload2"+index);
			var check2 = document.getElementById("check2"+index);
			var submit2 = document.getElementById("submit2"+index);
			var signIn2 = document.getElementById("signIn2"+index);
			optTeachPlan.style.display = "none";
			check2.style.display = "inline-block";
			this.courseIdPost = this.teachJournalList[index].courseId;
			this.$http.post('./courseTeachPlan/operateTeachPlan',{
				"courseId": this.courseIdPost,
				"coursewareType": '0'
			},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            var data = response.body;
	            // 判断是否已提交，若未提交，则显示“上传”功能
	            if (data.uploadStatus == '0' && data.coursewareType == '0') {
	            	upload2.style.display = "inline-block";
                submit2.style.display = "inline-block";
              }
	        },function(error){
	        });
		},

		// **************************************************************************************
		// 下载课件***************************************************************************
		checkClick1: function (index) {
			this.modal = true;
			this.modalBool = '1';
			this.courseIdPost = this.teachJournalList[index].courseId;
			this.$http.post('./courseTeachPlan/seeCourseware',{
				"courseId": this.courseIdPost
				// "coursewareType": '1'
			},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            var data = response.body;
	            if (data.result == 0) {
	            	this.uploadState = "待审核";
	            }else if (data.result == 1) {
	            	this.uploadState = "已通过";
	            }else if (data.result == 2) {
	            	this.uploadState = "未通过";
	            }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
	        });
		},
    ok1 () {
			location.href = "./courseTeachPlan/downloadCourseware?courseId="+this.courseIdPost;
		},
		// 查看教学计划，根据回调信息，返回上传状态和下载按钮*********************************
		checkClick2: function (index) {
			this.modal = true;
			this.modalBool = '2';
			this.courseIdPost = this.teachJournalList[index].courseId;
			var signIn = document.getElementById("signIn2");
			this.$http.post('./courseTeachPlan/seeTeachPlan',{
				"courseId": this.courseIdPost,
				"coursewareType": '0'
			},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            var data = response.body;
	            if (data.result == -1) {
	            	this.uploadState = "未上传";
                this.modalBool = '0';
	            }else if (data.result == 0) {
	            	this.uploadState = "教研组长审核不通过";
	            }else if (data.result == 1) {
	            	this.uploadState = "教研组长审核通过，待教务审核";
	            }else if (data.result == 2) {
                this.uploadState = "已提交，待教研组长审核";
              }else if (data.result == 3) {
                this.uploadState = "教务审核不通过";
              }else if (data.result == 4) {
                this.uploadState = "教务审核通过";
              }else if (data.result == 5) {
                this.uploadState = "已上传，待提交";
              }
	        },function(error){
	        });
		},
		// 点击下载，下载教学计划
		ok2 () {
			location.href = "./courseTeachPlan/downloadTeachPlan?courseId="+this.courseIdPost;
		},
		cancel () {
			this.modal = false;
		},

		// ****************************************************************************************
		// 提交课件
		submitClick1: function (index) {
			this.modalSubmit = true;
			this.submitBool = '1';
			this.index = index;
		},
		// 二次确认提交
		submitOk1: function () {
			var signIn1 = document.getElementById("signIn1"+this.index);
			this.modalSubmit = false;
			this.courseIdPost = this.teachJournalList[this.index].courseId;
			this.$http.post('./courseTeachPlan/returnTeachPlanSubmit',{
				"courseId": this.courseIdPost,
				"coursewareType": '1'
			},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            var data = response.body;
	            if (data.result == '1') {
	            	this.$Message.success("提交成功！");
					signIn1.style.display = "none";
	            }else {
	            	this.modalResult = true;
	            	this.remindResult = '2';
		        }
	        },function(error){
	        });
		},
		// 提交上传教学计划***********************************************************************
		submitClick2: function (index) {
			this.modalSubmit = true;
			this.submitBool = '2';
			this.index = index;
		},
		// 二次确认提交
		submitOk2: function () {
      this.modalSubmit = false;
			this.courseIdPost = this.teachJournalList[this.index].courseId;
			this.$http.post('./courseTeachPlan/returnTeachPlanSubmit',{
				"courseId": this.courseIdPost,
				"coursewareType": '0'
			},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            var data = response.body;
	            if (data.result == '1') {
	            	this.$Message.success("提交成功！2s后刷新");
	            	setTimeout("window.location.reload()",2000)
	            }else {
	            	this.modalResult = true;
	            	this.remindResult = '2';
		        }
	        },function(error){
	        });
		},
		submitCancel: function () {
			this.modalSubmit = false;
		},
		resultOk: function () {
			this.modalResult = false;
		},


		// *********************************************************************************************
		// 上传课件*********************************************************************************
		// 上传文件格式报错
		handleFormatError1:function(file){
          // this.$Notice.warning({
          //   title: '文件格式不正确',
          //   desc: '文件 ' + file.name + ' 格式不正确，请上传xls或xlsx表格。'
          // });
          this.modalResult = true;
          this.remindResult = '4';
          this.fileName = file.name;
        },
        // 上传文件大小不对
        handleSizeError1:function(file){
          this.modalResult = true;
          this.remindResult = '5';
          this.fileName = file.name;
        },
        // 正在上传中
        handleProgress1:function(){
          this.$Message.loading("正在上传中...");
        },
        // 上传成功反馈
        handleSuccess1:function(res){
          if(res.result=='1'){
            this.$Message.success("上传成功！");
          }else {
          	this.modalResult = true;
          	this.uploadResult = '0';
          	setTimeout(() => {
                this.modalResult = false;
            }, 3000);
          }
        },
        // 上传失败反馈
        handleError1:function(res){
          // if (res==='0') {
            console.log("获取申请error:");
	        console.log(error);
          // }
        },
        // 上传教学计划*****************************************************************************
        // 上传文件格式报错
		handleFormatError2:function(file){
          this.modalResult = true;
          this.remindResult = '3';
          this.fileName = file.name;
        },
        // 上传文件大小不对
        handleSizeError2:function(file){
          this.modalResult = true;
          this.remindResult = '5';
          this.fileName = file.name;
        },
        // 正在上传中
        handleProgress2:function(){
          this.$Message.loading("正在上传中...");
        },
        // 上传成功反馈
        handleSuccess2:function(res){
          if(res.result=='1'){
            this.$Message.success("提交成功！2s后刷新");
            setTimeout("window.location.reload()",2000)
          }else{
            this.modalResult = true;
          	this.uploadResult = '0';
          	setTimeout(() => {
                this.modalResult = false;
            }, 3000);
          }
        },
        // 上传失败反馈
        handleError2:function(res){
          uploadResult = '0';
          modalResult = true;
          console.log("获取申请error:");
	      console.log(error);
        }
	}
}
</script>

<style scoped>
.lpart span {
	margin-right: 1rem;
}
.lpart {
  margin: 0 5rem;
  float: left;
}
.textWeight {
  font-weight: bold;
  font-size: 1.1rem;
}

#myClassList {
	width: 100%;
	background-color: #f3f3f3;
	position: relative;
	display: inline-block;
	overflow: auto;
}
.myCourseList {
	text-align: center;
	background-color: white;
	margin: 1.5rem 5rem;
}
.textBtn span {
	margin: 0 0.3rem;
	display: inline-block;
}
</style>
