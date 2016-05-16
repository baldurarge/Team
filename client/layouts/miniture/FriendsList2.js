Template.FriendsListTwo.onCreated(function(){
    var self = this;
    self.autorun(function(){
        self.subscribe('you');
        self.subscribe('directory');
    });
});

Template.FriendsListTwo.helpers({
    friendsList: function () {
        var user = Meteor.users.find({_id:Meteor.userId()}).fetch();
        return user[0].friendsList;
    }
});

Template.FriendsListTwo.events({
    'click .each-friend':function(){
        FlowRouter.go('/user/'+this.id);
    }
});


UI.registerHelper('getFriendName',function(id){
    var friend = Meteor.users.find({_id:id}).fetch();
    return friend[0].profile.userName;
});

UI.registerHelper('getFriendFullName',function(id){
    var friend = Meteor.users.find({_id:id}).fetch();
    return friend[0].profile.fName+" "+friend[0].profile.lName;
});

UI.registerHelper('getFriendImg',function(id){
    var friend = Meteor.users.find({_id:id}).fetch();
    if(friend[0].profile.imgLoc){
        return friend[0].profile.imgLoc
    }else{
        return "http://simpleicon.com/wp-content/uploads/user1.png"
    }
});

UI.registerHelper('getFriendStatus',function(id){
    var friend = Meteor.users.find({_id:id}).fetch();
    return friend[0].status.online;
});


UI.registerHelper('equals',function(a,b){
    return a === b;
});
