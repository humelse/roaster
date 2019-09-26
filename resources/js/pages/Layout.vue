<style>

</style>

<template>
    <div id="app-layout">
        <navigation></navigation>
        <router-view></router-view>
        <login-modal></login-modal>
        <pop-out></pop-out>
        <message></message>
    </div>
</template>

<script>
    import Navigation from '../components/Navigation.vue';
    import LoginModal from '../components/global/LoginModal.vue';
    import PopOut from '../components/global/PopOut.vue';
    import Message from "../components/global/Message.vue";

    export default {
        components: {
            Message,
            Navigation,
            LoginModal,
            PopOut,
        },
        created(){
            this.$store.dispatch( 'loadCafes' );
            this.$store.dispatch( 'loadUser' );
            this.$store.dispatch('loadBrewMethods');
        }
    }
</script>