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
    },
    lobby:function () {
        return Lobbys.findOne();
    },
    count:function () {
        x = Lobbys.findOne();
        y = {count:x.users.length,howMany:x.game.howManyInGame};
        return y;
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
        Session.set("showSettings",false);
        if(this.type === 1){
            Meteor.call('seenNotification',this._id);
            FlowRouter.go('/user/'+this.senderId);
        }
        if(this.type === 2){
            Meteor.call('seenNotification',this._id);
            Meteor.call('acceptInvite',this.content._lobby,this._id);
            FlowRouter.go('/games/'+this.content.Game._gameId);

        }
    },'click .lobby-li':function () {
        var l = Lobbys.findOne();
        FlowRouter.go('/games/'+l.gameId);
    }
});