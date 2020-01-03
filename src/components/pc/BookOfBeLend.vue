<template>
  <div>

    <el-row v-for="(lendbook,index) in Lendlist" :key="index">
      <el-col :span="8" :offset="8">

        <h2>{{lendbook.bookname}}</h2>
        <p>作者：{{lendbook.authname}}</p>
        <p>已借人数：{{lendbook.usenum}}</p>
        <p>位置：{{lendbook.location}}</p>
        <p>借书日期：{{lendbook.starttime}}</p>
        <p>当前日期：{{getNowFormatDate()}}</p>
        <p>还书截止日期：{{lendbook.deadline}}</p>
        <el-button @click="returnthisbook(lendbook)" v-if="!lendbook.flag">还书</el-button><b style="color:green" v-if="lendbook.flag">已还</b>
        <i class="el-icon-warning-outline" style="color: red" v-if="isoverday(lendbook.deadline)">已逾期</i>
        <hr>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "BookOfBeLend",
    data() {
      return {
        loginSuccessUser: {},
        Lendlist: [],

      }
    },
    mounted() {
      this.initLendList();
    },
    methods: {
      isoverday: function (deadline) {
        if (this.stringToDate(this.getNowFormatDate()) - this.stringToDate(deadline) > 0) {
          return true;
        } else {
          return false;
        }


      },

      initLendList: function () {
        var loginSuccessUser = JSON.parse(localStorage.getItem("mytoken"))
        // console.log(loginSuccessUser.uid+"****")

        let url = this.websiteUrl + '/moocdemo/lendbook/query?uid=' + loginSuccessUser.uid;
        let that = this;
        this.axios.get(url).then(function (response) {
          //console.log(response.data);
          if (response.data.code == 200) {
            that.Lendlist = response.data.data;

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
            message: '查询版块资料失败！',
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

      //这是字符串转日期的方法
      stringToDate: function (dateStr, separator) {
        if (!separator) {
          separator = "-";
        }
        var dateArr = dateStr.split(separator);
        var year = parseInt(dateArr[0]);
        var month;
        if (dateArr[1].indexOf("0") == 0) {
          month = parseInt(dateArr[1].substring(1));
        } else {
          month = parseInt(dateArr[1]);
        }
        var day = parseInt(dateArr[2]);
        var date = new Date(year, month - 1, day);
        return date;
      },

      returnthisbook: function (lendBookView) {

        this.$confirm('确认还书?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发一个请求，修改这个记录，把flag改成true
          let url = this.websiteUrl + '/moocdemo/lendbook/update';
          let that = this;
          console.log(this.loginSuccessUser.uid+"*-*-*-")
          this.axios.put(url,lendBookView).then(function (response) {
            if (response.data.code == 200) {
              // that.Lendlist = response.data.data;
              that.initLendList();
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
              message: '还书失败！',
              type: 'error'
            });
          })

        }).catch(() => {

        });


      }
    }
  }
</script>

<style scoped>

</style>
