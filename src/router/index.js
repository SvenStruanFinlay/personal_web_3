import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '../views/Index.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/project',
        name: 'Project',
        component: () => import(/* webpackChunkName: "project" */ '../views/Project.vue')
    },
    {
        path: '/intel-sightpp',
        name: 'Intel Sight++',
        component: () => import(/* webpackChunkName: "intel-sightpp" */ '../views/SightPP.vue')
    },
    {
        path: '/ibm-chatbot',
        name: 'IBM Chatbot',
        component: () => import(/* webpackChunkName: "ibm-chatbot" */ '../views/Chatbot.vue')
    },
    {
        path: '/personal-website',
        name: 'Personal Site',
        component: () => import(/* webpackChunkName: "ibm-chatbot" */ '../views/PersonalSite.vue')
    },
    {
        path: '/blog',
        name: 'Blog',
        component: () => import(/* webpackChunkName: "blog" */ '../views/Blog.vue')
    },
    {
        path: '/blog-details',
        name: 'BlogDetails',
        component: () => import(/* webpackChunkName: "blog-details" */ '../views/BlogDetails.vue')
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
