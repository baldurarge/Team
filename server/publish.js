Meteor.publish("directory", function () {
    return Meteor.users.find({}, {fields: {profile: 1,'status.online':1,'createdAt':1}});
});
Meteor.publish("you",function(){
    return Meteor.users.find({_id:this.userId},{fields:{emails:1,friendsList:1,profile:1,status:1}});
});
Meteor.publish("games",function(){
   return Games.find();
});
Meteor.publish("lobbys",function(){
   return Lobbys.find({users:this.userId});
});

Meteor.publish("notifications",function(){
   return Notifications.find({reciverId:this.userId});
});