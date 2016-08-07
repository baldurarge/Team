Template.Lobby2.onCreated(function(){
    var self = this;
    self.autorun(function(){
        Session.set("showSettings",false);
    });
});



Template.TopBarX.helpers({
    user:function () {
        return Meteor.users.findOne({_id:Meteor.userId()});
    },
    showSettings:function () {
        return Session.get("showSettings");
    },notifications:function () {
        return Notifications.find().fetch();
    },howManyNotifications:function () {
        var x = Notifications.find().fetch();
        var s = 0;
        if(x.length > 0){

            for (var i = 0, len = x.length; i < len; i++) {
                if(x[i].state == 0){
                    s = s+1;
                }
            }
        }
        return s;
    }
});

Template.TopBarX.events({
    'click .showSettings':function (event,template) {
        Session.set("showSettings",!Session.get("showSettings"));
    },'click .login-button':function (event) {
        event.preventDefault();
        FlowRouter.go('/login');
    },'click .eachNot':function (event, template) {
        event.preventDefault();
        Meteor.call('seenNotification',this._id);
        if(this.type == 1){
            Session.set("showSettings",false);
            FlowRouter.go('/user/'+this.senderId);
        }
        console.log(this);
    }
});