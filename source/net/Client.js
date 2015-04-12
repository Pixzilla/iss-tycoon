
lychee.define('game.net.Client').requires([
	'lychee.data.BitON'
]).includes([
	'lychee.net.Client'
]).exports(function(lychee, game, global, attachments) {

	var _BitON = lychee.data.BitON;

	// UGLY HACK, but doesnt work without (don't ask why)
	var _blob = attachments["json"].buffer;

	var _ROOMS = ['node1', 'fgb', 'node0', 'sm', 'node3', 'crewlock', 'destiny', 'harmony', 'columbus', 'jem'];

	var _astronaut_id = 0;

	var _SENSOR_MAP = {
		destiny: {
			pressure    : 'USLAB000058',
	    temperature : 'USLAB000059',
	    n2          : 'USLAB000054',
	    co2         : 'USLAB000053'
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



			/**
			 * Astronauts
			 */


			_blob.forEach(function(astronaut) {
				// debugger
				astronaut.room = _ROOMS[_astronaut_id++];
				_astronaut_id = _astronaut_id % _ROOMS.length;
				astronaut.currentActivity = astronaut.activities[astronauts.activities.length - 1];

				this.trigger('new_astronaut', [astronaut]);
			}, this);

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

				var sensor   = update.getItemName();
				var value    = update.getValue("Value");
				var property = null;

				var test = parseFloat(value);
				if (!isNaN(test)) {
					value = '' + Math.round(test).toFixed(2);
				}


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

