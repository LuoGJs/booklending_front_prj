<template>
  <div>
    <el-row>
      <el-col :offset="0" :span="24">
        <el-tabs type="card" style="border: 1px solid red;padding: 0px"
                 @tab-click="handleClick">
          <el-tab-pane v-for="(c,index) in catalogList" :key="index" style=" padding: 0px;">
            <div slot="label" style="width:60px;margin: 0px;" @click=initbookmessage(c.index)>{{c.cname}}</div>


            <el-row v-for="(book,pos) in booksPager" :key="pos">
              <hr>
              <el-col :span="8" :offset="8">
                <!--这里显示搜索的内容 以及按钮借阅，点击后把隐藏的表单显示出来，填写借阅信息-->
                <h2>{{book.bookname}}</h2>
                <p>位置：{{book.location}}</p>
               <el-button  size="mini" round @click="indetails(book.id)">详情</el-button>
              </el-col>

            </el-row>

<hr>
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
  </div>
</template>
<script>
  export default {
    data() {
      return {
        flag1: false,
        isdisplay: false,
        pageSize: 5,
        currentPage: 1,
        catalogList: [
          {
            index: 1,
            id: "哲学",
            cname: "哲学"
          },
          {
            index: 2,
            id: "科学",
            cname: "科学"
          },
          {
            index: 3,
            id: "政治",
            cname: "政治"
          },
          {
            index: 4,
            id: "军事",
            cname: "军事"
          },
          {
            index: 5,
            id: "经济",
            cname: "经济"
          },
          {
            index: 6,
            id: "教育",
            cname: "教育"
          },
          {
            index: 7,
            id: "体育",
            cname: "体育"
          },
          {
            index: 8,
            id: "文学",
            cname: "文学"
          },
          {
            index: 9,
            id: "艺术",
            cname: "艺术"
          },
          {
            index: 10,
            id: "历史",
            cname: "历史"
          },
          {
            index: 11,
            id: "医药",
            cname: "医药"
          },
          {
            index: 12,
            id: "农业",
            cname: "农业"
          },
          {
            index: 13,
            id: "工业",
            cname: "工业"
          },
          {
            index: 14,
            id: "交通",
            cname: "交通"
          },
          {
            index: 15,
            id: "航空",
            cname: "航空"
          },
          {
            index: 16,
            id: "其他",
            cname: "其他"
          },
        ],
        bookMessageList: [],
      }
    },
    computed: {
      booksPager: function () {
        return this.bookMessageList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
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


        let url = this.websiteUrl + '/moocdemo/bookmessage/catalog?Cid=' + index;
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
      },
      lendthisbook: function () {
        this.lendbookmessage.bookname = this.state;
        this.lendbookmessage.username = this.user.username;
        this.isdisplay = true;
      },

      indetails:function (id) {
// 根据传过来的id发送axious请求，得到书对象，获取书名加入seesionstorg
        let url = this.websiteUrl + '/moocdemo/bookmessage/bookmessageid?id='+id;
        let that = this;
        this.axios.get(url).then(function (response) {
          //console.log(response.data);
          if (response.data.code == 200) {
            let mybook = response.data.data;
            sessionStorage.setItem("targetbookname",mybook.bookname)
            that.$router.push("/search")
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

    }
  }
</script>
