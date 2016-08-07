Games = new Mongo.Collection('games');
Lobbys = new Mongo.Collection('lobbys');

Meteor.methods({
    createLobby:function(type){
        if(Lobbys.find({users:this.userId}).count()>0){
            Lobbys.update({users:this.userId},{$set:{lobbyLeader:this.userId,game:type,users:[this.userId],createdAt:new Date(),updatedAt:new Date()}});
            //console.log("update");
        }else{
            Lobbys.insert({_id:Random.id(),lobbyLeader:this.userId,game:type,users:[this.userId],createdAt:new Date(),updatedAt:new Date()});
        }
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
        Lobbys.update({_id:lobbyId},{$set:{lobbyLeader:newId,updatedAt:new Date()}});
    },

    sendInvites:function(usersArray, gameId){
        var theGame = Games.findOne({_gameId:gameId});
        theGame = theGame.name;
        var user = Meteor.users.findOne({_id:this.userId});
        var lobby = Lobbys.findOne({users:this.userId});
        var game = Games.findOne({_id:lobby.gameId.toString()});
        var message = user.profile.userName+" sent you a game invite in "+game.name;
        for(var i = 0;i<usersArray.length;i++){
            Notifications.insert({_id:Random.id(),senderId:this.userId,reciverId:usersArray[i],type:2,content:{_lobbyId:lobby._id,theGame:theGame},createdAt:new Date(),updatedAt:new Date()});
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