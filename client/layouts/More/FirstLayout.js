Template.FirstLayout.onRendered(function(){

});

Template.FirstLayout.events({
    'click #register-href':function(){
        $("#registerDiv").removeClass("hidden"); // remove from all
        $("#loginDiv").addClass("hidden");
    },
    'click #login-href':function(){
        $("#loginDiv").removeClass("hidden"); // remove from all
        $("#registerDiv").addClass("hidden");
    }
});