if(Meteor.isClient){
    Accounts.onLogin(function(){
        FlowRouter.go('home');
    });
    Accounts.onLogout(function(){
        FlowRouter.go('firstPage');
    });
}

FlowRouter.triggers.enter([function(context,redirect){
    if(!Meteor.userId()){
        FlowRouter.go('firstPage');
    }
}]);

FlowRouter.route('/',{
    name:'firstPage',
    action(){
    if(Meteor.userId()){
        FlowRouter.go('/home');
    }else{
        BlazeLayout.render('FirstLayoutBase',{main:'FirstLayout'});
    }
    }
});

FlowRouter.route('/home',{
    name:'home',
    action(){
        BlazeLayout.render('MainLayout',{main:'Home'});
    }
});

FlowRouter.route('/user/:id',{
    name:'userPage',
    action(){
        BlazeLayout.render('MainLayout',{main:'UserPage'});
    }
});