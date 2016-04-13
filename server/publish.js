Meteor.publish("directory", function () {
    return Meteor.users.find({}, {fields: {emails: 1, profile: 1,friendsList:1,status:1}});
});
Meteor.publish("games",function(){
   return Games.find();
});
Meteor.publish("lobbys",function(){
   return Lobbys.find({users:this.userId});
});
Meteor.publish("notifications",function(){
   return Notifications.find({userId:this.userId});
});