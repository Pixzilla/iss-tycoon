
lychee.define('game.entity.Room').includes([
	'lychee.game.Sprite'
]).exports(function(lychee, global, game, attachments) {

	var _config  = attachments["json"].buffer;
	var _texture = attachments["png"];


	var Class = function(data) {

		var settings = lychee.extend({}, data);


		this.air   = 1;
		this.power = 0;
		this.temp  = 0;
		this.type  = null;


		settings.texture = _texture;
		settings.width   = 0;
		settings.height  = 0;
		settings.map     = _config.map;
		settings.state   = settings.state || 'default';
		settings.states  = _config.states;


		lychee.game.Sprite.call(this, settings);


		this.setType(settings.type);

		settings = null;

	};


	Class.prototype = {

		setType: function(type) {

			type = typeof type === 'string' ? type : null;


			if (type !== null) {

console.log(this);

				var result = this.setState(type);
				if (result === true) {

console.log(this.width, this.height);

					return true;

				}

			}


			return false;

		}

	};


	return Class;

});

