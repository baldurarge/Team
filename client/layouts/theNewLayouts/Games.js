Template.Games.events({
    'click .btn-leageOfLegends':function () {
        FlowRouter.go('/games/lol');
    },'click .btn-csgo':function () {
        //FlowRouter.go('/games/cs');
        Meteor.call('custumAlert','error','Sorry, but the CS GO section is still under construction... We are still in Alpha','top','5000',true,"50px", false);
    },'click .btn-other':function () {
        //FlowRouter.go('/games/other');
        Meteor.call('custumAlert','error','Sorry, but the other section is still under construction... We are still in Alpha','top','5000',true,"50px", false);
    }
});