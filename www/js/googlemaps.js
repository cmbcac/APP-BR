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
			s = s + this.descripcio[i].getTitol();
			var c = this.descripcio[i].getContingut();
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
	
function initMap() {
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


function cargaDatosSegonsID(map){
	var data_altaribagorca = '1o28GgM3THzqLivRGjD17jF4-AMb66Km_S34GKFDe85s';
	var data_altcamp = '1JndbQsVpzVTIID0sf_1wJuqDADPtrerqXFIUF__LBMI';
	var data_altemporda = '1h7cGJ9oGbA0sXr0HuRR75rb2N88xURh2ZAlJJ50kdxE';
	var data_altpanades = '1FrQO4IDl70l4qUj63OzMAHqLlhV67qWc-xP-jzSCkos';
	var data_alturgell = '1WA1ZXw6U9mWfhTpfLCPwNl8nGzxWliHCjjnCtVlL5bk';
	var data_anoia = '19iwB4oW8VEwq7SB8J0reQKdavQRGsG9TTSx16Rq7YDk';
	var data_aran = '1fI5RFLliSB0MtECvxT4GuoMoQpRo3OKjbU4sQ5O4muk';
	var data_bagues = '1R4nBEm019vzeZR11YMMXhqfKx35c-_4fXsYMhtDUuw8';
	var data_baixcamp = '1t7VrTbVEnTcbU9pJzNFrVJGjaf19iX3OGZHZQABGlLo';
	var data_baixebre = '14O6RbL-l4RBbWLEKDZnqNYIe9tR2eMITNg_VbdAmxyk';
	var data_baixemporda = '1tpoJwXMhlAWYpCooOJzQFXAxiykKhULaPSyGH2VIfuE';
	var data_baixllobregat = '1YGuMrnJ2XVGX8thsAskzHeuD-XbyMZcKQ8Ssqu2HjPc';
	var data_baixpanades = '1IWHBt17GWnvLfUcxOahKlOcw6H9R2t84s7Bms2wmK20';
	var data_barcelones = '1L_pt_2ZZeIDHTXn9YR_M-cPbqkehWhQ_1tRHFNxC80c';
	var data_bergueda = '1v2EU6xywTdbERXuXiJxyaWOC_Pjtfa_TfZ6vjjbLt3w';
	var data_cerdanya = '1pA8n5HtPM_olfm0NKmqd96n7QImq4KDjzptR4AnbGi4';
	var data_concadebarbera = '1XKh4HWgzd_u0R5Sg5D8W7ejTZ9wo8KrEU2im4yA89J0';
	var data_garraf = '1uIXneWHDJUiVUDmKzkQ4cpoWfBBPrrLd49wkiTLj5YM';
	var data_garrigues = '1Fk7zg-UVfpNACKO_VXNyc4RHUPI8_wPca-222DUOm9I';
	var data_garrotxa = '1hiT9nZyM2eLlZOV_89oIDhEd9eFpQbMbSTwWwrreoGk';
	var data_girones = '1gwxSZo-qq1BAryC_p6QmNGaqEdBkcVxnLtWVjy8Dt8Q';
	var data_lanoguera = '1IvfTi-9CdQkpL2TMgZqxh23Y2tC6gM8p-ZONkE4f-6g';
	var data_maresme = '1IQmY3wZ7FvMKKkVdt2ng04y5TddZmW838ZGAhLacUqk';
	var data_montsia = '1L-t6Q4OrOJ8mXEzKybaKW-_b-JqFGt3JHnG_jbht2yg';
	var data_osona = '1le8uZrUcwbAxpEHTyk4dL2fbe6wvpakiGypWiDJAQ_E';
	var data_pallarsjussa = '1hy7v51_l5kuQo7zMualXrRa7t6K7ejU5NjSHwAIxKa0'
	var data_pallarssobira = '1mbrnJmAf6m2NDOQZDNOnSF7uV9A4u3msOVUBcXtTxlo';
	var data_pladestany = '1VJx7xzVzfCabMLjcQVNJq9OHAPPf3XxcTTNxip9MbP4';
	var data_pladurgell = '1BzQOfc5N3fd8GkOtknw6fKG4zC944LMxvjQeruyOS-A';
	var data_priorat = '1PFIY8LZp4AIWEijroS2ccqvOKoTxj9HAdRGVEeXgLaE';
	var data_riberadebre = '1zYDmSNj4z1yYqkYXoGYnMXens0dOnsIYAJiUsaEfD3w';
	var data_ripolles = '1IRPgPcO4ve_1au3FTO1l3JBB9TwNWhrmma6qTxyKKb8';
	var data_segarra = '1x0PtIoyZlzCjES6yeX9hNBTAuUveoW4fIPJvscSAQ8A';
	var data_segria = '1HW__ThUYmvfIdoqZF59z34ZWSTitsiecvFX0BR2tzCs';
	var data_selva = '1LQwqX1guN7SnFRDCJiQhxZb8pH-ucwMRXxyX0FAnzpo';
	var data_solsones = '1Sd1cRLYTzL0Hdif91tRn_jpP2Cbe3pqs2fODQe4wdgw';
	var data_tarragones = '14b4BaoVcvOXxrTfEsqaJ1ngp8LRr0p0paraRc_kEPxU';
	var data_urgell = '1pMUw811VKG9HMAbmU4AcBVPjXVMH4TXbUPwcelicwAc';
	var data_terraalta = '1EGkzHJP6NG0D4Srqva5zBg_MB_-uCoWfFQ6d_Fc-y4Y';
	var data_usuaris = '1mTRB-z51LqajrD5h6bNyNg5ZNhFuFjpQ6O0r3oYF498';
	var data_vallesoccidental = '1WCIpcQTYJ3_xr8vJFvTtoVLdQ_7qT7rHC7Tg9JzXoQ4';
	var data_vallesoriental = '1NU4L0FKxogRbWrt6jqXuAJlxOkvEq9XkxIPKVn5IWlc';
	var data_usuaris = '1mTRB-z51LqajrD5h6bNyNg5ZNhFuFjpQ6O0r3oYF498'
	executaAJAX(map,"altaribagorca",data_altaribagorca);
	executaAJAX(map,"altcamp",data_altcamp);
	executaAJAX(map,"altemporda",data_altemporda);
	executaAJAX(map,"altpanades",data_altpanades);
	executaAJAX(map,"alturgell",data_alturgell);
	executaAJAX(map,"anoia",data_anoia);
	executaAJAX(map,"aran",data_aran);
	executaAJAX(map,"bagues",data_bagues);
	executaAJAX(map,"baixcamp",data_baixcamp);
	executaAJAX(map,"baixebre",data_baixebre);
	executaAJAX(map,"baixemporda",data_baixemporda);
	executaAJAX(map,"baixllobregat",data_baixllobregat);
	executaAJAX(map,"baixpanades",data_baixpanades);
	executaAJAX(map,"barcelones",data_barcelones);
	executaAJAX(map,"bergueda",data_bergueda);
	executaAJAX(map,"cerdanya",data_cerdanya);
	executaAJAX(map,"concadebarbera",data_concadebarbera);
	executaAJAX(map,"garraf",data_garraf);
	executaAJAX(map,"garrigues",data_garrigues);
	executaAJAX(map,"garrotxa",data_garrotxa);
	executaAJAX(map,"girones",data_girones);
	executaAJAX(map,"lanoguera",data_lanoguera);
	executaAJAX(map,"maresme",data_maresme);
	executaAJAX(map,"montsia",data_montsia);
	executaAJAX(map,"osona",data_osona);
	executaAJAX(map,"pallarsjussa",data_pallarsjussa);
	executaAJAX(map,"pallarssobira",data_pallarssobira);
	executaAJAX(map,"pladestany",data_pladestany);
	executaAJAX(map,"pladurgell",data_pladurgell);
	executaAJAX(map,"priorat",data_priorat);
	executaAJAX(map,"riberadebre",data_riberadebre);
	executaAJAX(map,"ripolles",data_ripolles);
	executaAJAX(map,"segarra",data_segarra);
	executaAJAX(map,"segria",data_segria);
	executaAJAX(map,"selva",data_selva);
	executaAJAX(map,"solsones",data_solsones);
	executaAJAX(map,"tarragones",data_tarragones);
	executaAJAX(map,"terraalta",data_terraalta);
	executaAJAX(map,"urgell",data_urgell);
	executaAJAX(map,"vallesoccidental",data_vallesoccidental);
	executaAJAX(map,"vallesoriental",data_vallesoriental);
	executaAJAX(map,"usuaris",data_usuaris);
}
var im;
function setIcon(){
	im = {
		url: 'img/user-icon.png',//,
			// This marker is 20 pixels wide by 32 pixels high.
		scaledSize: new google.maps.Size(35, 35),
			// The origin for this image is (0, 0).
		//origin: new google.maps.Point(0, 0)
			// The anchor for this image is the base of the flagpole at (0, 32).
		/*anchor: new google.maps.Point(0, 32)*/
	};
}
var inProgress= 41;

function handleBefore() {
	inProgress++;
};

function handleComplete() {
	if (!--inProgress) {
		// do what's in here when all requests have completed.
		markerCluster = new MarkerClusterer(map, array,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
	}
};

function executaAJAX(map,nom,id){
	$.ajax({
		url:  'https://spreadsheets.google.com/feeds/list/'+id+'/1/public/values?alt=json-in-script&callback=callback',
		type: 'GET',
		/*beforeSend: handleBefore,*/
		success: function(data){
			
			controlaInformacio(data,nom);

		},
		complete: function () {
			if(nom != "usuaris"){
				handleComplete();
			}
            

        }		
	});
	
}

function controlaInformacio(data,nom){
	
	comarca = nom
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
		if(comarca !="usuaris"){
			var marker = new google.maps.Marker({
				position: myLatLng,
				title: entry['gsx$indiqueuelmunicipidesdonompliuelformulari'].$t
			});
		}
		else{
			setIcon();
			var marker = new google.maps.Marker({
				position: myLatLng,
				title: entry['gsx$direcció'].$t,
				icon: im
			});
		}
		marker.setMap(map);
		array.push(marker);
		
		//console.log(myLatLng);
		if(comarca != "usuaris"){
			afegeixPoble(comarca, pobles, entry);
		}
		else{
			afegeixUsuaris(pobles, entry);
		}

		(function(marker, poble){
			google.maps.event.addListener(marker, 'click', function(e){
				//infoWindow.setContent(poble.poble + "  "+poble.descripcio[0].titol + " ");
				infoWindow.setContent("<strong>" + poble.poble+ "</strong><br>" + poble.setContent());
				infoWindow.open(map,marker);
			})
		})(marker, pobles[pobles.length-1]);
		
		
	}	
}
function afegeixUsuaris(pobles, entry){
	var p = new Poble(entry['gsx$direcció'].$t);
	p.comarca = "usuari";
	p.descripcio.push(new Detall("Observació", entry['gsx$observacions'].$t));
	pobles.push(p);
}

function afegeixPoble(comarca, pobles, entry){
	var p = new Poble(entry['gsx$indiqueuelmunicipidesdonompliuelformulari'].$t);
	p.comarca = comarca;
	obteContingutSegonsComarca(comarca, pobles, p, entry);
}


function obteContingutSegonsComarca(comarca, pobles, poble, entry){

	canals = guardaCanals();
	canalscomarca = []
	//console.log(comarca);
	//console.log(poble);
	switch(comarca){
		case "altaribagorca":
			canalscomarca = altaribagorca();
			break;
		case "altcamp":
			canalscomarca = altcamp();
			break;
		case "altemporda":
			canalscomarca = altemporda();
			break;
		case "altpanades":
			canalscomarca = altpanades();
			break;
		case "alturgell":
			canalscomarca = alturgell();
			break;
		case "anoia":
			canalscomarca = anoia();
			break;
		case "aran":
			canalscomarca = aran();
			break;
		case "bagues":
			canalscomarca = bagues();
			break;
		case "baixcamp":
			canalscomarca = baixcamp();
			break;
		case "baixebre":
			canalscomarca = baixebre();
			break;
		case "baixemporda":
			canalscomarca = baixemporda();
			break;
		case "baixllobregat":
			canalscomarca = baixllobregat();
			break;
		case "baixpanades":
			canalscomarca = baixpanades();
			break;
		case "barcelones":
			canalscomarca = barcelones();
			break;
		case "bergueda":
			canalscomarca = bergueda();
			break;
		case "cerdanya":
			canalscomarca = cerdanya();
			break;
		case "concadebarbera":
			canalscomarca = concadebarbera();
			break;
		case "garraf":
			canalscomarca = garraf();
			break;
		case "garrigues":
			canalscomarca = garrigues();
			break;
		case "garrotxa":
			canalscomarca = garrotxa();
			break;
		case "girones":
			canalscomarca = girones();
			break;
		case "lanoguera":
			canalscomarca = lanoguera();
			break;
		case "maresme":
			canalscomarca = maresme();
			break;
		case "montsia":
			canalscomarca = montsia();
			break;
		case "osona":
			canalscomarca = osona();
			break;
		case "pallarsjussa":
			canalscomarca = pallarsjussa();
			break;
		case "pallarssobira":
			canalscomarca = pallarssobira();
			break;
		case "pladestany":
			canalscomarca = pladestany();
			break;
		case "pladurgell":
			canalscomarca = pladurgell();
			break;
		case "priorat":
			canalscomarca = priorat();
			break;
		case "riberadebre":
			canalscomarca = riberadebre();
			break;
		case "ripolles":
			canalscomarca = ripolles();
			break;
		case "segarra":
			canalscomarca = segarra();
			break;
		case "segria":
			canalscomarca = segria();
			break;
		case "selva":
			canalscomarca = selva();
			break;
		case "solsones":
			canalscomarca = solsones();
			break;
		case "tarragones":
			canalscomarca = tarragones();
			break;
		case "terraalta":
			canalscomarca = terraalta();
			break;
		case "urgell":
			canalscomarca = urgell();
			break;
		case "vallesoccidental":
			canalscomarca = vallesoccidental();
			break;
		case "vallesoriental":
			canalscomarca = vallesoriental();
			break;
		default:
			break;
	}
	obtenEntrys(pobles,poble,entry, canals, canalscomarca);
	
}

function obtenEntrys(pobles, poble, entry, canals, canalscomarca){
	
	for(i = 0; i < canalscomarca.length; i++){
		var tosearch = canals[canalscomarca[i]].contingut;
		if(poble.comarca == "bagues" && tosearch == "gsx$radiomarca"){
			tosearch = "gsx$radioblanca";
		}
		if(poble.comarca == "osona" && tosearch == "gsx$televisiódelberguedà"){
			tosearch = "gsx$canaltaronja";
		}
		try{
			if(tosearch == "" || tosearch == undefined){
			poble.descripcio.push(new Detall(canals[canalscomarca[i]].titol));
			}
			else{
				poble.descripcio.push(new Detall(canals[canalscomarca[i]].titol, entry[tosearch].$t));
			}
		}
		catch(err){
			
			console.log(poble);
			console.log(canalscomarca[i])
			console.log(canals[canalscomarca[i]].titol)
			console.log(canals[canalscomarca[i]].contingut)
			console.log(entry);
		}
		
	}
	pobles.push(poble);
}

