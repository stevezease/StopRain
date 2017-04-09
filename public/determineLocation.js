

var latitude ;
var longitude ; 
var geocoder = new google.maps.Geocoder;

	 navigator.geolocation.getCurrentPosition(function (position) {

	 //alert(position.coords.latitude) ;
	 //initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	  
	  var lat = position.coords.latitude;
	  var lon = position.coords.longitude;
	  latitude = lat ; 
	  longitude = lon; 
	 //map.setCenter(initialLocation);
	 geocodeLatLng(geocoder , lon , lat ) ; 
	 } 	
	 );
	

	function geocodeLatLng(geocoder, lon, lat ) {

 	var latlng = { lat:lat, lng:lon } ;
 	
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


function getLocation(){
	
	var zip = 13078 ; 

	var address = $('#address').val(); 
	 
	var mapsKey = "AIzaSyDPgJc7v3TwguI2hVqvSZVf9D32Y0e52rE" ;

	$.ajax({
		url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + mapsKey,
		crossDomain: true,
		 // dataType: 'jsonp',
		success: function(data){ 
		
			// var data = JSON.parse(data)
			var coords = data.results[0].geometry.location
			
			latitude =  coords.lat
			longitude = coords .lng
			
			 geocodeLatLng(geocoder , longitude , latitude ) ; 
 			getImage()

 			}
 		}); 

} 

function getImage(){
	var mapsKey = "AIzaSyB1qwEi2o-kXL5flzPkNHuKGScWi8xifS4"
	$.ajax({
		url: "https://maps.googleapis.com/maps/api/streetview/metadata?size=400x400&location=" + latitude + "," + longitude + 
			"&fov=90&heading=235&pitch=10&key=" + 
			mapsKey,
		crossDomain: true,
		 // dataType: 'jsonp',
		success: function(data){ 
			if(data.status != "ZERO_RESULTS"){
				$('#background').attr({src: "https://maps.googleapis.com/maps/api/streetview?size=640x640&location=" + latitude + "," + longitude + 
				 	 	"&fov=120&heading=235&pitch=0&key=" +	mapsKey    } ); 
				 //	 $('#image-container').append("<img src='"+"https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" + latitude + "," + longitude + 
				 //	 	"&fov=90&heading=235&pitch=10&key=" + 
				// 	 	mapsKey+"' />");
				// var image = data// console.log(data)
			} else {
					//load a default image
			}
 		}
 	});	
}

function getMinutes(){
	$.ajax({
		url: "https://api.darksky.net/forecast/421cc13604c01e8ea018b8bcd92b08e8/"+"latitude"+","+"longitude",
		crossDomain: true,
		 dataType: 'jsonp',
		success: function(data){ 
			console.log(data) ;
			console.log("minutely", data.minutely)
			var rainData = data.minutely.data
			console.log("rainData", rainData)
			var timeLeft = 0;
      		var run = false;

      		/*It's currently raining so find how much longer it will rain*/
      		if(rainData[0].hasOwnProperty("precipType")){
         		for (var i = 1 ; i < rainData.length ; i++) {
            		if(rainData[i].precipProbability < .3){
               			timeLeft = i;
               			break;   
            		}
         		}
         		if(rainData[0].precipIntensity < .1){
            		/*insert code to let user know to run*/
            		run = true;
            		alert("RUN");
         		}
      		}


      		/*display the time left until rain stops*/
      		console.log(timeLeft);
      		console.log(rainData[0].hasOwnProperty("precipType"));
      		return [timeLeft, rainData[0].hasOwnProperty("precipType")];
 		}
 	});
}