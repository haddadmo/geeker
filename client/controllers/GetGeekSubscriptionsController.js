// Template.NotFollowedGeekers.onCreated(function(){
// 	var self = this;
// 	self.autorun(function(){
// 		self.subscribe('geekSubscriptions');
// 		self.subscribe('users');
// 	}) 
// })

// Template.NotFollowedGeekers.helpers({
// 	geekers: function(){
// 		var subscriptions = GeekSubscriptions.find({follower: Meteor.userId()}).fetch();

// 		var subGeekersIds = [];
// 		for(var i = 0; i < subscriptions.length; i++){
// 			subGeekersIds.push(subscriptions[i].followed);
// 		}
// 		console.log("subGeekersIds", subGeekersIds)
// 		var geekers = Meteor.users.find({ _id: { $nin: subGeekersIds } })
// 		return geekers;
// 	}
// })