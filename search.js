module.exports = function(){
   var express = require('express');
   var router = express.Router();

   function getSubject(res, mysql, context, complete){
      mysql.pool.query("SELECT subject_id AS id, subject_name AS name FROM Subjects", function(error, results, fields){
         if(error){
             res.write(JSON.stringify(error));
             res.end();
         }
         context.subjects = results;
         complete();
     });
   }

   function getTerm(res, mysql, context, complete){
      mysql.pool.query("SELECT term_id AS id, term_year AS year, term_name AS name, term_max_credit AS max FROM Terms", function(error, results, fields){
         if(error){
             res.write(JSON.stringify(error));
             res.end();
         }
         context.terms = results;
         complete();
     });
   }

   function getClasses(res, mysql, context, complete){
      mysql.pool.query("SELECT Classes.class_id AS id, (SELECT subject_name FROM Subjects WHERE subject_id = Classes.subject_id) AS sname, (SELECT term_year FROM Terms WHERE term_id = Classes.term_id) AS tyear, (SELECT term_name FROM Terms WHERE term_id = Classes.term_id) AS tname, Classes.class_name AS cname, (SELECT COUNT(class_id) FROM Account_Details WHERE class_id = Classes.class_id) AS enroll, Classes.class_student_max AS max, Classes.class_credit AS credit FROM Classes", function(error, results, fields){
         if(error){
             res.write(JSON.stringify(error));
             res.end();
         }
         context.classes = results;
         complete();
     });
   }

   function getClassesBySubject(req, res, mysql, context, complete){
      var query = "SELECT Classes.class_id AS id, (SELECT subject_name FROM Subjects WHERE subject_id = Classes.subject_id) AS sname, (SELECT term_year FROM Terms WHERE term_id = Classes.term_id) AS tyear, (SELECT term_name FROM Terms WHERE term_id = Classes.term_id) AS tname, Classes.class_name AS cname, (SELECT COUNT(class_id) FROM Account_Details WHERE class_id = Classes.class_id) AS enroll, Classes.class_student_max AS max, Classes.class_credit AS credit FROM Classes WHERE Classes.subject_id = ?"
      var inserts = [req.params.id]
      mysql.pool.query(query, inserts, function(error, results, fields){
         if(error){
             res.write(JSON.stringify(error));
             res.end();
         }
         context.classes = results;
         complete();
     });
   }

   function getClassesByTerm(req, res, mysql, context, complete){
      var query = "SELECT Classes.class_id AS id, (SELECT subject_name FROM Subjects WHERE subject_id = Classes.subject_id) AS sname, (SELECT term_year FROM Terms WHERE term_id = Classes.term_id) AS tyear, (SELECT term_name FROM Terms WHERE term_id = Classes.term_id) AS tname, Classes.class_name AS cname, (SELECT COUNT(class_id) FROM Account_Details WHERE class_id = Classes.class_id) AS enroll, Classes.class_student_max AS max, Classes.class_credit AS credit FROM Classes WHERE Classes.term_id = ?"
      var inserts = [req.params.id]
      mysql.pool.query(query, inserts, function(error, results, fields){
         if(error){
             res.write(JSON.stringify(error));
             res.end();
         }
         context.classes = results;
         complete();
     });
   }

   // Diplay Classes
   router.get('/', function(req, res) {
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["filtersubjects.js", "filterterms.js"];
      var mysql = req.app.get('mysql');
      getClasses(res, mysql, context, complete);
      getSubject(res, mysql, context, complete);
      getTerm(res, mysql, context, complete);
      function complete(){
         callbackCount++;
         if(callbackCount >= 3){
               res.render('search', context);
         }
      }
   })

   // Populate Subject Filter
   router.get('/filtersubject/:id', function(req, res) {
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["filtersubjects.js", "filterterms.js"];
      var mysql = req.app.get('mysql');
      getClassesBySubject(req, res, mysql, context, complete);
      getSubject(res, mysql, context, complete);
      getTerm(res, mysql, context, complete);
      function complete(){
         callbackCount++;
         if(callbackCount >= 3){
               res.render('search', context);
         }
      }
   })

   // Populate Terms Filter
   router.get('/filterterm/:id', function(req, res) {
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["filtersubjects.js", "filterterms.js"];
      var mysql = req.app.get('mysql');
      getClassesByTerm(req, res, mysql, context, complete);
      getSubject(res, mysql, context, complete);
      getTerm(res, mysql, context, complete);
      function complete(){
         callbackCount++;
         if(callbackCount >= 3){
               res.render('search', context);
         }
      }
   })
   
   // Display Class Add  by Email Address Form
   router.get('/class/:id', function(req, res) {
      var context = {};
      context.id = req.params.id;
         res.render('add-class', context);
   })

   router.post('/class/:id', function(req, res){
      var email = (req.body.email + '%').toLowerCase();
      var cid = req.params.id;
      console.log(email);
      console.log(cid);
      var mysql = req.app.get('mysql');
      var inserts = [email, cid];
      var sql = "INSERT INTO Account_Details (account_id, class_id) VALUES ((SELECT account_id FROM Account WHERE student_id = (SELECT student_id FROM Students WHERE email_address LIKE ?)), ?)"
      sql = mysql.pool.query(sql, inserts, function(error, results, fields){
         if(error){
            console.log(JSON.stringify(error))
            res.write(JSON.stringify(error));
            res.end();
         } else {
            res.redirect('/search');
         }
      })
  });

   return router
}();