<template>
  <div class="boody">
    <el-row>
      <!--<el-col :span="8" :offset="8">-->
      <!--<el-input placeholder="请输入搜索内容" v-model="book.bookname" class="input-with-select">-->
      <!--<el-button slot="append" icon="el-icon-search"></el-button>-->
      <!--</el-input>-->
      <!--</el-col>-->

      <el-col :span="8" :offset="8">
        <div style="position: relative;top: 0px;left: 0px;z-index: 10">
          <el-autocomplete
            style="width: 400px"

            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入要搜索的资源"
            @input="searchbooksbylike"
            @select="handleSelect">
            <el-button size="large" slot="append" icon="el-icon-search" @click="selectResource"></el-button>
          </el-autocomplete>
        </div>
      </el-col>

    </el-row>
    <!--<el-divider></el-divider>-->
    <hr>
    <el-row v-for="(searchbook,index) in searchbooklist" :key="index">
      <el-col :span="8" :offset="8">
        <!--这里显示搜索的内容 以及按钮借阅，点击后把隐藏的表单显示出来，填写借阅信息-->
        <h2>{{searchbook.bookname}}</h2>
        <p>作者：{{searchbook.authname}}</p>
        <p>类别：{{searchbook.catalog}}</p>
        <p>已借人数：{{searchbook.noebookuser}}</p>
        <p>位置：{{searchbook.location}}</p>

      </el-col>
    </el-row>
    <el-button type="primary" round v-show="flag1" @click="lendthisbook">借阅这本书</el-button><el-button type="warning" icon="el-icon-star-off" circle title="点击收藏" @click="collectthisbook()" v-show="flag1"></el-button>

    <div style="height: 300px;width: 450px;border: 1px solid red;padding: 20px;position: relative;left: 530px;top: 50px;" v-show="isdisplay">
      <el-row>
        <el-col :span="5" :offset="4"><p style="font-size: 18px;line-height: 10px">书&nbsp;名：</p></el-col>
        <el-col :span="10" :offset="0">
          <el-input v-model="lendbookmessage.bookname" :readonly="true"></el-input>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="5" :offset="4"><p style="font-size: 18px;line-height: 10px">姓&nbsp;名：</p></el-col>
        <el-col :span="10" :offset="0">
          <el-input v-model="lendbookmessage.username" :readonly="true"></el-input>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="5" :offset="4"><p style="font-size: 18px;line-height: 10px">借书时间：</p></el-col>
        <el-col :span="10" :offset="0">
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="开始日期"
            :disabled="true"
            :picker-options="pickerOptions0">
          </el-date-picker>
        </el-col>
      </el-row>

      <br>
      <el-row>
        <el-col :span="5" :offset="4"><p style="font-size: 18px;line-height: 10px">还书时间：</p></el-col>
        <el-col :span="10" :offset="0">
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="结束日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </el-col>
      </el-row>
      <br>
      <el-button type="primary" @click="lendbook">借书</el-button>
      <el-button type="primary"  @click="closethisdialog">再想想</el-button>
    </div>
  </div>
