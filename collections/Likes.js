import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Likes = new Mongo.Collection('likes');

Likes.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update: function(userId, doc){
		return !!userId;
	},
	remove: function(userId, doc){
		return !!userId;
	}
})

LikeSchema = new SimpleSchema({
	isLike: {
		type: Boolean
	},
	relatedPost: {
		type: String
	},
	geeker: {
		type: String
	}
})

Likes.attachSchema(LikeSchema);

