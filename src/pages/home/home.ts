import { Component , ViewChild ,ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage 
{
  options : GeolocationOptions;
  currentPos : any;
  places : Array<any> ; 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  Markers : Array<any>;

  ArrayAllStuff = [];
  ArrayLiquorMarker = [];
  ArrayNightClubMarker = [];
  ArrayBarMarker = [];

  inputBarG : any;
  inputNightClubG : any;
  inputEpicerieG : any;

  directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true}); //Initialize Directions Service
  directionsService = new google.maps.DirectionsService;                           //
  
  constructor(public navCtrl: NavController,private geolocation : Geolocation) {
      
  }
  getUserPosition()
  {
    this.options = {
    enableHighAccuracy : true
    };
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.currentPos = {lat : pos.coords.latitude, lng : pos.coords.longitude};     

        this.addMap(pos.coords.latitude,pos.coords.longitude);

    },(err : PositionError)=>{
        console.log("error : " + err.message);
    ;
    })
  }
  ionViewDidEnter()
  {
    this.getUserPosition();
  }    
  addMap(lat,long)
  {
    
        let latLng = new google.maps.LatLng(lat, long);
    
        let mapOptions = {
        center: latLng,
        zoom: 17,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles :    [
              {
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#1d2c4d"
                  }
                ]
              },
              {
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#8ec3b9"
                  }
                ]
              },
              {
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#1a3646"
                  }
                ]
              },
              {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#4b6878"
                  }
                ]
              },
              {
                "featureType": "administrative.land_parcel",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#64779e"
                  }
                ]
              },
              {
                "featureType": "administrative.neighborhood",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#4b6878"
                  }
                ]
              },
              {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#334e87"
                  }
                ]
              },
              {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#023e58"
                  }
                ]
              },
              {
                "featureType": "poi",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#283d6a"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#6f9ba5"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#1d2c4d"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#023e58"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#3C7680"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#304a7d"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#98a5be"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#1d2c4d"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#2c6675"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#255763"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#b0d5ce"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#023e58"
                  }
                ]
              },
              {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#98a5be"
                  }
                ]
              },
              {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#1d2c4d"
                  }
                ]
              },
              {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#283d6a"
                  }
                ]
              },
              {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#3a4762"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#0e1626"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "labels.text",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#4e6d70"
                  }
                ]
              }
            ]
        } ;
    
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        var position = this.currentPos;
        this.addMarker(); // Ajout du Marker Sur Notre Position 
        this.directionsDisplay.setMap(this.map);

        this.loadJsonButton();    //load function pour afficher buttons et récuperer event listener
        this.loadFiltreButton();
        this.eventListenerOnButton();
        this.MapOnMooveListener();
        this.loadinfoButton();
    
  }

  addMarker()
  {          // Ajouts Marker CurrentPOS
    var iconBase = '../assets/icon/';
    var icons = {
      Us: {
          icon: iconBase + 'star.png'  
        }
    };
    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter(),
    icon : icons["Us"].icon  
    });

    let content = "<p>This is your current position !</p>";          
    let infoWindow = new google.maps.InfoWindow({
    content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(this.map, marker);

    });
  }


  eventListenerOnButton()
  {
    var that= this; // Stay in Main Scope


    var inputBar = document.getElementById("Bar");      // Get Buttons from Home.html by ID
    var inputNightClub = document.getElementById("NightClub");
    var inputLiquorStore = document.getElementById("LiquorStore");
    var inputTobacco = document.getElementById("Tobacco");

    this.inputNightClubG = 0;     // Settings Value for Start at OFF
    this.inputBarG=0;
    this.inputEpicerieG =0;
    
        ///Input Bar Listener
    inputBar.addEventListener('click',function(){
        console.log(that.inputBarG);
              
          if(that.inputBarG==1){                     //Modifying Value of input after click
                that.inputBarG= 0;
                that.removeMarkerByChoice(that.ArrayBarMarker);
              }
          else{
                that.inputBarG=1;
                var Choice =["Bar"];                          // Choice Bar
                that.getStuffAsChoice(Choice).then((results : Array<any>)=>{      //go into Function getStuff where Choice = "Bar"
                       for(let i = 0 ;i < results.length ; i++)
                       {
                            that.createMarker(results[i]);
                          
                       }
                },(status)=>console.log(status));
              }
    });



    //Input Night_CLub Listener
    inputNightClub.addEventListener('click',function(){
          if(that.inputNightClubG==1){
                that.inputNightClubG= 0;
                that.removeMarkerByChoice(that.ArrayNightClubMarker);
              }
          else{
                that.inputNightClubG=1;
                var Choice = ["night_club"];
                that.getStuffAsChoice(Choice).then((results : Array<any>)=>{
                       
                       for(let i = 0 ;i < results.length ; i++)
                       {
                            that.createMarker(results[i]);
                            console.log(results[i]);
                            
      
                       }
                },(status)=>console.log(status));
          }
    });



    //Input Liquor Store Listener
    inputLiquorStore.addEventListener('click',function(){
          if(that.inputEpicerieG==1){
                
               that.inputEpicerieG =0;
               that.removeMarkerByChoice(that.ArrayLiquorMarker);
               
                
              }
          else{
            that.inputEpicerieG= 1;
            var Choice = ["convenience_store"];
                that.getStuffAsChoice(Choice).then((results : Array<any>)=>{
                       
                       for(let i = 0 ;i < results.length ; i++)
                       {
                            that.createMarker(results[i]);
      
                       }
                },(status)=>console.log(status));
              
            }
          
    });



  }
  MapOnMooveListener()
  {
   
    
    
    //MAP ON MOOVE LISETENER
    google.maps.event.addListener(this.map, 'bounds_changed', ()=> {
      var ArrayChoice = [];

      var Bar = "Bar";
      var NightClub = "night_club";
      var Epicerie = "liquor_store";

      


    if(this.inputBarG == 1){
      console.log("maped");
      ArrayChoice.push(Bar);
    }
    if (this.inputNightClubG == 1){
      
      ArrayChoice.push(NightClub);
    }
    if(this.inputEpicerieG == 1){
      
      ArrayChoice.push(Epicerie);
    }
  
      this.getStuffAsChoice(ArrayChoice).then((results : Array<any>)=>{
        for(let i = 0 ;i < results.length ; i++)
        {
            this.createMarker(results[i]);

          
        
        }
        },(status)=>console.log(status));
            console.log("bounds_changed");
            console.log(ArrayChoice);
    });

  }
  

  
  createMarker(place)       // Create Marker By His Types
  {
    var iconBase = '../assets/img/';    //Base Url Of Our Icons
    var icons = {
          Bar: {
              icon: iconBase + 'Beer-icon.png'  // Name of the icon in our Folder
            },
          night_club: {
              icon: iconBase + 'Night_club.png'
            },
          liquor_store : {
              icon : iconBase + 'liquor.png'
          }
      };

      var marker;

      if(place.types[0] == "night_club" || place.types[0] == "bar" || place.types[0]=="liquor_store"){

      if(place.types[0] == "night_club"){     //Check If First Type of place from results his a night_club
            marker = new google.maps.Marker({
                  map: this.map,
                  animation: google.maps.Animation.DROP,
                  position: place.geometry.location,
                  icon : icons["night_club"].icon     // settings Our Icon from our JSON icons
            });  
            this.ArrayNightClubMarker.push(marker);
      }

      else if(place.types[0] == "liquor_store"){
          marker = new google.maps.Marker({
                  map: this.map,
                  animation: google.maps.Animation.DROP,
                  position: place.geometry.location,
                  icon : icons["liquor_store"].icon  
          });
          this.ArrayLiquorMarker.push(marker);
      }

      else {
           marker = new google.maps.Marker({
                  map: this.map,
                  animation: google.maps.Animation.DROP,
                  position: place.geometry.location,
                  icon : icons["Bar"].icon  
            });
            this.ArrayBarMarker.push(marker);
      }
      
      let infoWindow = new google.maps.InfoWindow({
          content: place.name
        }); 
      google.maps.event.addListener(marker, 'click', () => {
              infoWindow.open(this.map, marker);
              this.getRouteToBar(marker);
              console.log(this.directionsService);

      });
    }
  }   


  removeMarkerByChoice(Choice){
    while(Choice.length){
      Choice.pop().setMap(null);
  }

  }
  
  getStuffAsChoice(Choice) //function for getting places from google.maps where Types is our Choice
  {

      var service = new google.maps.places.PlacesService(this.map);
      let request = {
          location : this.map.center,
          radius : 500 ,
          types: Choice,
          opennow : true,
      };
      return new Promise((resolve,reject)=>{
          service.nearbySearch(request,function(results,status){
              if(status === google.maps.places.PlacesServiceStatus.OK)
              {
                  resolve(results);    
                  console.log(results);
              }else
              {
                  reject(status);
              }
  
          }); 
      });
  
  }


  getRouteToBar(marker)       //function for getting Route to Bar by clicking on this marker
  {
      var Display = this.directionsDisplay;
      var request = {
            origin : this.currentPos,
            destination : marker.position,
            travelMode : 'WALKING'
      };

      this.directionsService.route(request, function(result, status){
      console.log(result);
          if(status == "OK"){
                Display.setDirections(result);
                
                
                  

                }
                

          });
  
      
  }
  loadJsonButton()          // Loading GeoJSOn Button of Commun's tranports
  {
        
        var that = this;
        let isActive : boolean = false;


      let MetroButton = document.getElementById("loadMetroJson");
      MetroButton.addEventListener('click', function() {
          if(isActive == false){
                  isActive = true;
          }
          else{
                  isActive = false;
          }
          var Metro = "Metro"
          
          that.loadGeoJson(isActive,Metro);
          console.log("Metro loaded");
        
      });
      let TramwayButton = document.getElementById("loadTramwayJson");
      TramwayButton.addEventListener('click', function() {
          if(isActive == false){
                  isActive = true;
          }
          else{
                  isActive = false;
          }
          var Tramway = "Tramway";
          that.loadGeoJson(isActive, Tramway);
          console.log("Tram Loaded")
      });
      let VeloButton = document.getElementById("loadVeloJson");
      VeloButton.addEventListener('click', function() {
          if(isActive == false){
                  isActive = true;
          }
          else{
                  isActive = false;
          }
          var Velo = "Velo";
          that.loadGeoJson(isActive, Velo);
          console.log("Velo Loaded")
      });
      let BusButton = document.getElementById("loadBusJson");
      BusButton.addEventListener('click', function() {
          if(isActive == false){
                  isActive = true;
          }
          else{
                  isActive = false;
          }
          var Bus ="Bus";
          that.loadGeoJson(isActive, Bus);
          console.log("Bus Loaded")
      });


      this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(MetroButton);
      this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(TramwayButton);
        this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(VeloButton);
        this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(BusButton);


  }
  loadGeoJson(bool,geojson)   // function for getting geojson by name from button clicked
  {

    var map = this.map.data;
    var data_layer = new google.maps.Data({map: this.map});
    var data_layer_2 = new google.maps.Data({map: this.map});
    var data_layer_3 = new google.maps.Data({map: this.map});
    var data_layer_4 = new google.maps.Data({map: this.map});
    switch(geojson){
      case "Bus":
      data_layer.loadGeoJson(
        '../assets/geojson/'+geojson+'.geojson'
      );
      break;
      case "Metro":
      data_layer_2.loadGeoJson(
        '../assets/geojson/'+geojson+'.geojson'
      );
      break;
      case "Tramway":
      data_layer_3.loadGeoJson(
        '../assets/geojson/'+geojson+'.geojson'
      );
      break;
      case "Velo":
      data_layer_4.loadGeoJson(
        '../assets/geojson/'+geojson+'.geojson'
      );
      break;
    }
    data_layer.setStyle({
      icon:'./assets/img/busBulle.png'
    });
    data_layer_2.setStyle({
      icon:'./assets/img/metroBulle.png'
      
    });
    data_layer_3.setStyle({
      icon: './assets/img/tramBulle.png'
    });
    data_layer_4.setStyle({
      icon: './assets/img/veloBulle.png'
  });
    



  }
  

  loadFiltreButton()      // Loading Filtre Button For What is display on map
  {

      let filtre = document.getElementById("chooseFiltre");
      let paternFiltre = document.getElementById("paternFiltre");
      filtre.addEventListener('click',function(){
            if(paternFiltre.style.display =='none'){
                   paternFiltre.style.display = 'block';
            }
            else{
                   paternFiltre.style.display = 'none';
            }
         

      });

      this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(filtre);
      this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(paternFiltre);
  }

  loadinfoButton(){
    let info = document.getElementById("Infos");
    let paternInfo = document.getElementById("paternInfo");
    info.addEventListener('click',function(){
          if(paternInfo.style.display =='none'){
                paternInfo.style.display ='block';
          }
          else{
                paternInfo.style.display ='none';
          }
    });

    this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(info);
    this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(paternInfo);


  }
}