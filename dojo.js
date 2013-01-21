(function(){
	// summary:
	//		Dojo 1.9 compatible version of dojo.js.   New modules should just include an AMD loader directly, e.x:
	//
	//			<script src="require/require.js"/>
	//			<script>
	//				require.config({ baseUrl: ".." });
	//			</script>
	//
	//		Also, only works for browser-side instantiation.

	// the sniff regex looks for a src attribute ending in dojo.js, optionally preceded with a path.
	// match[3] returns the path to dojo.js (if any) without the trailing slash. This is used for the
	// dojo location on CDN deployments and baseUrl when either/both of these are not provided
	// explicitly in the config data; this is the 1.6- behavior.

	var scripts = document.getElementsByTagName("script"),
		i = 0,
		script, dojoDir, baseUrl, src, match;
	while(i < scripts.length){
		script = scripts[i++];
		if((src = script.getAttribute("src")) && (match = src.match(/(((.*)\/)|^)dojo\.js(\W|$)/i))){
			// sniff dojoDir and baseUrl
			dojoDir = match[3] || "";

			// sniff configuration on attribute in script element
			src = (script.getAttribute("data-dojo-config") || script.getAttribute("djConfig"));
			if(src){
				// TODO: is this enough to get dojo to see the configuration arguments (like isDebug)?
				dojoConfig = eval("({ " + src + " })");
			}
			break;
		}
	}

	// Load the real AMD loader and configure baseUrl
	// note: like v1.6-, this bootstrap computes baseUrl to be the dojo directory
	document.write(
		"<script src='" + dojoDir + "/requirejs/require.js'></script>" +
			"<script>require.config({" +
			"baseUrl: '" + dojoDir + "'," +
			"packages: [" +
			"{name:'dojo', location:'.'}," +
			"{name:'dijit', location:'../dijit'}," +
			"{name:'dojox', location:'../dojox'}," +
			"{name:'doh', location:'../util/doh'}," +
			"]" +
			"});</script>"
	);

})();