</template>
<script>
  let moment = require("moment");
  export default {
    data() {
      return {
        collectbook:{},
        isdisplay:false,
        user: {},
        bookList: [],
        targetbook: {
          id: '',
          bookname: '',
        },
        state: '',
        searchbooklist: [],
        flag1: false,
        lendbookmessage: {
          username: '',
          bookname: '',
          starttime: '',
          deadline: ''
        },
        value1: new Date(),
        value2: '',
        pickerOptions0: {
          disabledDate: (time) => {
            if (this.value2 != "") {
              return time.getTime() > new Date(this.value2).getTime();
            }
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            return time.getTime() < new Date(this.value1).getTime() - 1 * 24 * 60 * 60 * 1000;//减去一天的时间代表可以选择同一天;
          }
        },

      }
    },
    mounted() {

      this.initbooklist();
      // this.targetbook.id = this.$route.query.bookid;
      this.state = sessionStorage.getItem("targetbookname");
      sessionStorage.removeItem("targetbookname");
      console.log(this.state)
      this.searchbooksbylike();
      if (localStorage.getItem("mytoken") != null) {
        this.user = JSON.parse(localStorage.getItem("mytoken"));
      }

    },
    created() {

    },
    methods: {
      collectthisbook:function(){
        this.collectbook.bookname = this.state;
       var loginSuccessUser=JSON.parse(localStorage.getItem("mytoken"))
        this.collectbook.uid=loginSuccessUser.uid;


        let url = this.websiteUrl + '/moocdemo/collection/save?id='+this.collectbook.uid ;
        let that = this;
        this.axios.get(url, {
          params: {
            bookname: that.collectbook.bookname,

          }

        }).then(function (response) {
          //console.log(response.data);
          if (response.data.code == 200) {

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
            message: '收藏失败！',
            type: 'error'
          });
        })

      },

      closethisdialog:function(){
        this.isdisplay=false;
      },

      lendbook: function () {
// this.lendbookmessage.starttime=this.value1;
// this.lendbookmessage.deadline=this.value2;
        if(this.value2==''||this.value2==null||this.value2==undefined){
          this.$message({
            message: '请输入还书日期！',
            type: 'error'
          });
          return;
        }
        this.lendbookmessage.starttime = moment(this.value1).format('YYYY-MM-DD')
        this.lendbookmessage.deadline = moment(this.value2).format('YYYY-MM-DD')
        //
        // console.log(this.lendbookmessage.starttime + "*-*-*-")
        // console.log(this.lendbookmessage.deadline + "*-*-*-")
        // console.log(this.lendbookmessage.username + "*-*-*-")
        // console.log(this.lendbookmessage.bookname + "*-*-*-")

        //根据lendbookmessage发送aious请求，在数据库中添加一项
        let url = this.websiteUrl + '/moocdemo/lendbook/save' ;
        let that = this;
        this.axios.post(url, this.lendbookmessage).then(function (response) {
          //console.log(response.data);
          if (response.data.code == 200) {

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
            message: '申请失败！',
            type: 'error'
          });
        })


        this.isdisplay=false;

      },
      querySearchAsync(queryString, cb) {
        var bookList = this.bookList;
        var results = queryString ? bookList.filter(this.createStateFilter(queryString)) : bookList;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 1000 * Math.random());
      },

      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
        console.log(this.state)


      },
      selectResource: function () {

        this.searchbooksbylike();


        const loading = this.$loading({
          lock: true,
          text: '拼命搜索中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);

      },
      initbooklist: function () {

        let url = this.websiteUrl + '/moocdemo/bookmessage/noebook';
        let that = this;
        this.axios.get(url).then(function (response) {
          //console.log(response.data);
          if (response.data.code == 200) {
            that.bookList = response.data.data;
            for (let book of that.bookList) {
              //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
              book.value = book.bookname;
            }
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
      },

      searchbooksbylike: function () {
        if (this.state === null) {

        }
        else {
          // this.$message({
          //   message: "成功",
          //   type: 'success'
          // });

          console.log(this.state + "*****")


          //根据state值查
          let url = this.websiteUrl + '/moocdemo/bookmessage//noebookbybookname';
          let that = this;
          this.axios.get(url, {
            params: {
              bookname: that.state,
            }

          }).then(function (response) {
            //console.log(response.data);
            if (response.data.code == 200) {
              that.searchbooklist = response.data.data;
              console.log(that.searchbooklist.length)
              that.$message({
                message: response.data.msg,
                type: 'success'
              });
              that.flag1 = true;
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
        }
      },
      lendthisbook: function () {
        this.lendbookmessage.bookname = this.state;
        this.lendbookmessage.username=this.user.username;
        this.isdisplay=true;
      }

    }
  }
</script>

