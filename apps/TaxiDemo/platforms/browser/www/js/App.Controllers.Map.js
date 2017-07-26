(function() {
    
    angular.module('MainApp') 
    // MAP CONTROLLER
    .controller("mapController",["$rootScope","$scope",function($rootScope,$scope){
        App.Angular.Debug.mapCtrl=this;
        var _this=this;
        var _map = null;
        var input = null;
        var UserMarker={
           symbol : {
            path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
            fillColor: 'yellow',
            fillOpacity: 0.8,
            scale: 1,
            strokeColor: 'gold',
            strokeWeight: 14
          },
          marker:null
        };

        this.Google={
            //     AutocompleteService:null;
            PlacesService:null,  
            geocoder: null,
            directionsService :null, 
            directionsDisplay :null, 
        };
        
        

        this.getMap=getMap;
        this.centerUser=centerUser;
        this.getUserMarker=getUserMarker; 
        this.selectPlace=selectPlace;
        /* VIEW BINDERS */

        this.places_board={
            visible:false,
            open:false,
            animate:"fadeInUpBig",
            show:function(){
                this.open=true;
                this.animate="fadeInUpBig";
                this.visible=true;                
                $apply();
            },
            hide:function(){   
                this.open=false;             
                this.animate="fadeOutDownBig";
                $scope.searchTxt='';
                _this.places_board.places=[]
                setTimeout(function(){
                    _this.places_board.visible=false;
                    $apply();
                },900);
            },
            places:[]
        };

        this.centerMe={
            visible:false,
            animate:"zoomIn",
            show:function(){
                this.animate="zoomIn";
                this.visible=true;
                  $apply();
            },
            hide:function(){                
                this.animate="zoomOut";
                setTimeout(function(){
                    _this.centerMe.visible=false;
                    $apply();
                },900);
            }, 

        };

        this.travel={
            visible:false,            
            toPlace:null,
            fromPlace:null,
            route:{
                geocodes:0
            },
            set:function(){
                this.visible=true;
                $apply();
            },
            unset:function(){
                this.visible=false;
                try{
                    this.fromPlace.marker.setMap(null);
                    this.toPlace.marker.setMap(null);
                    this.fromPlace=null;
                    this.toPlace=null;
                }catch(e){

                }
                $apply();
            },
            onUpdate:function(){
         
                _this.travel.route.geocodes=0;
                _this.travel.geocodeLocation(_this.travel.fromPlace);
                _this.travel.geocodeLocation(_this.travel.toPlace); 

                
            },
            geocodeLocation:function(_travePlace){
                 _this.Google.geocoder.geocode({'location':_travePlace.marker.getPosition()
                  }, function __result_gecodeLocation(results, status) { 

                        if (status === 'OK' && results.length>0) {
                            _this.travel.route.geocodes+=1;
                            _travePlace.place=results[0];

                        } else{
                            _travePlace.place=null;
                        }
                        _this.travel.findRoute();
                }); 

            },
            findRoute:function(){ 
                if(_this.travel.route.geocodes>=2){

                    _this.Google.directionsService.route({
                      origin:  _this.travel.fromPlace.place.formatted_address,
                      destination:  _this.travel.toPlace.place.formatted_address,
                      travelMode: 'DRIVING'
                    }, function __result_find_route(response, status) {
                      if (status === 'OK') {                        
                        _this.Google.directionsDisplay.setDirections(response);
                      } else {
                        //   window.alert('Directions request failed due to ' + status);
                      }

                     });

                }
            }
        };

        /** 
          ESTE METTODO OBTIENE EL MAPA ACTUAL
        */
        function getMap() {
            return _map;
        }

        // THIS EMTHOD RETURN THE CURRENT USER MARKER
        function getUserMarker(){
          return UserMarker;
        }

        function centerUser(){
            //getMap().setCenter(UserMarker.marker.position);
            getMap().panTo(get_last_position());
            getMap().setZoom(18);
            _this.centerMe.hide();
        }

        // THIS METHOD IS USED TO SELECT THE ARRIVAL PLACE
        function selectPlace(_place){
            

            
            var _icon = {
              url: _place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };
            
            _this.travel.toPlace={
                place:_place,
                marker:new google.maps.Marker({
                      map: getMap(),
                      icon: _icon,
                      draggable:true,
                      title: _place.name,
                      position: _place.geometry.location
                    })
            };
            
            _this.travel.fromPlace={ 
                marker:new google.maps.Marker({
                      map: getMap(),
                       draggable:true,
                      //icon: UserMarker.symbol, 
                      position: get_last_position()
                    })
            } 
           _this.travel.fromPlace.marker.addListener(  'dragend', _this.travel.onUpdate);
           _this.travel.toPlace.marker.addListener(   'dragend', _this.travel.onUpdate);
            
            _this.places_board.hide();
            _this.travel.set();
            _this.travel.onUpdate();
            //AHORA DEBE SELECCIONAR EL PUNTO DE PARTIDA


        }



        // THIS METHOD IS CALL TO INTIIALIZE ALL PROCESS

        function initializeMap(){
            listenGPS();
           _loadAsyncScript();
      
        }

         /**
        ESTE METODO privado CARGA EL SCRIPT ASYNCRONIZMANETE
      */
        function _loadAsyncScript() {

            var scriptMap = document.createElement("script");
            scriptMap.type = 'text/javascript';
            scriptMap.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyD9tk6Aosm9E7iFDnKeJNTAG5EdAOoVSBY&v=3.exp&libraries=places";
            scriptMap.onload = _onAsyncScriptLoad;
            document.body.appendChild(scriptMap);

        }

            /**
          CUANDO LA LIBRERIA DE MAPAS CARGE ESTE METODO SE DISPARA.
        */
        function _onAsyncScriptLoad() {
            var mapOps = {
                center: get_last_position(),
                scrollwheel: false,
                zoom: get_last_position()!=null?18:8,
                fullscreenControl: false,
                mapTypeControl: false,
                zoomControl: false,
                streetViewControl: false,
                 scaleControl: false,
                heading:90,
                rotateControl:true,
                //gestureHandling: 'cooperative'
            };

            if(get_last_position()==null){
                var linkedFunc = App.Modules.GPS.onUpdate(function(GPS) {

                    if (GPS.state == GPS.STATES.ON) {
                        var pos = {
                            lat: GPS.position.latitude,
                            lng: GPS.position.longitude
                        };

                        _map.setCenter(pos);
                        _map.setZoom(18);
                        // TO KILL THIS LISTENER
                        linkedFunc();
                    }
                });
            }

          
            _map = new google.maps.Map(document.getElementById('map'), mapOps);
            //console.log("map loaded");

            // VALIDATE GPS POSITION AND MARK USER POSITION            
            if(get_last_position()!=null){
                _showMyMarkerPosition();    
                centerUser();
            }
            
            // IF USER DRAG THE MAP
            google.maps.event.addListener(_map, 'dragend',function(){
                if(_this.centerMe.visible==false){
                    _this.centerMe.show();
                }
            });

            // START THE AUTOCOMPLTE PLACES
            initializeInputAutocompletePlaces();
            
            // AND ROUTE
            _this.Google.geocoder=new google.maps.Geocoder;
            _this.Google.directionsService = new google.maps.DirectionsService;
            _this.Google.directionsDisplay = new google.maps.DirectionsRenderer;

            _this.Google.directionsDisplay.setMap(_map);
        }

        // THIS METHOD IS SUED TO START THE AUTOCOMPLETE PLACES
        function initializeInputAutocompletePlaces(){
            input=(document.getElementById('pac-input'));
            // AUTOMCOMPLTE FOR OPTIONS
            _this.Google.PlacesService=new google.maps.places.PlacesService(_map);
            //_this.Google.AutocompleteService = new google.maps.places.AutocompleteService();
            // SEARCH BOX FOR NOT FOUND OPTIONS
          //  var searchBox = new google.maps.places.SearchBox(input);
            var internal_timeout_id=null;
            $(input).on("keyup",function(e){
                var value=$(this).val();
                 if (e.keyCode == 27) {
                   // ESC
                    _this.places_board.hide();
                }else{
                    if(!_this.places_board.visible){
                        _this.places_board.show();
                    }
                    if(internal_timeout_id!=null){
                        clearTimeout(internal_timeout_id);
                    }
                    internal_timeout_id=setTimeout(private_execQueryPredictions,300,value);
                }
            });

        }

        // THIS METHOD EXECUTE QUERY PREDICTIONS TO READ
        function private_execQueryPredictions(_value){
            if(_value!=null && _value.length>3){
                console.log("executequerpredicionts: " +_value);
           //     _this.Google.AutocompleteService.getQueryPredictions({ input: _value }, private_displaySuggestions);

                
                _this.Google.PlacesService.textSearch({ 
                    location: get_last_position(),
                    // radius: '500',
                    query: _value
                  }, private_displaySuggestions);

            }else{
                _this.places_board.predictions=[]; 
              $apply();
            }
        }

        // THIS METHOD IS A RECEPCTION OF THE RESPONSE OF THE AUTOCOMPLTE SERVICE
        function private_displaySuggestions(places, status){
            console.log(status);  
            console.log(places);           
           if (status != google.maps.places.PlacesServiceStatus.OK) {                
                _this.places_board.places=[];
            }else{            
                _this.places_board.places=places;
            }
            $apply();
          
        }

 
        // GET THE LAS POSITION USED
       function get_last_position(){
            try{
                return localStorage.hasOwnProperty("App.Controllers.last.pos")?
                JSON.parse(localStorage["App.Controllers.last.pos"]):null;
            }catch(e){
                return null;
            }
            
        }

        // SAVE THE LAS POSITION USED
        function save_last_position(pos){
            localStorage["App.Controllers.last.pos"]=JSON.stringify(pos);
        }

        // TO PRINT EVERY TIME IS AN UPDATE
        function listenGPS() {


            // ON AN UPDATE
            function _onUpdate(GPS) {
                var position;
                if(GPS!=null && GPS.position!=null){
                    position={
                        lat:  GPS.position.latitude,
                        lng:  GPS.position.longitude
                        };

                    // TO SAVE LAST POSITION
                    save_last_position(position);
                }

              
                _showMyMarkerPosition();
                //_printCurrentGPSStatus(GPS); 

            }

            _onUpdate(App.Modules.GPS);
            App.Modules.GPS.onUpdate(_onUpdate);

        }

            /**
      Este metodo muestra el marcador del usuario actualmente
        */
       
        function _showMyMarkerPosition(){
            
            var position=get_last_position();

          if( getMap()!=null && position!=null){
              try{
                          
                   if(UserMarker.marker==null){
                      UserMarker.marker = new google.maps.Marker({
                        position: position,
                      //  icon: UserMarker.symbol,
                        map: getMap()
                      });
                  }

                  UserMarker.marker.setPosition(position);
                  UserMarker.marker.setMap(getMap())
                }catch(e){
                  console.error(e);
                }
            }
        }


        function $apply(){
            setTimeout(function(){
                $scope.$apply();
            },100);
        }
        initializeMap();
    }]);


})();