import PageHome from '@/pages/PageHome.vue'
import PageBigTable from '@/pages/PageBigTable.vue'
import Test from '@/pages/Test.vue'

export default [
  {
    path: '/',
    component: PageHome
  },
  {
    path: '/big-table',
    component: PageBigTable
  },
  {
    path: '/test',
    component: Test
  }
]