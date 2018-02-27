<template>
  <div>
    <div  class="positionBar">
      <span>您当前的位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span>>教研组管理</span>
      </div>
    <div id="back">
    <div id="table">
     <div id="title"> <p id="groupName">{{title}}</p></div>
     <div id="show">
        <p>编号：{{num}}</p>
       <p id="leaderP">
         组长：
       <span v-for="leader in leaders">{{leader}}</span>
       <p id="memberP">
         组员：
         <select id="memberSelect" >
           <option disabled selected="selected">选择教师</option>
           <option v-for="teacher in teacherList" >{{ teacher.teacherName }}</option>
         </select>
         <span class="tipSpan" @click="addPerson('member',members)"><img id="tipSpan" title="添加" :src="imgSrc1"></span>
       <div class="personDiv">
         <eduResGroupPerson v-for="(member,index) in members" :key="member" @remove="removePerson(index,members)" :person="member"></eduResGroupPerson>
       </div>
       </p>

      </div>
      <div style="text-align: center">
      <button  v-show="exitBool" class="am-btn am-btn-success am-radius" @click="saveDia">保存</button>
      <button v-show="exitBool" class="am-btn am-btn-success am-radius" @click="cancelDia">取消</button>
      </div>
      </div>
    <Modal
      v-model="modal1"
      width="400"
      :mask-closable="false"
      id="modalBody"
      :styles="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定保存操作吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="save()">确定</button>
        <button id="modalBtn" @click="modal1 = false">取消</button>
      </div>
    </Modal>
    <Modal
      v-model="modal2"
      width="400"
      :mask-closable="false"
      id="modalBody"
      :styles="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定取消操作吗？?</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="cancel()">确定</button>
        <button id="modalBtn" @click="modal2 = false">取消</button>
      </div>
    </Modal>
    <Modal
      v-model="modal3"
      width="400"
      :mask-closable="false"
      id="modalBody"
      :styles="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>保存失败！</p>
      </div>
      <div slot="footer" style="text-align: center">
        <!--<button id="modalBtn" @click="chooseDay">确定</button>-->
        <button id="modalBtn" @click="modal3 = false">确定</button>
      </div>
    </Modal>
</div>
  </div>
</template>

<script>
  import icon1 from'./addCircle.png'
  import eduResGroupPerson from'../table/eduResGroupPerson .vue'
  export default {
    name: 'table',
    data () {
      return {
        exitBool:true,
        title:'',
        num:'',
        imgSrc1:icon1,
        teacherId:'',
        leaders: [],
        // 当前显示的教研组信息，用于数据库查询
        members: [],
        //  当前显示的教研组信息，用于数据库查询
        teachers: [],
        teacherList: [],
        modal1:false,
        modal2:false,
        modal3:false
      }
    },
    components: {
      eduResGroupPerson
    },
    beforeMount:function(){
      var thisURL = document.URL;
      var result =thisURL.split("?")[1];
      if(result=="0"){this.modal3=true;}else if(result=="1")
      {
          this.$Message.success('保存成功！');
      }
        this.$http.post('./courseTeachPlan/setTARGroupInfo',{},
        {"Content-Type":"application/json"}).then(function (response) {
          this.title=response.body.TARGroupName;
          this.num=response.body.TARGroupId;
          if(this.num == 0)
          {
            this.exitBool=false;
            this.$Notice.warning({
              title:'提示',
              desc:'没有管理的教研组！'
            });
          }
          this.leaders = [];
          this.members = [];
          for(var i = 0;i < response.body.tableList.length;i++){
            if(response.body.tableList[i].isLeader){
              this.leaders.push(response.body.tableList[i].teacherName);
            }else {
              this.members.push(response.body.tableList[i].teacherName);
            }
          }
      },
        function(error){
        });
      this.$http.post('./courseTeachPlan/selectTeacherList',{},
        {"Content-Type":"application/json"}).then(function (response) {
          this.teacherList=response.body.teacherList;
        },
        function(error){
        });
    },
    methods: {
      saveDia:function(){
        this.modal1 = true;
      },
      cancelDia:function(){
        this.modal2 = true;
      },
      //添加组员 判断是否已在教研组中
      addPerson: function(type,persons){
        var select = document.getElementById(type+"Select");
        if(select.value!="选择教师"&&select.value!=""){
          for(var x=0;x<this.members.length;x++){
            if(select.value==this.members[x]){
              this.$Message.error("该教师已存在于该教研组！");
              select.value = "";
              return;
            }
          }
          for(var y=0;y<this.leaders.length;y++){
            if(select.value==this.leaders[y]){
              this.$Message.error("该教师已存在于该教研组！");
              select.value = "";
              return;
            }
          }
          persons.push(select.value);}
        select.value = "";
      },
      //删除
      removePerson: function(index,persons){
        persons.splice(index,1);
      },
      //保存 向后端传值
      save:function(){
        this.modal1=false;
        for(var i=0;i<this.members.length;i++){
          for(var n=0;n<this.teacherList.length;n++)
          if(this.members[i]==this.teacherList[n].teacherName)
          {
            this.members[i]=this.teacherList[n].teacherId
          }
        }
        console.log(this.members);
        this.$http.post('./courseTeachPlan/updateTARGroupInfo',{
//          this.$http.post('../jsonphp/research.php',{
          "teacherId":this.members
        //传？？？
        }, {"Content-Type":"application/json"}).then(function (response) {
          if(response.body.result=="1"){
            location.reload();
            for(var i=0;i<this.members.length;i++){
            for(var n=0;n<this.teacherList.length;n++)
              if(this.members[i]==this.teacherList[n].teacherId)
              {
                this.members[i]=this.teacherList[n].teacherName
              }
          }
//            this.$Message.success('操作成功！');
//            var t=setTimeout(" location.reload();",2000);

          }else{
            location.reload();
          }
        },
          function(error){
            console.log("获取error:");
            console.log(error);
          });
        },
      //取消
       cancel:function(){
        location.reload();
      }}

  }
</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  html {
    font-size: 16px;
  }
  #back{
    background-color: #f3f3f3;
    padding:0.1rem;
  }
  #table{
    background-color: white;
    margin-right:5rem;
    margin-left:5rem;
    height:30rem;
    position: relative;
    /*top:2rem;*/
    justify-content: center;
  }
  @media screen and (max-width: 1023px) {
    html {
      font-size: 56%;
    }
  }
  #groupName{
    font-size: 1.3rem;
    position: relative;
    display: flex;
    top:0.5rem;
    left:2rem;
  }
  #title{
    border-bottom: 0.20rem solid #158064;
  }
  .personDiv{
    display: flex;
    overflow: auto;
    font-size: 1rem;
    margin-right: 1rem;
    flex-wrap: wrap;
    width:52rem;
  }

 #show{
   position:relative;
   text-align: left;
   left:2rem;
   font-size:1.3rem;
 }
  button{
   width:5.6rem;
    margin:0.7rem;
  }
  input{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.3rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    font-size: 0.8rem;
  }
  #tipSpan{
  height:1rem;
    width:1rem;
  }
  select{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.7rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    margin: 0.1rem;
    font-size: 0.8rem;
  }
</style>
