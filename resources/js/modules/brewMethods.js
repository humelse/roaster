import BrewMethodAPI from '../api/brewMethod';

export const brewMethods = {
    state: {
        brewMethods: [],
        brewMethodsLoadStatus: 0
    },

    actions: {
        loadBrewMethods({commit}){
            commit('setBrewMethodsLoadStatus', 1);

            //Calls the API to load
            BrewMethodAPI.getBrewMethods()
                .then(function (response) {
                    //Sets the brew methods on a successful response
                    commit('setBrewMethods', response.data);
                    commit('setBrewMethodsLoadStatus', 2);
                })
                .catch(function () {
                    commit('setBrewMethods', []);
                    commit('setBrewMethodsLoadStatus', 3);
                });
        }
    },

    mutations: {
        //Sets the brew method load status
        setBrewMethodsLoadStatus(state, status){
            state.brewMethodsLoadStatus = status;
        },

        setBrewMethods(state, data){
            state.brewMethods = data;
        }
    },

    getters: {
        //Return the brew methods
        getBrewMethods(state){
            return state.brewMethods;
        },

        getBrewMethodsLoadStatus(state){
            return state.brewMethodsLoadStatus;
        }
    }
}