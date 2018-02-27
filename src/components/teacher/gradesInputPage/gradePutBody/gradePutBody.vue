<template>
<div>
	<!-- 导航栏路径跳转返回首页、上一页 -->
	<div class="positionBar">
		<span>您的当前位置：</span>
		<span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
		<span> > <a href="#/teacher/class/tchGradesInput" class="returnHome">成绩录入</a></span>
		<span> > 正考成绩录入</span>
	</div>
	<div class="spanButton">
		<div class="lpart">		<!-- 页面跳转，返回url参数传递 -->
			<span class="blankSpan">输入成绩课程：{{inputLesson}}</span>
			<span class="blankSpan">上课班级：{{classes}}</span>
		</div>
		<div class="rpart">
			<span>
				<Upload
					ref="upload"
          :data="{'courseAssociationId': courseAssociationId,
                 'usualRate': usualRate,
			            'halfRate': halfRate,
			            'finalRate': finalRate,
			            'practiceRate': practiceRate}"
					:show-upload-list="false"
					:format="['xls', 'xlsx']"
					:max-size="5120"
					:on-format-error = "handleFormatError"
		            :on-exceeded-size="handleSizeError"
		            :on-success="handleSuccess"
		            :on-error="handleError"
					action="./importScoreList">
            <button style="height: 2.4rem" class="am-btn am-btn-success am-radius rightBtn" id="uploadBtn">导入</button>
				</Upload>
			</span>
			<span>
				<button class="am-btn am-btn-success am-radius rightBtn" @click="downloadTemplate()">下载模板</button>
				<button class="am-btn am-btn-success am-radius rightBtn" id="submitBtn" @click="submitBtn()">提交</button>
				<button class="am-btn am-btn-success am-radius rightBtn" id="saveAllBtn" @click="saveAllBtn()">保存</button>
				<button class="am-btn am-btn-success am-radius rightBtn" id="compileBtn" @click="compileBtn()">编辑</button>
			</span>
		</div>
	</div>

	<div id="gradePutBody">
		<div class="gradePutDiv">
			<!-- <span>请输入此课程提示的【{{ number }}】个学生成绩</span> -->
			<div class="gpMain">
				<div class="submitGrade" id="submitGrade" v-show="inputGradeRate">
					<span>比率设置：</span>
					<span>
						平时比率：<input @blur="saveAllBtns()" v-model="usualRate" readonly="true" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">%
					</span>
					<span>
						期中比率：<input @blur="saveAllBtns()" v-model="halfRate" readonly="true" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">%
					</span>
					<span>
						期末比率：<input @blur="saveAllBtns()" v-model="finalRate" readonly="true" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">%
					</span>
					<span>
						实验比率：<input @blur="saveAllBtns()" v-model="practiceRate" readonly="true" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">%
					</span>
				</div>
				<!-- <div class="select-button">
					<button class="am-btn am-btn-success am-radius rightBtn" @click="submitBtn()">提交</button>
					<button class="am-btn am-btn-success am-radius rightBtn" v-show="buttonShow" @click="saveAllBtn()">保存</button>
					<button class="am-btn am-btn-success am-radius rightBtn" v-show="buttonShow" @click="compileBtn()">编辑</button>
				</div> -->
				<!-- 正考成绩输入 -->
				<div class="scoreTable" v-if="scoreShow">
					<table class="normalTable" id="inputGroup">
						<thead>
							<tr>
								<th>学号</th>
								<th>姓名</th>
								<th width="10%">平时成绩</th>
								<th width="10%">期中成绩</th>
								<th width="10%">期末成绩</th>
								<th width="10%">实验成绩</th>
								<th width="10%">总成绩</th>
                <th width="10%">结业成绩</th>
								<!-- <th>成绩备注</th> -->
							</tr>
						</thead>
						<tbody>
							<tr v-for="(areTestScore, index) in scoreList" :key="areTestScore">
								<td v-text="areTestScore.studentId"></td>
								<td v-text="areTestScore.studentName"></td>
								<td>
									<input @blur="saveAllBtns()" id="input1" type="number" :value="areTestScore.ususallyGrade" readonly="true">
								</td>
								<td>
									<input @blur="saveAllBtns()" id="input2" type="number" :value="areTestScore.halfGrade" readonly="true">
								</td>
								<td>
									<input @blur="saveAllBtns()" id="input3" type="number" :value="areTestScore.finalExamGrade" readonly="true">
								</td>
								<td>
									<input  @blur="saveAllBtns()" id="input4" type="number" :value="areTestScore.practiceGrade" readonly="true">
								</td>
								<td v-html="areTestScore.finalGrade"></td>
                <td v-html="areTestScore.endGrade"></td>
								<!-- <td v-text="areTestScore.comment"></td> -->
							</tr>
						</tbody>
					</table>
				</div>

				<!-- 弹窗操作 -->
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

				<!-- 弹窗提示 -->
				<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
					<div style="text-align:center; font-size:1.1rem;">
				    	<p v-if= "uploadResult === '0'">上传失败！</p>
					    <p v-if="remindResult === '1'">操作失败！请重试</p>
					    <p v-else-if= "remindResult === '2'">文件格式不正确</p>
					    <p v-else-if= "remindResult === '2'">文件 {{fileName}} 格式不正确，请上传zip或rar压缩包。</p>
					    <p v-else-if= "remindResult === '3'">超出文件大小限制</p>
					    <p v-else-if= "remindResult === '3'">文件 {{fileName}} 太大，不能超过 2M。</p>
					    <p v-else-if= "remindResult === '4'">保存失败！</p>
					    <p v-else-if= "remindResult === '5'">提交失败！</p>
					    <p v-else-if= "remindResult === '6'">请正确输入成绩比率并使其值和为100！</p>
		    			<p v-else-if= "remindResult === '7'">请输入所有成绩和成绩比率！</p>
		    			<p v-else-if= "remindResult === '8'">请正确输入成绩分值（0-100）！</p>
					</div>
				    <div slot="footer" style="text-align:center;">
				        <Button id="modalBtn" @click="resultOk()">确认</Button>
				    </div>
				</Modal>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'gradePutBody',
	data () {
		return {
			buttonShow: false,
			submitShow: false,
			courseAssociationId: '',
			inputLesson: '',
			classes: '',
			scoreShow: true,	// 显示正考成绩
			makeupScoreShow: false,		// 隐藏补考成绩
			inputGradeRate: true,		//显示输入成绩比率
			// number: '82',	// 已有成绩学生人数
			usualRate: '0',		//平时比率
			halfRate: '0',		//期中比率
			finalRate: '0',		//期末比率
			practiceRate: '0',	//实验比率
			scoreList: [
				 //{studentId: '15303010503', studentName: '谢兴月', ususallyGrade: '98', halfGrade: '75', finalExamGrade: '86', practiceGrade: '96',finalGrade:''},
				 //{studentId: '15303010503', studentName: '谢兴月', ususallyGrade: '98', halfGrade: '75', finalExamGrade: '86', practiceGrade: '96',finalGrade:''}
			],
			modalOperation: false,
			modalResult: false,
			opertaionBool: '',
			remindResult: '',
			uploadResult: ''
		}
	},
	beforeMount: function() {
		var modifyFlag = null;
		//分割成字符串
		var thisURL = document.URL;
        var getval =thisURL.split('gradesInput?')[1];
        this.courseAssociationId = getval.split("=")[1];
        this.$http.post('./getTeachScore',{
        	"courseAssociationId": this.courseAssociationId
        },{
            "Content-Type":"application/json"
        }).then(function(response){
            var data = response.body;
            this.inputLesson = data.canModifyCourInfo.courseName;
            this.classes = data.canModifyCourInfo.className;
            this.scoreList = data.scoreList;
            for(var i=0;i<this.scoreList.length;i++)
            {
                if(this.scoreList.endGrade==-1)
                {
                  this.scoreList.endGrade = '-';
                }
            }
            this.usualRate=data.scoreRate.usuallyRate; 		//平时比率
            this.halfRate=data.scoreRate.halfRate;			//期中比率
            this.finalRate=data.scoreRate.finalExamRate;			//期末比率
            this.practiceRate=data.scoreRate.practiceRate;		//实验比率
	        modifyFlag = data.canModifyCourInfo.canModifyGrade;
	        if (modifyFlag == false) {
	        	var ssubmitBtn = document.getElementById("submitBtn")
	        	ssubmitBtn.disabled = true;
	        	ssubmitBtn.className = 'hideBtn';
	        	var ssaveAllBtn = document.getElementById("saveAllBtn")
	        	ssaveAllBtn.disabled = true;
	        	ssaveAllBtn.className = 'hideBtn';
	        	var scompileBtn = document.getElementById("compileBtn")
	        	scompileBtn.disabled = true;
	        	scompileBtn.className = 'hideBtn';
	        	var suploadBtn = document.getElementById("uploadBtn")
	        	suploadBtn.disabled = true;
	        	suploadBtn.className = 'hideBtn';
	        }
        },function(error){});
    },
	methods: {
		// 编辑修改补考成绩*****************************************************************
    	compileBtn: function () {
    		var submitGrade = document.getElementById("submitGrade");
    		var inputRate = submitGrade.getElementsByTagName("input");
    		var inputGroup = document.getElementById("inputGroup");
    		var input = inputGroup.getElementsByTagName("input");
    		// alert(input.length)
    		for (var j = 0; j < inputRate.length; j++) {
    		    if(inputRate[j].readOnly == false)
            {
              inputRate[j].readOnly = true;
              inputRate[j].style.border = "none";
            }else {
              inputRate[j].readOnly = false;
              inputRate[j].style.border = "0.1rem solid #d4d4d9";
            }
    		}
    		for (var i = 0; i < input.length; i++) {
          if(input[i].readOnly == false)
          {
            input[i].readOnly = true;
            input[i].style.border = "none";
          }else {
            input[i].readOnly = false;
            input[i].style.border = "0.1rem solid #d4d4d9";
          }
    		}
    	},
		// 保存所有数据并提交******************************************************
		saveAllBtn: function () {
    		var submitGrade = document.getElementById("submitGrade");
    		var inputRate = submitGrade.getElementsByTagName("input");
    		var inputGroup = document.getElementById("inputGroup");
    		var input = inputGroup.getElementsByTagName("input");
    		var emptyNum = '0';
    		var wrongNum = '0';
			var usualRate = Number(this.usualRate);
			var halfRate = Number(this.halfRate);
			var finalRate = Number(this.finalRate);
			var practiceRate = Number(this.practiceRate);
			var allRate = usualRate+halfRate+finalRate+practiceRate;
			for (var i = 0; i < this.scoreList.length; i++) {
				this.scoreList[i].ususallyGrade = input[0+i*4].value;
    			this.scoreList[i].halfGrade = input[1+i*4].value;
    			this.scoreList[i].finalExamGrade = input[2+i*4].value;
    			this.scoreList[i].practiceGrade = input[3+i*4].value;
          this.scoreList[i].finalGrade = Math.round(this.scoreList[i].ususallyGrade*usualRate*0.01+
            this.scoreList[i].halfGrade*halfRate*0.01+this.scoreList[i].finalExamGrade*finalRate*0.01+
            this.scoreList[i].practiceGrade*practiceRate*0.01);
    			// 判断是否有空值
    		}
    		for(var j=0;j<input.length;j++)
        {
          if (input[j].value  =="") {
            emptyNum++;
          }else if (input[j].value  >100 || input[j].value  <0) {
            wrongNum++;
          }
        }
			// 判断所有比率之和为100，输入非空判断
			if (allRate=='100' && emptyNum=='0' && wrongNum=='0' && this.usualRate!='' && this.halfRate!='' && this.finalRate!='' && this.practiceRate!='') {
				this.modalOperation = true;
	    		this.opertaionBool = '1';
	    	}else if (allRate != '100') {
	    		this.modalResult = true;
          this.remindResult = '6';
	    	}else if (wrongNum != '0') {
    			this.modalResult = true;
                this.remindResult = '8';
	    	}else {
	    		this.modalResult = true;
          this.remindResult = '7';
	    	}
		},
    saveAllBtns: function () {
      var submitGrade = document.getElementById("submitGrade");
      var inputGroup = document.getElementById("inputGroup");
      var input = inputGroup.getElementsByTagName("input");
      var usualRate = Number(this.usualRate);
      var halfRate = Number(this.halfRate);
      var finalRate = Number(this.finalRate);
      var practiceRate = Number(this.practiceRate);
      for (var i = 0; i < this.scoreList.length; i++) {
        this.scoreList[i].ususallyGrade = input[0+i*4].value;
        this.scoreList[i].halfGrade = input[1+i*4].value;
        this.scoreList[i].finalExamGrade = input[2+i*4].value;
        this.scoreList[i].practiceGrade = input[3+i*4].value;
        this.scoreList[i].finalGrade = Math.round(this.scoreList[i].ususallyGrade*usualRate*0.01+
          this.scoreList[i].halfGrade*halfRate*0.01+this.scoreList[i].finalExamGrade*finalRate*0.01+
          this.scoreList[i].practiceGrade*practiceRate*0.01);
      }
    },
		saveOk: function () {
    		this.modalOperation = false;
			var submitGrade = document.getElementById("submitGrade");
    		var inputRate = submitGrade.getElementsByTagName("input");
			var inputGroup = document.getElementById("inputGroup");
    		var input = inputGroup.getElementsByTagName("input");
    		// var saveResult = '';
    		for (var j = 0; j < inputRate.length; j++) {
    			inputRate[j].readOnly = true;
    			inputRate[j].style.border = "none";
    		}
    		for (var i = 0; i < input.length; i++) {
    			input[i].readOnly = true;
    			input[i].style.border = "none";
    		}
    		this.$http.post('./saveScore',{
    			"operateType": "1",
    			"courseAssociationId": this.courseAssociationId,
    			"courseName": this.inputLesson,
            	"className": this.classes,
            	"usualRate": this.usualRate,
            	"halfRate": this.halfRate,
            	"finalRate": this.finalRate,
            	"practiceRate": this.practiceRate,
				"scoreList": this.scoreList
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
	            console.log("获取申请error:");
	            console.log(error);
	        });
		},
		// 提交正考成绩，提交后不可再修改************************************************************
		submitBtn: function () {
			var submitGrade = document.getElementById("submitGrade");
    		var inputRate = submitGrade.getElementsByTagName("input");
    		var inputGroup = document.getElementById("inputGroup");
    		var input = inputGroup.getElementsByTagName("input");
    		var emptyNum = '0';
    		var wrongNum = '0';
			var usualRate = Number(this.usualRate);
			var halfRate = Number(this.halfRate);
			var finalRate = Number(this.finalRate);
			var practiceRate = Number(this.practiceRate);
			var allRate = usualRate+halfRate+finalRate+practiceRate;
			for (var i = 0; i < this.scoreList.length; i++) {
				this.scoreList[i].ususallyGrade = input[0+i*4].value;
    			this.scoreList[i].halfGrade = input[1+i*4].value;
    			this.scoreList[i].finalExamGrade = input[2+i*4].value;
    			this.scoreList[i].practiceGrade = input[3+i*4].value;
        this.scoreList[i].finalGrade = Math.round(this.scoreList[i].ususallyGrade*usualRate*0.01+
          this.scoreList[i].halfGrade*halfRate*0.01+this.scoreList[i].finalExamGrade*finalRate*0.01+
          this.scoreList[i].practiceGrade*practiceRate*0.01);
    		}
      for(var j=0;j<input.length;j++)
      {
        if (input[j].value =="") {
          emptyNum++;
        }else if (input[j].value  >100 || input[j].value  <0) {
          wrongNum++;
        }
      }
			// 判断所有比率之和为100，输入非空判断
			if (allRate=='100' && emptyNum=='0' && wrongNum=='0' && this.usualRate!='' && this.halfRate!='' && this.finalRate!='' && this.practiceRate!='') {
	    		this.modalOperation = true;
	    		this.opertaionBool = '2';
	    	}else if (allRate != '100') {
	    		this.modalResult = true;
                this.remindResult = '6';
	    	}else if (wrongNum != '0') {
    			this.modalResult = true;
                this.remindResult = '8';
	    	}else {
	    		this.modalResult = true;
                this.remindResult = '7';
	    	}
		},
		// 二次确认提交******************************************
		submitOk: function () {
    		this.modalOperation = false;
			this.$http.post('./saveScore',{
				"operateType": "2",
    			"courseAssociationId": this.courseAssociationId,
    			"courseName": this.inputLesson,
            	"className": this.classes,
            	"usualRate": this.usualRate,
            	"halfRate": this.halfRate,
            	"finalRate": this.finalRate,
            	"practiceRate": this.practiceRate,
				"scoreList": this.scoreList
			},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            var data = response.body;
	            if(data.result == "1") {
                    this.$Message.success('提交成功！成绩将不可再修改。');
                    window.location.reload();
                    this.buttonShow = false;
                }else {
                    // this.$Message.error('操作失败！请重试');
                    this.modalResult = true;
                    this.remindResult = '5';
                }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
	        });
		},
    	cancel: function () {
    		this.modalOperation = false;
    	},
    	resultOk: function () {
    		this.modalResult = false;
    	},

    	// 下载模板
    	downloadTemplate: function () {
			location.href = "./exportScoreModule?courseAssociationId="+this.courseAssociationId;
    	},

    	// *************************************************************************************
    	// 导入成绩表***************************************************************************
    	handleFormatError:function(file){
          this.modalResult = true;
          this.remindResult = '2';
          this.fileName = file.name;
        },
        handleSizeError:function(file){
          this.modalResult = true;
          this.remindResult = '3';
          this.fileName = file.name;
        },
        handleSuccess:function(res){
            this.scoreList = res.scoreList;
           if(res.result=='1'){
             this.$Message.success("上传成功,2s后刷新！");
             setTimeout("window.location.reload()",2000)
           }else {
           	this.modalResult = true;
           	this.uploadResult = '0';
           }
        },
        handleError:function(res){
          this.modalResult = true;
          this.uploadResult = '0';
        }
	}
}
</script>

