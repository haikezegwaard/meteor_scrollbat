Players = new Mongo.Collection("players");

if (Meteor.isClient) {
  Meteor.subscribe("players");	
  // counter starts at 0
  Session.setDefault('counter', 0);
  
  Meteor.startup(function(){	 
  });
 
  
  
  //This function returns the canvas.context
  gc = function() { //var doesn't work here
    canvas = document.getElementById("canvas")
    return context = canvas.getContext('2d')
  }
  
  //This is the main render loop
  // It draws a rectangle for each player
  render = function() {
	gc().clearRect(0,0,400,400);
    Players.find().fetch().forEach(function(i){
      
      if(i.color == undefined){
    	  Meteor.call('welcome');
      }else{
    	  gc().fillStyle = i.color;
      }
      gc().fillRect(i.x,20,10,10);
    })
    requestAnimationFrame(render);
  }
  
  Template.canvas.rendered = function(){
	  render();
  }
  
  Template.canvas.events({
    'click button': function () {
    	// change my color
    	Meteor.call('welcome');
    },
    'contextmenu #canvas': function(event){
    	console.log('right button');
    	Meteor.call('move',5);
    	return false;
    },
    'click #canvas': function(event){
    	if(event.which == 1){
    		console.log('left button');
    		Meteor.call('move',-5);
    	}    	
    },
    'mousedown #canvas': function(event){
    	event.preventDefault();
    	console.log('double click');
    },
    "mousewheel" : function (event){
    	event.preventDefault();
    	console.log('mousewheel fired by '+Meteor.userId());
    	Meteor.call('welcome');
	}
  });
  
  Accounts.ui.config({
	  passwordSignupFields: "USERNAME_ONLY"
  });
  
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  
  Meteor.publish("players", function(){
	  return Players.find()
  })
  
  // GAME LOOP
  Meteor.setInterval(function() {/*
    var players = Players.find().fetch()
    if (players.length > 0){
      players.forEach(function(i) {
        var speed = 1
        // Keep the position within the canvas
        //var new_x = (i.x < 0) ? 400 : (i.x + speed*i.xdir)%400
        //var y = 20
        new_x = Math.round((Math.random())*100)
        Players.update({user_id: Meteor.userId()},{x: new_x, user_id: Meteor.userId()},{upsert: true});
      })
    }*/
  }, 10)
}

Meteor.methods({
	newpos: function(new_x){
		Players.update({user_id: Meteor.userId()},{$set: {x: new_x, user_id: Meteor.userId()}},{upsert: true});
	},
	move: function(delta){
		Players.update({user_id: Meteor.userId()},{$inc: {x: delta}});
	},
	welcome: function(){
		Players.update({user_id: Meteor.userId()},{$set: {color: '#'+Math.floor(Math.random()*16777215).toString(16), user_id: Meteor.userId()}},{upsert: true});
	}
})
