<template>
  <div>
    <el-row v-for="(it,pos) in itemsPager" :key="pos">
      <el-col :offset="8" :span="8">
      <!--<el-col  :span="4" v-for="index in 3" :key="index" :offset="index >0 ? 3 : 0">-->
        <el-card :body-style="{ padding: '10px' }">
          <img :src="it.pic"
               class="image">
          <div style="padding: 14px;">
            <span>{{it.name}}</span>
            <div class="bottom clearfix">
              <span>{{it.price}} 元</span>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!--分页组件开始-->
    <br>
    <br>
    <br>
    <div id="items_pager" STYLE="text-align: center">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="itemsList.length">
      </el-pagination>
    </div>
    <!--分页组件结束-->

  </div>
</template>

<script>
  export default {
    name: "PagerTest",
    data(){
      return {
        itemsList:[],
        pageSize:3,
        currentPage:1,

      }
    },
    mounted(){
       this.initItemsList();
    },

    //精华所在
    computed:{
      itemsPager:function(){
        return this.itemsList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
      }
    },
    methods:{
      initItemsList:function(){
        let that = this;
        this.axios.get(this.websiteUrl+'/moocdemo/items/').then(function (response) {
          //console.log(response.data);
          if (response.data.code == 200) {


            that.itemsList = response.data.data;
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
            message: '查询失败！',
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


  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 160px;
    height: 160px;
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
