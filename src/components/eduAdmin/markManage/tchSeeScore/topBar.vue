<template>
  <div id="makeupGradeInput_topBar" class="topBarDiv am-btn-group">
    <a :href="gradeCountUrl"><button id="gradeCountBtn" class="topBarButton am-btn am-btn-success">{{ gradeCountBtn }}</button></a>
    <a :href="gradeCheckUrl"><button id="gradeCheckBtn" class="topBarButton am-btn am-btn-success">{{ gradeCheckBtn }}</button></a>
    <a :href="gradeCancelUrl"><button id="gradeCancelBtn" class="topBarButton am-btn am-btn-success">{{ gradeCancelBtn }}</button></a>
    <a :href="makeupInputUrl"><button id="makeupInputBtn" class="topBarButton am-btn am-btn-success">{{ makeupInputBtn }}</button></a>
    <a href="#/eduAdmin/gradeManage/seeScore"><button id="makeupInputBtn" class="topBarButton am-btn am-btn-success btn-active">结业成绩</button></a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        gradeCountBtn: '成绩统计',
        gradeCheckBtn: '成绩查询',
        gradeCancelBtn: '成绩撤销',
        makeupInputBtn: '补考成绩输入',
        gradeCountUrl: '#/eduAdmin/gradeManage/gradeStat',
        gradeCheckUrl: '#/eduAdmin/gradeManage/gradeQuery',
        gradeCancelUrl: '#/eduAdmin/gradeManage/adminCancelGrade',
        makeupInputUrl: '#/eduAdmin/gradeManage/makeupGradeInput',
        authorityList: ''
      }
    },
    mounted: function () {
      try{
        var buttons = document.getElementById("makeupGradeInput_topBar").getElementsByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if (this.authorityList[i] == "28") {
            buttons[0].style.display = "block";
          }else if (this.authorityList[i] == "29") {
            buttons[1].style.display = "block";
          }else if (this.authorityList[i] == "32") {
            buttons[2].style.display = "block";
          }else if (this.authorityList[i] == "31") {
            buttons[3].style.display = "block";}
          else if(this.authorityList[i] == "68"){
            buttons[4].style.display = "block";
          }
        }
      }catch(e) {}
    }
  }
</script>

<style scoped>
  #gradeCountBtn {
    margin-left: 5rem;
  }
</style>
