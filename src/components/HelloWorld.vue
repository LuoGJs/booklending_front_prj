<template>
  <div>
<el-row>
  <el-col :span="8" :offset="8">
    <h1 style="margin-left:50px;font-size: 40px ;color: #2aabd2">就业项目案例中心</h1>
    <hr>
    <ul>
      <li><a href="/mymavoneditor">mymavoneditor案例</a> </li>
      <li><a href="/logintest">拼图验证</a> </li>
      <li><a href="/logintest2">滑块验证</a> </li>
      <li><a href="/logintest3">前端数字验证码验证</a> </li>
      <li><a href="/logintest4">后端数学公式验证码验证</a> </li>
      <li><a href="/logintest5">后端hutool验证码验证</a> </li>
      <li><a href="/logintest6">后端验证码案例(google kaptcha类验证码)3</a></li>
      <li><a href="/RegTest">手机发送验证码测试</a></li>
      <li><a href="/uploadtest">文件上传案例</a></li>
      <li><a href="/downloadtest">文件下载案例</a></li>
      <li><a href="/pagertest">分页案例</a></li>
      <li><a href="/videotest">视频播放案例</a></li>
      <li><a href="/audiotest">音频播放案例</a></li>
    </ul>
  </el-col>
</el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div ul li{
  list-style: none;



}


div ul li a{
 text-decoration: none;
  font-size: 20px;
  color: black;

}
</style>
