Meteor.startup(function() {
	// code to run on server at startup
});

Meteor.publish("players", function() {
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