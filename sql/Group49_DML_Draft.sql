-- Data Manipulation Language

-- Class Schedule Page --


-- Search Page --


-- Account Page --


-- Sign Up Page --


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
--Add Classes
SELECT subject_id subject_name FROM Subjects
