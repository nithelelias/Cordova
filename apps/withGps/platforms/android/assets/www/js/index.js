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
        setUpMap();
    }  
};


var isMobile = {
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
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    }
};


 

function setUpBackground(){
    cordova.plugins.autoStart.enable();
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
    "NOT_SUPPORTED" :3
  };
  // INITIALIZE MODULE
  App.Modules.GPS={STATES:STATES,state:0,
  position:null,
  history:[],onUpdate:_onUpdateEvent,turnOn:_turnOn,turnOff:_turnOff};
  
  // SAVE THE IntervalId TO CLEAR
  var getLocationInterval=null; 
  var callBackOnUpdateListeners=[];
  
  // LISTENER OF CALLBACKS
  function _onUpdateEvent(_callBack){
    var indexCallBack=callBackOnUpdateListeners.length;
    callBackOnUpdateListeners.push(_callBack);
    var linkedFunc=function(){
      try{
        delete callBackOnUpdateListeners[indexCallBack];
      }catch(e){
        console.error(e);
      }
    }
    return linkedFunc;
  }

  function _dispatchUpdateCallbacks(position){
    for(var i in callBackOnUpdateListeners){
      if(callBackOnUpdateListeners[i]!=null){
        callBackOnUpdateListeners[i](App.Modules.GPS.state,position);
      }
    }
  } 

  // REQUEST GEOLOCATION FROM NAVIGATOR
  function _getLocation() {
      if (navigator.geolocation) {
          App.Modules.GPS.state=STATES.ON;
          navigator.geolocation.getCurrentPosition(_getLocation_return);
      } else {
         App.Modules.GPS.state=STATES.NOT_SUPPORTED;
      }
  }

  // WHEN GEOLOCATION HAS RETURN
  function _getLocation_return(position) {
     
      App.Modules.GPS.position=position;
      App.Modules.GPS.history.push(position);
      if(App.Modules.GPS.history.length>10){
        App.Modules.GPS.history.shift();
      } 
      _dispatchUpdateCallbacks(position);
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

  }

  // START THIS
  _turnOn();

}
 

/**
  INITIALIZE MAP
*/
function setUpMap(){

  var _map=null;
  App.Modules.Map={
      getMap:_getMap
  };

  function _getMap(){
    return _map;
  }

  function _loadAsyncScript(){
    
    var scriptMap=document.createElement("script");  
    scriptMap.type = 'text/javascript';
    scriptMap.src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDvJMOgSkpgaA5yQ9REBM_Uc5_I1mt589Q";
    scriptMap.onload=_onAsyncScriptLoad;
    document.body.appendChild(scriptMap);
      
  }
  
  function _onAsyncScriptLoad(){

     _map=  new google.maps.Map(document.getElementById('map'), {
          //center: {lat: -34.397, lng: 150.644},
          scrollwheel: false,
          zoom: 8,
          fullscreenControl: false,
          mapTypeControl:false
      });

     var linkedFunc=App.Modules.GPS.onUpdate(function(state,position){
        if( state==App.Modules.GPS.STATES.ON){ 
          var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };

          _map.setCenter(pos);
          _map.setZoom(18);
          // TO KILL THIS LISTENER
          linkedFunc();
        }
     });
  }

  // TO PRINT EVERY TIME IS AN UPDATE
  (function(){
      // FOR PRINT GPS ON MAP
      var deviceGps=document.getElementById("deviceGps");  
      
      // ON AN UPDATE
      function _onUpdate(state,position){
        var GPS_STATES=App.Modules.GPS.STATES; 

        if( state==GPS_STATES.NOT_SUPPORTED){ 
          deviceGps.innerHTML = "Geolocation is not supported by this browser.";
        
        }else if(  state==GPS_STATES.OFF){
            deviceGps.innerHTML ="GPS IS OFF";
        }else if( state==GPS_STATES.ON){
          deviceGps.innerHTML = "Latitude: " + position.coords.latitude + 
          "<br>Longitude: " + position.coords.longitude; 
        }else if( state==GPS_STATES.IDLE){
          // JUST CALM DOWN YO
        } 

      }

      App.Modules.GPS.onUpdate(_onUpdate);
  })()
  _loadAsyncScript();
}


 /**
  INITIALIZE MOBILE
 */
App.initialize();