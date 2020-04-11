-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 02, 2020 at 01:58 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.3.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vybn`
--

-- --------------------------------------------------------

--
-- Table structure for table `channels`
--

CREATE TABLE `channels` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `stationName` varchar(500) NOT NULL,
  `albumimage` varchar(100) NOT NULL,
  `tracks` mediumtext NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `channels`
--

INSERT INTO `channels` (`id`, `userid`, `stationName`, `albumimage`, `tracks`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'titanium', 'albumimage1', '[{\"MnetId\":\"64474529\",\"title\":\"Titanium I Am Titanium\",\"name\":\"Flo Dancer\",\"artistMnetId\":\"1813837\",\"imgsource\":\"http://images.mndigital.com/albums/064/474/509/s.jpeg\",\"imgsource150\":\"http://images.mndigital.com/albums/064/474/509/m.jpeg\"},{\"MnetId\":\"76781091\",\"title\":\"Titanium I Am Titanium\",\"name\":\"Gavin Mikhail\",\"artistMnetId\":\"1331945\",\"imgsource\":\"http://images.mndigital.com/albums/076/781/085/s.jpeg\",\"imgsource150\":\"http://images.mndigital.com/albums/076/781/085/m.jpeg\"},{\"MnetId\":\"448349805\",\"title\":\"Titanium Feat Lauren Williams\",\"name\":\" BroKen Strings\",\"artistMnetId\":\"9408827\",\"imgsource\":\"http://images.mndigital.com/albums/448/349/793/s.jpeg\",\"imgsource150\":\"http://images.mndigital.com/albums/448/349/793/m.jpeg\"},{\"MnetId\":\"478839937\",\"title\":\"Titanium Railway\",\"name\":\"vee\",\"artistMnetId\":\"11639544\",\"imgsource\":\"http://images.mndigital.com/albums/478/839/913/s.jpeg\",\"imgsource150\":\"http://images.mndigital.com/albums/478/839/913/m.jpeg\"},{\"MnetId\":\"408864185\",\"title\":\"Titanium\",\"name\":\"AT\",\"artistMnetId\":\"2830638\",\"imgsource\":\"http://images.mndigital.com/albums/408/864/183/s.jpeg\",\"imgsource150\":\"http://images.mndigital.com/albums/408/864/183/m.jpeg\"}]', '2020-02-28 15:12:47', '2020-02-28 15:12:47'),
(2, 1, 'can you feel the love', 'albumimage1', '[{\"MnetId\":\"473350279\",\"title\":\"Broadway Love Medley As Long As Youre Mine  All I Ask Of You  Can You Feel The Love Tonight  Falling Slowly\",\"name\":\"Chad Graham\",\"artistMnetId\":\"904843\",\"imgsource\":\"http://images.mndigital.com/albums/473/350/265/s.jpeg\",\"imgsource150\":\"http://images.mndigital.com/albums/473/350/265/m.jpeg\"},{\"MnetId\":\"385769983\",\"title\":\"Can You Feel The Love Tonight The Lion King\",\"name\":\"Arjun Kaul\",\"artistMnetId\":\"1548812\",\"imgsource\":\"http://images.mndigital.com/albums/385/769/981/s.jpeg\",\"imgsource150\":\"http://images.mndigital.com/albums/385/769/981/m.jpeg\"},{\"MnetId\":\"416953715\",\"title\":\"The Lion King Circle Of Life  Can You Feel The Love Tonight  Hakuna Matata  This Land\",\"name\":\"Black Dyke Band\",\"artistMnetId\":\"393271\",\"imgsource\":\"http://images.mndigital.com/albums/416/953/671/s.jpeg\",\"imgsource150\":\"http://images.mndigital.com/albums/416/953/671/m.jpeg\"}]', '2020-02-29 03:15:43', '2020-02-29 03:15:43');

-- --------------------------------------------------------

--
-- Table structure for table `ChannelComponents`
--
CREATE TABLE `ChannelComponents` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `channelId` int(11) unsigned NOT NULL,
  `compId` int(11) unsigned NOT NULL,
  `tierNum` tinyint(4) unsigned NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`compId`, `recCompId`) 
) ENGINE=InnoDB AUTO_INCREMENT=237 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- --------------------------------------------------------

--
-- Table structure for table `ComponentRecommendations`
--
CREATE TABLE `ComponentRecommendations` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `compId` int(11) unsigned NOT NULL,
  `recCompId` int(11) unsigned NOT NULL,
  `score` tinyint(3) unsigned NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=237 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `firstName` varchar(500) DEFAULT 'Unknown',
  `profilePic` varchar(500) NOT NULL DEFAULT 'profile.png',
  `plan_type` varchar(500) DEFAULT 'free',
  `private` tinyint(1) NOT NULL DEFAULT 0,
  `color_scheme` int(11) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `UserId`, `firstName`, `profilePic`, `plan_type`, `private`, `color_scheme`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'userqwer', '700e37a1-0466-4211-98e0-af17b176be8f.jpg', 'free', 0, 3, '2020-02-14 15:55:50', '2020-02-29 08:55:52'),
(2, 2, 'Unknown', 'profile.png', 'free', 0, 1, '2020-02-25 02:01:02', '2020-02-25 02:01:02');

-- --------------------------------------------------------

--
-- Table structure for table `track`
--

CREATE TABLE `track` (
  `id` int(11) NOT NULL,
  `MnetId` varchar(50) NOT NULL,
  `title` varchar(500) NOT NULL,
  `name` varchar(500) NOT NULL,
  `imgsource` varchar(500) NOT NULL,
  `musicsource` varchar(500) NOT NULL,
  `artistMnetId` varchar(50) NOT NULL,
  `genre` varchar(50) NOT NULL,
  `releaseDate` varchar(500) NOT NULL,
  `bitrate` varchar(500) NOT NULL,
  `duration` varchar(50) NOT NULL,
  `trackNumber` varchar(10) NOT NULL,
  `discNumber` varchar(10) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `emailotp` varchar(500) NOT NULL,
  `emailverified` tinyint(1) NOT NULL DEFAULT 0,
  `googleauth` tinyint(1) NOT NULL DEFAULT 0,
  `facebookauth` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `emailotp`, `emailverified`, `googleauth`, `facebookauth`, `createdAt`, `updatedAt`) VALUES
(1, '', '$2b$10$JWUpWGXAfF7IWX.hDXS/n.OLgGC1gfssROEYtUYVvXS5RGDhdmrhm', 'dpotter@cnymail.com', '287376', 1, 0, 0, '2020-02-14 15:55:49', '2020-02-14 15:56:20'),
(2, '', '', 'dpotter@mobiledigitalimaging.com', '487613', 0, 0, 0, '2020-02-25 02:01:02', '2020-02-25 02:01:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `channels`
--
ALTER TABLE `channels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `track`
--
ALTER TABLE `track`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `channels`
--
ALTER TABLE `channels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `track`
--
ALTER TABLE `track`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
