/*
 * index.js contains the window.load event handlers which start the app, as well as any other JavaScript code necessary.
 * This is where you will start adding your own code, adding event handlers, etc.
 *
 * The app is based on jQuery Mobile, so constructs like $('#id') and $.get() are entirely usable here.
 * But it's also designed for operating properly in Chrome for prototyping, so .click() is used instead of .tap()
 */

// the Map object, default center and zoom settings
var MAP, CACHE, MAP_FORM;
var DEFAULT_LAT =   41.385900681193434;
var DEFAULT_LNG = 2.1711516380310063;
var DEFAULT_ZOOM = 8;
var MIN_ZOOM = 2;
var MAX_ZOOM = 25;


// initMap() will load this with some basemaps "terrain" and "photo"
// using these global references you can toggle the visible basemap via selectBasemap() or using your own programming style
// THE ONES SUPPLIED AS DEMOS IN initMap() ARE GREENINFO NETWORK'S MAPBOX ACCOUNT
// PLEASE USE YOUR OWN Mapbox layers if you use them; Mapbox is not free!
var BASEMAPS = {};

// what folder should this application use, to store offline tiles?
// passed as tge 'folder' parameter to L.TileLayer.Cordova
var OFFLINE_TILE_FOLDER = "MobileMapStarter";

// a Marker indicating our last-known geolocation, and a Circle indicating accuracy
// Our present latlng can be had from LOCATION..getLatLng(), a useful thing for doing distance calculations
var LOCATION_ICON = L.icon({
    iconUrl: 'img/marker-gps.png',
    iconSize:     [25, 41], // size of the icon
    iconAnchor:   [13, 41], // point of the icon which will correspond to marker's location
    popupAnchor:  [13, 1] // point from which the popup should open relative to the iconAnchor
});
var LOCATION  = new L.Marker(new L.LatLng(DEFAULT_LAT,DEFAULT_LNG), { clickable:false, draggable:false, icon:LOCATION_ICON });
var ACCURACY  = new L.Circle(new L.LatLng(DEFAULT_LAT,DEFAULT_LNG), 1);

// should we automatically recenter the map when our location changes?
// You can set this flag anywhere, but if there's also a checkbox toggle (there is) then also update it or else you'll confuse the user with a checkbox that's wrong
var AUTO_RECENTER = true;

/***************************************************************************************************/

/*
 * Orientation change event handler
 * Detect whether the #map_canvas is showing, and if so trigger a resize
 * Leaflet needs this so it can correct its display, e.g. when changing pages within the app
 */



/*
 * The master init() function, called on deviceready
 * It's suggested that all other init be started from here
 * 
 * Pre-render the page divs (lazy loading doesn't help much here)
 * Start the caching system and then the Leaflet map
 * Then onward to other setup and handlers,. e.g. checkboxe,s geocoder text boxes, ...
 */
function init() {
	
    // pre-render the pages so we don't have that damnable lazy rendering thing messing with it
    $('div[data-role="page"]').page(); //DESCOMENTAR PER ORIGIANL
    
    // our startup, in phases so it's easier to keep track
    initMap();
    //initSettings();
    initGeocoder();
    initData();
	
    // pick the basemap, center on a default location, and begin watching location
    //selectBasemap('terrain');
	//selectBasemap2('terrain');
	
    MAP.setView(LOCATION.getLatLng(),DEFAULT_ZOOM);
    MAP.on('locationfound', onLocationFound);
    MAP.locate({ enableHighAccuracy:true, watch:true });
	
	MAP_FORM.setView(LOCATION.getLatLng(),DEFAULT_ZOOM);
    MAP_FORM.on('locationfound', onLocationFound);
    MAP_FORM.locate({ enableHighAccuracy:true, watch:true });


	
}

