
lychee.define('game.entity.Room').includes([
	'lychee.game.Sprite'
]).exports(function(lychee, global, game, attachments) {

	var _config  = attachments["json"].buffer;
	var _texture = attachments["png"];


	var _colors = {
		'default': '#000000',
		'cargo':   '#66b266',
		'dock':    '#808080',
		'lab':     '#7f7fff',
		'service': '#ff6666'
	};


	var Class = function(data) {

		var settings = lychee.extend({}, data);


		this.air         = 1;
		this.power       = 0;
		this.temp        = 0;

		this.airlocks = [ null, null, null, null ];


		settings.texture = settings.texture || _texture;
		settings.width   = settings.width   || _config.width;
		settings.height  = settings.height  || _config.height;
		settings.state   = settings.state   || 'default';


		lychee.game.Sprite.call(this, settings);

	};


	Class.prototype = {

		setState: function(state) {

			state = typeof state === 'string' ? state : null;


			if (state !== null && typeof _config.states[state] !== 'undefined') {

				this.state  = state;
				this.width  = _config.states[state].width;
				this.height = _config.states[state].height;

				return true;

			}


			return false;

		},

		render: function(renderer, offsetX, offsetY) {

			var width    = this.width;
			var height   = this.height;
			var color    = _colors[this.state] || '#000000';
			var position = this.position;


			var x1 = offsetX + position.x - width  / 2;
			var x2 = offsetX + position.x + width  / 2;
			var y1 = offsetY + position.y - height / 2;
			var y2 = offsetY + position.y + height / 2;


			renderer.drawBox(
				x1,
				y1,
				x2,
				y2,
				color,
				true
			);

		}

	};


	return Class;

});

