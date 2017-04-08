
$(document).ready(function(){
	console.log("jquery")

  $.ajax({
		url: "https://api.darksky.net/forecast/421cc13604c01e8ea018b8bcd92b08e8/37.8267,-122.4233",
		crossDomain: true,
		 dataType: 'jsonp',
		success: function(data){ 
			console.log(data) ;
			console.log("minutely", data.minutely)
			var rainData = data.minutely.data
			console.log("rainData", rainData)
			// console.log("precip", data)

 			}
 		}); 

});// end doc ready
