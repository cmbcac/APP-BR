function mmg_google_docs_spreadsheet_usuaris(id, callback) {
    if (typeof reqwest === 'undefined'){
        throw 'CSV: reqwest required for mmg_csv_url';
    }
	
    var url = 'https://spreadsheets.google.com/feeds/list/' +
        id + '/1/public/values?alt=json-in-script&callback=callback';
    reqwest({
        url: url,
        type: 'jsonp',
        jsonpCallback: 'callback',
        success: response,
        error: response
    }); 
   
    function response(x) {
        var features = [],
            latfield = '',
            lonfield = '';
        if (!x || !x.feed) return features;
        for (var f in x.feed.entry[0]) {
            if (f.match(/\$Lat/i)){
                latfield = f;           
            }
            if (f.match(/\$Lon/i)){
                lonfield = f;              
            }
        }
		
        for (var i = 0; i < x.feed.entry.length; i++) {                             
            var entry = x.feed.entry[i];
            var feature = {
                type: 'Feature',
                properties: {
                    'marker-color':'#fff',
					'type':"Usuaris",
                    'title':entry['gsx$direcció'].$t,
                    'description': '<b><font size="2">Observacions:</font></b> '+'<font size="2">' + entry['gsx$observacions'].$t, 					
                    'date':  entry['gsx$marcatemporal'].$t,
                    //'hour': 'Hora: ' + entry['gsx$horadelincidente'].$t,
                    //'marcatemporal':entry['gsx$marcatemporal'].$t      
                },
				geometry: {
                    type: 'Point',
                    coordinates: []
                }
            };

            for (var y in entry) {
                if (y === latfield) feature.geometry.coordinates[1] = parseFloat(entry[y].$t);
                else if (y === lonfield) feature.geometry.coordinates[0] = parseFloat(entry[y].$t);
                else if (y.indexOf('gsx$') === 0) {                            
                    feature.properties[y.replace('gsx$', '')] = entry[y].$t;
                }
            }
            
            if (feature.geometry.coordinates.length == 2) features.push(feature);
			
            _.each(feature, function(value, key) {
                if(feature.properties['type']=="Usuaris"){ feature.properties['marker-color']='#fff'} 
           
            });
        }
		
        return callback(features);
    }
}


