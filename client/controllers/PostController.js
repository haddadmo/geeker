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
		var like = Likes.findOne({geeker: Meteor.userId(), relatedPost: this._id});
		if(like){
			if(like.isLike){
				Likes.remove(like._id);
			}else{
				Likes.update(like._id, {
					$set: {
						isLike: true
					}
			    });
			}
		}else{
			Likes.insert({relatedPost: this._id, geeker: Meteor.userId(), isLike: true})
		}
	},
	'click .dislike': function(){
		var dislike = Likes.findOne({geeker: Meteor.userId(), relatedPost: this._id});
		if(dislike){
			if(!dislike.isLike){
				Likes.remove(dislike._id);
			}else{
				Likes.update(dislike._id, {
					$set: {
						isLike: false
					}
			    });
			}
		}else{
			Likes.insert({relatedPost: this._id, geeker: Meteor.userId(), isLike: false})
		}
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