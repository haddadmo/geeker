Meteor.publish('posts', function(){
	return Posts.find({});
});

Meteor.publish('geekSubscriptions', function(){
	return GeekSubscriptions.find({});
});

Meteor.publish('users', function () {
  var self = this;
  return Meteor.users.find({});
});