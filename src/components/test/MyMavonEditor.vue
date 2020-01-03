<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="markdown-body" v-html="htmlContent" >

        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="20" :offset="2">
        <div id="main">
          <mavon-editor v-model="mdContent" @change="change"/>
        </div>
        <div>
          <el-button @click="showMdContent">显示MD内容</el-button>
          <el-button @click="showHtmlContent">显示HTML内容</el-button>
        </div>
      </el-col>
    </el-row>
  </div>


</template>

<script>
    export default {
        name: "MyMavonEditor",
      data(){
        return{

          htmlContent:"",
          mdContent:"",
        }
      },
      methods:{
        change(value, render) {
          // render 为 markdown 解析后的结果
          this.htmlContent = render;
          //this.article.mdcontent = this.plainContent
        },
        showMdContent: function () {
          console.log(this.mdContent);
        },

        showHtmlContent: function () {
          console.log(this.htmlContent);
        }
      }
    }

</script>

<style scoped>

</style>
