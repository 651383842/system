<template>
  <div id="courseArrangeSettingDiv">
    <div class="blank">
      <div class="positionBar">
        <span>您的当前位置：</span>
        <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
        <span> > 智能排课 > 课程设置</span>
      </div>
    </div>
    <div class="dropDown">
      <div>
        <button class="amButtom" @click="DivCtl('five')"><img id="fiveArrow" class="iconImg" :src="arrowright"><span class="subtitle">五年制</span></button>
        <div id="fiveDiv">
        <div v-for="(item,index) in classList" v-if="item.studyMode=='5'">
          <div v-if="item.studyMode=='5'" :id="'5Div' + index" class="gradePlanDiv">
            <span><img :id="'Arrow' + index" class="gradePlanImg" @click="tableSlideToggle(index)" :src="arrowright"></span>
            <span class="gradePlanP">{{item.className}}</span>
            <span><button class="gradeButton" @click="cancelallEdit(index)" :id="'cancelallEdit'+index" style="display: none">取消全部编辑</button></span>
            <span><button class="gradeButton" @click="allEdit(index,index)" :id="'allEdit'+index" style="display: none">编辑全部</button></span>
            <span><button class="gradeButton" @click="allSave(index)" :id="'allSave'+index" style="display: none">全部保存</button></span>
            <span><button class="gradeButton" @click="cVclick(index)" :id="'cV'+index">粘贴</button></span>
            <span><button class="gradeButton" @click="cCclick(index)" :id="'cC'+index">复制</button></span>
          </div>
          <div v-if="item.studyMode=='5'" :id="'Table'+index" style="display: none">
            <table :id="index+'Table'">
              <thead>
              <tr class="headTr">
                <td>课程名称</td>
                <td>课程编号</td>
                <td>前9周课时</td>
                <td>后9周课时</td>
                <td>任课教师</td>
                <td>教师编号</td>
                <td>是否合课</td>
                <td>操作</td>
              </tr>
              </thead>
              <tbody v-for="(items,Index) in courseList[index].courses">
              <tr>
                <td v-html="items.courseName"></td>
                <td v-html="items.courseId"></td>
                <td v-html="items.execWeekPeriod"></td>
                <td v-html="items.execBackWeekPeriod"></td>
                <td>
                  <select :id="index+'sel1'+Index" v-model="items.teacherId" disabled>
                    <option value="" disabled>选择老师</option>
                    <option v-for="tea in teacherList" :value="tea.teacherId">{{tea.teacherName}}</option>
                  </select>
                </td>
                <td v-html="items.teacherId"></td>
                <td>
                  <select :id="index+'sel2'+Index" v-model="items.allowCombineLesson" disabled>
                    <option disabled value="">是否合课</option>
                    <option value="否">否</option>
                    <option value="是">是</option>
                  </select>
                </td>
                <td class="operationTd">
                  <img :id="index+'EdImg'+Index" src="../../../../../assets/images/edit.png" @click="edit(index,Index)" title="编辑">
                  <!--编辑功能，初始显示，编辑时隐藏-->
                  <img :id="index+'SaImg'+Index" class="saveImg" src="../../../../../assets/images/save.png" @click="saveClick(index,Index)" title="保存">
                  <!--保存功能，初始隐藏，编辑时显示-->
                  <img :id="index+'ReImg'+Index" class="restoreImg" src="../../../../../assets/images/restore.png" @click="recoveryClick(index,Index)" title="取消">
                  <!--取消编辑并重置，初始隐藏，编辑时显示-->
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
      <div>
        <button class="amButtom" @click="DivCtl('three')"><img id="threeArrow" class="iconImg" :src="arrowright"><span class="subtitle">三年制</span></button>
        <div id="threeDiv">
        <div v-for="(item,index) in classList" v-if="item.studyMode=='3'" >
          <div v-if="item.studyMode=='3'" :id="'3Div' + index" class="gradePlanDiv">
            <span><img :id="'Arrow' + index" class="gradePlanImg" @click="tableSlideToggle(index)" :src="arrowright"></span>
            <span class="gradePlanP">{{item.className}}</span>
            <span><button class="gradeButton" @click="cancelallEdit(index)" :id="'cancelallEdit'+index" style="display: none">取消全部编辑</button></span>
            <span><button class="gradeButton" @click="allEdit(index,index)" :id="'allEdit'+index" style="display: none">编辑全部</button></span>
            <span><button class="gradeButton" @click="allSave(index,index)" :id="'allSave'+index" style="display: none">全部保存</button></span>
            <span><button class="gradeButton" @click="cVclick(index)" :id="'cV'+index">粘贴</button></span>
            <span><button class="gradeButton" @click="cCclick(index)" :id="'cC'+index">复制</button></span>
          </div>
          <div v-if="item.studyMode=='3'" :id="'Table'+index" style="display: none">
            <table :id="index+'Table'">
              <thead>
              <tr class="headTr">
                <td>课程名称</td>
                <td>课程编号</td>
                <td>前9周课时</td>
                <td>后9周课时</td>
                <td>任课教师</td>
                <td>教师编号</td>
                <td>是否合课</td>
                <td>操作</td>
              </tr>
              </thead>
              <tbody v-for="(items,Index) in courseList[index].courses">
              <tr>
                <td v-html="items.courseName"></td>
                <td v-html="items.courseId"></td>
                <td v-html="items.execWeekPeriod"></td>
                <td v-html="items.execBackWeekPeriod"></td>
                <td>
                  <select :id="index+'sel1'+Index" v-model="items.teacherId" disabled>
                    <option value="" disabled>选择老师</option>
                    <option v-for="tea in teacherList" :value="tea.teacherId">{{tea.teacherName}}</option>
                  </select>
                </td>
                <td v-html="items.teacherId"></td>
                <td>
                  <select :id="index+'sel2'+Index" v-model="items.allowCombineLesson" disabled>
                    <option disabled value="">是否合课</option>
                    <option value="否">否</option>
                    <option value="是">是</option>
                  </select>
                </td>
                <td class="operationTd">
                  <img :id="index+'EdImg'+Index" src="../../../../../assets/images/edit.png" @click="edit(index,Index)" title="编辑">
                  <!--编辑功能，初始显示，编辑时隐藏-->
                  <img :id="index+'SaImg'+Index" class="saveImg" src="../../../../../assets/images/save.png" @click="saveClick(index,Index)" title="保存">
                  <!--保存功能，初始隐藏，编辑时显示-->
                  <img :id="index+'ReImg'+Index" class="restoreImg" src="../../../../../assets/images/restore.png" @click="recoveryClick(index,Index)" title="取消">
                  <!--取消编辑并重置，初始隐藏，编辑时显示-->
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    </div>
    <Modal
        v-model="modal1"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定取消编辑并重置该课程信息吗?</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="recoveryOK()">确定</button>
        <button id="modalBtn" @click="modal1 = false">取消</button>
      </div>
    </Modal>
    <Modal
        v-model="modal2"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定提交保存该课程信息吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="saveOK()">确定</button>
        <button id="modalBtn" @click="modal2 = false">取消</button>
      </div>
    </Modal>
    <Modal
      v-model="modal3"
      width="400"
      :mask-closable="false"
      id="modalBody"
      :styles="{top:'10rem'}">
      <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定保存所有编辑项吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="allsaveOK()">确定</button>
        <button id="modalBtn" @click="modal3 = false">取消</button>
      </div>
    </Modal>
    <Modal
      v-model="modal5"
      width="400"
      :mask-closable="false"
      id="modalBody"
      :styles="{top:'10rem'}">
      <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定要取消所有编辑并还原已编辑项吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="cancelallEditOK()">确定</button>
        <button id="modalBtn" @click="modal5 = false">取消</button>
      </div>
    </Modal>
    <Modal
      v-model="modal4"
      width="400"
      :mask-closable="false"
      id="modalBody"
      :styles="{top:'10rem'}">
      <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
      <div style="font-size: 1.1rem;text-align: center;">
        <p>{{msgcV}}？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="cVclickOK()">确定</button>
        <button id="modalBtn" @click="modal4 = false">取消</button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import arrowright from "./images/arrowright.png"
  import arrowdown from "./images/arrowdown.png"
  export default {
    name: 'courseArrangeSettingDiv',
    data () {
      return {
        arrowright:arrowright,
        arrowdown:arrowdown,
        cVindex:'',
        cCindex:'null',
        classList:[
//          {classId:'85114',className:'高2015级4班',studyMode:'5'},
//          {classId:'85114',className:'高2015级5班',studyMode:'5'}
              ],
        teacherList:[
//            {teacherId:'0110',teacherName:'李桂'},
//          {teacherId:'0111',teacherName:'谭咏麟'},
//          {teacherId:'0114',teacherName:'别越塔'}
          ],
        courseList:[
//          {courses:[
//            {courseName:'1',courseId:'3',teacherName:'李桂园',teacherId:'0110',allowCombineLesson:'否'},
//            {courseName:'2',courseId:'3',teacherName:'谭咏麟',teacherId:'0111',allowCombineLesson:'否'},
//            ]
//          },
//          {courses:[
//            {courseName:'1',courseId:'3',teacherName:'',teacherId:null,allowCombineLesson:''},
//            {courseName:'2',courseId:'3',teacherName:'',teacherId:'',allowCombineLesson:''},
//            {courseName:'2',courseId:'3',teacherName:'',teacherId:'',allowCombineLesson:''}
//            ]
//          },
        ],
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        modal5: false,
        msgcV:'',
        eindex:'',
        aindex:'',
        eIndex:'',
        cancelIndex:'',
        ebuffer:[]
      }
    },
    beforeMount: function() {
      this.$Loading.start();
      this.$http.post('./courseAssociationManege',{},{
        "Content-Type":"application/json"
      }).then(function(response){
          this.classList = response.body.classList;
          this.teacherList = response.body.teacherList;
          for(var i=0;i <this.classList.length;i++)
          {
             this.courseList.push({courses:[]});
          }
        this.$Loading.finish();
      },function(error){
        this.$Loading.error();
        this.$Message.error("网络错误,请稍后重试！");
      });
    },
    methods:{
      DivCtl:function (msg) {
        var div = document.getElementById(msg+'Div');
        var img = document.getElementById(msg+'Arrow');
        //console.log(msg+'Div');
        if(div.style.display == "none")
          {
            img.src = this.arrowdown;
            div.style.display = "inline";
          }else{
          img.src = this.arrowright;
          div.style.display = "none";
          }
      },
      tableSlideToggle:function (index) {
        var table = document.getElementById('Table'+index);
        var img = document.getElementById('Arrow'+index);
        var edit = document.getElementById('allEdit'+index);
        var cancel = document.getElementById('cancelallEdit'+index);
        if(table.style.display == "none")
        {
          this.$Loading.start();
          this.$http.post('./courseAssociationManege/showLessons',{
            classId:this.classList[index].classId
          },{
            "Content-Type":"application/json"
          }).then(function(response){
            this.courseList[index].courses = response.body;
            if(response.body.length==0)
            {
                this.$Message.warning("没有查询到数据！");
            }
            this.$Loading.finish();
          },function(error){
            this.$Loading.error();
            this.$Message.error("网络错误,请稍后重试！");
          });
          img.src = this.arrowdown;
          table.style.display = "inline";
          if(cancel.style.display == "none")
            edit.style.display = "inline";
        }else{
          img.src = this.arrowright;
          table.style.display = "none";
          edit.style.display = "none";
        }
      },
      cCclick:function (index) {
        if(this.courseList[index].courses.length==0)
        {
          this.$http.post('./courseAssociationManege/showLessons',{
            classId:this.classList[index].classId
          },{
            "Content-Type":"application/json"
          }).then(function(response){
            this.courseList[index].courses = response.body;
            if(response.body.length==0)
            {
              this.$Message.warning("复制失败，目标班级为空！");
              this.cCindex = null;
            }else
            {
              var msg = this.classList[index].className+"的信息已复制！";
              this.$Message.success(msg);
              this.cCindex = index;
            }
          },function(error){
            this.$Message.error("复制失败，目标班级为空！");
            this.cCindex = null;
          });
        }else
        {
          var msg = this.classList[index].className+"的信息已复制！";
          this.$Message.success(msg);
          this.cCindex = index;
        }
      },
      cVclick:function (index) {
        if(this.cCindex == "null")
        {
          this.$Message.error("没有已复制的班级信息，无法粘贴！");
          return;
        }else if(this.cCindex == index)
        {
          this.$Message.error("同一个班级无需粘贴！");
          return;
        }
        this.cVindex = index;
        this.msgcV = "你确定要将*"+this.classList[this.cCindex].className+"*的信息粘贴到*"+
          this.classList[this.cVindex].className+"*吗？";
        this.modal4 = true;
      },
      getCourses:function (index) {
        this.$http.post('./courseAssociationManege/showLessons',{
          classId:this.classList[index].classId
        },{
          "Content-Type":"application/json"
        }).then(function(response){
          this.courseList[index].courses = response.body;
        },function(error){});
      },
      cVclickOK:function () {
          var table = document.getElementById('Table'+this.cVindex);
          if(table.style.display == "none")
          {
            this.$Message.error("复制失败，请展开目标班级再复制！");
            return;
          }
          if(this.courseList[this.cCindex].courses.length==0)
          {
            this.getCourses(this.cCindex);
          }
          if(this.courseList[this.cVindex].courses.length==0||this.courseList[this.cCindex].courses.length==0)
          {
            this.$Message.error("复制失败，目标班级或源班级列表为空！");
            return;
          }
          try
          {
            for(var Index = 0;Index < this.courseList[this.cCindex].courses.length;Index++)
            {
              var sel1 = document.getElementById(this.cCindex+'sel1'+Index);
              var sel2 = document.getElementById(this.cCindex+'sel2'+Index);
              if(sel1.value == "")
              {
                this.courseList[this.cVindex].courses[Index].teacherId = null;
              }else
              {
                this.courseList[this.cVindex].courses[Index].teacherId = sel1.value;
              }
              this.courseList[this.cVindex].courses[Index].allowCombineLesson = sel2.value;
            }
          }catch (err)
          {
            this.allEdit(this.cVindex,this.cCindex);
            var button = document.getElementById('allSave'+this.cVindex);
            button.style.display = "inline";
            this.modal4 = false;
            this.$Message.warning("匹配部分已复制，请及时保存！");
            return;
          }
        this.allEdit(this.cVindex,this.cCindex);
        var button = document.getElementById('allSave'+this.cVindex);
        button.style.display = "inline";
        this.modal4 = false;
        this.$Message.success("复制成功，请及时保存!");
      },
      edit:function (index,Index) {
        var EdImg = document.getElementById(index+'EdImg'+Index);
        var SaImg = document.getElementById(index+'SaImg'+Index);
        var ReImg = document.getElementById(index+'ReImg'+Index);
        var sel1 = document.getElementById(index+'sel1'+Index);
        var sel2 = document.getElementById(index+'sel2'+Index);
        var button = document.getElementById('allSave'+index);
        var head = index+'@'+Index;
        EdImg.style.display = "none";
        SaImg.style.display = "inline";
        ReImg.style.display = "inline";
        sel1.removeAttribute("disabled");
        sel2.removeAttribute("disabled");
        button.style.display = "inline";
        for(var i=0;i<this.ebuffer.length;i++)
        {
            if( this.ebuffer[i].head == head)
            {
              this.ebuffer[i].teacherId = sel1.value;
              this.ebuffer[i].allowCombineLesson = sel2.value;
              return;
            }
        }
        this.ebuffer.push({head:head,teacherId:sel1.value,allowCombineLesson:sel2.value});
      },
      allEdit:function (index,Indexx) {
        var button1 = document.getElementById('allSave'+index);
        var button2 = document.getElementById('cancelallEdit'+index);
        var button3 = document.getElementById('allEdit'+index);
        button1.style.display = "inline";
        button2.style.display = "inline";
        button3.style.display = "none";
        var length = this.courseList[Indexx].courses.length;
        if(length > this.courseList[index].courses.length)
          length = this.courseList[index].courses.length;
        for(var Index=0;Index<length;Index++)
        {
          var EdImg = document.getElementById(index+'EdImg'+Index);
          var SaImg = document.getElementById(index+'SaImg'+Index);
          var ReImg = document.getElementById(index+'ReImg'+Index);
          var sel1 = document.getElementById(index+'sel1'+Index);
          var sel2 = document.getElementById(index+'sel2'+Index);
          var head = index+'@'+Index;
          var exit = false;
          EdImg.style.display = "none";
          SaImg.style.display = "inline";
          ReImg.style.display = "inline";
          sel1.removeAttribute("disabled");
          sel2.removeAttribute("disabled");
          for(var i=0;i<this.ebuffer.length;i++)
          {
            if( this.ebuffer[i].head == head)
            {
              this.ebuffer[i].teacherId = sel1.value;
              this.ebuffer[i].allowCombineLesson = sel2.value;
              exit = true;
              break;
            }
          }
          if(!exit)
          {
            this.ebuffer.push({head:head,teacherId:sel1.value,allowCombineLesson:sel2.value});
          }
        }
      },
      saveClick:function (index,Index) {
        this.eindex = index;
        this.eIndex = Index;
        this.modal2 = true;
      },
      saveOK:function () {
        this.$http.post('./courseAssociationManege/update', this.courseList[this.eindex].courses[this.eIndex]
        ,{
          "Content-Type":"application/json"
        }).then(function(response){
            if(response.body.result == 1)
            {
              var EdImg = document.getElementById(this.eindex+'EdImg'+this.eIndex);
              var SaImg = document.getElementById(this.eindex+'SaImg'+this.eIndex);
              var ReImg = document.getElementById(this.eindex+'ReImg'+this.eIndex);
              var sel1 = document.getElementById(this.eindex+'sel1'+this.eIndex);
              var sel2 = document.getElementById(this.eindex+'sel2'+this.eIndex);
              EdImg.style.display = "inline";
              SaImg.style.display = "none";
              ReImg.style.display = "none";
              sel1.disabled="true";
              sel2.disabled="true";
              this.modal2 = false;
              this.$Message.success("保存成功！");
            }else
            {
                this.$Message.error("保存失败,请稍后重试！");
            }
        },function(error){
          this.$Message.error("网络错误,请稍后重试！");
        });
      },
      recoveryClick:function (index,Index) {
        this.eindex = index;
        this.eIndex = Index;
        this.modal1 = true;
      },
      recoveryOK:function () {
        var heads = this.eindex+'@'+this.eIndex;
        for(var i=0;i<this.ebuffer.length;i++)
        {
            if(this.ebuffer[i].head == heads)
            {
                if(this.ebuffer[i].teacherId == "")
                {
                  this.courseList[this.eindex].courses[this.eIndex].teacherId = null;
                }else
                {
                  this.courseList[this.eindex].courses[this.eIndex].teacherId = this.ebuffer[i].teacherId;
                }
              this.courseList[this.eindex].courses[this.eIndex].allowCombineLesson = this.ebuffer[i].allowCombineLesson;
              var EdImg = document.getElementById(this.eindex+'EdImg'+this.eIndex);
              var SaImg = document.getElementById(this.eindex+'SaImg'+this.eIndex);
              var ReImg = document.getElementById(this.eindex+'ReImg'+this.eIndex);
              var sel1 = document.getElementById(this.eindex+'sel1'+this.eIndex);
              var sel2 = document.getElementById(this.eindex+'sel2'+this.eIndex);
              EdImg.style.display = "inline";
              SaImg.style.display = "none";
              ReImg.style.display = "none";
              sel1.disabled="true";
              sel2.disabled="true";
              this.modal1 = false;
              this.$Message.success("编辑项已还原！");
              break;
            }
        }
      },
      cancelallEdit:function (index) {
        this.cancelIndex = index;
        this.modal5 = true;
      },
      cancelallEditOK:function () {
        for (var eIndex = 0;eIndex<this.courseList[this.cancelIndex].courses.length;eIndex++)
        {
          var heads = this.cancelIndex+'@'+eIndex;
          for(var i=0;i<this.ebuffer.length;i++)
          {
            if(this.ebuffer[i].head == heads)
            {
                if(this.ebuffer[i].teacherId == "")
                {
                  this.courseList[this.cancelIndex].courses[eIndex].teacherId = null;
                }else
                {
                  this.courseList[this.cancelIndex].courses[eIndex].teacherId = this.ebuffer[i].teacherId;
                }
              this.courseList[this.cancelIndex].courses[eIndex].allowCombineLesson = this.ebuffer[i].allowCombineLesson;
              var EdImg = document.getElementById(this.cancelIndex+'EdImg'+eIndex);
              var SaImg = document.getElementById(this.cancelIndex+'SaImg'+eIndex);
              var ReImg = document.getElementById(this.cancelIndex+'ReImg'+eIndex);
              var sel1 = document.getElementById(this.cancelIndex+'sel1'+eIndex);
              var sel2 = document.getElementById(this.cancelIndex+'sel2'+eIndex);
              EdImg.style.display = "inline";
              SaImg.style.display = "none";
              ReImg.style.display = "none";
              sel1.disabled="true";
              sel2.disabled="true";
              this.modal1 = false;
              break;
            }
          }
        }
        var edit = document.getElementById('allEdit'+this.cancelIndex);
        var cancel = document.getElementById('cancelallEdit'+this.cancelIndex);
        edit.style.display = "inline";
        cancel.style.display = "none";
        this.$Message.success("所有编辑项已还原！");
        this.modal5 = false;
      },
      allSave:function (index) {
        this.aindex = index;
        this.modal3 = true;
      },
      allsaveOK:function () {
        var list = [];
        for(var i= 0;i < this.courseList[this.aindex].courses.length;i++)
        {
          var EdImg = document.getElementById(this.aindex+'EdImg'+i);
          if(EdImg.style.display == "none")
          {
              list.push(this.courseList[this.aindex].courses[i]);
          }
        }
        this.$http.post('./courseAssociationManege/updateAll',{
          courseAssociationList:list
        },{
          "Content-Type":"application/json"
        }).then(function(response){
            if(response.body.result == 1)
            {
                this.statusRecovery();
                this.modal3 = false;
                this.$Message.success("保存成功！");
            }else
            {
              this.$Message.error("保存失败,请稍后重试！");
            }
        },function(error){
          this.$Message.error("网络错误,请稍后重试！");
        });
      },
      statusRecovery:function () {
        var edit = document.getElementById('allEdit'+this.aindex);
        var cancel = document.getElementById('cancelallEdit'+this.aindex);
        edit.style.display = "inline";
        cancel.style.display = "none";
        for(var i= 0;i < this.courseList[this.aindex].courses.length;i++)
        {
          var EdImg = document.getElementById(this.aindex+'EdImg'+i);
          if(EdImg.style.display == "none")
          {
            var SaImg = document.getElementById(this.aindex+'SaImg'+i);
            var ReImg = document.getElementById(this.aindex+'ReImg'+i);
            var sel1 = document.getElementById(this.aindex+'sel1'+i);
            var sel2 = document.getElementById(this.aindex+'sel2'+i);
            EdImg.style.display = "inline";
            SaImg.style.display = "none";
            ReImg.style.display = "none";
            sel1.disabled="true";
            sel2.disabled="true";
          }
        }
      }
    }
  }
