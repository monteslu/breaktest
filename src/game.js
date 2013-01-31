define([
  './update',
  './draw',
  './jsonObjs',
  'frozen/GameCore',
  'frozen/box2d/Box',
  'frozen/box2d/RectangleEntity',
  'frozen/box2d/CircleEntity',
  'dojo/keys'
], function(update, draw, jsonObjs, GameCore, Box, Rectangle, Circle, keys){



  //setup a GameCore instance
  var game = new GameCore({
    state : {},
    scale: 30,
    canvasId: 'canvas',
    gameAreaId: 'gameArea',
    height: jsonObjs.canvas.height,
    width: jsonObjs.canvas.width,
    canvasPercentage: 0.95,
    update: update,
    draw: draw,
    initInput: function(im){
      im.addKeyAction(keys.LEFT_ARROW);
      im.addKeyAction(keys.RIGHT_ARROW);
    },
    handleInput: function(im){
      if(im.keyActions[keys.LEFT_ARROW].isPressed()){
        this.state.box.applyImpulseDegrees(this.state.bar.id, 270, this.state.speed);
      }

      if(im.keyActions[keys.RIGHT_ARROW].isPressed()){
        this.state.box.applyImpulseDegrees(this.state.bar.id, 90, this.state.speed);
      }
    }
  });

  game.state.box = new Box({intervalRate:60, adaptive:false, gravityY:0, resolveCollisions: true});
  game.state.world = {};
  game.state.speed = 5;

  for (var i = 0; i < jsonObjs.objs.length; i++) {
    var obj = jsonObjs.objs[i];
    var entity;
    if(obj.type === 'Rectangle'){
      entity = new Rectangle(obj);
    }else if(obj.type === 'Circle'){
      entity = new Circle(obj);
    }

    if(entity){
      entity.scaleShape(1 / game.scale);
      game.state.box.addBody(entity); //add the shape to the box
      game.state.world[entity.id] = entity; //keep a reference to the shape for fast lookup

      if(obj.id === 'bar'){
        game.state.bar = entity;
      }else if(obj.id === 'ball'){
        game.state.ball = entity;
      }
      else if(obj.id === 'barlock'){
        game.state.barlock = entity;
      }


    }


  }

  game.state.box.addPrismaticJoint( game.state.bar.id, game.state.world.leftwall.id);

  game.state.box.applyImpulseDegrees(game.state.ball.id, 135, 5);


  //if you want to take a look at the game object in dev tools
  console.log(game);

  //launch the game!
  game.run();

});