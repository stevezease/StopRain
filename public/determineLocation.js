

	 navigator.geolocation.getCurrentPosition(function (position) {

	 //alert(position.coords.latitude) ;
	 //initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	  var geocoder = new google.maps.Geocoder;
	  var lat = position.coords.latitude;
	  var lon = position.coords.longitude;
	 //map.setCenter(initialLocation);
	 geocodeLatLng(geocoder , lon , lat ) ; 
	 } 	
	 );
	

	function geocodeLatLng(geocoder, lon, lat ) {

 	var latlng = { lat:lat, lng:lon } ;
 	console.log(latlng) ; 
 	geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
       
       //alert(results[1].formatted_address) ; 
       $('#locationInfo').html(results[1].formatted_address);  
      } else {
        window.alert('We could not determine your location');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });


 	}


$(document).ready(function(){

 	$('#changeLocation').on('click', function ()   { 

 		alert('test'); 
 	} ) ; 

 }); 