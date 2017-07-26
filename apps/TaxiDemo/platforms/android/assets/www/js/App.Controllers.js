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
  
  
})();