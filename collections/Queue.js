LobbysInQueue = new Mongo.Collection('lobbysInQueue');

Meteor.methods({
    startLookingAlone:function(gameId){
        var theGame = Games.findOne({_gameId:gameId});
        if(Lobbys.find({users:this.userId}).count()>0){
            Lobbys.update({users:this.userId},{$set:{lobbyLeader:this.userId,gameId:theGame._id,users:[this.userId],createdAt:new Date(),updatedAt:new Date(),status:10}});
            //console.log("update");
        }else{
            Lobbys.insert({_id:Random.id(),lobbyLeader:this.userId,gameId:theGame._id,users:[this.userId],createdAt:new Date(),updatedAt:new Date(),status:10});
        }
    },
   startLookingWithLobby:function (lobby) {
       Lobbys.update({_id:lobby._id},{$set:{updatedAt:new Date(),status:10}});
   },
    stopLookingForGame:function (lobby) {
        Lobbys.update({_id:lobby._id},{$set:{updatedAt:new Date(),status:0}});
    }
});