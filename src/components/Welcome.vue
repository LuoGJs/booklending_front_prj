<template>
    <div></div>
</template>

<script>
    export default {
        name: "Welcome",
      mounted(){
        //仅仅判断此时此刻，访问的设备是移动端设备还是PC端。
        //移动端设备(手机，平板)--->index
        //Pc --->pIndex
        if (this._isMobile()) {
          console.log("手机端");
          this.$router.replace('/homepage');
        } else {
          console.log("pc端");
          this.$router.replace('/pmainpage');
        }
      },
      methods:{
        //判断是否是移动端
        _isMobile() {
          let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
          return flag;
        }
      }
    }
</script>

<style scoped>

</style>