function initMap() {
	
    // load the Tilelayers
	var  Terrain = L.tileLayer("http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png", {
        subdomains:['a','b','c','d'],
        maxZoom: 25,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        // now the Cordova-specific options
        folder: OFFLINE_TILE_FOLDER,
        name:'Terrain'
    });

    var  Photo = L.tileLayer("http://{s}.tiles.mapbox.com/v3/greeninfo.map-zudfckcw/{z}/{x}/{y}.jpg", {
        subdomains:['a','b','c','d'],
        maxZoom: 25,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                     '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                     'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        // now the Cordova-specific options
        folder: OFFLINE_TILE_FOLDER,
        name:'Photo'
    });
	
	// load the map
    MAP = new L.Map('map_canvas', {
        attributionControl: true,
        zoomControl: false,
        dragging: true,
        closePopupOnClick: true,
        crs: L.CRS.EPSG3857,
		detectRetina: true,
		layers: [Terrain, Photo],
        minZoom: MIN_ZOOM, maxZoom: MAX_ZOOM
    });
	
	// create 3 new layers fot data
	Ajuntaments = new L.LayerGroup();
	Users = new L.LayerGroup();
	
	var baseMaps = {
		"Satè·lit":Photo,
		"Mapa":Terrain
	};
	MAP.addLayer(Ajuntaments);
	MAP.addLayer(Users);
	
	var overlayMaps = {
		"Ajuntaments":Ajuntaments,
		"Usuaris":Users
	};
	L.control.layers(baseMaps, overlayMaps).addTo(MAP);
	
	// create 3 new layers fot data
	
	
	
	
    // add the location marker and accuracy circle
    MAP.addLayer(ACCURACY).addLayer(LOCATION);
	
	
    // move the geocoder and Settings button to inside the map_canvas, as it's more responsive to size changes that way
    //$('.leaflet-control-settings').appendTo( $('#map_canvas') );
    //$('#geocoder').appendTo( $('#map_canvas') );

	//MAP FORM
	// load the map
    MAP_FORM = new L.Map('map_form', {
        attributionControl: true,
        zoomControl: true,
        dragging: true,
        closePopupOnClick: true,
        crs: L.CRS.EPSG3857,
		minZoom: MIN_ZOOM, maxZoom: MAX_ZOOM
    });
	
	L.tileLayer("http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png", {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(MAP_FORM);
	
	
	// add tilelayer
	var marker;
	MAP_FORM.on('click', function(e) {
		
		if(MAP_FORM.hasLayer(marker)){
			MAP_FORM.removeLayer(marker);
		}
		var TVIcon = L.icon({
			iconUrl: 'img/marker-gps3.png',
			iconSize: [20, 30],
			iconAnchor: [8, 25],
			popupAnchor: [0, 0]
			});
		var lat = e.latlng.lat
		var lng = e.latlng.lng
		var myElement = document.getElementById("Latitud").value=lat;
		var myElement = document.getElementById("Longitud").value=lng;
		marker = new L.marker(e.latlng,{icon: TVIcon});
		MAP_FORM.addLayer(marker);
		
		
		MAP_FORM.setView([lat,lng],15);
		
	});
}


function mapData(f) {				
	var TVIcon = L.icon({
		iconUrl: 'img/marker-gps3.png',
		iconSize: [20, 30],
		iconAnchor: [8, 25],
		popupAnchor: [0, 0]
	});
		
	var layerTVEstatal = L.geoJson(f, {
		pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {icon: TVIcon});
	    }, onEachFeature: onEachFeature
		}).addTo(Ajuntaments);
	
};

