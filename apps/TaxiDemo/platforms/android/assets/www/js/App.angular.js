(function(){
	
	App.Angular={
		Debug:{},
		Views:{}
	};
	App.toast=Materialize.toast;
	
    angular.module('MainApp', [ 'ngTouch']); 
    App.on('App.build', function(e) { 

	    setTimeout(function() {
	         angular.bootstrap(document, ["MainApp"]);
	    }, 500);
	    
       
    }); 
 

})();