<template>
  <div>
    <el-row v-for="(lovebook,index) in LoveList" :key="index">
      <el-col :span="24" >

        <h2>{{lovebook.bookname}}</h2>
        <p>作者：{{lovebook.authname}}</p>
        <p>已借人数：{{lovebook.usenum}}</p>
        <p>位置：{{lovebook.location}}</p>
        <el-button type="primary" icon="el-icon-delete" plain="" circle="" @click="deletemylove(lovebook.bookname)"></el-button>
        <hr>
      </el-col>
    </el-row>


  </div>
</template>

<script>
    export default {
        name: "MMyLove",
      data() {
        return {
          loginSuccessUser:{},
          LoveList: [],
        }
      },
      mounted() {
        this.initLoveList();
      },
      methods: {
        initLoveList: function () {
          console.log("*-*-*-*-*-")
          var loginSuccessUser=JSON.parse(localStorage.getItem("mytoken"))
          // console.log(loginSuccessUser.uid+"****")

          let url = this.websiteUrl + '/moocdemo/collection/query?uid='+loginSuccessUser.uid;
          let that = this;
          this.axios.get(url).then(function (response) {
            //console.log(response.data);
            if (response.data.code == 200) {
              that.LoveList = response.data.data;

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
        deletemylove:function (bookname) {
          // 根据书名删除喜爱
          this.loginSuccessUser=JSON.parse(localStorage.getItem("mytoken"));

          this.$confirm('确认取消收藏该书籍?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            let url = this.websiteUrl + '/moocdemo/collection/delete';
            let that = this;
            this.axios.delete(url,{

              params:{
                bookname:bookname,
                uid:that.loginSuccessUser.uid
              }
            }).then(function (response) {
              //console.log(response.data);
              if (response.data.code == 200) {
                that.LoveList = response.data.data;
                that.initLoveList();
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
                message: '查询版块资料失败！',
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
