<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="myLessonContent">
      <div class="positionBar">
        <span>你的当前位置：</span>
        <span><a :href="studentPageUrl" class="returnHome">首页</a></span>
        <span> > 学生个人信息</span>
      </div>
      <div class="blank">
      <select class="selectStyle1" v-model="yearSelect">
        <option value="选择学期" disabled selected>选择学期</option>
        <option v-for="year in years" v-bind:value="year">{{year}}</option>
      </select>

        <select class="selectStyle2" v-model="weekSelect">
          <option value="选择周数" disabled selected>选择周数</option>
          <option v-for="(week,index) in weeks" v-bind:value=(index+1)>{{week}}</option>
        </select>

      <button class="searchButton am-btn am-btn-success am-radius" @click="searchClick">查找</button>
        </div>

      <div id="checkCourse_tableDiv">
        <table id="tableDiv" class="normalTable" border="1">
          <tr  id="weekdayTr">
            <th>节次/周次</th>
            <th>星期一</th>
            <th>星期二</th>
            <th>星期三</th>
            <th>星期四</th>
            <th>星期五</th>
          </tr>
          <tr>
            <td class="sectionTd">第一节 <br> 8:30-9:15</td>
            <td rowspan="2">{{ course1.firstCourse }}</td>
            <td rowspan="2">{{ course1.secondCourse }}</td>
            <td rowspan="2">{{ course1.thirdCourse }}</td>
            <td rowspan="2">{{ course1.fourthCourse }}</td>
            <td rowspan="2">{{ course1.fifthCourse }}</td>
          </tr>

          <tr>
            <td class="sectionTd">第二节 <br> 9:20-10:05</td>
          </tr>

          <tr>
          <td class="sectionTd">第三节 <br> 10:20-11:05</td>
          <td rowspan="2">{{ course1.sixthCourse }}</td>
          <td rowspan="2">{{ course1.seventhCourse }}</td>
          <td rowspan="2">{{ course1.eighthCourse }}</td>
          <td rowspan="2">{{ course1.ninthCourse }}</td>
          <td rowspan="2">{{ course1.tenthCourse }}</td>
        </tr>

          <tr>
            <td class="sectionTd">第四节 <br> 11:10-11:55</td>
          </tr>

          <tr>
            <td class="sectionTd">第五节 <br> 14:30-15:15</td>
            <td rowspan="2">{{ course1.eleventhCourse }}</td>
            <td rowspan="2">{{ course1.twelfthCourse }}</td>
            <td rowspan="2">{{ course1.thirteenthCourse }}</td>
            <td rowspan="2">{{ course1.fourteenthCourse}}</td>
            <td rowspan="2">班会</td>
          </tr>

          <tr>
            <td class="sectionTd">第六节 <br> 15:20-16:05</td>
          </tr>

        </table>
      </div>
      <div id="DivNext">
        <table id="tableDivNext" class="normalTable" border="1">
          <tr  id="weekdayTrs">
            <th>课程编码</th>
            <th>课程名称</th>
            <th>课程序号</th>
            <th>教师</th>
          </tr>
          <tr  v-for="course2 in courses2" id="courseTrs">
            <td>{{ course2.courseSerial }} </td>
            <td>{{ course2.courseName }}</td>
            <td>{{ course2.courseSerialNumber }}</td>
            <td>{{ course2.courseTeacher }}</td>
          </tr>
        </table>
      </div>
      <Modal v-model="modal2" id="modalBody" :styles="{top:'10rem'}">
        <p style="text-align:center; font-size:1.1rem;">{{ messageStr }}</p>
        <div slot="footer" style="text-align:center;">
          <Button id="modalBtn" @click="ok2()">确定</Button>
          <Button id="modalBtn" @click="cancel2()">取消</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
    export default {
        name: 'myLessonContent',
        data () {
            return {
              modal1:false,
              modal2:false,
              okValue:0,//值为0无法执行，为1可以执行
              messageStr:'',
              studentPageUrl:'#login/main/studentHome',
              yearSelect:"选择学期",
              weekSelect:'选择周数',
              years:[
                '2016-2017.1',
                '2016-2017.2',
                '2017-2018.1',
                '2017-2018.2',
                '2018-2019.1',
                '2018-2019.2',
                '2019-2020.1',
                '2019-2020.2',
              ],
              weeks: [
                '第一周',
                '第二周',
                '第三周',
                '第四周',
                '第五周',
                '第六周',
                '第七周',
                '第八周',
                '第九周',
                '第十周',
                '第十一周',
                '第十二周',
                '第十三周',
                '第十四周',
                '第十五周',
                '第十六周',
                '第十七周',
                '第十八周',
                '第十九周',
                '第二十周'
              ],
              course1:{},
              courses2:[]
            }
        },
      beforeMount:function(){
        this.$http.post('./studentSeeCurriculum', {
          yearSemester: '',
          week: ''
        }, {"Content-Type": "application/json"}).then(function(response) {
          this.tests=response.body.examArrangement;
          this.years=response.body.term;
        });
      },
      methods:
      {
        ok2 () {
          if(this.okValue==0){
            this.modal2 = false;
          }
        },
        cancel2(){
          this.modal2=false;
        },
        searchClick:function(){
          if(this.yearSelect=="选择学期"){
            this.modal2=true;
            this.messageStr="未选择学期！";
            this.okValue=0;
          }else if(this.weekSelect=='选择周数'){
            this.modal2=true;
            this.messageStr="未选择周数！";
            this.okValue=0;
          }else{
            this.$http.post('./studentSeeCurriculum', {
              yearSemester: this.yearSelect,
              week: this.weekSelect
            }, {"Content-Type": "application/json"}).then(function (response) {
              this.course1 = response.body.studentCurriculum[0];
              this.courses2 = response.body.studentDetailCurriculum;

              var count=0;
              for(var a in this.course1){
                if(this.course1[a]!=null){
                  count++;
                }
              }
              if(count==0){
                this.modal2=true;
                this.messageStr="无对应课表数据！";
                this.okValue=0;
              }
            });
          }
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
    .selectStyle2{
      margin-left:5rem;
    }
    #myLessonContent{
      height:2.2rem;
    }
    .searchButton{
      float:right;
      margin-right:5rem;
      margin-top:0.5rem;
      width:5.6rem;
      outline: none;
    }
    #checkCourse_tableDiv{
      padding:2rem 5rem;
      background-color:#f3f3f3;
    }
    #tableDiv{
      position: relative;
      width: 100%;
      border: 0 solid #d4d4d9;
      border-collapse: collapse;
      table-layout: fixed;
      text-align: center;
    }
    #DivNext{
      padding:0rem 5rem 4rem 5rem;
      background-color:#f3f3f3;
    }
    #tableDivNext{
      position: relative;
      width: 100%;
      border: 0 solid #d4d4d9;
      border-collapse: collapse;
      table-layout: fixed;
      text-align: center;
    }

    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
