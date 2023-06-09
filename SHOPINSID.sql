-- phpMyAdmin SQL Dump
-- version 5.1.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql-shopinsid.alwaysdata.net
-- Generation Time: Jun 08, 2023 at 04:17 PM
-- Server version: 10.6.13-MariaDB
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopinsid_bd`
--
CREATE DATABASE IF NOT EXISTS `shopinsid_bd` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `shopinsid_bd`;

-- --------------------------------------------------------

--
-- Table structure for table `avis`
--

CREATE TABLE `avis` (
  `ID` int(11) NOT NULL,
  `UsersID` int(11) DEFAULT NULL,
  `ProduitID` int(11) DEFAULT NULL,
  `Note` int(11) DEFAULT NULL,
  `Commentaire` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `ID` int(11) NOT NULL,
  `NomCategorie` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`ID`, `NomCategorie`) VALUES
(1, 'Collection'),
(2, 'Gaming'),
(3, 'Musique');

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `ID` int(11) NOT NULL,
  `UsersID` int(11) DEFAULT NULL,
  `Message` text DEFAULT NULL,
  `DateMessage` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `commandes`
--

CREATE TABLE `commandes` (
  `ID` int(11) NOT NULL,
  `DateCommande` datetime DEFAULT NULL,
  `idUser` int(11) NOT NULL,
  `idProduit` int(11) NOT NULL,
  `Quantite` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `ID` int(11) NOT NULL,
  `UsersID` int(11) DEFAULT NULL,
  `Nom` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Message` text DEFAULT NULL,
  `DateMessage` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20230524141437', '2023-06-06 11:14:01', 9),
('DoctrineMigrations\\Version20230530134530', '2023-06-06 11:14:01', 7),
('DoctrineMigrations\\Version20230606091551', '2023-06-06 11:15:55', 63);

-- --------------------------------------------------------

--
-- Table structure for table `panier`
--

CREATE TABLE `panier` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ProduitID` int(11) DEFAULT NULL,
  `Quantite` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produits`
--

CREATE TABLE `produits` (
  `ID` int(11) NOT NULL,
  `NomDuProduit` varchar(100) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Prix` decimal(10,2) DEFAULT NULL,
  `CategorieID` int(11) DEFAULT NULL,
  `ImageUrl` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `produits`
--

INSERT INTO `produits` (`ID`, `NomDuProduit`, `Description`, `Prix`, `CategorieID`, `ImageUrl`) VALUES
(1, 'Guitare', 'Description de la guitare', '199.99', 3, 'https://thumbs.dreamstime.com/z/guitare-classique-d-isolement-54363220.jpg'),
(2, 'Figurine', 'description de la figurine', '29.99', 1, 'https://media.ldlc.com/r1600/mkp/99b6eadd417744fd8f5bc072cf2911a8.jpeg'),
(4, 'Controller', 'This is the description for a PS5 Controller.', '39.99', 2, 'https://images.unsplash.com/photo-1606160429008-751d8408a874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1716&q=80'),
(5, 'Vinyl', 'This is the description of the vinyl.', '10.99', 3, 'https://m.media-amazon.com/images/I/71nEw-vfddL._AC_SX679_.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `reglement`
--

CREATE TABLE `reglement` (
  `ID` int(11) NOT NULL,
  `CommandeID` int(11) DEFAULT NULL,
  `Montant` decimal(10,2) DEFAULT NULL,
  `DateReglement` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `idSession` int(11) NOT NULL,
  `token` varchar(500) NOT NULL,
  `idUser` int(11) NOT NULL,
  `statut` tinyint(4) NOT NULL,
  `dateDebut` date NOT NULL,
  `dateFin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `Nom` varchar(100) DEFAULT NULL,
  `Prenom` varchar(100) DEFAULT NULL,
  `MotDePasse` varchar(100) DEFAULT NULL,
  `LanguePreferee` varchar(50) DEFAULT NULL,
  `Adresse` varchar(200) DEFAULT NULL,
  `Tel` int(10) DEFAULT NULL,
  `DateDeNaissance` datetime DEFAULT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `Nom`, `Prenom`, `MotDePasse`, `LanguePreferee`, `Adresse`, `Tel`, `DateDeNaissance`, `email`) VALUES
(3, 'admin', NULL, 'd82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892', NULL, NULL, 383838383, '2000-02-02 00:00:00', ''),
(6, 'redar', NULL, '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'fr', '56 rue d\'italie', 606060606, '2002-04-01 00:00:00', ''),
(7, 'bb', NULL, 'a66909a807f28959e630e7bf42eb0b984dd7ed8dd148afde9882d33877cc664e', 'fr', '4 rue de mazure', 760487469, '2000-01-01 00:00:00', ''),
(8, 'reda', NULL, '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'fr', '89 rue', 606060606, '2002-04-01 00:00:00', 'admin@admin.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `avis`
--
ALTER TABLE `avis`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `commandes`
--
ALTER TABLE `commandes`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indexes for table `panier`
--
ALTER TABLE `panier`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `reglement`
--
ALTER TABLE `reglement`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`idSession`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `avis`
--
ALTER TABLE `avis`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `panier`
--
ALTER TABLE `panier`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `produits`
--
ALTER TABLE `produits`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `reglement`
--
ALTER TABLE `reglement`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `session`
--
ALTER TABLE `session`
  MODIFY `idSession` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
