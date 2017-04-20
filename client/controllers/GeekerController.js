
Template.Geeker.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('posts');
		self.subscribe('users');
		self.subscribe('geekSubscriptions');
	})
});

Template.Geeker.helpers({
	notSubscribed: function(){
		if(this.subscribeList){
			var geekSub = GeekSubscriptions.find({follower: Meteor.userId(), followed: this.geeker}).fetch();
			if(geekSub.length == 0){
				return true;
			}
			return false;
		}
		return false;
	},
	subscribed: function(){
		if(this.subscribeList){
			var geekSub = GeekSubscriptions.find({follower: Meteor.userId(), followed: this.geeker}).fetch();
			if(geekSub.length == 0){
				return false;
			}
			return true;
		}
		return false;
	},
	geeker: function(){

		var geeker = Meteor.users.findOne(this.geeker);

		if(geeker.emails && geeker.emails.length > 0){
			geeker.email = geeker.emails[0].address;
		}else if(geeker.services != undefined && geeker.services.facebook != undefined){
			geeker.email = geeker.services.facebook.email;
		}
		geeker.firstLetter = geeker.email[0];

		var hex, i;

	    var result = "";
	    for (i=0; i<3; i++) {
	        hex = geeker.email.charCodeAt(i).toString(16);
	        result += ("000"+hex).slice(-2);
	    }

		geeker.background = '#' + result;
		return geeker;
	},
	geekerLikesPercentage: function(){
		var geekerPostsIds = Posts.find({geeker: this.geeker}).fetch().map(function(post) { 
	        return post._id;
	    });

 		var likes = Likes.find({ relatedPost: { $in: geekerPostsIds }, isLike: true }).count();
 		var disLikes = Likes.find({ relatedPost: { $in: geekerPostsIds }, isLike: false }).count();

 		var totalReaction = likes + disLikes;
 		var likesPercentage = parseInt((likes / totalReaction) * 10000)/100;
 		return likesPercentage;

	},
	geekerDislikesPercentage: function(){
		var geekerPostsIds = Posts.find({geeker: this.geeker}).fetch().map(function(post) { 
	        return post._id;
	    });

 		var likes = Likes.find({ relatedPost: { $in: geekerPostsIds }, isLike: true }).count();
 		var disLikes = Likes.find({ relatedPost: { $in: geekerPostsIds }, isLike: false }).count();

 		var totalReaction = likes + disLikes;
 		var dislikesPercentage = parseInt((disLikes / totalReaction) * 10000)/100;
 		return dislikesPercentage;
	},
	geekerHaveReactions: function(){
		var geekerPostsIds = Posts.find({geeker: this.geeker}).fetch().map(function(post) { 
	        return post._id;
	    });

 		var likes = Likes.find({ relatedPost: { $in: geekerPostsIds } }).count();
 		if(likes > 0)
 			return true;
 		return false;
	}
});

Template.Geeker.events({
	'click .subscribe': function(){
		Meteor.call('geekSubscribe',this.geeker);
	},
	'click .unsubscribe': function(){
		Meteor.call('geekUnsubscribe', this.geeker);
	}
})