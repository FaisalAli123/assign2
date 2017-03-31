var items = document.getElementById('videogames');

function ajax(url, fnctn, param) {
	var ajaxRequest = new XMLHttpRequest(); 
	var handleResponse=function(){
		if(ajaxRequest.status===200){
			if(ajaxRequest.readyState===4){
				var games=JSON.parse(ajaxRequest.responseText);
				if (param=="") {
					fnctn(games)
				}else{
					fnctn(games, param);
				}
			}
		}
	}
	ajaxRequest.onreadystatechange=handleResponse; 
	ajaxRequest.open('GET', url, true);
	ajaxRequest.send(null);
}
if (document.getElementById('search')) {
	ajax("../data/games.json", showallgames);
}

var defLa=["<div class='one-1' id='game","'><a href='gameinfo.html#","'><img src='../img/","'><div><p>","</p><p>Price: &#xa3;","</p></div></a></div>"];

function showallgames(games) {
    items.innerHTML = "";
    for (var i=0;i<games.length;i++){
        items.innerHTML += defLa[0] + i + defLa[1] + i + defLa[2] + games[i].image + defLa[3] + " Name: " +games[i].name + " <br>Platform: " + games[i].platform + defLa[4] + games[i].price + defLa[5];
    }
}

if (document.getElementById('search')) {
	var searchg = document.getElementById("search");
	var searcha = document.getElementById("searcha");
	var adsearch = document.getElementById('adsearch');
	var advancedbutton = document.getElementById('advancedbutton');
	var slider = document.getElementById('gamepriceDiv');
}

function searchgame(games){
    items.innerHTML = "";
    var d = false;
    var searchv;
    var searchedGames = [];
 
    for (var i=0;i<games.length;i++){
	var content = defLa[0] + i + defLa[1] + i + defLa[2] + games[i].image + defLa[3] + " Name: " +games[i].name + " <br>Platform: " +  games[i].platform + defLa[4] + games[i].price + defLa[5];

if (searchg === document.activeElement){
		searchv = searchg.value;
	
		if(games[i].name.toLowerCase().match(searchv.toLowerCase())){
			items.innerHTML += content;
		
			d = true;
		}
	}else if (searcha === document.activeElement){
		searchv = searcha.value;
		if(games[i].platform.toLowerCase().match(searchv.toLowerCase())){
			items.innerHTML += content;
			d = true;
			searchedGames[i]="game"+i;
		}
		if (slider.noUiSlider.get()[0]==10&&slider.noUiSlider.get()[1]==70) {}else{
			searchFilter(games, searchedGames, slider, 1, content);
		}
	}
    }
    
    if(d==false){
        items.innerHTML = "No Results Found";
    }
}

function filter(games, margins) {
	if (margins[0]==10&&margins[1]==70) {
	}else{
		items.innerHTML="";
		var searchedGames = [];
		var gamePrice;
		for (var i=0; i<games.length; i++) {
			var content = defLa[0] + i + defLa[1] + i + defLa[2] + games[i].image + defLa[3] + " Name: " +games[i].name + " <br>Platform: " +  games[i].platform + defLa[4] + games[i].price + defLa[5];
			gamePrice = games[i].price.replace(".", "");
			gamePrice = gamePrice.replace(".", "");
			if (gamePrice>margins[0]&&gamePrice<margins[1]) {
				items.innerHTML += content;
				searchedGames[i]="game"+i;
			}
		}
		if(searcha.value!="") {
			searchFilter(games,searcha.value.toLowerCase(), searchedGames, 2, content);
		}
		if (items.innerHTML=="") {
			items.innerHTML = "No Results Found";
		}
	}
}
function searchFilter(games, searched, filtered, num) {
	items.innerHTML = "";
	var arrayOne = [];
	var arrayTwo = [];
	var gamePrice;
	for (var i=0; i<games.length; i++) {
		if (num == 2) {
			if(games[i].platform.toLowerCase().match(searched)){
				arrayOne[i]="game"+i;
			}
		}else{
			arrayOne=searched;
		}
		gamePrice = games[i].price.replace(".", "");
		gamePrice = gamePrice.replace(".", "");
		
		if (gamePrice>Math.round(slider.noUiSlider.get()[0])&&gamePrice<Math.round(slider.noUiSlider.get()[1])) {
			arrayTwo[i]="game"+ i;
		}
		
		if (arrayOne[i]==undefined && arrayTwo[i]==undefined) {
		}else if (arrayOne[i]==arrayTwo[i]) {
			items.innerHTML += defLa[0] + i + defLa[1] + i + defLa[2] + games[i].image + defLa[3] + " Name: " +games[i].name + " <br>Platform: " + games[i].platform + defLa[4] + games[i].price + defLa[5];
		}
	}
	if (items.innerHTML == "") {
		items.innerHTML = "No Results Found";
	}
}
////advanced search
function adShowSearch() {
	if (adsearch.className == "advancedshow"){
		adsearch.className = "advancedhide";
		advancedbutton.innerHTML = "Advanced Search";
	}else{
		adsearch.className = "advancedshow";
		advancedbutton.innerHTML = "Hide Advanced Search";
	}
}

if (document.getElementById('gamepriceDiv')) {
	noUiSlider.create(slider, {
		start: [ 10, 70 ],////price
		connect: true,
		tooltips: [wNumb({ thousand: ',',prefix: '&#xa3;',decimals: 0 }), wNumb({ thousand: ',',prefix: '&#xa3;',decimals: 0 })],
		range: {
			'min': 0,
			'max': 70
		}
	});
	
	slider.noUiSlider.on('update', function ( values, handle ) {
		var marginMax = slider.noUiSlider.get()[0] ;
		var marginMin = slider.noUiSlider.get()[1] ;
		filterSetup(Math.round(marginMax), Math.round(marginMin));
	});
}

