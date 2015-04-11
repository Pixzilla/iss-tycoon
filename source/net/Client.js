
lychee.define('game.net.Client').requires([
	'lychee.data.BitON'
]).includes([
	'lychee.net.Client'
]).exports(function(lychee, game, global, attachments) {

	var _BitON = lychee.data.BitON;


	var Class = function(data) {

		var settings = lychee.extend({
			codec:     _BitON,
			reconnect: 10000
		}, data);


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
		* Lightstream Init
		*/
		var client = new LightstreamerClient("https://push.lightstreamer.com","ISSLIVE");
			client.connect();
			
			var sub = new Subscription("MERGE",["USLAB000032","USLAB000035","USLAB000033","USLAB000036","USLAB000034","USLAB000037"],["Value"]);
			client.subscribe(sub);
			
			sub.addListener({
				onItemUpdate: function(update) {
					//console.log(update.getItemName(), update.getValue("Value"));
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

