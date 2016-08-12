Template.Lobby2.onCreated(function(){
    var self = this;
    self.autorun(function(){
        self.subscribe("games");
        self.subscribe("lobbys");
        self.lobbys = Lobbys.findOne();
        Session.set("gameType", "none");
        Session.set("showFriendInvite",false);
        Session.set("userSelected",[]);
    });
});

Template.Lobby2.helpers({
    lobby: function () {
        return Lobbys.findOne();
    },
    user: function () {
      return Meteor.user();
    },
    userId: function () {
        return Meteor.userId();
    },
    type: function () {
        return Session.get("gameType");
    },
    theGame:function () {
        var theGame = FlowRouter.getParam('id');
        return Games.findOne({'_gameId':theGame});
    },
    invite:function () {
        return Session.get("showFriendInvite");
    },
    count:function () {
        x = Lobbys.findOne();
        y = {count:x.users.length,howMany:x.game.howManyInGame};
        return y;
    }

});

Template.Lobby2.events({
    'click .gameTypeBack':function (event,template) {
        Session.set("gameType","none");
    },

    'click .btn-each-type':function (event, template) {
        Session.set("gameType",this);
    },
    'click .createALobby': function(){
        var theGame = FlowRouter.getParam('id');
        var type = Session.get("gameType");
        Meteor.call('createLobby',type,theGame);
    },
    'click .lobbyExit':function () {
        var lob = Lobbys.findOne();
        if(lob.users.length <= 1){
            Meteor.call('deleteLobby',lob._id);
        }else{
            Meteor.call('leaveLobby',lob._id,this.toString());
        }
    },
    'click .leaveLobby':function () {
        var lob = Template.instance().lobbys;
        lobUsers = lob.users;
        if(lobUsers.length<=1){
            Meteor.call('deleteLobby',lob._id);
        }else{
            Meteor.call('leaveLobby',lob._id, Meteor.userId());
        }
    },
    'click .invite-friends-btn':function (event, template) {
        event.preventDefault();
        var lobbyId = Lobbys.findOne();
        var state = lobbyId.showInvites;
        lobbyId = lobbyId._id;
        Meteor.call('changeInviteView',lobbyId,state);
        //Session.set("showFriendInvite",!Session.get("showFriendInvite"));
    },

    'click .inviteButtonDiv':function (event,template) {
        event.preventDefault();
        var l = Lobbys.findOne();
        Meteor.call('changeChecked',l,this);
    },

    'click .sendInvitesButtonDiv':function(event, template){
        event.preventDefault();
        var l = Lobbys.findOne();
        var userSenders = [];
        for(var i = 0; i<l.friends.length; i++){
            if(l.friends[i].checked){
                userSenders.push(l.friends[i]);
            }
        }
        var theGame = FlowRouter.getParam('id');
        var x = Games.findOne({'_gameId':theGame});
        Meteor.call('sendInvites',userSenders, x, l);

    },
    'click .startSearchingAlone':function (event, template) {
        var theGame = FlowRouter.getParam('id');
        Meteor.call('startLookingAlone',theGame);
    },

    'click .startSearchingWithLobby':function (event, template) {
        event.preventDefault();
        Meteor.call('startLookingWithLobby', Template.instance().lobbys);
    },
    
    'click .stopSearching':function (event, template) {
        event.preventDefault();
        Meteor.call('stopLookingForGame',Template.instance().lobbys);
    }
});


UI.registerHelper('getName',function(a){
    var user = Meteor.users.findOne({_id:a});
    return user.profile.userName;
});
UI.registerHelper('getImgLink',function(a){
    var user = Meteor.users.findOne({_id:a});
    return user.profile.imgLoc;
});
UI.registerHelper('getFriendState',function (id) {
    var u = Meteor.users.findOne({_id:id});
    return u.status.online;
});


Template.LobbyChat.helpers({
    lobby: function () {
        return Lobbys.findOne();
    },
    userId: function () {
        return Meteor.userId();
    }
});

Template.LobbyChat.events({
    'submit .chatSendInput':function(event) {

        // Prevent default browser form submit

        event.preventDefault();

        // Get value from form element

        const target = event.target;

        const text = target.text.value;
        var lob = Lobbys.findOne();
        Meteor.call('lobbyMessage',text,lob._id);
        target.text.value = '';
        Tracker.afterFlush(function () {
            var out = document.getElementById("theMessages");
            out.scrollTop = out.scrollHeight;
        });
    }
});

function explode(){
    var out = document.getElementById("theMessages");
    out.scrollTop = out.scrollHeight;
    setTimeout(explode, 4000);
}
setTimeout(explode, 2000);