var apiKey = require('./../.env').apiKey;

$(document).ready(function(event){
  $("#tour-form").submit(function(event){
    event.preventDefault();
    var startLocation = $("#start-location").val();
    var endLocation = $("#end-location").val();
    console.log("got to the api call")
    $.get("https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&callback=initMap" async defer).then(function(map) {
      $("#output").html(map);
    });
  });
});
