<template>
  <div>
    <MHeader></MHeader>

    <div class="logindiv">
      <h1>登录页面</h1>
      <van-cell-group>
        <van-field
          v-if="!isMobileLogin"
          v-model="myuser.username"
          required
          clearable
          label="用户名"
          right-icon="question-o"
          placeholder="请输入用户名"
          @click-right-icon="$toast('question')"
        />
        <van-field
          v-if="isMobileLogin"
          v-model="myuser.phonenumber"
          label="手机号"
          placeholder="请输入手机号"
        />

        <van-field
          v-if="!isMobileLogin"
          v-model="myuser.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />

        <van-field
          v-if="isMobileLogin"
          v-model="myuser.dynamicCode"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >

          <van-button slot="button" size="small" type="primary" @click="sendRandemCode">发送验证码</van-button>
        </van-field>
        <van-field v-model="myuser.randomCode" placeholder="验证码"/>
        <div class="s-canvas" style="position:relative;top: 15px;right: 25px">

          <canvas id="s-canvas" style="cursor: pointer" title="看不清楚，换一张" :width="contentWidth"
                  :height="contentHeight"
                  @click="handleClick"></canvas>
        </div>


      </van-cell-group>
      <br><br><br>
      <van-button type="primary" plain v-if="!isMobileLogin" @click="isMobileLogin=true">切换手机验证码登录</van-button>
      <van-button type="primary" plain v-if="isMobileLogin" @click="isMobileLogin=false">账号密码登录</van-button>
      <van-button type="primary" @click="doLogin">立即登录</van-button>
      <br><a href="/mrege">没有账号？点击注册</a>
    </div>
  </div>
</template>

<script>
  import MHeader from './commoms/MHeader';
  import Toast from "vant/es/toast/index";

  export default {
    components: {MHeader},
    name: "MLogin",
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
        myuser: {
          username: '',
          password: '',
          phonenumber: '',
          dynamicCode: '',
          randomCode: ''
        },
        token: '',
        isMobileLogin: false,
        identifyCode: '',//生成的验证码
        loginSuccessUser: {
          //接受登录成功的用户信息，主要是接收服务器返回的token值
        },
      }
    },
    methods: {

      checkValidateCode: function () {
        if (this.randomCode == this.identifyCode) {
          this.$alert('验证通过', '提示信息', {
            confirmButtonText: '确定'

          });
        } else {
          this.$alert('验证码错误', '提示信息', {
            confirmButtonText: '确定'
          });
        }
      },

      //点击生成随机数 并传给调用它的组件（父组件用changeCode接收）
      handleClick() {
        console.log("***handle");
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
        console.log("***drawpic");
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
      sendRandemCode: function () {
        let url = this.websiteUrl + '/moocdemo/commons/mrcode2?mobile=' + this.myuser.phonenumber;
        let that = this;
        this.axios.get(url)
          .then(function (response) {
            //console.log(response.data);
            if (response.data.code == 200) {
              that.token = response.data.data;
              Toast.success(response.data.msg)

            } else {
              Toast.fail(response.data.msg)
            }
          }).catch(function (error) {
          Toast.fail("发送验证码失败")
        })
      },
      doLogin: function () {
        if (this.identifyCode != this.myuser.randomCode) {
          Toast.fail("验证码验证失败")
          return;
        }
        // console.log('真正去发送登录请求');
        if (this.isMobileLogin == false) {
          //账号密码登录
          let url = this.websiteUrl + '/moocdemo/users/login5';
          let that = this;
          this.axios.get(url, {
            params: {
              username: that.myuser.username,
              password: that.myuser.password,
            }
          })
            .then(function (response) {
              //console.log(response.data);
              if (response.data.code == 200) {

                console.log("登录成功用户对象->" + response.data.data);
                that.loginSuccessUser = response.data.data;

                localStorage.setItem("mytoken", JSON.stringify(that.loginSuccessUser));
                Toast.success(response.data.msg)
                that.$router.push("/homepage");


              } else {
                Toast.fail(response.data.msg);
              }
            }).catch(function (error) {
            Toast.success("登录失败");
          })

        }
        if (this.isMobileLogin == true) {
          //手机登录

          let url = this.websiteUrl + '/moocdemo/users/login4?token=' + this.token;
          let that = this;
          this.axios.get(url, {
            params: {
              mobile: that.myuser.phonenumber,
              validateCode: that.myuser.dynamicCode
            }
          })
            .then(function (response) {
              if (response.data.code == 200) {

                console.log("登录成功用户对象->" + response.data.data);
                that.loginSuccessUser = response.data.data;

                localStorage.setItem("mytoken", JSON.stringify(that.loginSuccessUser));
                Toast.success(response.data.msg)
                that.$router.push("/homepage");


              } else {
                Toast.fail(response.data.msg)
              }
            }).catch(function (error) {
            Toast.success("登录失败")
          })

        }

      }
    },
    watch: {
      identifyCode() {
        this.drawPic()
      }
    },
    mounted() {
      this.drawPic()
      this.handleClick()
    }
  }

</script>

<style scoped>
  .logindiv {
    height: 500px;
    width: 400px;
    border: 1px solid red;
    margin: 0 auto;
  }
</style>
