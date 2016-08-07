FlowRouter.route('/',{
    name:'firstPage',
    action:function(){
        FlowRouter.go('/home');
    }
});

FlowRouter.route('/login',{
    name:'login',
    action:function () {
        BlazeLayout.render('MainLayout',{main:'Login'})  ;
    }
});

FlowRouter.route('/home',{
    name:'rushmid',
    action:function(){
        BlazeLayout.render('MainLayout',{main:'Home'});
    }
});

FlowRouter.route('/games',{
    name:'games',
    action:function(){
        BlazeLayout.render('MainLayout',{main:'Games'});
    }
});

FlowRouter.route('/games/:id',{
    name:'game',
    action(){
        if(Meteor.userId()){
            BlazeLayout.render('MainLayout',{main:'Game'});
        }else{
            FlowRouter.go('/');
        }
    }
});

FlowRouter.route('/streams/:id',{
    name:'stream',
    action(){
        BlazeLayout.render('MainLayout',{main:'Stream'});
    }
});



FlowRouter.route('/user/:id',{
    name:'userPage',
    action(){
        BlazeLayout.render('MainLayout',{main:'UserPage'});
    }
});