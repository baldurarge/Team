Template.Lobby2.onCreated(function(){
    Meteor.subscribe("lobbys");
    Meteor.subscribe("directory");
    Meteor.subscribe("games")
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
        Meteor.call('createLobby',theGame);
    },'click .leaveLobby':function () {
        var lob = Lobbys.findOne({users:Meteor.userId()});
        lobUsers = lob.users;
        if(lobUsers.length<=1){
            Meteor.call('deleteLobby',lob._id);
        }else{
            Meteor.call('leaveLobby',lob._id, Meteor.userId());
        }
    },
    'click .send-invites':function(event, template){
        event.preventDefault();
        var select = template.findAll("input[type=checkbox]:checked");
        var selectArray = _.map(select,function(item){
            return item.defaultValue;
        });
        Meteor.call('sendInvites',selectArray)
    }
});





UI.registerHelper('getName',function(a){
    var user = Meteor.users.find({_id:a}).fetch();
    return user[0].profile.userName;
});
UI.registerHelper('getImgLink',function(a){
    var user = Meteor.users.find({_id:a}).fetch();
    return user[0].profile.imgLoc;
});