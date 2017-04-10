/*
MySQL Data Transfer
Source Host: localhost
Source Database: review
Target Host: localhost
Target Database: review
Date: 1/6/2017 11:57:03 AM
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for groups
-- ----------------------------
DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `dateCreated` date NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for messages
-- ----------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `taskID` int(11) NOT NULL,
  `content` text NOT NULL,
  `dateCreated` date NOT NULL,
  `dateModified` date NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for reviews
-- ----------------------------
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `taskID` int(11) NOT NULL,
  `currentRating` int(11) NOT NULL,
  `potentialRating` int(11) NOT NULL,
  `comment` text NOT NULL,
  `isAssigned` int(1) NOT NULL,
  `initialReviewDate` date NOT NULL,
  `lastChangeReviewDate` date NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tasks
-- ----------------------------
DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `textID` text NOT NULL,
  `folderName` text NOT NULL,
  `year` year(4) NOT NULL,
  `countryCode` text NOT NULL,
  `repositoryDate` date NOT NULL,
  `importDate` date NOT NULL,
  `svnLogin` text NOT NULL,
  `ownerID` int(11) NOT NULL,
  `htmlFilename` text NOT NULL,
  `odtFileName` text NOT NULL,
  `pdfFileName` text NOT NULL,
  `lastChangeDate` date NOT NULL,
  `assignedGroupID` int(11) NOT NULL,
  `status` text NOT NULL,
  `statusComment` text NOT NULL,
  `ownerComment` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tasktest
-- ----------------------------
DROP TABLE IF EXISTS `tasktest`;
CREATE TABLE `tasktest` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `textID` text NOT NULL,
  `folderName` text NOT NULL,
  `year` year(4) NOT NULL,
  `countryCode` text NOT NULL,
  `repositoryDate` date NOT NULL,
  `importDate` date NOT NULL,
  `svnLogin` text NOT NULL,
  `ownerID` int(11) NOT NULL,
  `htmlFilename` text NOT NULL,
  `odtFileName` text NOT NULL,
  `pdfFileName` text NOT NULL,
  `lastChangeDate` date NOT NULL,
  `assignedGroupID` int(11) NOT NULL,
  `status` text NOT NULL,
  `statusComment` text NOT NULL,
  `ownerComment` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `login` text NOT NULL,
  `svnLogin` text NOT NULL,
  `firstName` text NOT NULL,
  `lastName` text NOT NULL,
  `email` text NOT NULL,
  `salt` text NOT NULL,
  `password` text NOT NULL,
  `countryCode` text NOT NULL,
  `registrationDate` date NOT NULL,
  `LastLoginDate` date NOT NULL,
  `role` text NOT NULL,
  `groupID` int(11) NOT NULL,
  `groupRole` text NOT NULL,
  `localCheckoutFolder` text NOT NULL,
  `autoLoadTasks` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records 
-- ----------------------------
INSERT INTO `groups` VALUES ('1', 'Group1', '2016-12-01');
INSERT INTO `groups` VALUES ('2', 'Group2\r\n', '2016-12-02');
INSERT INTO `groups` VALUES ('3', 'Group3\r\n', '2016-12-03');
INSERT INTO `messages` VALUES ('1', '1', '2', 'This is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.\r\nThis is message which has userID is 1 and taskID is 1.', '2016-01-01', '2016-01-01');
INSERT INTO `messages` VALUES ('2', '1', '3', 'This is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\nThis is message which has userID is 1 and taskID is 2.\r\n', '2016-01-02', '2016-01-02');
INSERT INTO `messages` VALUES ('3', '2', '2', 'This is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\nThis is message which has userID is 2 and taskID is 1.\r\n', '2016-01-03', '2016-01-03');
INSERT INTO `reviews` VALUES ('1', '1', '2', '4', '3', 'First Review Comment\nFirst Review Comment83\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Commentxx\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment\nFirst Review Comment', '1', '2016-12-06', '2016-12-06');
INSERT INTO `reviews` VALUES ('2', '1', '3', '5', '4', 'Second Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment\r\nSecond Review Comment', '1', '2016-12-07', '2016-12-07');
INSERT INTO `reviews` VALUES ('3', '2', '2', '5', '5', 'Third Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment\nThird Review Comment', '1', '2016-12-08', '2016-12-08');
INSERT INTO `tasks` VALUES ('2', '2015-AZ-02', '2015-AZ-02-Shebeke', '2015', 'AZ', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-AZ-02-EN.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('3', '2015-BE-01', '2015-BE-01-Choose-A-Meal', '2015', 'BE', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-BE-01-EN.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('4', '2015-BG-01', '2015-BG-01_Sixteen_Diodes', '2015', 'BG', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-BG-01-EN_Sixteen_Diodes.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('5', '2015-CA-01', '2015-CA-01-Popularity', '2015', 'CA', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-CA-01-Popularity.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('6', '2015-CH-01', '2015-CH-01_Postfix_Calculating_Machine', '2015', 'CH', '2016-12-19', '2017-01-06', 'svnLogin', '1', '2015-CH-01-eng.html', '2015-CH-01-eng.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('7', '2015-CZ-01', '2015-CZ-01 Chestnut animals', '2015', 'CZ', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-CZ-01 Chestnut animals.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('8', '2015-DE-01', '2015-DE-01_Important_Parts', '2015', 'DE', '2016-12-19', '2017-01-06', 'svnLogin', '1', '2015-DE-01-eng.html', '', '2015-DE-01-eng.pdf', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('9', '2015-ES-01', '2015-ES-01_Flowers_on_the_path', '2015', 'ES', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-ES-01-EN.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('10', '2015-FR-01', '2015-FR-01-Copy-Pattern', '2015', 'FR', '2016-12-19', '2017-01-06', 'svnLogin', '1', 'index.html', '', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('11', '2015-HU-01', '2015-HU-01-beaver_tutorials', '2015', 'HU', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-HU-01-EN.odt', '2015-HU-01-EN.pdf', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('12', '2015-IL-02', '2015-IL-02-Short Way', '2015', 'IL', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-IL-02 Short Way.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('13', '2015-IT-01', '2015-IT-01-EN-pebbles', '2015', 'IT', '2016-12-19', '2017-01-06', 'svnLogin', '1', '2015-IT-01-EN-pebbles-interactive.html', '2015-IT-01-EN-pebbles-a.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('14', '2015-JP-01', '2015-JP-01_Woodwork', '2015', 'JP', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-JP-01-eng.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('15', '2015-LT-02', '2015-LT-02_Building_A_Chip_II', '2015', 'LT', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-LT-02-EN.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('16', '2015-MY-01', '2015-MY-01-EN-Bracelet', '2015', 'MY', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-MY-01-EN.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('17', '2015-NL-01', '2015-NL-01 Robot painting', '2015', 'NL', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-NL-01-EN.odt', '2015-NL-01-EN.pdf', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('18', '2015-PL-04', '2015-PL-04-EN Graceful graphs', '2015', 'PL', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-PL-04-EN Graceful graphs.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('19', '2015-RU-01', '2015-RU-01 A chair or an armchair', '2015', 'RU', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-RU-01-EN.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('20', '2015-SE-01', '2015-SE-01-EN-Stars', '2015', 'SE', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-SE-01-EN.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('21', '2015-SI-01', '2015-SI-01 Inheritance', '2015', 'SI', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-SI-01-EN Inheritance.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('22', '2015-SK-01', '2015-SK-01_two_robots', '2015', 'SK', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-SK-01.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('23', '2015-TR-02', '2015-TR-02-Patterns-in-Cells', '2015', 'TR', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-TR-02-Patterns-in-Cells.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('24', '2015-TW-01', '2015-TW-01_Taking_water', '2015', 'TW', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-TW-01-EN.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('25', '2015-UA-02', '2015-UA-02-EN Drinks', '2015', 'UA', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-UA-02(0-II)-EN Drinks.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('26', '2015-ZA-01', '2015-ZA-01-Compass Rose', '2015', 'ZA', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-ZA-01-EN.odt', '2015-ZA-01-EN.pdf', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('27', '2015-AZ-01', '2015-AZ-01-Flame communication', '2015', 'AZ', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-AZ-01-EN.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('28', '2015-CH-01', '2015-CH-01_postfix_stackmachine', '2015', 'CH', '2016-12-19', '2017-01-06', 'svnLogin', '1', '2015-CH-01-eng.html', '2015-CH-01-eng.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('29', '2015-IL-01', '2015-IL-01-Fuel Way', '2015', 'IL', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-IL-01 Fuel Way.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('30', '2015-LT-01', '2015-LT-01_Building_A_Chip', '2015', 'LT', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-LT-01-EN.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('31', '2015-NL-01', '2015-NL-01 Bebras Bingo Mug', '2015', 'NL', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-NL-01-EN.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('32', '2015-PL-01', '2015-PL-01-EN Logo', '2015', 'PL', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-PL-01-EN Logo.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('33', '2015-TR-01', '2015-TR-01-Numbers-And-Sticks', '2015', 'TR', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-TR-01-Numbers-And-Sticks.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('34', '2015-UA-01', '2015-UA-01-EN Even Parity', '2015', 'UA', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-UA-01(III)-EN Even Parity.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('35', '2015-ZA-01', '2015-ZA-01-Cross rose', '2015', 'ZA', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-ZA-01-EN.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasks` VALUES ('36', '2015-AT-01', '2015-AT-01-Super Power Family', '2015', 'AT', '2016-12-19', '2017-01-06', 'svnLogin', '1', '', '2015-AT-01-Super Power Family02.odt', '', '2017-01-06', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('1', '2016_FR_01', '2016_FR_01-not-rectangle', '2016', 'France\r\n', '2016-12-06', '2016-11-08', 'svgLogin', '1', 'htmlFileNamea', 'odtFileName', 'pdfFileName', '2016-12-07', '1', 'Recommended', 'Really good task', 'ownerComment');
INSERT INTO `tasktest` VALUES ('2', '2016_FR_02', '2016_FR_02-not-rectangle', '2016', 'France\r\n', '2016-12-07', '2016-11-09', 'svgLogin', '1', 'htmlFileName', 'odtFileName', 'pdfFileName', '2016-12-08', '2', 'Recommended', 'Really good task', 'ownerComment');
INSERT INTO `tasktest` VALUES ('3', '2016_FR_03', '2016_FR_03-not-rectangle', '2016', 'France\r\n', '2016-12-08', '2016-11-10', 'svgLogin', '1', 'htmlFileNamea', 'odtFileNameas', 'pdfFileName', '2016-12-09', '3', 'Proposed', 'Really good tasadfsk', 'ownerComment');
INSERT INTO `tasktest` VALUES ('74', '2015-AT-01', '2015-AT-01-Super Power Family', '2015', 'AT', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('75', '2015-AZ-02', '2015-AZ-02-Shebeke', '2015', 'AZ', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('76', '2015-BE-01', '2015-BE-01-Choose-A-Meal', '2015', 'BE', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('77', '2015-BG-01', '2015-BG-01_Sixteen_Diodes', '2015', 'BG', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('78', '2015-CA-01', '2015-CA-01-Popularity', '2015', 'CA', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('79', '2015-CH-01', '2015-CH-01_Postfix_Calculating_Machine', '2015', 'CH', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('80', '2015-CZ-01', '2015-CZ-01 Chestnut animals', '2015', 'CZ', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('81', '2015-DE-01', '2015-DE-01_Important_Parts', '2015', 'DE', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('82', '2015-ES-01', '2015-ES-01_Flowers_on_the_path', '2015', 'ES', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('83', '2015-FR-01', '2015-FR-01-Copy-Pattern', '2015', 'FR', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('84', '2015-HU-01', '2015-HU-01-beaver_tutorials', '2015', 'HU', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('85', '2015-IL-02', '2015-IL-02-Short Way', '2015', 'IL', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('86', '2015-IT-01', '2015-IT-01-EN-pebbles', '2015', 'IT', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('87', '2015-JP-01', '2015-JP-01_Woodwork', '2015', 'JP', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('88', '2015-LT-02', '2015-LT-02_Building_A_Chip_II', '2015', 'LT', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('89', '2015-MY-01', '2015-MY-01-EN-Bracelet', '2015', 'MY', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('90', '2015-NL-01', '2015-NL-01 Robot painting', '2015', 'NL', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('91', '2015-PL-04', '2015-PL-04-EN Graceful graphs', '2015', 'PL', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('92', '2015-RU-01', '2015-RU-01 A chair or an armchair', '2015', 'RU', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('93', '2015-SE-01', '2015-SE-01-EN-Stars', '2015', 'SE', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('94', '2015-SI-01', '2015-SI-01 Inheritance', '2015', 'SI', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('95', '2015-SK-01', '2015-SK-01_two_robots', '2015', 'SK', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('96', '2015-TR-02', '2015-TR-02-Patterns-in-Cells', '2015', 'TR', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('97', '2015-TW-01', '2015-TW-01_Taking_water', '2015', 'TW', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('98', '2015-UA-02', '2015-UA-02-EN Drinks', '2015', 'UA', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('99', '2015-ZA-01', '2015-ZA-01-Compass Rose', '2015', 'ZA', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('100', '2015-AZ-01', '2015-AZ-01-Flame communication', '2015', 'AZ', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('101', '2015-CH-01', '2015-CH-01_postfix_stackmachine', '2015', 'CH', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('102', '2015-IL-01', '2015-IL-01-Fuel Way', '2015', 'IL', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('103', '2015-LT-01', '2015-LT-01_Building_A_Chip', '2015', 'LT', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('104', '2015-NL-01', '2015-NL-01 Bebras Bingo Mug', '2015', 'NL', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('105', '2015-PL-01', '2015-PL-01-EN Logo', '2015', 'PL', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('106', '2015-TR-01', '2015-TR-01-Numbers-And-Sticks', '2015', 'TR', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('107', '2015-UA-01', '2015-UA-01-EN Even Parity', '2015', 'UA', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `tasktest` VALUES ('108', '2015-ZA-01', '2015-ZA-01-Cross rose', '2015', 'ZA', '2016-12-19', '2017-01-05', 'svnLogin', '1', 'a', 'a', 'a', '2016-12-12', '0', '', '', '');
INSERT INTO `users` VALUES ('1', 'login\r\n', 'svnLogin', 'firstname', 'lastname', 'email', 'salt\r\n', '0cc175b9c0f1b6a831c399e269772661', 'France', '2016-12-01', '2016-12-01', 'Admin', '1', 'Admin', 'C:/xampp/htdocs/bebras-review/SVN', 'true');
INSERT INTO `users` VALUES ('2', 'login2\r\n', 'svnLogin', 'firstname2', 'lastname2', 'email', 'salt\r\n', '8b1a9953c4611296a827abf8c47804d7', 'France', '2016-12-01', '2016-12-01', 'Admin', '1', 'Admin', 'http://localhost/bebras-review/SVN', 'true');
INSERT INTO `users` VALUES ('3', 'login2\r\n', 'svnLogin', 'Mathias', 'Hiron', 'mathias.hiron@gmail.com', 'salt', '05a671c66aefea124cc08b76ea6d30bb', 'France', '2016-12-28', '2016-12-28', 'Unconfirmed', '1', 'Admin', 'localCheckoutFolder', 'true');
INSERT INTO `users` VALUES ('4', 'login', 'svnLogin', 'a', 'a', 'a@a.com', 'salt', '0cc175b9c0f1b6a831c399e269772661', 'France', '2016-12-28', '2016-12-28', 'Unconfirmed', '1', 'member', 'localCheckoutFolder', 'false');
