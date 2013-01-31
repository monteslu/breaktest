define([

], function(){

  return function(ctx){
    ctx.fillRect(0, 0, this.width, this.height);
    for(var id in this.state.world){
      this.state.world[id].draw(ctx, this.scale);
    }
  };

});