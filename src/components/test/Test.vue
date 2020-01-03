<template>
  <div id="date_time_picker">



    <van-field v-model="timeValue" placeholder="选择的日期结果" readonly  @click="showPopFn()"/>

    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker v-model="currentDate" type="date" @change="changeFn()" @confirm="confirmFn()" @cancel="cancelFn()" />
    </van-popup>

  </div>
</template>

<script>




  export default {
    name: "Test",

    data() {
      return {
        msg: '',
        currentDate: new Date(),
        changeDate: new Date(),
        show: false, // 用来显示弹出层
        timeValue: ''
      }
    },
    methods: {
      showPopFn() {
        this.show = true;
      },
      showPopup() {
        this.show = true;
      },
      changeFn() { // 值变化是触发
        this.changeDate = this.currentDate // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
      },
      confirmFn() { // 确定按钮
        this.timeValue = this.timeFormat(this.currentDate);
        this.show = false;
      },
      cancelFn(){
        this.show = true;
      },
      timeFormat(time) { // 时间格式化 2019-09-08
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        return year + '-' + month + '-' + day + ''
      }
    },
    mounted() {
      this.timeFormat(new Date());
    }


  }
</script>

<style scoped>

</style>
