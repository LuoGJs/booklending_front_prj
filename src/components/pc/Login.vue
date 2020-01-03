<template>
  <div>

    <div class="login_bg">

      <div class="auth_page_wrappers">
        <div class="auth_login_content">

          <div class="auth_login_right">

            <div class="ewm_wrap">
              <img src="http://images.luogj.cn/zuozhe.png"></img>
              <a style="color: #fff;font-size: 28px;letter-spacing: 3px; margin-right:30px " href="/aboutus">关于我们</a>
            </div>

            <div class="auth_tab">
              <div class="auth_tab_links">
                <div>
                  <img src="http://images.luogj.cn/logo.jpg" alt="logo"/>

                </div>
                <ul>
                  <li id="accountLogin" style="width:50%;" :class="accountSelected" tabid="01" @click="selected1">
                    <span>账号登录</span>
                  </li>

                  <li style="width:50%;" id="dyLogin" tabid="02" :class="dySelected" @click="selected2"><i></i><span>手机验证码登录</span>
                  </li>

                </ul>
              </div>

              <div class="auth_tab_content">
                <div id="login1" class="auth_tab_content_item" v-show="itemisShow[0]">
                  <form id="casLoginForm" class="fm-v clearfix amp-login-form" role="form" action="">
                    <p>
                      <i class="auth_icon auth_icon_user"></i>
                      <input placeholder="账号 Username" class="auth_input" type="text" v-model="loginUser1.username"
                             value=""/>

                    </p>

                    <p>
                      <i class="auth_icon auth_icon_pwd"></i>
                      <input v-model="loginUser1.password" placeholder="密码 Password" class="auth_input" type="password"
                             value=""
                             autocomplete="off"/>

                    </p>

                    <p style="margin: 0px;padding: 0px;height: 50px">
                      <i class="auth_icon auth_icon_yzm"></i>

                      <input placeholder="验证码 Verification code" class="auth_input" type="text"
                             v-model="loginUser1.validateCode" value=""/>


                      <img style="cursor:pointer;position: relative;left: 188px;top:-37px;" title="看不清换一张"
                           :src="randomCodeUrl" @click="changeRandomCode">

                      <span style="cursor: pointer;color: #1dadff;margin-left: 2px;" id="changeCaptcha"
                            class="chk_text"></span>

                    </p>
                    <p>
                      <button type="button" class="auth_login_btn primary full_width" @click="doLogin1">登录
                      </button>
                    </p>
                    <div class="footer">

                      <a href="/rege" class="n1">注册账号</a>
                      <a  class="n3" @click="forgetpassword" >忘记密码</a>
                    </div>

                  </form>
                </div>

                <div id="login2" class="auth_tab_content_item" v-show="itemisShow[1]">
                  <form id="casDynamicLoginForm" class="fm-v clearfix amp-login-form" action="">


                    <p>
                      <i class="auth_icon auth_icon_shouji"></i>
                      <input id="phonenumber" v-model="loginUser2.phonenumber" name="phonenumber" placeholder="请输入手机号"
                             class="auth_input" type="text"
                             value=""/>

                    </p>
                    <p style="padding: 0px;margin:0px;height: 47px; ">
                      <i class="auth_icon auth_icon_pwd"></i>
                      <input style="" type="text" placeholder="验证码" id="dynamicCodeCaptchaResponse"
                             name="captchaResponse" class="auth_input captcha-input"
                             style="width:120px;position: relative;top: -20px" v-model="loginUser2.randomCode"/>


                      <canvas id="s-canvas" style=" cursor: pointer;" title="看不清楚，换一张" :width="contentWidth"
                              :height="contentHeight"
                              @click="handleClick"></canvas>

                    </p>

                    <p>
                      <i class="auth_icon auth_icon_yzm"></i>
                      <input type="text" class="auth_input" id="dynamicCode" name="dynamicCode"
                             placeholder="请输入验证码" style="width:95px;" v-model="loginUser2.dynamicCode"/>

                      <input type="button" value="获取验证码" class="auth_login_btn abs_right dynamicCode"
                             @click="sendRandemCode"/>
                    </p>


                    <p style="margin-bottom: 34px;margin-bottom: 37px;">
                      <button type="button" class="auth_login_btn primary full_width" @click="doLogin2">登录
                      </button>
                    </p>


                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="hidenCaptchaDiv" style="display: none;">

        </div>

      </div>

    </div>

  </div>


