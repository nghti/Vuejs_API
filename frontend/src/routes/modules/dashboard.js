const DashboardGroup = {
  template: `<router-view/>`
}

export default {
  path: '',
  component: DashboardGroup,
  children: [
    {
      path: '',
      name: 'dashboard',
      component: () => import('../../views/dashboard/Dashboard'),
    },
    {
      path: '/motel',
      name: 'motel',
      component: () => import('../../views/dashboard/Motel'),
    },
    {
      path: '/room',
      name: 'room',
      component: () => import('../../views/dashboard/Room'),
    },
    {
      path: '/service',
      name: 'service',
      component: () => import('../../views/dashboard/Service'),
    },
  ],
  meta: {
    public: false,
  }
}
