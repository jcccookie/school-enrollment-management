-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Mar 19, 2020 at 06:57 PM
-- Server version: 10.4.11-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_kimkyeon`
--
CREATE DATABASE IF NOT EXISTS `*****` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `*****`;

-- --------------------------------------------------------

--
-- Table structure for table `Account`
--

CREATE TABLE `Account` (
  `account_id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Account`
--

INSERT INTO `Account` (`account_id`, `student_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(5, 4),
(4, 5),
(18, 18);

-- --------------------------------------------------------

--
-- Table structure for table `Account_Details`
--

CREATE TABLE `Account_Details` (
  `account_id` int(11) NOT NULL DEFAULT 0,
  `class_id` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `Account_Details`
--

INSERT INTO `Account_Details` (`account_id`, `class_id`) VALUES
(1, 3),
(2, 2),
(3, 2),
(4, 11),
(18, 7),
(18, 11),
(18, 13),
(18, 15);

-- --------------------------------------------------------

--
-- Table structure for table `Classes`
--

CREATE TABLE `Classes` (
  `class_id` int(11) NOT NULL,
  `subject_id` int(11) DEFAULT NULL,
  `term_id` int(11) DEFAULT NULL,
  `class_name` varchar(255) DEFAULT NULL,
  `class_student_max` int(11) NOT NULL DEFAULT 250,
  `class_credit` int(11) NOT NULL DEFAULT 4
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Classes`
--

INSERT INTO `Classes` (`class_id`, `subject_id`, `term_id`, `class_name`, `class_student_max`, `class_credit`) VALUES
(2, 3, 2, 'Art History', 234, 4),
(3, 2, 3, 'Accounting1', 250, 4),
(7, 1, 2, 'Networks', 230, 4),
(11, 4, 1, 'Linear Algebra', 230, 3),
(13, 12, 9, 'TEST', 100, 4),
(15, NULL, 1, 'TEST333', 333, 4);

-- --------------------------------------------------------

--
-- Table structure for table `Students`
--

CREATE TABLE `Students` (
  `student_id` int(11) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `f_name` varchar(255) NOT NULL,
  `m_name` varchar(255) DEFAULT NULL,
  `l_name` varchar(255) NOT NULL,
  `mobile_number` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Students`
--

INSERT INTO `Students` (`student_id`, `email_address`, `f_name`, `m_name`, `l_name`, `mobile_number`) VALUES
(1, 'nathan@oregonstate.edu', 'Nathan', 'K', 'Kim', '000-000-2222'),
(2, 'alexis@oregonstate.edu', 'Alexis', 'A.', 'Ling', '000-000-0000'),
(3, 'serena@oregonstate.edu', 'Serena', '', 'Cha', '212-232-1252'),
(4, 'caylah@oregonstate.edu', 'Caylah', '', 'Norwood', '123-000-0000'),
(5, 'chankyu@oregonstate.edu', 'Chankyu', '', 'Park', '111-222-3333'),
(15, 'chang@oregonstate.edu', 'Test', NULL, 'Chang', '111-222-3333'),
(16, 'son@oregonstate.edu', 'Son', 'Min', 'Heung', '222-333-4445'),
(18, 'pine@oregonstate.edu', 'Pine', 'Apple', 'Kiwi', '000-000-0000');

-- --------------------------------------------------------

--
-- Table structure for table `Subjects`
--

CREATE TABLE `Subjects` (
  `subject_id` int(11) NOT NULL,
  `subject_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Subjects`
--

INSERT INTO `Subjects` (`subject_id`, `subject_name`) VALUES
(1, 'Computer Science'),
(2, 'Accounting'),
(3, 'Art'),
(4, 'Mathematics'),
(7, 'English'),
(12, 'TESTSUBJECT');

-- --------------------------------------------------------

--
-- Table structure for table `Terms`
--

CREATE TABLE `Terms` (
  `term_id` int(11) NOT NULL,
  `term_year` int(11) NOT NULL,
  `term_name` varchar(255) NOT NULL,
  `term_max_credit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Terms`
--

INSERT INTO `Terms` (`term_id`, `term_year`, `term_name`, `term_max_credit`) VALUES
(1, 2020, 'Spring', 16),
(2, 2020, 'Summer', 16),
(3, 2020, 'Fall', 16),
(5, 2020, 'Winter', 16),
(9, 2100, 'TESTTERM', 20);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Account`
--
ALTER TABLE `Account`
  ADD PRIMARY KEY (`account_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `Account_Details`
--
ALTER TABLE `Account_Details`
  ADD PRIMARY KEY (`account_id`,`class_id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `Classes`
--
ALTER TABLE `Classes`
  ADD PRIMARY KEY (`class_id`),
  ADD KEY `subject_id` (`subject_id`),
  ADD KEY `term_id` (`term_id`);

--
-- Indexes for table `Students`
--
ALTER TABLE `Students`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `Subjects`
--
ALTER TABLE `Subjects`
  ADD PRIMARY KEY (`subject_id`);

--
-- Indexes for table `Terms`
--
ALTER TABLE `Terms`
  ADD PRIMARY KEY (`term_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Account`
--
ALTER TABLE `Account`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `Classes`
--
ALTER TABLE `Classes`
  MODIFY `class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `Students`
--
ALTER TABLE `Students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `Subjects`
--
ALTER TABLE `Subjects`
  MODIFY `subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Terms`
--
ALTER TABLE `Terms`
  MODIFY `term_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Account`
--
ALTER TABLE `Account`
  ADD CONSTRAINT `Account_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `Students` (`student_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Account_Details`
--
ALTER TABLE `Account_Details`
  ADD CONSTRAINT `Account_Details_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `Account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Account_Details_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `Classes` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Classes`
--
ALTER TABLE `Classes`
  ADD CONSTRAINT `Classes_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `Subjects` (`subject_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Classes_ibfk_2` FOREIGN KEY (`term_id`) REFERENCES `Terms` (`term_id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
