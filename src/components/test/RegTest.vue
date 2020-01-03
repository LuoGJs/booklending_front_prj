<template>
  <div>


    <!--登录部分-->
    <el-row>
      <el-col :offset="9" :span="6">
        <h2 style="text-align:  center;">用户注册</h2>
        <hr>
        <el-form ref="form" label-width="80px">
          <el-form-item label="手机号码">
            <el-input v-model="regUser.mobile"></el-input>
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



  export default {
    name: "RegTest",


    data() {
      return {

        token: '', //获取验证码时，发给服务器的token值。
        randomCodeUrl: '',
        regUser: {
          mobile: '',
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
        let url = this.websiteUrl+'/moocdemo/users/reg?token=' + this.token;
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

      //给手机发送验证码
      sendRandomCode:function(){
        let url = 'http://localhost:8888/moocdemo/commons/mrcode?mobile=' + this.regUser.mobile;
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
