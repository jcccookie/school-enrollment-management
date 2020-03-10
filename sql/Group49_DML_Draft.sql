-- Data Manipulation Language

-- Class Page --
-- Query for getting information about the students classes.
SELECT Classes.class_id AS id, (SELECT subject_name FROM Subjects WHERE subject_id = Classes.subject_id) AS sname, (SELECT term_year FROM Terms WHERE term_id = Classes.term_id) AS tyear, (SELECT term_name FROM Terms WHERE term_id = Classes.term_id) AS tname, Classes.class_name AS cname, (SELECT COUNT(class_id) FROM Account_Details WHERE class_id = Classes.class_id) AS enroll, Classes.class_student_max AS max, Classes.class_credit AS credit FROM Classes


-- Search Page --
--Get Subject
SELECT subject_id AS id, subject_name AS name FROM Subjects

--Get Term
SELECT term_id AS id, term_year AS year, term_name AS name, term_max_credit AS max FROM Terms

--Get Class
SELECT Classes.class_id AS id, (SELECT subject_name FROM Subjects WHERE subject_id = Classes.subject_id) AS sname, (SELECT term_year FROM Terms WHERE term_id = Classes.term_id) AS tyear, (SELECT term_name FROM Terms WHERE term_id = Classes.term_id) AS tname, Classes.class_name AS cname, (SELECT COUNT(class_id) FROM Account_Details WHERE class_id = Classes.class_id) AS enroll, Classes.class_student_max AS max, Classes.class_credit AS credit FROM Classes

--Get Class by Subject
SELECT Classes.class_id AS id, (SELECT subject_name FROM Subjects WHERE subject_id = Classes.subject_id) AS sname, (SELECT term_year FROM Terms WHERE term_id = Classes.term_id) AS tyear, (SELECT term_name FROM Terms WHERE term_id = Classes.term_id) AS tname, Classes.class_name AS cname, (SELECT COUNT(class_id) FROM Account_Details WHERE class_id = Classes.class_id) AS enroll, Classes.class_student_max AS max, Classes.class_credit AS credit FROM Classes WHERE Classes.subject_id = ?

--Get Class by Term
SELECT Classes.class_id AS id, (SELECT subject_name FROM Subjects WHERE subject_id = Classes.subject_id) AS sname, (SELECT term_year FROM Terms WHERE term_id = Classes.term_id) AS tyear, (SELECT term_name FROM Terms WHERE term_id = Classes.term_id) AS tname, Classes.class_name AS cname, (SELECT COUNT(class_id) FROM Account_Details WHERE class_id = Classes.class_id) AS enroll, Classes.class_student_max AS max, Classes.class_credit AS credit FROM Classes WHERE Classes.term_id = ?


-- Admin Page -- 

-- View Tables
-- Class List
SELECT Classes.class_id AS id, (SELECT subject_name FROM Subjects WHERE subject_id = Classes.subject_id) AS sname, (SELECT term_year FROM Terms WHERE term_id = Classes.term_id) AS tyear, (SELECT term_name FROM Terms WHERE term_id = Classes.term_id) AS tname, Classes.class_name AS cname, (SELECT COUNT(class_id) FROM Account_Details WHERE class_id = Classes.class_id) AS enroll, Classes.class_student_max AS max, Classes.class_credit AS credit FROM Classes

-- Get Single Class
SELECT class_id AS id, subject_id AS sid, term_id AS tid, class_name AS name, class_student_max AS max, class_credit AS credit FROM Classes WHERE class_id = ?


-- Student List
SELECT student_id AS id, f_name AS fname, m_name AS mname, l_name AS lname, email_address AS email, mobile_number AS mobile FROM Students

-- Get Single Student
SELECT student_id as id, f_name as fname, l_name as lname, m_name as mname, mobile_number as mobile, email_address as email FROM Students WHERE student_id = ?

-- Account List
SELECT Account.account_id AS id, (SELECT student_id FROM Students WHERE student_id = Account.student_id) AS sid, (SELECT l_name FROM Students WHERE student_id = Account.student_id) AS lname, SUM(Classes.class_credit) AS credit, SUM(Classes.class_credit * 500) AS amount FROM Account INNER JOIN Account_Details ON Account_Details.account_id = Account.account_id INNER JOIN Classes ON Account_Details.class_id = Classes.class_id GROUP BY Account.account_id ORDER BY Account.account_id

-- Subject List
SELECT subject_id AS id, subject_name AS name FROM Subjects

-- Term List
SELECT term_id AS id, term_year AS year, term_name AS name, term_max_credit AS max FROM Terms

-- Get student with no account
SELECT student_id AS id, f_name AS fname, l_name AS lname FROM Students WHERE student_id NOT IN (SELECT student_id FROM Account)


--Add Data to Tables
--Add Class
SELECT subject_id subject_name FROM Subjects -- Dropbar
SELECT term_id term_name term_year FROM Terms -- Dropbar
INSERT INTO Classes (subject_id, term_id, class_name, class_student_max, class_credit) VALUES (?,?,?,?,?)

--Add Student
INSERT INTO Students (f_name, m_name, l_name, email_address, mobile_number) VALUES (?,?,?,?,?)

--Add Subject
INSERT INTO Subjects (subject_name) VALUES (?)

--Add Term
INSERT INTO Terms (term_name, term_year, term_max_credit) VALUES (?,?,?)

--Add Account
INSERT INTO Account (student_id) VALUES (?)

--Update Class
UPDATE Students SET f_name=?, m_name=?, l_name=?, mobile_number=?, email_address=? WHERE student_id=?

--Update Student
UPDATE Students SET f_name=?, m_name=?, l_name=?, mobile_number=?, email_address=? WHERE student_id=?

-- Delete Class
DELETE FROM Classes WHERE class_id = ?

-- Delete Student
DELETE FROM Students WHERE student_id = ?

--Delete Account
DELETE FROM Account WHERE account_id = ?

--Delete Subject
DELETE FROM Subjects WHERE subject_id = ?

-- Delete Term
DELETE FROM Terms WHERE term_id = ?