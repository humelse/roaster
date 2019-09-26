/*
|-------------------------------------------------------------------------------
| VUEX modules/cafes.js
|-------------------------------------------------------------------------------
| The Vuex data store for the cafes
*/

import CafeAPI from '../api/cafe.js';

export const cafes = {
    state: {
        cafes: [],
        cafesLoadStatus: 0,
        cafe: {},
        cafeLoadStatus: 0,

        cafeAddStatus: 0,

        cafeLikeActionStatus: 0,
        cafeUnlikeActionStatus: 0,

        cafeLiked: false
    },
    actions: {
        loadCafes( { commit }){
            commit('setCafesLoadStatus', 1);

            CafeAPI.getCafes()
                .then(function (response) {
                    commit('setCafes', response.data);
                    commit('setCafesLoadStatus', 2);
                })
                .catch(function () {
                    console.log('get cafes error');
                    commit('setCafes', []);
                    commit('setCafesLoadStatus', 3);
                });
        },
        loadCafe( { commit }, data){
            commit ('setCafeLoadStatus', 1);
            commit('setCafeLikedStatus', false);

            CafeAPI.getCafe(data.id)
                .then(function (response) {
                    commit('setCafe', response.data);
                    commit('setCafeLoadStatus', 2);
                    //console.dir(response.data);
                    if (response.data.user_like_count > 0){
                        commit('setCafeLikedStatus', true);
                    }
                })
                .catch(function () {
                    commit('setCafe', {});
                    commit('setCafeLoadStatus', 3);
                });
        },
        addCafe( { commit, state, dispatch }, data ){
            // 状态1表示开始添加
            commit( 'setCafeAddStatus', 1 );

            CafeAPI.postAddNewCafe( data.name, data.locations, data.website, data.description, data.roaster, data.picture )
                .then( function( response ){
                    // 状态2表示添加成功
                    commit( 'setCafeAddStatus', 2 );
                    dispatch( 'loadCafes' );
                })
                .catch( function(){
                    // 状态3表示添加失败
                    commit( 'setCafeAddStatus', 3 );
                });
        },
        likeCafe({commit, state}, data){
            commit('setCafeLikeActionStatus', 1);

            CafeAPI.postLikeCafe(data.id)
                .then(function (response) {
                    //commit('setCafe',response.data);
                    //console.dir(response.data);
                    commit('setCafe', response.data);
                    commit('setCafeLikedStatus', true);
                    commit('setCafeLikeActionStatus', 2);
                })
                .catch(function () {
                    commit('setCafeLikeActionStatus', 3);
                });
        },
        unlikeCafe({commit, state}, data){
            commit('setCafeUnlikeActionStatus', 1);

            CafeAPI.deleteLikeCafe(data.id)
                .then(function (response) {
                    console.dir(response.data);
                    commit('setCafe', response.data);
                    commit('setCafeLikedStatus', false);
                    commit('setCafeUnlikeActionStatus', 2);
                })
                .catch(function () {
                    commit('setCafeLikeActionStatus', 3);
                });
        }
    },

    mutations: {
        setCafesLoadStatus(state, status){
            state.cafesLoadStatus = status;
        },

        setCafes(state, cafes){
            state.cafes = cafes;
        },

        setCafeLoadStatus(state, status){
            state.cafeLoadStatus = status;
        },

        setCafe(state, cafe){
            state.cafe = cafe;
        },
        setCafeAddStatus(state, status) {
            state.cafeAddStatus = status;
        },
        setCafeLikeActionStatus(state, status){
            state.cafeLikeActionStatus = status;
        },
        setCafeLikedStatus(state, status){
            state.cafeLiked = status;
        },
        setCafeUnlikeActionStatus(state, status){
            state.cafeUnlikeActionStatus = status;
        },

    },

    getters: {
        getCafesLoadStatus(state){
            return state.cafesLoadStatus;
        },

        getCafes (state){
            return state.cafes;
        },

        getCafeLoadStatus(state) {
            return state.cafeLoadStatus;
        },

        getCafe(state){
            return state.cafe;
        },
        getCafeAddStatus( state) {
            return state.cafeAddStatus;
        },
        getCafeLikedStatus(state){
            return state.cafeLiked;
        },
        getCafeLikeActionStatus(state){
            return state.cafeLikeActionStatus;
        },
        getCafeUnlikeActionStatus(state){
            return state.cafeUnlikeActionStatus;
        }

    }
}