<style>

</style>

<template>
    <div class="page">
        <form>
            <div class="grid-container">
                <div class="grid-x grid-padding-x">
                    <div class="large-12 medium-12 small-12 cell">
                        <label>Name
                            <input type="text" placeholder="咖啡店名" v-model="name">
                        </label>
                        <span class="validation" v-show="!validations.name.is_valid">{{ validations.name.text }}</span>
                    </div>
                    <div class="large-12 medium-12 small-12 cell">
                        <label>Address
                            <input type="text" placeholder="网址" v-model="website">
                        </label>
                        <span class="validation" v-show="!validations.website.is_valid">{{ validations.website.text }}</span>
                    </div>
                    <div class="large-12 medium-12 small-12 cell">
                        <label>Address
                            <input type="text" placeholder="简介" v-model="description">
                        </label>
                        <span class="validation" v-show="!validations.description.is_valid">{{ validations.description.text }}</span>
                    </div>
                    <div class="large-12 medium-12 small-12 cell">
                        <label>图片
                            <input type="file" id="cafe-photo" ref="photo" v-on:change="handleFileUpload()" />
                        </label>

                    </div>
                    <div class="grid-x grid-padding-x" v-for="(location, key) in locations">
                        <div class="large-12 medium-12 small-12 cell">
                            <h3>位置</h3>
                        </div>
                        <div class="large-6 medium-6 small-12 cell">
                            <label>位置名称
                                <input type="text" placeholder="位置名称" v-model="locations[key].name">
                            </label>
                        </div>
                        <div class="large-6 medium-6 small-12 cell">
                            <label>详细地址
                                <input type="text" placeholder="详细地址" v-model="locations[key].address">
                            </label>
                            <span class="validation" v-show="!validations.locations[key].address.is_valid">{{ validations.locations[key].address.text }}</span>
                        </div>
                        <div class="large-6 medium-6 small-12 cell">
                            <label>城市
                                <input type="text" placeholder="城市" v-model="locations[key].city">
                            </label>
                            <span class="validation" v-show="!validations.locations[key].city.is_valid">{{ validations.locations[key].city.text }}</span>
                        </div>
                        <div class="large-6 medium-6 small-12 cell">
                                <label>省份</label>
                                 <!-- <input type="text" placeholder="省份" v-model="locations[key].state"> -->
                                <select v-model="locations[key].state" v-bind:class="{'invalid' : !validations.locations[key].state.is_valid }">
                                    <option value=""></option>
                                    <option value="北京">北京</option>
                                    <option value="上海">上海</option>
                                    <option value="天津">天津</option>
                                    <option value="重庆">重庆</option>
                                    <option value="江苏">江苏</option>
                                    <option value="浙江">浙江</option>
                                    <option value="安徽">安徽</option>
                                    <option value="广东">广东</option>
                                    <option value="山东">山东</option>
                                    <option value="四川">四川</option>
                                    <option value="湖北">湖北</option>
                                    <option value="湖南">湖南</option>
                                    <option value="山西">山西</option>
                                    <option value="陕西">陕西</option>
                                    <option value="辽宁">辽宁</option>
                                    <option value="吉林">吉林</option>
                                    <option value="黑龙江">黑龙江</option>
                                    <option value="内蒙古">内蒙古</option>
                                    <option value="河南">河南</option>
                                    <option value="河北">河北</option>
                                    <option value="广西">广西</option>
                                    <option value="贵州">贵州</option>
                                    <option value="云南">云南</option>
                                    <option value="西藏">西藏</option>
                                    <option value="青海">青海</option>
                                    <option value="新疆">新疆</option>
                                    <option value="甘肃">甘肃</option>
                                    <option value="宁夏">宁夏</option>
                                    <option value="江西">江西</option>
                                    <option value="海南">海南</option>
                                    <option value="福建">福建</option>
                                    <option value="台湾">台湾</option>
                                </select>

                            <span class="validation" v-show="!validations.locations[key].state.is_valid">{{ validations.locations[key].state.text }}</span>
                        </div>
                        <div class="large-6 medium-6 small-12 cell">
                            <label>邮编
                                <input type="text" placeholder="邮编" v-model="locations[key].zip">
                            </label>
                            <span class="validation" v-show="!validations.locations[key].zip.is_valid">{{ validations.locations[key].zip.text }}</span>
                        </div>
                        <div class="large-12 medium-12 small-12 cell">
                            <label>支持的冲泡方法</label>
                            <span class="brew-method" v-for="brewMethod in brewMethods">
                                <input v-bind:id="'brew-method-'+brewMethod.id+'-'+key" type="checkbox"
                                    v-bind:value="brewMethod.id"
                                    v-model="locations[key].methodsAvailable">
                                <label v-bind:for="'brew-method-'+brewMethod.id+'-'+key">{{ brewMethod.method }}</label>
                            </span>
                        </div>
                        <div class="large-12 medium-12 small-12 cell">
                            <label>标签</label>
                            <tags-input v-bind:unique="key"></tags-input>
                        </div>
                        <div class="large-12 medium-12 small-12 cell">
                            <a class="button" v-on:click="removeLocation(key)">移除位置</a>
                        </div>
                    </div>

                    <div class="grid-x grid-padding-x">
                        <div class="large-12 medium-12 small-12 cell">
                            <a class="button" v-on:click="addLocation()">新增位置</a>
                        </div>
                        <div class="large-12 medium-12 small-12 cell">
                            <a class="button" v-on:click="submitNewCafe()">提交表单</a>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import TagsInput from '../components/global/form/TagsInput.vue';
    import { EventBus } from '../event-bus.js';

    export default {
        components: {
          TagsInput
        },

        data() {
            return {
                name: '',
                locations: [],
                website: '',
                description: '',
                picture: '',
                roaster: false,
                validations: {
                    name: {
                        is_valid: true,
                        text: ''
                    },
                    locations: [],
                    oneLocation: {
                        is_valid: true,
                        text: ''
                    },
                    website: {
                        is_valid: true,
                        text: ''
                    },
                    description: {
                        is_valid: false,
                        text: ''
                    },
                }
            }
        },
        created(){
          this.addLocation();
        },

        mounted() {
          EventBus.$on('tags-edited', function (tagsAdd) {
              this.locations[tagsAdd.unique].tags = tagsAdd.tags;
          }.bind(this))
        },

        computed: {
            brewMethods(){
              return this.$store.getters.getBrewMethods;
            },

            addCafeStatus(){
                return this.$store.getters.getCafeAddStatus;
            }
        },
        methods: {
            submitNewCafe: function () {
                if (this.validateNewCafe())
                {
                    console.info('submit form....');
                    this.$store.dispatch('addCafe', {
                        name: this.name,
                        locations: this.locations,
                        website: this.website,
                        description: this.description,
                        roaster: this.roaster,
                        picture: this.picture
                    });
                }
            },
            addLocation: function(){
                this.locations.push({name:'', address:'', city:'', state:'',zip:'',methodsAvailable: [], tags:''});

                this.validations.locations.push({
                    address: {
                        is_valid: true,
                        text: ''
                    },
                    city: {
                        is_valid: true,
                        text: ''
                    },
                    state: {
                        is_valid: true,
                        text: ''
                    },
                    zip: {
                        is_valid: true,
                        text: ''
                    },
                });
            },

            removeLocation:function(key){
                this.locations.slice(key,1);
                this.validations.locations.slice(key, 1);
            },
            validateNewCafe: function () {
                let validNewCafeForm = true;

                // 确保 name 字段不为空
                if( this.name.trim() === '' ){
                    validNewCafeForm = false;
                    this.validations.name.is_valid = false;
                    this.validations.name.text = '请输入咖啡店的名字';
                }else{
                    this.validations.name.is_valid = true;
                    this.validations.name.text = '';
                }

                // 确保网址是有效的 URL
                if (this.website.trim !== '' && !this.website.match(/^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/)) {
                    validNewCafeForm = false;
                    this.validations.website.is_valid = false;
                    this.validations.website.text = '请输入有效的网址 URL';
                } else {
                    this.validations.website.is_valid = true;
                    this.validations.website.text = '';
                }

                for (let index in this.locations) {
                    if (this.locations.hasOwnProperty(index)) {
                        // 确保 address 字段不为空
                        if (this.locations[index].address.trim() === '') {
                            validNewCafeForm = false;
                            this.validations.locations[index].address.is_valid = false;
                            this.validations.locations[index].address.text = '请输入咖啡店的地址!';
                        } else {
                            this.validations.locations[index].address.is_valid = true;
                            this.validations.locations[index].address.text = '';
                        }


                        //  确保 city 字段不为空
                        if (this.locations[index].city.trim() === '') {
                            validNewCafeForm = false;
                            this.validations.locations[index].city.is_valid = false;
                            this.validations.locations[index].city.text = '请输入咖啡店所在城市!';
                        } else {
                            this.validations.locations[index].city.is_valid = true;
                            this.validations.locations[index].city.text = '';
                        }

                        //  确保 state 字段不为空
                        if (this.locations[index].state.trim() === '') {
                            validNewCafeForm = false;
                            this.validations.locations[index].state.is_valid = false;
                            this.validations.locations[index].state.text = '请输入咖啡店所在省份!';
                        } else {
                            this.validations.locations[index].state.is_valid = true;
                            this.validations.locations[index].state.text = '';
                        }

                        // 确保 zip 字段不为空且格式正确
                        if (this.locations[index].zip.trim() === '' || !this.locations[index].zip.match(/(^\d{6}$)/)) {
                            validNewCafeForm = false;
                            this.validations.locations[index].zip.is_valid = false;
                            this.validations.locations[index].zip.text = '请输入有效的邮编地址!';
                        } else {
                            this.validations.locations[index].zip.is_valid = true;
                            this.validations.locations[index].zip.text = '';
                        }
                    }
                }

                return validNewCafeForm;
            },
            clearForm() {
                this.name = '';
                this.locations = [];
                this.website = '';
                this.description = '';
                this.roaster = false;
                this.picture = '';
                this.$refs.photo.value = '';

                this.validations = {
                    name: {
                        is_valid: true,
                        text: ''
                    },
                    locations: [],
                    oneLocation: {
                        is_valid: true,
                        text: ''
                    },
                    website: {
                        is_valid: true,
                        text: ''
                    },
                    description: {
                        is_valid: false,
                        text: ''
                    },
                };

                EventBus.$emit('clear-tags');

                this.addLocation();
            },

            handleFileUpload(){
                this.picture = this.$refs.photo.files[0];
            }
        },

        watch:{
            'addCafeStatus': function () {
                if (this.addCafeStatus === 2){
                    this.clearForm();
                    $("#cafe-added-successful").show().delay(5000).fadeOut();
                }

                if (this.addCafeStatus === 3){
                    $("#cafe-added-unsuccessful").show().delay(5000).fadeOut();
                }
            }
        }
    }
</script>