<template>
<div>
	<!-- 导航栏路径跳转返回首页 -->
	<div class="positionBar">
		<span>您的当前位置：</span>
		<span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
		<span> > 成绩录入</span>
	</div>
	<div class="blank">
		<div class="leftPart">
			<span>当前学年学期：</span>
			<span class="textBlue">{{preSemester}}</span>
      <span>成绩录入时间：</span>
      <span class="textBlue">{{startEvaTeachTime}}到{{endEvaTeachTime}}</span>
		</div>
		<div class="rightPart">
			<span>温馨提示：</span>
			<span class="textBlue">按排课信息输入成绩（若单科成绩输入时间长，请15分钟保持一次）</span>
		</div>
	</div>

	<div id="tchGrdPutBody">
		<div class="tchGrdPutDiv">
			<!-- <span>何老师，你在【2016-2017学年第一学期】共上【4】门课</span> -->
			<div class="tchGpMain">
				<div class="tchGrdTable">
					<table class="operationTable">
						<thead>
							<tr>
								<th width="10%">输入</th>
								<th width="7%">序号</th>
								<!-- <th width="12%">学年学期</th> -->
								<th width="11%">教师</th>
								<th width="34%">班级名称</th>
								<th width="18%">课程名称</th>
								<th width="9%">导出成绩</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(data, index) in scoreInputList" >
								<td class="textBtn" @click="gradeinputClick(data.courseAssociationId)"><a>成绩输入</a></td>
								<td v-text="index + 1"></td>
								<!-- <td>{{preSemester}}</td> -->
								<td v-text="data.teacherName"></td>
								<td v-text="data.className"></td>
								<td v-text="data.courseName"></td>
								<td class="textBtn"><a @click="exportFormatBtn(index)">下载</a></td>
								<!-- <td class="textBtn"><form action="./downloadScoreList" method="get"><button :value="data.courseAssociationId" name="courseAssociationId" type="submit" style="display:visibility;"><a>下载</a></button></form></td> -->
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

	<!-- 弹窗提示 -->
	<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
		<div style="text-align:center; font-size:1.1rem;">
		    <p v-if="remindResult === '1'">操作失败！请重试</p>
			<p v-else-if= "remindResult === '2'">未找到可下载的内容！</p>
		</div>
	    <div slot="footer" style="text-align:center;">
	        <Button id="modalBtn" @click="resultOk()">确认</Button>
	    </div>
	</Modal>
</div>
</template>

<script>
export default {
	name: 'tchGrdPutBody',
	data () {
		return {
      endEvaTeachTime:'-',
      startEvaTeachTime:'-',
			preSemester: '-',
			// warmPrompt: '按排课信息输入成绩（若单科成绩输入时间长，请15分钟保持一次）',
			scoreInputList: [
//				 {courseAssociationId: '91698815649', semester: '2016-2017学年第一学期', teacherName: '何平', className: '对口高职2015护理（9+3）1班', courseName: '护理管理学'}
			],
			modalResult: false,
			remindResult: ''
		}
	},
	// 初始化获取当前学期、教师上课信息
	beforeMount: function() {
        this.$http.post('./getTeachScoreList',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            var data = response.body;
            this.startEvaTeachTime = response.body.startScoreInputTime;
            this.endEvaTeachTime = response.body.endScoreInputTime;
			      this.scoreInputList = data.scoreInputList;
        },function(error){
        });

          this.$http.post('./getCurrentYearAndSemester',{},{//获取当前学期周数
            "Content-Type":"application/json"
          }).then(function(response){
            var data = response.body;
            if(data.yearAndSemester.split('.')[1] =='1')
            {
              this.preSemester = data.yearAndSemester.split('.')[0]+'学年（上）';
            }else
            {
              this.preSemester = data.yearAndSemester.split('.')[0]+'学年（下）';
            }
          },function(error){});
    },
	methods: {
		// 导出功能
		exportFormatBtn: function (index) {
			location.href = "./downloadScoreList?courseAssociationId="+this.scoreInputList[index].courseAssociationId;
		},
    resultOk: function () {
      this.modalResult = false;
      this.remindResult = '1';
    },
    gradeinputClick:function (courseAssociationId) {
		  if(this.startEvaTeachTime ==""||this.startEvaTeachTime==null||this.endEvaTeachTime==""||this.endEvaTeachTime==null)
      {
        this.$Message.error("成绩录入时间未定！");
        return;
      }
      var today = new Date().getTime();
      var start = this.startEvaTeachTime.split('-');
      var end = this.endEvaTeachTime.split('-');
      var startDate = new Date().setFullYear(start[0],start[1]-1,start[2]);
      var endtDate = new Date().setFullYear(end[0],end[1]-1,end[2]);
      if(today>=startDate&&today<=endtDate)
      {
        window.location.href='#/teacher/class/gradesInput?courseAssociationId='+courseAssociationId;
      }else
      {
        this.$Message.error("未到成绩录入时间！");
      }
    }
	}
}
</script>

<style scoped>
.leftPart {
	margin: 0 5rem;
	float: left;
}

.rightPart {
	margin: 0 5rem;
	float: right;
}

#tchGrdPutBody {
	background-color: #f3f3f3;
}
.tchGrdPutDiv {
	padding: 0.6rem 0;
	text-align: center;
	font-size: 1rem;
}
.tchGpMain {
	text-align: center;
	background-color: white;
	margin: 0.5rem 5rem;
	padding-bottom: 1.3rem;
	border: 1px solid #ececec;	/*新加*/
}
.tchGrdTable {
	margin: 0.5rem 0.5rem;
	/*height: 20rem;*/
	border: 0.7rem solid transparent;
}
.tchGrdTable table {
	border-collapse: collapse;
	/*height: 3.2rem;*/
}

/*.textBtn a {
	text-decoration: underline;
	color: #3399ff;
	cursor: pointer;
}
.textBtn a:hover,
.textBtn a:focus {
	color: #5cadff;
}
.textBtn a:active {
	color: #3091f2;
}*/
</style>
