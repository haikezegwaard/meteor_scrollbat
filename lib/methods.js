Meteor.methods({
	newpos: function(new_x){
		if(!detectCollision(new_x)){
			Players.update({user_id: Meteor.userId()},{$set: {x: new_x, user_id: Meteor.userId()}},{upsert: true});
		}
	},
	move: function(delta){
		player = Players.findOne({user_id: Meteor.userId()})		
		if(!detectCollision(player.x + delta)){
			Players.update({user_id: Meteor.userId()},{$inc: {x: delta}});
		}
	},
	welcome: function(){
		Players.update({user_id: Meteor.userId()},{$set: {life: 100, x: Math.random()*100, color: '#'+Math.floor(Math.random()*16777215).toString(16), user_id: Meteor.userId()}},{upsert: true});
	},
	newcolor: function(new_color){
		Players.update({user_id: Meteor.userId()},{$set: {color: new_color, user_id: Meteor.userId()}},{upsert: true});
	},
	action: function(id){
		//Players.update({user_id: Meteor.userId()},{$set: {color: new_color, user_id: Meteor.userId()}},{upsert: true});
		//check whether opponent is near
		hitHim(id);		
	}
})

function detectCollision(target){
	collide = false;
	Players.find().fetch().forEach(function(player){
		if(player.user_id != Meteor.userId()){ //don't check myself
			//check other player
			if(target +10 >= player.x && target <= player.x + 10){
				collide = true; //collision detected
			} 
			//check boundries
			if(target < 0 || target > 200){
				collide = true;
			}
		}
	});
	return collide;
}

function hitHim(id){
	collide = false;
	me = Players.findOne({user_id: Meteor.userId()});
	
	Players.find().fetch().forEach(function(player){
		if(player.user_id != Meteor.userId()){ //don't check myself
			//check other player
			if( player.x > me.x - 20 && player.x < me.x + 20 ){				
				newlife = player.life - id * 5;
				newcolor = "#FF0000";
				if(newlife < 0){
					Players.remove(player._id);
				}else{
					Players.upsert({user_id: player.user_id},{$set: {life: newlife, color: newcolor}});
				}				
			}
		}
	});
	return collide;
}