<template>
  <div class="body">

    <!--引用Header组件-->
    <Header style="padding: 0px;margin: 0px"></Header>
    <!--巨幕-->

    <img style="position: relative;top: -2px; left: 0px; width: 100%;height: 400px;position: relative;z-index: 10;margin: 0px;padding: 0px" src="http://images.luogj.cn/timg.png"/>
    <div>

      <main class="mainbody">

        <div class="serchbox">
          <el-row>
            <el-col :span="5" :offset="4">
              <div style="position: relative;top: -160px;left: 100px;z-index: 1">
                <el-image :src="src"></el-image>
              </div>
            </el-col>

            <el-col :span="8">
              <div style="position: relative;top: 20px;left: 0px;z-index: 10">
                <el-autocomplete
                  style="width: 400px"

                  v-model="state"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入要搜索的资源"
                  @select="handleSelect">
                  <el-button size="large" slot="append" icon="el-icon-search" @click="selectResource"></el-button>
                </el-autocomplete>
              </div>
            </el-col>

          </el-row>

        </div>
        <div class="container"style="position: relative;top: -200px;z-index: 10"  >
          <!--文章模块-头部-->
          <div class="row article-header" style="position: relative;top: -10px">
            <div class="col-md-1">
              <p>馆长推荐</p>
            </div>
            <div class="col-md-1 col-md-offset-10">
              <p class="text-right more"><a href="/searchpage">更多</a></p>
            </div>
          </div>

          <!--文章模块-内容-->
          <div class="row article-content">
            <div class="col-md-6">
              <div>
                <p class="article-title"><a href="/classify">西游记</a></p>
                <p class="article-content">中国四大名著之一，长篇神话小说</p>
                <p class="article-review"><span>文学</span><span>吴承恩</span>
                  <span class="num"><span class="el-icon-view"></span> 86</span></p>
              </div>
            </div>
            <div class="col-md-6">
              <div>
                <p class="article-title"><a href="/classify">红楼梦</a></p>
                <p class="article-content">中国四大名著之一，古典封建爱情小说。</p>
                <p class="article-review"><span>文学</span><span>曹雪芹</span>
                  <span class="num"><span class="el-icon-view"></span> 24</span></p>
              </div>
            </div>
            <div class="col-md-6">
              <div>
                <p class="article-title"><a href="/classify">哲学的故事</a></p>
                <p class="article-content">外国牛逼人写的牛逼逻辑论文</p>
                <p class="article-review"><span>哲学</span><span>威尔·杜兰特</span> <span
                  class="num"><span class="el-icon-view"></span> 31</span></p>
              </div>
            </div>
            <div class="col-md-6">
              <div>
                <p class="article-title"><a href="/classify">大问题：简明哲学导论</a></p>
                <p class="article-content">这个更牛逼，我也不知道他说了啥</p>
                <p class="article-review"><span>哲学</span><span>罗伯特·所罗门</span> <span
                  class="num"><span class="el-icon-view"></span> 61</span></p>
              </div>
            </div>

          </div>

        </div>
      </main>


    </div>


    <Footer style="position: relative; bottom: 0px"></Footer>
    <el-backtop :bottom="50">

    </el-backtop>
  </div>
</template>

<script>

  import Header from '../commons/Header';
  import Footer from '../commons/Footer';

  export default {
    name: "PMainPage",
    components: {
      Header,
      Footer,
    },
    data() {
      return {
        // item:{},//给下个界面传值所用
        bookList: [],
        state: '',
        timeout: null,
        src: 'http://q2mwrkwv6.bkt.clouddn.com/logo.png'
      }
    },
    methods: {

      selectResource: function () {
        const loading = this.$loading({
          lock: true,
          text: '拼命搜索中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
// this.$router.push("/lendreadpage");
        this.$router.push({
          path:'/search',
          // query:{bookid:this.item.id.toString()}
        });
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
        // console.log(this.state.toString())
          sessionStorage.setItem("targetbookname", this.state.toString())
        // this.item=item;
        // console.log(this.item)
      },
      
      initbooklist:function () {

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
      }
    },
    mounted() {
     this.initbooklist();
    }
  }
</script>

<style scoped>
  @import "../../assets/minified_css/index.min.css";
  @import "../../assets/vendor/bootstrap-3.3.7-dist/css/bootstrap.min.css";

  .body{
    margin: 0px;
    padding: 0px;
  }
  .serchbox {
    /*border: 1px solid red;*/
    margin-top:100px;
  }

  .mainbody {
    border: 1px solid red;
    position: relative;
    z-index: 10;

    /*height: 1200px;*/
    /*margin-top: -335px;*/
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
