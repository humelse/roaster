/**
 * Imports the Roast API URL from the config.
 */
import { ROAST_CONFIG } from '../config.js';

//这里单独引入一下，requireAuth会调用到。。不然就会报错找不到axios。。
import axios from 'axios';

export default {
    /*
     GET   /api/v1/user
     */
    getUser: function(){
        return axios.get( ROAST_CONFIG.API_URL + '/user' );
    },

    /*
     PUT  /api/v1/user
     */
    putUpdateUser: function( profile_visibility, favorite_coffee, flavor_notes, city, state ){
        return axios.put( ROAST_CONFIG.API_URL + '/user',
            {
                profile_visibility: profile_visibility,
                favorite_coffee: favorite_coffee,
                flavor_notes: flavor_notes,
                city: city,
                state: state
            }
        );
    }
}