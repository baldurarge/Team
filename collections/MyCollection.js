Notifications = new Mongo.Collection('notifications');

createNotification = function (senderID,reciverId,type,content) {
    Notifications.insert({_id:Random.id(),senderId:senderID,reciverId:reciverId,type:type,content:content});
};

Meteor.methods({
    deleteNotification:function (id) {
        Notifications.remove({_id:id});
    },
    updateUser:function(info){

        for ( key in info ) {
            var theKey = 'profile.'+key;
            var object = {};
            object[theKey] = info[key];
            Meteor.users.update({'_id':this.userId},{$set:object});
            console.log(object);
        }
    },
    newPassword:function(info){

    },
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
        createNotification(this.userId,friendId,1,"none");
    },
    acceptFriend:function(friendID,notiId){
        //var user = Meteor.users.find({$and:[{_id:friendID},{"friendsList.id":this.userId}]}).fetch();
        Meteor.users.update({'_id':friendID,'friendsList.id':this.userId},{$set:{'friendsList.$.status':'10'}});
        Meteor.users.update({'_id':this.userId,'friendsList.id':friendID},{$set:{'friendsList.$.status':'10'}});
        if(notiId != "NONE") {
            Notifications.remove({_id: notiId});
        }
        return {succes:true};
    },
    declineFriend:function(friendId,notiId){
        Meteor.users.update({'_id':friendID,'friendsList.id':this.userId},{$set:{'friendsList.$.status':''}});
        Meteor.users.update({'_id':this.userId,'friendsList.id':friendID},{$set:{'friendsList.$.status':''}});
        if(notiId != "NONE"){
            Notifications.remove({_id:notiId});
        }
        return {succes:true};
    }
});

//Lobbys.attachSchema(LobbySchema);