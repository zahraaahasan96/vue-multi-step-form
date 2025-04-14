import { createRouter, createWebHistory } from 'vue-router'
import StepOne from './views/StepOne.vue'
import StepTwo from './views/StepTwo.vue'
import StepThree from './views/StepThree.vue'
import success from './views/success.vue'
import { useFormStore } from './stores'

const routes = [
  { path: '/', redirect: '/step-1' },
  { path: '/step-1', name: 'StepOne', component: StepOne },
  { path: '/step-2', name: 'StepTwo', component: StepTwo },
  { path: '/step-3', name: 'StepThree', component: StepThree },
  { path: '/success', name: 'success', component: success },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const form = useFormStore()
  
  form.loadFromStorage()

  if (to.path === '/step-2' && !form.isStep1Complete) {
    next('/step-1')
  } 
  else if (to.path === '/step-3' && !form.isStep2Complete) {
    next('/step-2')
  } 
  else {
    next()
  }
})

export default router
