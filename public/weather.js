
$(document).ready(function(){
	console.log("jquery")

  $.ajax({
		url: "https://api.darksky.net/forecast/421cc13604c01e8ea018b8bcd92b08e8/37.8267,-122.4233",
		crossDomain: true,
		 dataType: 'jsonp',
		success: function(data){ 
			console.log(data) ;
 			}
 		}); 

});// end doc ready
