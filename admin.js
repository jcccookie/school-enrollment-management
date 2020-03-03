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

   router.get('/', function(req, res) {
      var callbackCount = 0;
        var context = {};
        context.jsscripts = [];
        var mysql = req.app.get('mysql');
        getSubject(res, mysql, context, complete);
        getTerm(res, mysql, context, complete);
        getClasses(res, mysql, context, complete);
        getStudents(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 4){
                res.render('admin', context);
            }
        }
   })

   return router
}();