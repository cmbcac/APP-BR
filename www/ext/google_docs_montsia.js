function mmg_google_docs_spreadsheet_montsia(id, callback) {
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
					'type': "Ràdio",
                    'title':entry['gsx$indiqueuelmunicipidesdonompliuelformulari'].$t,
                    'description': '<u><b><font size="4">RÀDIO</font></u></b></b>'+
									'<br/><b><font size="2">Catalunya Informació:</font></b> '+'<font size="2">' + entry['gsx$catalunyainformació'].$t + 
									'<br/><b><font size="2">Catalunya Música:</font></b> '+'<font size="2"> ' + entry['gsx$catalunyamúsica'].$t +
									'<br/><b><font size="2">Radio Nacional España:</font></b> '+'<font size="2"> ' + entry['gsx$radionacionalespaña'].$t +
									'<br/><b><font size="2">Radio Clássica:</font></b> '+'<font size="2"> ' + entry['gsx$radioclásica'].$t + 
									'<br/><b><font size="2">Radio 3:</font></b> '+'<font size="2"> ' + entry['gsx$radio3'].$t +
									'<br/><b><font size="2">Radio 4:</font></b> '+'<font size="2"> ' + entry['gsx$ràdio4'].$t +
									'<br/><b><font size="2">Radio 5:</font></b> '+'<font size="2"> ' + entry['gsx$radio5'].$t +
									'<br/><b><font size="2">RAC 1:</font></b> '+'<font size="2"> ' + entry['gsx$rac1'].$t +
									'<br/><b><font size="2">RAC 105:</font></b> '+'<font size="2">' + entry['gsx$rac105'].$t +
									'<br/><b><font size="2">Flaix FM:</font></b> '+'<font size="2">' + entry['gsx$flaixfm'].$t +
									'<br/><b><font size="2">Ràdio Flaixbac:</font></b> '+'<font size="2">' + entry['gsx$ràdioflaixbac'].$t +
									'<br/><b><font size="2">Ràdio Tele Taxi:</font></b> '+'<font size="2">' + entry['gsx$ràdioteletaxi'].$t +
									'<br/><b><font size="2">Ràdio RM:</font></b> '+'<font size="2">' + entry['gsx$ràdiorm'].$t +
									'<br/><b><font size="2">Ràdio Estel:</font></b> '+'<font size="2">' + entry['gsx$ràdioestel'].$t +
									'<br/><b><font size="2">SER:</font></b> '+'<font size="2">' + entry['gsx$ser'].$t +
									'<br/><b><font size="2">40 Principales:</font></b> '+'<font size="2"> ' + entry['gsx$principales'].$t +
									'<br/><b><font size="2">Cadena Dial:</font></b> '+'<font size="2">' + entry['gsx$cadenadial'].$t +
									'<br/><b><font size="2">Ona FM:</font></b> '+'<font size="2">' + entry['gsx$onafm'].$t +
									'<br/><b><font size="2">Maxima FM:</font></b> '+'<font size="2">' + entry['gsx$maximafm'].$t +
									'<br/><b><font size="2">M80:</font></b> '+'<font size="2">' + entry['gsx$m80'].$t +
									'<br/><b><font size="2">Radiolé:</font></b> '+'<font size="2">' + entry['gsx$radiolé'].$t +
									'<br/><b><font size="2">COPE:</font></b> '+'<font size="2">' + entry['gsx$cope'].$t +
									'<br/><b><font size="2">Cadena 100:</font></b> '+'<font size="2">' + entry['gsx$cadena100'].$t +
									'<br/><b><font size="2">Rock FM:</font></b> '+'<font size="2">' + entry['gsx$rockfm'].$t +
									'<br/><b><font size="2">Onda Cero:</font></b> '+'<font size="2">' + entry['gsx$ondacero'].$t +
									'<br/><b><font size="2">Europa FM:</font></b> '+'<font size="2">' + entry['gsx$europafm'].$t +
									'<br/><b><font size="2">Melodia FM:</font></b> '+'<font size="2">' + entry['gsx$melodíafm'].$t +
									'<br/><b><font size="2">Kiss FM:</font></b> '+'<font size="2">' + entry['gsx$kissfm'].$t +
									'<br/><b><font size="2">Radio Blanca:</font></b> '+'<font size="2">' + entry['gsx$radioblanca'].$t +
									'<br/><br/><u><b><font size="4">RÀDIO LOCAL</font></u></b></b>'+
									'<br/><b><font size="2">Alcanar Ràdio:</font></b> '+'<font size="2">' + entry['gsx$alcanarràdio'].$t +
									'<br/><b><font size="2">Amposta Ràdio:</font></b> '+'<font size="2">' + entry['gsx$ampostaràdio'].$t +
									'<br/><b><font size="2">La Plana Ràdio (Santa Bàrbara):</font></b> '+'<font size="2">' + entry['gsx$laplanaràdiosantabàrbara'].$t +
									'<br/><b><font size="2">Ràdio Joventut (Masdenverge):</font></b> '+'<font size="2">' + entry['gsx$ràdiojoventutmasdenverge'].$t +
									'<br/><b><font size="2">Ràdio Ràpita:</font></b> '+'<font size="2">' + entry['gsx$ràdioràpita'].$t +
									'<br/><b><font size="2">Ràdio Ulldecona:</font></b> '+'<font size="2">' + entry['gsx$ràdioulldecona'].$t +
									'<br/><b><font size="2">Ràdio Sant Jaume:</font></b> '+'<font size="2">' + entry['gsx$ràdiosantjaume'].$t +
									'<br/><b><font size="2">La Sénia Ràdio:</font></b> '+'<font size="2">' + entry['gsx$laséniaràdio'].$t +
									'<br/><b><font size="2">Digital Hits FM:</font></b> '+'<font size="2">' + entry['gsx$digitalhitsfm'].$t +
									'<br/><br/><u><b><font size="4">TELEVISIÓ NACIONAL</font></u></b></b>'+
									'<br/><b><font size="2">TV3:</font></b> '+'<font size="2">' + entry['gsx$tv3'].$t + 
									'<br/><b><font size="2">324:</font></b> '+'<font size="2">' + entry['gsx$canal324'].$t +
									'<br/><b><font size="2">Súper3 / Canal 33:</font></b> '+'<font size="2">' + entry['gsx$súper3canal33'].$t +
									'<br/><b><font size="2">Esport3:</font></b> '+'<font size="2">' + entry['gsx$esport3'].$t + 
									'<br/><b><font size="2">TV3 HD:</font></b> '+'<font size="2">' + entry['gsx$tv3hd'].$t +
									'<br/><b><font size="2">8TV:</font></b> '+'<font size="2">' + entry['gsx$tv'].$t +
									'<br/><b><font size="2">TAC 105 TV:</font></b> '+'<font size="2">' + entry['gsx$rac105tv'].$t +
									'<br/><b><font size="2">Barça TV:</font></b> '+'<font size="2">' + entry['gsx$barçatv'].$t +
									'<br/><br/><u><b><font size="4">TELEVISIÓ LOCAL</font></u></b></b>'+
									'<br/><b><font size="2">Canal 21 Ebre:</font></b> '+'<font size="2">' + entry['gsx$canal21ebre'].$t +
									'<br/><b><font size="2">Canal TE:</font></b> '+'<font size="2">' + entry['gsx$canalte'].$t +
									'<br/><br/><u><b><font size="4">TELEVISIÓ ESTATAL</font></u></b></b>'+
									'<br/><b><font size="2">La 1:</font></b> '+'<font size="2">' + entry['gsx$la1'].$t +
									'<br/><b><font size="2">La 2:</font></b> '+'<font size="2">' + entry['gsx$la2'].$t +
									'<br/><b><font size="2">24H:</font></b> '+'<font size="2">' + entry['gsx$h'].$t +
									'<br/><b><font size="2">Clan:</font></b> '+'<font size="2">' + entry['gsx$clan'].$t +
									'<br/><b><font size="2">Tdp:</font></b> '+'<font size="2">' + entry['gsx$tdp'].$t +
									'<br/><b><font size="2">Tdp HD:</font></b> '+'<font size="2">' + entry['gsx$tdphd'].$t +
									'<br/><b><font size="2">Antena 3:</font></b> '+'<font size="2">' + entry['gsx$antena3'].$t +
									'<br/><b><font size="2">Antena 3 HD:</font></b> '+'<font size="2">' + entry['gsx$antena3hd'].$t +
									'<br/><b><font size="2">La Sexta:</font></b> '+'<font size="2">' + entry['gsx$lasexta'].$t +
									'<br/><b><font size="2">La Sexta HD:</font></b> '+'<font size="2">' + entry['gsx$lasextahd'].$t +
									'<br/><b><font size="2">Neox:</font></b> '+'<font size="2">' + entry['gsx$neox'].$t +
									'<br/><b><font size="2">Nova:</font></b> '+'<font size="2">' + entry['gsx$nova'].$t +
									'<br/><b><font size="2">Mega:</font></b> '+'<font size="2">' + entry['gsx$mega'].$t +
									'<br/><b><font size="2">Telecinco:</font></b> '+'<font size="2">' + entry['gsx$telecinco'].$t +
									'<br/><b><font size="2">Telecinco HD:</font></b> '+'<font size="2">' + entry['gsx$telecincohd'].$t +
									'<br/><b><font size="2">Cuatro:</font></b> '+'<font size="2">' + entry['gsx$cuatro'].$t +
									'<br/><b><font size="2">Cuatro HD:</font></b> '+'<font size="2">' + entry['gsx$cuatrohd'].$t +
									'<br/><b><font size="2">Boing:</font></b> '+'<font size="2">' + entry['gsx$divinity'].$t +
									'<br/><b><font size="2">Energy:</font></b> '+'<font size="2">' + entry['gsx$energy'].$t +
									'<br/><b><font size="2">Discovery Max:</font></b> '+'<font size="2">' + entry['gsx$discoverymax'].$t +
									'<br/><b><font size="2">Disney Channel:</font></b> '+'<font size="2">' + entry['gsx$disneychannel'].$t +
									'<br/><b><font size="2">Paramount Channel:</font></b> '+'<font size="2">' + entry['gsx$paramountchannel'].$t +
									'<br/><b><font size="2">Altres canals de TV 1:</font></b> '+'<font size="2">' + entry['gsx$altrescanalsdetv1'].$t +
									'<br/><b><font size="2">Altres canals de TV 2:</font></b> '+'<font size="2">' + entry['gsx$altrescanalsdetv2'].$t +
									'<br/><b><font size="2">Altres canals de TV 3:</font></b> '+'<font size="2">' + entry['gsx$altrescanalsdetv2'].$t +
									'<br/><br/><b><u>ALTRES FORMES DE COMUNICACIÓ 1</u></b>'+
									'<br/><b><font size="2">Nom comercial del servei:</font></b> '+'<font size="2">' + entry['gsx$discoverymax'].$t +
									'<br/><br/><b><u>ALTRES FORMES DE COMUNICACIÓ 2</u></b>'+
									'<br/><br/><u><b><font size="4">OBSERVACIÓNS</font></u></b></b><br/>' + entry['gsx$observacionsespaidedicataincloureaquellesmancancesdeficiènciesenrelacióalsmitjansdecomunicacióqueesrebenalmunicipi'].$t,  
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
                if(feature.properties['type']=="Ràdio"){ feature.properties['marker-color']='#8a0000'} 
              
            });
        }
        return callback(features);
    }
}


