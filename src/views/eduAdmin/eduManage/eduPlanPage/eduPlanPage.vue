<template>
    <!--使用import引入的组件组合page页面-->
    <div id="eduPlanPage">
      <topTitle></topTitle>
      <topBar></topBar>
      <div class="positionBar">
        <span>您的当前位置：</span>
        <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
        <span> > 培养方案管理 > 培养方案 </span>
        <button class="am-btn am-btn-success am-radius" style="margin-left: 58.2rem" @click="moda1 = true">跳转到排课执行</button>
      </div>
      <teachingPlan></teachingPlan>
      <Modal
        v-model="moda1"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :closable="closable"
        :styles="{top:'10rem'}">
        <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
        <div style="font-size: 1.1rem;text-align: center;">
          <p>确定取消所作的更改，跳转到排课执行吗?</p>
        </div>
        <div slot="footer" style="text-align: center">
          <router-link to="/eduAdmin/course/couArrangeTable"><button  id="modalBtn">确定</button></router-link>
          <button id="modalBtn" @click="moda1 = false">取消</button>
        </div>
      </Modal>
    </div>
</template>

<script>
  /*import引入该page页面的单文件组件*/
  import topTitle from '../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/eduAdmin/eduManage/eduPlanPage/topBar/topBar.vue'
  import teachingPlan from '../../../../components/eduAdmin/eduManage/eduPlanPage/teachingPlan/teachingPlan.vue'
  export default {
    name: 'eduPlanPage',
    data () {
      return {
        moda1:false,
        msg: ''
      }
    },
    /*注册import引入的单文件组件*/
    components: {
      topTitle,
      topBar,
      teachingPlan
    }
  }
</script>

<style scoped>
    /*html {*/
        /*font-size: 100%;*/
    /*}*/
    #eduPlanPage{
      min-height: 50rem;
    }
    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
