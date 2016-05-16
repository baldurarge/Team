Template.Lobby2.onCreated(function(){
    Meteor.subscribe("lobbys");
    Meteor.subscribe("directory");
});

Template.Lobby2.helpers({
        lobby:()=>{
            var lob = Lobbys.find({users:Meteor.userId()}).fetch();
            return lob[0];
        }
});

Template.Lobby2.events({
    'click .createALobby': function(){
        var theGame = FlowRouter.getParam('id');
        alert(theGame);
        //Meteor.call('createLobby',1);
    }
});