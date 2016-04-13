Template.TopMenu.onCreated(function(){
    var self = this;
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
        console.log(this.senderId);
        Meteor.call('acceptInvite',this.senderId);
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