let coordinates = [];
let fiveDayBtn = document.getElementById("five-day-btn");
let localBtn = document.getElementById("local-btn");
let fiveDayClose = document.getElementById("five-day-close")
const modal = document.querySelector('#main-modal');
const forecastModal = document.getElementById('forecast-modal')
const close = document.querySelector('.delete');
var geoList = document.getElementById('geoList');

const request = new XMLHttpRequest();

function currentLocation(){
  request.open('GET', 'https://api.ipdata.co/city?api-key=b53d1b37f3bb53a8adf505bfa55a8744e4c397f7dab1a848f5b4cb3f&fields');
  request.setRequestHeader('Accept', 'application/json');
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      citySearch(this.response);
      modal.style.display = 'block' 
    }
  };
  request.send();
}

function citySearch(location){
  //let citySearch = function(location){
  
    //let city = searchBar.value.trim().toLowerCase();
    let city = inputDest1.value.trim().toLowerCase();
    console.log("destination" + city + "place");    
   
    if(city){
      
      getGeoApi(city);
      displayCityForecast(city);
      fiveDayForecast(city);
      inputDest1.value = "";
      
      
   }else if(location){
    console.log(location);

    getGeoApi(city);
    displayCityForecast(location);
    fiveDayForecast(location); 

  }else{

    modal.style.display = "none";
      
  }
}

function getGeoApi(city) {
    var requestUrl = "https://api.ipgeolocation.io/astronomy?apiKey=d2acb4a4fa244bcfadf3ea9bc8f04705&location=" + city;
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            var lat = data.location.latitude;
            var long = data.location.longitude;      
            
            var sunsetTime = data.sunset;
            sunsetTime = sunsetTime.split(':');
            var hours = Number(sunsetTime[0]);
            var minutes = Number(sunsetTime[1]);
            var sunsetTimeValue;
            if (hours > 0 && hours <= 12) {
                sunsetTimeValue = "" + hours;
            } else if (hours > 12) {
                sunsetTimeValue = "" + (hours - 12);
            } else if (hours == 0) {
                sunsetTimeValue = "12";
            }
            sunsetTimeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
            sunsetTimeValue += (hours >= 12) ? " PM" : " AM";  
            
            var sunriseTime = data.sunrise;
            sunriseTime = sunriseTime.split(':');
            var hours = Number(sunriseTime[0]);
            var minutes = Number(sunriseTime[1]);
            var sunriseTimeValue;
            if (hours > 0 && hours <= 12) {
                sunriseTimeValue = "" + hours;
            } else if (hours > 12) {
                sunriseTimeValue = "" + (hours - 12);
            } else if (hours == 0) {
                sunriseTimeValue = "12";
            }
            sunriseTimeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
            sunriseTimeValue += (hours >= 12) ? " PM" : " AM";  
            
            var moonsetTime = data.moonset;
            moonsetTime = moonsetTime.split(':');
            console.log(moonsetTime)
            var hours = Number(moonsetTime[0]);
            var minutes = Number(moonsetTime[1]);
            var moonsetTimeValue;
            if (hours > 0 && hours <= 12) {
                moonsetTimeValue = "" + hours;
            } else if (hours > 12) {
                moonsetTimeValue = "" + (hours - 12);
            } else if (hours == 0) {
                moonsetTimeValue = "12";
            }
            moonsetTimeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
            moonsetTimeValue += (hours >= 12) ? " PM" : " AM";  
            
            var moonriseTime = data.moonrise;
            moonriseTime = moonriseTime.split(':');
            var hours = Number(moonriseTime[0]);
            var minutes = Number(moonriseTime[1]);
            var moonriseTimeValue;
            if (hours > 0 && hours <= 12) {
                moonriseTimeValue = "" + hours;
            } else if (hours > 12) {
                moonriseTimeValue = "" + (hours - 12);
            } else if (hours == 0) {
                moonriseTimeValue = "12";
            }
            moonriseTimeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes; // get minutes
            moonriseTimeValue += (hours >= 12) ? " PM" : " AM"; // get AM/PM
  
            if (('#geoList')) {
                $('#geoList').empty();
            }
            $('#geoList').append("<li><strong> Sunrise: </strong>" + sunriseTimeValue + "</li>");
  
            $('#geoList').append("<li><strong> Sunset: </strong>" + sunsetTimeValue + "</li>");
            $('#geoList').append("<li><strong> Moonrise: </strong>" + moonriseTimeValue + "</li>");
  
            $('#geoList').append("<li><strong> Moonset: </strong>" + moonsetTimeValue + "</li>");
            $('#geoList').append("<li><strong> Sun Distance: </strong>" + data.sun_distance + " km</li>");
            $('#geoList').append("<li><strong> Moon Distance: </strong>" + data.moon_distance + " km</li>");
        })
  } 
  
  
  function displayCityForecast(city){
    var apiKey = "92252352bb4c13bb77ea5f2f8e41a5a8";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      var weatherIcon = response.weather[0].icon;
      var date = $("<h4>").text(moment().format('l'));
      var icon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + ".png");
      var tempFarenheit = (response.main.temp - 273.15) * 1.80 + 32;
      var feelLike = (response.main.feels_like - 273.15) * 1.80 + 32;
  
            
      $("#city-name").text(response.name);
      $("#city-name").append(date);
      $("#city-name").append(icon);
      $("#city-temp").text(tempFarenheit.toFixed(2) + " \u00B0F");
      $("#city-humidity").text(response.main.humidity + "%");
      $("#city-feelslike").text(feelLike.toFixed(2) + " \u00B0F");
  
        
      var lat = response.coord.lat
      var lon = response.coord.lon
      
  
      queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon; 
      $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response){
  
        
        var uvIndex = response.value;
        console.log(uvIndex);
        $("#city-uvindex").removeClass("favorable");
        $("#city-uvindex").removeClass("moderate");
        $("#city-uvindex").removeClass("severe");
        if (uvIndex <= 2.9){
          $("#city-uvindex").addClass("favorable");
        } else if (uvIndex >= 3 && uvIndex <= 7.9){
          $("#city-uvindex").addClass("moderate");
        } else {
          $("#city-uvindex").addClass("severe");
        };
  
      $("#city-uvindex").text(response.value);});   
      $("#display-city").show();
    }); 
  };
  
  
