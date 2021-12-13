<!DOCTYPE html>

<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Widget Weather</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css">
        <!-- Styles -->
        <link rel="stylesheet" href="{{ url('/css/style.css') }}">
        <style>
            /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}a{background-color:transparent}[hidden]{display:none}html{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}*,:after,:before{box-sizing:border-box;border:0 solid #e2e8f0}a{color:inherit;text-decoration:inherit}svg,video{display:block;vertical-align:middle}video{max-width:100%;height:auto}.bg-white{--bg-opacity:1;background-color:#fff;background-color:rgba(255,255,255,var(--bg-opacity))}.bg-gray-100{--bg-opacity:1;background-color:#f7fafc;background-color:rgba(247,250,252,var(--bg-opacity))}.border-gray-200{--border-opacity:1;border-color:#edf2f7;border-color:rgba(237,242,247,var(--border-opacity))}.border-t{border-top-width:1px}.flex{display:flex}.grid{display:grid}.hidden{display:none}.items-center{align-items:center}.justify-center{justify-content:center}.font-semibold{font-weight:600}.h-5{height:1.25rem}.h-8{height:2rem}.h-16{height:4rem}.text-sm{font-size:.875rem}.text-lg{font-size:1.125rem}.leading-7{line-height:1.75rem}.mx-auto{margin-left:auto;margin-right:auto}.ml-1{margin-left:.25rem}.mt-2{margin-top:.5rem}.mr-2{margin-right:.5rem}.ml-2{margin-left:.5rem}.mt-4{margin-top:1rem}.ml-4{margin-left:1rem}.mt-8{margin-top:2rem}.ml-12{margin-left:3rem}.-mt-px{margin-top:-1px}.max-w-6xl{max-width:72rem}.min-h-screen{min-height:100vh}.overflow-hidden{overflow:hidden}.p-6{padding:1.5rem}.py-4{padding-top:1rem;padding-bottom:1rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.pt-8{padding-top:2rem}.fixed{position:fixed}.relative{position:relative}.top-0{top:0}.right-0{right:0}.shadow{box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)}.text-center{text-align:center}.text-gray-200{--text-opacity:1;color:#edf2f7;color:rgba(237,242,247,var(--text-opacity))}.text-gray-300{--text-opacity:1;color:#e2e8f0;color:rgba(226,232,240,var(--text-opacity))}.text-gray-400{--text-opacity:1;color:#cbd5e0;color:rgba(203,213,224,var(--text-opacity))}.text-gray-500{--text-opacity:1;color:#a0aec0;color:rgba(160,174,192,var(--text-opacity))}.text-gray-600{--text-opacity:1;color:#718096;color:rgba(113,128,150,var(--text-opacity))}.text-gray-700{--text-opacity:1;color:#4a5568;color:rgba(74,85,104,var(--text-opacity))}.text-gray-900{--text-opacity:1;color:#1a202c;color:rgba(26,32,44,var(--text-opacity))}.underline{text-decoration:underline}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.w-5{width:1.25rem}.w-8{width:2rem}.w-auto{width:auto}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}@media (min-width:640px){.sm\:rounded-lg{border-radius:.5rem}.sm\:block{display:block}.sm\:items-center{align-items:center}.sm\:justify-start{justify-content:flex-start}.sm\:justify-between{justify-content:space-between}.sm\:h-20{height:5rem}.sm\:ml-0{margin-left:0}.sm\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\:pt-0{padding-top:0}.sm\:text-left{text-align:left}.sm\:text-right{text-align:right}}@media (min-width:768px){.md\:border-t-0{border-top-width:0}.md\:border-l{border-left-width:1px}.md\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (min-width:1024px){.lg\:px-8{padding-left:2rem;padding-right:2rem}}@media (prefers-color-scheme:dark){.dark\:bg-gray-800{--bg-opacity:1;background-color:#2d3748;background-color:rgba(45,55,72,var(--bg-opacity))}.dark\:bg-gray-900{--bg-opacity:1;background-color:#1a202c;background-color:rgba(26,32,44,var(--bg-opacity))}.dark\:border-gray-700{--border-opacity:1;border-color:#4a5568;border-color:rgba(74,85,104,var(--border-opacity))}.dark\:text-white{--text-opacity:1;color:#fff;color:rgba(255,255,255,var(--text-opacity))}.dark\:text-gray-400{--text-opacity:1;color:#cbd5e0;color:rgba(203,213,224,var(--text-opacity))}.dark\:text-gray-500{--tw-text-opacity:1;color:#6b7280;color:rgba(107,114,128,var(--tw-text-opacity))}}
        </style>

    </head>
    <body class="antialiased">
        <div class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
                <div class="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
                    <html lang="en">
                    <div class="wrapper">
                        <div class="align">
                            <p id="forget">This widget is working on<strong>location</strong><br><br> base Now your City is <strong>{{$array->name}}</strong></p>

                            <div class="app">
                                <div id="main">
                                    <!-- Settings Menu -->
                                    <div id="introscreen"><img src="https://image.flaticon.com/icons/svg/578/578457.svg"></div>

                                    <!-- Settings Button -->
                                    <span id="btn-right">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</span>
                                    <!-- End Settings Button -->

                                    <!-- Info Message-->
                                    <div id="info-msg">
                                        <div class="msg-box">
                                            <h1></h1>
                                            <p></p>
                                        </div>
                                    </div>
                                    <!-- End Info Message-->

                                    <div id="settings" class="">

                                        <p id="settings-info"><i class="fa fa-cog" aria-hidden="true"></i> Settings</p>


                                        <ul>
                                            <li>
                                                <div class="text">
                                                    <p>Choose a theme</p>
                                                    <div class="row">
                                                        <span class="green"></span>
                                                        <span class="turqoise"></span>
                                                        <span class="blue"></span>
                                                        <span class="purple"></span>
                                                    </div>
                                                </div>
                                                <div class="sub-info">Select the desired theme. Press the "Save" button to update the theme!</div>
                                            </li>

                                        </ul>

                                        <button type="button" id="save-button" placeholder="Update">Save</button>


                                    </div>
                                    <!-- End Settings Menu  -->

                                    <div id="central">
                                        <div id="top-menu-info">
                                            <p id="location">
                                                <i class="fa fa-map-marker" aria-hidden="true"></i>
                                                <span>{{$array->name}}</span>
                                            </p>
                                            <p id="date">
                                                <span>{{$array->dt}}</span>
                                            </p>
                                        </div>

                                        <div id="temp-div">
                                            <div id="icon-temp">
                                                @foreach($array->weather as $link)
                                                <p>{{$link->main}} </p>
                                                    <p>  <img width="40" src="https://raw.githubusercontent.com/yuvraaaj/openweathermap-api-icons/master/icons/{{$link->icon}}.png"
                                                    </p>

                                                @endforeach
                                            </div>


                                            <p id="current-temp-big">

                                                <span id="ctb">{{ round($array->main->temp) }} </span>
                                                <span id="ctbicon">ºC</span>



                                            </p>
                                        </div>

                                        <div id="weather-menu">
                                            <ul>
                                                <li id="forecastli">
                                                    <p class="li_title">9 Days Forecast</p>
                                                    <span class="day_left">
									<i class="fa fa-chevron-left" aria-hidden="true"></i>
								</span>
                                                    <span class="day_right">
									<i class="fa fa-chevron-right" aria-hidden="true"></i>
								</span>
                                                    <div class="li_row">
                                                        <div class="col-1 day10item">
                                                            <i class="wi wi-day-sunny" aria-hidden="true"></i>
                                                            <span>NaN <br> <i>NaN°</i></span>
                                                        </div>
                                                        <div class="col-2 day10item" >
                                                            <i class="wi wi-day-cloudy" aria-hidden="true"></i>
                                                            <span>NaN <br> <i>NaN°</i></span>
                                                        </div>
                                                        <div class="col-3 day10item">
                                                            <i class="wi wi-day-rain" aria-hidden="true"></i>
                                                            <span>NaN <br> <i>NaN°</i></span>
                                                        </div>

                                                        <div class="col-1 day10item">
                                                            <i class="wi wi-day-sunny" aria-hidden="true"></i>
                                                            <span>NaN <br> <i>NaN°</i></span>
                                                        </div>
                                                        <div class="col-2 day10item" >
                                                            <i class="wi wi-day-cloudy" aria-hidden="true"></i>
                                                            <span>NaN <br> <i>NaN°</i></span>
                                                        </div>
                                                        <div class="col-3 day10item">
                                                            <i class="wi wi-day-rain" aria-hidden="true"></i>
                                                            <span>NaN <br> <i>NaN°</i></span>
                                                        </div>

                                                        <div class="col-1 day10item">
                                                            <i class="wi wi-day-sunny" aria-hidden="true"></i>
                                                            <span>NaN <br> <i>NaN°</i></span>
                                                        </div>
                                                        <div class="col-2 day10item" >
                                                            <i class="wi wi-day-cloudy" aria-hidden="true"></i>
                                                            <span>NaN <br> <i>NaN°</i></span>
                                                        </div>
                                                        <div class="col-3 day10item">
                                                            <i class="wi wi-day-rain" aria-hidden="true"></i>
                                                            <span>NaN <br> <i>NaN°</i></span>
                                                        </div>
                                                    </div>

                                                    <div id="dotmenu">
                                                        <span class="currentday"></span>
                                                        <span></span>
                                                        <span></span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- partial -->
                    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script><script  src="./script.js"></script>

                </div>
                </div>
            </div>
        </div>
    </body>
</html>
