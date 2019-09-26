/**
 * Imports the Roast API URL from the config.
 */
import { ROAST_CONFIG } from '../config.js';

export default {
    getCafes: function () {
        return axios.get(ROAST_CONFIG.API_URL + '/cafes');
    },

    getCafe: function (cafeId) {
        return axios.get(ROAST_CONFIG.API_URL + '/cafes/'+cafeId);
    },

    postAddNewCafe: function (name, locations, website, description, roaster, picture) {

        let formData = new FormData();

        formData.append('name', name);
        formData.append('locations', JSON.stringify(locations));
        formData.append('website', website);
        formData.append('description', description);
        formData.append('roaster', roaster);
        formData.append('picture', picture);


        return axios.post(ROAST_CONFIG.API_URL + '/cafes',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        /*return axios.post(ROAST_CONFIG.API_URL + '/cafes',
            {
                name: name,
                locations: locations,
                website: website,
                description: description,
                roater: roaster,
                picture: picture
            },
            {
                headers: {
                    'Content-TYpe': 'multipart/form-data'
                }
            }
         );*/
    },
    postLikeCafe: function (cafeID) {
        return axios.post(ROAST_CONFIG.API_URL+'/cafes/'+cafeID+'/like');
    },

    deleteLikeCafe: function (cafeID) {
        return axios.delete(ROAST_CONFIG.API_URL+'/cafes/'+cafeID+'/like');
    }
}
