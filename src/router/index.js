import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Welcome from '@/components/Welcome'

import Login from '@/components/pc/Login'
import Regesit from '@/components/pc/Regesit'
import PMainPage from '@/components/pc/PMainPage'
import PersonCenter from '@/components/pc/PersonCenter'
import Error from '@/components/pc/Error'
import Relax from '@/components/pc/Relax'
import AudioPage from '@/components/pc/AudioPage'
import VideoPage from '@/components/pc/VideoPage'
import PersonMessage from '@/components/pc/PersonMessage'
import MyLove from '@/components/pc/MyLove'
import Agreeement from '@/components/pc/Agreeement'
import AboutUs from '@/components/pc/AboutUs'
import BookOfBeLend from '@/components/pc/BookOfBeLend'
import BookOfBeReturn from '@/components/pc/BookOfBeReturn'
import OnlineRead from '@/components/pc/OnlineRead'
import Searchpage from '@/components/pc/Searchpage'
import ClassifyPage from '@/components/pc/ClassifyPage'
import SettingPage from '@/components/pc/SettingPage'
import LendReadPage from '@/components/pc/LendReadPage'

import Mindex from '@/components/mobile/Mindex'
import HomePage from '@/components/mobile/home/HomePage'
import MSearchPage from '@/components/mobile/search/MSearchPage'
import MClassifyPage from '@/components/mobile/classify/MClassifyPage'
import PersonPage from '@/components/mobile/personcenter/PersonPage'
import MPersonMessage from '@/components/mobile/personcenter/MPersonMessage'
import MReturnBook from '@/components/mobile/personcenter/MReturnBook'
import MEvaluate from '@/components/mobile/personcenter/MEvaluate'
import MMyLove from '@/components/mobile/personcenter/MMyLove'
import MLogin from '@/components/mobile/MLogin'
import MRegeist from '@/components/mobile/MRegeist'


import Index from '@/components/test/Index'
import MyMavonEditor from '@/components/test/MyMavonEditor'
import LoginTest from '@/components/test/LoginTest'
import LoginTest2 from '@/components/test/LoginTest2'
import LoginTest3 from '@/components/test/LoginTest3'
import LoginTest4 from '@/components/test/LoginTest4'
import LoginTest5 from '@/components/test/LoginTest5'
import LoginTest6 from '@/components/test/LoginTest6'
import RegTest from '@/components/test/RegTest'
import Header from '@/components/commons/Header'
import CatalogTest from '@/components/test/CatalogTest'
import UploadTest from '@/components/test/UploadTest'
import DownloadTest from '@/components/test/DownloadTest'
import PagerTest from '@/components/test/PagerTest'
import VideoTest from '@/components/test/VideoTest'
import AudioTest from '@/components/test/AudioTest'
import TimeSelecterTest from '@/components/test/TimeSelecterTest'
import Test from '@/components/test/Test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [

    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      title: '登录页面',
      component: Login
    },
    {
      path: '/rege',
      name: 'Regesit',
      title: '注册页面',
      component: Regesit
    },
    {
      path: '/pmainpage',
      name: 'PMainPage',
      component: PMainPage
    },

    {
      path: '/error',
      name: 'Error',
      component: Error
    },

    {
      path: '/mymavoneditor',
      name: 'MyMavonEditor',
      component: MyMavonEditor
    },
    {
      path: '/logintest',
      name: 'LoginTest',
      component: LoginTest
    },
    {
      path: '/logintest2',
      name: 'LoginTest2',
      component: LoginTest2
    },
    {
      path: '/logintest3',
      name: 'LoginTest3',
      component: LoginTest3
    },
    {
      path: '/logintest4',
      name: 'LoginTest4',
      component: LoginTest4
    },
    {
      path: '/logintest5',
      name: 'LoginTest5',
      component: LoginTest5
    },
    {
      path: '/logintest6',
      name: 'LoginTest6',
      component: LoginTest6
    },
    {
      path: '/regtest',
      name: 'RegTest',
      component: RegTest
    },
    {
      path: '/header',
      name: 'Header',
      component: Header
    },
    {
      path: '/catalogtest',
      name: 'CatalogTest',
      component: CatalogTest
    },
    {
      path: '/uploadtest',
      name: 'UploadTest',
      component: UploadTest
    },
    {
      path: '/downloadtest',
      name: 'DownloadTest',
      component: DownloadTest
    },
    {
      path: '/pagertest',
      name: 'PagerTest',
      component: PagerTest
    },
    {
      path: '/videotest',
      name: 'VideoTest',
      component: VideoTest
    },
    {
      path: '/audiotest',
      name: 'AudioTest',
      component: AudioTest
    },
    {
      path: '/timeselect',
      name: 'TimeSelecterTest',
      component: TimeSelecterTest
    },
    {
      path: '/pindex',
      name: 'Index',
      component: Index
    },
    {
      path: '/onlineread',
      name: 'OnlineRead',
      component: OnlineRead
    },
    {
      path: '/lendreadpage',
      name: 'LendReadPage',
      component: LendReadPage,
      children: [
        {
          path: '/search',
          name: 'Searchpage',
          component: Searchpage
        },
        {
          path: '/classify',
          name: 'ClassifyPage',
          component: ClassifyPage
        },
        {
          path: '/settingpage',
          name: 'SettingPage',
          component: SettingPage
        }
      ]
    },
    {
      path: '/relax',
      name: 'Relax',
      component: Relax,
      children: [
        {
          path: '/audiopage',
          name: 'AudioPage',
          component: AudioPage
        },
        {
          path: '/videopage',
          name: 'VideoPage',
          component: VideoPage
        },
      ]
    },
    {
      path: '/personcenter',
      name: 'PersonCenter',
      component: PersonCenter,
      children: [
        {
          path: '/personmessage',
          name: 'PersonMessage',
          component: PersonMessage

        },
        {
          path: '/mylove',
          name: 'MyLove',
          component: MyLove
        },
        {
          path: '/agreement',
          name: 'Agreeement',
          component: Agreeement
        },
        {
          path: '/aboutus',
          name: 'AboutUs',
          component: AboutUs
        },
        {
          path: '/bookoflend',
          name: 'BookOfBeLend',
          component: BookOfBeLend
        },
        {
          path: '/bookofbereturn',
          name: 'BookOfBeReturn',
          component: BookOfBeReturn
        },
      ]
    },
    {
      path: '/mindex',
      name: 'Mindex',
      component: Mindex,
      children:[
        {
          path: '/homepage',
          name: 'HomePage',
          component: HomePage
        },
        {
          path: '/mclassifypage',
          name: 'MClassifyPage',
          component: MClassifyPage
        },
        {
          path: '/msearchpage',
          name: 'MSearchPage',
          component: MSearchPage
        },
        {
          path: '/personpage',
          name: 'PersonPage',
          component: PersonPage,
          children:[
            {
              path: '/mpm',
              name: 'MPersonMessage',
              component: MPersonMessage
            },
            {
              path: '/mrb',
              name: 'MReturnBook',
              component: MReturnBook
            },
            {
              path: '/me',
              name: 'MEvaluate',
              component: MEvaluate
            },
            {
              path: '/mml',
              name: 'MMyLove',
              component: MMyLove
            },

          ]
        }

      ]
    },
    {
      path: '/mlogin',
      name: 'MLogin',
      component: MLogin
    },
    {
      path: '/mrege',
      name: 'MRegeist',
      component: MRegeist
    },

  ]
})
