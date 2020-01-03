<template>

  <div id="dd3">
    <div id="dd1">
      <div id="d1">
        <span>关于我们</span>
        <div class="w">
          <div></div>
        </div>
      </div>
      <div id="d2"></div>
      <div id="d3">
        为其塑造全新品牌视觉形象，其是一家座落于国家软件产业基地XXX内的智能科技公司,该公司是中国XX进入XX增值业务和拥有语音增值业务产品的企业，
        其软件产品在 电信运商、政府信息化、大中型企业 等行业客户领域得到了广泛应用。
        连续多年被认定为国家规划布局内XX软件企业、国家高新技术企业、广州软件园XX企业、国家计算机信息系统集成XXX资质企业、
        重信用守合同企业、省级安全技术防范XX企业，2003年获得由美国XXX认可的CMM（软件能力成熟度模型）XX级证书
      </div>
    </div>
    <div id="dd2">
      <div id="d4">
        <span>企业愿景</span>
        <div class="w">
          <div></div>
        </div>
      </div>
      <div id="d5"></div>
      <div id="d6">
        <ol>
          <li><a href="#">愿 景：70年后世人 还认同我们</a></li>
          <li><a href="#">使 命：品牌强国 创意立世</a></li>
          <li><a href="#">价值观：责任、真诚、尊重、团队</a></li>
          <li><a href="#">文化核心：见和同解、律和同修、口和无诤</a></li>
          <li><a href="#">身和同往——"六和"文化</a></li>
          <li><a href="#">实战观点：好策划用"脚"走，用"嘴"问，</a></li>
          <li><a href="#">用"脑"想：</a></li>
          <li><a href="#">实战观点：换一个角度，换一个世界</a></li>
        </ol>
      </div>
    </div>
  </div>


</template>

<script>
    export default {
        name: "AboutUs"
    }
</script>

<style scoped>

  #dd1 {width: 800px;height: 300px;position: absolute}
  #dd1:hover .w div {width: 100%}
  #dd1:hover span {opacity: 1;margin-top: -10px;margin-left: -10px}
  #d1 {height: 50px;display: flex}
  #d1 span {font-size: 20px;color: #02B2B5;opacity: 0;transition: all 0.1s;margin-left: -80px}
  #d4 span {font-size: 20px;color: #02B2B5;opacity: 0;transition: all 0.1s;margin-left: -80px}
  #d2 {width: 495px;height: 310px;background: url("http://images.luogj.cn/ddd.jpg") no-repeat}
  #d2:hover {box-shadow: 0px 8px 10px #484b49}
  #d3 {width: 720px;height: 200px;word-wrap: break-word;margin-top: 10px}
  #d4 {height: 50px;display: flex}
  #dd2 {width: 800px;height: 300px;position: absolute;bottom: 0;transition: all 1s}
  #dd2:hover .w div {width: 100%}
  #dd2:hover span {opacity: 1;margin-top: -10px;margin-left: -10px}
  #d5 {width: 350px;height: 310px;background: url("http://images.luogj.cn/u=1806047429,2669047046&fm=26&gp=0.jpg") no-repeat;position: absolute;left: 0;margin-top: 15px}
  #d5:hover {box-shadow: 0px 8px 10px #484b49}
  #d6 {width: 300px;height: 310px;font-size: 16px;position: absolute;right: 110px}
  #d6 li {list-style: none;margin-bottom: 20px}
  #d6 a {text-decoration: none;cursor: pointer}
  #d6 a:link {color: #02B2B5}
  #d6 a:hover {color: deepskyblue;text-decoration: underline}
  #d6 a:active {color: blue}
  #d6 a:visited {color: red}
  #dd3 {width: 80%;height: 800px;position: relative;left: 200px;top: 20px}
  .w {flex: 1;height: 10px;background-color: #eee}
  .w div {width: 10%;height: 10px;background-color: #02B2B5;transition: all 0.3s}

</style>
