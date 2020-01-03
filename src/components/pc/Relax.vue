<template>
  <div>
    <el-container>
      <el-header><Header></Header></el-header>
      <el-container>
        <el-aside width="370px">
          <!--导航菜单-->
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            @select="handleSelect">

            <el-menu-item index="1"style="margin-left: -50px">
              <i class="el-icon-headset"></i>
              <span slot="title">听歌啊</span>
            </el-menu-item>

            <el-menu-item index="2"style="margin-left: -50px">
              <i class="el-icon-video-camera"></i>
              <span slot="title">看视频</span>
            </el-menu-item>

            <el-submenu index="3" style="margin-left: -50px">
              <template slot="title" style="">
                <i class="el-icon-basketball"></i>
                <span>打篮球</span>
              </template>
              <el-menu-item index="3-1">已借的书</el-menu-item>
              <el-menu-item index="3-2">已还的书</el-menu-item>

            </el-submenu>

          </el-menu>


        </el-aside>
        <el-container>
          <el-main style="padding: 0px">
            <div class="main">
              <router-view></router-view>
            </div>
          </el-main>
        </el-container>
      </el-container>
<el-footer><Footer style="bottom: 0px"></Footer></el-footer>
    </el-container>


  </div>
</template>

<script>
  import Header from '../commons/Header';
  import Footer from '../commons/Footer';
  export default {
    name: "Relax",
    components: {
      Header,
      Footer,
    },
    data(){
      return{

      }
    },
    methods: {
      handleOpen:function(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose:function(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath){
        switch(key){
          case '1':
            this.$router.push('/audiopage');
            break;
          case '2':
            this.$router.push('/videopage')
            break;
          // case '3':
          //   this.$router.push('/Page3')
          //   this.breadcrumbItems  = ['导航三']
          //   break;
        }
      },
    }
  }
</script>

<style scoped>
  .body{
    height: 870px;
    width: 100%;
    background-color: #f2dede;

  }
  .el-header, .el-footer {
    /*background-color: #B3C0D1;*/

    padding: 0px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    /*color: #333;*/
    /*text-align: center;*/
    /*line-height: 160px;*/
    padding: 0px;
  }
  .main{
    height: 808px;
    width: 100%;
    /*background-color: silver;*/
    /*margin-top: 10px;*/
  }
</style>