</template>


<script>
  export default {
    name: "Login",

    props: {
      fontSizeMin: {
        type: Number,
        default: 32
      },
      fontSizeMax: {
        type: Number,
        default: 40
      },
      backgroundColorMin: {
        type: Number,
        default: 180
      },
      backgroundColorMax: {
        type: Number,
        default: 240
      },
      colorMin: {
        type: Number,
        default: 20
      },
      colorMax: {
        type: Number,
        default: 40
      },
      lineColorMin: {
        type: Number,
        default: 20
      },
      lineColorMax: {
        type: Number,
        default: 80
      },
      dotColorMin: {
        type: Number,
        default: 0
      },
      dotColorMax: {
        type: Number,
        default: 255
      },
      contentWidth: {
        type: Number,
        default: 136
      },
      contentHeight: {
        type: Number,
        default: 48
      }
    },
    data() {
      return {

        loginUser1: {//账号密码
          username: '',
          password: '',
          validateCode: ''
        },
        loginUser2: {//手机
          phonenumber: '',
          dynamicCode: '', //用户输入的用于和手机收到的验证码比较的
          randomCode: ''  //用户输入的用于和客户端生成验证码比较的
        },

        token: '', //账号密码登录页面获取验证码时，发给服务器的token值。
        randomCodeUrl: '',
        loginSuccessUser: {
          //接受登录成功的用户信息，主要是接收服务器返回的token值
        },

        identifyCode: '',//手机登录页面客户端生成的验证码
        dySelected: '',
        accountSelected: 'selected',

        itemisShow: [true, false],

      }
    },


    methods: {


      selected1: function () {

        this.dySelected = '';
        this.accountSelected = "selected";
        ;
        this.itemisShow[0] = true;
        this.itemisShow[1] = false;

      },
      selected2: function () {

        this.dySelected = 'selected';
        this.accountSelected = "";


        this.itemisShow[1] = true;
        this.itemisShow[0] = false;

        this.handleClick();


      },
      forgetpassword:function(){
        // this.$prompt('请输入新密码', '输入', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        // }).then(({ value }) => {
        //
        //   // 这里发送axious请求
        //
        //
        //
        //   this.$message({
        //     type: 'success',
        //     message: '你的新密码是: ' + value
        //   });
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '取消输入'
        //   });
        // });

        this.$alert('密码忘了就用手机验证码登录吧', '解决办法', {
          confirmButtonText: '我知道了',

        });
      },


      //点击生成随机数 并传给调用它的组件（父组件用changeCode接收）
      handleClick() {

        let num = "";
        for (let i = 0; i < 4; i++) {
          num += Math.floor(Math.random() * 10)
        }
        this.identifyCode = num
        let newN = this.identifyCode
        this.$emit('changeCode', newN)
      },
      // 生成一个随机数
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      // 生成一个随机的颜色
      randomColor(min, max) {
        var r = this.randomNum(min, max)
        var g = this.randomNum(min, max)
        var b = this.randomNum(min, max)
        return 'rgb(' + r + ',' + g + ',' + b + ')'
      },
      drawPic() {
        var canvas = document.getElementById('s-canvas')
        var ctx = canvas.getContext('2d')
        ctx.textBaseline = 'bottom'
        // 绘制背景
        ctx.fillStyle = this.randomColor(
          this.backgroundColorMin,
          this.backgroundColorMax
        )
        ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
        // 绘制文字
        for (let i = 0; i < this.identifyCode.length; i++) {
          this.drawText(ctx, this.identifyCode[i], i)
        }
        this.drawLine(ctx)
        this.drawDot(ctx)
      },
      drawText(ctx, txt, i) {
        ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax)
        ctx.font =
          this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
        var x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
        var y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
        var deg = this.randomNum(-45, 45)
        // 修改坐标原点和旋转角度
        ctx.translate(x, y)
        ctx.rotate(deg * Math.PI / 180)
        ctx.fillText(txt, 0, 0)
        // 恢复坐标原点和旋转角度
        ctx.rotate(-deg * Math.PI / 180)
        ctx.translate(-x, -y)
      },
      drawLine(ctx) {
        // 绘制干扰线
        for (let i = 0; i < 8; i++) {
          ctx.strokeStyle = this.randomColor(
            this.lineColorMin,
            this.lineColorMax
          )
          ctx.beginPath()
          ctx.moveTo(
            this.randomNum(0, this.contentWidth),
            this.randomNum(0, this.contentHeight)
          )
          ctx.lineTo(
            this.randomNum(0, this.contentWidth),
            this.randomNum(0, this.contentHeight)
          )
          ctx.stroke()
        }
      },
      drawDot(ctx) {
        // 绘制干扰点
        for (let i = 0; i < 100; i++) {
          ctx.fillStyle = this.randomColor(0, 255)
          ctx.beginPath()
          ctx.arc(
            this.randomNum(0, this.contentWidth),
            this.randomNum(0, this.contentHeight),
            1,
            0,
            2 * Math.PI
          )
          ctx.fill()
        }
      },

      doLogin2: function () {
        if (this.identifyCode != this.loginUser2.randomCode) {
          this.$message({
            message: '验证码失败!',
            type: 'warning'
          });
          return;
        }
        let url = this.websiteUrl + '/moocdemo/users/login4?token=' + this.token;
        let that = this;
        this.axios.get(url, {
          params: {
            mobile: that.loginUser2.phonenumber,
            validateCode: that.loginUser2.dynamicCode
          }
        })
          .then(function (response) {
            if (response.data.code == 200) {

              console.log("登录成功用户对象->" + response.data.data);
              that.loginSuccessUser = response.data.data;

              localStorage.setItem("mytoken",JSON.stringify(that.loginSuccessUser));
              that.$message({
                message: response.data.msg,
                type: 'success'
              });
              that.$router.push("pmainpage");


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
      doLogin1() {

        let url = this.websiteUrl + '/moocdemo/users/login3?token=' + this.token;
        let that = this;
        this.axios.get(url, {
          params: {
            username: that.loginUser1.username,
            password: that.loginUser1.password,
            validateCode: that.loginUser1.validateCode
          }
        })
          .then(function (response) {
            //console.log(response.data);
            if (response.data.code == 200) {

              console.log("登录成功用户对象->" + response.data.data);
              that.loginSuccessUser = response.data.data;

              localStorage.setItem("mytoken",JSON.stringify(that.loginSuccessUser));
              that.$message({
                message: response.data.msg,
                type: 'success'
              });
              that.$router.push("pmainpage");


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
        let secret = 'www.luogj.cn'; //网站的域名
        this.token = jwt.sign(payload, secret);//那你的公钥+私钥，生成唯一token

        this.randomCodeUrl = this.websiteUrl +'/moocdemo/commons/hutoolRandomCodeImage?token=' + this.token
      },
      sendRandemCode: function () {
        let url = this.websiteUrl +'/moocdemo/commons/mrcode2?mobile=' + this.loginUser2.phonenumber;
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
    },
    watch: {
      identifyCode() {

        this.drawPic()
      }
    },
    mounted() {
      // this.drawPic();
      // this.handleClick();
      this.changeRandomCode();
    }
  }

</script>

<style scoped>
  @import "../../assets/css/login.css";

  #s-canvas {
    margin: 0px;
    padding: 0px;
    position: relative;
    top: -1px;
    right: -2px;
  }
</style>
