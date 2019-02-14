import app from '../components/app'
import atomicPattern from '../components/atomicPattern'
import start from '../components/start'
import pageBuilder from '../components/pageBuilder/pageBuilder'

export const routes = [
  {
    path: '/',
    component: app,
    children: [
      {
        path: '/pattern/:id',
        component: atomicPattern
      },
      {
        path: '/pageBuilder',
        component: pageBuilder
      },
      {
        path: '',
        component: start
      }
    ]
  }
]
