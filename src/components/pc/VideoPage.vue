<template>

  <div>



    <div class="" style="margin-left: 450px;">
      <video
        id="myVideo1"
        class="video-js">
        <source
          src="http://video.luogj.cn/14191243e8254393144436e850138414.mp4"
          type="video/mp4">
      </video>
    </div>


    <div class="" style="margin-left: 450px;">
      <video
        id="myVideo2"
        class="video-js"
      >
        <source
          src="http://video.luogj.cn/temp_uuid_51fbeeafa3da4a49f0aa83e552ca9bf0.mp4"
          type="video/mp4"
        >
      </video>
    </div>


    <div class="" style="margin-left: 450px;">
      <video
        id="myVideo3"
        class="video-js"
      >
        <source
          src="http://video.luogj.cn/temp_uuid_a76971ee061cd900af95805dcc88b0b2.mp4"
          type="video/mp4"
        >
      </video>
    </div>


  </div>
</template>

<script>
  export default {
    name: "VideoPage",
    data() {
      return {

      }
    },
    mounted() {
      this.initVideo();
    },
    methods: {
      initVideo() {
        //初始化视频方法
        let myPlayer1 = this.$video(myVideo1, {
          //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: true,
          //自动播放属性,muted:静音播放
          // autoplay: "muted",
          //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: "auto",
          //设置视频播放器的显示宽度（以像素为单位）
          width: "760px",
          //设置视频播放器的显示高度（以像素为单位）
          height: "380px"
        });

        //初始化视频方法
        let myPlayer2 = this.$video(myVideo2, {
          //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: true,
          //自动播放属性,muted:静音播放
          // autoplay: "muted",
          //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: "auto",
          //设置视频播放器的显示宽度（以像素为单位）
          width: "760px",
          //设置视频播放器的显示高度（以像素为单位）
          height: "380px"
        });

        //初始化视频方法
        let myPlayer3 = this.$video(myVideo3, {
          //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: true,
          //自动播放属性,muted:静音播放
          // autoplay: "muted",
          //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: "auto",
          //设置视频播放器的显示宽度（以像素为单位）
          width: "760px",
          //设置视频播放器的显示高度（以像素为单位）
          height: "380px"
        });
      }
    }
  }
</script>

<style scoped>

</style>
