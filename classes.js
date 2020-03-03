module.exports = function(){

	var express = require('express');
	var router = express.Router();

// Function for retreiving the classes for each student.
// Students will input their student ID number to get their classes.


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

	// router.get('/search/:id', function(req, res){
   //      var callbackCount = 0;
   //      var context = {};
   //      context.jsscripts = ["searchByID.js"];
   //      var mysql = req.app.get('mysql');
	// 	getClasses(res, mysql, context, complete);
   //      function complete(){
   //          callbackCount++;
   //          if(callbackCount >= 1){
   //              res.render('classes', context);
   //          }
   //      }
   //  });

	return router;

}();