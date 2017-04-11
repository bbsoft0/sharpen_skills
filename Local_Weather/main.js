var app = angular.module('weatherModule', []);

app.factory('weatherAPI', function($http) {
  var ID = '&appid=891cf4918e3c3628fae10ecb87f0dbd6';
  return {
      //Geolocation API
      ip : function() {
        return $http.get('http://ip-api.com/json');
      },
      //Open Weather API
      openweathermap : function(country, city) {
        return $http.get(
            'http://api.openweathermap.org/data/2.5/weather?q='
            + city + ',' + country
            + '&units=imperial' + ID
        );
      },
      weather : function() {
       var self = this;
       return this.ip().then(function(ipinfo) {
         return self.openweathermap(
            ipinfo.data.countryCode.toLowerCase(),
            ipinfo.data.city
         ).then(function(weather) {
           return {
             ipInfo : ipinfo.data,
             weather : weather.data
           };
         });
        });
      }
  };
});

app.directive('wIcon', function(){
  function resolve(desc) {
    var icon = '';
      switch(desc) {
        case 'Clear':
          icon = 'wi-day-sunny';
          break;
        case 'Clouds':
          icon = 'wi-day-cloudy';
          break;
        case 'Additional':
          icon = 'wi-cloud';
          break;
        case 'Mist':
          icon = 'wi-sprinkle';
          break;  
        case 'Extreme':
          icon = 'wi-cloudy';
          break;
        case 'Drizzle':
           icon = 'wi-night-rain';
          break;     
        case 'Rain':
          icon = 'wi-rain';
          break;
        case 'Thunderstorm':
          icon = 'wi-thunderstorm';
          break;      
        case 'Snow':
          icon = 'wi-snow';
          break;
        case 'Atmosphere':
          icon = 'wi-windy';
          break;
        default :
          break;
      }
    return icon;
  };

  return {
    restrict : 'A',
    link : function(scope, element) {
      
      element.addClass(resolve
       ((scope.data.weather.weather.length > 1 ?
       scope.data.weather.weather[1].main :
       scope.data.weather.weather[0].main)
      ));
    }
  };
});

//Change Celsius to Fahrenheit and back
app.directive('tempInfo', function() {
  var metric = 'F';
  var temp;
  var outTemp = 0;
  
  function convert(f) {
    return Math.floor((f - 32) * 5 / 9);
  }
  
  return {
    
    restrict: 'A',
    link : function(scope, element) {
      temp = Math.floor(scope.data.weather.main.temp);
      outTemp = convert(temp);
      metric = 'C';
      
      element.on('click', function() {
        if (metric === 'F') {
          metric = 'C';
          outTemp = convert(temp);
        } else {
          metric = 'F';
          outTemp = temp;
        }
        element.html( outTemp + '<span>'+metric+'</span>');
      });
      
      element.html(outTemp + '<span>'+metric+'</span>'); 
    }
  }
});


app.controller('w_controller', function($scope, weatherAPI) {
   weatherAPI.weather().then(function(info) {
     $scope.data = info;
   });
});