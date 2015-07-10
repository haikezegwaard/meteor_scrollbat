Meteor.methods({
	newpos: function(new_x){
		Players.update({user_id: Meteor.userId()},{$set: {x: new_x, user_id: Meteor.userId()}},{upsert: true});
	},
	move: function(delta){
		Players.update({user_id: Meteor.userId()},{$inc: {x: delta}});
	},
	welcome: function(){
		Players.update({user_id: Meteor.userId()},{$set: {color: '#'+Math.floor(Math.random()*16777215).toString(16), user_id: Meteor.userId()}},{upsert: true});
	},
	newcolor: function(new_color){
		Players.update({user_id: Meteor.userId()},{$set: {color: new_color, user_id: Meteor.userId()}},{upsert: true});
	},
	action: function(id){
		Players.update({user_id: Meteor.userId()},{$set: {color: new_color, user_id: Meteor.userId()}},{upsert: true});
		//check whether opponent is near
		
		//
	}
})