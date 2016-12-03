var mysql = require('mysql');

module.exports = {
   connectDatabase: function() {
      
      var connection = mysql.createConnection({
         host: 'sql7.freemysqlhosting.net', 
         user: 'sql7147491',
         password: 'Q3TAfI8Frc',
         database: 'sql7147491'
      });

      connection.connect(function(err) {
         if(err) {
            console.log(err);
         } else {
            console.log('Connected to database');
         }
      });

      return connection;
   }
};