function filterSetup(marginMax,marginMin) {
	var margins = [marginMax, marginMin];
	ajax("../data/games.json", filter, margins);
	
}

if (document.getElementById('individualGame')) {
	ajax("../data/games.json", individualGame);
}

function individualGame(games){
	var urlHash = location.hash;
	var gameId = urlHash.slice(1);
	
	if (gameId == ""){
		document.getElementById('individualGame').innerHTML = "<div class='row'><h1>An error here please go back</h1><h2><a href='games.html'>To go back click here</a></h2></div>";
	}
	document.getElementById('gameName').innerHTML = games[gameId].name;
	document.getElementById('gamePlatform').innerHTML = games[gameId].platform;
	document.getElementById('gamePrice').innerHTML = "&#163;" + games[gameId].price;
	document.getElementById('gameImg').innerHTML = "<img src='../img/" + games[gameId].image + "'>";
	document.getElementById('gameEdition').innerHTML = games[gameId].edition;
    document.getElementById('gameRating').innerHTML = games[gameId].rating;
	document.getElementById('gameDescription').innerHTML = games[gameId].description;
	document.getElementById('gamesMore').innerHTML = "";
	var e=0;
	for (var i=0; i<12; i++) {
		if (e<4) {
			if (i!=gameId){
				document.getElementById('gamesMore').innerHTML += "<a href='gameinfo.html#" + i + "' onClick='window.location.reload()'><img src='../img/" + games[i].image + "'></a>";
				e++;
				i++;
			}
		}
	}
	//cart
	var cartSpan = document.getElementById("cartSpan");
	cartSpan.innerHTML="<button href='javascript:void(0)' onclick='addCart("+gameId+")'>Add To Cart</button>";
	if (localStorage.getItem("cart")) {
		var localCart = JSON.parse(localStorage.getItem("cart"));
		for (var i=0; i<localCart.length; i++) {
			if (localCart[i]==gameId) {
				cartSpan.innerHTML="<button href='javascript:void(0)' onclick='removeCart("+gameId+")'>Remove from Cart</button>";
			}
		}
	}
	
}

function addCart(gameId) {
	if (localStorage.getItem("cart")) {
		var localCart = JSON.parse(localStorage.getItem("cart"));
		localCart.push(gameId);
		localStorage.setItem("cart", JSON.stringify(localCart));
	}else{
		var cart = [gameId];
		localStorage.setItem("cart", JSON.stringify(cart));
	}
	location.reload();
}

function removeCart(gameId) {
	var localCart = JSON.parse(localStorage.getItem("cart"));
	for (var i=0;i<localCart.length;i++) {
		if (localCart[i]==gameId) {
			localCart.splice(i,1);
		}
	}
	localStorage.setItem("cart", JSON.stringify(localCart));
	location.reload();
}
if (document.getElementById("CartList")) {
	ajax("../data/games.json", showCart);
	
}

function showCart(games) {
	var localCart = JSON.parse(localStorage.getItem("cart"));
	
	for (var i=0;i<localCart.length;i++) {
		document.getElementById("CartList").innerHTML+="<a href='gameinfo.html#"+localCart[i]+"'><div class='one-third'><img  src='../img/"+games[localCart[i]].image+"'><br><div >"+games[localCart[i]].name+"</div></div></a><br>";
	}
}
//////map
var map;
var latlngbounds = new google.maps.LatLngBounds();
           function getUserPosition()
{
    function itWorks(position) 
    {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log('latitude: '+latitude);
        console.log('longitude: '+longitude);
        var userLatLng = new google.maps.LatLng({lat: latitude, lng: longitude});
showMap(userLatLng);
addMarker(userLatLng,"Your Location");
var latLng = new google.maps.LatLng({lat: 53.64598, lng: -1.780229});
addMarker(latLng,"Game Hudderfield");
var latLng = new google.maps.LatLng({lat: 53.795872 , lng: -1.754388});
addMarker(latLng,"GAME Bradford");
var latLng = new google.maps.LatLng({lat: 53.72095562, lng: -1.88053437});
addMarker(latLng,"GAME Halifax");
var latLng = new google.maps.LatLng({lat:53.748575 , lng: -2.487529});
addMarker(latLng,"GAME Blackburn");
var latLng = new google.maps.LatLng({lat:53.57932515 , lng: -2.39139863});
addMarker(latLng,"GAME Bolton");
var distance = google.maps.geometry.spherical.computeDistanceBetween(userLatLng,latLng);
console.log(distance/1000+"km");
    }


    function itDoesntWork(error) 
    {
        console.log('There is an error '+error);
    }
    navigator.geolocation.getCurrentPosition(itWorks, itDoesntWork);
}

function init(){
    getUserPosition()
}
function showMap(latLng){
    map = new google.maps.Map(document.getElementById('map'), 
        {
          center: latLng,
          mapTypeId: google.maps.MapTypeId.SATELLITE,
          zoom: 18,
           });
}
function addMarker(latLng, label){
    var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            label:label
          });
    latlngbounds.extend(latLng);
    map.setCenter(latlngbounds.getCenter());
    map.fitBounds(latlngbounds);
}
window.addEventListener("load",init,false);