
lychee.define('game.state.Game').requires([
	'lychee.effect.Alpha',
	'lychee.effect.Color',
	'lychee.effect.Shake',
	'game.entity.Background',
	'game.entity.Room'
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

		this.__logic = new lychee.game.Logic({
			tile: {
				width:  32,
				height: 32,
				depth:  32
			},
			projection: lychee.game.Logic.PROJECTION.tile
		});

// TODO: Fix bug in lychee
		this.__logic.setLayers([
			this.queryLayer('game', 'ship')
		]);
		this.addLogic(this.__logic);


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

		},



		/*
		 * CUSTOM API
		 */

		update: function(clock, delta) {

			lychee.game.State.prototype.update.call(this, clock, delta);


			var background = this.queryLayer('background', 'background');
			if (background !== null) {

				var x = background.origin.x;

				background.setOrigin({
					x: x + delta/250
				});

			}


		},

		enter: function() {

			lychee.game.State.prototype.enter.call(this);

// TODO: Check projections

console.log(this);

		},

		leave: function() {

			lychee.game.State.prototype.leave.call(this);

		}

	};


	return Class;

});
