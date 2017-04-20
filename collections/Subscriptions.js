import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

GeekSubscriptions = new Mongo.Collection('geekSubscriptions');

GeekSubscriptions.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	remove: function(userId, doc){
		return !!userId;
	}
})

GeekSubscriptionSchema = new SimpleSchema({
	follower: {
		type: String
	},
	followed: {
		type: String
	}
})

GeekSubscriptions.attachSchema(GeekSubscriptionSchema);