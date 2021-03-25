import app from '../components/app.vue'
import Component from '../components/Component.vue'

export const routes = [
  {
    path: '/',
    component: app,
    children: [
      {
        path: '/:id',
        component: Component
      }
    ]
  }
]
