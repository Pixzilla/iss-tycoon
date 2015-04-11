
lychee.define('game.state.Game').requires([
	'lychee.effect.Alpha',
	'lychee.effect.Color',
	'lychee.effect.Position',
	'lychee.effect.Shake',
	'game.entity.Astronaut',
	'game.entity.Background',
	'game.entity.Airlock',
	'game.entity.Room',
	'game.ui.Overlay'
]).includes([
	'lychee.game.State'
]).exports(function(lychee, game, global, attachments) {

	var _blob = attachments["json"].buffer;
	var _font = attachments["fnt"];



	/*
	 * HELPERS
	 */

	// TODO: Helpers go here, like power, energy, oxygen


	var _animate_astronaut = function(astronaut) {

		var posx     = astronaut.position.x;
		var posy     = astronaut.position.y;
		var entities = this.queryLayer('game', 'ship').entities.filter(function(val) { return val instanceof game.entity.Airlock; });
		var dist     = Infinity;
		var nearest  = null;


		for (var e = 0, el = entities.length; e < el; e++) {

			var entity  = entities[e];
			var current = Math.sqrt(Math.pow(entity.position.x - posx, 2) + Math.pow(entity.position.y - posy, 2));

			if (current < dist) {
				dist    = current;
				nearest = entity;
			}

		}


		var distx = Math.abs(nearest.position.x - astronaut.position.x);
		var disty = Math.abs(nearest.position.y - astronaut.position.y);

		if (astronaut.nearest === null) {

			if (distx > 32 && disty > 32) {

				var nearx = nearest.position.x;
				var neary = nearest.position.y;

				astronaut.nearest = nearest;
				astronaut.addEffect(new lychee.effect.Position({
					type:     lychee.effect.Position.TYPE.easein,
					duration: 250 * Math.sqrt(Math.pow(distx, 2) + Math.pow(disty, 2)),
					origin:   { x: posx,  y: posy },
					position: { x: nearx, y: neary }
				}));

			}

		} else if (distx < 32 && disty < 32) {

			astronaut.nearest = null;

		}

	};



	/*
	 * IMPLEMENTATION
	 */

	var Class = function(main) {

		lychee.game.State.call(this, main);


		this.__entity = null;


		this.deserialize(_blob);



		/*
		 * INITIALIZATION
		 */

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


		this.__astronauts = [
			new game.entity.Astronaut({
				state: 'floating',
				position: { x: -128, y: -256 }
			}),
			new game.entity.Astronaut({
				state: 'working-right',
				position: { x: -512, y: 0 }
			}),
			new game.entity.Astronaut({
				state: 'floating',
				position: { x: 0, y: 0 }
			}),
			new game.entity.Astronaut({
				state: 'working-left',
				position: { x: 256, y: 256 }
			}),
			new game.entity.Astronaut({
				state: 'working-left',
				position: { x: 512, y: 512 }
			}),
			new game.entity.Astronaut({
				state: 'working-bottom',
				position: { x: -256, y: 128 }
			})
		];


		this.__astronauts.forEach(function(astronaut) {
			this.queryLayer('game', 'ship').addEntity(astronaut);
		}.bind(this));


		this.loop.setInterval(1000, function(clock, delta) {

			this.__astronauts.forEach(function(astronaut) {
				_animate_astronaut.call(this, astronaut);
			}.bind(this));

		}, this);


		this.loop.setInterval(10000, function(clock, delta) {

			this.queryLayer('game', 'ship').addEffect(new lychee.effect.Shake({
				type:     lychee.effect.Shake.TYPE.bounceeaseout,
				duration: 400,
				origin:   { x: 0, y: 0 },
				shake:    { x: Math.random() > 0.5 ? -32 : 32, y: Math.random() > 0.5 ? -32 : 32 }
			}));

		}, this);

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

				var target = this.queryLayer('game', 'ship').getEntity(null, position);
				if (target !== null) {
					this.__entity = target;
					this.__overlay.setEntity(this.__entity);
					this.__overlay.setPosition(target.position);
					this.__overlay.setVisible(true);
				} else {
					this.__overlay.setVisible(false);
				}

			}, this);


			this.client.bind('sensor', function(room, property, value) {
				var room = this.queryLayer('game', 'ship > ' + room);
				room.properties[property] = value;
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

				this.getLayer('background').render(renderer, 0, 0);

				renderer.setAlpha(0.4);

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
