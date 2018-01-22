import { Component , ViewChild ,ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  options : GeolocationOptions;
  currentPos : any;
  places : Array<any> ; 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  directionsDisplay = new google.maps.DirectionsRenderer;
  directionsService = new google.maps.DirectionsService;

  constructor(public navCtrl: NavController,private geolocation : Geolocation) {
      
  }
  getUserPosition(){
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
  ionViewDidEnter(){
    this.getUserPosition();
  }    
  addMap(lat,long){
    
        let latLng = new google.maps.LatLng(lat, long);
    
        let mapOptions = {
        center: latLng,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        
        var position = this.currentPos;
        this.getRestaurants().then((results : Array<any>)=>{
            this.places = results;
            console.log(this.places);
            for(let i = 0 ;i < results.length ; i++)
            {
                this.createMarker(results[i]);
            }
        },(status)=>console.log(status));
    
        this.addMarker();
       
        this.directionsDisplay.setMap(this.map);
        google.maps.event.addListener(this.map, 'bounds_changed', ()=> {
            this.getRestaurants().then((results : Array<any>)=>{
            this.places = results;
            console.log(this.places);
            for(let i = 0 ;i < results.length ; i++)
            {
                this.createMarker(results[i]);
            }
        },(status)=>console.log(status));
            console.log("bounds_changed");
        });
    
  }
  createMarker(place)
  {
    var iconBase = '../assets/img/';
    var icons = {
          Bar: {
              icon: iconBase + 'Beer-icon.png'  
            },
          night_club: {
              icon: iconBase + 'Night_club.png'
            }
      };
      var marker;
      if(place.types[0] == "night_club"){
            marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location,
      icon : icons["night_club"].icon  
      });  
      } 
      else{
           marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location,
      icon : icons["Bar"].icon  
      });
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
  addMarker(){
    
        let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
        });
    
        let content = "<p>This is your current position !</p>";          
        let infoWindow = new google.maps.InfoWindow({
        content: content
        });
    
        google.maps.event.addListener(marker, 'click', () => {
              infoWindow.open(this.map, marker);
              console.log(this.currentPos.coords);
              console.log(this.directionsService, this.directionsDisplay)

        });
  }
  getRestaurants()
  {
      var service = new google.maps.places.PlacesService(this.map);
      let request = {
          location : this.map.center,
          radius : 500 ,
          types: ['bar','night_club'],
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
  getRouteToBar(marker){
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
      })
  }
}
