-- Adminer 4.2.4 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

CREATE DATABASE `sc` /*!40100 DEFAULT CHARACTER SET gbk */;
USE `sc`;

CREATE TABLE `class` (
  `spno` char(8) NOT NULL,
  `class_no` char(4) NOT NULL,
  `header` char(8) DEFAULT NULL,
  PRIMARY KEY (`spno`,`class_no`),
  CONSTRAINT `class_ibfk_2` FOREIGN KEY (`spno`) REFERENCES `speciality` (`spno`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `course` (
  `cno` char(10) NOT NULL DEFAULT '',
  `cname` char(20) NOT NULL,
  `spno` char(8) NOT NULL,
  `lecture` tinyint(4) NOT NULL,
  `credit` tinyint(4) NOT NULL,
  PRIMARY KEY (`cno`),
  KEY `spno` (`spno`),
  CONSTRAINT `course_ibfk_1` FOREIGN KEY (`spno`) REFERENCES `speciality` (`spno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `department` (
  `dno` char(6) NOT NULL DEFAULT '',
  `dept_name` char(20) NOT NULL,
  PRIMARY KEY (`dno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `sc` (
  `sno` char(10) NOT NULL,
  `cno` char(10) NOT NULL,
  `score` tinyint(4) NOT NULL,
  `sname` char(8) NOT NULL,
  PRIMARY KEY (`sno`,`cno`),
  KEY `cno` (`cno`),
  CONSTRAINT `sc_ibfk_3` FOREIGN KEY (`cno`) REFERENCES `course` (`cno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sc_ibfk_4` FOREIGN KEY (`sno`) REFERENCES `student` (`sno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `speciality` (
  `spno` char(8) NOT NULL DEFAULT '',
  `dno` char(6) NOT NULL,
  `spname` char(20) NOT NULL,
  PRIMARY KEY (`spno`),
  KEY `dno` (`dno`),
  CONSTRAINT `speciality_ibfk_2` FOREIGN KEY (`dno`) REFERENCES `department` (`dno`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `student` (
  `sno` char(10) NOT NULL DEFAULT '',
  `sname` char(8) NOT NULL,
  `sex` char(2) DEFAULT NULL,
  `sbirthday` date DEFAULT NULL,
  `dno` char(6) NOT NULL,
  `spno` char(8) NOT NULL,
  `class_no` char(4) NOT NULL,
  `phone` char(11) DEFAULT NULL,
  `address` char(25) DEFAULT NULL,
  `enroll_day` date DEFAULT NULL,
  PRIMARY KEY (`sno`),
  KEY `dno` (`dno`),
  KEY `class_no` (`class_no`),
  KEY `spno` (`spno`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`dno`) REFERENCES `department` (`dno`) ON UPDATE CASCADE,
  CONSTRAINT `student_ibfk_3` FOREIGN KEY (`spno`) REFERENCES `speciality` (`spno`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `user` (
  `username` char(12) NOT NULL,
  `password` char(32) NOT NULL,
  `user_type` smallint(6) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 2018-01-13 08:06:50
