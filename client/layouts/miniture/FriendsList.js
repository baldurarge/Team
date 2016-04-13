UI.registerHelper('getFriendName',function(id){
    var friend = Meteor.users.find({_id:id}).fetch();
    return friend[0].profile.userName;
});

UI.registerHelper('getFriendStatus',function(id){
    var friend = Meteor.users.find({_id:id}).fetch();
    return friend[0].status.online;
});

UI.registerHelper('idleOrNot',function(id){
    var friend = Meteor.users.find({_id:id}).fetch();
    return friend[0].status.idle;
});