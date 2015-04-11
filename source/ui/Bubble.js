
lychee.define('game.ui.Bubble').includes([
	'lychee.ui.Entity'
]).exports(function(lychee, global, game, attachments) {

	var _font    = attachments["fnt"];
//	var _texture = attachments["png"];


	var Class = function(data) {

		var settings = lychee.extend({}, data);


		this.key        = 'Foo';
		this.value      = 'Bar';


		settings.radius = 64;
		settings.shape  = lychee.ui.Entity.SHAPE.circle;


		lychee.ui.Entity.call(this, settings);

		settings = null;

	};


	Class.prototype = {

		render: function(renderer, offsetX, offsetY) {

			var position = this.position;
			var radius   = this.radius;


			renderer.setAlpha(0.2);

			renderer.drawCircle(
				position.x + offsetX,
				position.y + offsetY,
				radius - 2,
				'#00000',
				true
			);

			renderer.setAlpha(1);

			renderer.drawCircle(
				position.x + offsetX,
				position.y + offsetY,
				radius,
				'#0ba2ff',
				false
			);


			renderer.drawText(
				position.x + offsetX,
				position.y + offsetY - 32,
				this.key,
				_font,
				true
			);

			renderer.drawText(
				position.x + offsetX,
				position.y + offsetY + 16,
				this.value,
				_font,
				true
			);

		}

	};


	return Class;

});

