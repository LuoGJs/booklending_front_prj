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
                <i class="el-icon-user"></i>
                <span slot="title">个人信息</span>
              </el-menu-item>

              <el-submenu index="2" style="margin-left: -50px">
                <template slot="title" style="">
                  <i class="el-icon-reading"></i>
                  <span>借书信息</span>
                </template>
                <el-menu-item index="2-1">已借的书</el-menu-item>
                <el-menu-item index="2-2">已还的书</el-menu-item>

              </el-submenu>
              <el-menu-item index="3" style="margin-left: -50px">
                <i class="el-icon-star-off"></i>
                <span slot="title">我的喜欢</span>
              </el-menu-item>
              <el-menu-item index="4" style="margin-left: -50px">
              <i class="el-icon-tickets"></i>
              <span slot="title">许可协议</span>
            </el-menu-item>
              <el-menu-item index="5" style="margin-left: -50px">
                <i class="el-icon-info"></i>
                <span slot="title">关于我们</span>
              </el-menu-item>
            </el-menu>


          </el-aside>
          <el-container>
            <el-main>
              <div class="main">
                <router-view></router-view>
              </div>
            </el-main>
          </el-container>

        </el-container>
        <el-footer style="padding: 0px"><Footer style="bottom: 0px;margin: 0px"></Footer></el-footer>

      </el-container>

    </div>
</template>

<script>
  import Header from '../commons/Header';
  import Footer from '../commons/Footer';
    export default {
        name: "PersonCenter",
      components: {
        Header,
        Footer,
      },
      methods: {
        handleOpen(key, keyPath) {
          // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          // console.log(key, keyPath);
        },
        handleSelect(key, keyPath){
          switch(key){
            case '1':
              this.$router.push('/personmessage');
              break;
            case '2-1':
              this.$router.push('/bookoflend')
              break;
            case '2-2':
              this.$router.push('/bookofbereturn')
              break;
            case '3':
              this.$router.push('/mylove')
              break;
            case '4':
              this.$router.push('/agreement')
              break;
            case '5':
              this.$router.push('/aboutus')
              break;
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
.el-header{
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
height: 766px;
  width: 100%;
  /*background-color: #f2dede;*/
}
</style>
