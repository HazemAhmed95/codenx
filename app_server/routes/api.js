var express    = require('express'),
    router     = express.Router(),  
    mysql      = require('mysql'),
    database   = require('../models/database'),
    bcrypt 		 = require('bcryptjs'),
    Secret     = "LeahYaZmanMsbtnashAbrya2",
    jwt 			 = require('jsonwebtoken');

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


router.route('/cart')

// when user press add to cart
.post(function(req, res) {
  // decrementing quantity of product being added to Cart table
  var editQuantityQuery = 'UPDATE Products SET quantity = quantity - 1 WHERE id = ? and quantity > 0';
  connection.query(editQuantityQuery, [req.body.id], function(err, rows) {
    if(err) {
      throw err;
    } else {
      // adding product data to Cart table
      var insertToCartQuery = 'INSERT INTO Cart (name, price, quantity, imageName, UserId) values(?, ?, ?, ?, ?);'
      connection.query(insertToCartQuery, [req.body.name, req.body.price, req.body.quantity, req.body.imageName, 'hazem'], function(err, rows) {
        if(err) {
          //throw err;
          console.log(err);
        } else {
          res.json({message: 'Successfully added to cart'});
        }
      });
    }
  });
})

// when user press cart
.get(function(req, res) {
  // get the data from cart table using the signedInUserId and send it to frontend
  var selectCartsQuery = "SELECT name, price, quantity, imagenAME, cartId FROM Cart WHERE UserId = ?";
  connection.query(selectCartsQuery, ['hazem'], function(err, rows) {
    if(err) {
      throw err;
    } else {
      res.json(rows);
    }
  });
})

// when the user press the x/clear beside the product in the cart
.delete(function(req, res) {
  var deleteCartQuery = "DELETE FROM Cart WHERE cartId = ?";
  connection.query(deleteCartQuery, [req.body.id], function(err, result) {
    if(err) {
      throw err;
    } else {
      res.json({message: 'Successfully deleted from cart'});
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
					 return res.json({ success: false, message: 'Failed to authenticate token.' });
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
        message: 'No token provided.' 
		  });
	 }

};

module.exports = router;