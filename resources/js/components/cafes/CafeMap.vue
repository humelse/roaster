<style lang="scss">
    @import '~@/abstracts/_variables.scss';

    div#cafe-map-container {
        position: absolute;
        top: 50px;
        left: 0px;
        right: 0px;
        bottom: 50px;

        div#cafe-map {
            position: absolute;
            top: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;
        }

        div.cafe-info-window {
            div.cafe-name {
                display: block;
                text-align: center;
                color: $dark-color;
                font-family: 'Josefin Sans', sans-serif;
            }
            div.cafe-address {
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
                    font-size: 12px;
                }
                span.state {
                    font-size: 12px;
                }
                span.zip {
                    font-size: 12px;
                    display: block;
                }
                a {
                    color: $secondary-color;
                    font-weight: bold;
                }
            }
        }
    }
</style>

<template>
    <div id="cafe-map-container">
        <div id="cafe-map">

        </div>
        <cafe-map-filter></cafe-map-filter>
    </div>
</template>

<script>

    //import cafe from '../../api/cafe.js';
    import {ROAST_CONFIG} from "../../config.js";
    import CafeMapFilter from './CafeMapFilter.vue';
    import {EventBus} from '../../event-bus.js';

    import { CafeBrewMethodsFilter } from '../../mixins/filters/CafeBrewMethodsFilter.js';
    import { CafeTextFilter } from '../../mixins/filters/CafeTextFilter.js';

    export default {

        mixins: [
            CafeBrewMethodsFilter,
            CafeTextFilter
        ],

        components:{
          CafeMapFilter
        },

        props: {
            'latitude': {  // 经度
                type: Number,
                default: function () {
                    return 120.21
                }
            },
            'longitude': {  // 纬度
                type: Number,
                default: function () {
                    return 30.29
                }
            },
            'zoom': {   // 缩放级别
                type: Number,
                default: function () {
                    return 8
                }
            }
        },
        data() {
            return {
                markers: [],
                infoWindows: []
            }
        },

        mounted() {
            this.map = new AMap.Map('cafe-map', {
                center: [this.latitude, this.longitude],
                zoom: this.zoom
            });
            this.clearMarkders();
            this.buildMarkers();

            EventBus.$on('filters-updated', function (filters) {
                this.processFilters(filters);
            }.bind(this));
        },

        computed: {
            cafes(){
                return this.$store.getters.getCafes;
            }
        },
        methods: {
            buildMarkers(){
                //init
                this.markers = [];

                var image = ROAST_CONFIG.APP_URL + '/storage/map_pin.png';
                var icon = new AMap.Icon({
                    image: image,
                    imageSize: new AMap.Size(19,33)
                });

                //fill markers
                var infoWindow = new AMap.InfoWindow({
                    autoMove: true
                });

                for (var i = 0; i < this.cafes.length; i++)
                {
                    var marker = new AMap.Marker({
                       position: new AMap.LngLat(parseFloat(this.cafes[i].latitude), parseFloat(this.cafes[i].longitude)),
                        title: this.cafes[i].name,
                        icon: icon,
                        extData: {
                           'cafe': this.cafes[i]
                        }
                    });

                    marker.content = '<div class="cafe-info-window">'+
                        '<div class="cafe-name">' + this.cafes[i].name +
                        '</div>' +
                        '<div class="cafe-address">' +
                        '<span class="street">' + this.cafes[i].address + '</span>' +
                        '<span class="city">' + this.cafes[i].city + '</span> ' +
                        '<span class="state">' + this.cafes[i].state + '</span>' +
                        '<span class="zip">' + this.cafes[i].zip + '</span>' +
                        '<a href="/#/cafes/' + this.cafes[i].id + '">Visit</a>' +
                        '</div>' +
                        '</div>';


                    marker.on('click', mapClick);

                    this.markers.push(marker);
                }

                function mapClick(mapEvent) {
                    infoWindow.setContent(mapEvent.target.content);
                    infoWindow.open(this.getMap(), this.getPosition());
                }

                //show markers on map
                this.map.add(this.markers);
            },
            clearMarkders(){
                for (var i = 0; i < this.markers.length; i++)
                {
                    this.markers[i].setMap(null);
                }
            },

            processFilters(filters){
                for (var i = 0; i < this.markers.length; i++){
                    if (filters.text === ''
                       && filters.brew_methods.length === 0) {
                        this.markers[i].setMap(this.map);
                    } else {
                        var textPassed = false;
                        var brewMethodsPassed = false;

                        if (filters.text !== ''&& this.processCafeTextFilter(this.markers[i].getExtData().cafe,filters.text)) {
                            textPassed = true;
                        } else if (filters.text === ''){
                            textPassed = true;
                        }
                        
                        if (filters.brew_methods.length > 0 && this.processCafeBrewMethodsFilter(this.markers[i].getExtData().cafe, filters.brew_methods)){
                            brewMethodsPassed = true;
                        } else if (filters.brew_methods.length === 0){
                            brewMethodsPassed = true;
                        }

                        if (textPassed && brewMethodsPassed) {
                            this.markers[i].setMap(this.map);
                        } else {
                            this.markers[i].setMap(null);
                        }
                    }
                }
            }
        },
        watch: {
            //refresh markders
            cafes(){
                this.clearMarkders();
                this.buildMarkers();
            }
        }
    }
</script>