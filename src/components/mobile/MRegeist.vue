<template>
    <div>
      <MHeader></MHeader>

      <div class="regediv">

        <h1>注册页面</h1>
        <van-cell-group>
          <van-field

            v-model="regeuser.username"
            required
            clearable
            label="用户名"
            right-icon="question-o"
            placeholder="请输入用户名"
            @click-right-icon="$toast('question')"
          />



          <van-field

            v-model="regeuser.password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
          />
          <van-field
            v-model="regeuser.mobile"
            label="手机号"
            placeholder="请输入手机号"
          />

          <van-field

            v-model="regeuser.validateCode"
            center
            clearable
            label="短信验证码"
            placeholder="请输入短信验证码"
          >

            <van-button slot="button" size="small" type="primary" @click="senddynamic" >发送验证码</van-button>
          </van-field>
          <van-field v-model="regeuser.randomCode" placeholder="验证码"/>
          <div class="s-canvas" style="position:relative;top: 15px;right: 25px">

            <canvas id="s-canvas" style="cursor: pointer" title="看不清楚，换一张" :width="contentWidth"
                    :height="contentHeight"
                    @click="handleClick"></canvas>
          </div>


        </van-cell-group>
        <br><br><br>

        <van-button type="primary" @click="doRege">立即注册</van-button>
        <van-checkbox style="margin-left: 100px"  v-model="ischecked">
          <a style="color: black; font-size: 15px;" >我已经同意用户许可协议</a>
        </van-checkbox>
      </div>


    </div>
</template>

<script>
  import MHeader from './commoms/MHeader';
  import Toast from "vant/es/toast/index";
    export default {
      components: {MHeader},
        name: "MRegeist",
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

      data(){
        return{
          regeuser: {
            username: '',
            password: '',
            mobile: '',
            validateCode: '',
            randomCode:''
          },
          identifyCode: '',//生成的验证码
          ischecked:false,
          token:''
        }
      },

      methods:{
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

        doRege: function () {
          if (this.identifyCode != this.regeuser.randomCode) {
            Toast.fail("验证码验证失败")
            return;
          }
          if (this.ischecked==false){
            Toast.fail('请勾选同意用户许可协议!')
            return;
          }

          // console.log(this.ischecked + "*****")
          let url = this.websiteUrl + '/moocdemo/users/reg?token=' + this.token;
          let that = this;
          this.axios.post(url, this.regeuser).then(function (response) {
            //console.log(response.data);
            if (response.data.code == 200) {

              Toast.success(response.data.msg)
              that.$router.push("/mlogin");
            } else {
              Toast.fail(response.data.msg);
            }
          }).catch(function (error) {
            Toast.fail("注册失败");
          })

        },
        senddynamic: function () {
          let url = this.websiteUrl +'/moocdemo/commons/mrcode1?mobile=' +this.regeuser.mobile;
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
        this.drawPic()
        this.handleClick()
      }
    }
</script>

<style scoped>
  .regediv {
    height: 500px;
    width: 400px;
    border: 1px solid red;
    margin: 0 auto;
  }
</style>
