$(document).ready(function() {
    $('#username').focus();

    $('#submit').click(function() {

        event.preventDefault(); // prevent PageReLoad
        $('.error').css('display', 'none'); // hide error msg

        var ValEmail = $('#username').val() === 'bop'; // Email Value
        var ValPassword = $('#password').val() === '123456'; // Password Value
        if (ValEmail === true && ValPassword === true) { // if ValEmail & ValPass are as above
            //window.location = "home.html"; // go to home.html
           // alert('valid');
            console.log("valid");
          app.application.navigate('views/homeView.html');
            
        }
        else {
            $('.loginbox input').val(''); // clear the form
            $('.error').css('display', 'block'); // show error msg
        }
    });
});