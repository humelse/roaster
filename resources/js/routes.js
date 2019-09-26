/**
 First import vue and vue router
 */

import Vue from "vue";
import VueRouter from 'vue-router';
import store from './store.js';
//Extend vue to use vue router

Vue.use(VueRouter);

/**
 * Makes a new VueRouter that we will use to run all of the routes for the app.
 */

// 对需要认证才能访问的路由调用该方法实现 Vue Router 导航守卫
function requireAuth(to, from, next) {
    function proceed() {
        // 如果用户信息已经加载并且不为空则说明该用户已登录，可以继续访问路由，否则跳转到首页
        // 这个功能类似 Laravel 中的 auth 中间件
        if (store.getters.getUserLoadStatus() === 2) {
            if (store.getters.getUser !== '') {
                switch (to.meta.permission) {
                    // 如果权限级别是普通用户则继续
                    case 'user':
                        next();
                        break;

                    // 如果权限级别是商家则需要判断用户角色是否满足
                    case 'owner':
                        if (store.getters.getUser.permission >= 1) {
                            next();
                        } else {
                            next('/cafes');
                        }
                        break;

                    // 如果权限级别是管理员则需要判断用户角色是否满足
                    case 'admin':
                        if (store.getters.getUser.permission >= 2) {
                            next();
                        } else {
                            next('/cafes');
                        }
                        break;

                    // 如果权限级别是超级管理员则需要判断用户角色是否满足
                    case 'super-admin':
                        if (store.getters.getUser.permission === 3) {
                            next();
                        } else {
                            next('/cafes');
                        }
                        break;
                    default:
                        next();
                }
            } else {
                next('/home');
            }
        }
    }

    if (store.getters.getUserLoadStatus() !== 2) {
        // 如果用户信息未加载完毕则先加载
        store.dispatch('loadUser');

        // 监听用户信息加载状态，加载完成后调用 proceed 方法继续后续操作
        //这里watch的第一个参数必须是个函数，所以。。。
        store.watch(store.getters.getUserLoadStatus, function () {
            if (store.getters.getUserLoadStatus() === 2) {
                proceed();
            }
        });
    } else {
        // 如果用户信息加载完毕直接调用 proceed 方法
        proceed()
    }
}


export default new VueRouter({
    routes: [
        {
            path: '/',
            //redirect: {name: 'cafes'},
            name: 'layout',
            component: Vue.component('Home', require('./pages/Layout.vue').default),
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: Vue.component('Home', require('./pages/Home.vue').default)
                },
                {
                    path: 'cafes',
                    name: 'cafes',
                    component: Vue.component('Cafes', require('./pages/Cafes.vue').default)
                },
                {
                    path: 'cafes/new',
                    name: 'newcafe',
                    component: Vue.component('NewCafe', require('./pages/NewCafe.vue').default),
                    beforeEnter: requireAuth
                },
                {
                    path: 'cafes/:id',
                    name: 'cafe',
                    component: Vue.component('Cafe', require('./pages/Cafe.vue').default)
                },
                {
                    path: 'profile',
                    name: 'profile',
                    component: Vue.component('User', require('./pages/Profile.vue').default),
                },
            ]
        }
    ]
});
