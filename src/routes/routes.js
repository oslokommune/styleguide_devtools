import app from '../components/app'
import Component from '../components/Component'
import Start from '../components/Start'

export const routes = [
  {
    path: '/',
    component: app,
    children: [
      {
        path: '/:id',
        component: Component
      },
      {
        path: '',
        component: Start
      }
    ]
  }
]
