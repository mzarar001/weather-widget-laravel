<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Stevebauman\Location\Facades\Location;


class WeatherController extends Controller
{
    

    public function index(Request $request)
    {
            // $ip = $request->ip();
            $ip = '72.255.21.43';
        $data = Location::get($ip);
        $city=$data->cityName;
        //dd($city);

        return view('welcome');
    }
}
