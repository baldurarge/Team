Games = new Mongo.Collection('games');
Lobbys = new Mongo.Collection('lobbys');

Meteor.methods({
    createLobby:function(gameId){
        var theGame = Games.findOne({_gameId:gameId});
        if(Lobbys.find({users:this.userId}).count()>0){
            Lobbys.update({users:this.userId},{$set:{lobbyLeader:this.userId,gameId:theGame._id,users:[this.userId],createdAt:new Date()}});
            //console.log("update");
        }else{
            Lobbys.insert({_id:Random.id(),lobbyLeader:this.userId,gameId:theGame._id,users:[this.userId],createdAt:new Date()});
        }
    },

    deleteLobby:function(id){
        Lobbys.remove({_id:id});
    },

    leaveLobby:function(lobbyId,userId){
        Lobbys.update(
            { },
            { $pull: { users: userId } },
            { multi: true }
        );
        var newId = Lobbys.findOne({_id:lobbyId});
        newId = newId.users[0];
        Lobbys.update({_id:lobbyId},{$set:{lobbyLeader:newId}});
    },

    sendInvites:function(usersArray, gameId){
        var theGame = Games.findOne({_gameId:gameId});
        theGame = theGame.name;
        var user = Meteor.users.findOne({_id:this.userId});
        var lobby = Lobbys.findOne({users:this.userId});
        var game = Games.findOne({_id:lobby.gameId.toString()});
        var message = user.profile.userName+" sent you a game invite in "+game.name;
        for(var i = 0;i<usersArray.length;i++){
            Notifications.insert({_id:Random.id(),senderId:this.userId,reciverId:usersArray[i],type:2,content:{_lobbyId:lobby._id,theGame:theGame}});
        }
    },

    acceptInvite:function(lobbyId){
        Lobbys.update({_id:lobbyId},{$push:{users:this.userId}});
    },

    lobbyMessage:function(text,lobbyId){
        console.log("The text: "+text);
        console.log("The ID: "+lobbyId);
        Lobbys.update({_id:lobbyId},{$push:{messages:{senderId:this.userId,message:text}}});
    }
});

//TESTER