<template>
  <div>
    <el-row v-for="(returnbook,index) in Returnlist" :key="index">
      <el-col :span="8" :offset="8">

        <h2>{{returnbook.bookname}}</h2>
        <p>作者：{{returnbook.authname}}</p>
        <p>已借人数：{{returnbook.usenum}}</p>
        <p>位置：{{returnbook.location}}</p>
        <p>借书日期：{{returnbook.starttime}}</p>
        <p>当前日期：{{getNowFormatDate()}}</p>
        <p>还书日期：{{returnbook.modifytime}}</p>
        <p>截止日期：{{returnbook.deadline}}</p>
        <el-rate
          v-model="returnbook.pingjia"
          show-text>
        </el-rate>
        <hr>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "BookOfBeReturn",
    data() {
      return {
        loginSuccessUser: {},
        Returnlist:[],

      }
    },
    mounted() {
     this.initReturnList()
    },
    methods: {
      initReturnList: function () {
        var loginSuccessUser = JSON.parse(localStorage.getItem("mytoken"))
        // console.log(loginSuccessUser.uid+"****")

        let url = this.websiteUrl + '/moocdemo/lendbook/queryreturn?uid=' + loginSuccessUser.uid;
        let that = this;
        this.axios.get(url).then(function (response) {
          //console.log(response.data);
          if (response.data.code == 200) {
            that.Returnlist = response.data.data;

            // that.$message({
            //   message: response.data.msg,
            //   type: 'success'
            // });
          } else {
            that.$message({
              message: response.data.msg,
              type: 'error'
            });
          }
        }).catch(function (error) {
          that.$message({
            message: '查询还书失败！',
            type: 'error'
          });
        })
      },

      //获取当前日期
      getNowFormatDate: function () {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1
          + month + seperator1 + strDate;
        return currentdate;
      },
    }
  }
</script>

<style scoped>

</style>
