<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="selectDiv">
    <div class="positionBar">
      <span>你的当前位置：</span>
      <span><a :href="studentPageUrl" class="returnHome">首页</a></span>
      <span> > 学生评教</span>
    </div>
    <div class="blank">
      <select class="selectStyle1">
        <option value="选择学期" disabled selected>选择学期</option>
        <option v-for="term in terms" v-bind:value="term">{{term}}</option>
      </select>

      <button class="changeTermButton am-btn am-btn-success am-radius">切换学期</button>
      <button class="updateButton am-btn am-btn-success am-radius">提交所有评教</button>
    </div>
    <div id="checkCourse_tableDiv">
      <table id="tableDiv" class="normalTable" border="1">
        <tr  id="weekdayTr">
          <th>课程代码</th>
          <th>课程名称</th>
          <th>开课院系</th>
          <th>教师姓名</th>
          <th>是否评教</th>
        </tr>
        <tr  v-for="(evalution,index) in evalutions" id="courseTr">
          <td>{{ evalution.courseNum }} </td>
          <td>{{ evalution.courseName }}</td>
          <td>{{ evalution.academy }}</td>
          <td>{{ evalution.teacherName }}</td>
          <td>
            <a class="aStyle" @click="checkClick(index)">{{ evalution.result }}</a>
          </td>
        </tr>
      </table>
    </div>
    <Modal v-model="modal2" id="modalBody" :styles="{top:'10rem'}" width:700>
      <table>
        <tr>
        </tr>
        <!--表头-->
        <tr v-for="(application,index) in applications" :id="application.id">
          <td class="spanStyle">{{ application.teacher }}</td>
          <td><input type="radio" value="1" :name="index" v-model="picked"/>优秀</td>
          <td><input type="radio" value="2" :name="index" v-model="picked1"/>良好</td>
          <td><input type="radio" value="3" :name="index" v-model="picked1"/>中等</td>
          <td><input type="radio" value="4" :name="index" v-model="picked1"/>较差</td>
          <td><input type="radio" value="5" :name="index" v-model="picked1"/>差</td>
        </tr>
      </table>
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
        modal1:false,
        modal2:false,
        okValue:0,//值为0无法执行，为1可以执行
        messageStr:'',
        picked:true,
        studentPageUrl:'#/login/main/studentHome',
        applications: [
          { id:'1', teacher: '1.教师上课认真程度：'},
          { id:'2', teacher: '2.教室课堂气氛：'},
          { id:'3', teacher: '3.作业批改情况'},
          { id:'4', teacher: '4.课堂收获情况'},
          { id:'5', teacher: '5.教师上课生动形象，简单易懂'},
        ],
        terms:[
          '2016-2017-1',
          '2016-2017-2',
          '2017-2018-1',
          '2017-2018-2',
          '2018-2019-1',
          '2018-2019-2',
          '2019-2020-1',
          '2019-2020-2',
        ],
        evalutions: [
          {courseNum: 'k2201710', courseName: '企业课I', academy: '信软学院', teacherName: '兰刚', result: '未评教'},
          {courseNum: 'k2210710', courseName: '硬件设计', academy: '信软学院', teacherName: '兰刚', result: '未评教'},
          {courseNum: 'k2017010', courseName: '合作课程', academy: '信软学院', teacherName: '兰刚', result: '未评教'},
        ]
      }
    },
    methods: {
      ok2 () {
        if(this.okValue==0){
          this.modal2 = false;
        }else if(this.okValue==1) {
          this.modal2 = false;
        }
      },
      cancel2(){
        this.modal2=false;
      },
      checkClick: function (index) {
        /*var r = confirm("评教");
        if (r) {
          this.evalutions[index].result = "已评教";
        }
        */
        this.modal2=true;
      }
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
    margin-left:5rem;
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

  @media screen and (max-width: 1023px) {
    html {
      font-size: 56%;
    }
  }
</style>
