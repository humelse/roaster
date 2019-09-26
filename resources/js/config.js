/**
 * Defines the API route we are using.
 */
var api_url = '';
var app_url = '';
var gaode_maps_js_api_key = '0c0ab470438f73b592c8cab15ca10bf0';

switch( process.env.NODE_ENV ){
    case 'test':
        api_url = 'http://127.0.0.1/api/v1';
        app_url = 'http://127.0.0.1';
        break;
    case 'production':
        api_url = 'http://roast.demo/api/v1';
        app_url = 'http://roast.demo';
        break;
    case 'development':
        api_url = 'http://roast.demo/api/v1';
        app_url = 'http://roast.demo';
        break;
}

export const ROAST_CONFIG = {
    API_URL: api_url,
    APP_URL: app_url,
    GAODE_MAPS_JS_API_KEY: gaode_maps_js_api_key
}

