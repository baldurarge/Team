Notifications = new Mongo.Collection('notifications');

createNotification = function (senderID,reciverId,type,content,state) {
    Notifications.insert({_id:Random.id(),senderId:senderID,reciverId:reciverId,type:type,content:content,state:state,createdAt:new Date(),updatedAt:new Date()});
};

Meteor.methods({
    createUserMethod:function (data) {
        //console.log(data);
        var error = {email:false,password:false,userName:false};
        var em = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if((em.test(data.email))){
            var f = Meteor.users.findOne({'emails.address':data.email});
            if(!f){
                error.email = true;
            }else{
                error.emailMessage = "Email Address already taken";
            }
        }else{
            error.emailMessage = "Enter an valid email address";
        }



        if(!(data.password1.indexOf(' ') >= 0)){
            if(data.password1 === data.password2){
                if(/^[a-zA-Z0-9- ]*$/.test(data.password1)) {
                    if(data.password1.length >= 7){
                        error.password = true;
                    }else{
                        error.passwordMessage="Enter an password with the length of 7 or more";
                    }
                }else{
                    error.passwordMessage ="Enter an password without special characters";
                    }
            }else{
                error.passwordMessage ="Passwords dont match";
            }
        }else{
            error.passwordMessage = "Enter an password without whitespace";
        }


        if(/^\w+$/.test(data.userName)){
            var x = Meteor.users.findOne({'profile.userName':data.userName});
            if(!x){
                error.userName = true;
            }else{
                error.userNameMessage = "Username Taken";
            }
        }else{
            error.userNameMessage = "User name can only contain letters and numbers";
        }
        
        return error;
    },
    deleteNotification:function (id) {
        Notifications.remove({_id:id});
    },
    updateUser2:function (info, theInfo) {
        switch (info) {
            case 0:
                //change fName
                Meteor.users.update({'_id':this.userId},{$set:{'profile.fName':theInfo,updatedAt:new Date()}});
                break;
            case 1:
                //change lName
                Meteor.users.update({'_id':this.userId},{$set:{'profile.lName':theInfo,updatedAt:new Date()}});
                break;
            case 2:
                //change userName
                Meteor.users.update({'_id':this.userId},{$set:{'profile.userName':theInfo,updatedAt:new Date()}});
                break;
            case 3:
                //change twitch
                Meteor.users.update({'_id':this.userId},{$set:{'profile.twitchName':theInfo,updatedAt:new Date()}});
                break;
            case 4:
                Meteor.users.update({'_id':this.userId},{$set:{'profile.imgLoc':theInfo,updatedAt:new Date()}});
                //change avatar
        }
    },
    newPassword:function(info){

    },
    addFriend:function(friendId){
        var f = Meteor.user();
        var t = false;
        if(f){
            if(f.friendsList){
                f = f.friendsList;

                for (var i = 0, len = f.length; i < len; i++) {
                    if (f[i].id == friendId) {
                        t = true;
                    }
                }
            }

        }



        if(t === false){
            Meteor.users.update(friendId,{
                $push:{
                    friendsList:{
                        id:this.userId,
                        status:1,
                        createdAt:(new Date())
                    }
                }}
            );
            Meteor.users.update(this.userId,{
                $push:{
                    friendsList:{
                        id:friendId,
                        status:0,
                        createdAt:(new Date())
                    }}

            });
            createNotification(this.userId,friendId,1,"",0);

        }else{
            Meteor.users.update({'_id':friendId,'friendsList.id':this.userId},{$set:{'friendsList.$.status':1,updatedAt:new Date()}});
            Meteor.users.update({'_id':this.userId,'friendsList.id':friendId},{$set:{'friendsList.$.status':0,updatedAt:new Date()}});
            createNotification(this.userId,friendId,1,"",0);
        }
    },
    acceptFriend:function(friendID){
        //var user = Meteor.users.find({$and:[{_id:friendID},{"friendsList.id":this.userId}]}).fetch();
        Meteor.users.update({'_id':friendID,'friendsList.id':this.userId},{$set:{'friendsList.$.status':10,updatedAt:new Date()}});
        Meteor.users.update({'_id':this.userId,'friendsList.id':friendID},{$set:{'friendsList.$.status':10,updatedAt:new Date()}});
        return {succes:true};
    },
    declineFriend:function(friendId){
        Meteor.users.update({'_id':friendId,'friendsList.id':this.userId},{$set:{'friendsList.$.status':99,updatedAt:new Date()}});
        Meteor.users.update({'_id':this.userId,'friendsList.id':friendId},{$set:{'friendsList.$.status':99,updatedAt:new Date()}});
        return {succes:true};
    },
    custumAlert:function (type, text, position, timeOut, stacked, offset, html) {
        sAlert[type](text, {effect: 'genie', position: position, timeout: timeOut, onRouteClose: false, stack: stacked, offset:offset, html:html});
    },seenNotification:function (id) {
        Notifications.update({_id:id},{$set:{state:1}});
    }
});

//Lobbys.attachSchema(LobbySchema);