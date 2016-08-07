Template.Login.onCreated(function(){
    var self = this;
    self.autorun(function(){
        Session.set("signUp",false);
    });
});

Template.Login.helpers({
   signUp:function () {
       return Session.get("signUp");
   } 
});


Template.Login.events({
    'submit .form-login':function(event,template){
        event.preventDefault();
        var emailVar = template.find('#login-email').value;
        var passwordVar = template.find('#login-password').value;

            Meteor.loginWithPassword(emailVar,passwordVar, function (err) {
                if(err){
                    if(err.error == 400){
                        Meteor.call('custumAlert','error','Something wrong, try again','top-right','5000',true,"150px", false);
                    }else if(err.error == 403){
                        Meteor.call('custumAlert','error',err.reason,'top-right','5000',true,"150px", false);
                    }
                }else{
                    Meteor.call('custumAlert','success','Welcome','top','3000',true,"50px", false);
                    FlowRouter.go('/home');
                }
            });
    },


    'submit .form-signUp':function(event,template){
        event.preventDefault();
        var emailVar = template.find('#signUp-email').value;
        var passwordVar = template.find('#signUp-password').value;
        var passwordVar2 = template.find('#signUp-password-again').value;
        var userNameVar = template.find('#signUp-userName').value;
        var fName = template.find('#signUp-fName').value;
        var lName = template.find('#signUp-lName').value;
        
        var data = {email:emailVar.trim(),password1:passwordVar.trim(),password2:passwordVar2.trim(),userName:userNameVar.trim(),fName:fName.trim(),lName:lName.trim()};

        Meteor.call('createUserMethod', data, function(error, result) {
            if(result.email === true){
                if(result.password === true){
                    if(result.userName === true){
                        
                        
                        Accounts.createUser({
                            email:data.email,
                            password:data.password1,
                            profile:{
                                userName:data.userName.toLowerCase(),
                                fName:data.fName,
                                lName:data.lName,
                                imgLoc:"avatar1.png"
                            },
                            friendsList:[]
                        });

                        Meteor.call('custumAlert','success','Welcome','top','3000',true,"50px", false);

                        FlowRouter.go('/home');
                        
                        
                    }else{
                        Meteor.call('custumAlert','error',result.userNameMessage,'top-right','8000',true,"150px", false);
                    }
                }else{
                    Meteor.call('custumAlert','error',result.passwordMessage,'top-right','8000',true,"150px", false);
                }
            }else{
                Meteor.call('custumAlert','error',result.emailMessage,'top-right','8000',true,"150px", false);
            }

        });
        
    },


    'click .btn-signUp-open':function (event,template) {
        event.preventDefault();
        Session.set('signUp',true);
    },'click .btn-signUp-close':function (event,template) {
        event.preventDefault();
        Session.set('signUp',false);
    },'click #signUp-email':function (e,event,template) {

    }
});