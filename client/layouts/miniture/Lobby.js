lobbySchema = {
    createALobby:{
        class:"hidden",
        text:"Create A Lobby"
    }
};

Template.Lobby.onCreated(function(){
    Meteor.subscribe("lobbys");
    Meteor.subscribe("directory");
});

Template.Lobby.helpers({
    lobby:()=>{
        var lob = Lobbys.find({users:Meteor.userId()}).fetch();
        return lob[0];
    }
});

Template.Lobby.events({
    'click .create-a-lobby': function(){
        Meteor.call('createLobby',1);
    },
    'click .delete-lobby':function(){
        Meteor.call('deleteLobby');
    },
    'click .send-invites':function(event, template){
        event.preventDefault();
        var select = template.findAll("input[type=checkbox]:checked");
        var selectArray = _.map(select,function(item){
            return item.defaultValue;
        });
        Meteor.call('sendInvites',selectArray)
    },
    'submit .new-lobby-message'(event){
        event.preventDefault();
        const target = event.target;
        const text = target.text.value;
        var lob = Lobbys.find({users:Meteor.userId()}).fetch();
        Meteor.call('lobbyMessage',text,lob[0]._id);
        target.text.value = '';
    }
});

UI.registerHelper('getName',function(a){
    var user = Meteor.users.find({_id:a}).fetch();
    return user[0].profile.userName;
});

UI.registerHelper('isYou',function(a){
    return(a===Meteor.userId());
});

UI.registerHelper('leader',function(){
    var lob = Lobbys.find({users:Meteor.userId()}).fetch();
    return (lob[0]._id===Meteor.userId());
});