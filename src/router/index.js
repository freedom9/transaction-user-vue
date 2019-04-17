import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/common/Index.vue'
import Home from '@/pages/Home.vue'
import Detail from '@/pages/common/Detail.vue'
import Search from '@/pages/common/Search'
import Publish from '@/pages/common/Publish'
import User from '@/pages/user/User'
import MyPublish from '@/pages/user/MyPublish'
import MyWant from '@/pages/user/MyWant'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: 'detail',
          name: 'detail',
          component: Detail
        },
        {
          path: 'search',
          name: 'search',
          component: Search
        },
        {
          path: 'publish',
          name: 'publish',
          component: Publish
        },
        {
          path: 'user/',
          name: 'user',
          component: User,
          children: [
            {
              path: 'mypublish',
              name: 'mypublish',
              component: MyPublish
            },
            {
              path: 'mywant',
              name: 'mywant',
              component: MyWant
            }
          ]
        }
      ]
    }
  ]
})
