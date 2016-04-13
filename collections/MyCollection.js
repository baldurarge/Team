Notifications = new Mongo.Collection('notifications');

Meteor.methods({
    addFriend:function(friendId){
        Meteor.users.update(friendId,{
            $push:{
                friendsList:{
                    id:this.userId,
                    status:1,
                    createdAt:(new Date())
                }
            }
        });
        Meteor.users.update(this.userId,{
            $push:{
                friendsList:{
                    id:friendId,
                    status:0,
                    createdAt:(new Date())
                }
            }
        });
    },
    acceptFriend:function(friendID){
        //var user = Meteor.users.find({$and:[{_id:friendID},{"friendsList.id":this.userId}]}).fetch();
        Meteor.users.update({'_id':friendID,'friendsList.id':this.userId},{$set:{'friendsList.$.status':'10'}});
        Meteor.users.update({'_id':this.userId,'friendsList.id':friendID},{$set:{'friendsList.$.status':'10'}});
        return {succes:true};
    },
    declineFriend:function(friendId){
        Meteor.users.update({'_id':friendID,'friendsList.id':this.userId},{$set:{'friendsList.$.status':''}});
        Meteor.users.update({'_id':this.userId,'friendsList.id':friendID},{$set:{'friendsList.$.status':''}});
        return {succes:true};
    }
});

//Lobbys.attachSchema(LobbySchema);