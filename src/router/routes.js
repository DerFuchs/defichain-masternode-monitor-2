
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('src/pages/Dashboard.vue'),
        meta: {
          masterNodeTabsVisible: true,
        },
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
        component: () => import('src/pages/ManageMasterNodes.vue'),
        meta: {
          headline: "Manage Masternodes",
          icon: "fa-light fa-square-list",
        },
      },
    ]
  },

  {
    path: '/settings',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'settings',
        component: () => import('src/pages/Settings.vue'),
        meta: {
          headline: "Settings",
          icon: "fa-light fa-screwdriver-wrench",
        },
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  }
]

export default routes
