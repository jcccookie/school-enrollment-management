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

   function getStudents(res, mysql, context, complete){
      mysql.pool.query("SELECT student_id AS id, f_name AS fname, m_name AS mname, l_name AS lname, email_address AS email, mobile_number AS mobile FROM Students", function(error, results, fields){
         if(error){
             res.write(JSON.stringify(error));
             res.end();
         }
         context.students = results;
         complete();
     });
   }

   function getAccounts(res, mysql, context, complete){
      mysql.pool.query("SELECT Account.account_id AS id, (SELECT student_id FROM Students WHERE student_id = Account.student_id) AS sid, (SELECT l_name FROM Students WHERE student_id = Account.student_id) AS lname, SUM(Classes.class_credit) AS credit, SUM(Classes.class_credit * 500) AS amount FROM Account INNER JOIN Account_Details ON Account_Details.account_id = Account.account_id INNER JOIN Classes ON Account_Details.class_id = Classes.class_id GROUP BY Account.account_id ORDER BY Account.account_id", function(error, results, fields){
         if(error){
             res.write(JSON.stringify(error));
             res.end();
         }
         context.accounts = results;
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
      getClasses(res, mysql, context, complete);
      getStudents(res, mysql, context, complete);
      getAccounts(res, mysql, context, complete);
      function complete(){
         callbackCount++;
         if(callbackCount >= 5){
               res.render('admin', context);
         }
      }
   })

   router.post('/', function(req, res){
      console.log(req.body.subject)
      console.log(req.body.term)
      console.log(req.body)
      var mysql = req.app.get('mysql');
      var sql = "INSERT INTO Classes (subject_id, term_id, class_name, class_student_max, class_credit) VALUES (?,?,?,?,?)";
      var inserts = [req.body.subject, req.body.term, req.body.name, req.body.max, req.body.credit];
      sql = mysql.pool.query(sql,inserts,function(error, results, fields){
          if(error){
              console.log(JSON.stringify(error))
              res.write(JSON.stringify(error));
              res.end();
          }else{
              res.redirect('/admin');
          }
      });
  });

   return router
}();