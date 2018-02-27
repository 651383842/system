<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="selectDiv">
    <div class="positionBar">
      <span>您的当前位置：</span>
      <span><a :href="studentPageUrl" class="returnHome">首页</a></span>
      <span> > 学生评教</span>
    </div>
    <div class="blank">
      <select class="selectStyle1" v-model="termSelect">
        <option value="" disabled>选择学期</option>
        <option v-for="term in terms" v-bind:value="term">{{term}}</option>
      </select>
      <button class="changeTermButton am-btn am-btn-success am-radius" @click="changTo">切换学期</button>
      <button class="updateButton am-btn am-btn-success am-radius" v-show="all">提交所有评教</button>
    </div>
    <div id="checkCourse_tableDiv">
      <div>评教开始时间：{{startEvaTeachTime}},评教截止时间：{{endEvaTeachTime}}</div>
      <table id="tableDiv" class="normalTable" border="1">
        <tr  id="weekdayTr">
          <th>课程代码</th>
          <th>课程名称</th>
          <th>教师姓名</th>
          <th>是否评教</th>
        </tr>
        <tr  v-for="(evalution,index) in evalutions" id="courseTr">
          <td>{{ evalution.courseId }}</td>
          <td>{{ evalution.courseName }}</td>
          <td>{{ evalution.teacherName }}</td>
          <td>
            <a class="aStyle" @click="checkClick(index)">{{ evalution.result }}</a>
          </td>
        </tr>
      </table>
    </div>
    <Modal
      v-model="modal2"
      width="635"
      :mask-closable="false"
      id="modalBody"
      :styles="{top:'10rem'}">
        <div style="display: flex;align-items: center;">1、课前准备充分，按时上、下课:
          <Row>
            <Col span="12">
            <Slider style="width: 20rem;margin-left: 5.5rem" v-model="val1" show-input show-tip="never" max=10></Slider>
          </Col>
          </Row>
        </div>
      <div style="display: flex;align-items: center;">2、上课情绪饱满，语速、音量适中，表达流畅:
        <Row>
          <Col span="12">
          <Slider style="width: 20rem;margin-left: 1rem" v-model="val2" show-input show-tip="never" max=10></Slider>
          </Col>
        </Row>
      </div>
      <div style="display: flex;align-items: center;">3、目标明确，重点难点突出，条理清晰:
        <Row>
          <Col span="12">
          <Slider style="width: 20rem;margin-left: 3.2rem" v-model="val3" show-input show-tip="never" max=20></Slider>
          </Col>
        </Row>
      </div>
      <div style="display: flex;align-items: center;">4、联系实际，内容深浅适度:
        <Row>
          <Col span="12">
          <Slider style="width: 20rem;margin-left: 6.9rem" v-model="val4" show-input show-tip="never" max=10></Slider>
          </Col>
        </Row>
      </div>
      <div style="display: flex;align-items: center;">5、讲课方法灵活，不照本宣科，师生互动好:
        <Row>
          <Col span="12">
          <Slider style="width: 20rem;margin-left:1.7rem" v-model="val5" show-input show-tip="never" max=20></Slider>
          </Col>
        </Row>
      </div>
      <div style="display: flex;align-items: center;">6、作业布置、批改、讲评及时认真:
        <Row>
          <Col span="12">
          <Slider style="width: 20rem;margin-left: 4.7rem" v-model="val6" show-input show-tip="never" max=10></Slider>
          </Col>
        </Row>
      </div>
      <div style="display: flex;align-items: center;">7、板书（投影）字迹清晰，展示重点知识点:
        <Row>
          <Col span="12">
          <Slider style="width: 20rem;margin-left: 1.7rem" v-model="val7" show-input show-tip="never" max=10></Slider>
          </Col>
        </Row>
      </div>
      <div style="display: flex;align-items: center;">8、教学效果好:
        <Row>
          <Col span="12">
          <Slider style="width: 20rem;margin-left: 11.4rem" v-model="val8" show-input show-tip="never" max=10></Slider>
          </Col>
        </Row>
      </div>
      <div class="content">
        <span class="textaraeTitle">文字评教(留言)：</span>
        <textarea class="text" v-model="text" id="txt"></textarea>
      </div>
      <div slot="footer" style="text-align:center;">
        <Button id="modalBtn" @click="ok2()">确定</Button>
        <Button id="modalBtn" @click="cancel2()">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        endEvaTeachTime:'2017-11-14',
        startEvaTeachTime:'2017-10-12',
        modal1:false,//模态对话框1隐藏
        modal2:false,//模态对话框2隐藏
        okValue:0,//值为0无法执行，为1可以执行
        nowIndex:0,//当前选中数组第几项
        txt:false,//文字输入框隐藏
        studentPageUrl:'#/login/main/studentHome',//学生首页url
        termSelect:'',//选择学期默认选项
        all:false,//提交所有申请的按钮作废，暂时隐藏
        val1:10,//评教1分值
        val2:10,//评教2分值
        val3:20,//评教3分值
        val4:10,//评教4分值
        val5:20,//评教5分值
        val6:10,//评教5分值
        val7:10,//评教5分值
        val8:10,//评教5分值
        text:"",
        terms:[],
        evalutions: [
          //评教表格数组
//          {courseId: 'k2201710', courseName: '企业课I',  teacherName: '兰刚',teacherId:'1',classId:'1',evaTeach:false,result: '未评教',studentId:'1'},
//          {courseId: 'k2210710', courseName: '硬件设计', teacherName: '兰刚',teacherId:'2',classId:'1',evaTeach:false,result: '未评教',studentId:'1'},
//          {courseId: 'k2017010', courseName: '合作课程', teacherName: '兰刚',teacherId:'3',classId:'1',evaTeach:false,result: '未评教',studentId:'1'},
        ]
      }
    },
    beforeMount:function() {//初始化学期选项
      this.$http.post('./getYearTermList').then(function (response) {
        var data = response.body.yearTerm;
        var a=[];
        for(var i=0;i<data.length;i++){
          a.push(data[i].startYearSemester);
        }
        this.terms=a;
        this.termSelect=response.body.currentYearTerm;
        this.changTo();
      });
    },
    methods: {
      ok2 () {//模态对话框确认按钮
            var code = parseInt(this.val1) + parseInt(this.val2) + parseInt(this.val3) + parseInt(this.val4)
              + parseInt(this.val5)+ parseInt(this.val6)+ parseInt(this.val7)+ parseInt(this.val8);
            var str = this.val1+' '+this.val2+' '+this.val3+' '+this.val4+' '+this.val5+' '+this.val6+' '+this.val7+' '+this.val8+'@';
            //分数高于80分，直接拼接字符串信息，发送给后端
          this.$http.post('./commitStuEvaList', {
            courseId: this.evalutions[this.nowIndex].courseId,
            teacherId:this.evalutions[this.nowIndex].teacherId,
            studentId:this.evalutions[this.nowIndex].studentId,
            record:code,
            textEva:str+this.text
          }, {
            "Content-Type": "application/json"
          }).then(function (response) {
            this.okValue=0;
            if (response.body.result == "1") {
              this.$Message.success('评教提交成功！');
              this.clearFun();//评教结束，调用还原界面的函数
              this.modal2=false;
              this.evalutions[this.nowIndex].result = "已评教";
            } else {
              this.$Message.error('评教提交失败！');
            }
          }, function (error) {
            this.okValue=0;
            this.$Message.error("连接失败,请确认重试！");
            console.log(error);
          });
      },
      cancel2(){//模态对话框取消按钮
        this.modal2=false;
        this.clearFun();
      },
      checkClick: function (index) {//评教点击事件
        var today = new Date().getTime();
        var start = this.startEvaTeachTime.split('-');
        var end = this.endEvaTeachTime.split('-');
        var startDate = new Date().setFullYear(start[0],start[1]-1,start[2]);
        var endtDate = new Date().setFullYear(end[0],end[1]-1,end[2]);
        if(this.evalutions[index].result=="未评教") {
          if(today>=startDate&&today<=endtDate)
          {
            this.nowIndex = index;
            this.val1 = 10;
            this.val2 = 10;
            this.val3 = 20;
            this.val4 = 10;
            this.val5 = 20;
            this.val6 = 10;
            this.val7 = 10;
            this.val8 = 10;
            this.text="";
            this.modal2 = true;
          }else
          {
              this.$Message.error("未在评教时间内，还不能评教！");
          }
        }else if(this.evalutions[index].result=="已评教"){
          this.$Message.error("不能重复评教！");//nothing
        }
      },
      first:function(){//获取选中radio1
        var radio = document.getElementsByName("tr1");
        for (var i=0; i<radio.length; i++) {
          if (radio[i].checked) {
            this.val1=radio[i].value;
          }
        }
      },
      second:function(){//获取选中radio2
        var radio = document.getElementsByName("tr2");
        for (var i=0; i<radio.length; i++) {
          if (radio[i].checked) {
            this.val2=radio[i].value;
          }
        }
      },
      third:function(){//获取选中radio3
        var radio = document.getElementsByName("tr3");
        for (var i=0; i<radio.length; i++) {
          if (radio[i].checked) {
            this.val3=radio[i].value;
          }
        }
      },
      fourth:function(){//获取选中radio4
        var radio = document.getElementsByName("tr4");
        for (var i=0; i<radio.length; i++) {
          if (radio[i].checked) {
            this.val4=radio[i].value;
          }
        }
      },
      fifth:function(){//获取选中radio5
        var radio = document.getElementsByName("tr5");
        for (var i=0; i<radio.length; i++) {
          if (radio[i].checked) {
            this.val5=radio[i].value;
          }
        }
      },
      sixth:function(){//获取选中radio5
        var radio = document.getElementsByName("tr6");
        for (var i=0; i<radio.length; i++) {
          if (radio[i].checked) {
            this.val6=radio[i].value;
          }
        }
      },
      seventh:function(){//获取选中radio5
        var radio = document.getElementsByName("tr7");
        for (var i=0; i<radio.length; i++) {
          if (radio[i].checked) {
            this.val7=radio[i].value;
          }
        }
      },
      eighth:function(){//获取选中radio5
        var radio = document.getElementsByName("tr8");
        for (var i=0; i<radio.length; i++) {
          if (radio[i].checked) {
            this.val8=radio[i].value;
          }
        }
      },
      clearFun:function(){//清空函数
        var radio1 = document.getElementsByName("tr1");
        var radio2 = document.getElementsByName("tr2");
        var radio3 = document.getElementsByName("tr3");
        var radio4 = document.getElementsByName("tr4");
        var radio5 = document.getElementsByName("tr5");
        var radio6 = document.getElementsByName("tr6");
        var radio7 = document.getElementsByName("tr7");
        var radio8 = document.getElementsByName("tr8");
        for (var i=0; i<radio1.length; i++) {
          if (radio1[i].checked) {
            radio1[i].checked = false;
          }
        }

        for (var i=0; i<radio2.length; i++) {
          if (radio2[i].checked) {
            radio2[i].checked = false;
          }
        }

        for (var i=0; i<radio3.length; i++) {
          if (radio3[i].checked) {
            radio3[i].checked = false;
          }
        }

        for (var i=0; i<radio4.length; i++) {
          if (radio4[i].checked) {
            radio4[i].checked = false;
          }
        }

        for (var i=0; i<radio5.length; i++) {
          if (radio5[i].checked) {
            radio5[i].checked = false;
          }
        }
        for (var i=0; i<radio6.length; i++) {
          if (radio6[i].checked) {
            radio6[i].checked = false;
          }
        }
        for (var i=0; i<radio7.length; i++) {
          if (radio7[i].checked) {
            radio7[i].checked = false;
          }
        }
        for (var i=0; i<radio8.length; i++) {
          if (radio8[i].checked) {
            radio8[i].checked = false;
          }
        }

        var t = document.getElementById("txt");
        t.value="";//清空

        this.txt=false;
      },
      changTo:function(){//获取对应学期评教数据
        if(this.termSelect == "")
        {
            this.$Message.error("请选择学期");
            return;
        }
        this.$http.post('./getStuEvaCourseList', {
          "yearTerm": this.termSelect,
        }, {
          "Content-Type": "application/json"
        }).then(function (response) {
          var a=response.body.result;
          this.startEvaTeachTime = response.body.startEvaTeachTime;
          this.endEvaTeachTime = response.body.endEvaTeachTime;
          for(var i=0;i< a.length;i++){
            if(a[i].evaTeach) {
              a[i]["result"] = "已评教";
            }else{
              a[i]["result"] = "未评教";
            }
          }
          this.evalutions=a;
          if(this.evalutions.length == 0)
          {
              this.$Message.warning("没有可评教的课程！");
          }
        });
      },
    }
  }
</script>

<style scoped>
  html {
    font-size: 100%;
  }
  .selectStyle1{
    margin-left:5rem;
  }
  #selectDiv{
    height:2.2rem;
  }
  .changeTermButton{
    margin-left:1rem;
    width:5.6rem;
    outline: none;
  }
  .updateButton{
    float:right;
    margin-top:0.5rem;
    margin-right:5rem;
    width:8rem;
    outline: none;
  }
  #checkCourse_tableDiv{
    height:30rem;
    padding:1rem 5rem 2rem 5rem;
    background-color: #f3f3f3;
  }
  #tableDiv{
    position: relative;
    width: 100%;
    border: 0 solid #d4d4d9;
    border-collapse: collapse;
    table-layout: fixed;
    text-align: center;
  }
  .aStyle{
    color:#3985FF;
    cursor: pointer;
  }
  .spanStyle{
    float:left;
  }




  .content{
    width:80%;
    margin:0 auto;
  }
  .textaraeTitle{
    font-size:1rem;
    /*display: block;*/
  }
  .text{
    width:100%;
    background-color: #E5E5E5;
    height:5rem;
    font-size:1.2rem;
  }

</style>
