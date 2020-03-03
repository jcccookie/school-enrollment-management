-- Data Manipulation Language

-- Class Schedule Page --
-- Query for getting information about the students classes.
SELECT Terms.term_name, Terms.term_year, Classes.class_name, Subjects.subject_name, Classes.class_credit 
FROM Terms, Classes, Subjects, Account WHERE(:inputStudentID = Account.student_id);

-- Removing the connection between the students account and a class.
DELETE FROM Account_Details WHERE(:inputStudentID = student_id AND Classes.class_id = class_id);

-- Search Page --

-- Query for getting possible classes to add to a students account.
SELECT Terms.term_name, Terms.term_year, Classes.class_name, Subjects.subject_name, Classes.class_student_total, Classes.class_student_max
FROM Terms, Classes, Subjects WHERE (:inputTermName = Terms.term_name AND :inputTermYear = Terms.term_year AND :inputSubjectName = Subjects.subject_name);

-- Add a connection between a student account and a class.
INSERT INTO Account_Details VALUES (Account.account_id, Classes.class_id) FROM Account, Classes 
WHERE (:inputStudentID = Account.student_id);



-- Account Page --
-- Query to show the students account information.
SELECT CONCAT(Students.f_name, " ", Students.l_name), Account.student_id, Students.email_address, Students.mobile_number
FROM Students, Account WHERE(inputStudentID: = Students.student_id); 

-- Edit Page --
UPDATE Students SET email_address = :inputEmail, mobile_number = :inputMobile WHERE student_id = :studentIdFromEditForm

-- Sign Up Page --
INSERT Accounts INTO (student_id) VALUES (SELECT student_id FROM Students WHERE (student_id = :inputID AND email_address = :inputEmail))


-- Admin Page -- 

-- View Tables
-- Class List
SELECT Classes.class_id AS id, (SELECT subject_name FROM Subjects WHERE subject_id = Classes.subject_id) AS sname, (SELECT term_year FROM Terms WHERE term_id = Classes.term_id) AS tyear, (SELECT term_name FROM Terms WHERE term_id = Classes.term_id) AS tname, Classes.class_name AS cname, (SELECT COUNT(class_id) FROM Account_Details WHERE class_id = Classes.class_id) AS enroll, Classes.class_student_max AS max, Classes.class_credit AS credit FROM Classes

-- Student List
SELECT student_id AS id, f_name AS fname, m_name AS mname, l_name AS lname, email_address AS email, mobile_number AS mobile FROM Students

-- Account List
SELECT Account.account_id AS id, (SELECT student_id FROM Students WHERE student_id = Account.student_id) AS sid, (SELECT l_name FROM Students WHERE student_id = Account.student_id) AS lname, SUM(Classes.class_credit) AS credit, SUM(Classes.class_credit * 500) AS amount FROM Account INNER JOIN Account_Details ON Account_Details.account_id = Account.account_id INNER JOIN Classes ON Account_Details.class_id = Classes.class_id GROUP BY Account.account_id ORDER BY Account.account_id

-- Subject List
SELECT subject_id AS id, subject_name AS name FROM Subjects

-- Term List
SELECT term_id AS id, term_year AS year, term_name AS name, term_max_credit AS max FROM Terms


--Add Data to Tables
--Add Class
SELECT subject_id subject_name FROM Subjects -- Dropbar
SELECT term_id term_name term_year FROM Terms -- Dropbar
INSERT INTO Classes (subject_id, term_id, class_name, class_student_total, class_student_max, class_credit) VALUES (:inputSubjectId, :inputTermId, :inputClassName, :inputClassTotal, :inputClassMax, :inputClassCredit)

--Add Student
INSERT INTO Students (f_name, m_name, l_name, email_address, mobile_number) VALUES (:inputFname, :inputMname, :inputLname, :inputEmail, :inputMobile)

--Add Subject
INSERT INTO Subjects (subject_name) VALUES (:inputSubjectName)

--Add Term
INSERT INTO Terms (term_name, term_year, term_max_credit) VALUES (:inputName, :inputYear, :inputMax)


