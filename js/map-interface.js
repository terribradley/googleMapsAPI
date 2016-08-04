var apiKey = require('./../.env').apiKey;
var map;
var geocoder;
var query;

// var initMap = require('./../js/map.js')

$( document ).ready(function() {
  $("#tour-form").submit(function(event){
    event.preventDefault();
    query = $('input:radio[name="type-of-tour"]:checked').val().split("+");
    // debugger;
    var location = $("#location").val();
    geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': location}, function(results, status) {
      if (status == 'OK') {
        initMap(results[0].geometry.location);
        query.forEach(function(individualQuery){
          var request = {
            location: results[0].geometry.location,
            radius: '500',
            query: individualQuery
          };
          var service = new google.maps.places.PlacesService(map);
          service.textSearch(request, callback);
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  });
});
function initMap(center) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: 12
  });
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var path;
  console.log(query)
  if(query[0]==="zoos"){
    path="img/riparianhabitat.png";
  } else if(query[0]==="amusement_park") {
    path="img/game.png"
  } else if(query[0]==="cemetery") {
    path="img/ghost.png"
  } else if(query[0]==="spa") {
    path="img/treat.png"
  } else if(query[0]==="church") {
    path="img/spiritual.png"
  } else if(query[0]==="library") {
    path="img/nerd.png"
  } else {
    path="img/drunk.png";
  }
  var infowindow = new google.maps.InfoWindow({
    content: place.name
  });
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    icon: path,
    position: place.geometry.location
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
