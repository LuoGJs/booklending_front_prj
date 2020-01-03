<template>
  <div class="body">
    <div class="myCalendar">
      <el-calendar>
        <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
        <template
          slot="dateCell"
          slot-scope="{date, data}">
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
          </p>
        </template>
      </el-calendar>
    </div>

    <!--<div class="main-wraper">-->

    <div class="main">
      <div class="form">
        <div style="">
          <div class="welcome">欢迎注册</div>

          <div class="header">每一天，乐在阅读。</div>
          <a href="login" style="position: relative; left:120px; bottom:20px;text-decoration: none;">已有账号，点我登录</a>

        </div>
      </div>
      <div class="regemain">
        <div class="mes">

          <el-row>
            <el-col :span="8">
              <div class="left_message"> 账&nbsp;&nbsp;&nbsp;号：</div>
            </el-col>
            <el-col :span="16">
              <div class="right_input">
                <el-input
                  placeholder="请输入账号"
                  prefix-icon="el-icon-user-solid"
                  v-model="user.username"
                  clearable>
                </el-input>

              </div>
            </el-col>
          </el-row>


        </div>

        <div class="mes">

          <el-row>
            <el-col :span="8">
              <div class="left_message"> 密&nbsp;&nbsp;&nbsp;码：</div>
            </el-col>
            <el-col :span="16">
              <div class="right_input">
                <el-input v-model="user.password" prefix-icon="el-icon-s-goods" placeholder="请输入密码"
                          show-password></el-input>

              </div>
            </el-col>
          </el-row>


        </div>

        <div class="mes">

          <el-row>
            <el-col :span="8">
              <div class="left_message"> 手机号码：</div>
            </el-col>
            <el-col :span="16">
              <div class="right_input">
                <el-input
                  type="text"
                  v-model="user.mobile"
                  prefix-icon="el-icon-phone"
                  placeholder="请输入手机号码"

                  maxlength="11"
                  show-word-limit
                >
                </el-input>
              </div>
            </el-col>
          </el-row>
          <div class="mes">

            <el-row>
              <el-col :span="8" :offset="4">
                <div class="left_message">
                  <el-button @click="senddynamic">获取验证码</el-button>
                </div>
              </el-col>
              <el-col :span="8">
                <div style="position: relative;top: 3px;">
                  <el-input
                    placeholder="请输入验证码"
                    v-model="user.validateCode"
                    clearable>
                  </el-input>

                </div>
              </el-col>
            </el-row>


          </div>

        </div>

        <el-row>
          <el-col :span="18" :offset="3">
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
          </el-col>
        </el-row>
        <br/>
        <el-button ref="btn" type="primary" style="width: 200px" round @click="doRege">注册</el-button>
        <br/><br/>
        <el-checkbox v-model="ischecked">
          <a style="color: black; font-size: 15px" href="/agreement">我已经同意用户许可协议</a>
        </el-checkbox>


      </div>


    </div>
  </div>


  <!--</div>-->
</template>

<script>
  export default {
    name: "Regesit",
    data() {
      return {
        user: {
          username: '',
          password: '',
          mobile: '',
          validateCode: ''
        },
        msg: '',
        validate: false,  //默认滑块验证没通过
        text: '拖动滑块完成拼图',
        dynamiccode: '',
        // ischecked: [true, false],
        ischecked:false,
        token:'',
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

      doRege: function () {
        if (!this.validate) {
          this.$message({
            message: '滑块验证失败!',
            type: 'warning'
          });
          return;
        }
        if (this.ischecked==false){
          this.$message({
            message: '请勾选同意用户许可协议!',
            type: 'warning'
          });
          return;
        }

        // console.log(this.ischecked + "*****")
        let url = this.websiteUrl + '/moocdemo/users/reg?token=' + this.token;
        let that = this;
        this.axios.post(url, this.user).then(function (response) {
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
      senddynamic: function () {
        let url = this.websiteUrl +'/moocdemo/commons/mrcode1?mobile=' + this.user.mobile;
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
      }
    }
  }

</script>

<style scoped>
  @import "../../assets/css/regesit.css";

  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  /*.regemain{*/
  /*margin-top: 20px;*/
  /*}*/
  .mes {
    margin: 20px 0px;
  }

  .left_message {
    font-size: 20px;
    line-height: 45px;
    color: beige;
  }

  .right_input {
    width: 250px;

  }

  .myCalendar {
    position: absolute;
    top: 100px;
    left: 400px;
    height: 500px;
    width: 500px;
    border: 1px solid rebeccapurple;
    padding: 0px;
    margin: 0px;
    z-index: 10;
  }

  #slider {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
