
Template.Geeker.onCreated(function(){
	var self = this;
	self.autorun(function(){
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

		geeker.email = geeker.emails[0].address;
		geeker.firstLetter = geeker.email[0];

		var hex, i;

	    var result = "";
	    for (i=0; i<3; i++) {
	        hex = geeker.email.charCodeAt(i).toString(16);
	        result += ("000"+hex).slice(-2);
	    }

		geeker.background = '#' + result;
		return geeker;
	}
});

Template.Geeker.events({
	'click .subscribe': function(){
		GeekSubscriptions.insert({ follower: Meteor.userId(), followed: this.geeker });
	},
	'click .unsubscribe': function(){
		var geekSub = GeekSubscriptions.findOne({follower: Meteor.userId(), followed: this.geeker});
		GeekSubscriptions.remove(geekSub._id);
	}
})