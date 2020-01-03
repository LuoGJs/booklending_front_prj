<template>
  <header style="position: relative;top: 0px;left: 1px; width: 100%;">
    <div class="container">
      <div class="nav-head" style="position: relative;left: 150px">
        <a href="/pmainpage" class="head-brand" style="font-size: 20pt;position:relative;left: 50pt;border: 1px solid red">我的山寨图书馆</a>
      </div>
      <ul class="main-nav" style="line-height: 50px; position: relative;top: 5px;left: 400px;border: 1px solid red">
        <li><a href="/pmainpage" class="current" style="font-size: 15px">首页</a></li>
        <li><a href="/search" target="_blank" style="font-size: 15px">借阅</a></li>
        <li><a href="/onlineread" target="_blank" style="font-size: 15px">电子书资源</a></li>
        <li><a href="/audiopage" target="_blank" style="font-size: 15px">放松一下</a></li>
      </ul>
      <!--<div class="otherLink">-->
        <!--<div class="dd">馆藏资源 <i class="el-icon-arrow-down"></i>-->
          <!--<ul class="dd-menu">-->
            <!--<li><a href="#"></a></li>-->
            <!--<li><a href="/case">类别</a></li>-->
            <!--<li><a href="#">选项2</a></li>-->
            <!--<li><a href="#">选项3</a></li>-->

          <!--</ul>-->
        <!--</div>-->
      <!--</div>-->
      <div class="login-register" v-if="!isLogin">
        <a href="/login">登录</a>&nbsp;&nbsp; |&nbsp;&nbsp;
        <a href="/rege">注册</a>
      </div>
      <div class="login-register" v-if="isLogin" style="position: relative;right: 40px" >
        <div class="dd"style="">欢迎您:{{this.loginSuccessUser.username}} <i class="el-icon-arrow-down"></i>
          <ul class="dd-menu"style="position: absolute;top: 60px;">
            <li><a href="/personmessage"><i class="el-icon-info"></i>&nbsp;个人中心</a></li>
            <li><a href="#" @click="doLogout"><i class="el-icon-back"></i>&nbsp;退出登录</a></li>
          </ul>
        </div>
      </div>

    </div>
  </header>
</template>

<script>
//检查是否登录的js
  var graceChecker = require("../../assets/minified_js/commons/graceChecker.js");
  export default {
    name: "Header",
    data(){
      return{
        isLogin: false , //判断用户登录状态
        loginSuccessUser:{} //登录成功的用户对象。
      }

    },

    created(){

    },
    mounted(){
      this.isLogin = graceChecker.isLogin();
      if(this.isLogin){
        if(sessionStorage.getItem("mytoken")!=null){

          //JSON.parse
          //JSON.stringify   是jQuery的方法，在vue 默认是不能用。

          this.loginSuccessUser = JSON.parse( sessionStorage.getItem("mytoken"));
          // console.log(this.loginSuccessUser);

        }
        if(localStorage.getItem("mytoken")!=null){

          this.loginSuccessUser = JSON.parse( localStorage.getItem("mytoken"));
          // console.log(this.loginSuccessUser);

        }
      }
    },

    methods:{
      doLogout:function () {
        if(this.isLogin){
          if(sessionStorage.getItem("mytoken")!=null){
            sessionStorage.removeItem("mytoken");
          }
          if(localStorage.getItem("mytoken")!=null){
            localStorage.removeItem("mytoken");
          }
        }

        window.location.href = '/login'
      }
    }
  }
</script>

<style scoped>
  /*@import "../../assets/vendor/bootstrap-3.3.7-dist/css/bootstrap.min.css";*/
  @import "../../assets/minified_css/index-header.min.css";
  @import "../../assets/minified_css/index.min.css";
  /*@import "https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css";*/
</style>
