$(".switch").click(function(e) {
    e.preventDefault();
    var elements = $(".login-form");
    for ( var i = 0; i < elements.length; i++ ) {
        if ( $(elements[i]).hasClass("hide") ) {
            $(elements[i]).removeClass("hide");
        } else {
            $(elements[i]).addClass("hide");
        }
    }
});

// User management functions
<<<<<<< HEAD
$("#login-user").click(function(e) {
    e.preventDefault();
    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;

=======
$("#login-user").click(function(e){
    e.preventDefault(); 
>>>>>>> 3da9e386e660fe0114583775072dcc76719323f6
    var request = new XMLHttpRequest;

    request.open('POST', '/login', true);
    request.setRequestHeader('Content-type', 'application/json');

    request.send(JSON.stringify({
<<<<<<< HEAD
		username:      username,
		password:      password,
=======
        username: document.getElementById('login-username').value,
        password: document.getElementById('login-password').value,
>>>>>>> 3da9e386e660fe0114583775072dcc76719323f6
    }));

    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                location.reload()
            } else                  {
                console.log(request.responseText)
            }
        }
    }
});

$("#register-user").click(function(e) {
    e.preventDefault();
<<<<<<< HEAD
    var username = document.getElementById('register-username').value;
    var password = document.getElementById('register-password').value;

    var request = new XMLHttpRequest;

    request.open('POST', '/register', true);
    request.setRequestHeader('Content-type', 'application/json');

    request.send(JSON.stringify({
		username:      username,
		password:      password,
    }));
    console.log( JSON.stringify({
		username:      username,
		password:      password,
    }) );
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                location.reload()
            } else                  {
                console.log(request.responseText)
            }
=======
  
    var request = new XMLHttpRequest;
    request.open('POST','/register',true);
    request.setRequestHeader('Content-type', 'application/json');

    request.send(JSON.stringify({
        username: document.getElementById('register-username').value,
        password: document.getElementById('register-password').value,
        type:     $('#register-type input:radio:checked').val()
    }));

    request.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){ location.reload() }
            else                  { console.log(request.responseText)}
>>>>>>> 3da9e386e660fe0114583775072dcc76719323f6
        }
    }
});
