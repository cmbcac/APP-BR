function updateIndicator() {
	// Show a different icon based on offline/online
	if(!todo){
		if(navigator.onLine){
			location.reload();
		}
		else{
			alert("S'ha perdut la connexió. En restablir-se es recarregarà la pàgina");
		}	
	}
	else{
		if(!navigator.onLine){
			alert("En aquests moments no setà connectat. En establir-se es recarregarà la pàgina");
			
		}
	}
}

var todo = true;

// Update the online status icon based on connectivity
window.addEventListener('online',  updateIndicator);
window.addEventListener('offline', updateIndicator);
updateIndicator();

class Detall{
	constructor(titol, contingut){
		this.titol = titol;
		this.contingut = contingut;
	}
	setTitol(titol){this.titol = titol;}
	setContingut(contingut){this.contingut = contingut;}
	
	getTitol(){return this.titol;}
	getContingut(){return this.contingut;}
	
	
}

class Poble{
	constructor(poble){
		this.poble = poble;
		this.latitud;
		this.longitud;
		this.tipus;
		this.titol;
		this.descripcio = [];
		this.date;
		this.comarca;
	}
	
	 setContent(){
		var s="";
		for(var i = 0;  i <this.descripcio.length; i++){
			s = s + this.descripcio[i].titol;
			var c = this.descripcio[i].contingut;
			if (c != "" && c != undefined){
				s = s + ": " + c
			}
			else{
				if ( c == undefined){
					s = s + ": undefined"
				}
			}
			s = s+ "<br>"
		}
		return s
	}
	setLatitud(latitud){
		this.latitud = latitud;
	}
	setLongitud(longitud){
		this.longitud = longitud;
	}
	setTipus(tipus){
		this.tipus = tipus;
	}
	setTitol(titol){
		this.titol=titol;
	}

	
}

var JParsedText;

var array = [];
var windows = [];
var map;
var infoWindow;

var canals = [];
var pobles = [];
var markclusterer;	

var im;
var typemap = "";
	
function initMap() {
		todo = !todo;
		try{
			var catalunya = {lat: 41.385900681193434, lng: 2.1711516380310063};
				infoWindow = new google.maps.InfoWindow();
				map = new google.maps.Map(document.getElementById('main'), {
				center: catalunya,
				zoom: 8,
			    zoomControl: false,
			    mapTypeControl: false,
			    scaleControl: false,
			    streetViewControl: false,
			    rotateControl: false,
			    fullscreenControl: false
			});
			cargaDatosSegonsID(map);	
		}
		catch(err){
			console.log("error");

		}
		typemap = "bright";
		
	
}

function setIcon(){
	im = {
		url: 'img/logo-IPTV2.png',//,
		scaledSize: new google.maps.Size(30, 26),
	};
	
}

function cargaDatosSegonsID(map){
	

	var data_IPTV = '1scC17IE0nbBGIihkBBSD9IPv2AJE-hec9s7-9d8gH34';
	setIcon();
	executaAJAX(map,"",data_IPTV);
}

var inProgress = 1;




function controlaInformacio(data, nom){
	
	comarca = nom;
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
			title: entry['gsx$entitat'].$t,
			icon: im
		});
		marker.setMap(map);
		array.push(marker);
		
		//console.log(myLatLng);
		afegeixPoble(pobles, entry);

		
		(function(marker, poble){
			google.maps.event.addListener(marker, 'click', function(e){
				//infoWindow.setContent(poble.poble + "  "+poble.descripcio[0].titol + " ");
				infoWindow.setContent("<strong>" + poble.poble+ "</strong><br>" + poble.setContent());
				infoWindow.open(map,marker);
			})
		})(marker, pobles[pobles.length-1]);
		
		
	}	
}


function afegeixPoble(pobles, entry){
	
	var p = new Poble(entry['gsx$entitat'].$t);
	p.descripcio.push(new Detall("Entitat", entry['gsx$entitat'].$t));
	p.descripcio.push(new Detall("Tipus entitat", entry['gsx$tipusentitat'].$t));
	p.descripcio.push(new Detall("Nom comercial", entry['gsx$nomcomercial'].$t));
	p.descripcio.push(new Detall("URL", entry['gsx$url'].$t));
	p.descripcio.push(new Detall("Programació", entry['gsx$programació'].$t));
	p.descripcio.push(new Detall("Canal TDT", entry['gsx$canaltdt'].$t));
	p.descripcio.push(new Detall("Xarxa", entry['gsx$xarxa'].$t));
	p.descripcio.push(new Detall("Youtube", entry['gsx$youtube'].$t));
	p.descripcio.push(new Detall("Població", entry['gsx$població'].$t));
	p.descripcio.push(new Detall("Observacions", entry['gsx$observacions'].$t));		
	pobles.push(p);
	
	
}

var styledMapType;
var styledMapType2;

function setStyles(){
	styledMapType = new google.maps.StyledMapType(
            [
			{elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ],
            {name: 'Dark Map'});
styledMapType2 = new google.maps.StyledMapType(
            [
              {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
              {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c9b2a6'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{color: '#dcd2be'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ae9e90'}]
              },
              {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#93817c'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{color: '#a5b076'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#447530'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#f5f1e6'}]
              },
              {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{color: '#fdfcf8'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#f8c967'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#e9bc62'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{color: '#e98d58'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{color: '#db8555'}]
              },
              {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{color: '#806b63'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{color: '#8f7d77'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#ebe3cd'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: '#b9d3c2'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#92998d'}]
              }
            ],
            {name: 'Afternoon Map'});
}
		
window.addEventListener('devicelight', (e) => {
	if(typemap != ""){
		if(event.value < 50){
			map.mapTypes.set('dark_map', styledMapType);
			map.setMapTypeId('dark_map');
			typemap = "dark_map"
		}
		else{
			map.mapTypes.set('afternoon_map', styledMapType2);
			map.setMapTypeId('afternoon_map');
			typemap = "afternoon_map";
		}
	}

});