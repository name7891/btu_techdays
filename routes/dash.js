var path          = require('path');
var router        = require('express').Router();               
var passport      = require('passport');                 
var LocalStrategy = require('passport-local').Strategy;  

/////////////////////////////////////////////////////////////
// Serialization/deserialization of user ////////////////////
/////////////////////////////////////////////////////////////

passport.serializeUser(function(user, done) { done(null, user.id); });                                             
passport.deserializeUser(function(id, done) { 
	user.getUserById(id, function(err, user) { 
		done(err, user);
	}); 
});  

passport.use(new LocalStrategy(
    function(username, password, done) {
        user.comparePassword(username, password, function(err, isMatch, user_){   // Compares Passwords
            if(err)     { console.log(err);         }                               // Console  Logs error
            if(isMatch) { return done(null, user_);  }                               // Sucess!  Returns user
            else        { return done(null, false); }                               // Failute! Return false
        });
    }
));

/////////////////////////////////////////////////////////////
///// USER Manaement (POSTS) ////////////////////////////////
/////////////////////////////////////////////////////////////

router.post('/login',    function(req, res, next){
    
    var username  = req.body.username;  
    var password  = req.body.password;

    if ( username.length < 3 || password.length <3 || 
        username.length > 16 || password.length > 16  ){
        return res.status(500).send("Failed login: Invalid username/password!");
    }

    passport.authenticate('local', function(err, user, info) {
        if(err){ 
            console.log(error);
            return res.status(500).send("An error has occured");
        }
        if (!user) { 
            return res.status(500).send("Failed login: no such user!"); 
        }    
        req.logIn(user, function(err) {                                                
            if (err){ 
                return res.status(500).send("Failed login: server error!"); 
            } else { 
                return res.send("Login Sucessfull!");         
            }
        });
    })(req, res, next);
});

router.post('/register', function(req, res, next){
    
    var username  = req.body.username;
    var password  = req.body.password;

    user.getUserByUsername(username, function(err,user_) {
        if (err) return res.status(500).send("Error accessing the database: " + err + "!");

        user.createUser(username,password,function(err, user_){            
            if (err) return res.status(500).send("Error creating user: " + err + "!");
 
            passport.authenticate('local', function(err, user_, info) {
                if (err) return res.status(418).send("Failed to login after account creation!");

                req.logIn(user, function(err) {
                    if (err) return res.send("Failed to login after account creation!");
                    return res.send("login Sucessfull!");
                });
            })(req, res, next);
        });

    });        
});

module.exports = router;