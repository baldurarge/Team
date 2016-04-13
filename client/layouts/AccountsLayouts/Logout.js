Template.Logout.events({
    'click .logout':function(event){
        event.preventDefault();
        Meteor.logout();
    }
});