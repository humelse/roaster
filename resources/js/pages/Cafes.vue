<style>

</style>

<template>
    <div id="cafes">
        <div class="grid-x">
            <div class="large-9 medium-9 small-12 cell">
                <cafe-map></cafe-map>
            </div>
            <div class="large-3 medium-3 small-12 cell">

            </div>
        </div>
    </div>
</template>

<script>
    import CafeMap from '../components/cafes/CafeMap.vue';

    export default {
        components:{
            CafeMap
        },
        /**
         * 定义组件的计算属性
         */
        /*computed: {
            // 获取 cafes 加载状态
            cafesLoadStatus(){
                return this.$store.getters.getCafesLoadStatus;
            },

            // 获取 cafes
            cafes(){
                return this.$store.getters.getCafes;
            }
        }*/
    }
</script>