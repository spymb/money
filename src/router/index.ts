import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Money from '@/views/money/Money.vue'
import SetTag from '@/views/money/SetTag.vue'
import NotFound from '@/views/NotFound.vue';
import AddTag from '@/views/money/AddTag.vue';
import Details from '@/views/Details.vue';
import Statistics from '@/views/Statistics.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    component: Money
  },
  {
    path: '/setTag/:id',
    component: SetTag
  },
  {
    path: '/addTag/:id',
    component: AddTag
  },
  {
    path: '/details',
    component: Details
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '*',
    component: NotFound
  },
]

const router = new VueRouter({
  routes
})

export default router
