
lychee.define('game.net.Client').requires([
	'lychee.data.BitON'
]).includes([
	'lychee.net.Client'
]).exports(function(lychee, game, global, attachments) {

	var _BitON = lychee.data.BitON;


	/* Global LS options. */
	var lsOptions =  {
		domain: "nasa.gov",               // domain=web
		host: "push1.jsc.nasa.gov",     // LS host
		port: "80",                 // production port=80
		applicationName: "ISSWeb",          // application name
		enginePath: "./lib/ls/",          // engine path
		// telemetryDataAdapter: "PROXYTELEMETRY", // telemetry data adapter
		dataAdapter: "PROXYTIMELINE",   // timeline data adapter
		debugAlertsOnClientError: false,    // production=false
		// webRoot: "http://spacestationlive.nasa.gov/",// production web root for integration with Unity web player
		tableID: "ISPAstroTimelineTbl"
	};



	var Class = function(data) {

		var settings = lychee.extend({
			codec:     _BitON,
			reconnect: 10000
		}, data);

		var _timelineManager = null;
		var _pushPage        = null;

		lychee.net.Client.call(this, settings);



		/*
		 * INITIALIZATION
		 */

		this.bind('connect', function() {

			if (lychee.debug === true) {
				console.log('(ISS Tycoon) game.net.Client: Remote connected');
			}

		}, this);

		this.bind('disconnect', function(code) {

			if (lychee.debug === true) {
				console.log('(ISS Tycoon) game.net.Client: Remote disconnected (' + code + ')');
			}

		}, this);


		this.connect();


		/**
		* Lightstream Websockets Init
		*/
		// var client = new LightstreamerClient("https://push.lightstreamer.com","ISSLIVE");
		// client.connect();
		// var prefix = 'USLAB0000';
		// var sensors = [];
		// for (var i = 1; i < 53; i++) {
		// 	var str = prefix;
		// 	if (i < 10) {
		// 		str += '0';
		// 	}
		// 	str += i;
		// 	sensors.push(str);
		// }
		
		// var sub = new Subscription("MERGE",sensors,["Value"]);
		// client.subscribe(sub);
		
		// sub.addListener({
		//  onItemUpdate: function(update) {
		//  	// debugger
		//    console.log(update.getItemName(), update.getValue("Value"));
		//  }
		// });

		/**
		 * Lightstream XML for Astronouts Data
		 */
		_timelineManager = new XMLTimelineManager();


		// Initialize push page
		_pushPage = null;
		_pushPage = new PushPage();
	  _pushPage.context.setDebugAlertsOnClientError(lsOptions.debugAlertsOnClientError); // (false=production)
	  _pushPage.context.setDomain(lsOptions.domain); // domain=web
	  _pushPage.onEngineCreation = function(lsEngine) {
	  	
	      lsEngine.connection.setAdapterName(lsOptions.dataAdapter);
	      lsEngine.connection.setLSHost(lsOptions.host);
	      lsEngine.connection.setLSPort(lsOptions.port); // production port=80
	      lsEngine.changeStatus("STREAMING");
	      
	  };
	  
	  //_pushPage.onClientError = function(msg){ alert(msg); };
	  //_pushPage.onClientAlert = function(code, msg){ alert(msg);   };
	  _pushPage.bind(); 
	  _pushPage.createEngine(lsOptions.applicationName, lsOptions.enginePath, "SHARE_SESSION");
	  _pushPage.onEngineReady = function(lsEngine) {
	      // Start table subscription once engine is ready
		  
		  function onXMLUpdate() {
		  	debugger
		  }
		  _nonVisualTable = new NonVisualTable(_group, _group, "MERGE");
	    _nonVisualTable.setSnapshotRequired(true);
	    _nonVisualTable.onItemUpdate = onXMLUpdate;
	    _pushPage.addTable(_nonVisualTable, lsOptions.tableID);
	  };


	};


	Class.prototype = {

		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			var data = lychee.net.Client.prototype.serialize.call(this);
			data['constructor'] = 'game.net.Client';


			return data;

		}

	};


	return Class;

});

