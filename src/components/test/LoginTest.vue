<template>
  <div>


    <!--登录部分-->
    <el-row>
      <el-col :offset="9" :span="6">
        <h2 style="text-align:  center;">用户登录</h2>
        <hr>
        <el-form ref="form" label-width="80px">

          <!--下面是滑块验证组件-->
          <el-form-item>
            <div id="slider">
              <slide-verify :l="42"
                            :r="10"
                            :w="310"
                            :h="155"
                            @success="onSuccess"
                            @fail="onFail"
                            @refresh="onRefresh"
                            :slider-text="text"
              ></slide-verify>
              <!--
              <div>{{msg}}</div>
              -->

            </div>
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
    name: "LoginTest",

    data() {
      return {
        msg: '',
        validate: false,  //默认滑块验证没通过
        text: '拖动滑块完成拼图',
        activeIndex: '1',
        activeIndex2: '1',
        loginUser: {
          username: '',
          password: ''
        }
      }
    },
    methods: {

      onSuccess() {
        //this.msg = '拼图成功'
        this.validate = true;
      }
      ,
      onFail() {
        this.msg = ''
      }
      ,
      onRefresh() {
        this.msg = ''
      },

      doLogin:function(){
        if(!this.validate){
          this.$message({
            message: '滑块验证失败!',
            type: 'warning'
          });
          return;
        }
        console.log('真正去发送登录请求');

      }
    }
  }
</script>

<style scoped>
  #slider {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
