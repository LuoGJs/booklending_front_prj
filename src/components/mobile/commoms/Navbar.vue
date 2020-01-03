<template>
  <div>
    <van-nav-bar
      title=""
      :fixed="fix"
      style="background-color: lightseagreen"
      @click-right="onClickRight"
    >
      <van-image
        style="position: relative;top: 1rem"
        slot="left"
        round
        width="2.5rem"
        height="2.5rem"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <a slot="title">我的图书馆</a>
      <a slot="right" href="/mlogin" v-if="!isLogin">登录/注册</a>
      <p slot="right" v-if="isLogin" style="color: snow;font-size: 15px;line-height: 15px">
        <van-icon name="success" color="snow"/>
        登陆成功
      </p>
    </van-nav-bar>
  </div>
</template>

<script>
  var graceChecker = require("../../../assets/minified_js/commons/graceChecker.js");
  export default {
    name: "Navbar",
    data() {
      return {
        isLogin: false, //判断用户登录状态
        fix: true,
        loginSuccessUser: {} //登录成功的用户对象。
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
    },
    methods: {
      onClickRight: function () {
        console.log('您点击了登录注册...');
      },

    }
  }
</script>

<style scoped>
  div.van-nav-bar__title.van-ellipsis, div.van-nav-bar__right > span {
    color: black;
  }

  div.van-nav-bar__title.van-ellipsis a {
    color: #FFF;
  }
</style>
