
lychee.define('game.entity.Astronaut').includes([
	'lychee.game.Sprite'
]).exports(function(lychee, game, global, attachments) {

	var _texture = attachments["png"];
	var _config  = attachments["json"].buffer;


	var Class = function(data) {

		var settings = lychee.extend({}, data);


		this.nearest = null;


		settings.texture = _texture;
		settings.width   = 32;
		settings.height  = 32;
		settings.map     = _config.map;
		settings.shape   = lychee.game.Entity.SHAPE.rectangle;
		settings.states  = _config.states;
		settings.state   = settings.state || _config.state;


		lychee.game.Sprite.call(this, settings);

		settings = null;


		this.setVelocity({
			x: Math.random() * 10,
			y: Math.random() * 10
		});

	};


	Class.prototype = {

		serialize: function() {

			var data = lychee.game.Sprite.prototype.serialize.call(this);
			data['constructor'] = 'game.entity.Astronaut';


			return data;

		}

	};


	return Class;

});

