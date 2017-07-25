(function(){
	angular.module('MainApp')
    
    // DATA MODELS
    .factory("dModels",["$q","wService",function($q,wService){  
 
	  // CACHE MODEL STORE SOME INFORMATION.
		function LocalStorageManager(data_name){
			var _this=this;
			var KEY_STORAGE="DataModels."+data_name;
			this.data=localStorage.hasOwnProperty(KEY_STORAGE)?JSON.parse(localStorage[KEY_STORAGE]):{};// IS NOT EXIST EMPTY HASH
			this.set=function(key,value){
				_this.data[key]=value;
				localStorage[KEY_STORAGE]=JSON.stringify(_this.data);
			};
			this.get=function(key){
				if(_this.data.hasOwnProperty(key)){
					return _this.data[key];	
				} 
				return null; 
			};

		}

		/** 
			START UTILS METHODS
		*/


		function JSON_PARSE(m){
			try{
				return JSON.parse(m);
			}catch(e){
				App.Console.error(e);
				return null;
			}
		}
		/**
			END UTILS METHODS
		*/

		// CACHE MODEL STORE SOME INFORMATION.
		function CacheModel(){    		
			this.storage=new LocalStorageManager("Cache");    		
			this.set=this.storage.set;
			this.get=this.storage.get; 
		}

		// USER MODEL TO STORE USER RELATED INFORMATION
		function UserModel(){
			var _this=this;
			this.storage=new LocalStorageManager("User");    		
			this.set=this.storage.set;
			this.get=this.storage.get; 

			this.Profile=this.get("Profile");

			// THIS VALIDATE IF USER IS VALIDATED
			this.isRegister=function(){
				return _this.Profile!=null;
			};
			// THIS METHOD IS USED TO SAVE THE LOCAL PROFILE
			this.saveProfile=function(){
				_this.set("Profile",_this.Profile);
			};
			// NOW WITH THIS METHOD, WE WANT TO KNOW UPDATE USER INFORMATION FROM SERVER
			this.recoverProfileInfo=function(){
				if(_this.isRegister()){
					wService.get("Client","getProfile",
					{
						cel:_this.Profile.cel
					}
					)
					.then(function _success_(r){
						var response=JSON_PARSE(r);
						_this.Profile=response.response; 
					},function _error_(error){
						App.Console.error(error);
					})
				}
			};

			this.register=function(){
				
			};

		}



    	return {
    		Cache:new CacheModel(),
    		User:new UserModel()
    	};
    
   }]) 
})()