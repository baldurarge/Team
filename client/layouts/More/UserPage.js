Template.UserPage.onCreated(function(){
    var self = this;
    self.autorun(function(){
        self.subscribe('directory');
        Session.set("changeSome", {'fName':false,'lName':false,'userName':false,'twitchName':false,'image':false});
    });
});

Template.UserPage.helpers({

    changeSome:function () {
      return Session.get("changeSome");  
    },
    user: function () {
        var userName = FlowRouter.getParam('id');
        return Meteor.users.findOne({_id:userName});
    },you:function () {
        return Meteor.userId();
    },email: function () {
        var user = Meteor.users.findOne({_id:Meteor.userId()});
        return user.emails[0];
    },joinedDate:function () {
        var months = ['Janúar','Febrúar','Mars','Apríl','Maí','Júní','Júlí','Ágúst','September','Október','Nóvember','Desember'];
        var date = Meteor.users.findOne({_id:FlowRouter.getParam('id')});
        date = date.createdAt;
        var month;
        switch (date.getMonth()) {
            case 0:
                month = months[0];
                break;
            case 1:
                month = months[1];
                break;
            case 2:
                month = months[2];
                break;
            case 3:
                month = months[3];
                break;
            case 4:
                month = months[4];
                break;
            case 5:
                month = months[5];
                break;
            case 6:
                month = months[6];
                break;
            case 7:
                month = months[7];
                break;
            case 8:
                month = months[8];
                break;
            case 9:
                month = months[9];
                break;
            case 10:
                month = months[10];
                break;
            case 11:
                month = months[11];
                break;
        }
        return ""+date.getDate() + ". " + month + " "+ date.getFullYear();

    },

    isItAFriend:function () {
        var id = FlowRouter.getParam('id');
        var s = Meteor.users.findOne({_id:Meteor.userId(),'friendsList.id':id});
        if(s){
            var friendsList = s.friendsList;
            for (var i = 0, len = friendsList.length; i < len; i++) {
                if(friendsList[i].id == id){
                    var returner = friendsList[i].status;
                }
            }
            Session.set("friendStatus",returner);
            return true;
        }else{
            Session.set("friendStatus",99);
            return false;
        }
    },
    friendStatus:function () {
        return Session.get("friendStatus");
    }
});



