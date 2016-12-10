var mysql = require('mysql');

module.exports = {
   connectDatabase: function() {
      
      var connection = mysql.createConnection({
         host: 'sql6.freemysqlhosting.net', 
         user: 'sql6148662',
         password: '8BD2epJKdm',
         database: 'sql6148662'
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

