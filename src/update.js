define([

], function(){

  return function(millis){
      this.state.box.update(millis);//have box2d do an interation
      this.state.box.updateExternalState(this.state.world); //have update local objects with box2d state
  };

});