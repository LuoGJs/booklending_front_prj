
import Vue from 'vue'

import Vant from 'vant'
import 'vant/lib/index.css'

import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'

//全局注册mavoneditor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

//引入video.js组件
import Video from 'video.js'
import 'video.js/dist/video-js.css'

//引入audio.js组件
import Audio from 'audio.js'


//引入了拼图验证码组件
import SlideVerify from 'vue-monoplasty-slide-verify';

import axios from 'axios'
import VueAxios from 'vue-axios'

//引入时间转换插件
import moment from "moment";

//解决vue-router报错Uncaught (in promise) NavigationDuplicated 问题
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Vant);
Vue.use(ElementUI);
Vue.use(mavonEditor)
Vue.use(SlideVerify); //使用滑块验证组件

//定义一个全局变量，表示服务器的地址
// Vue.prototype.websiteUrl = 'http://localhost:8888';
Vue.prototype.websiteUrl = 'http://47.104.152.233:8888';
Vue.prototype.$video = Video
Vue.prototype.$audio = Audio
Vue.prototype.axios = axios
// Vue.use(axios,VueAxios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