</script>

<style scoped>
  /*最上层Div*/
  #courseArrangeSettingDiv{
    margin: 0 auto;
    background-color: #f3f3f3;
    min-height: 38.5rem;
  }
  .dropDown{
    /*页面主要内容*/
    margin: 0.5rem 5rem;
  }
  table{
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
    table-layout: fixed;
    border-right: thin solid #E3E3E3;
    border-left: thin solid #E3E3E3;
  }
  td{
    border-bottom: thin solid #E3E3E3;
    height: 2.5rem;
    text-align: center;
  }
  tbody td{
    height: 3.5rem;
  }
  img{
    position: relative;
    margin: 0.5rem 0.2rem;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
  input{
    outline:none;
    border: none;
    text-align: center;
  }
  .saveImg{
    /*保存功能图标*/
    display: none;
  }
  .restoreImg{
    /*重置功能图标*/
    display: none;
  }
  .operationTd{
    /*功能图标*/
    width: 15rem;
  }
  .portTd{
    /*下载和导入*/
    /*display: flex;*/
    padding: 0;
  }
  #upload{
    display: inline;
    float: right;
  }
  #downloadButton{
    /*五年制模版下载按钮*/
    height: 2.35rem;
  }
  #downloadButton3{
    /*三年制模版下载按钮*/
    height: 2.35rem;
  }
  .courseTd:hover > span{
    color: red;
  }
  .teacherTd:hover > span{
    color: red;
  }
  @media screen and (max-width: 1117px) {
    .am-btn{

    }
    #downloadButton{
      /*五年制模版下载按钮*/
      width: 4.5rem;
      padding: 0;
    }
    #downloadButton3{
      /*三年制模版下载按钮*/
      width: 4.5rem;
      padding: 0;
    }
  }
</style>
