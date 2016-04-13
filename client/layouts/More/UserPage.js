UI.registerHelper('isItAFriend',function(id){
    var friend = Meteor.users.find({_id:id}).fetch();
    console.log(currentUser);
    return "ASDASd";
});


Template.UserPage.onCreated(function(){
    var self = this;
    self.autorun(function(){
        self.subscribe('directory');
    });
});

Template.UserPage.helpers({
    user:()=>{
        var userName = FlowRouter.getParam('id');
        return Meteor.users.find({"profile.userName":userName}).fetch();
    }
});

UI.registerHelper('getThisFriendStatus',function(){
    var found = false;
    var friend = Meteor.users.find({$and:[{_id:Meteor.userId()},{'friendsList':{$exists:true}}]});
    if(friend.count() > 0){
        friend = friend.fetch();
        for(var i = 0; i<friend[0].friendsList.length;i++){
            if(friend[0].friendsList[i].id == this._id){
                return friend[0].friendsList[i].status;
            }
        }
    }else{
        return "NOSTATUS";
    }
});

Template.UserPage.events({
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