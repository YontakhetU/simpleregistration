import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [{
        path: '/signup',
        name: 'signup',
        component: () =>
            import ('../components/Signup.vue')
    },
    {
        path: '/',
        name: 'login',
        component: () =>
            import ('../components/Login.vue')
    },

    {
        path: '/usersall',
        name: 'usersall',
        component: () =>
            import ('../components/UserAll.vue'),
        beforeEnter: requireAuth
    },
    {
        path: '/profile',
        name: 'profile',
        component: () =>
            import ('../components/Profileuser.vue'),
        beforeEnter: requireAuth
    }
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
export function requireAuth(to, from, next) {
    const token = localStorage.getItem('token');

    if (token) {
        // User is logged in
        next();
    } else {
        // User is not logged in, redirect to the login page or show an error message
        next('/');
        // Alternatively, you can show a notification or modal indicating the user's authentication status
    }
}

export default router