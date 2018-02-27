<template>
  <div id="couArrangeTableDiv">
    <div id="operationDiv">
      <div id="selectDiv">
        <button id="queryButton" @click="modal = true"  class="am-btn am-btn-success am-radius">智能排课</button>
        <form action="./autoArrangeSeeCurriculumExcel" method="get">
          <!--使用form表单进行文件下载-->
          <button id="exportButton" class="am-btn am-btn-success am-radius" type="submit" style="margin-left: 1.4rem">导出</button>
        </form>
        <button class="am-btn am-btn-success am-radius" style="margin-left: 10rem" @click="moda2 = true">跳转到培养方案</button>
      </div>
    </div>
    <div class="positionBar">
      <span>您的当前位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span> > 智能排课 > 排课执行</span>
    </div>
    <div id="mainDiv">
      <p>※同一班级可拖动调整课程,此功能请使用Chrome、FireFox、360(极速模式)、Microsoft Edge浏览器打开</p>
      <tableDiv :queryCourse="queryCourse"></tableDiv><!--表格组件-->
    </div>

    <Modal
        v-model="modal"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :closable="closable"
        :styles="{top:'10rem'}">
      <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
      <div style="font-size: 1.1rem;text-align: center;">
        <p>{{ modalMessage }}</p>
      </div>
      <div slot="footer" style="text-align: center">
        <Button  id="modalBtn" @click="restartArrangeClick()" :loading="loading">确定</Button>
        <button id="modalBtn" @click="closeModal()">取消</button>
      </div>
    </Modal>
    <Modal
      v-model="moda2"
      width="400"
      :mask-closable="false"
      id="modalBody"
      :closable="closable"
      :styles="{top:'10rem'}">
      <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
      <div style="font-size: 1.1rem;text-align: center;">
        <p>确定取消所作的更改，跳转到培养方案吗?</p>
      </div>
      <div slot="footer" style="text-align: center">
        <router-link to="/eduAdmin/plan/eduAdminEduPlan"><button  id="modalBtn">确定</button></router-link>
        <button id="modalBtn" @click="moda2 = false">取消</button>
      </div>
    </Modal>
    <Modal
      v-model="moda3"
      width="400"
      :mask-closable="false"
      id="modalBody"
      :closable="closable"
      :styles="{top:'10rem'}">
      <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
      <div style="font-size: 1.1rem;text-align: center;">
        <p>{{ modalMessage }}</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="moda3 = false">确定</button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import tableDiv from '../tableDiv/tableDiv.vue'
  export default {
    name: 'couArrangeTableDiv',
    data () {
      return {
        modal: false,
        moda2: false,
        moda3: false,
//        对话框显隐
        modalMessage: "您确定进行智能排课吗?",
        loading: false,
//        异步关闭对话框
        closable: false,
//        取消esc关闭对话框和左上角×
        isClose: true,
//        是否允许关闭对话框
      }
    },
    components: {
      tableDiv
    },
    methods: {
      restartArrangeClick: function(){
        this.modalMessage = '正在智能排课中……';
        this.loading = true;
        this.isClose = false;
        this.$http.post('./acdeminArrangeCurriculum',{},{
          "Content-Type":"application/json"
        }).then(function(response){
            if(response.body.result == '0')//排课后端返回失败
            {
              this.modalMessage =  response.body.err_msg;
              this.isClose = true;
              this.loading = false;
              this.modal = false;
              this.moda3 = true;
              return;
            }else if(response.body.result == '1')
            {
              this.$Message.success("智能排课成功！");
              setTimeout("location.reload(true)", 2000);
//          排课成功刷新页面
              this.modal = false;
              this.isClose = true;
              this.loading = false;
              this.modalMessage =  "您确定进行智能排课吗?";
            }
        },function(error){
          this.modalMessage =  "连接失败，请重试！";
          this.modal = false;
          this.moda3 = true;
          this.loading = false;
          this.isClose = true;
        });
      }, //重新智能排课
      closeModal: function () {
        if(this.isClose){
//          判断是否运行关闭对话框
          this.modal = false;
          this.loading = false;
//          关闭等待动态效果
          this.modalMessage =  "您确定进行智能排课吗?";
//          恢复对话框内容
        }
      }//关闭对话框
    }
  }
</script>

<style scoped>
  #couArrangeTableDiv{
    background-color: #f3f3f3;
  }
  #mainDiv{
    /*页面*/
    background-color: white;
    margin: 0 5rem;
    min-height: 33rem;
  }
  select{
    margin-right: 1.4rem;
  }
  #operationDiv{
    /*操作区域外层*/
    background-color: white;
    margin: 0 0 0.6rem;
  }
  #selectDiv{
    /*操作区域*/
    padding: 0.6rem 5rem;
    display: flex;
  }
  #tableTipP{
    /*功能页面标题*/
    color: #C1C1C1;
    position: relative;
    text-align: left;
    z-index: 2;
    padding: 1rem;
    margin: 0;
  }
  #tableInfoP{
    /*表格课表标题*/
    text-align: left;
    position: relative;
    margin-top: 0;
    left: 1rem;
  }
  @media screen and (max-width:1025px) {
    html {
      font-size: 56%;
    }
  }
</style>
