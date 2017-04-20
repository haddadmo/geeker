import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Posts = new Mongo.Collection('posts');

Posts.allow({
	insert: function(userId, doc){
		return !!userId;
	}
})

PostSchema = new SimpleSchema({
	content: {
		type: String,
		label: 'Info',
		autoform: {
			rows: 6
		}
	},
	source: {
		type: String,
		label: 'Info Source',
		optional: true
	},
	geeker: {
		type: String,
		label: 'Geeker',
		autoValue: function(){
			return this.userId;
		},
		autoform: {
			type: 'hidden'
		}
	},
	createdAt: {
		type: Date,
		label: 'Created At',
		autoValue: function(){
			return new Date();
		},
		autoform: {
			type: 'hidden'
		}
	},
	updatedAt: {
		type: Date,
		label: 'Updated At',
		autoValue: function(){
			return new Date();
		},
		autoform: {
			type: 'hidden'
		}
	},
	deletedAt: {
		type: Date,
		label: 'Deleted At',
		autoform: {
			type: 'hidden'
		},
		optional: true
	}
})

Posts.attachSchema(PostSchema);