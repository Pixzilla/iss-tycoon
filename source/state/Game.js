
lychee.define('game.state.Game').requires([
	'lychee.effect.Alpha',
	'lychee.effect.Color',
	'lychee.effect.Shake',
	'game.entity.Background',
	'game.entity.Airlock',
	'game.entity.Room'
// TODO: Add this again
//	'game.ui.Overlay'
]).includes([
	'lychee.game.State'
]).exports(function(lychee, game, global, attachments) {

	var _blob = attachments["json"].buffer;
	var _font = attachments["fnt"];



	/*
	 * HELPERS
	 */

	// TODO: Helpers go here, like power, energy, oxygen



	/*
	 * IMPLEMENTATION
	 */

	var Class = function(main) {

		lychee.game.State.call(this, main);


		this.deserialize(_blob);



		/*
		 * INITIALIZATION
		 */

		this.__entity  = null;


		var viewport = this.viewport;
		if (viewport !== null) {

			viewport.bind('reshape', function(orientation, rotation) {

				var renderer = this.renderer;
				if (renderer !== null) {

					var entity = null;
					var width  = renderer.width;
					var height = renderer.height;


					entity = this.queryLayer('background', 'background');
					entity.width  = width;
					entity.height = height;

				}

			}, this);

		}

	};


	Class.prototype = {

		/*
		 * ENTITY API
		 */

		serialize: function() {

			var data = lychee.game.State.prototype.serialize.call(this);
			data['constructor'] = 'game.state.Game';


			return data;

		},

		deserialize: function(blob) {

			lychee.game.State.prototype.deserialize.call(this, blob);


			var entity = null;

			/*
			 * HELP LAYER
			 */

			this.__overlay = this.queryLayer('ui', 'overlay');


			entity = this.getLayer('ui');
			entity.bind('touch', function(id, position, delta) {

				var layer = this.queryLayer('game', 'ship');
				if (layer !== null) {
					this.__entity = layer.getEntity(null, position);
					this.__overlay.setEntity(this.__entity);
				}

			}, this);

		},



		/*
		 * CUSTOM API
		 */

		update: function(clock, delta) {



			var background = this.queryLayer('background', 'background');
			if (background !== null) {

				var x = background.origin.x;

				background.setOrigin({
					x: x + delta/250
				});

			}


			lychee.game.State.prototype.update.call(this, clock, delta);

		},

		render: function(clock, delta) {

			var entity   = this.__entity;
			var renderer = this.renderer;

			if (entity !== null) {

				renderer.setAlpha(0.4);

				this.getLayer('background').render(renderer, 0, 0);
				this.getLayer('game').render(renderer, 0, 0);

				renderer.setAlpha(1);

				this.getLayer('ui').render(renderer, 0, 0);

				renderer.flush();

			} else {

				lychee.game.State.prototype.render.call(this, clock, delta, false);

			}

		},

		enter: function() {

			lychee.game.State.prototype.enter.call(this);

		},

		leave: function() {

			lychee.game.State.prototype.leave.call(this);

		}

	};


	return Class;

});
