CREATE DATABASE  IF NOT EXISTS `reservation` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `reservation`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: reservation
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `idClient` int NOT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `isPrincipal` tinyint DEFAULT NULL,
  PRIMARY KEY (`idClient`),
  UNIQUE KEY `idClient_UNIQUE` (`idClient`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1,'Client','First','firstclient@test.com',1),(2,'Client','Second','secondclient@test.com',0),(3,'Client','Third','thirdclient@test.com',1),(4,'Client','Fourth','fourthclient@test.com',1),(5,'Client','Fifth','fifthclient@test.com',0);
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest`
--

DROP TABLE IF EXISTS `guest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest` (
  `idguest` int NOT NULL,
  `First Name` varchar(45) DEFAULT NULL,
  `last Name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idguest`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest`
--

LOCK TABLES `guest` WRITE;
/*!40000 ALTER TABLE `guest` DISABLE KEYS */;
INSERT INTO `guest` VALUES (1,'Yves','Lamontagne'),(2,'Monique','Richard');
/*!40000 ALTER TABLE `guest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invitation`
--

DROP TABLE IF EXISTS `invitation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invitation` (
  `idinvitation` int NOT NULL AUTO_INCREMENT,
  `clientId` int DEFAULT NULL,
  `guestId` int DEFAULT NULL,
  PRIMARY KEY (`idinvitation`),
  UNIQUE KEY `idinvitation_UNIQUE` (`idinvitation`),
  KEY `clientId` (`clientId`),
  KEY `guestId` (`guestId`),
  CONSTRAINT `invitation_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`idClient`),
  CONSTRAINT `invitation_ibfk_2` FOREIGN KEY (`guestId`) REFERENCES `guest` (`idguest`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invitation`
--

LOCK TABLES `invitation` WRITE;
/*!40000 ALTER TABLE `invitation` DISABLE KEYS */;
INSERT INTO `invitation` VALUES (1,3,1),(2,3,2),(3,2,2);
/*!40000 ALTER TABLE `invitation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserve`
--

DROP TABLE IF EXISTS `reserve`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserve` (
  `idreserve` int NOT NULL AUTO_INCREMENT,
  `countDay` int NOT NULL,
  `countClient` int DEFAULT NULL,
  `clientId` int DEFAULT NULL,
  `stayId` int DEFAULT NULL,
  PRIMARY KEY (`idreserve`),
  UNIQUE KEY `idreserve_UNIQUE` (`idreserve`),
  KEY `clientId` (`clientId`),
  KEY `stayId` (`stayId`),
  CONSTRAINT `reserve_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`idClient`),
  CONSTRAINT `reserve_ibfk_2` FOREIGN KEY (`clientId`) REFERENCES `client` (`idClient`),
  CONSTRAINT `reserve_ibfk_3` FOREIGN KEY (`stayId`) REFERENCES `stay` (`idstay`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserve`
--

LOCK TABLES `reserve` WRITE;
/*!40000 ALTER TABLE `reserve` DISABLE KEYS */;
INSERT INTO `reserve` VALUES (1,1,1,1,1),(2,2,3,3,2),(3,3,2,2,3),(4,2,1,5,2),(5,1,1,4,1);
/*!40000 ALTER TABLE `reserve` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stay`
--

DROP TABLE IF EXISTS `stay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stay` (
  `idstay` int NOT NULL,
  `startDate` datetime(4) DEFAULT NULL,
  `endDate` datetime(4) DEFAULT NULL,
  PRIMARY KEY (`idstay`),
  UNIQUE KEY `idstay_UNIQUE` (`idstay`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stay`
--

LOCK TABLES `stay` WRITE;
/*!40000 ALTER TABLE `stay` DISABLE KEYS */;
INSERT INTO `stay` VALUES (1,'2023-01-18 10:34:09.0000','2023-01-19 10:34:09.0000'),(2,'2023-03-01 15:00:00.0000','2023-03-03 15:00:00.0000'),(3,'2023-05-10 20:00:00.0000','2023-05-13 20:00:00.0000');
/*!40000 ALTER TABLE `stay` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-10 10:44:28
