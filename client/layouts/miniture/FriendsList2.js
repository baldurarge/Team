Template.FriendsListTwo.onCreated(function(){
    Meteor.subscribe("directory");
    Meteor.subscribe("you");
});

Template.FriendsListTwo.helpers({
    friendsList: function () {
        var user = Meteor.users.findOne({_id:Meteor.userId()});
        return user && user.friendsList;
    }
});

Template.FriendsListTwo.events({
    'click .each-friend':function(){
        FlowRouter.go('/user/'+this.id);
    }
});


UI.registerHelper('getFriendName',function(id){
    var friend = Meteor.users.findOne({_id:id});
    return friend.profile.userName;
});

UI.registerHelper('getFriendFullName',function(id){
    var friend = Meteor.users.findOne({_id:id});
    return friend.profile.fName+" "+friend.profile.lName;
});

UI.registerHelper('getFriendImg',function(id){
    var friend = Meteor.users.findOne({_id:id});
    if(friend.profile.imgLoc){
        return friend.profile.imgLoc
    }else{
        return "http://simpleicon.com/wp-content/uploads/user1.png"
    }
});

UI.registerHelper('getFriendStatus',function(id){
    var friend = Meteor.users.findOne({_id:id});
    return friend.status.online;
});


UI.registerHelper('equals',function(a,b){
    return a === b;
});
