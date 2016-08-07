BlazeLayout.setRoot('body');

Template.MainLayout.onCreated(function () {
    var self = this;
    self.autorun(function(){
        self.subscribe("games");
        self.subscribe("directory");
        self.subscribe("you");
        self.subscribe("lobbys");
        self.subscribe("notifications");
    });
});

Template.MainLayout.helpers({
    userNames: function(){
        return Meteor.users.find().fetch().map(function(user){
            return user.profile.userName;
        });
    }
});

Template.MainLayout.events({
    
});