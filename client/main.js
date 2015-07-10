Meteor.subscribe("players");
// counter starts at 0
Session.setDefault('count_change', 0);
Session.setDefault('old_y', 0);

Meteor.startup(function() {
});

//This function returns the canvas.context
gc = function() { //var doesn't work here
	canvas = document.getElementById("canvas")
	return context = canvas.getContext('2d')
}

//This is the main render loop
// It draws a rectangle for each player
render = function() {
	gc().clearRect(0, 0, 400, 400);
	Players.find().fetch().forEach(function(i) {

		if (i.color == undefined) {
			Meteor.call('welcome');
		} else {
			gc().fillStyle = i.color;
		}
		gc().fillRect(i.x, 20, 10, 10);
	})
	requestAnimationFrame(render);
}

Template.canvas.rendered = function() {
	render();
}

Template.canvas.events({
	'click button' : function() {
		// change my color
		Meteor.call('welcome');
	},
	//Move right on right click
	'contextmenu #canvas' : function(event) {
		console.log('right button');
		Meteor.call('move', 5);
		return false;
	},
	//Move left on left click
	'click #canvas' : function(event) {
		if (event.which == 1) {
			console.log('left button');
			Meteor.call('move', -5);
		}
	},
	//Prevent selection of canvas
	'mousedown #canvas' : function(event) {
		event.preventDefault();
	},
	//For now: change color 
	"mousewheel" : function(event) {
		event.preventDefault();
		if (Session.get('old_y') != 0) {
			if (Session.get('old_y') != event.originalEvent.deltaY) {
				Session.set('count_change', Session.get('count_change') + 1);
			}
		}
		Session.set('old_y', event.originalEvent.deltaY);
		($.data(this, 'timer'));
		$.data(this, 'timer', setTimeout(function() {
			if (Session.get('count_change') < 2) {
				console.log("mouse wheel " + Session.get('count_change'))
			}
			if (Session.get('count_change') == 2) {
				console.log("you hit");
				Meteor.call('newcolor', '#123456');
				Meteor.call('action', 1);
			}
			if (Session.get('count_change') == 3) {
				console.log("you kick");
				Meteor.call('newcolor', '#0000ff');
				Meteor.call('action', 1);
			}
			if (Session.get('count_change') == 4) {
				console.log("superb!!!");
				Meteor.call('newcolor', '#ff0000');
				Meteor.call('action', 1);
			}
			if (Session.get('count_change') == 5) {
				console.log("fatality!!");
				Meteor.call('newcolor', '#00ff00');
				Meteor.call('action', 1);
			}
			Session.set('count_change', 0);
		}, 500));
	}
});

//Configure accounts / login
Accounts.ui.config({
	passwordSignupFields : "USERNAME_ONLY"
});