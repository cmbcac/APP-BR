function afegeixPobleVell(pobles, entry){
	var p = new Poble(entry['gsx$indiqueuelmunicipidesdonompliuelformulari'].$t);
	getInfo(pobles, p, entry);
	pobles.push(p)
}


function doStuffVell(data){
	/*parseja text*/
			var start = 25;
			var end = data.length - 2;
			/*console.log(data.slice(start, end));*/
			var JSONText = data.slice(start,end);
			JParsedText = jQuery.parseJSON(JSONText);
			data = JParsedText;
			
			/*inicialitza variables*/
			var myLatLng;
			var features = [],
			latfield = '',
			lonfield = '';
			if (!data || !data.feed) return features;
			
			/*busca markers*/
			for (var i = 0; i < data.feed.entry.length; i++){
				var entry = data.feed.entry[i];
				for (var f in entry) {
					if (f.match(/\$Lat/i)){
						latfield = f;           
					}
					if (f.match(/\$Lon/i)){
						lonfield = f;
					}

				}
				
				if((latfield != '')  && (lonfield != '')){
					latfield = Number(entry[latfield].$t);
					lonfield = Number(entry[lonfield].$t);

				}
				else{
					alert("return");
					return;
				}
				
				myLatLng = {lat: latfield, lng: lonfield};
				var marker = new google.maps.Marker({
					position: myLatLng,
					title: entry['gsx$indiqueuelmunicipidesdonompliuelformulari'].$t
				});
				marker.setMap(map);
				array.push(marker);
				
				console.log(myLatLng);
				afegeixPoble(pobles, entry);
				(function(marker, poble){
					google.maps.event.addListener(marker, 'click', function(e){
						infoWindow.setContent(poble.poble + "  "+poble.descripcio[0].titol + " ");
						infoWindow.open(map,marker);
					})
				})(marker, pobles[pobles.length-1]);
	
			}
}



function cargaDatosVell(map){
	$.ajax({
		url:  'https://spreadsheets.google.com/feeds/list/1WCIpcQTYJ3_xr8vJFvTtoVLdQ_7qT7rHC7Tg9JzXoQ4/1/public/values?alt=json-in-script&callback=callback',
		type: 'GET',
		success: function(data){
			doStuffVell(data);
		}	
	});
	
}
