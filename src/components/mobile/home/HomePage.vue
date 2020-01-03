<template>
    <div style="margin-bottom: 60px">

      <van-notice-bar
        text="作为希望工程的重要标志，那双充满渴望的“大眼睛”已成为一个时代的集体记忆。回望过去30年，在党中央的亲切关怀和指导下，希望工程走出了一条取之于社会、用之于社会的崇高公益助学道路。"
        left-icon="volume-o"
      ></van-notice-bar>

      <van-swipe :autoplay="3000" >
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image"style="height: 100%;width: 100%"/>
        </van-swipe-item>
      </van-swipe>
<van-divider :style="{color: '#1989fa'}">好书推荐</van-divider>
      <van-cell-group>
        <van-cell title="西游记" value="中国四大名著之一，长篇神话小说" label="吴承恩" />
        <van-cell title="红楼梦" value="中国四大名著之一，封建爱情小说" label="曹雪芹" />
      </van-cell-group>
      <van-divider :style="{ color: '#1989fa'}">电子书推荐</van-divider>
      <van-row>
       <van-col span="12">
         <van-image
           width="120"
           height="150"
           src="http://images.luogj.cn/79623s.jpg"
         />
       </van-col>
        <van-col span="12">
          <van-image
            width="120"
            height="150"
            src="http://images.luogj.cn/81647s.jpg"
          />
        </van-col>
      </van-row>
      <van-row>
        <van-col span="12">
          <van-image
            width="120"
            height="150"
            src="http://images.luogj.cn/73140s.jpg"
          />
        </van-col>
        <van-col span="12">
          <van-image
            width="120"
            height="150"
            src="http://images.luogj.cn/71157s.jpg"
          />
        </van-col>
      </van-row>
      <van-row>
        <van-col span="12">
          <van-image
            width="120"
            height="150"
            src="http://images.luogj.cn/31307s.jpg"
          />
        </van-col>
        <van-col span="12">
          <van-image
            width="120"
            height="150"
            src="http://images.luogj.cn/47272s.jpg"
          />
        </van-col>
      </van-row>
    </div>
</template>

<script>
    export default {
        name: "HomePage",
      data() {
        return {
          images: [
            'http://images.luogj.cn/1546330761050.gif',
            'http://images.luogj.cn/1546330799507.jpeg',
            'http://images.luogj.cn/1546330782374.jpeg',
          ]
        }
      }
    }
</script>

<style scoped>
  div.van-swipe{
    /*margin-top:46px;*/

    height:200px;
    width:100%;
    background-color: lightskyblue;
    line-height: 160px;
  }
</style>
