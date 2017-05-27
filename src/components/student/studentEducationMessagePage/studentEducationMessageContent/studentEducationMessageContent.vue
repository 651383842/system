<template>
  <div id="educationMessage">
    <div class="positionBar">
      <span>你的当前位置：</span>
      <span><a :href="studentPageUrl" class="returnHome">首页</a></span>
      <span> > 教务信息</span>
    </div>
    <div class="contentTitle">
      <select class="selectStyle" v-model="selected">
        <option value="选择状态" disabled>选择状态</option>
        <option value="已读">已读</option>
        <option value="未读" selected>未读</option>
        <option value="全部">全部</option>
      </select>
      <button id="refreshButton" class="am-btn am-btn-success am-radius" @click="refreshClick">刷新</button>
    </div>
    <div class="tableDiv">
      <table class="normalTable">
      <tr>
        <th>发件人</th>
        <th>内容</th>
        <th>时间</th>

      </tr>
      <!--表头-->
      <tr v-for="(information,index) in informations" :id="information.id">
        <td>{{ information.poster }}</td>
        <td>{{ information.content }}</td>
        <td>{{ information.time }}</td>
      </tr>
    </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'educationMessage',
    data () {
      return {
        studentPageUrl:'#/login/main/studentHome',
        selected:'选择状态',
        informations: [],
      }
    },
    beforeMount:function(){//默认未读
      this.$http.post('../educationMessage.php').then(function(response) {
        this.informations=response.body.informations;
        });
    },
    methods:{
      refreshClick:function() {
        if(this.selected=="已读"){
          this.$http.post('../educationMessage.php').then(function(response) {
            this.informations=response.body.informations;
          });
        }else if(this.selected=="未读"){
          this.$http.post('../educationMessage.php').then(function(response) {
            this.informations=response.body.informations;
          });
        }else if(this.selected=="全部"){
          this.$http.post('../educationMessage.php').then(function(response) {
            this.informations=response.body.informations;
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
  .selectStyle{
    margin-top: 1rem;
  }
  #refreshButton{
    display: block;
    float:right;
    margin-top:0.9rem;
    color: white;
    width: 5.6rem;
    outline: none;
  }
  .contentTitle{
    height:2rem;
    padding:0 5rem;
  }
  .tableDiv{
    margin: 2rem auto;
    background-color: #F3F3F3;
    padding:1rem 5rem;
    display: flex;
    height:40rem;
    text-align: center;
  }
  table{
    width: 100%;
  }
  td{
    min-width: 4rem;
    height: 3rem;
  }
  .aStyle{
    color:#6897bb;
    cursor: pointer;
  }


  @media screen and (max-width: 1023px) {
    html {
      font-size: 56%;
    }
  }
</style>
