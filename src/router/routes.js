
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('src/pages/Dashboard.vue')
      },
    ]
  },

  {
    path: '/manage-master-nodes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'manage-master-nodes',
        component: () => import('src/pages/ManageMasterNodes.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
