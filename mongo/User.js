var mongoose  = require('mongoose'); // Mongoose
var bcrypt    = require('bcryptjs'); // Used to hash passwords

var userschema = mongoose.Schema({                                
    username:       { type: String,  required: true, unique: true },
    password:       { type: String,  required: true               },
	type	:		{ type: Boolean, required: true				  },
    description:    { type: String                                },
    cost:           { type: Number                                },
    category:       { type: String                                }
});

var User = module.exports = mongoose.model('user', userschema);

module.exports = {

    createUser:         
    function(username,password,type,callback){                        
        bcrypt.hash(password, 10, function(err, hash) {               
            if(err){ 
                return callback("errokr hashing the password",null) 
            }  
            if (username.length < 3){
                return callback("username length is less than three characters",null); 
            }
            if (password.length <3){
                return callback("password length is less than three characters",null); 
            }
            if (username.length > 16){
                return callback("password length is more than sixteen characters",null); 
            }
            if (password.length > 16){
                return callback("password length is more than sixteen characters",null); 
            }

            var newUser = new User({                                     
                username: username,                                         
                password: hash,
				type:	  type,
                description:   "",
                cost:          0,
                category:      ""
            });

            newUser.save(function(err,user,numAffected){              
                if(err){ 
                    return callback("it was not possible to create the user",null); 
                }                          
                else{ 
                    return callback(null,user._Id); 
                }   
            });                                   
        });
    },

    getUserByUsername:
    function(username,callback){                                 
        User.findOne({username: username})
                  .select('-password')
                  .exec(function(err,user){
            if(err){ 
                return callback("error fetching use by username",null)
            }
            else{ 
                return callback(null,user)
            }
        })                                           
    },
    
    comparePassword:    
    function(username,candidatePassword,callback){               
        User.findOne({username: username})                              
           .select('password')                                         
           .exec(function(err,user){                                   
                if(err || !user) { return callback("No user found",false,null); }                
                bcrypt.compare(candidatePassword, user.password,           
                    function(err, isMatch) { 
                        // isMatch = result from the compare (true || false)                                  
                        if(err){ 
                            return callback("Error comparing the password" ,false,null);    
                        }      
                        else if(!isMatch){ 
                            return callback(null,false,null);    
                        }
                        else{ 
                            return callback(null,true,user);     
                        }
                    }
                );
        });
    }, 

    getUserById:        
    function(iduser,callback){                                   
        User.findById(iduser)                                          
            .select('-password')                                       
            .exec(function(err,user){                                  
                if(err){ 
                    return callback("error getting user",null);
                }                   
                else{ 
                    return callback(null,user)
                }                 
            });                                         
    },  

    udpateUserById:
    function(iduser,updateinfo,callback){   
        User.findByIdAndUpdate(iduser,
            {
                type   :     updateinfo.type,
                description: updateinfo.description,
                cost:        updateinfo.cost,      
                category:    updateinfo.category  
            },
            function(err, numberAffected, rawResponse) {
                if(err){ 
                    return callback("error saving user");
                }                   
                else{ 
                    return callback(null)
                }             
            }
        );
    },

    getProviders:
    function(callback){
        User.find({'type': 0})
            .select('-password')
            .exec(function(err,stuff){
                if( err ){ return callback(err,null);   }
                else     { return callback(null,stuff); }
            })
    }
}
