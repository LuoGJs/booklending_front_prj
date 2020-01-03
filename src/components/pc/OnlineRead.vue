<template>
  <div>


    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>

        <el-row>
          <el-col :offset="2" :span="20">
            <el-tabs type="card" style="border: 1px solid red;padding: 0px" v-model="activeName"
                     @tab-click="handleClick">
              <el-tab-pane v-for="(c,index) in catalogList" :key="index" style=" padding: 0px;">
                <div slot="label" style="width:80px;margin: 0px;" @click=initbookmessage(c.index)>{{c.cname}}</div>



                <el-row v-for="(book,pos) in booksPager" :key="pos">
                  <el-col :offset="8" :span="8">
                    <!--<el-col  :span="4" v-for="index in 3" :key="index" :offset="index >0 ? 3 : 0">-->
                    <el-card :body-style="{ padding: '10px' }" style="height: 450px">
                      <img :src="book.images"
                           class="image"
                           style="width: 210px;height: 280px"
                      >
                      <div style="padding: 14px;position: relative;height: 350px;width: 250px;bottom: 290px;left: 215px;border: 1px solid red">
                        <span style="font-size: 20px">{{book.bookname}}</span>
                        <div class="bottom clearfix" style="height: 370px" >
                          <span style="line-height: 20px">简介：{{book.briefIntroducation}} </span>

                        </div>
                        <div style="border: 1px solid red;position: relative;bottom:40px;width: 260px;left: -12px">
                          <el-row>
                            <el-button type="primary" round icon="el-icon-download"><a :href="book.detail" target="_blank"
                                                                                       :download="book.detail" style="color: white;text-decoration: none">下载此书</a></el-button>
                            <el-button type="primary" round icon="el-icon-tickets"><a :href="book.detail" target="_blank" style="color: white;text-decoration: none">在线阅读</a></el-button>
                          </el-row>

                        </div>

                      </div>
                    </el-card>
                  </el-col>
                </el-row>

                <!--分页组件开始-->
                <div id="books_pager" STYLE="text-align: center">
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :total="bookMessageList.length">
                  </el-pagination>
                </div>
                <!--分页组件结束-->
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-main>
    </el-container>

    <el-footer style="padding: 0px ; ">
      <Footer style="margin: 0px"></Footer>
    </el-footer>
  </div>

</template>
<script>
  import Header from '../commons/Header';
  import Footer from '../commons/Footer';

  export default {
    name: "OnlineRead",
    components: {
      Header,
      Footer,
    },
    created() {

    },
    mounted() {
      // this.initCatalogList();
    },
    //分页的精华所在
    computed:{
      booksPager:function(){
        return this.bookMessageList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
      }
    },
    data() {
      return {
        activeName:'',
        pageSize:2,
        currentPage:1,
        catalogList: [
          {
            index: 17,
            id: "玄幻小说",
            cname: "玄幻小说"
          },
          {
            index: 18,
            id: "武侠修真",
            cname: "武侠修真"
          },
          {
            index: 19,
            id: "都市言情",
            cname: "都市言情"
          },
          {
            index: 20,
            id: "历史军事",
            cname: "历史军事"
          },
          {
            index: 21,
            id: "科幻小说",
            cname: "科幻小说"
          },
          {
            index: 22,
            id: "网游竞技",
            cname: "网游竞技"
          },
          {
            index: 23,
            id: "网游竞技",
            cname: "网游竞技"
          }
        ],
        bookMessageList:[],
      }
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab , event);
        // console.log(tab.label);
        // console.log(tab.name);
      },

      initbookmessage: function (index) {
        //点击查询，传参index
        // console.log("****" + index)


        let url = this.websiteUrl + '/moocdemo/bookmessage/catalog?Cid='+index;
        let that = this;
        this.axios.get(url).then(function (response) {
          //console.log(response.data);
          if (response.data.code == 200) {
            that.bookMessageList = response.data.data;
            // console.log(that.bookMessageList.length)
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

        const loading = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 1000);
      },


      initCatalogList() {
        let url = this.websiteUrl + '/moocdemo/catalog/ebookcata';
        let that = this;
        this.axios.get(url).then(function (response) {
          //console.log(response.data);
          if (response.data.code == 200) {
            that.catalogList = response.data.data;
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

      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (size) {
        this.pageSize = size;
        console.log(this.pageSize)  //每页下拉显示数据
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        console.log(this.currentPage)  //点击第几页
      }

    }
  }
</script>


<style scoped>
  .el-header {

    padding: 0px;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }


  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