Template.UserPage.events({
    'keypress input.friendSearchInput': function (evt, template) {
        if (evt.which === 13) {
            evt.preventDefault();
            var bla = (template.find(".friendSearchInput").value).toLowerCase();
            var x = Meteor.users.findOne({'profile.userName':bla});
            if(!x){
                Meteor.call('custumAlert','error','No user with that user name','top-right','5000',true,"200px", false);
            }else{
               FlowRouter.go('/user/'+x._id);
            }
        }
    },
    'click .btn-friendSearch':function (evt, template) {
        var bla = ($('.friendSearchInput').val()).toLowerCase();
        evt.preventDefault();
        var x = Meteor.users.findOne({'profile.userName':bla});
        if(!x){
            Meteor.call('custumAlert','error','No user with that user name','top-right','5000',true,"200px", false);
        }else{
            FlowRouter.go('/user/'+x._id);
        }
    },

    'click .eachFriend':function (event, template) {
        event.preventDefault();
        FlowRouter.go('/user/'+this.id);
    },'click .sendFriendRequest-btn':function () {
        var id = FlowRouter.getParam('id');
        Meteor.call('addFriend', id);
    },'click .acceptFriendButton':function () {
        var id = FlowRouter.getParam('id');
        Meteor.call('acceptFriend',id,"NONE");
    },'click .declineFriendRequest-btn':function () {
        var id= FlowRouter.getParam('id');
        Meteor.call('declineFriend',id);
    },'click .acceptFriendRequest-btn':function () {
        var id = FlowRouter.getParam('id');
        Meteor.call('acceptFriend',id);
    },



    //-------------------------------------avatar
    'click .btn-avatar':function (e, t) {
        AntiModals.overlay('avatarGallery');
    },
    
    //-------------------------------------first name
    'click .btn-fName-change':function () {
        var x = Session.get('changeSome');
        x.fName = true;
        Session.set('changeSome',x);
    },'click .btn-fName-close':function () {
        var x = Session.get('changeSome');
        x.fName = false;
        Session.set('changeSome',x);
    },'keypress input.changeFNameInput': function (evt, template) {
        if (evt.which === 13) {
            var bla = template.find(".changeFNameInput").value;
            Meteor.call('updateUser2', 0, bla);
            var x = Session.get('changeSome');
            x.fName = false;
            Session.set('changeSome',x);
        }
    },'click .btn-fName-save':function (evt, template) {
        var bla = $('.changeFNameInput').val();
        Meteor.call('updateUser2', 0, bla);
        var x = Session.get('changeSome');
        x.fName = false;
        Session.set('changeSome',x);
    },

    
    //-------------------------------------last Name
    'click .btn-lName-change':function () {
        var x = Session.get('changeSome');
        x.lName = true;
        Session.set('changeSome',x);
    },'click .btn-lName-close':function () {
        var x = Session.get('changeSome');
        x.lName = false;
        Session.set('changeSome',x);
    },'keypress input.changeLNameInput': function (evt, template) {
        if (evt.which === 13) {
            var bla = template.find(".changeLNameInput").value;
            Meteor.call('updateUser2', 1, bla);
            var x = Session.get('changeSome');
            x.lName = false;
            Session.set('changeSome',x);
        }
    },'click .btn-lName-save':function (evt, template) {
        var bla = $('.changeLNameInput').val();
        Meteor.call('updateUser2', 1, bla);
        var x = Session.get('changeSome');
        x.lName = false;
        Session.set('changeSome',x);
    },

    //----------------------------------userName
    'click .btn-userName-change':function () {
        var x = Session.get('changeSome');
        x.userName = true;
        Session.set('changeSome',x);
    },'click .btn-userName-close':function () {
        var x = Session.get('changeSome');
        x.userName = false;
        Session.set('changeSome',x);
    },'keypress input.changeUserNameInput': function (evt, template) {
        if (evt.which === 13) {
            var bla = template.find(".changeUserNameInput").value;
            Meteor.call('updateUser2', 2, bla);
            var x = Session.get('changeSome');
            x.userName = false;
            Session.set('changeSome',x);
        }
    },'click .btn-userName-save':function (evt, template) {
        var bla = $('.changeUserNameInput').val();
        Meteor.call('updateUser2', 2, bla);
        var x = Session.get('changeSome');
        x.userName = false;
        Session.set('changeSome',x);
    },

    //----------------------------------TwitchName
    'click .btn-twitchName-change':function () {
        var x = Session.get('changeSome');
        x.twitchName = true;
        Session.set('changeSome',x);
    },'click .btn-twitchName-close':function () {
        var x = Session.get('changeSome');
        x.twitchName = false;
        Session.set('changeSome',x);
    },'keypress input.changeTwitchNameInput': function (evt, template) {
        if (evt.which === 13) {
            var bla = template.find(".changeTwitchNameInput").value;
            Meteor.call('updateUser2', 3, bla);
            var x = Session.get('changeSome');
            x.twitchName = false;
            Session.set('changeSome',x);
        }
    },'click .btn-twitchName-save':function (evt, template) {
        var bla = $('.changeTwitchNameInput').val();
        Meteor.call('updateUser2', 3, bla);
        var x = Session.get('changeSome');
        x.twitchName = false;
        Session.set('changeSome',x);
    },

    'click .btn-logout':function(event){
        event.preventDefault();
        Meteor.logout();
        FlowRouter.go('/home');
    }
});




UI.registerHelper('equals',function(a,b){
    return a === b;
});

UI.registerHelper('getNameFromId',function (id) {
    var x = Meteor.users.findOne({_id:id});
    return x.profile.userName;
});

UI.registerHelper('getImageFromId',function (id) {
    var x = Meteor.users.findOne({_id:id});
    return x.profile.imgLoc;
});

UI.registerHelper('getParam',function(){
    return FlowRouter.getParam('id');
});




Template.avatarGallery.helpers({
    avatars:function () {
        return ['avatar1.png','avatar2.png','avatar3.png','avatar4.png','avatar5.png'];
    }
});


Template.avatarGallery.events({
        'click .avatar':function (event, target, e) {
            event.preventDefault();
            Meteor.call('updateUser2', 4, this.toString());
            AntiModals.dismissAll();
    }
});