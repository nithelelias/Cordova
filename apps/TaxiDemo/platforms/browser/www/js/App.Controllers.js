(function(){

    angular.module('MainApp')
    // MAIN CONTROLLER
   .controller("mainController", ["$scope",  "auth",function($scope,auth) {
        var _this=this;
     //   App.Angular.Debug.mainCtrl=this;

        this.App=App;
        /** BINDERS **/

        // BINDER VIEW
        this.View={
          name:"hola",
          url:""
        };
        
        // SPLASH BINDER ONLY ON FIRST LOAD
        this.Splash={
          element:$("#splash"),          
          fadeOut:function(){
            this.element.addClass("animated fadeOut");
          }
        }; 
        // PARAMS
        this.$apply=$apply;
        this.ready=false;
        
      
        // WHEN WANT TO SHOW A VIEW
        App.on('App.showView', function(_viewData,_event) { 
       
          _this.View=_viewData;          
          _this.Splash.element.remove();
          $apply();
        });

      
      // THIS METHOD FORCE THE APPLY ON THIS CONTROLLER
      function $apply(){
        setTimeout(function(){
          $scope.$apply();
        },100);
      }
  


      // INITIALIZE VIEW.
   
      function init_view(_view){
          _this.ready=true; 
          _this.Splash.fadeOut();
          
          $apply();
      
          setTimeout(function(){ 
            App.broadcast('App.showView', _view);
          },2000);
      }

      /** ---------- BOOT UP RULES ------------ **/  

      if(auth.validate()){
          // CONTINUE TO MAIN PAGE
           init_view(App.Angular.Views.main);
       }else{
          // CONTINUE TO LOGIN PAGE
          init_view(App.Angular.Views.login);
       }
      


   }])
  .controller("loginController",["$scope","auth",function($scope,auth){
      var _this=this;
      this.section=1;// TO SHOW THE FIRST SECTION OF THE REGISTER THAT IS TO RECEIVE THE TELEPHONE NUMBER
      this.waitinOperation=false;
      this.celOK=false;
      this.exist=false;
      this.Profile={
        cel:null
      };


      // ESTE METODO PRIVADO SE USA PARA TERMINAR CON EL LOGIN
      function endRegisterAndLogin(){
        _this.waitinOperation=true;
         _this.section=5;
         // AHORA 4 SEGUNDOS PARA IR AL MAIN.
         setTimeout(function(){
            _this.waitinOperation=false;
            App.broadcast('App.showView',App.Angular.Views.main);
         },4000);
      }

      function $apply(){
         setTimeout(function(){
          $scope.$apply();  
        },100);
      }
      // 
        /** 
            THIS METHOD EXECUTE THE SUBMIT ON THE CEL NUMBER, TO :
            -CHECK IF CELPHONE IS CORRECT, SENDING SOM TEXT_MESSAGE
            -VALIDATE THE CELPHONE IF HAS PROFILE BUT NOT RETURNED
        */
      // 
      this.setUpCel=_setUpCel; 
      function _setUpCel(){ 

        if(_this.celOK && _this.waitinOperation==false && _this.Profile.cel!=null){
          
            _this.waitinOperation=true;
            _this.exist=false;
           
            auth.validateCelPhone(_this.Profile.cel)
            .then(function(_r){
              _this.waitinOperation=false;
              var response=JSON.parse(_r).response;

              if(response!=null){
                  // VALIDATE IF SMS SEND AND IF USER EXIST
                   if(response.exist){
                      // USUARIO EXISTE WELCOME BACK FOR HIM
                      this.exist=true;
                   }

                   if(response["sms-send"]   ){
                      // PONER EL CODIGO PAR ACONTINUAR....
                      _this.section=2;
                   }else  if(response["sms-send"]==false && response["retry"]==false){
                      // CONTINUAR DIRECTAMETNE AL PROFILE 
                      _this.section=3;
                   }

                }

              $apply(); 
            }); 
            $apply();
        }
 
      };

      // ESTE METODO EJECUTAR EL REGISTRO DEL PERFIL
      this.register=function(){
        if(_this.celOK && _this.Profile.names!=null && _this.Profile.lastNames!=null){
           _this.waitinOperation=true;        
            $apply();

            auth.register(_this.Profile.cel,_this.Profile.names,_this.Profile.lastNames)
            .then(function _success_(r){
              _this.waitinOperation=false;

              var response=JSON.parse(r);
              if(response.success){
                endRegisterAndLogin();
              }else{
                App.toast("No se pudo realizar la operacion",2600,"red");
              }
              
              console.log(r); 
              $apply();

            },function _error_(error){
              _this.waitinOperation=false;
              console.error(error);
              $apply();
            });
          }

      };
      

      // ESTE METODO VALIDARA INTERNAMENTE LOS NUMERO DEL CELULAR
      this.validateCel=function validateCel(){

        var _cel=""+_this.Profile.cel;
        return _this.celOK= _cel=!null && _cel.length>=9;
      };

      // ESTE METODO SE EJECUTA AL INICAR LA VISTA PARA CALCULOS GRAFICOS COMO EL FOCUS.
      this.onViewInit=function onViewInit(){
        setTimeout(function(){
            $("#cel").focus();
        },1200);
      }

  }])
   // MAP CONTROLLER
    .controller("mapController",["$rootScope","$scope",function($rootScope,$scope){
        App.Angular.Debug.mapCtrl=this;
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
        this.getMap=getMap;
        this.getUserMarker=getUserMarker;
        this.showMyMarkerPosition=_showMyMarkerPosition;
        /** 
          ESTE METTODO OBTIENE EL MAPA ACTUAL
        */
        function getMap() {
            return _map;
        }

        function getUserMarker(){
          return UserMarker;
        }

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
              //  zoomControl: false,
                streetViewControl: false,
                //scaleControl: false,
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
        initializeMap();
    }]);

  
})();