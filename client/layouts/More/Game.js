Template.Game.onCreated(function(){
    var self = this;
    self.autorun(function(){
        self.subscribe('directory');
    });
});

Template.Game.helpers({
    game: function () {
        return FlowRouter.getParam('id');
    }
});