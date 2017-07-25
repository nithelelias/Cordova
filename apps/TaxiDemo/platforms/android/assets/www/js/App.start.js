/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var App = {
    Modules:{},
    Controllers:{},
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
     
        setUpBackground();
        setUpGeolocation();
        App.Device=device;
        
        // DISPATCH 
       this.broadcast("App.build");
    },
    broadcast:function(event_name,params){        
      
        document.dispatchEvent(new CustomEvent(event_name,{
          detail:params
        }));
    },
    on:function(event_name,callback){
     
      var wrapperFunc=function(e){
        callback(e.detail,e);
      };
      var linkedFunc=function(){
        try{
          document.removeEventListener(event_name,wrapperFunc,false);
        }catch(e){
          console.error(e);
        }
      }
       document.addEventListener(event_name,wrapperFunc,false);
      return linkedFunc;
    }
};


App.isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows();
    }
};


 

function setUpBackground(){
   // cordova.plugins.autoStart.enable();
    cordova.plugins.backgroundMode.configure({ silent: true });
    cordova.plugins.backgroundMode.enable();
  //  cordova.plugins.backgroundMode.excludeFromTaskList();   
    cordova.plugins.backgroundMode.overrideBackButton();
    // cordova.plugins.backgroundMode.moveToBackground();
   /**
    Various APIs like playing media or tracking GPS position in background might not work
     while in background even the background mode is active. To fix such issues the plugin provides a method to disable most optimizations done by Android/CrossWalk.
    */
    cordova.plugins.backgroundMode.on('activate', function() {
       cordova.plugins.backgroundMode.disableWebViewOptimizations(); 
    });
}

/**
  INITIALIZE GPS
*/
function setUpGeolocation(){
  var STATES={ 
    "IDLE":0,
    "OFF":1,
    "ON":2,
    "NOT_SUPPORTED" :3,
    "ERROR":4
  };
  var ON_UPDATE_EVENT="GPS.update";
  // INITIALIZE MODULE
  App.Modules.GPS={STATES:STATES,state:0,  position:null,  history:[],  onUpdate:_onUpdateEvent};
 
  
  // LISTENER OF CALLBACKS
  function _onUpdateEvent(_callBack){
     
    return App.on(ON_UPDATE_EVENT,_callBack);
  }

  // TO DISPATCH AN UPDATE
  function _dispatchUpdateCallbacks(){
    App.broadcast(ON_UPDATE_EVENT,App.Modules.GPS);
  } 

  
  /** EXECCUTED IF IS AN NAVIGATOR */
  function NavigatorHandler(){
       // SAVE THE IntervalId TO CLEAR
      var getLocationInterval=null; 

      // REQUEST GEOLOCATION FROM NAVIGATOR
      function _getLocation() {
          if (navigator.geolocation) {
              App.Modules.GPS.state=STATES.ON;
              navigator.geolocation.getCurrentPosition(_getLocation_return);
          } else {
             App.Modules.GPS.state=STATES.NOT_SUPPORTED;
                _dispatchUpdateCallbacks( );
          }
      }

      // WHEN GEOLOCATION HAS RETURN
      function _getLocation_return(position) {
         position.latitude=position.coords.latitude;
         position.longitude=position.coords.longitude;
          App.Modules.GPS.position=position;
          App.Modules.GPS.history.push(position);
          if(App.Modules.GPS.history.length>10){
            App.Modules.GPS.history.shift();
          } 
          _dispatchUpdateCallbacks( );
      }

     
      // TURN ON
      function _turnOn(){ 
        _turnOff();
        App.Modules.GPS.state=STATES.IDLE;
        getLocationInterval=setInterval(_getLocation,3000);  
      } 

      // TURN OFF
      function _turnOff(){
        if(getLocationInterval!=null){
           clearInterval(getLocationInterval);
        }
        
        getLocationInterval=null;
        App.Modules.GPS.state=STATES.OFF;
        _dispatchUpdateCallbacks( );

      } 
      // START THIS
      _turnOn();
    }

    /** EXECUTED IF IS AN MOVIL */
  function MobileHandler(){
    /**
    * This callback will be executed every time a geolocation is recorded in the background.
    */
    var callbackFn = function(location) {
   
        //console.log('[js] BackgroundGeolocation callback:  ' + location.latitude + ',' + location.longitude);
          App.Modules.GPS.state=App.Modules.GPS.STATES.ON;
          App.Modules.GPS.position=location;
          App.Modules.GPS.history.push(location);
          if(App.Modules.GPS.history.length>10){
            App.Modules.GPS.history.shift();
          } 

          _dispatchUpdateCallbacks();
         
        /*
        IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
        and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
        IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
        */
        backgroundGeolocation.finish();
        // NOW I STOP THIS SERVICE AND CONTINUE WITH NAVIGATION.
        backgroundGeolocation.stop();
    };

    var failureFn = function(error) {
        App.Modules.GPS.state=App.Modules.GPS.STATES.ERROR;
        App.Modules.GPS.errorMsg=error;
        //console.log('BackgroundGeolocation error'); 
          _dispatchUpdateCallbacks();
    };

    // BackgroundGeolocation is highly configurable. See platform specific configuration options
    backgroundGeolocation.configure(callbackFn, failureFn, {
        desiredAccuracy: 10,
       // stationaryRadius: 20,
        // distanceFilter: 30,
        interval: 3000
    });

    // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
    backgroundGeolocation.start();

    // If you wish to turn OFF background-tracking, call the #stop method.
    // backgroundGeolocation.stop();
  }


  if(App.isMobile.any()){
    MobileHandler();
  } 
  NavigatorHandler();
   
}
 
 App.Console={

    log:function(m){
      console.log(m); 
    },
    error:function(e){
      console.error(e); 
    }
 };




 /**
  INITIALIZE MOBILE
 */
App.initialize();