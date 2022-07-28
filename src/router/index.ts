import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('@/view/index.vue')
    },
    {
        path: '/view',
        name: 'View',
        component: () => import('@/view/viewer/index.vue')
    },
    {
        path: '/edit',
        name: 'Edit',
        component: () => import('@/view/modeler/index.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
