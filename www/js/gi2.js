$("head").append('<script type="text/javascript" src="' + "js/gt.js" + '"></script>');

function setIcon(){
	im = {
		url: 'img/logo-IPTV2.png',//,
		scaledSize: new google.maps.Size(30, 26),
	};
	
}

function cargaDatosSegonsID(map){

	var data_IPTV = '1scC17IE0nbBGIihkBBSD9IPv2AJE-hec9s7-9d8gH34';
	executaAJAX(map,"",data_IPTV);
}

var inProgress = 1;

function afegeixPoble(comarca, pobles, entry){
	
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

