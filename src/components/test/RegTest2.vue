<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item><img style="height: 40px; width:auto;" src="../../assets/images/logo.jpg"/></el-menu-item>
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>
      </el-col>
    </el-row>

    <!--登录部分-->
    <el-row>
      <el-col :offset="9" :span="6">
        <h2 style="text-align:  center;">用户注册</h2>
        <hr>
        <el-form ref="form" label-width="80px">
          <el-form-item label="电子邮箱">
            <el-input v-model="regUser.email"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button @click="sendRandomCode">发送验证码</el-button>
          </el-form-item>

          <el-form-item label="密码">
            <el-input type="password" v-model="regUser.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input type="password" v-model="regUser.confirmpass"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="regUser.validateCode"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doReg">立即注册</el-button>

          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import qs from 'qs';

  export default {
    name: "RegTest2",


    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        token: '', //获取验证码时，发给服务器的token值。
        randomCodeUrl: '',
        regUser: {
          email: '',
          password: '',
          confirmpass: '',
          validateCode: ''
        },

        loginSuccessUser: {}
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      //执行用户注册
      doReg() {
        let url = 'http://localhost:8888/moocdemo/users/reg?token=' + this.token;
        let that = this;
        this.axios.post(url,this.regUser).then(function (response) {
          //console.log(response.data);
          if (response.data.code == 200) {

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
            message: '验证码发送失败！',
            type: 'error'
          });
        })

      },

      //给邮箱发送验证码
      sendRandomCode:function(){
        let url = this.websiteUrl+'/moocdemo/commons/ercode?toEmail=' + this.regUser.email;
        let that = this;
        this.axios.get(url)
          .then(function (response) {
            //console.log(response.data);
            if (response.data.code == 200) {
              that.token = response.data.data;
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
            message: '验证码发送失败！',
            type: 'error'
          });
        })
      },

    },

    watch: {},
    mounted() {

    }
  }
</script>

<style scoped>

</style>
