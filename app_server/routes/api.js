var express    = require('express'),
    router     = express.Router(),  
    mysql      = require('mysql'),
    database   = require('../models/database'),
    bcrypt 		= require('bcryptjs'),
    Secret     = "LeahYaZmanMsbtnashAbrya2",
    jwt 			= require('jsonwebtoken');
var connection = database.connectDatabase();


router.route('/products')

.get(function(req, res) {
   var query = "SELECT * FROM Products";
   connection.query(query, function(err, rows, fields) {
      if(err) {
         console.log(err);
      } else {
         res.json(rows);
      }
   });
});

//////////////////
// USER SIGN UP///
//////////////////
router.post("/signup", function (req, res) {
	    console.log(req.body);
			connection.query("SELECT * FROM Users WHERE userName = ?", [req.body.username], function (err, rows) {
					if (err) return done(err);
					if (rows.length)
						 res.json({success: false, message: 'User Name Already Exists'});
					else {
						var newUserMysql = {
							username: req.body.username,
							password: bcrypt.hashSync(req.body.password, 8),
							email : req.body.email
						};
						var insertQuery = "INSERT INTO Users ( userName, password,email ) values (?,?,?)";
						connection.query(insertQuery, [newUserMysql.username, newUserMysql.password,newUserMysql.email], function (err,rows) {
							if (err) throw err;
								 res.json({  success: true,message: 'Registration Successful You Can Log In now !'});
						})
					}
				});
			})

//////////////////
// USER lOG IN////
//////////////////
router.post('/login', function (req, res) {
	connection.query("SELECT * FROM Users WHERE username = ?", [req.body.username], function (err, rows) {
		if (err) return done(err);
		if (!rows.length)
			 res.json({	message: 'Incorrect User Name'});
		else if (rows.length) {
			// check if password matches
			if (!bcrypt.compareSync(req.body.password, rows[0].password)) {
				res.json({
					message: 'Incorrect Password'
				});
			}
			else {
				// create a token
				var token = jwt.sign(req.body.username, Secret, {})
				res.json({
					  success: true,
					  message: 'Welcome',
					  token: token
				});
			}
		}
	});
});

////////////////////////////////////////
///route middleware to verify a token///
////////////////////////////////////////
function verifyUser(req, res, next) {
	 // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
		 jwt.verify(token,Secret,function(err,decoded){
			  if (err)
					 return res.json({ success: false, message: 'You Are not Logged In.' });
			  else {
					 req.decoded = decoded; 
					 console.log(req.decoded);
					 next();
			  }
		 })
  }
	 else {
		  return res.status(403).send({ 
        success: false, 
        message: 'No token Provided.' 
		  });
	 }

};

module.exports = router;