function mapDataUsuaris(f) {				
	var USRIcon = L.icon({
		iconUrl: 'img/user-icon.png',
		iconSize: [25, 25],
		iconAnchor: [10, 10],
		popupAnchor: [0, 0]
	});
		
	var layerTVEstatal = L.geoJson(f, {
		pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {icon: USRIcon});
	    }, onEachFeature: onEachFeature
		}).addTo(Users);
	
};




			
function onEachFeature(feature, layer) {
	var popupContent = "<h3>"+feature.properties.title+"</h3></p>";
	var customOptions =
		{
		'className' : 'popupCustom'
		};
	if (feature.properties && feature.properties.description) {
		popupContent += feature.properties.description;
	}
	layer.bindPopup(popupContent,customOptions);

};
/*
function initSettings() {
    // enable the basemap picker in the Settings page
    // AND check the currently-selected one
    $('input[type="radio"][name="basemap"]').change(function () {
        var layername = $(this).val();
        $.mobile.changePage('#page-map');
        selectBasemap(layername);
    });
    
    // enable the various "features" checkboxes
    $('input[type="checkbox"][name="features"][value="gps"]').change(function () {
        var show = $(this).is(':checked');
        if (show) {
            MAP.addLayer(ACCURACY);
            MAP.addLayer(LOCATION);
        } else {
            MAP.removeLayer(ACCURACY);
            MAP.removeLayer(LOCATION);
        }
        $.mobile.changePage('#page-map')
    });
    $('input[type="checkbox"][name="features"][value="autocenter"]').change(function () {
        AUTO_RECENTER = $(this).is(':checked');
        $.mobile.changePage('#page-map')
    });
}
*/
function initData(){


	
	var data_bagues = '1R4nBEm019vzeZR11YMMXhqfKx35c-_4fXsYMhtDUuw8';
	var data_girones = '1gwxSZo-qq1BAryC_p6QmNGaqEdBkcVxnLtWVjy8Dt8Q';
	var data_urgell = '1pMUw811VKG9HMAbmU4AcBVPjXVMH4TXbUPwcelicwAc';
	var data_anoia = '19iwB4oW8VEwq7SB8J0reQKdavQRGsG9TTSx16Rq7YDk';
	var data_altpanades = '1FrQO4IDl70l4qUj63OzMAHqLlhV67qWc-xP-jzSCkos';
	var data_altaribagorca = '1o28GgM3THzqLivRGjD17jF4-AMb66Km_S34GKFDe85s';
	var data_selva = '1LQwqX1guN7SnFRDCJiQhxZb8pH-ucwMRXxyX0FAnzpo';
	var data_aran = '1fI5RFLliSB0MtECvxT4GuoMoQpRo3OKjbU4sQ5O4muk';
	var data_concadebarbera = '1XKh4HWgzd_u0R5Sg5D8W7ejTZ9wo8KrEU2im4yA89J0';
	var data_pallarssobira = '1mbrnJmAf6m2NDOQZDNOnSF7uV9A4u3msOVUBcXtTxlo';
	var data_vallesoriental = '1NU4L0FKxogRbWrt6jqXuAJlxOkvEq9XkxIPKVn5IWlc';
	var data_garrotxa = '1hiT9nZyM2eLlZOV_89oIDhEd9eFpQbMbSTwWwrreoGk';
	var data_cerdanya = '1pA8n5HtPM_olfm0NKmqd96n7QImq4KDjzptR4AnbGi4';
	var data_pallarsjussa = '1hy7v51_l5kuQo7zMualXrRa7t6K7ejU5NjSHwAIxKa0'
	var data_pladestany = '1VJx7xzVzfCabMLjcQVNJq9OHAPPf3XxcTTNxip9MbP4';
	var data_ripolles = '1IRPgPcO4ve_1au3FTO1l3JBB9TwNWhrmma6qTxyKKb8';
	var data_tarragones = '14b4BaoVcvOXxrTfEsqaJ1ngp8LRr0p0paraRc_kEPxU';
	var data_priorat = '1PFIY8LZp4AIWEijroS2ccqvOKoTxj9HAdRGVEeXgLaE';
	var data_baixpanades = '1IWHBt17GWnvLfUcxOahKlOcw6H9R2t84s7Bms2wmK20';
	var data_altcamp = '1JndbQsVpzVTIID0sf_1wJuqDADPtrerqXFIUF__LBMI';
	var data_riberadebre = '1zYDmSNj4z1yYqkYXoGYnMXens0dOnsIYAJiUsaEfD3w';
	var data_alturgell = '1WA1ZXw6U9mWfhTpfLCPwNl8nGzxWliHCjjnCtVlL5bk';
	var data_barcelones = '1L_pt_2ZZeIDHTXn9YR_M-cPbqkehWhQ_1tRHFNxC80c';
	var data_garraf = '1uIXneWHDJUiVUDmKzkQ4cpoWfBBPrrLd49wkiTLj5YM';
	var data_pladurgell = '1BzQOfc5N3fd8GkOtknw6fKG4zC944LMxvjQeruyOS-A';
	var data_vallesoccidental = '1WCIpcQTYJ3_xr8vJFvTtoVLdQ_7qT7rHC7Tg9JzXoQ4';
	var data_baixcamp = '1t7VrTbVEnTcbU9pJzNFrVJGjaf19iX3OGZHZQABGlLo';
	var data_baixebre = '14O6RbL-l4RBbWLEKDZnqNYIe9tR2eMITNg_VbdAmxyk';
	var data_lanoguera = '1IvfTi-9CdQkpL2TMgZqxh23Y2tC6gM8p-ZONkE4f-6g';
	var data_maresme = '1IQmY3wZ7FvMKKkVdt2ng04y5TddZmW838ZGAhLacUqk';
	var data_terraalta = '1EGkzHJP6NG0D4Srqva5zBg_MB_-uCoWfFQ6d_Fc-y4Y';
	var data_montsia = '1L-t6Q4OrOJ8mXEzKybaKW-_b-JqFGt3JHnG_jbht2yg';
	var data_altemporda = '1h7cGJ9oGbA0sXr0HuRR75rb2N88xURh2ZAlJJ50kdxE';
	var data_garrigues = '1Fk7zg-UVfpNACKO_VXNyc4RHUPI8_wPca-222DUOm9I';
	var data_osona = '1le8uZrUcwbAxpEHTyk4dL2fbe6wvpakiGypWiDJAQ_E';
	var data_segria = '1HW__ThUYmvfIdoqZF59z34ZWSTitsiecvFX0BR2tzCs';
	var data_baixllobregat = '1YGuMrnJ2XVGX8thsAskzHeuD-XbyMZcKQ8Ssqu2HjPc';
	var data_segarra = '1x0PtIoyZlzCjES6yeX9hNBTAuUveoW4fIPJvscSAQ8A';
	var data_solsones = '1Sd1cRLYTzL0Hdif91tRn_jpP2Cbe3pqs2fODQe4wdgw';
	var data_baixemporda = '1tpoJwXMhlAWYpCooOJzQFXAxiykKhULaPSyGH2VIfuE';
	var data_bergueda = '1v2EU6xywTdbERXuXiJxyaWOC_Pjtfa_TfZ6vjjbLt3w';
	var data_usuaris = '1mTRB-z51LqajrD5h6bNyNg5ZNhFuFjpQ6O0r3oYF498';
	mmg_google_docs_spreadsheet_bagues(data_bagues, mapData);
	mmg_google_docs_spreadsheet_girones(data_girones, mapData);
	mmg_google_docs_spreadsheet_urgell(data_urgell, mapData);
	mmg_google_docs_spreadsheet_anoia(data_anoia, mapData);
	mmg_google_docs_spreadsheet_altpanades(data_altpanades, mapData);
	mmg_google_docs_spreadsheet_altaribagorca(data_altaribagorca, mapData);
	mmg_google_docs_spreadsheet_selva(data_selva, mapData);
	mmg_google_docs_spreadsheet_aran(data_aran, mapData);
	mmg_google_docs_spreadsheet_concadebarbera(data_concadebarbera, mapData);
	mmg_google_docs_spreadsheet_pallarssobira(data_pallarssobira, mapData);
	mmg_google_docs_spreadsheet_vallesoriental(data_vallesoriental, mapData);
	mmg_google_docs_spreadsheet_garrotxa(data_garrotxa, mapData);
	mmg_google_docs_spreadsheet_cerdanya(data_cerdanya, mapData);
	mmg_google_docs_spreadsheet_pallarsjussa(data_pallarsjussa, mapData);
	mmg_google_docs_spreadsheet_pladestany(data_pladestany, mapData);
	mmg_google_docs_spreadsheet_ripolles(data_ripolles, mapData);
	mmg_google_docs_spreadsheet_tarragones(data_tarragones, mapData);
	mmg_google_docs_spreadsheet_priorat(data_priorat, mapData);
	mmg_google_docs_spreadsheet_baixpanades(data_baixpanades, mapData);
	mmg_google_docs_spreadsheet_altcamp(data_altcamp, mapData);
	mmg_google_docs_spreadsheet_riberadebre(data_riberadebre, mapData)
	mmg_google_docs_spreadsheet_alturgell(data_alturgell, mapData)
	mmg_google_docs_spreadsheet_barcelones(data_barcelones, mapData)
	mmg_google_docs_spreadsheet_garraf(data_garraf, mapData)
	mmg_google_docs_spreadsheet_pladurgell(data_pladurgell, mapData)
	mmg_google_docs_spreadsheet_vallesoccidental(data_vallesoccidental, mapData)
	mmg_google_docs_spreadsheet_baixcamp(data_baixcamp, mapData)
	mmg_google_docs_spreadsheet_baixebre(data_baixebre, mapData)
	mmg_google_docs_spreadsheet_lanoguera(data_lanoguera, mapData)
	mmg_google_docs_spreadsheet_maresme(data_maresme, mapData)
	mmg_google_docs_spreadsheet_terraalta(data_terraalta, mapData)
	mmg_google_docs_spreadsheet_montsia(data_montsia, mapData)
	mmg_google_docs_spreadsheet_altemporda(data_altemporda, mapData)
	mmg_google_docs_spreadsheet_garrigues(data_garrigues, mapData)
	mmg_google_docs_spreadsheet_osona(data_osona, mapData)
	mmg_google_docs_spreadsheet_segria(data_segria, mapData)
	mmg_google_docs_spreadsheet_baixllobregat(data_baixllobregat, mapData)
	mmg_google_docs_spreadsheet_segarra(data_segarra, mapData)
	mmg_google_docs_spreadsheet_solsones(data_solsones, mapData)
	mmg_google_docs_spreadsheet_baixemporda(data_baixemporda, mapData)
	mmg_google_docs_spreadsheet_bergueda(data_bergueda, mapData)
	mmg_google_docs_spreadsheet_usuaris(data_usuaris, mapDataUsuaris)
}

