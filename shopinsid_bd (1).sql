-- phpMyAdmin SQL Dump
-- version 5.1.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql-shopinsid.alwaysdata.net
-- Generation Time: Jun 05, 2023 at 02:00 PM
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
  `UsersID` int(11) DEFAULT NULL,
  `DateCommande` datetime DEFAULT NULL,
  `Total` decimal(10,2) DEFAULT NULL
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
-- Table structure for table `panier`
--

CREATE TABLE `panier` (
  `ID` int(11) NOT NULL,
  `CommandeID` int(11) DEFAULT NULL,
  `ProduitID` int(11) DEFAULT NULL,
  `Quantite` int(11) DEFAULT NULL,
  `PrixUnitaire` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `panier`
--

INSERT INTO `panier` (`ID`, `CommandeID`, `ProduitID`, `Quantite`, `PrixUnitaire`) VALUES
(5, NULL, 2, 3, '29.99');

-- --------------------------------------------------------

--
-- Table structure for table `produits`
--

CREATE TABLE `produits` (
  `ID` int(11) NOT NULL,
  `NomDuProduit` varchar(100) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Prix` decimal(10,2) DEFAULT NULL,
  `UsersID` int(11) DEFAULT NULL,
  `CategorieID` int(11) DEFAULT NULL,
  `ImageUrl` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `produits`
--

INSERT INTO `produits` (`ID`, `NomDuProduit`, `Description`, `Prix`, `UsersID`, `CategorieID`, `ImageUrl`) VALUES
(1, 'Guitare', 'Description de la guitare', '199.99', NULL, NULL, 'https://thumbs.dreamstime.com/z/guitare-classique-d-isolement-54363220.jpg'),
(2, 'Figurine', 'description de la figurine', '29.99', NULL, NULL, 'https://media.ldlc.com/r1600/mkp/99b6eadd417744fd8f5bc072cf2911a8.jpeg');

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
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `Nom` varchar(100) DEFAULT NULL,
  `Prenom` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `MotDePasse` varchar(100) DEFAULT NULL,
  `LanguePreferee` varchar(50) DEFAULT NULL,
  `Adresse` varchar(200) DEFAULT NULL,
  `Tel` int(10) DEFAULT NULL,
  `DateDeNaissance` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `Nom`, `Prenom`, `Email`, `MotDePasse`, `LanguePreferee`, `Adresse`, `Tel`, `DateDeNaissance`) VALUES
(1, 'CHAKIB MOUSSAOUI', NULL, 'chak@gmail.com', 'e6107e90d7fb899f2da5a7f90221cc2f42299e7a44c50e9ab5247e24b2b62232', 'fr', '5 Rue postale', 623019936, '2000-09-30 00:00:00'),
(2, 'Chakib', NULL, 'chakib_moussaoui@outlook.fr', '3468507783668792e4d0c5f3f98b05ec38254b7b5e47dedf7feac66b7d478c55', 'fr', '5 Rue postale', 623019939, '2001-07-30 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `avis`
--
ALTER TABLE `avis`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UsersID` (`UsersID`),
  ADD KEY `ProduitID` (`ProduitID`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UsersID` (`UsersID`);

--
-- Indexes for table `commandes`
--
ALTER TABLE `commandes`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UsersID` (`UsersID`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UsersID` (`UsersID`);

--
-- Indexes for table `panier`
--
ALTER TABLE `panier`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CommandeID` (`CommandeID`),
  ADD KEY `ProduitID` (`ProduitID`);

--
-- Indexes for table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UsersID` (`UsersID`),
  ADD KEY `CategorieID` (`CategorieID`);

--
-- Indexes for table `reglement`
--
ALTER TABLE `reglement`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CommandeID` (`CommandeID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Email` (`Email`);

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `produits`
--
ALTER TABLE `produits`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `reglement`
--
ALTER TABLE `reglement`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `avis`
--
ALTER TABLE `avis`
  ADD CONSTRAINT `avis_ibfk_1` FOREIGN KEY (`UsersID`) REFERENCES `users` (`ID`),
  ADD CONSTRAINT `avis_ibfk_2` FOREIGN KEY (`ProduitID`) REFERENCES `produits` (`ID`);

--
-- Constraints for table `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`UsersID`) REFERENCES `users` (`ID`);

--
-- Constraints for table `commandes`
--
ALTER TABLE `commandes`
  ADD CONSTRAINT `commandes_ibfk_1` FOREIGN KEY (`UsersID`) REFERENCES `users` (`ID`);

--
-- Constraints for table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`UsersID`) REFERENCES `users` (`ID`);

--
-- Constraints for table `panier`
--
ALTER TABLE `panier`
  ADD CONSTRAINT `panier_ibfk_1` FOREIGN KEY (`CommandeID`) REFERENCES `commandes` (`ID`),
  ADD CONSTRAINT `panier_ibfk_2` FOREIGN KEY (`ProduitID`) REFERENCES `produits` (`ID`);

--
-- Constraints for table `produits`
--
ALTER TABLE `produits`
  ADD CONSTRAINT `produits_ibfk_1` FOREIGN KEY (`UsersID`) REFERENCES `users` (`ID`),
  ADD CONSTRAINT `produits_ibfk_2` FOREIGN KEY (`CategorieID`) REFERENCES `categories` (`ID`);

--
-- Constraints for table `reglement`
--
ALTER TABLE `reglement`
  ADD CONSTRAINT `reglement_ibfk_1` FOREIGN KEY (`CommandeID`) REFERENCES `commandes` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
