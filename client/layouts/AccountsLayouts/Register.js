Template.Register.events({
    'submit form':function(event,template){
        event.preventDefault();
        var emailVar = template.find('#register-email').value;
        var passwordVar = template.find('#register-password').value;
        var userNameVar = template.find('#register-userName').value;
        var fName = template.find('#register-fName').value;
        var lName = template.find('#register-lName').value;
        Accounts.createUser({
            email:emailVar,
            password:passwordVar,
            profile:{
                userName:userNameVar,
                fName:fName,
                lName:lName,
                imgLoc:"http://simpleicon.com/wp-content/uploads/user1.png"
            }
        });
    }
});