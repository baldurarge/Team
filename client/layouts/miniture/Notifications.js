Template.Notifications.onCreated(function(){
    var self = this;
    self.autorun(function(){
        self.subscribe("notifications");
    });
    $('.notificationsDiv').hide(100);
});


Template.Notifications.helpers({
    notifications:function(){
        var n = Notifications.find({}).fetch();
        if(n){
            return n;
        }else{
            return [];
        }
    }
});

Template.Notifications.events({
    'click .acceptFriendsRequestBtn':function () {
        Meteor.call('acceptFriend',this.senderId,this._id);
    }
});

UI.registerHelper('getNameFromId',function (id) {
    var name = Meteor.users.findOne({_id:id});
    return name.profile.userName;
});