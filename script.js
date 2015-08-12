function getLocation(){
	if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getWeather);
	}
	else {
		console.log("Geolocation not supported");
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
	var content = $('.container');
	content.append("<p>" + localData.latitude + "</p>");
	content.append("<p>" + localData.longitude + "</p>");
	content.append("<p>" + localData.currently.summary + "<p>");
	content.append("<p>" + localData.currently.icon + "<p>");
	content.append("<p>" + localData.currently.temperature +  "<p>");

}
$(document).ready(function(){
	getLocation();
});
