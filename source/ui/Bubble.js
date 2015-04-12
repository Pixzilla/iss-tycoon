
lychee.define('game.ui.Bubble').includes([
	'lychee.ui.Entity'
]).exports(function(lychee, global, game, attachments) {

	var _font    = attachments["fnt"];
	var _config  = attachments["json"].buffer;
	var _texture = attachments["png"];


	var Class = function(data) {

		var settings = lychee.extend({}, data);


		this.key        = settings.key   || 'urine';
		this.value      = settings.value || '0%';


		settings.radius = 48;
		settings.shape  = lychee.ui.Entity.SHAPE.circle;
		settings.tt

		lychee.ui.Entity.call(this, settings);

		settings = null;

	};


	Class.prototype = {

		render: function(renderer, offsetX, offsetY) {

			var position = this.position;
			var radius   = this.radius;


			renderer.setAlpha(0.6);

			renderer.drawCircle(
				position.x + offsetX,
				position.y + offsetY,
				radius - 1,
				'#00000',
				true
			);

			renderer.setAlpha(1);

			renderer.drawCircle(
				position.x + offsetX,
				position.y + offsetY,
				radius,
				'#0ba2ff',
				false,
				1
			);


			var map = _config.map[this.key] || null;
			if (map !== null) {

				var frame = map[0] || null;
				if (frame !== null) {

					renderer.drawSprite(
						position.x + offsetX - 16,
						position.y + offsetY - 30,
						_texture,
						frame
					);

				}

			}


			renderer.drawText(
				position.x + offsetX,
				position.y + offsetY + 12,
				this.value,
				_font,
				true
			);

		}

	};


	return Class;

});

