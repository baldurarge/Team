Template.Home.onCreated(function(){
    var self = this;
    self.autorun(function(){
        self.subscribe("games");
    });
});

Template.Home.events({
    'click .each-friend':function(){
        var user = Meteor.users.find({_id:this.id}).fetch();
        FlowRouter.go('/user/'+user[0].profile.userName);
    }
});