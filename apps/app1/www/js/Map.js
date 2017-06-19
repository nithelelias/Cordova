(function(){
	
	angular.module('starter')
	.controller("controller.map",function(){
		var _this=this;
		var map;
	   require([
      "dojo/parser",
        "dojo/ready",
        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane",
        "dojo/dom",
        "esri/map",
        "esri/urlUtils",
        "esri/arcgis/utils",
        "esri/dijit/Legend",
        "esri/dijit/Scalebar",
        "dojo/domReady!"
      ],endRequire);


	   // CUANDO EL REQUIRE TERMINA
	   function endRequire(
	    parser,
        ready,
        BorderContainer,
        ContentPane,
        dom,
        Map,
        urlUtils,
        arcgisUtils,
        Legend,
        Scalebar){

	   	// OPEN MY MAP.
	   	arcgisUtils.createMap("74373aa91aec4a3ba3103d29f1de0177","mapDiv")
	   	.then(function(response){

	   		 map = response.map; 
	          //add the scalebar
	          var scalebar = new Scalebar({
	            map: map,
	            scalebarUnit: "english"
	          });

	          //add the legend. Note that we use the utility method getLegendLayers to get
	          //the layers to display in the legend from the createMap response.
	          var legendLayers = arcgisUtils.getLegendLayers(response);
	          var legendDijit = new Legend({
	            map: map,
	            layerInfos: legendLayers
	          },"legend");
	          legendDijit.startup();
	   	});


	   }

	}).directive("directiveMap",function(){

		return {
			restrict:"E",
			templateUrl:"views/map.html",
			controller:"controller.map",
			controllerAs:"MapCtrl"
		};

	})
	


})()