<template>
  <van-pull-refresh
    v-model="isLoading"
    success-text="刷新成功"
    @refresh="onRefresh"
  >
    <div style="width: 100%;height: 680px;margin-bottom: 46px">
      <van-search
        style="margin-top: 10px"
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">&nbsp;&nbsp;&nbsp;搜&nbsp;&nbsp;&nbsp;&nbsp;索&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </van-search>
      <hr>

<div>
  <van-row v-for="(searchbook,index) in searchbooklist" :key="index">
    <van-col :span="12" :offset="6">

      <h2>{{searchbook.bookname}}</h2>
      <p>作者：{{searchbook.authname}}</p>
      <p>类别：{{searchbook.catalog}}</p>
      <p>已借人数：{{searchbook.noebookuser}}</p>
      <p>位置：{{searchbook.location}}</p>
      <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="lendPopup(searchbook.bookname)">借阅</van-button>
      <van-button  icon="star-o" @click="collectthisbook(searchbook.bookname)" title="点击收藏">收藏</van-button>
      <van-popup
        position="bottom"
        round

        :style="{ height: '40%' }"
        v-model="pshow">

        <van-cell-group>
          <van-field v-model="lendbookmessage.username" label="姓名"  disabled/>
          <van-field v-model="lendbookmessage.bookname" label="书名"  disabled/>
          <van-field v-model="lendbookmessage.starttime"  readonly label="开始日期"/>
          <van-field v-model="lendbookmessage.deadline" label="截止日期" placeholder="选择的日期结果" readonly  @click="showPopFn()"/>
          <van-popup v-model="dshow" position="bottom" :style="{ height: '40%' }">
            <van-datetime-picker v-model="currentDate"
                                 :min-date="minDate"
                                 :max-date="maxDate"
                                 type="date"
                                 @change="changeFn()"
                                 @confirm="confirmFn()"
                                 @cancel="cancelFn()" />
          </van-popup>

        </van-cell-group>
        <van-button plain type="primary" @click="mylendbook">确定提交</van-button>
        <van-button plain type="info" @click="closethisdialog">取消</van-button>
        <!--<van-datetime-picker-->
          <!--v-model="currentDate"-->
          <!--type="date"-->
          <!--:min-date="minDate"-->
          <!--:max-date="maxDate"-->
          <!--:formatter="formatter"-->
        <!--/>-->


      </van-popup>
<hr>
    </van-col>
  </van-row>
</div>



    </div>
  </van-pull-refresh>
</template>

<script>
    import Notify from "vant/es/notify/index";
    import { Toast } from 'vant';

    export default {
          name: "MSearchPage",
      data(){
            return{
              user: {},
              dshow:false,
              pshow: false,
              isLoading: false,
              value:'',
              searchbooklist:[],
              collectbook:{},
              minDate: new Date(),
              //此处应该限制最长期限为一年...
              maxDate: new Date(new Date().getFullYear()+1,(new Date().getMonth()),new Date().getDate()),
              currentDate: new Date(),
              changeDate: new Date(),
              timeValue: '',
              lendbookmessage: {
                username: '',
                bookname: '',
                starttime: this.timeFormat(new Date()),
                deadline: ''
              },
            }
      },
      mounted(){
        if (localStorage.getItem("mytoken") != null) {
          this.user = JSON.parse(localStorage.getItem("mytoken"));
        }else {
          Notify({ type: 'warning', message: '请先登录' });
          //下面转到登录界面
          this.$router.push("/mlogin");
        }

        if(sessionStorage.getItem("targetbookname")!=null){
         this.value=sessionStorage.getItem("targetbookname");
         sessionStorage.removeItem("targetbookname");
         this.onSearch();

        }
      },

      methods:{
        collectthisbook:function(bookname){
          this.collectbook.bookname=bookname;
          this.collectbook.uid=this.user.uid;

          let url = this.websiteUrl + '/moocdemo/collection/save?id='+this.collectbook.uid ;
          let that = this;
          this.axios.get(url, {
            params: {
              bookname: that.collectbook.bookname,

            }

          }).then(function (response) {
            //console.log(response.data);
            if (response.data.code == 200) {

              Toast.success(response.data.msg)
            } else {
              Toast.fail(response.data.msg)
            }
          }).catch(function (error) {
            Toast.fail("收藏失败")
          })

        },
        mylendbook:function(){

          if(this.lendbookmessage.deadline==''||this.lendbookmessage.deadline==null||this.lendbookmessage.deadline==undefined){
         Toast.fail("请输入还书日期！")
            return;
          }
          // this.lendbookmessage.starttime = moment(this.value1).format('YYYY-MM-DD')
          // this.lendbookmessage.deadline = moment(this.value2).format('YYYY-MM-DD')

          let url = this.websiteUrl + '/moocdemo/lendbook/save' ;
          let that = this;
          this.axios.post(url, this.lendbookmessage).then(function (response) {
            //console.log(response.data);
            if (response.data.code == 200) {

             Toast.success(response.data.msg)
            } else {
             Toast.fail(response.data.msg)
            }
          }).catch(function (error) {
            Toast.fail("借书失败")
          })


          this.pshow = false;


        },
        closethisdialog:function(){
          this.pshow = false;
    },
        showPopFn() {
          this.dshow = true;
        },
        changeFn() { // 值变化是触发
          this.changeDate = this.currentDate // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
        },
        confirmFn() { // 确定按钮
          this.lendbookmessage.deadline = this.timeFormat(this.currentDate);
          this.dshow = false;
        },
        cancelFn(){
          this.show = true;
        },
        timeFormat(time) { // 时间格式化 2019-09-08
          let year = time.getFullYear();
          let month = time.getMonth() + 1;
          let day = time.getDate();
          return year + '-' + month + '-' + day + ''
        },


        lendPopup:function(bookname){
          this.lendbookmessage.bookname=bookname;
          this.lendbookmessage.username=this.user.username;
          this.pshow = true;

        },

        onRefresh() {
          setTimeout(() => {
            this.$toast('刷新成功');
            this.isLoading = false;
            this.count++;
          }, 500);
          this.onSearch();
        },
            onSearch:function () {
              if (this.value === null||this.value==="") {
                Notify({ type: 'warning', message: '请输入搜索内容！' });

              }else {


                let url = this.websiteUrl + '/moocdemo/bookmessage//booknamelike';
                let that = this;
                this.axios.get(url, {
                  params: {
                    bookname: that.value,
                  }

                }).then(function (response) {
                  //console.log(response.data);
                  if (response.data.code == 200) {
                    that.searchbooklist = response.data.data;
                    console.log(that.searchbooklist.length)
                    if (that.searchbooklist.length>0) {
                      Toast.success('成功');
                    }else {
                      Toast('搜索内容不存在，请重新输入');
                    }


                  } else {
                    Toast.fail('失败');
                  }
                }).catch(function (error) {
                  Toast.fail('失败');
                })



              }


            },

      }
    }
</script>

<style scoped>

</style>
