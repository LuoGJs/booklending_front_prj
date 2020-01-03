<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6"
            style="border:1px solid #aaa;border-radius: 10px;padding:20px 20px;display: inline-block;">
      <div>
        AudioJs在线音频播放案例<br><br>
      </div>

      <div class="test_two_box">
        <audio controls>
          <source
            src="http://media.simoniu.com/Applause.mp3"
            type="audio/mpeg"
          >
        </audio>
      </div>

    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "AudioTest",
    data(){
      return{

      }
    },
    mounted(){

    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
