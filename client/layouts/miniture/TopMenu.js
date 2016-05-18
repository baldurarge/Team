Template.TopMenu.onCreated(function(){
    var self = this;
    friendListOpen = true;
    searchOpen = false;
    self.autorun(function(){
        self.subscribe("notifications");
    });
});


Template.TopMenu.helpers({
        notifications:()=>{
        return Notifications.find({});
    }
});

Template.TopMenu.events({
    'click .acceptGameInvite':function(){
        //console.log(this.senderId);
        Meteor.call('acceptInvite',this._lobbyId);
    },
    'click .deleteNotification':function () {
      Meteor.call('deleteNotification',this._id);
    },
    'click .profile-button':function () {
      FlowRouter.go('/user/'+Meteor.userId());
    },
    'click .friends-button':function(){
        if(friendListOpen){
            //$('.testFriendsList').addClass("hidden");
            $('.testFriendsList').hide(200);
            friendListOpen = false;
        }else{
            //$('.testFriendsList').removeClass("hidden");
            $('.testFriendsList').show(200);
            friendListOpen = true;
        }
    },
    'click .logout':function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

UI.registerHelper('equals',function(a,b){
    return a === b;
});

UI.registerHelper('textToShow',function(a){
    if(a == 1){
        return "Message From:";
    }else if(a == 2){
        return "Game Invite From:";
    }else{
        return "SomeThing";
    }
});

UI.registerHelper('classToShow',function(a){
    if(a == 1){
        return "hidden:";
    }else if(a == 2){
        return "acceptGameInvite";
    }else{
        return "hidden";
    }
});