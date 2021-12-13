$(document).ready(function(){
	//Caching DOM elements
	var $RightMenu = $('#settings'),
			$RightButton = $('#btn-right'),
			$WeatherMenu = $('#weather-menu'),
			$Main = $('#main'),
			$Central = $('#central'),
			$Info = $('#info-msg'),
			$InfoMsgBx = $('#info-msg .msg-box'),
			$InfoMsgBxP = $('#info-msg .msg-box p'),
			$InfoMsgBxH1 = $('#info-msg .msg-box h1'),
			$DotMenu = $('#dotmenu span'),
			$TempDiv = $('#temp-div'),
			$LiRow = $('.li_row');

	var arrayThemes = ['green','turqoise','blue','purple'],
			randomTheme = Math.floor(Math.random() * 4),
			array_ID = ['#unit','#atm','#sun','#wind'],
			SettingsListLi = $('#settings ul li, .search-container'),
			SettingsArray = [],
			info = {
				"Char":[
					"Invalid Characters! 😡","Please use only letters! (aA-zZ) "
				],
				"Loc":[
					"Invalid Location 📍","Please update your location!"
				],
				"Loading":[
					"Searching for location...","Location found!"
				],
				"Loading2":[
					"Saving, Please wait...","Save Complete!"
				],
				"GetDataError":[
					"Huston, we have a problem 🚀🌑","This city doesn't exist!"
				],
				"NotEnoughCharacters":[
					"🏙️ Name is too short!","Please enter at least 4 letters"
				]
			};

	//End Caching DOM elements
	var CurrentSlide = 0,
			CurrentSlideX = [0,358,718],
			GetData = true,
			tmp_Location,
			LocalSettings,
			LoadedData;

	// Load Settings from Local Storage
	(function(){
		LocalSettings = localStorage.getItem('SavedData');

		if (LocalSettings === null)
		{
			var Settings = '1,1,1,1,' + arrayThemes[randomTheme] + ',London';
			SettingsArray = Settings.split(',');

			getWeather('London', false);
			toLocalStorage();
		}
		else
		{
			SettingsArray = LocalSettings.split(',');
			getWeather(SettingsArray[SettingsArray.length-1], false);
		}
		tmp_Location = SettingsArray[SettingsArray.length-1];

		loadCheckboxSettings();
		loadIntro();

		console.log("Hello there 😜");
	})();

	// --------- Start Functions ----------
		function getWeather(Loc, ShowLoading){
			let query = '';

			$.getJSON(query, function(data) {

			});
		}
		function toLocalStorage(){
			// Save to local storage
			LocalSettings = SettingsArray.toString();
			localStorage.setItem('SavedData', LocalSettings);
		}

		function weatherIcon(d){
			  let icon = "";


			return icon;
		}
		function applyData(d){
			//Location
			$locspan.text(d.location.city);

			let datespan = d.item.pubDate.split(" "), datespantext = "";
			for ( var date_i = 0; date_i < datespan.length - 3; date_i++ ){
				datespantext += " ";
				datespantext += datespan[date_i];
			}
			$datespan.text(datespantext);

			// Central Info
			let currentTemp = d.item.condition.temp;
			let icon = weatherIcon(d.item.condition.code);

			if (SettingsArray[0] == 1)
			{
				$ctbicon.text(" ºC");
			}
			else
			{
				$ctbicon.text(" ºF");
				currentTemp = (convertToF(currentTemp)).replace(" ºF","");
			}
			$ctb.text(currentTemp);
			$icontempi.removeClass().addClass(icon);
			$icontempp.text(d.item.condition.text);

			// Atmospheric
			if ($atm.prop('checked') === true)
			{
				$atmli.removeClass().addClass('aswshown');

				let pressure = d.atmosphere.pressure;
				let visib = d.atmosphere.visibility;

				if (SettingsArray[0] == 1)
				{
					pressure = Math.round((pressure * 0.02953)/1.3332239)+ " mmHg";
					visib =  Math.round(visib) + " " + d.units.distance;
				}
				else
				{
					pressure =  Math.round(pressure * 0.02953) + " in";
					visib = convertToMiles(visib) + " mi";
				}
				$hd.text(d.atmosphere.humidity + "%");
				$pd.text(pressure);
				$vd.text(visib);
			}
			else
			{
				$atmli.removeClass().addClass('aswhidden');
			}

			// Sunrise/Sunset
			if ($sun.prop('checked') === true)
			{
				$sunli.removeClass().addClass('aswshown');
				let sunrise = d.astronomy.sunrise.replace(" am","").split(":");
				let sunset = d.astronomy.sunset.replace(" pm","").split(":");

				if (sunset[1].length < 2)
				{
					sunset[1] = "0" + sunset[1];
				}

				if (SettingsArray[0] == 1 )
				{
					if (sunrise[1] < 10){
						sunrise[1] = "0" + sunrise[1];
					}
					$srd.text(sunrise[0] + ":" + sunrise[1]);
					$ssd.text((Math.floor(sunset[0]) + 12) + ":" + sunset[1]);
				}
				else
				{
					$srd.text(sunrise[0] + ":" + sunrise[1] + " am");
					$ssd.text(sunset[0]+ ":" + sunset[1] + " pm");
				}

				var hours = 12;

				if(sunset[0] > sunrise[0])
				{
					 hours = 11;
				}

				let totalHours = (Math.floor(sunset[0]) + hours) - Math.floor(sunrise[0]);
				let minDif,
						sr = Math.floor(sunrise[1]), // Store the minutes for sunrise
						ss = Math.floor(sunset[1]);  // Store the minutes for sunset

				if (sr < ss)
				{
					minDif = ss - sr;
				}
				else
				{
					minDif = (60 - sr) + ss;
				}

				if (minDif < 10)
				{
					minDif = "0" + minDif;
				}
				else if ( minDif == 60){
					minDif = "00";
				}

				$td.text(totalHours + ":" + minDif);
			}
			else
			{
				$sunli.removeClass().addClass('aswhidden');
			}

			// Wind
			if ($wind.prop('checked') === true)
			{
				$windli.removeClass().addClass('aswshown');
				let speedWind = d.wind.speed,
						tempChill = d.wind.chill;

				if (SettingsArray[0] == 1)
				{
					speedWind = Math.round(d.wind.speed) + " km/h";
					tempChill = convertToC(tempChill);
				}
				else
				{
					speedWind = convertToMiles(speedWind) + " mph";
					tempChill += " ºF";
				}

				let iconWind = "";
				if (d.wind.direction >= 0 && d.wind.direction <= 90)
				{
					iconWind = "fa fa-long-arrow-right";
				}
				else if (d.wind.direction > 90 && d.wind.direction <= 180)
				{
					iconWind = "fa fa-long-arrow-up";
				}
				else if (d.wind.direction > 180 && d.wind.direction <= 270)
				{
					iconWind = "fa fa-long-arrow-left";
				}
				else if (d.wind.direction > 270 && d.wind.direction <= 360)
				{
					iconWind = "fa fa-long-arrow-down";
				}

				$sd.text(speedWind);
				$cd.text(tempChill);
				$directioni.removeClass().addClass(iconWind);
				$dd.text(d.wind.direction + " º");
			}
			else
			{
				$windli.removeClass().addClass('aswhidden');
			}

			// 9 Days forecast
			for (var item = 0; item < $10days.length; item++)
			{
				let CurrentDay = d.item.forecast[item + 1].day;
				let CurrentTemp = d.item.forecast[item + 1].high;
				let CurrentTempLow = d.item.forecast[item + 1].low;
				let CurrentIcon = weatherIcon(d.item.forecast[item + 1].code);

				if (SettingsArray[0] == 1)
				{
					CurrentTemp += " ºC";
					CurrentTempLow += " ºC";
				}
				else
				{
					CurrentTemp = convertToF(CurrentTemp);
					CurrentTempLow = convertToF(CurrentTempLow);
				}

				$($10days[item]).find('i').removeClass().addClass(CurrentIcon);
				$($10days[item]).find('span').html(CurrentDay + "</br><i>" + CurrentTemp + " <strong>/</strong> " + CurrentTempLow + "</i>");
			}
		}
		function loadCheckboxSettings(){
			// General Settings
			for (var i = 0; i < array_ID.length; i++)
			{
				if (SettingsArray[i] == '1')
				{
					 $(array_ID[i]).prop('checked',true);
				}
			}
			// Apply theme
			$Main.addClass(SettingsArray[SettingsArray.length-2] + ' poor-Mozilla');
			$('span.' + SettingsArray[SettingsArray.length-2]).addClass('current');
		}
		function loadIntro(){
			$('#btn-right').css('display','none');
			$('#weather-menu-btn').css("display", "none");

			$('#introscreen').addClass('sunloading');
			setTimeout(function(){
				$('#introscreen').addClass('animfin');

				$('#btn-right').removeAttr('style');
				$('#weather-menu-btn').removeAttr('style');
			}, 650);
			setTimeout(function(){
				$('#introscreen').remove();
			}, 1350);

			setTimeout(function(){
				$('#forget').addClass('hide');
			}, 7500);
		}


	// --------- Start Function Buttons -----------
		// Update Checkbox
		$('input[type=checkbox]').on('change', function(e){
			let index = $('input[type=checkbox]').index(this);

			if ($(this).prop('checked'))
			{
				SettingsArray[index] = '1';
			}
			else
			{
				SettingsArray[index] = '0';
			}
		});

		// Open Settings Menu
		$('#main').on('click','#btn-right, #weather-menu-btn', function(e){
			e.preventDefault();
			var $CurrentButton = $(this);

			if ($CurrentButton.is('#btn-right'))
			{
				$RightButton.toggleClass('open');
				$RightMenu.toggleClass('show');

				$('body').removeAttr('class');

				if ($RightMenu.hasClass('show'))
				{
					$RightButton.prop('disabled', true);
					$Main.removeClass('poor-Mozilla');

					$('body').addClass(SettingsArray[4]);

					for (var ii = 0; ii < SettingsListLi.length; ii++){
						AnimiateLiMenu(ii, SettingsListLi[ii], 0);
					}

					setTimeout(function()
					{
						$RightButton.prop('disabled', false);
						$Main.addClass('poor-Mozilla');
					}, 595);
				}
				else if ($RightMenu.hasClass(''))
				{
					$RightButton.prop('disabled', true);
					$Main.removeClass('poor-Mozilla');

					if (LoadedData != null){
						applyData(LoadedData);
					}

					$('body').removeAttr('class');
					setTimeout(function()
					{
						$RightButton.prop('disabled', false);
						for (var ii = 0; ii < SettingsListLi.length; ii++){
							AnimiateLiMenu(ii, SettingsListLi[ii], 1);
						}
						$Main.addClass('poor-Mozilla');
					}, 595);
				}
			}
			else if ($CurrentButton.is('#weather-menu-btn'))
			{
				$WeatherMenu.toggleClass('show');

				if ($TempDiv.hasClass(''))
				{
					$TempDiv.addClass('weather-menu-show');
				}
				else
				{
					$TempDiv.removeClass('weather-menu-show');
				}
			}

			function AnimiateLiMenu(Step, currentLi, AddRemove) {
				if (AddRemove === 0){
					setTimeout(function() {
						$(currentLi).addClass('slideAnimation');
					}, Step * 35);
				}
				else{
					$(currentLi).removeClass('slideAnimation');
				}

			}

		});

		// Error Button
		$('#info-msg').on('click','#ok-btn', function(e){
			if ($Info.hasClass('show'))
			{
				$Info.removeClass('show');
				$InfoMsgBx.removeClass('open');

				setTimeout(function(){
					$InfoMsgBx.find('#ok-btn').remove();
				}, 1000);
			}
		});

		function updateErrorMsg(value, type){
			$Info.addClass('show');

			$InfoMsgBx.addClass('open');
			$InfoMsgBxH1.text(info[value][0]);
			$InfoMsgBxP.text(info[value][1]);


		}
		// End Error Button

		// Change Theme
		$('.row').on('click','span', function(e){
			var new_theme = $(this).attr('class').split(' ');
			if (new_theme[1] != 'current')
			{
				$('.row span.' + SettingsArray[4]).removeClass('current');
				$(this).addClass('current');

				SettingsArray[4] = new_theme[0];
			}
			$Main.removeAttr('class').addClass(SettingsArray[4] + ' poor-Mozilla');
			$('body').removeAttr('class').addClass(SettingsArray[4]);
		});

		// Update Button
		function isValid(string) {
			var char = '~`!#$%^&*+=[]\';,/{}|\":<>?@1234567890';
			for (var i = 0; i < string.length; i++)
			{
				if (char.indexOf(string.charAt(i)) != -1)
				{
					return false;
				}
			}
			return true;
		}

		function checkBlank(string) {
			var count = 0;
		}

		$('#settings').on('click','#update-button', function(e){
			tmp_Location = $('#search').val();

			if (tmp_Location === "")
			{
				tmp_Location = SettingsArray[5];
				GetData = true;
			}
			else
			{
				var CheckForInvalid = isValid(tmp_Location);
				var CheckForBlank = checkBlank(tmp_Location);

				if ($RightMenu.hasClass('show') && (!CheckForInvalid || !CheckForBlank))
				{
					GetData = false;

					if (!CheckForBlank)
					{
						updateErrorMsg('NotEnoughCharacters', 0);
					}
					else
					{
						updateErrorMsg('Char', 0);
					}
				}
				else
				{
					if (SettingsArray[5] != tmp_Location)
					{
						getWeather(tmp_Location, true);
						GetData = true;
					}
				}
			}
		});
		// End Update Button

		// Save button
		$('#settings').on('click','#save-button', function(e){
			// Check if location is valid or not and add the info msg.
			if ($RightMenu.hasClass('show') && (GetData === false))
			{
				updateErrorMsg('Loc', 0);
			}
			else
			{
				updateErrorMsg('Loading2', 1);
				toLocalStorage();
			}
		});


	//----------- End Function Buttons -----------
	//----------- End Function -----------

}); // End $(document).ready
