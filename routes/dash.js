var path          = require('path');
var router        = require('express').Router();     
var User          = require('../mongo/User');           
var passport      = require('passport');                 
var LocalStrategy = require('passport-local').Strategy;  

/////////////////////////////////////////////////////////////
// Serialization/deserialization of user ////////////////////
/////////////////////////////////////////////////////////////

passport.serializeUser(function(user, done) { done(null, user.id); });                                             
passport.deserializeUser(function(id, done) { User.getUserById(id, function(err, user) { done(err, user); }); });  

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.comparePassword(username, password, function(err, isMatch, user){   // Compares Passwords
            if(err)     { console.log(err);         }                               // Console  Logs error
            if(isMatch) { return done(null, user);  }                               // Sucess!  Returns user
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

    if (username.length < 3 || password.length < 3 || username.length > 16 || password.length > 16)
    {
        return res.status(500).send("Failed login: Invalid username/password!");
    }

    passport.authenticate('local', function(err, user, info) {
        if (err)   { console.log(error); }                                             // logs error if error
        if (!user) { return res.status(500).send("Failed login: no such user!"); }     // Returns failure message if failed login
        req.logIn(user, function(err) {                                                // Attempts to log in User
            if (err){ return res.status(500).send("Failed login: server error!"); }       // If error sends error messsage
            else    { 
				return res.send("Login Sucessfull!");         }                     // Send sucess message  
        });
    })(req, res, next);
});

router.post('/register', function(req, res, next){
    
    var username  = req.body.username;
    var password  = req.body.password;
	var type	  = req.body.type;
    User.getUserByUsername(username, function(err,user) {
        if (err) return res.status(500).send("Error accessing the database: " + err + "!");

        User.createUser(username,password,type,function(err, user){            
            if (err) return res.status(500).send("Error creating user: " + err + "!");

            passport.authenticate('local', function(err, user, info) {
                if (err) return res.status(418).send("Failed to login after account creation!");

                req.logIn(user, function(err) {
                    if (err) return res.send("Failed to login after account creation!");
                    return res.send("login Sucessfull!");
                });
            })(req, res, next);
        });

    });        
});

router.post('/logout',  function(req, res, next){
    req.logout();
    res.redirect('/');
});

router.post('/getOffers', function(req, res, next){
    if( req.user.type == 1 ){
        User.getProviders( function(err,providers){
            console.log(providers)
            res.send( JSON.stringify(providers) );
        });
    } else {
        res.status(500).send("you are not an Organizer!");
    }
});


router.post('/getProviderDash',  function(req, res, next){
    if( req.user.type == 0 ){
        res.send(JSON.stringify({
            description: req.user.description,
            cost:        req.user.cost,
            category:    req.user.category
        }));
    } else {
        res.status(500).send("you are not an provider!");
    }
});

router.post('/saveProviderDash',  function(req, res, next){
    if( req.user.type == 0 ){
        var newstuff = {
            description: req.body.description,
            cost       : req.body.cost,
            category   : req.body.category
        }
        console.log(newstuff)
        User.udpateUserById(req.user.id,newstuff,function(err){
            if(err){ return req.status(500).res(err); }
            else{ return res.send("change Sucessfull!"); }
        })
    } else {
        res.status(500).send("you are not an provider!");
    }
});

module.exports = router;

