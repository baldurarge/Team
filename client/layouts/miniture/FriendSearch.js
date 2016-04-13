Template.FriendSearch.onCreated(function(){
    var self = this;
    self.autorun(function(){
       self.subscribe('directory')
    });
});

Template.FriendSearch.helpers({
    userNames: function(){
        return Meteor.users.find().fetch().map(function(user){
            return user.profile.userName;
        });
    }
});

Template.FriendSearch.events({
    'typeahead:autocompleted':function(e){
    }
});

Template.FriendSearch.onRendered(function(){
    // initializes all typeahead instances
    Meteor.typeahead.inject();
    $('.typeahead').bind('typeahead:select', function (ev, suggestion, user) {
        window.location.replace("/user/"+suggestion.value);
    });
});