<template>
  <div>
    <NavBar style="position: absolute"></NavBar>
    <div style="border: 1px solid red;margin-top: 46px">
      <router-view />
    </div>
      <van-tabbar route>
        <van-tabbar-item
          replace
          to="/homepage"
          icon="home-o"
        >
          首页
        </van-tabbar-item>
        <van-tabbar-item
          replace
          to="/msearchpage"
          icon="search"
        >
          查找
        </van-tabbar-item>

        <van-tabbar-item
          replace
          to="/mclassifypage"
          icon="apps-o"
        >
          分类
        </van-tabbar-item>

        <van-tabbar-item
          replace
          to="/personpage"
          icon="manager-o"
        >
          个人中心
        </van-tabbar-item>
      </van-tabbar>

  </div>

</template>

<script>

  import NavBar from './commoms/Navbar';

  export default {
    name: "Mindex",
    components: {NavBar},
    data() {
      return {
        currIndex: 0,
        active: 0,
      };
    },
    methods: {
      tab(index, val) {
        this.currIndex = index;
        this.$router.push(val);
      }
    }

  }
</script>

<style scoped>

</style>
