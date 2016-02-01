# gmap

Juste un petit pense bête pour un calcul d'itinéraire sur un site.

Quelques options 
* No Poi
* Pas de zoom au scroll 
* Icone personnalisée
* Validation du formulaire au click et avec Enter

##No Poi
```javascript
var noPoi = [
				{
					featureType: "poi",
					stylers: [
					{ visibility: "off" }
					]   
				}
			];
			map.setOptions({styles: noPoi});
```

##Pas de zoom au scroll
```javascript
scrollwheel: false
```
