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

   function getSingleStudent(res, mysql, context, id, complete){
      var sql = "SELECT student_id as id, f_name as fname, l_name as lname, m_name as mname, mobile_number as mobile, email_address as email FROM Students WHERE student_id = ?";
      var inserts = [id];
      mysql.pool.query(sql, inserts, function(error, results, fields){
          if(error){
              res.write(JSON.stringify(error));
              res.end();
          }
          context.student = results[0];
          complete();
      });
  }

   function getAccounts(res, mysql, context, complete){
      mysql.pool.query("SELECT Account.account_id AS id, (SELECT student_id FROM Students WHERE student_id = Account.student_id) AS sid, (SELECT f_name FROM Students WHERE student_id = Account.student_id) AS fname, (SELECT l_name FROM Students WHERE student_id = Account.student_id) AS lname, SUM(Classes.class_credit) AS credit, SUM(Classes.class_credit * 500) AS amount FROM Account LEFT JOIN Account_Details ON Account_Details.account_id = Account.account_id LEFT JOIN Classes ON Account_Details.class_id = Classes.class_id GROUP BY Account.account_id ORDER BY Account.account_id", function(error, results, fields){
         if(error){
             res.write(JSON.stringify(error));
             res.end();
         }
         context.accounts = results;
         complete();
     });
   }

   function getStudentsWithNoAccount(res, mysql, context, complete){
      mysql.pool.query("SELECT student_id AS id, f_name AS fname, l_name AS lname FROM Students WHERE student_id NOT IN (SELECT student_id FROM Account)", function(error, results, fields){
         if(error){
             res.write(JSON.stringify(error));
             res.end();
         }
         context.noaccount = results;
         complete();
     });
   }

   router.get('/', function(req, res) {
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["deleteData.js"];
      var mysql = req.app.get('mysql');
      getSubject(res, mysql, context, complete);
      getTerm(res, mysql, context, complete);
      getClasses(res, mysql, context, complete);
      getStudents(res, mysql, context, complete);
      getAccounts(res, mysql, context, complete);
      getStudentsWithNoAccount(res, mysql, context, complete);
      function complete(){
         callbackCount++;
         if(callbackCount >= 6){
               res.render('admin', context);
         }
      }
   })

   // Display a student for UPDATE
   router.get('/student/:id', function(req, res) {
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["editstudent.js"];
      var mysql = req.app.get('mysql');
      getSingleStudent(res, mysql, context, req.params.id, complete);
      function complete(){
         callbackCount++;
         if(callbackCount >= 1){
               res.render('edit-student', context);
         }
      }
   })

   router.post('/class', function(req, res){
      console.log(req.body)
      var mysql = req.app.get('mysql');
      var sql = "INSERT INTO Classes (subject_id, term_id, class_name, class_student_max, class_credit) VALUES (?,?,?,?,?)";
      var inserts = [
         req.body.subject, 
         req.body.term, 
         req.body.name, 
         req.body.max, 
         req.body.credit
      ];
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

  router.post('/student', function(req, res){
   console.log(req.body)
   var mysql = req.app.get('mysql');
   var sql = "INSERT INTO Students (f_name, m_name, l_name, email_address, mobile_number) VALUES (?,?,?,?,?)";
   var inserts = [
      req.body.fname, 
      req.body.mname === "" ? null : req.body.mname, 
      req.body.lname, 
      req.body.email, 
      req.body.phone
   ];
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

   router.post('/subject', function(req, res){
      console.log(req.body)
      var mysql = req.app.get('mysql');
      var sql = "INSERT INTO Subjects (subject_name) VALUES (?)";
      var inserts = [
         req.body.name
      ];
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

  router.post('/term', function(req, res){
   console.log(req.body)
   var mysql = req.app.get('mysql');
   var sql = "INSERT INTO Terms (term_name, term_year, term_max_credit) VALUES (?,?,?)";
   var inserts = [
      req.body.name,
      req.body.year,
      req.body.max
   ];
   sql = mysql.pool.query(sql,inserts,function(error, results, fields){
       if(error){
           console.log(JSON.stringify(error))
           res.write(JSON.stringify(error));
           res.end();
       } else {
           res.redirect('/admin');
         }
      });
   });

   router.post('/account', function(req, res){
      console.log(req.body)
      var mysql = req.app.get('mysql');
      var sql = "INSERT INTO Account (student_id) VALUES (?)";
      var inserts = [
         req.body.sid,
      ];
      sql = mysql.pool.query(sql,inserts,function(error, results, fields){
          if(error){
              console.log(JSON.stringify(error))
              res.write(JSON.stringify(error));
              res.end();
          } else {
              res.redirect('/admin');
         }
      });
   });

   router.put('/student/:id', function(req, res){
      var mysql = req.app.get('mysql');
      console.log(req.body)
      console.log(req.params.id)
      var email = `${req.body.fname.toLowerCase()}@oregonstate.edu`;
      var sql = "UPDATE Students SET f_name=?, m_name=?, l_name=?, mobile_number=?, email_address=? WHERE student_id=?";
      var inserts = [req.body.fname, req.body.mname, req.body.lname, req.body.mobile, email, req.params.id];
      sql = mysql.pool.query(sql,inserts,function(error, results, fields){
          if(error){
              console.log(error)
              res.write(JSON.stringify(error));
              res.end();
          }else{
              res.status(200);
              res.end();
          }
      });
  });


   router.delete('/student/:id', function(req, res){
      var mysql = req.app.get('mysql');
      var sql = "DELETE FROM Students WHERE student_id = ?";
      var inserts = [req.params.id];
      sql = mysql.pool.query(sql, inserts, function(error, results, fields){
          if(error){
              console.log(error)
              res.write(JSON.stringify(error));
              res.status(400);
              res.end();
          }else{
              res.status(202).end();
          }
      })
  })

  router.delete('/account/:id', function(req, res){
   var mysql = req.app.get('mysql');
   var sql = "DELETE FROM Account WHERE account_id = ?";
   var inserts = [req.params.id];
   sql = mysql.pool.query(sql, inserts, function(error, results, fields){
       if(error){
           console.log(error)
           res.write(JSON.stringify(error));
           res.status(400);
           res.end();
       }else{
           res.status(202).end();
       }
   })
})

  router.delete('/subject/:id', function(req, res){
   var mysql = req.app.get('mysql');
   var sql = "DELETE FROM Subjects WHERE subject_id = ?";
   var inserts = [req.params.id];
   sql = mysql.pool.query(sql, inserts, function(error, results, fields){
       if(error){
           console.log(error)
           res.write(JSON.stringify(error));
           res.status(400);
           res.end();
       }else{
           res.status(202).end();
         }
      })
   })

router.delete('/term/:id', function(req, res){
   var mysql = req.app.get('mysql');
   var sql = "DELETE FROM Terms WHERE term_id = ?";
   var inserts = [req.params.id];
   sql = mysql.pool.query(sql, inserts, function(error, results, fields){
       if(error){
           console.log(error)
           res.write(JSON.stringify(error));
           res.status(400);
           res.end();
       }else{
           res.status(202).end();
      }
   })
})

   return router
}();