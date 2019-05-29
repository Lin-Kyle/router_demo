import Router from '../router'

window.router = new Router('view', {
  routes: [
    {
      path: '/a',
      component: '<p>a</p>'
    },
    {
      path: '/b',
      component: '<p>b</p>'
    },
    {
      path: '/c',
      component: '<p>c</p>'
    },
    { path: '*', redirect: '/index' }
  ]
}, 'hash')