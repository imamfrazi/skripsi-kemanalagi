-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 01, 2019 at 10:55 PM
-- Server version: 10.3.12-MariaDB-1:10.3.12+maria~bionic-log
-- PHP Version: 7.2.14-1+ubuntu18.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kemanalagi`
--

-- --------------------------------------------------------

--
-- Table structure for table `galeri`
--

CREATE TABLE `galeri` (
  `idGaleri` int(11) NOT NULL,
  `idWisata` int(11) NOT NULL,
  `namaGambar` varchar(1000) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `galeri`
--

INSERT INTO `galeri` (`idGaleri`, `idWisata`, `namaGambar`, `created_at`, `updated_at`) VALUES
(29, 17, '2019-01-04-5c2f3f1bc9ccb.png', '2019-01-04 03:10:20', '2019-01-04 03:10:20'),
(30, 17, '2019-01-04-5c2f3f1c50be5.jpg', '2019-01-04 03:10:20', '2019-01-04 03:10:20'),
(31, 17, '2019-01-04-5c2f3f1ce8e68.jpg', '2019-01-04 03:10:20', '2019-01-04 03:10:20'),
(35, 18, '2019-01-05-5c30ebb709cf6.jpg', '2019-01-05 09:39:03', '2019-01-05 09:39:03'),
(36, 18, '2019-01-05-5c30ebb789d59.jpg', '2019-01-05 09:39:03', '2019-01-05 09:39:03'),
(37, 18, '2019-01-05-5c30ebb79cbbb.png', '2019-01-05 09:39:04', '2019-01-05 09:39:04'),
(38, 18, '2019-01-05-5c30ebb825a18.jpg', '2019-01-05 09:39:04', '2019-01-05 09:39:04'),
(39, 18, '2019-01-05-5c30ebb833787.jpg', '2019-01-05 09:39:04', '2019-01-05 09:39:04'),
(40, 19, '2019-01-05-5c30ecfb296a7.jpg', '2019-01-05 09:44:27', '2019-01-05 09:44:27'),
(41, 19, '2019-01-05-5c30ecfb47463.jpg', '2019-01-05 09:44:27', '2019-01-05 09:44:27'),
(42, 19, '2019-01-05-5c30ecfb5a490.png', '2019-01-05 09:44:27', '2019-01-05 09:44:27'),
(43, 19, '2019-01-05-5c30ecfbdca4c.jpg', '2019-01-05 09:44:27', '2019-01-05 09:44:27');

-- --------------------------------------------------------

--
-- Table structure for table `linkWisata`
--

CREATE TABLE `linkWisata` (
  `idLinkWisata` int(11) NOT NULL,
  `judul` varchar(200) NOT NULL,
  `link` varchar(1000) NOT NULL,
  `daerah` varchar(100) NOT NULL,
  `kategori` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `linkWisata`
--

INSERT INTO `linkWisata` (`idLinkWisata`, `judul`, `link`, `daerah`, `kategori`, `created_at`, `updated_at`) VALUES
(1, 'Pantai Tanjung Bira Bulukumba : Keindahan Pasir Putih Dan Birunya Air Laut', 'https://piknikasik.com/pantai-tanjung-bira-bulukumba-keindahan-pasir-putih-dan-birunya-air-laut', 'Bulukumba', 'Pantai', '2019-02-01 06:35:14', '2019-02-01 06:35:14'),
(2, 'Hal yang Harus Diketahui Sebelum ke Pantai Appalarang, Sulawesi Selatan', 'https://phinemo.com/backpacker-guide-menyesap-kopi-di-anjungan-pantai-appalarang-sulawesi-selatan/', 'Bulukumba', 'Pantai', '2019-02-01 06:38:54', '2019-02-01 06:41:18'),
(3, 'ADA KERAJAAN KUPU-KUPU DI TAMAN NASIONAL BANTIMURUNG, MAROS MAKASSAR', 'http://jejaklangkahku.com/2015/07/10/ada-kerajaan-kupu-kupu-di-taman-nasional-bantimurung-maros-makassar/', 'Maros', 'Kebun Wisata', '2019-02-01 06:40:46', '2019-02-01 06:40:46');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `idUser` int(11) NOT NULL,
  `namaLengkap` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `foto` varchar(1000) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`idUser`, `namaLengkap`, `username`, `password`, `foto`, `created_at`, `updated_at`) VALUES
(4, 'Imam Fachrurrozi', 'imam', 'eaccb8ea6090a40a98aa28c071810371', '2019-01-04-5c2f6a644bc49.png', '2019-01-04 06:15:00', '2019-01-04 06:15:00');

-- --------------------------------------------------------

--
-- Table structure for table `wisata`
--

CREATE TABLE `wisata` (
  `idWisata` int(11) NOT NULL,
  `namaWisata` varchar(100) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `daerah` varchar(100) NOT NULL,
  `kategori` varchar(20) NOT NULL,
  `hargaTiket` double NOT NULL,
  `jadwal` varchar(100) DEFAULT NULL,
  `fasilitas` varchar(100) DEFAULT NULL,
  `kontak` varchar(20) NOT NULL,
  `gambarCover` varchar(1000) NOT NULL,
  `deskripsi` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wisata`
