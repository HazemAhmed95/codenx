var mysql = require('mysql');

module.exports = {
   connectDatabase: function() {
      
      var connection = mysql.createConnection({
         host: 'sql9.freemysqlhosting.net', 
         user: 'sql9148822',
         password: '3gWYXnZf3V',
         database: 'sql9148822'
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

