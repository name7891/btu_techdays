$(".switch").click(function(e) {
    e.preventDefault();
    var elements = $(".login-form");
    for( var i = 0; i < elements.length; i++ ){
        if( $(elements[i]).hasClass("hide") ){
            $(elements[i]).removeClass("hide");
        } else { 
            $(elements[i]).addClass("hide");
        }
    }
});

// User management functions
$("#login-user").click(function(e){
    e.preventDefault(); 
    var request = new XMLHttpRequest;

    request.open('POST','/login',true);
    request.setRequestHeader('Content-type', 'application/json');

    request.send(JSON.stringify({
        username: document.getElementById('login-username').value,
        password: document.getElementById('login-password').value,
    }));

    request.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){ location.reload() }
            else                  { console.log(request.responseText)}
        }
    }
});

$("#register-user").click(function(e) {
    e.preventDefault();
  
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
        }
    }
});
