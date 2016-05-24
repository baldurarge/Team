Template.TopMenu.onCreated(function(){
    Meteor.subscribe("notifications");
});


Template.TopMenu.helpers({
        notifications:function(){
        var n = Notifications.find({}).fetch();
            if(n){
                return n;
            }else{
                return [];
            }
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
        if($('.testFriendsList').is(":visible")){
            $('.testFriendsList').hide(200);
        }else{
            $('.notificationsDiv').hide(0);
            $('.testFriendsList').show(200);
        }
    },
    'click .notifications-button':function () {
        if($('.notificationsDiv').is(":visible")){
            $('.notificationsDiv').hide(200);
        }else{
            $('.testFriendsList').hide(0);
            $('.notificationsDiv').show(200);
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

UI.registerHelper('classToShow',function(not){
    if(not.length >= 1){
        return "therIsNotification";
    }else{
        return "";
    }
});

UI.registerHelper('howManyNotif',function (noti) {
    var length = noti.length;
   if(noti.length > 0){
        return length.toString();
   }else{
       return "";
   }
});