Games = new Mongo.Collection('games');
Lobbys = new Mongo.Collection('lobbys');

Meteor.methods({
    createLobby:function(gameId){
        if(Lobbys.find({'_id':this.userId}).count()>0){
            Lobbys.update({_id:this.userId},{$set:{gameId:gameId,users:[this.userId],createdAt:new Date()}});
            //console.log("update");
        }else{
            Lobbys.insert({_id:this.userId,gameId:gameId,users:[this.userId],createdAt:new Date()});
            //console.log("insert");
        }
    },deleteLobby:function(){
        Lobbys.remove({_id:this.userId});
    },sendInvites:function(usersArray){
        var user = Meteor.users.find({_id:this.userId}).fetch();
        var lobby = Lobbys.find({_id:this.userId}).fetch();
        var game = Games.find({_id:lobby[0].gameId.toString()}).fetch();
        var message = user[0].profile.userName+" sent you a game invite in "+game[0].name;
        for(var i = 0;i<usersArray.length;i++){
            currentId = Notifications.findOne({},{sort:{_id:-1}})._id || 1;
            currentId = (currentId+1).toString();
            Notifications.insert({_id:currentId,senderId:this.userId,status:0,text:"",type:2,userId:usersArray[i]});
        }
    },acceptInvite:function(senderId){
        Lobbys.update({_id:senderId},{$push:{users:this.userId}});
    },lobbyMessage:function(text,lobbyId){
        console.log("The text: "+text);
        console.log("The ID: "+lobbyId);
        Lobbys.update({_id:lobbyId},{$push:{messages:{senderId:this.userId,message:text}}});
    }
});