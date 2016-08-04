var apiKey = require('./../.env').apiKey;
var map;
// var initMap = require('./../js/map.js')

$( document ).ready(function() {
  $("#tour-form").submit(function(event){
    event.preventDefault();
    var query = $('input:radio[name="type-of-tour"]:checked').val();
    // debugger;
    var placeName = $("#location").val()
    $.get("https://maps.googleapis.com/maps/api/js?key=AIzaSyBqE85hcRrRHYNxF6x0b83XSsdxKqaDUv0&libraries=places").then(function(response){
      var portland = new google.maps.LatLng(45.52, -122.67);
      var myOptions = {
        zoom: 15,
        center: portland,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById("map"), myOptions);
      var request = {
        location: portland,
        radius: '500',
        query: query
      };
      var service = new google.maps.places.PlacesService(map);
       service.textSearch(request, callback);
    });
  });
});

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
