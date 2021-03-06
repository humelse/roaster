<template>
    <div class="large-3 medium-4 small-6 cell cafe-card-container" v-show="show">
        <router-link :to="{ name: 'cafe', params: { id: cafe.id} }">
            <div class="cafe-card">
                <span class="title">{{ cafe.name }}</span>
                <span class="address">
                    <span class="street">{{ cafe.address }}</span>
                    <span class="city">{{ cafe.city }}</span> <span class="state">{{ cafe.state }}</span>
                    <span class="zip">{{ cafe.zip }}</span>
                </span>
            </div>
        </router-link>
    </div>
</template>

<script>
    import {CafeBrewMethodsFilter} from '../../mixins/filters/CafeBrewMethodsFilter.js';
    import {CafeTagsFilter} from '../../mixins/filters/CafeTagFilter.js';
    import {CafeTextFilter} from '../../mixins/filters/CafeTextFilter.js';
    import { EventBus } from '../../event-bus.js';


    export default {
        name: "CafeCard",

        props: [
            'cafe'
        ],

        data() {
            return {
                show: true
            }
        },

        mixins: [
            CafeBrewMethodsFilter,
            CafeTagsFilter,
            CafeTextFilter
        ],

        mounted() {
            EventBus.$on('filters-updated', function (filters) {
                this.processFilters(filters);
            }.bind(this));
        },

        methods:{
            processFilters(filters) {
                // 如果没有设置任何过滤条件，则显示
                //console.dir(filters);
                if (filters.text == ''
                    && filters.tags.length == 0
                    && filters.brew_methods.length == 0) {
                    this.show = true;
                } else {
                    // 初始化过滤标识符，默认为 false
                    var textPassed = false;
                    var tagsPassed = false;
                    var brewMethodsPassed = false;

                    // 文本筛选
                    if (filters.text != '' && this.processCafeTextFilter(this.cafe, filters.text)) {
                        textPassed = true;
                    } else if (filters.text == '') {
                        textPassed = true;
                    }

                    // 冲泡方法筛选
                    if (filters.brew_methods.length != 0 && this.processCafeBrewMethodsFilter(this.cafe, filters.brew_methods)) {
                        brewMethodsPassed = true;
                    } else if (filters.brew_methods.length == 0) {
                        brewMethodsPassed = true;
                    }

                    // 标签筛选
                    if (filters.tags.length != 0 && this.processCafeTagsFilter(this.cafe, filters.tags)) {
                        tagsPassed = true;
                    } else if (filters.tags.length == 0) {
                        tagsPassed = true;
                    }

                    // 如果所有匹配检查通过，则显示，否则不显示
                    if (textPassed && brewMethodsPassed && tagsPassed) {
                        this.show = true;
                    } else {
                        this.show = false;
                    }
                }
            }
        },




    }
</script>

<style scoped lang="scss">
    @import '~@/abstracts/_variables.scss';

    div.cafe-card {
        border-radius: 5px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
        padding: 15px 5px 5px 5px;
        margin-top: 20px;
        cursor: pointer;
        -webkit-transform: scaleX(1) scaleY(1);
        transform: scaleX(1) scaleY(1);
        transition: .2s;

        span.title {
            display: block;
            text-align: center;
            color: black;
            font-size: 18px;
            font-weight: bold;
            font-family: 'Lato', sans-serif;
        }
        span.address {
            display: block;
            text-align: center;
            margin-top: 5px;
            color: $grey;
            font-family: 'Lato', sans-serif;

            span.street {
                font-size: 14px;
                display: block;
            }

            span.city {
                font-size: 14px;
            }

            span.state {
                font-size: 14px;
            }

            span.zip {
                font-size: 14px;
                display: block;
            }
        }

            span.liked-meta {
                color: $grey;
                font-size: 10px;
                margin-left: 5px;
                margin-right: 3px;

                img {
                    width: 10px;
                }
            }

            &:hover {
                -webkit-transform: scaleX(1.041) scaleY(1.041);
                transform: scaleX(1.041) scaleY(1.041);
                transition: .2s;
            }
        }

</style>