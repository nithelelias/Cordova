(function(){
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
 angular.module('starter', ['ionic', 'ngCordova','ngRoute' ,'ngTouch'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
 .config(function( $routeProvider,$locationProvider) {

              
            $routeProvider.when("/", {       
                templateUrl: "views/main.html" , 
            }).when("/camera?", {       
                templateUrl: "views/camera.html" ,                
            })            
            .otherwise({"redirectTo":"/"});  
             $locationProvider.html5Mode(false);

        })

.controller("mainController",function($scope, $routeParams, $cordovaCamera){
  var _this=this;

 
  this.getNombre=function(){
    if($routeParams.hasOwnProperty("nombre")){
      return $routeParams.nombre
    }else{
      return "sin nombre";
    }
  };

})

.controller("CameraController",function( $cordovaCamera){
    var _this=this;
   var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
  this.takePicture = function() {
      $cordovaCamera.getPicture(options).then(function(imageData) {
          _this.imgSrc = "data:image/jpeg;base64," + imageData;
      }, function(err) {
          console.log(err);
      });
  }
})


})();