<template>
  <div style="background-color: #EBEBEB;min-height:900px">
    <div style="width:100%;background-color: #636363; height: 45px; overflow: hidden">
            <span class="demonstration" style="float:left;padding-top:10px;color:white;margin-left:1%">
             <a href="/pmainpage" style="color: white; text-decoration: none;font-size: 18px"> <i class="el-icon-back"></i>网站首页 </a>
            </span>
      <!--<span  style="float:left;padding:5px;color:white;margin-left:2%;width:15%">-->
                <!--<el-input-->
                  <!--placeholder="请输入"-->
                  <!--icon="search"-->
                  <!--v-model="searchCriteria"-->
                  <!--:on-icon-click="handleIconClick">-->
                <!--</el-input>-->
            <!--</span>-->
      <span class="demonstration" style="float:right;padding-top:10px;margin-right:1%">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link" style="color:white">
                    {{user.username}}<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><a href="/personmessage" style="text-decoration:none">个人信息</a></el-dropdown-item>
                    <el-dropdown-item><a href="#" @click="doLogout">&nbsp;退出登录</a></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </span>
    </div>

    <div style="margin-top:5px">
      <el-row :gutter="10">
        <el-col :xs="4" :sm="4" :md="4" :lg="4">
          <div>
            <el-menu default-active="1" class="el-menu-vertical-demo" style="min-height:900px" @select="handleSelect">
              <el-menu-item index="1"><i class="el-icon-search"></i>搜索</el-menu-item>
              <el-menu-item index="2"><i class="el-icon-menu"></i>图书分类</el-menu-item>
              <el-menu-item index="3"><i class="el-icon-setting"></i>设置</el-menu-item>
            </el-menu>
          </div>
        </el-col>
        <el-col :xs="20" :sm="20" :md="20" :lg="20">
          <!--<div>-->
            <!--<div style="border: 1px solid #A6A6A6; border-radius:6px; padding:5px; margin:2px; background-color: white">-->
              <!--<el-breadcrumb separator="/">-->
                <!--<el-breadcrumb-item v-for="item in breadcrumbItems">{{item}}</el-breadcrumb-item>-->
              <!--</el-breadcrumb>-->
            <!--</div>-->
          <!--</div>-->

          <div style="margin-top:10px">
            <router-view></router-view>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {

    mounted(){

        if(localStorage.getItem("mytoken")!=null){
          this.user = JSON.parse( localStorage.getItem("mytoken"));
        }


      },
    data(){
      return {
        // searchCriteria: '',
        breadcrumbItems: ['导航一'],
        user:{

        },
      }
    },

    methods:{
      handleIconClick(ev) {
        console.log(ev);
      },
      doLogout:function () {
        if(this.isLogin){
          if(sessionStorage.getItem("mytoken")!=null){
            sessionStorage.removeItem("mytoken");
          }
          if(localStorage.getItem("mytoken")!=null){
            localStorage.removeItem("mytoken");
          }
        }

        window.location.href = '/login'
      },

      handleSelect(key, keyPath){
        switch(key){
          case '1':
            this.$router.push('/search');
            // this.breadcrumbItems  = ['导航一']
            break;
          case '2':
            this.$router.push('/classify')
            // this.breadcrumbItems  = ['导航二']
            break;
          case '3':
            this.$router.push('/settingpage')
            // this.breadcrumbItems  = ['导航三']
            break;
        }
      },

    },
  }
</script>
