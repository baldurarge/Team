Template.Lobby2.onCreated(function(){
    var self = this;
    self.autorun(function(){
        self.subscribe("games");
        self.subscribe("lobbys");
        self.subscribe("directory");
        //console.log(Games.findOne());
        self.lobbys = Lobbys.findOne();
        Session.set("gameType", "none");
        Session.set("showFriendInvite",false);
    });
});

Template.Lobby2.helpers({
        lobby: function () {
            return Lobbys.findOne();
        },
        user: function () {
          return Meteor.users.findOne({_id:Meteor.userId()});  
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
        console.log(Session.get("gameType"));

    },
    'click .createALobby': function(){
        var theGame = FlowRouter.getParam('id');
        var type = Session.get("gameType");
        Meteor.call('createLobby',type);
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
    'submit .chatSendInput':function(event) {

        // Prevent default browser form submit

        event.preventDefault();

        // Get value from form element

        const target = event.target;

        const text = target.text.value;
        var lob = Template.instance().lobbys;
        Meteor.call('lobbyMessage',text,lob._id);
        target.text.value = '';
        Tracker.afterFlush(function () {
            var out = document.getElementById("theMessages");
            out.scrollTop = out.scrollHeight;
        });
    },
    'click .invite-friends-btn':function (event, template) {
        event.preventDefault();
        Session.set("showFriendInvite",!Session.get("showFriendInvite"));
    },
    'click .send-invites':function(event, template){
        event.preventDefault();
        var select = template.findAll("input[type=checkbox]:checked");
        var selectArray = _.map(select,function(item){
            return item.defaultValue;
        });
        var theGame = FlowRouter.getParam('id');
        Meteor.call('sendInvites',selectArray,theGame)
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

UI.registerHelper('equals',function(a,b){
    return a === b;
});

UI.registerHelper('getName',function(a){
    var user = Meteor.users.findOne({_id:a});
    return user.profile.userName;
});
UI.registerHelper('getImgLink',function(a){
    var user = Meteor.users.findOne({_id:a});
    return user.profile.imgLoc;
});