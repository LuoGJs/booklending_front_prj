<template>
  <div style="margin-bottom: 46px">
    <p v-if="!isLogin" style="font-size: 15px; color: #2b542c"><a href="/mlogin">您还未登陆,请先登录</a></p>
    <div class="personMessage" v-if="isLogin">
      <van-row>
        <van-col span="6">
          <van-sidebar v-model="activeKey" @change="onChange">
            <van-sidebar-item title="个人信息" />
            <van-sidebar-item title="还书" />
            <van-sidebar-item title="评价" />
            <van-sidebar-item title="我的喜欢" />
          </van-sidebar>
        </van-col>
        <van-col span="18">

          <div class="main">
            <router-view></router-view>
          </div>
        </van-col>

      </van-row>

    </div>
  </div>
</template>

<script>
  import Notify from "vant/es/notify/index";

  var graceChecker = require("../../../assets/minified_js/commons/graceChecker.js");
  export default {
    name: "PersonPage",
    data() {
      return {
        isLogin: false, //判断用户登录状态
        loginSuccessUser: {} ,//登录成功的用户对象。
        activeKey: 0
      }
    },
    mounted() {
      this.isLogin = graceChecker.isLogin();
      if (this.isLogin) {
        if (sessionStorage.getItem("mytoken") != null) {
          this.loginSuccessUser = JSON.parse(sessionStorage.getItem("mytoken"));
        }
        if (localStorage.getItem("mytoken") != null) {
          this.loginSuccessUser = JSON.parse(localStorage.getItem("mytoken"));

        }
      }
      this.onChange(0);
    },
    methods: {
      onChange(index) {
        switch(index){
          case 0:
            this.$router.push('/mpm');
            break;
          case 1:
            this.$router.push('/mrb')
            break;
          case 2:
            this.$router.push('/me')
            break;
          case 3:
            this.$router.push('/mml')
            break;

        }

      }

    },

  }
</script>

<style scoped>

</style>
