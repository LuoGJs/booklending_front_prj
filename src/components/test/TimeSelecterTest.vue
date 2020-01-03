<template>
    <div>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="开始日期"
        :disabled="true"
        :picker-options="this.pickerOptions0">
      </el-date-picker>
      <el-date-picker
        v-model="value2"
        type="date"
        placeholder="结束日期"
        :picker-options="this.pickerOptions1">
      </el-date-picker>
    </div>
</template>

<script>
    export default {
        name: "TimeSelecterTest",

      data(){
        return {
          value1:new Date(),
          value2:'',


          pickerOptions0: {
            disabledDate: (time) => {
              if (this.value2 != "") {
                return time.getTime() >  new Date(this.value2).getTime();
              }
              }
            },
            pickerOptions1: {
              disabledDate: (time) => {
                return time.getTime() < new Date(this.value1).getTime()- 1*24*60*60*1000;//减去一天的时间代表可以选择同一天;
              }
            },

        }
        }

      // data(){
      //   return {
      //     pickerOptions0: {
      //       disabledDate: (time) => {
      //         if (this.value2 != "") {
      //           return time.getTime() > Date.now() || time.getTime() > this.value2;
      //         } else {
      //           return time.getTime() > Date.now();
      //         }
      //
      //       }
      //     },
      //     pickerOptions1: {
      //       disabledDate: (time) => {
      //         return time.getTime() < this.value1 || time.getTime() > Date.now();
      //       }
      //     },
      //     value1:'',
      //     value2:''
      //   }
      // }

    }
</script>

<style scoped>

</style>
