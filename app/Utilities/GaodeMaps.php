<?php
/**
 * Created by PhpStorm.
 * User: zhangjunmei
 * Date: 2019-08-30
 * Time: 10:28
 */

namespace App\Utilities;


use GuzzleHttp\Client;

class GaodeMaps
{

    /**
     * @param $address
     * @param $city
     * @param $state
     * @return mixed
     */
    public static function geocodeAddress($address, $city, $state)
    {
        //1.address urlencoded
        $address = urlencode($state . $city . $address);
        //2.get gaode maps api key
        $apiKey = config('services.gaode.ws_api_key');
        //3. format request url.
        $url = 'https://restapi.amap.com/v3/geocode/geo?key='.$apiKey.'&address='.$address.'&city='.$city;
        //4.create Guzzle HTTP client
        $client = new Client();
        //5. Send request and get response
        $geocodeResponse = $client->get($url)->getBody();
        $geocodeData = json_decode($geocodeResponse);

        //6. initialize geo
        $coordinates['lat'] = null;
        $coordinates['lng'] = null;

        if (!empty($geocodeData)
           && $geocodeData->status
           && isset($geocodeData->geocodes)
           && isset($geocodeData->geocodes[0]))
        {
            list($latitude, $longitude) = explode(',', $geocodeData->geocodes[0]->location);
            $coordinates['lat'] = $latitude;
            $coordinates['lng'] = $longitude;
        }

        return $coordinates;
    }

}