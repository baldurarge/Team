UI.registerHelper('isItAFriend',function(id){
    var friend = Meteor.users.find({_id:id}).fetch();
    return "ASDASd";
});


Template.UserPage.onCreated(function(){
    var self = this;
    self.autorun(function(){
        self.subscribe('directory');
    });
});

Template.UserPage.helpers({
    user: function () {
        var userName = FlowRouter.getParam('id');
        var x = Meteor.users.find({_id:userName}).fetch();
        return x[0];
    }
});

UI.registerHelper('getEmail',function(user){
    return user.emails[0].address;
});

UI.registerHelper('isEmailVerified',function(user){
    return user.emails[0].verified
});

UI.registerHelper('getParam',function(){
    return FlowRouter.getParam('id');
});

Template.UserPage.events({
    'click .change-info-tab':function(){
        $('.user-info').addClass('hidden');
        $('.user-info-change').removeClass('hidden');
        $('.user-info-tab').removeClass('active');
        $('.change-info-tab').addClass('active');
    },
    'click .user-info-tab':function(){
        $('.user-info').removeClass('hidden');
        $('.user-info-change').addClass('hidden');
        $('.user-info-tab').addClass('active');
        $('.change-info-tab').removeClass('active');
    },
    'click .button-save-changes':function(event, template){
        event.preventDefault();
        var info = {};
        info.userName = template.find('#update-user-name').value;
        info.fName = template.find('#update-first-name').value;
        info.lName = template.find('#update-last-name').value;
        info.imgLoc = template.find('#update-image-link').value;
        info.oldPassword = template.find('#update-old-password').value;
        info.newPassword = template.find('#update-password').value;
        info.newPasswordAgain = template.find('#update-password-again').value;
        info.twitch = template.find('#update-twitch').value;

        $.each(info, function(key, value){
            if (value === "" || value === null){
                delete info[key];
            }
        });
        Meteor.call('updateUser', info);
        
    },
    'click .friendRequestBtn': function(){

        Meteor.call('addFriend',this._id);
        //Meteor.call('insertPrufa',Meteor.user()._id);
    },
    'click .acceptFriendRequest':function(){
        Meteor.call('acceptFriend',this._id);
    },
    'click .declineFriendRequest':function(){
        Meteor.call('declineFriend', this._id);
    }
});

UI.registerHelper('equals',function(a,b){
    return a === b;
});