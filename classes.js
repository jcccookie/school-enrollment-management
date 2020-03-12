module.exports = function(){

	var express = require('express');
	var router = express.Router();

// Function for retreiving the classes for each student.
// Students will input their student ID number to get their classes.


	function getStudentClasses(req, res, mysql, context, complete){

        var id = mysql.pool.escape(req.params.student_ID);

        console.log(id);
        
        var query = "SELECT Classes.class_id AS id, Account_Details.account_id as aid, (SELECT subject_name FROM Subjects WHERE subject_id = Classes.subject_id) AS sname, (SELECT term_year FROM Terms WHERE term_id = Classes.term_id) AS tyear, (SELECT term_name FROM Terms WHERE term_id = Classes.term_id) AS tname, Classes.class_name AS cname, (SELECT COUNT(class_id) FROM Account_Details WHERE class_id = Classes.class_id) AS enroll, Classes.class_student_max AS max, Classes.class_credit AS credit FROM Classes INNER JOIN Account_Details ON Classes.class_id = Account_Details.class_id WHERE Account_Details.account_id = (SELECT account_id FROM Account WHERE Account.student_id=" + id + ")";
        // console.log(query);
        mysql.pool.query(query, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.classes = results;
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

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchByID.js"];
        var mysql = req.app.get('mysql');
        getClasses(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('classes', context);
            }
        }
    });

    router.get('/search/:student_ID', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchByID.js", "deletedata.js"];
        var mysql = req.app.get('mysql');
        getStudentClasses(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                context.sid = req.params.student_ID;
                console.log(context);
                res.render('delete-class', context);
            }
        }
    });

    router.delete('/search/cid/:cid/aid/:aid', function(req, res){
        var cid = req.params.cid;
        var aid = req.params.aid;
        console.log(cid);
        console.log(aid);
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Account_Details WHERE class_id=? AND account_id=?";
        var inserts = [cid, aid];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end(); 
            }else{
                res.status(202).end();
            }
        })
    })



  // router.delete('/delete/account_id/:account_id/class_id/:class_id', function(req, res){
  //  var mysql = req.app.get('mysql');
  //  var sql = "DELETE FROM Account_Details WHERE account_id = ? AND class_id = ?";
  //  var inserts = [req.params.id];
  //  sql = mysql.pool.query(sql, inserts, function(error, results, fields){
  //      if(error){
  //          console.log(error)
  //          res.write(JSON.stringify(error));
  //          res.status(400);
  //          res.end();
  //      }else{
  //          res.status(202).end();
  //      }
  //   })
  // })


	return router;

}();