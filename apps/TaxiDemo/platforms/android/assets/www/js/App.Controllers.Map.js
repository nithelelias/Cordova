(function() {

    App.on('App.build', function(e) {
        App.Controllers.Map = new MapController();
    });

 
    /**
      INITIALIZE MAP
    */
    function MapController() {

    	var _this=this;
        var _map = null;
       
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
        // cargemos la libreria.
        _loadAsyncScript();
        // ESCUCHEMOS EL MAPA
        listenGPS();

        this.getMap=getMap;
        this.getUserMarker=getUserMarker;

        /**	
        	ESTE METTODO OBTIENE EL MAPA ACTUAL
        */
        function getMap() {
            return _map;
        }

        function getUserMarker(){
        	return UserMarker;
        }

       function get_last_position(){
            try{
                return localStorage.hasOwnProperty("App.Controllers.last.pos")?
                JSON.parse(localStorage["App.Controllers.last.pos"]):null;
            }catch(e){
                return null;
            }
            
        }

        function save_last_position(pos){
            localStorage["App.Controllers.last.pos"]=JSON.stringify(pos);
        }
        /**
			ESTE METODO privado CARGA EL SCRIPT ASYNCRONIZMANETE
  		*/
        function _loadAsyncScript() {

            var scriptMap = document.createElement("script");
            scriptMap.type = 'text/javascript';
            scriptMap.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyD9tk6Aosm9E7iFDnKeJNTAG5EdAOoVSBY&v=3.exp";
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
            if(get_last_position()!=null){
                _showMyMarkerPosition();    
            }
            

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
                _printCurrentGPSStatus(GPS); 

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
			    }catch(e){
			    	console.error(e);
			    }
			}
        }


        // FOR PRINT GPS ON MAP 
        function _printCurrentGPSStatus(GPS) {
            try {
               
                printGpsDiv = document.getElementById("deviceGps");
                if (GPS != null) {
                    if (GPS.state == GPS.STATES.NOT_SUPPORTED) {
                        printGpsDiv.innerHTML = "Geolocation is not supported by this browser.";

                    } else if (GPS.state == GPS.STATES.OFF) {
                        printGpsDiv.innerHTML = "GPS IS OFF";
                    } else if (GPS.state == GPS.STATES.ON) {
                        printGpsDiv.innerHTML = "Latitude: " + GPS.position.latitude +
                            "<br>Longitude: " + GPS.position.longitude + "<br>Date: " + (new Date()).toLocaleString();
                    } else if (GPS.state == GPS.STATES.IDLE) {
                        // JUST CALM DOWN YO
                        printGpsDiv.innerHTML = "REQUESTING ... GPS ";
                    } else {
                        printGpsDiv.innerHTML = "UPPS... ";
                    }
                } 
            } catch (e) {
                console.error(e);
            }

        }


    } // END CONTROLLER





})();