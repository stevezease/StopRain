
$(document).ready(function(){
	console.log("jquery")

// $.ajax({
// 		url: "https://api.darksky.net/forecast/421cc13604c01e8ea018b8bcd92b08e8/37.8267,-122.4233",
// 		crossDomain: false,
// 		success: function(data){
// 			console.log(data)
// 			},

// 		}
// 	)
	var weatherUrl = "https://api.darksky.net/forecast/421cc13604c01e8ea018b8bcd92b08e8/37.8267,-122.4233"
	var xhr = new XMLHttpRequest();
	xhr.onload = function(){
		if(xhr.status === 200){
			//success
			console.log(xhr.responseText)
			// var data = JSON.parse(xhr.responseText);
			// console.log(data);
			if(data.error){
				//display non-user
				console.log(data.error)

			}else{
				//success
				
			
			}	

		}else{
			console.log("request failed")
		}
	
	}//end onLoad
	xhr.open('Get', weatherUrl)
	xhr.send();



});// end doc ready
