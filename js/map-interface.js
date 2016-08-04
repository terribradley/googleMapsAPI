var apiKey = require('./../.env').apiKey;
var map;
var geocoder;

// var initMap = require('./../js/map.js')

$( document ).ready(function() {
  $("#tour-form").submit(function(event){
    event.preventDefault();
    var query = $('input:radio[name="type-of-tour"]:checked').val().split("+");
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
    // $.get("https://maps.googleapis.com/maps/api/js?key=AIzaSyBqE85hcRrRHYNxF6x0b83XSsdxKqaDUv0&libraries=places").then(function(response)

    // });
  });
});
function initMap(center) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: 8
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
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
}
