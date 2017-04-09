
$(document).ready(function(){
	console.log("jquery")
/// location based functions
var latitude = "" ;
var longitude = "" ;

getLocation();

getImage() ;



function getLocation(){
	console.log("location lookup")
	var zip = 13078
	var address ="1600+Amphitheatre+Parkway,+Mountain+View,+CA"
	var mapsKey = "AIzaSyDPgJc7v3TwguI2hVqvSZVf9D32Y0e52rE"
	$.ajax({
		url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + zip + "&key=" + mapsKey,
		crossDomain: true,
		 // dataType: 'jsonp',
		success: function(data){ 
			console.log(data) ;
			// var data = JSON.parse(data)
			var coords = data.results[0].geometry.location
			console.log(coords)
			latitude =  coords.lat
			longitude = coords .lng
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
				 	 $('#image-container').append("<img src='"+"https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" + latitude + "," + longitude + 
				 	 	"&fov=90&heading=235&pitch=10&key=" + 
				 	 	mapsKey+"' />");
				// var image = data// console.log(data)
			} else {
					//load a default image
			}
 		}
 	});	
}

<<<<<<< HEAD
// getLocation()

=======
>>>>>>> 3e329cb679fb5f85e5f36b5d5d816a5a438697e1

//end location and image functions

  $.ajax({
		url: "https://api.darksky.net/forecast/421cc13604c01e8ea018b8bcd92b08e8/45.512794,-122.679565",
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
      			
      		  google.charts.load('44', {
 			  callback: function () { 
 			var c = []
			for(var i = 0; i < rainData.length; i++){
				c[i] = [new Date(rainData[i].time * 1000), rainData[i].precipProbability];
			}

  			var data = new google.visualization.DataTable();
  			data.addColumn('date', 'Date');
  			data.addColumn('number', 'Probability');

  			data.addRows(c);

  			var options = {
    			hAxis: {
      			title: 'Time'
    		},
    			vAxis: {
      			title: 'Probability'
    		},
    			backgroundColor: '#f1f8e9'
  			};

  			var chart = new google.visualization.LineChart(document.getElementById('yo'));
  			chart.draw(data, options);
 			 }, 
			  packages: ['corechart']
				});

      		/*display the time left until rain stops*/
      		console.log(timeLeft);
 		}
 	});
});// end doc ready