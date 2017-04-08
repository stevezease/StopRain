
$(document).ready(function(){
	console.log("jquery")
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