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
INSERT INTO Account_Details (Account.account_id, Classes.class_id) FROM Account, Classes 
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
SELECT Classes.class_id Subjects.subject_name AS Subject CONCAT(Terms.term_name, " ", Terms.term_year) AS Term Classes.class_name AS Name Classes.class_student_total AS Enrolled Classes.class_student_max AS Capacity Classes.class_credit AS Credit FROM Classes
INNER JOIN Subjects ON Classes.subject_id = Subjects.subject_id
INNER JOIN Terms ON Classes.term_id = Terms.term_id
ORDER BY Classes.class_id

-- Student List
SELECT student_id f_name m_name l_name email_address mobile_number FROM Students

-- Account List
SELECT Accounts.account_id Students.id Students.l_name Accounts.account_amount_due Accounts.account_total_credit FROM Accounts
INNER JOIN Students ON Accounts.student_id = Students.student_id
ORDER BY Accounts.account_id

-- Subject List
SELECT subject_id subject_name FROM Subjects

-- Term List
SELECT term_id term_name term_year term_max_credit FROM Terms


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


