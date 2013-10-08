
			$(document).ready(function(){


				var api_key = '5c44e59107d11d7e';
				var i = 0;

				var location = {
					setState:['NY', 'CA'],
					setCity: ['New_York', 'San_Francisco']
				};

				//weather underground API call


				var url = 'http://api.wunderground.com/api/'+api_key+'/astronomy/q/'+location.setState[i]+'/'+location.setCity[i]+'.json?callback=?';

					$.getJSON(url,function(json){

							//the month, day, year

						var d = new Date();

							var day = d.getDate();
							var d=new Date();

							var month=new Array();
							month[0]="January";
							month[1]="February";
							month[2]="March";
							month[3]="April";
							month[4]="May";
							month[5]="June";
							month[6]="July";
							month[7]="August";
							month[8]="September";
							month[9]="October";
							month[10]="November";
							month[11]="December";
							var monthName = month[d.getMonth()];

								var outputDate = 

									monthName + ' ' +
									+ day  + ' ' +
									d.getFullYear();

						var sunsetHour = json.sun_phase.sunset.hour;
						var sunsetMinute = json.sun_phase.sunset.minute;
						var sunsetMinCount = parseFloat(sunsetMinute) + parseFloat((sunsetHour*60));

							// military time adjustment


							if (sunsetHour>=13){
								sunsetHour=sunsetHour-12;
							}

							// console.log(json.sun_phase);

							//display city and remove underscores

						$('#location').append(location.setCity[i]);

								$('#location').each(function() {
   							 	var $this = $(this);

    							$this.text($this.text().replace(/_/g, ' '));
								});

							//display the date

						$('#date').append(outputDate); 

							//display the sunset time

						$('#sunSetTime').append('Sunset at '+ sunsetHour +':'+ sunsetMinute); 

							//minutes till sunset
						
						var currentHour = d.getHours();
						var currentMinute = d.getMinutes();

						console.log('the time is: '+currentHour+':'+currentMinute)

						var currentMinCount = (currentHour*60) + currentMinute;
						var hourTillSunset = (json.sun_phase.sunset.hour-currentHour);

						var minTillSunset = (sunsetMinCount-currentMinCount);


						console.log('minutes till sunset = '+ minTillSunset);


						if (minTillSunset >= 61 ){
							$('#timeTill').prepend('sunset in' +' '+ hourTillSunset +' hours'); 
						}
						if (minTillSunset <= 60 && minTillSunset >= 2){
							$('#timeTill').prepend('sunset in' +' '+ minTillSunset +' minutes');
						}
						if (minTillSunset <= 1 && minTillSunset >= 0 ){
							$('#timeTill').prepend('sunset imminent!');
						}
						if (minTillSunset < 0){
							$('#timeTill').prepend('the sun has set');
						}
					

							//canvas drawings

						

					    var canvas = document.getElementById('myCanvas');
					    var context = canvas.getContext('2d');

					    var red = 190;
					    	if (minTillSunset <= 80 && minTillSunset >= -20) {
					    	red=red+50;
					    	}

					    var sunsetColor = "rgb(" + red + ",224,245)";
					    var sunPosition = minTillSunset+60;
					    console.log('sky redness value = '+red);


					      
					    context.canvas.width  = 400; 
					    context.canvas.height = 400;

					    context.beginPath();
						context.arc(canvas.width/2,canvas.height/2+100,180,0,2*Math.PI);
						context.fillStyle = sunsetColor;
						context.fill();

						context.beginPath();
						context.arc(canvas.width/2,canvas.height-(sunPosition),60,0,2*Math.PI);
						context.fillStyle = 'white';
						context.fill();

						context.beginPath();
						context.arc(canvas.width/2,canvas.height+600,700,0,2*Math.PI);
						context.fillStyle = '#133a63';
						context.fill();					

				});



			});
