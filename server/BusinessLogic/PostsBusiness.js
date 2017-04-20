Meteor.methods({
	likePost: function(id){
    	check(Meteor.userId(), String);
		var like = Likes.findOne({geeker: Meteor.userId(), relatedPost: id});
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
			Likes.insert({relatedPost: id, geeker: Meteor.userId(), isLike: true})
		}
	},
	dislikePost: function(id){
    	check(Meteor.userId(), String);
		var dislike = Likes.findOne({geeker: Meteor.userId(), relatedPost: id});
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
			Likes.insert({relatedPost: id, geeker: Meteor.userId(), isLike: false})
		}
	}
})