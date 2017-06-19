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
       	var printGpsDiv = document.getElementById("deviceGps");
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

        /**
			ESTE METODO privado CARGA EL SCRIPT ASYNCRONIZMANETE
  		*/
        function _loadAsyncScript() {

            var scriptMap = document.createElement("script");
            scriptMap.type = 'text/javascript';
            scriptMap.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyD9tk6Aosm9E7iFDnKeJNTAG5EdAOoVSBY";
            scriptMap.onload = _onAsyncScriptLoad;
            document.body.appendChild(scriptMap);

        }

        /**
        	CUANDO LA LIBRERIA DE MAPAS CARGE ESTE METODO SE DISPARA.
        */
        function _onAsyncScriptLoad() {
            var mapOps = {
                //center: {lat: -34.397, lng: 150.644},
                scrollwheel: false,
                //  zoom: 8,
                fullscreenControl: false,
                mapTypeControl: false,
                zoomControl: false,
                streetViewControl: false,
                scaleControl: false,
            };
            if (App.Modules.GPS.state == App.Modules.GPS.ON) {
                mapOps.center = {
                    lat: App.Modules.GPS.position.latitude,
                    lng: App.Modules.GPS.position.longitude
                };
            } else {
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


        }

        // TO PRINT EVERY TIME IS AN UPDATE
        function listenGPS() {


            // ON AN UPDATE
            function _onUpdate(GPS) {

            	_showMyMarkerPosition(GPS);
                _printCurrentGPSStatus(GPS);

            }

            _onUpdate(App.Modules.GPS);
            App.Modules.GPS.onUpdate(_onUpdate);

        }

        /**
			Este metodo muestra el marcador del usuario actualmente
        */
       
        function _showMyMarkerPosition(GPS){
        	if( getMap()!=null && GPS!=null && GPS.state == GPS.STATES.ON){
	 			try{
			       if(UserMarker.marker==null){
				        UserMarker.marker = new google.maps.Marker({
				          position: GPS.position,
				        //  icon: UserMarker.symbol,
				          map: getMap()
				        });
				    }

				    UserMarker.marker.setPosition({
                    lat:  GPS.position.latitude,
                    lng:  GPS.position.longitude
                });
			    }catch(e){
			    	console.error(e);
			    }
			}
        }


        // FOR PRINT GPS ON MAP 
        function _printCurrentGPSStatus(GPS) {
            try {
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