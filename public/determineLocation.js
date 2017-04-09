

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
       $('#locationInfo').html(results[0].formatted_address);  
        getMinutes();
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
				getMinutes();
			} else {
					//load a default image
			}
 		}
 	});	
 
}

var a;
var b; 
function getMinutes(){
	var timeLeft;
	var rainData;
	$.ajax({

		//url: "https://api.darksky.net/forecast/421cc13604c01e8ea018b8bcd92b08e8/"+latitude+","+longitude,
		url: "https://api.darksky.net/forecast/5b7567002e4c065a19cca5fc70b371c5/56.8198,-5.1052",
		crossDomain: true,
		 dataType: 'jsonp',
		success: function(data){ 
			console.log(data) ;
			console.log("minutely", data.minutely)
			rainData = data.minutely.data
			console.log("rainData", rainData)
			timeLeft = 0;
      		var run = false;

      		/*It's currently raining so find how much longer it will rain*/
      		if(rainData[0].hasOwnProperty("precipType")){
         		for (var i = 1 ; i < rainData.length ; i++) {
            		if(rainData[i].precipProbability < .3){
               			timeLeft = i;
               			break;   
            		}
         		}
         		if(timeLeft == 0)
         			timeLeft = 60;
         		if(rainData[0].precipIntensity < .1){
            		/*insert code to let user know to run*/
            		run = true;
            		alert("RUN");
         		}
      		}


      		/*display the time left until rain stops*/
      		//console.log(latitude);
		    //console.log(longitude);
		    //console.log("https://api.darksky.net/forecast/421cc13604c01e8ea018b8bcd92b08e8/"+latitude+","+longitude);
      		console.log(timeLeft);
      		console.log(rainData[0].hasOwnProperty("precipType"));
      		a = timeLeft;
      		b = rainData[0].hasOwnProperty("precipType");
      		determineWeather()
 		}
 	});
}
function ajaxreturn(){
	console.log("ajax:" + a + "," + b);
	return [a,b];
}

function determineWeather() {

    var ans = ajaxreturn();
    var minutes  = ans[0];

    if (minutes == undefined)
      minutes = 0;
    var Rain = true;
    Rain = ans[1]; 
    if (Rain){
      document.body.style.backgroundColor = "#6B7F98";
      document.getElementById("percipitation").innerHTML = "Rain";
      document.getElementById("weathericon").src =  "res/rain.png";

    }else {
      document.body.style.backgroundColor = "#FFA500";
      document.getElementById("sentence").innerHTML = "Not Currently Raining";
      document.getElementById("weathericon").src =  "res/Sunny.png";
      document.getElementById("centerf").remove();
      document.getElementsByTagName("canvas")[0].remove();
      document.getElementById("minutesleft").innerHTML = minutes;

 


      /*var img = new Image();

      img.onload = function() {
       document.getElementById("centerfold").appendChild(img);
     };

     img.src = "res/Sunny.png";
     img.style.width= '40vw';*/
   }}
