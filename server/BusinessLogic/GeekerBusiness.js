Meteor.methods({
    geekSubscribe: function(geeker){
    	check(Meteor.userId(), String);
    	GeekSubscriptions.insert({ follower: Meteor.userId(), followed: geeker });
    },
    geekUnsubscribe: function(geeker){
    	check(Meteor.userId(), String);
    	var geekSub = GeekSubscriptions.findOne({follower: Meteor.userId(), followed: geeker});
		GeekSubscriptions.remove(geekSub._id);
    }
});