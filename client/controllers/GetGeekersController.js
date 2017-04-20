Template.Geekers.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('users');
	}) 
})

Template.Geekers.helpers({
	geekers: function(){
		var users = Meteor.users.find({_id: {$ne: Meteor.userId()}});
		return users;
	}
})