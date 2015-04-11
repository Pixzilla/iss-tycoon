
lychee.define('game.net.Client').requires([
	'lychee.data.BitON'
]).includes([
	'lychee.net.Client'
]).exports(function(lychee, game, global, attachments) {

	var _BitON = lychee.data.BitON;

	var _blob = attachments["json"].buffer;
	// debugger

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


	var _SENSOR_MAP = {
		destiny: {
			pressure    : 'USLAB000058',
	    temperature : 'USLAB000059',
	    oxygen      : 'USLAB000053',
	    n2          : 'USLAB000054',
	    co2         : 'USLAB000055'
		},
		crewlock: {
			pressure    : 'AIRLOCK000054'   
		},
		harmony: {
			water       : 'NODE2000006'
		}
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

		var sensors = [].concat.apply([],
			Object.keys(_SENSOR_MAP).map(function(room) {
				return Object.keys(_SENSOR_MAP[room]).map(function(property) {
					return _SENSOR_MAP[room][property];
				});
			}));

		
		var sub = new Subscription("MERGE", sensors, ["Value"]);
		client.subscribe(sub);


		var that = this;

		sub.addListener({
			onItemUpdate: function(update) {

				var sensor = update.getItemName();
				var value = update.getValue("Value");
				var property = null;

				var room = Object.keys(_SENSOR_MAP).filter(function(room) {
					return Object.keys(_SENSOR_MAP[room]).filter(function(__property) {
						var equals = _SENSOR_MAP[room][__property] === sensor;
						if (equals) {
							property = __property;
							return true;
						} else {
							return false;
						}
					}).length > 0;
				})[0] || null;


				if (room !== null) {
					that.trigger('sensor', [room, property, value])
				}

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

