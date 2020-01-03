<template>
  <div>
    <van-tree-select
      height="155vw"
      :items="items"
      :main-active-index.sync="activeIndex"
    >
      <template slot="content">

        <div v-if="activeIndex === 0">
          <el-row v-for="(noebook,pos) in NoEbookList" :key="pos">
            <hr>
            <el-col :span="24">

              <h2>{{noebook.bookname}}</h2>
              <p>位置：{{noebook.location}}</p>
              <el-button size="mini" round @click="indetails(noebook.bookname)">详情</el-button>
            </el-col>

          </el-row>
        </div>

        <div v-if="activeIndex === 1">
          <van-row v-for="(ebook,pos) in EbookList" :key="pos">
            <hr>
            <el-col :span="24">
              <van-card
                :title="ebook.bookname"
                :thumb="ebook.images">

                <div slot="footer">
                  <el-row>
                    <el-button type="primary" round icon="el-icon-download"><a :href="ebook.detail" target="_blank"
                                                                               :download="ebook.detail" style="color: white;text-decoration: none">下载</a></el-button>
                    <el-button type="primary" round icon="el-icon-tickets"><a :href="ebook.detail" target="_blank" style="color: white;text-decoration: none">阅读</a></el-button>
                  </el-row>


                </div>
              </van-card>

            </el-col>
          </van-row>


        </div>


      </template>
    </van-tree-select>
  </div>
</template>

<script>
  import {Toast} from 'vant';

  export default {
    name: "MClassifyPage",
    data() {
      return {
        activeIndex: 0,
        items: [{text: '纸质书'}, {text: '电子书'}],
        EbookList: [],
        NoEbookList: [],
      }
    },
    mounted() {
      this.initEbook();
      this.initNoEbook();

    },
    methods: {
      initEbook: function () {
//初始化电子书
        let url = this.websiteUrl + '/moocdemo/bookmessage/ebook';
        let that = this;
        this.axios.get(url).then(function (response) {
          if (response.data.code == 200) {
            that.EbookList = response.data.data;
            console.log(that.EbookList.length)
            Toast.success(response.data.msg)
          } else {
            Toast.fail(response.data.msg);
          }
        }).catch(function (error) {
          Toast.fail('失败');
        })

      },
      initNoEbook: function () {
        //初始化纸质书
        let url = this.websiteUrl + '/moocdemo/bookmessage/noebook';
        let that = this;
        this.axios.get(url).then(function (response) {
          if (response.data.code == 200) {
            that.NoEbookList = response.data.data;
            console.log(that.NoEbookList.length)
            Toast.success(response.data.msg)
          } else {
            Toast.fail(response.data.msg);
          }
        }).catch(function (error) {
          Toast.fail('失败');
        })

      },
      indetails: function (bookname) {
        sessionStorage.setItem("targetbookname", bookname)
        this.$router.push("/msearchpage")
      }
    }
  }
</script>

<style scoped>

</style>