--

INSERT INTO `wisata` (`idWisata`, `namaWisata`, `alamat`, `daerah`, `kategori`, `hargaTiket`, `jadwal`, `fasilitas`, `kontak`, `gambarCover`, `deskripsi`, `created_at`, `updated_at`) VALUES
(17, 'Pantai Tanjung Bira', 'Bira', 'Bulukumba', 'Pantai', 10000, '07:00 - 15:00', 'Area parkir, Tempat istirahat, Tempat makan, Kamar mandi dan Tempat Ibadah', '(091) 217-138-136', '2019-01-04-5c2f3f1b853e9.jpg', '<p><div><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div><div></div><br><br></p>', '2019-01-04 03:10:19', '2019-01-04 03:10:19'),
(18, 'Bantimurung', 'Bantimurung', 'Maros', 'Kebun Wisata', 20000, '09.00 - 17.00', '-', '(089) 839-128-392', '2019-01-04-5c2f3f7a5304f.jpg', '<p></p><div><p><b>Lorem ipsum</b> dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div><div></div><br><br><p></p>', '2019-01-04 03:11:54', '2019-01-05 09:39:02'),
(19, 'Pantai Marumasa', 'Desa Darubiah, Bonto Bahari', 'Bulukumba', 'Pantai', 15000, '06:00 - 22:00', 'Kamar Mandi, Parkir, Kantin dan Mushollah', '(082) 738-273-823', '2019-01-05-5c30ecfb015f6.jpg', '<p><div><div><b>Bulukumba</b> merupakan sebuah Daerah di Provinsi Sulawesi Selatan yang terkenal memiliki banyak pantai cantik, Pantai yang eksotis dan menakjubkan.<br></div></div><p>Pantai merupakan wisata favorit bagi semua kalangan dan sangat cocok dikunjungi bagi Anda yang ingin berlibur bersama keluarga, Sahabat ataupun Rekan Kantor, Berwisata di Pantai juga bisa memberikan sensasi berlibur yang berbeda dan Menyenangkan.</p><br></p>', '2019-01-05 09:44:27', '2019-01-05 09:44:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `galeri`
--
ALTER TABLE `galeri`
  ADD PRIMARY KEY (`idGaleri`,`idWisata`);

--
-- Indexes for table `linkWisata`
--
ALTER TABLE `linkWisata`
  ADD PRIMARY KEY (`idLinkWisata`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`);

--
-- Indexes for table `wisata`
--
ALTER TABLE `wisata`
  ADD PRIMARY KEY (`idWisata`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `galeri`
--
ALTER TABLE `galeri`
  MODIFY `idGaleri` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT for table `linkWisata`
--
ALTER TABLE `linkWisata`
  MODIFY `idLinkWisata` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `wisata`
--
ALTER TABLE `wisata`
  MODIFY `idWisata` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
