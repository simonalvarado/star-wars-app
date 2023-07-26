const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/PageHome.vue'), name: 'Home' },
      { path: '/people', component: () => import('src/pages/People.vue'), name: 'People' },
      { path: '/planets', component: () => import('src/pages/Planets.vue'), name: 'Planets' },
      { path: '/starships', component: () => import('src/pages/Starships.vue'), name: 'Starships' },
      { path: '/people/:id', component: () => import('src/pages/PeopleDetail.vue'), name: 'PeopleDetail' },
      { path: '/planets/:id', component: () => import('src/pages/PlanetDetail.vue'), name: 'PlanetsDetail' },
      { path: '/starships/:id', component: () => import('src/pages/StarshipDetail.vue'), name: 'StarshipsDetail' }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
