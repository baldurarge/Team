Template.Home.onCreated(function(){

});

// HELPERS
Template.Home.helpers({
    user:function () {
        return Meteor.users.findOne({_id:Meteor.userId()});
    }
});

Template.Home.events({
    'click .each-friend':function(){
        var user = Meteor.users.find({_id:this.id}).fetch();
        FlowRouter.go('/user/'+user[0].profile.userName);
    },'click .btn-game':function () {
        FlowRouter.go('/games');
    },'click .btn-stream':function () {
        //FlowRouter.go('/streams');
        Meteor.call('custumAlert','error','Sorry, but the streams section is still under construction... We are still in Alpha','top','5000',true,"50px", false);
    },'click .btn-media':function () {
        //FlowRouter.go('/media');
        Meteor.call('custumAlert','error','Sorry, but the media section is still under construction... We are still in Alpha','top','5000',true,"50px", false);
    }
});