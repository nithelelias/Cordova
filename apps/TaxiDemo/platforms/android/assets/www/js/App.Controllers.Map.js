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
        this.AutocompleteService=null;
        this.getMap=getMap;
        this.centerMe=centerMe;
        this.getUserMarker=getUserMarker;
        this.showMyMarkerPosition=_showMyMarkerPosition;
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
                setTimeout(function(){
                    _this.places_board.visible=false;
                    $apply();
                },900);
            },
            predictions:[]
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
            getMap().setZoom(5);
            _this.centerMe.hide();
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
              //  zoomControl: false,
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
        }

        // THIS METHOD IS SUED TO START THE AUTOCOMPLETE PLACES
        function initializeInputAutocompletePlaces(){
            input=(document.getElementById('pac-input'));
            _this.AutocompleteService = new google.maps.places.AutocompleteService();
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
                _this.AutocompleteService.getQueryPredictions({ input: _value }, private_displaySuggestions);
            }else{
                _this.places_board.predictions=[]; 
              $apply();
            }
        }

        // THIS METHOD IS A RECEPCTION OF THE RESPONSE OF THE AUTOCOMPLTE SERVICE
        function private_displaySuggestions(predictions, status){
            console.log(predictions);           
           if (status != google.maps.places.PlacesServiceStatus.OK) {                
                _this.places_board.predictions=[];
            }else{            
                _this.places_board.predictions=predictions;
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