function fiveDayForecast(city){	
    var apiKey = "92252352bb4c13bb77ea5f2f8e41a5a8"	
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;	
  
      $.ajax({	
        url: queryURL,	
        method: "GET"	
      }).then(function(response){	
        console.log(response);
        var counter = 1	
        for(var i=0; i < response.list.length; i += 8){	
          var date = moment(response.list[i].dt_txt).format("l");	
          var weatherIcon = response.list[i].weather[0].icon;	
          var temperatureF = (response.list[i].main.temp - 273.15) * 1.80 + 32;	
  
          
          $("#day-" + counter).text(date);	
          $("#icon" + counter).attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + ".png");	
          $("#temp-" + counter).text(temperatureF.toFixed(2) + " \u00B0F");	
          $("#humidity-" + counter).text(response.list[i].main.humidity + "%"); counter++;};
        $("#extended5").show();   	
      });	
  };
  
  
  close.addEventListener('click', function () { 
    modal.style.display = 'none' 
    let extended5 = document.getElementById("forecast-modal");
    extended5.style.display = 'none'
  }) 
  
    fiveDayBtn.addEventListener('click', function() {
    let extended5 = document.getElementById("forecast-modal");
    extended5.style.display = 'block'
  })
  
  fiveDayClose.addEventListener('click', function(){
    let extended5 = document.getElementById("forecast-modal");
    extended5.style.display = 'none'
  })
  
  window.addEventListener('click', function (event) { 
    if (event.target.className ===  'delete') { 
      modal.style.display = 'none' 
  
    } 
  })   

localBtn.addEventListener('click', currentLocation); 

