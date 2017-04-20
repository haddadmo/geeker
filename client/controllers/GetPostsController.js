Template.Posts.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('geekSubscriptions');
		self.subscribe('posts');
	})
})

Template.Posts.helpers({
  	posts: ()=> {
		var subscriptions = GeekSubscriptions.find({follower: Meteor.userId()}).fetch();

		var subGeekersIds = [];
		for(var i = 0; i < subscriptions.length; i++){
			subGeekersIds.push(subscriptions[i].followed);
		}
		subGeekersIds.push(Meteor.userId());
    	return Posts.find({ geeker: { $in: subGeekersIds } }, {sort: {createdAt: -1}});
  	}	
})

Template.GeekerPosts.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('geekSubscriptions');
		self.subscribe('posts');
	})
})

Template.GeekerPosts.helpers({
  	posts: ()=> {
    	var id = FlowRouter.getParam('id');
    	return Posts.find({ geeker: id }, {sort: {createdAt: -1}});
  	},
  	geekerId: function(){
  		return FlowRouter.getParam('id');
  	}	
})