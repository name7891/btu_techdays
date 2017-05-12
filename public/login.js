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
$("#login-user").click(function(e) {
    e.preventDefault();
    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;

    var request = new XMLHttpRequest;

    request.open('POST', '/login', true);
    request.setRequestHeader('Content-type', 'application/json');

    request.send(JSON.stringify({
		username:      username,
		password:      password,
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
        }
    }
});
