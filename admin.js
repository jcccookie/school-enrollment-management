module.exports = function(){
   var express = require('express');
   var router = express.Router();

   function getSubject(res, mysql, context, complete){
      mysql.pool.query("SELECT subject_id as id, subject_name as name FROM Subjects", function(error, results, fields){
         if(error){
             res.write(JSON.stringify(error));
             res.end();
         }
         context.subjects = results;
         complete();
     });
   }

   function getTerm(res, mysql, context, complete){
      mysql.pool.query("SELECT term_id as id, term_year as year, term_name as name FROM Terms", function(error, results, fields){
         if(error){
             res.write(JSON.stringify(error));
             res.end();
         }
         context.terms = results;
         complete();
     });
   }

   router.get('/', function(req, res) {
      var callbackCount = 0;
        var context = {};
        context.jsscripts = [];
        var mysql = req.app.get('mysql');
        getSubject(res, mysql, context, complete);
        getTerm(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('admin', context);
            }
        }
   })

   return router
}();