<style scoped>
.lpart span {
	margin-right: 1rem;
}
.lpart {
  margin-left: 5rem;
  float: left;
}
.rpart {
  margin: 0 5rem;
  float: right;
}

.spanButton {
	width: 100%;
	height: 3.5rem;
    line-height: 3.5rem;
	position: relative;
	display: inline-block;
	overflow: hidden;
}
.rpart {
	margin: 0.4rem 5rem;
}
.rpart span {
	float: right;
}
.spanButton button {
	width: 5.6rem;
    margin: 0 0.7rem;
    outline: none;
}
.blankSpan {
	height: 3.5rem;
}

#gradePutBody {
	background-color: #f3f3f3;
}
.gradePutDiv {
	padding: 1rem 2rem;
}
.gradePutDiv span {
	margin: 0 3rem;
}
.gpMain {
	background-color: white;
	margin: 0.5rem 3rem;
	padding-bottom: 1.3rem;
}
/*成绩比率设置*/
.submitGrade {
	/*padding: 0.9rem 0;*/
	text-align: center;
	padding-top: 1rem;
	width: 100%;
	font-size: 0.9rem;
}
.submitGrade span {
	margin-left: 2rem;
	margin-right: 2rem;
}
.submitGrade input {
	width: 2.5rem;
	border: none;
}
/*筛选，按钮*/
.select-button {
	margin: 1rem 2rem;
	margin-top: 0;
    padding-top: 1rem;
}
.select-button button {
	margin: 0 0.7rem;
	width: 5.6rem;
}
.rightBtn {
	float: right;
}
/*学生成绩比率表格*/
.scoreTable {
	margin: 0.5rem 2rem;
}
.scoreTable input {
	outline:none;
    border: none;
    margin: 0;
    text-align: center;
}
.scoreTable img {
	cursor: pointer;
	margin: 0 0.3rem;
	vertical-align: bottom;
}

/*保存功能图标*/
.saveImg{
  display: none;
}
/*重置功能图标*/
.restoreImg{
  display: none;
}

/*灰掉按钮*/
.hideBtn {
	float: right;
	margin-bottom: 0;
	margin-top: 0;
	padding: 0.6rem 1.1rem;
	font-size: 0.9rem;
	font-weight: normal;
	line-height: 1.2;
	text-align: center;
	white-space: nowrap;
	background-image: none;
	border: 0;
	color: rgba(0,0,0,.3);
	background-color: rgba(0,0,0,.18);
	border-color: rgba(0,0,0,.18);
	border-radius: 0.3rem;
	outline: none;
	font-family: "Microsoft YaHei";
}
</style>
