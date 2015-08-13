function getLocation(){
	if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getWeather);
	}
	else {
		console.log("Geolocation not supported");
	}
}

function reverseGeocode(lat,lng){
	var latlng = lat + "," + lng;
	var geoAPI = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
		$.getJSON(
geoAPI + latlng + "&key=AIzaSyDog0nB3AX7hL-O2rYefxD50V3FHvH_ed0", displayCity);
}

function displayCity(data){
	if (data.status === "OK"){
		var city = data.results[0].address_components[2].long_name;
		$('#city').append("Weather in " + city);
	}
	else {
		alert("Error, couldn't reverse geo code lat/long");
	}
}

function getWeather(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	var apiURL=
	'https://api.forecast.io/forecast/72e36452a9afb113f7c6789f265e0df9/';

	$.getJSON(
	apiURL + latitude + "," + longitude + "?callback=?", mutate);
}

function mutate(localData){
	var imgurl = bgImages[localData.currently.icon];
	var icon = iconClass[localData.currently.icon];
	$('#weather-icon').addClass(icon);
	reverseGeocode(localData.latitude, localData.longitude);
	$('#temp').text(localData.currently.temperature + "°F");
	$('body').css("background-image", 'url(' + imgurl + ')');
}

$(document).ready(function(){
	getLocation();
});
var iconClass = {
	"clear-day": "wi-day-sunny",
	"clear-night": "wi-night-clear",
	"rain": "wi-day-rain",
	"snow": "wi-day-snow",
	"wind": "wi-day-windy",
	"cloudy": "wi-day-cloudy",
	"#sleet": "wi-day-sleet",
	"fog": "wi-day-fog",
	"partly-cloudy-day": "wi-day-sunny-overcast",
	"partly-cloudy-night": "wi-night-alt-cloudy",
};
var bgImages = {
	"clear-day": "https://static.pexels.com/photos/1056/sea-sky-sunny-beach.jpg",
	"clear-night": "https://static.pexels.com/photos/7117/mountains-night-clouds-lake.jpg",
	"rain": "https://static.pexels.com/photos/5275/road-curve-bend-rainy.jpg",
	"snow": "https://static.pexels.com/photos/5086/snow-landscape-mountains-nature.jpeg",
	"wind": "https://static.pexels.com/photos/423/jetty-landing-stage-sea-black-and-white.jpg",
	"cloudy": "https://static.pexels.com/photos/2314/clouds-cloudy-forest-mountain.jpg",
	"#sleet": "http://ilovehatephoto.com/wp-content/uploads/2015/02/Roads-Boston-Blizzard-2015-photography-sony-iLHP-1024x768.jpg",
	"fog": "https://static.pexels.com/photos/4827/nature-forest-trees-fog.jpeg",
	"partly-cloudy-day": "http://stophavingaboringlife.com/images/dailyphoto/100/cloudy_day_sihanoukville_cambodia.JPG",
	"partly-cloudy-night": "https://beachesandbounty.files.wordpress.com/2011/11/img_1564.jpg",
};
/*
content.append("<p>" + localData.latitude + "</p>");
	content.append("<p>" + localData.longitude + "</p>");
	content.append("<p>" + localData.currently.summary + "<p>");
	content.append("<p>" + localData.currently.icon + "<p>");
	content.append("<p>" + localData.currently.temperature +  "<p>");
*/