function initGeocoder(){
    $('#geocoder_button').click(function () {
        var address = $('#geocoder_text').val();
        if (! address) return;
        geocodeAndZoom(address);
    });
    $('#geocoder_text').keydown(function (key) {
        if(key.keyCode == 13) $('#geocoder_button').click();
    });
}

/*
 * This is mostly a callback for the [name="basemap"] radioboxes,
 * but can also be called programatically to set the base layer at any time
 */
 /*
function selectBasemap(which){
    for (var i in BASEMAPS) MAP.removeLayer(BASEMAPS[i]);
    MAP.addLayer(BASEMAPS[which],true);
}
function selectBasemap2(which){
    for (var i in BASEMAPS) MAP_FORM.removeLayer(BASEMAPS[i]);
    MAP_FORM.addLayer(BASEMAPS[which],true);
}
/*
 * Wrapper functions to set the basemaps to online and offline mode
 * See also L.TileLayer.Cordova documentation
 */
 /*
function switchBasemapsToOffline() {
    for (var i in BASEMAPS) BASEMAPS[i].goOffline(layername);
}
function switchBasemapsToOnline() {
    for (var i in BASEMAPS) BASEMAPS[i].goOnline(layername);
}
*/
/*
 * Whenever the user's location changes, this is called. It updates the LOCATION and ACCURACY layers (a Marker and a Circle).
 */
function onLocationFound(event) {
    // Update our location and accuracy
    // Even if we don't auto-pan nor display the marker, we may need LOCATION updated for future distance-to-point calculations.
    LOCATION.setLatLng(event.latlng);
    ACCURACY.setLatLng(event.latlng);
    ACCURACY.setRadius(event.accuracy);

    // center the map
    if (AUTO_RECENTER) MAP.panTo(LOCATION.getLatLng());
	if (AUTO_RECENTER) MAP_FORM.panTo(LOCATION.getLatLng());
}

