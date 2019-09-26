<style lang="scss">
    @import '~@/abstracts/_variables.scss';

    nav.top-navigation{
        background-color: $white;
        height: 50px;
        border-bottom: 2px solid $dark-color;

        span.logo{
            border-right: 1px solid $dark-color;
            display: block;
            float: left;
            height: 50px;
            line-height: 50px;
            padding: 0px 20px 0px 20px;
            font-family: 'Josefin Sans', sans-serif;
            font-weight: bold;
            color: $dark-color;

            &:hover{
                color: white;
                background-color: $dark-color;
            }
        }

        ul.links{
            display: block;
            float: left;

            li{
                display: inline-block;
                list-style-type: none;
                line-height: 50px;

                a{
                    font-family: 'Lato', sans-serif;
                    font-weight: bold;
                    color: $black;

                    &:hover{
                        color: $dark-color;
                    }
                }
            }
        }

        img.logo {
            margin: auto;
            margin-top: 22.5px;
            margin-bottom: 22.5px;
            display: block;
        }
        img.hamburger {
            float: right;
            margin-right: 18px;
            margin-top: 10px;
            cursor: pointer;
        }
        img.avatar {
            float: right;
            margin-right: 20px;
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin-top: 10px;
        }

        a{
            font-family: 'Lato', sans-serif;
            font-weight: bold;
            color: $black;

            &:hover{
                color: $dark-color;
            }
        }

    }
</style>
<template>
    <nav class="top-navigation">
        <div class="grid-x">
            <div class="large-4 medium-4 small-4 cell">
                <router-link :to="{ name: 'home'}">
                    <span class="logo">Roast</span>
                </router-link>
            </div>
            <div class="large-4 medium-4 small-4 cell">
                <ul class="links">
                    <li>
                        <router-link :to="{ name: 'cafes' }">
                            Cafes
                        </router-link>
                    </li>
                </ul>
            </div>

            <div class="large-4 medium-4 small-4 cell">
                <img class="hamburger" src="/storage/hamburger.svg" v-on:click="setShowPopOut()"/>
                <img class="avatar" v-if="user !== '' && userLoadStatus === 2" :src="user.avatar" />

                <span class="login" v-if="user === ''" v-on:click="login()">登录</span>
                <a href="/logout" v-if="user !== ''">Log out</a>
            </div>
        </div>
    </nav>
</template>
<script>

    import {EventBus} from '../event-bus.js';

    export default {

        // 定义组件的计算属性
        computed: {
            // 从 Vuex 中获取用户加载状态
            userLoadStatus:function(){
                return this.$store.getters.getUserLoadStatus();
            },

            // 从 Vuex 中获取用户信息
            user:function () {
                return this.$store.getters.getUser;
            }
        },
        methods: {
            login() {
                EventBus.$emit('prompt-login');
            },
            logout() {
                this.$store.dispatch('logoutUser');
                window.location = '/logout';
            },

            setShowPopOut() {
                //console.info('click popout');
                this.$store.dispatch('toggleShowPopOut', {showPopOut: true});
            },

            clearFilters() {
                EventBus.$emit('clear-filters');
            }
        }
    }
</script>