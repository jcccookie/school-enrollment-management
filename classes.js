module.exports = function(){

	var express = require('express');
	var router = express.Router();

// Function for retreiving the classes for each student.
// Students will input their student ID number to get their classes.


	function getClasses(res, mysql, context, complete){
		mysql.pool.query("SELECT Terms.term_name, Terms.term_year, Classes.class_name, Subjects.subject_name, Classes.class_credit FROM Terms INNER JOIN Classes ON Terms.term_id = Classes.term_id INNER JOIN Subjects on Classes.subject_id = Subjects.subject_id;WHERE(:inputStudentID = Account.student_id)", function(error, results, fields){

		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}	
		context.class = results

		complete();

		});
	}

	return router;

	router.get('/classes/:id', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["getClasses.js"];
        var mysql = req.app.get('mysql');
        getClasses(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('classes', context);
            }
        }
    });




}();