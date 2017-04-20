Template.registerHelper('gt', function (a, b) {
  	return a > b;
});

Template.Post.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('likes');
	})
})

Template.Post.events({
	'click .like': function(){
		Meteor.call('likePost', this._id);
	},
	'click .dislike': function(){
		Meteor.call('dislikePost', this._id);
	}
})

Template.Post.helpers({
	isLike: function(){
		var like = Likes.findOne({geeker: Meteor.userId(), relatedPost: this._id, isLike: true});
		if(like){
			return true;
		}
		return false;
	},
	isDislike: function(){
		var disLike = Likes.findOne({geeker: Meteor.userId(), relatedPost: this._id, isLike: false});
		if(disLike){
			return true;
		}
		return false;
	},
	likesNumber: function(){
		var likes = Likes.find({relatedPost: this._id, isLike: true}).count();
		return likes;
	},
	dislikesNumber: function(){
		var dislikes = Likes.find({relatedPost: this._id, isLike: false}).count();
		return dislikes;
	}
})