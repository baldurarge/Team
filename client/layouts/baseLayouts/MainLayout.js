Template.MainLayout.onCreated(function () {
   Meteor.subscribe("directory");
});


Template.MainLayout.onRendered(function(){
    var trigger = $('.hamburger'),
        liTrigger = $('.side-li'),
        overlay = $('.overlay'),
        isClosed = false;

    trigger.click(function () {
        hamburger_cross();
    });

    liTrigger.click(function(){
        $('#wrapper').toggleClass('toggled');
        hamburger_cross();
    });

    function hamburger_cross() {

        if (isClosed == true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }

    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });

    Meteor.typeahead.inject();
    $('.typeahead').bind('typeahead:select', function (ev, suggestion, user) {
        var theuser = Meteor.users.findOne({"profile.userName":suggestion.value});
        window.location.replace("/user/"+theuser._id);
    });
});

Template.MainLayout.helpers({
    userNames: function(){
        return Meteor.users.find().fetch().map(function(user){
            return user.profile.userName;
        });
    }
});

Template.MainLayout.events({
    'typeahead:autocompleted':function(e){
    }
});