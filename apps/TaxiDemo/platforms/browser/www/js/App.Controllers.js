(function(){

    angular.module('MainApp')
    // MAIN CONTROLLER
   .controller("mainController", ["$scope",  function($scope) {
        var _this=this;
        App.Debug.mainCtrl=this;
        this.View={
          name:"hola",
          url:""
        };
        this.$apply=$apply;
        this.ready=false;
        this.readyAfter1second=false;
        
      App.on('App.showView', function(data,_event) { 
        //_this.View.url="views/login.html?v=2";
        _this.View.name=data;
        console.log(data);
        console.log(_event);        
        _this.readyAfter1second=true;
        $apply();
      });

      
      // THIS METHOD FORCE THE APPLY ON THIS CONTROLLER
      function $apply(){
        setTimeout(function(){
          $scope.$apply();
        },100);
      }
 
    App.INIT_VIEW=function(){
        
            _this.ready=true; 
        
        $apply();
        setTimeout(function(){ 
          App.broadcast('App.showView', "hola mundo");
        },2000);
  
    };

   }])

   // MAP CONTROLLER
    .controller("mapController",["$rootScope","$scope",function($rootScope,$scope){
        function initializeMap(){
          App.broadcast("App.build.map");
        }
        initializeMap();
    }]);

  
})();