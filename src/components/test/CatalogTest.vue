<template>
  <div>
    <Header></Header>

    <!--以下是tab页面-->
    <br>
    <br>
    <br>
    <br>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="(c,index) in catalogList" :key="index" :label="c.id" :name="c.cname">{{c.cname}}
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import Header from '../commons/Header';

  export default {
    name: "CatalogTest",
    components: {
      Header
    },
    data() {
      return {
        activeName: '哲学sss', //默认哲学sss版块被选中。。。。
        catalogList: []
      }
    },
    mounted() {
      this.initCatalogList();
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        console.log(tab.label);
        console.log(tab.name);
      },

      initCatalogList() {
        let url = this.websiteUrl + '/moocdemo/catalog/';
        let that = this;
        this.axios.get(url).then(function (response) {
          //console.log(response.data);
          if (response.data.code == 200) {
            that.catalogList = response.data.data;
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
      }

    }
  }
</script>

<style scoped>

</style>
