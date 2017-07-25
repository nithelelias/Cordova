(function(){
	
    angular.module('MainApp')
   .service("auth",["$q","wService","dModels",function($q,wService,dModels){
   		var $service={
   			validate:_validate ,
   			validateCelPhone:_validateCelPhone,
   			register:_register
   		};

 	
 		// VALIDATION
   		function _validate(){

   		 
   			 // FIRST VALIDATE IF THE MOBILE HAS BEEN REGISTER
   			if(dModels.User.isRegister()){
   				// THEN FIND USER CONFIGS AND PROFILE INFORMATION IF UPDATED
   				 dModels.User.recoverProfileInfo();
   				return true;
   				
   			}

   			// ELSE IF THE CODE REACH THIS POINT IT MEANTS THAT:
   			// APP CANT TELL IF THE USER HAS BEEN LOGGED THEN ASK FOR LOGIN INFORMATION. ( PHONE NUMBER )
			
			return false;
   		}
 
   		function _validateCelPhone(_cel){
   			return wService.get("Client","validateCelPhone",{
   				cel:_cel
   			});
   		}

   		function _register(_cel,_names,_lastNames){
        var defer=$q.defer();
   			 wService.post("Client","register",{
				cel:_cel, 
				nombres:_names,
				apellidos:_lastNames ,
				cel_uuid:App.Device.uuid,
				device:JSON.stringify(App.Device)
   			}).then(function _success_(r){
          var response=JSON.parse(r);
         
          if(response.success){
            dModels.User.Profile={
              cel:_cel,
              nombres:_names,
              apellidos:_lastNames
            };
            dModels.User.saveProfile();
          }
         
          defer.resolve(r);
          
        },defer.reject);

        return defer.promise;
   		}


   		return $service;
   }])
    /// WEB SERVICE FOR CONSULTING.
   .service("wService",["$q",function($q){

    	var _url="http://nithel.esy.es/apps/taxiDemo/server/index.php";
    	 
    	function _get(_ctrl,_task,_params){
    		return _request("get",_ctrl,_task,_params);
    	}

    	function _post(_ctrl,_task,_params){
    		 
    		return _request("post",_ctrl,_task,_params);
    	}

    	function _request(METHOD,_ctrl,_task,_params){
    		var data=_params || {};
    		data.ctrl=_ctrl;
    		data.task=_task;
    		return jQuery[METHOD](_url,data);
    	} 

    	return {
    		$q:$q,
    		get:_get,    		
    		post:_post
    	};
    }])
})()