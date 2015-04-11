
lychee.define('game.ui.Overlay').requires([
	'game.ui.Bubble'
]).includes([
	'lychee.ui.Layer'
]).exports(function(lychee, game, global, attachments) {

	var _font    = attachments["fnt"];
//	var _texture = attachments["png"];


	var Class = function(data) {

		var settings = lychee.extend({}, data);


		this.__orbit = 128;


		lychee.ui.Layer.call(this, settings);

		settings = null;

	};


	Class.prototype = {

		setEntity: function(entity) {

			entity = lychee.interfaceof(entity, lychee.game.Entity) ? entity : null;


			if (entity !== null) {

				var properties = entity.properties || null;
				if (properties !== null) {

					var entities = [];

					for (var key in properties) {

						entities.push(new game.ui.Bubble({
							key:   key,
							value: properties[key]
						}));

					}


					this.setEntities(entities);

				}


				this.__orbit = Math.max(entity.width / 2, entity.height / 2, entity.radius);

			}

		},

		update: function(clock, delta) {

			lychee.ui.Layer.prototype.update.call(this, clock, delta);




			var entities = this.entities;
			var pi2  = 2 * Math.PI / entities.length;
			var sec  = clock / 2000;
			var dist = this.__orbit + 64;

			for (var e = 0, el = entities.length; e < el; e++) {

				var entity = entities[e];

				entity.setPosition({
					x: Math.sin(sec + e * pi2) * dist,
					y: Math.cos(sec + e * pi2) * dist
				});

			}

		}

	};


	return Class;

});

