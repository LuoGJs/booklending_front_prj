<template>
  <div>
  <van-nav-bar
    title="我的图书馆"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
</div>

</template>

<script>
    export default {
        name: "MHeader",
      data(){
          return{

          }
      },
      mounted(){

      },
      methods: {
        onClickLeft() {
          this.$router.go(-1);
        },
      }
    }
</script>

<style scoped>

</style>
