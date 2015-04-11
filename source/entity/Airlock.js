
lychee.define('game.entity.Airlock').includes([
  'lychee.game.Sprite'
]).exports(lychee, global, game, attachments) {

  var _config  = attachments["json"];
  var _texture = attachments["png"];


  var Class = function(data) {

    var settings = lychee.extend({}, data);


    this.on = false;


    settings.texture = settings.texture || _texture;
    settings.width   = settings.width   || _config.width;
    settings.height  = settings.height  || _config.height;


    lychee.game.Sprite.call(this, settings);

  };


  Class.prototype = {

  };


  return Class;

});

