"use strict";

var map;
var panel;
var initialize;
var calculate;
var direction;

	initialize = function(){
		var latLng = new google.maps.LatLng(41.8903341,12.4903619); // center map
			var myOptions = {
				zoom      : 5, // Zoom par défaut
				center    : latLng, // Coordonnées de départ de la carte de type latLng 
				mapTypeId : google.maps.MapTypeId.ROADMAP, // HYBRID, ROADMAP, SATELLITE, TERRAIN
				maxZoom   : 20,
				scrollwheel: false //on bloque le zoom au scroll
			};
					  
			map      = new google.maps.Map(document.getElementById('map'), myOptions);
			panel    = document.getElementById('panel');
					  
			var marker = new google.maps.Marker({
			    position : latLng,
			    map      : map,
			    title    : "Tous les chemins mènent à Rome",
			    icon     : "map-marker.png" //awesome icon
			});
					  
			var contentMarker = [
				'Tous les chemins mènent à Rome'
			].join('');

			var infoWindow = new google.maps.InfoWindow({
				content  : contentMarker,
				position : latLng
			});
					  
			google.maps.event.addListener(marker, 'click', function() {
				infoWindow.open(map,marker);
			});
					  
			google.maps.event.addListener(infoWindow, 'domready', function(){ // infoWindow est biensûr notre info-bulle
				jQuery("#tabs").tabs();
			});
					  
					  
			direction = new google.maps.DirectionsRenderer({
				map   : map,
				panel : panel // Dom element pour afficher les instructions d'itinéraire
			});

			// No Point of interest on the map
			var noPoi = [
				{
					featureType: "poi",
					stylers: [
					{ visibility: "off" }
					]   
				}
			];
			map.setOptions({styles: noPoi});

	};

					calculate = function(){
					    origin      = document.getElementById('origin').value; // Le point départ
					    destination = document.getElementById('destination').value; // Le point d'arrivé
					    if(origin && destination){
					        var request = {
					            origin      : origin,
					            destination : destination,
					            travelMode  : google.maps.DirectionsTravelMode.DRIVING // Mode de conduite
					        }
					        var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
					        directionsService.route(request, function(response, status){ // Envoie de la requête pour calculer le parcours
					            if(status == google.maps.DirectionsStatus.OK){
					                direction.setDirections(response); // Trace l'itinéraire sur la carte et les différentes étapes du parcours
					            }
					        });
					    }
					};

					initialize();

					//appel sur le click et sur keypress
					document.getElementById ("calculer").addEventListener ("click", calculate, false);
					document.getElementById ("origin").addEventListener ("keydown", function (e) {
						if (e.defaultPrevented) {
					    return; 
						  }
						
						switch (e.key) {
						    case "Enter":
						      	calculate(e);
						      break;
						    case "Escape":
						     	calculate(e);
						      break;
						    default:
						      return; 
						  };

						  
						  e.preventDefault();
					}, true);
