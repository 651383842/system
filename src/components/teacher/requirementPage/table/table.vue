<template>
  <div id="table">
    <div  class="positionBar">
      <span>您当前的位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span>>禁排申请</span>
    </div>
    <div id="sel">
      <span>请选择每周不上课的时间：</span>
      <Select  v-model="option2value" multiple style="width: 26rem">
        <Option v-for="option2 in options2"  :value="option2.value" :key="option2.value">
          {{option2.text}}
        </Option>
      </Select>
      <button @click="chooseDia(option2value)" class="am-btn am-btn-success am-radius" >提交</button>
    </div>
    <div id="back">
    <div id="show">
    <p id="wor">*下面是教务人员的批复记录：</p>
    <table class="normalTable" border="1">
      <thead>
       <tr>
         <th width="20%">申请教师</th>
         <th width="20%">申请学期</th>
         <th width="20%">申请内容(星期)</th>
         <th width="20%">教务反馈</th>
         <th width="20%">申请时间</th>
       </tr>
      </thead>
      <tbody>
       <tr v-for="data in tableList">
         <td v-text="data.appTeacherName"></td>
         <td v-text="data.appTerm"></td>
         <td v-text="data.appContent"></td>
         <td v-text="data.acdeminreply"></td>
         <td v-text="data.appTime"></td>
       </tr>
      </tbody>
    </table>
    </div>
   </div>
    <Modal
      v-model="modal1"
      width="400"
      :mask-closable="false"
      id="modalBody"
      :styles="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定提交该申请吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="chooseDay(ooption2value)">确定</button>
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
        <p>操作失败！</p>
      </div>
      <div slot="footer" style="text-align: center">
        <!--<button id="modalBtn" @click="chooseDay">确定</button>-->
        <button id="modalBtn" @click="modal2 = false">确定</button>
      </div>
    </Modal>
    <Modal
      v-model="modal3"
      width="400"
      :mask-closable="false"
      id="modalBody"
      :styles="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>请选择星期几！</p>
      </div>
      <div slot="footer" style="text-align: center">
        <!--<button id="modalBtn" @click="chooseDay">确定</button>-->
        <button id="modalBtn" @click="modal3 = false">确定</button>
      </div>
    </Modal>
    </div>
</template>

<script>
    export default {
        name: 'table',
        data () {
            return {
              option2value:[],
              options2:[
                {text:'星期一',value:'1'},
                {text:'星期二',value:'2'},
                {text:'星期三',value:'3'},
                {text:'星期四',value:'4'},
                {text:'星期五',value:'5'}
              ],
              tableList:[],
              modal1: false,
              modal2: false,
              modal3: false,
              ooption2value:''
            }
        },
      beforeMount:function(){
        this.$http.post('./teacherRestShowApply',{},
//          this.$http.post('../jsonphp/requirement.php',{},
          {"Content-Type":"application/json"}).then(function(response){
            console.log(response.body);
            this.tableList = response.body.tableList;
            for(var i = 0;i < response.body.tableList.length;i++){
              if(response.body.tableList[i].acdeminreply == "0"){
                this.tableList[i].acdeminreply="待审核";
              }else if(response.body.tableList[i].acdeminreply == "1"){
                this.tableList[i].acdeminreply="审核通过";
              }else{ this.tableList[i].acdeminreply="审核不通过";}
              switch (response.body.tableList[i].appContent)
              {
                case 1:
                    this.tableList[i].appContent = "星期一";
                    break;
                case 2:
                  this.tableList[i].appContent = "星期二";
                  break;
                case 3:
                  this.tableList[i].appContent = "星期三";
                  break;
                case 4:
                  this.tableList[i].appContent = "星期四";
                  break;
                case 5:
                  this.tableList[i].appContent = "星期五";
                  break;
              }
            }
          },
          function(error){
        });
      },
      methods:{
        chooseDia:function(option2value){
          this.ooption2value=option2value;
          if(option2value=='0'){
            this.modal3 =true;
          }else{
            this.modal1 = true;
          }
        },
        //与后端交互 所选星期几
        chooseDay:function(value){
          this.modal1 = false;
          this.$http.post('./teacherRestApplyHandle',{
          "appTeacherCommand": value
          },{"Content-Type":"application/json"}).then(function (response) {
            if(response.body.result=="1")
            {this.$Message.success('操作成功！');
              var t=setTimeout(" location.reload();",2000)
            }
            else
            {
                this.modal2 = true;
            }
            },
            function(error){
            });
        }
      }
    }
</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  html{
    font-size: 16px;
    /*background-color: #f3f3f3;*/
  }
  #sel{
    display: flex;
    padding-left:5rem;
    background-color: white;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    /*justify-content:space-between;*/
 }
  #show{
      background-color: white;
      margin-right:5rem;
      margin-left:5rem;
      height:30rem;

    }
  #back{
    background-color: #f3f3f3;
    padding-top:0.1rem;
  }
  select{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.7rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    margin-left:3rem;
    font-size: 0.8rem;
  }
  button{

    /*height: 2.5rem;*/
    min-width: 5rem;
    /*position: absolute;*/
    margin-left:3rem;

  }
  table{
    /*border: solid 1px white;*/
    border-collapse: collapse;
    /*margin-left:1rem;*/
    /*margin-right:1rem;*/
    /*width:96%;*/

  }
  thead{
    /*border-bottom:solid 2px lightgrey;*/
  }

  tr{
    height:2.5rem;
  }
  #wor{
    display: flex;
    margin-left:1rem;
    padding-top:1rem;
  }
</style>
