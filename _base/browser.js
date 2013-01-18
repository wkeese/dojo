if(require.has){
	require.has.add("config-selectorEngine", "acme");
}
define([
	"./kernel",
	"./unload",
	"./window",
	"./fx"], function(dojo){

	// module:
	//		dojo/_base/browser

	/*=====
	return {
		// summary:
		//		This module causes the browser-only base modules to be loaded.
	};
	=====*/

	return dojo;
});
