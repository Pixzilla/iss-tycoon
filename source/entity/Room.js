
lychee.define('game.entity.Room').includes([
	'lychee.game.Sprite'
]).exports(function(lychee, global, game, attachments) {

	var _config  = attachments["json"];
	var _texture = attachments["png"];


	var Class = function(data) {

		var settings = lychee.extend({}, data);


		this.air         = 0;
		this.power       = 0;
		this.temp        = 0;

		this.airlocks = [ null, null, null, null ];



		settings.texture = settings.texture || _texture;
		settings.width   = settings.width   || _config.width;
		settings.height  = settings.height  || _config.height;


		lychee.game.Sprite.call(this, settings);

	};


	Class.prototype = {

	};


	return Class;

});

