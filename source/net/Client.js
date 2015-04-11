
lychee.define('game.net.Client').requires([
	'lychee.data.BitON'
]).includes([
	'lychee.net.Client'
]).exports(function(lychee, game, global, attachments) {

	var _BitON = lychee.data.BitON;

	var _blob = attachments["json"].buffer;
	debugger

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
		var client = new LightstreamerClient("https://push.lightstreamer.com","ISSLIVE");
		client.connect();
		var prefix = 'USLAB0000';
		var sensors = [];
		for (var i = 1; i < 53; i++) {
			var str = prefix;
			if (i < 10) {
				str += '0';
			}
			str += i;
			sensors.push(str);
		}
		
		var sub = new Subscription("MERGE",sensors,["Value"]);
		// client.subscribe(sub);
		
		sub.addListener({
		 onItemUpdate: function(update) {
		 	// debugger
		   // console.log(update.getItemName(), update.getValue("Value"));
		 }
		});



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

