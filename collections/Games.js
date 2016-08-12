Games = new Mongo.Collection('games');
Lobbys = new Mongo.Collection('lobbys');

Meteor.methods({
    createLobby:function(type,gameId){
        var u = Meteor.user();
        if(Lobbys.find({users:this.userId}).count()>0){
            Lobbys.update({users:this.userId},{$set:{lobbyLeader:this.userId,game:type,gameId:gameId,users:[this.userId],showInvites:false,createdAt:new Date(),updatedAt:new Date()}});
            for(var i = 0;i<u.friendsList.length;i++){
                Lobbys.update({users:this.userId},{$push:{friends:{friendId:u.friendsList[i],invite:false,checked:false}}});
            }
        }else{
            Lobbys.insert({_id:Random.id(),lobbyLeader:this.userId,game:type,gameId:gameId,users:[this.userId],showInvites:false,createdAt:new Date(),updatedAt:new Date()});
            for(var i = 0;i<u.friendsList.length;i++){
                Lobbys.update({users:this.userId},{$push:{friends:{friendId:u.friendsList[i],invite:false,checked:false}}});
            }
        }
    },
    changeInviteView:function (lobbyId,state) {
        Lobbys.update({_id:lobbyId},{$set:{showInvites:!state}});
    },
    changeChecked:function (l,t){
        var x = Lobbys.findOne({_id:l.id,'friends.friendId.id':t.friendId.id});
        Lobbys.update({_id:l._id,'friends.friendId.id':t.friendId.id},{$set:{'friends.$.checked':!t.checked}}, {multi: true});
    },

    deleteLobby:function(id){
        Lobbys.remove({_id:id});
    },

    leaveLobby:function(lobbyId,userId){
        Lobbys.update(
            { },
            { $pull: { users: userId }, $set:{updatedAt:new Date()} },
            { multi: true }
        );
        var newId = Lobbys.findOne({_id:lobbyId});
        newId = newId.users[0];
        var u = Meteor.users.findOne({_id:newId});
        console.log(u);
        console.log(newId);
        Lobbys.update({_id:lobbyId},{$set:{lobbyLeader:newId,updatedAt:new Date(),friends:[]}});

        for(var i = 0;i<u.friendsList.length;i++){
            Lobbys.update({users:lobbyId},{$push:{friends:{friendId:u.friendsList[i],invite:false,checked:false}}});
        }
    },

    sendInvites:function(usersArray, game, lobby){
        for(var i = 0;i<usersArray.length;i++){
            Notifications.insert({_id:Random.id(),senderId:this.userId,reciverId:usersArray[i].friendId.id,type:2,content:{_lobby:lobby._id,Game:game},state:0,createdAt:new Date(),updatedAt:new Date()});
        }
    },
    acceptInvite:function(lobbyId,notifId){
        Lobbys.update({_id:lobbyId},{$push:{users:this.userId},$set:{updatedAt:new Date()}});
        Notifications.remove({_id: notifId});
    },

    lobbyMessage:function(text,lobbyId){
        Lobbys.update({_id:lobbyId},{$push:{messages:{senderId:this.userId,message:text}},$set:{updatedAt:new Date()}});
    }
});

//TESTER