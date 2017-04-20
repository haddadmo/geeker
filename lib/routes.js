if(Meteor.isClient){
  Accounts.onLogin(function(){
    FlowRouter.go('geek-book');
  })

  Accounts.onLogout(function(){
    FlowRouter.go('home');
  })
}

FlowRouter.triggers.enter([function(context, redirect){
	if(!Meteor.userId()){
		FlowRouter.go('home');
	}
}])


FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render('HomeLayout')
	}
})

FlowRouter.route('/geek-book', {
	name: 'geek-book',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Posts'})
	}
})

FlowRouter.route('/geeker/:id', {
	name: 'geeker',
	action() {
		BlazeLayout.render('MainLayout', {main: 'GeekerPosts'})
	}
})

