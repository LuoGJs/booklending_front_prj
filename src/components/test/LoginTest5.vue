<template>
  <div>


    <!--登录部分-->
    <el-row>
      <el-col :offset="9" :span="6">
        <h2 style="text-align:  center;">用户登录</h2>
        <hr>
        <el-form ref="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="loginUser.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="loginUser.password"></el-input>
          </el-form-item>
          <!--下面是滑块验证组件-->
          <el-form-item>
            <img style="cursor:pointer" title="看不清换一张" :src="randomCodeUrl" @click="changeRandomCode">
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="loginUser.validateCode"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doLogin">立即登录</el-button>

          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>



  export default {
    name: "LoginTest5",


    data() {
      return {
        token: '', //获取验证码时，发给服务器的token值。
        randomCodeUrl: '',
        loginUser: {
          username: '',
          password: '',
          validateCode: ''
        },

        loginSuccessUser: {}
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      doLogin() {

        let url = this.websiteUrl+'/moocdemo/users/login3?token=' + this.token;
        console.log(url);
        let that = this;
        this.axios.get(url, {
          params:{
           username: that.loginUser.username,
           password: that.loginUser.password,
           validateCode: that.loginUser.validateCode
          }
        })
          .then(function (response) {
            //console.log(response.data);
            if (response.data.code == 200) {

              console.log("登录成功用户对象->" + response.data.data);
              that.loginSuccessUser = response.data.data;
              that.$message({
                message: response.data.msg,
                type: 'success'
              });


            } else {
              that.$message({
                message: response.data.msg,
                type: 'error'
              });
            }
          }).catch(function (error) {
          that.$message({
            message: '登录失败！',
            type: 'error'
          });
        })

      },



      changeRandomCode: function () {
        const jwt = require('jsonwebtoken');
        let payload = new Date().getTime() + ""; //当前时间的毫秒数
        let secret = 'www.simoniu.com'; //网站的域名
        this.token = jwt.sign(payload, secret);//那你的公钥+私钥，生成唯一token

        this.randomCodeUrl = 'http://localhost:8888/moocdemo/commons/hutoolRandomCodeImage?token=' + this.token
      }
    },

    watch: {},
    mounted() {
      //去发送一个axios请求，获取一个验证码。同时保存token值。下次登录还要用呢。
      //前端如何生成一个全宇宙不重复的一个token值呢。
      this.changeRandomCode();
    }
  }
</script>

<style scoped>

</style>
