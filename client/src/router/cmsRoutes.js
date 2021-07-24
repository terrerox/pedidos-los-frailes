export const cmsRoutes = [
  {
    path: '/local/:id',
    name: 'Local',
    component: () => import('@/locals/pages/Local'),
    meta: {
      title: 'Local Dashboard'
    },
    children: [
      {
        path: 'productos',
        name: 'LocalProduct',
        component: () => import('@/locals/components/LocalProduct'),
        meta: {
          title: 'Productos'
        }
      },
      {
        path: 'ordenes',
        name: 'LocalOrder',
        component: () => import('@/locals/components/LocalOrder'),
        meta: {
          title: 'Ordenes'
        }
      },
      {
        path: 'perfil',
        name: 'LocalProfile',
        component: () => import('@/locals/components/LocalEditProfile'),
        meta: {
          title: 'Editar Perfil'
        }
      }
    ]
  },
  {
    path: '/delivery/:id',
    name: 'Delivery',
    component: () => import('@/delivery/pages/Delivery'),
    meta: {
      title: 'Delivery Dashboard'
    }
  },
  {
    path: '/admin/:id',
    name: 'Admin',
    component: () => import('@/admin/pages/Admin'),
    meta: {
      title: 'Admin Dashboard'
    }
  }
]
