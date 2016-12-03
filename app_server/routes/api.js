var express    = require('express'),
    router     = express.Router(),  
    mysql      = require('mysql'),
    database   = require('../models/database');

var connection = database.connectDatabase();

router.get('/products', function(req, res) {
   var query = "SELECT * FROM Products";
   connection.query(query, function(err, rows, fields) {
      if(err) {
         console.log(err);
      } else {
         res.json(rows);
      }
   });
});

module.exports = router;