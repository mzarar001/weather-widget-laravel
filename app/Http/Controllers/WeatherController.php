<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Stevebauman\Location\Facades\Location;
use RakibDevs\Weather\Weather;

class WeatherController extends Controller
{
    

    public function index(Request $request)
    {
             $ip = $request->ip();
            //dd($ip)
            //$ip = '72.255.21.43';
        $data = Location::get($ip);
        $city=$data->cityName;
        $weather = new Weather();
        $weatherDetails = $weather->getCurrentByCity($city);
        $array = json_decode(json_encode($weatherDetails));

        return view('welcome', ['array'=>$array]);
    }
}
