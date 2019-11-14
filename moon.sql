-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 14-Nov-2019 às 23:14
-- Versão do servidor: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `moon`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `banca`
--

DROP TABLE IF EXISTS `banca`;
CREATE TABLE IF NOT EXISTS `banca` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `descricao` text NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `banca_caixa`
--

DROP TABLE IF EXISTS `banca_caixa`;
CREATE TABLE IF NOT EXISTS `banca_caixa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_banca` int(11) NOT NULL,
  `valor` int(11) NOT NULL,
  `data` date NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_banca` (`id_banca`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `bancos`
--

DROP TABLE IF EXISTS `bancos`;
CREATE TABLE IF NOT EXISTS `bancos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cod` int(11) NOT NULL,
  `banco` text NOT NULL,
  `principal` tinyint(4) DEFAULT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=251 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `bancos`
--

INSERT INTO `bancos` (`id`, `cod`, `banco`, `principal`, `deletado`, `data_cadastro`) VALUES
(1, 1, '001 - BANCO DO BRASIL S/A', 1, 0, '2019-11-11 19:01:06'),
(2, 2, '002 - BANCO CENTRAL DO BRASIL', NULL, 0, '2019-11-11 19:01:06'),
(3, 3, '003 - BANCO DA AMAZONIA S.A', NULL, 0, '2019-11-11 19:01:06'),
(4, 4, '004 - BANCO DO NORDESTE DO BRASIL S.A', NULL, 0, '2019-11-11 19:01:06'),
(5, 7, '007 - BANCO NAC DESENV. ECO. SOCIAL S.A', NULL, 0, '2019-11-11 19:01:06'),
(6, 8, '008 - BANCO MERIDIONAL DO BRASIL', NULL, 0, '2019-11-11 19:01:06'),
(7, 20, '020 - BANCO DO ESTADO DE ALAGOAS S.A', NULL, 0, '2019-11-11 19:01:06'),
(8, 21, '021 - BANCO DO ESTADO DO ESPIRITO SANTO S.A', NULL, 0, '2019-11-11 19:01:06'),
(9, 22, '022 - BANCO DE CREDITO REAL DE MINAS GERAIS SA', NULL, 0, '2019-11-11 19:01:06'),
(10, 24, '024 - BANCO DO ESTADO DE PERNAMBUCO', NULL, 0, '2019-11-11 19:01:06'),
(11, 25, '025 - BANCO ALFA S/A', NULL, 0, '2019-11-11 19:01:06'),
(12, 26, '026 - BANCO DO ESTADO DO ACRE S.A', NULL, 0, '2019-11-11 19:01:06'),
(13, 27, '027 - BANCO DO ESTADO DE SANTA CATARINA S.A', NULL, 0, '2019-11-11 19:01:06'),
(14, 28, '028 - BANCO DO ESTADO DA BAHIA S.A', NULL, 0, '2019-11-11 19:01:06'),
(15, 29, '029 - BANCO DO ESTADO DO RIO DE JANEIRO S.A', NULL, 0, '2019-11-11 19:01:06'),
(16, 30, '030 - BANCO DO ESTADO DA PARAIBA S.A', NULL, 0, '2019-11-11 19:01:06'),
(17, 31, '031 - BANCO DO ESTADO DE GOIAS S.A', NULL, 0, '2019-11-11 19:01:06'),
(18, 32, '032 - BANCO DO ESTADO DO MATO GROSSO S.A.', NULL, 0, '2019-11-11 19:01:06'),
(19, 33, '033 - BANCO SANTANDER S.A', 1, 0, '2019-11-11 19:01:06'),
(20, 34, '034 - BANCO DO ESADO DO AMAZONAS S.A', NULL, 0, '2019-11-11 19:01:06'),
(21, 35, '035 - BANCO DO ESTADO DO CEARA S.A', NULL, 0, '2019-11-11 19:01:06'),
(22, 36, '036 - BANCO DO ESTADO DO MARANHAO S.A', NULL, 0, '2019-11-11 19:01:06'),
(23, 37, '037 - BANCO DO ESTADO DO PARA S.A', NULL, 0, '2019-11-11 19:01:06'),
(24, 38, '038 - BANCO DO ESTADO DO PARANA S.A', NULL, 0, '2019-11-11 19:01:06'),
(25, 39, '039 - BANCO DO ESTADO DO PIAUI S.A', NULL, 0, '2019-11-11 19:01:06'),
(26, 41, '041 - BANCO DO ESTADO DO RIO GRANDE DO SUL S.A', 1, 0, '2019-11-11 19:01:06'),
(27, 47, '047 - BANCO DO ESTADO DE SERGIPE S.A', NULL, 0, '2019-11-11 19:01:06'),
(28, 48, '048 - BANCO DO ESTADO DE MINAS GERAIS S.A', NULL, 0, '2019-11-11 19:01:06'),
(29, 59, '059 - BANCO DO ESTADO DE RONDONIA S.A', NULL, 0, '2019-11-11 19:01:06'),
(30, 70, '070 - BANCO DE BRASILIA S.A', NULL, 0, '2019-11-11 19:01:06'),
(31, 104, '104 - CAIXA ECONOMICA FEDERAL', 1, 0, '2019-11-11 19:01:06'),
(32, 106, '106 - BANCO ITABANCO S.A.', NULL, 0, '2019-11-11 19:01:06'),
(33, 107, '107 - BANCO BBM S.A', NULL, 0, '2019-11-11 19:01:06'),
(34, 109, '109 - BANCO CREDIBANCO S.A', NULL, 0, '2019-11-11 19:01:06'),
(35, 116, '116 - BANCO B.N.L DO BRASIL S.A', NULL, 0, '2019-11-11 19:01:06'),
(36, 148, '148 - MULTI BANCO S.A', NULL, 0, '2019-11-11 19:01:06'),
(37, 151, '151 - CAIXA ECONOMICA DO ESTADO DE SAO PAULO', NULL, 0, '2019-11-11 19:01:06'),
(38, 153, '153 - CAIXA ECONOMICA DO ESTADO DO R.G.SUL', NULL, 0, '2019-11-11 19:01:06'),
(39, 165, '165 - BANCO NORCHEM S.A', NULL, 0, '2019-11-11 19:01:06'),
(40, 166, '166 - BANCO INTER-ATLANTICO S.A', NULL, 0, '2019-11-11 19:01:06'),
(41, 168, '168 - BANCO C.C.F. BRASIL S.A', NULL, 0, '2019-11-11 19:01:06'),
(42, 175, '175 - CONTINENTAL BANCO S.A', NULL, 0, '2019-11-11 19:01:06'),
(43, 184, '184 - BBA - CREDITANSTALT S.A', NULL, 0, '2019-11-11 19:01:06'),
(44, 199, '199 - BANCO FINANCIAL PORTUGUES', NULL, 0, '2019-11-11 19:01:06'),
(45, 200, '200 - BANCO FRICRISA AXELRUD S.A', NULL, 0, '2019-11-11 19:01:06'),
(46, 201, '201 - BANCO AUGUSTA INDUSTRIA E COMERCIAL S.A', NULL, 0, '2019-11-11 19:01:06'),
(47, 204, '204 - BANCO S.R.L S.A', NULL, 0, '2019-11-11 19:01:06'),
(48, 205, '205 - BANCO SUL AMERICA S.A', NULL, 0, '2019-11-11 19:01:06'),
(49, 206, '206 - BANCO MARTINELLI S.A', NULL, 0, '2019-11-11 19:01:06'),
(50, 208, '208 - BANCO PACTUAL S.A', NULL, 0, '2019-11-11 19:01:06'),
(51, 210, '210 - DEUTSCH SUDAMERIKANICHE BANK AG', NULL, 0, '2019-11-11 19:01:06'),
(52, 211, '211 - BANCO SISTEMA S.A', NULL, 0, '2019-11-11 19:01:06'),
(53, 212, '212 - BANCO MATONE S.A', NULL, 0, '2019-11-11 19:01:06'),
(54, 213, '213 - BANCO ARBI S.A', NULL, 0, '2019-11-11 19:01:06'),
(55, 214, '214 - BANCO DIBENS S.A', NULL, 0, '2019-11-11 19:01:06'),
(56, 215, '215 - BANCO AMERICA DO SUL S.A', NULL, 0, '2019-11-11 19:01:06'),
(57, 216, '216 - BANCO REGIONAL MALCON S.A', NULL, 0, '2019-11-11 19:01:06'),
(58, 217, '217 - BANCO AGROINVEST S.A', NULL, 0, '2019-11-11 19:01:06'),
(59, 218, '218 - BBS - BANCO BONSUCESSO S.A.', NULL, 0, '2019-11-11 19:01:06'),
(60, 219, '219 - BANCO DE CREDITO DE SAO PAULO S.A', NULL, 0, '2019-11-11 19:01:06'),
(61, 220, '220 - BANCO CREFISUL', NULL, 0, '2019-11-11 19:01:06'),
(62, 221, '221 - BANCO GRAPHUS S.A', NULL, 0, '2019-11-11 19:01:06'),
(63, 222, '222 - BANCO AGF BRASIL S. A.', NULL, 0, '2019-11-11 19:01:06'),
(64, 223, '223 - BANCO INTERUNION S.A', NULL, 0, '2019-11-11 19:01:06'),
(65, 224, '224 - BANCO FIBRA S.A', NULL, 0, '2019-11-11 19:01:06'),
(66, 225, '225 - BANCO BRASCAN S.A', NULL, 0, '2019-11-11 19:01:06'),
(67, 228, '228 - BANCO ICATU S.A', NULL, 0, '2019-11-11 19:01:06'),
(68, 229, '229 - BANCO CRUZEIRO S.A', NULL, 0, '2019-11-11 19:01:06'),
(69, 230, '230 - BANCO BANDEIRANTES S.A', NULL, 0, '2019-11-11 19:01:06'),
(70, 231, '231 - BANCO BOAVISTA S.A', NULL, 0, '2019-11-11 19:01:06'),
(71, 232, '232 - BANCO INTERPART S.A', NULL, 0, '2019-11-11 19:01:06'),
(72, 233, '233 - BANCO MAPPIN S.A', NULL, 0, '2019-11-11 19:01:06'),
(73, 234, '234 - BANCO LAVRA S.A.', NULL, 0, '2019-11-11 19:01:06'),
(74, 235, '235 - BANCO LIBERAL S.A', NULL, 0, '2019-11-11 19:01:06'),
(75, 236, '236 - BANCO CAMBIAL S.A', NULL, 0, '2019-11-11 19:01:06'),
(76, 237, '237 - BANCO BRADESCO S.A', 1, 0, '2019-11-11 19:01:06'),
(77, 239, '239 - BANCO BANCRED S.A', NULL, 0, '2019-11-11 19:01:06'),
(78, 240, '240 - BANCO DE CREDITO REAL DE MINAS GERAIS S.', NULL, 0, '2019-11-11 19:01:06'),
(79, 241, '241 - BANCO CLASSICO S.A', NULL, 0, '2019-11-11 19:01:06'),
(80, 242, '242 - BANCO EUROINVEST S.A', NULL, 0, '2019-11-11 19:01:06'),
(81, 243, '243 - BANCO STOCK S.A', NULL, 0, '2019-11-11 19:01:06'),
(82, 244, '244 - BANCO CIDADE S.A', NULL, 0, '2019-11-11 19:01:06'),
(83, 245, '245 - BANCO EMPRESARIAL S.A', NULL, 0, '2019-11-11 19:01:06'),
(84, 246, '246 - BANCO ABC ROMA S.A', NULL, 0, '2019-11-11 19:01:06'),
(85, 247, '247 - BANCO OMEGA S.A', NULL, 0, '2019-11-11 19:01:06'),
(86, 249, '249 - BANCO INVESTCRED S.A', NULL, 0, '2019-11-11 19:01:06'),
(87, 250, '250 - BANCO SCHAHIN CURY S.A', NULL, 0, '2019-11-11 19:01:06'),
(88, 251, '251 - BANCO SAO JORGE S.A.', NULL, 0, '2019-11-11 19:01:06'),
(89, 252, '252 - BANCO FININVEST S.A', NULL, 0, '2019-11-11 19:01:06'),
(90, 254, '254 - BANCO PARANA BANCO S.A', NULL, 0, '2019-11-11 19:01:06'),
(91, 255, '255 - MILBANCO S.A.', NULL, 0, '2019-11-11 19:01:06'),
(92, 256, '256 - BANCO GULVINVEST S.A', NULL, 0, '2019-11-11 19:01:06'),
(93, 258, '258 - BANCO INDUSCRED S.A', NULL, 0, '2019-11-11 19:01:06'),
(94, 261, '261 - BANCO VARIG S.A', NULL, 0, '2019-11-11 19:01:06'),
(95, 262, '262 - BANCO BOREAL S.A', NULL, 0, '2019-11-11 19:01:06'),
(96, 263, '263 - BANCO CACIQUE', NULL, 0, '2019-11-11 19:01:06'),
(97, 264, '264 - BANCO PERFORMANCE S.A', NULL, 0, '2019-11-11 19:01:06'),
(98, 265, '265 - BANCO FATOR S.A', NULL, 0, '2019-11-11 19:01:06'),
(99, 266, '266 - BANCO CEDULA S.A', NULL, 0, '2019-11-11 19:01:06'),
(100, 267, '267 - BANCO BBM-COM.C.IMOB.CFI S.A.', NULL, 0, '2019-11-11 19:01:06'),
(101, 275, '275 - BANCO REAL S.A', NULL, 0, '2019-11-11 19:01:06'),
(102, 277, '277 - BANCO PLANIBANC S.A', NULL, 0, '2019-11-11 19:01:06'),
(103, 282, '282 - BANCO BRASILEIRO COMERCIAL', NULL, 0, '2019-11-11 19:01:06'),
(104, 291, '291 - BANCO DE CREDITO NACIONAL S.A', NULL, 0, '2019-11-11 19:01:06'),
(105, 294, '294 - BCR - BANCO DE CREDITO REAL S.A', NULL, 0, '2019-11-11 19:01:06'),
(106, 295, '295 - BANCO CREDIPLAN S.A', NULL, 0, '2019-11-11 19:01:06'),
(107, 300, '300 - BANCO DE LA NACION ARGENTINA S.A', NULL, 0, '2019-11-11 19:01:06'),
(108, 302, '302 - BANCO DO PROGRESSO S.A', NULL, 0, '2019-11-11 19:01:06'),
(109, 303, '303 - BANCO HNF S.A.', NULL, 0, '2019-11-11 19:01:06'),
(110, 304, '304 - BANCO PONTUAL S.A', NULL, 0, '2019-11-11 19:01:06'),
(111, 308, '308 - BANCO COMERCIAL BANCESA S.A.', NULL, 0, '2019-11-11 19:01:06'),
(112, 318, '318 - BANCO B.M.G. S.A', NULL, 0, '2019-11-11 19:01:06'),
(113, 320, '320 - BANCO INDUSTRIAL E COMERCIAL', NULL, 0, '2019-11-11 19:01:06'),
(114, 341, '341 - BANCO ITAU S.A', 1, 0, '2019-11-11 19:01:06'),
(115, 346, '346 - BANCO FRANCES E BRASILEIRO S.A', NULL, 0, '2019-11-11 19:01:06'),
(116, 347, '347 - BANCO SUDAMERIS BRASIL S.A', NULL, 0, '2019-11-11 19:01:06'),
(117, 351, '351 - BANCO BOZANO SIMONSEN S.A', NULL, 0, '2019-11-11 19:01:06'),
(118, 353, '353 - BANCO GERAL DO COMERCIO S.A', NULL, 0, '2019-11-11 19:01:06'),
(119, 356, '356 - ABN AMRO S.A', NULL, 0, '2019-11-11 19:01:06'),
(120, 366, '366 - BANCO SOGERAL S.A', NULL, 0, '2019-11-11 19:01:06'),
(121, 369, '369 - PONTUAL', NULL, 0, '2019-11-11 19:01:06'),
(122, 370, '370 - BEAL - BANCO EUROPEU PARA AMERICA LATINA', NULL, 0, '2019-11-11 19:01:06'),
(123, 372, '372 - BANCO ITAMARATI S.A', NULL, 0, '2019-11-11 19:01:06'),
(124, 375, '375 - BANCO FENICIA S.A', NULL, 0, '2019-11-11 19:01:06'),
(125, 376, '376 - CHASE MANHATTAN BANK S.A', NULL, 0, '2019-11-11 19:01:06'),
(126, 388, '388 - BANCO MERCANTIL DE DESCONTOS S/A', NULL, 0, '2019-11-11 19:01:06'),
(127, 389, '389 - BANCO MERCANTIL DO BRASIL S.A', NULL, 1, '2019-11-11 19:01:06'),
(128, 392, '392 - BANCO MERCANTIL DE SAO PAULO S.A', NULL, 0, '2019-11-11 19:01:06'),
(129, 394, '394 - BANCO B.M.C. S.A', NULL, 0, '2019-11-11 19:01:06'),
(130, 399, '399 - HSBC BANK BRASIL S.A', 1, 0, '2019-11-11 19:01:06'),
(131, 409, '409 - UNIBANCO - UNIAO DOS BANCOS BRASILEIROS', NULL, 0, '2019-11-11 19:01:06'),
(132, 412, '412 - BANCO NACIONAL DA BAHIA S.A', NULL, 0, '2019-11-11 19:01:06'),
(133, 415, '415 - BANCO NACIONAL S.A', NULL, 0, '2019-11-11 19:01:06'),
(134, 420, '420 - BANCO NACIONAL DO NORTE S.A', NULL, 0, '2019-11-11 19:01:06'),
(135, 422, '422 - BANCO SAFRA S.A', NULL, 0, '2019-11-11 19:01:06'),
(136, 424, '424 - BANCO NOROESTE S.A', NULL, 0, '2019-11-11 19:01:06'),
(137, 434, '434 - BANCO FORTALEZA S.A', NULL, 0, '2019-11-11 19:01:06'),
(138, 453, '453 - BANCO RURAL S.A', NULL, 0, '2019-11-11 19:01:06'),
(139, 456, '456 - BANCO TOKIO S.A', NULL, 0, '2019-11-11 19:01:06'),
(140, 464, '464 - BANCO SUMITOMO BRASILEIRO S.A', NULL, 0, '2019-11-11 19:01:06'),
(141, 466, '466 - BANCO MITSUBISHI BRASILEIRO S.A', NULL, 0, '2019-11-11 19:01:06'),
(142, 472, '472 - LLOYDS BANK PLC', NULL, 0, '2019-11-11 19:01:06'),
(143, 473, '473 - BANCO FINANCIAL PORTUGUES S.A', NULL, 0, '2019-11-11 19:01:06'),
(144, 477, '477 - CITIBANK N.A', 1, 0, '2019-11-11 19:01:06'),
(145, 479, '479 - BANCO DE BOSTON S.A', NULL, 0, '2019-11-11 19:01:06'),
(146, 480, '480 - BANCO PORTUGUES DO ATLANTICO-BRASIL S.A', NULL, 0, '2019-11-11 19:01:06'),
(147, 483, '483 - BANCO AGRIMISA S.A.', NULL, 0, '2019-11-11 19:01:06'),
(148, 487, '487 - DEUTSCHE BANK S.A - BANCO ALEMAO', NULL, 0, '2019-11-11 19:01:06'),
(149, 488, '488 - BANCO J. P. MORGAN S.A', NULL, 0, '2019-11-11 19:01:06'),
(150, 489, '489 - BANESTO BANCO URUGAUAY S.A', NULL, 0, '2019-11-11 19:01:06'),
(151, 492, '492 - INTERNATIONALE NEDERLANDEN BANK N.V.', NULL, 0, '2019-11-11 19:01:06'),
(152, 493, '493 - BANCO UNION S.A.C.A', NULL, 0, '2019-11-11 19:01:06'),
(153, 494, '494 - BANCO LA REP. ORIENTAL DEL URUGUAY', NULL, 0, '2019-11-11 19:01:06'),
(154, 495, '495 - BANCO LA PROVINCIA DE BUENOS AIRES', NULL, 0, '2019-11-11 19:01:06'),
(155, 496, '496 - BANCO EXTERIOR DE ESPANA S.A', NULL, 0, '2019-11-11 19:01:06'),
(156, 498, '498 - CENTRO HISPANO BANCO', NULL, 0, '2019-11-11 19:01:06'),
(157, 499, '499 - BANCO IOCHPE S.A', NULL, 0, '2019-11-11 19:01:06'),
(158, 501, '501 - BANCO BRASILEIRO IRAQUIANO S.A.', NULL, 0, '2019-11-11 19:01:06'),
(159, 502, '502 - BANCO SANTANDER S.A', NULL, 1, '2019-11-11 19:01:06'),
(160, 504, '504 - BANCO MULTIPLIC S.A', NULL, 0, '2019-11-11 19:01:06'),
(161, 505, '505 - BANCO GARANTIA S.A', NULL, 0, '2019-11-11 19:01:06'),
(162, 600, '600 - BANCO LUSO BRASILEIRO S.A', NULL, 0, '2019-11-11 19:01:06'),
(163, 601, '601 - BFC BANCO S.A.', NULL, 0, '2019-11-11 19:01:06'),
(164, 602, '602 - BANCO PATENTE S.A', NULL, 0, '2019-11-11 19:01:06'),
(165, 604, '604 - BANCO INDUSTRIAL DO BRASIL S.A', NULL, 0, '2019-11-11 19:01:06'),
(166, 607, '607 - BANCO SANTOS NEVES S.A', NULL, 0, '2019-11-11 19:01:06'),
(167, 608, '608 - BANCO OPEN S.A', NULL, 0, '2019-11-11 19:01:06'),
(168, 610, '610 - BANCO V.R. S.A', NULL, 0, '2019-11-11 19:01:06'),
(169, 611, '611 - BANCO PAULISTA S.A', NULL, 0, '2019-11-11 19:01:06'),
(170, 612, '612 - BANCO GUANABARA S.A', NULL, 0, '2019-11-11 19:01:06'),
(171, 613, '613 - BANCO PECUNIA S.A', NULL, 0, '2019-11-11 19:01:06'),
(172, 616, '616 - BANCO INTERPACIFICO S.A', NULL, 0, '2019-11-11 19:01:06'),
(173, 617, '617 - BANCO INVESTOR S.A.', NULL, 0, '2019-11-11 19:01:06'),
(174, 618, '618 - BANCO TENDENCIA S.A', NULL, 0, '2019-11-11 19:01:06'),
(175, 621, '621 - BANCO APLICAP S.A.', NULL, 0, '2019-11-11 19:01:06'),
(176, 622, '622 - BANCO DRACMA S.A', NULL, 0, '2019-11-11 19:01:06'),
(177, 623, '623 - BANCO PANAMERICANO S.A', NULL, 0, '2019-11-11 19:01:06'),
(178, 624, '624 - BANCO GENERAL MOTORS S.A', NULL, 0, '2019-11-11 19:01:06'),
(179, 625, '625 - BANCO ARAUCARIA S.A', NULL, 0, '2019-11-11 19:01:06'),
(180, 626, '626 - BANCO FICSA S.A', NULL, 0, '2019-11-11 19:01:06'),
(181, 627, '627 - BANCO DESTAK S.A', NULL, 0, '2019-11-11 19:01:06'),
(182, 628, '628 - BANCO CRITERIUM S.A', NULL, 0, '2019-11-11 19:01:06'),
(183, 629, '629 - BANCORP BANCO COML. E. DE INVESTMENTO', NULL, 0, '2019-11-11 19:01:06'),
(184, 630, '630 - BANCO INTERCAP S.A', NULL, 0, '2019-11-11 19:01:06'),
(185, 633, '633 - BANCO REDIMENTO S.A', NULL, 0, '2019-11-11 19:01:06'),
(186, 634, '634 - BANCO TRIANGULO S.A', NULL, 0, '2019-11-11 19:01:06'),
(187, 635, '635 - BANCO DO ESTADO DO AMAPA S.A', NULL, 0, '2019-11-11 19:01:06'),
(188, 637, '637 - BANCO SOFISA S.A', NULL, 0, '2019-11-11 19:01:06'),
(189, 638, '638 - BANCO PROSPER S.A', NULL, 0, '2019-11-11 19:01:06'),
(190, 639, '639 - BIG S.A. - BANCO IRMAOS GUIMARAES', NULL, 0, '2019-11-11 19:01:06'),
(191, 640, '640 - BANCO DE CREDITO METROPOLITANO S.A', NULL, 0, '2019-11-11 19:01:06'),
(192, 641, '641 - BANCO EXCEL ECONOMICO S/A', NULL, 0, '2019-11-11 19:01:06'),
(193, 643, '643 - BANCO SEGMENTO S.A', NULL, 0, '2019-11-11 19:01:06'),
(194, 645, '645 - BANCO DO ESTADO DE RORAIMA S.A', NULL, 0, '2019-11-11 19:01:06'),
(195, 647, '647 - BANCO MARKA S.A', NULL, 0, '2019-11-11 19:01:06'),
(196, 648, '648 - BANCO ATLANTIS S.A', NULL, 0, '2019-11-11 19:01:06'),
(197, 649, '649 - BANCO DIMENSAO S.A', NULL, 0, '2019-11-11 19:01:06'),
(198, 650, '650 - BANCO PEBB S.A', NULL, 0, '2019-11-11 19:01:06'),
(199, 652, '652 - ITÁU UNIBANCO HOLDING S.A.', NULL, 0, '2019-11-11 19:01:06'),
(200, 653, '653 - BANCO INDUSVAL S.A', NULL, 0, '2019-11-11 19:01:06'),
(201, 654, '654 - BANCO A. J. RENNER S.A', NULL, 0, '2019-11-11 19:01:06'),
(202, 655, '655 - BANCO VOTORANTIM S.A.', NULL, 0, '2019-11-11 19:01:06'),
(203, 656, '656 - BANCO MATRIX S.A', NULL, 0, '2019-11-11 19:01:06'),
(204, 657, '657 - BANCO TECNICORP S.A', NULL, 0, '2019-11-11 19:01:06'),
(205, 658, '658 - BANCO PORTO REAL S.A', NULL, 0, '2019-11-11 19:01:06'),
(206, 702, '702 - BANCO SANTOS S.A', NULL, 0, '2019-11-11 19:01:06'),
(207, 705, '705 - BANCO INVESTCORP S.A.', NULL, 0, '2019-11-11 19:01:06'),
(208, 707, '707 - BANCO DAYCOVAL S.A', NULL, 0, '2019-11-11 19:01:06'),
(209, 711, '711 - BANCO VETOR S.A.', NULL, 0, '2019-11-11 19:01:06'),
(210, 713, '713 - BANCO CINDAM S.A', NULL, 0, '2019-11-11 19:01:06'),
(211, 715, '715 - BANCO VEGA S.A', NULL, 0, '2019-11-11 19:01:06'),
(212, 718, '718 - BANCO OPERADOR S.A', NULL, 0, '2019-11-11 19:01:06'),
(213, 719, '719 - BANCO PRIMUS S.A', NULL, 0, '2019-11-11 19:01:06'),
(214, 720, '720 - BANCO MAXINVEST S.A', NULL, 0, '2019-11-11 19:01:06'),
(215, 721, '721 - BANCO CREDIBEL S.A', NULL, 0, '2019-11-11 19:01:06'),
(216, 722, '722 - BANCO INTERIOR DE SAO PAULO S.A', NULL, 0, '2019-11-11 19:01:06'),
(217, 724, '724 - BANCO PORTO SEGURO S.A', NULL, 0, '2019-11-11 19:01:06'),
(218, 725, '725 - BANCO FINABANCO S.A', NULL, 0, '2019-11-11 19:01:06'),
(219, 726, '726 - BANCO UNIVERSAL S.A', NULL, 0, '2019-11-11 19:01:06'),
(220, 728, '728 - BANCO FITAL S.A', NULL, 0, '2019-11-11 19:01:06'),
(221, 729, '729 - BANCO FONTE S.A', NULL, 0, '2019-11-11 19:01:06'),
(222, 730, '730 - BANCO COMERCIAL PARAGUAYO S.A', NULL, 0, '2019-11-11 19:01:06'),
(223, 731, '731 - BANCO GNPP S.A.', NULL, 0, '2019-11-11 19:01:06'),
(224, 732, '732 - BANCO PREMIER S.A.', NULL, 0, '2019-11-11 19:01:06'),
(225, 733, '733 - BANCO NACOES S.A.', NULL, 0, '2019-11-11 19:01:06'),
(226, 734, '734 - BANCO GERDAU S.A', NULL, 0, '2019-11-11 19:01:06'),
(227, 735, '735 - BACO POTENCIAL', NULL, 0, '2019-11-11 19:01:06'),
(228, 736, '736 - BANCO UNITED S.A', NULL, 0, '2019-11-11 19:01:06'),
(229, 737, '737 - THECA', NULL, 0, '2019-11-11 19:01:06'),
(230, 738, '738 - MARADA', NULL, 0, '2019-11-11 19:01:06'),
(231, 739, '739 - BGN', NULL, 0, '2019-11-11 19:01:06'),
(232, 740, '740 - BCN BARCLAYS', NULL, 0, '2019-11-11 19:01:06'),
(233, 741, '741 - BRP', NULL, 0, '2019-11-11 19:01:06'),
(234, 742, '742 - EQUATORIAL', NULL, 0, '2019-11-11 19:01:06'),
(235, 743, '743 - BANCO EMBLEMA S.A', NULL, 0, '2019-11-11 19:01:06'),
(236, 744, '744 - THE FIRST NATIONAL BANK OF BOSTON', NULL, 0, '2019-11-11 19:01:06'),
(237, 745, '745 - CITIBAN N.A.', NULL, 0, '2019-11-11 19:01:06'),
(238, 746, '746 - MODAL SA', NULL, 0, '2019-11-11 19:01:06'),
(239, 747, '747 - RAIBOBANK DO BRASIL', NULL, 0, '2019-11-11 19:01:06'),
(240, 748, '748 - SICREDI', 1, 0, '2019-11-11 19:01:06'),
(241, 749, '749 - BRMSANTIL SA', NULL, 0, '2019-11-11 19:01:06'),
(242, 750, '750 - BANCO REPUBLIC NATIONAL OF NEW YORK (BRA', NULL, 0, '2019-11-11 19:01:06'),
(243, 751, '751 - DRESDNER BANK LATEINAMERIKA-BRASIL S/A', NULL, 0, '2019-11-11 19:01:06'),
(244, 752, '752 - BANCO BANQUE NATIONALE DE PARIS BRASIL S', NULL, 0, '2019-11-11 19:01:06'),
(245, 753, '753 - BANCO COMERCIAL URUGUAI S.A.', NULL, 0, '2019-11-11 19:01:06'),
(246, 755, '755 - BANCO MERRILL LYNCH S.A', NULL, 0, '2019-11-11 19:01:06'),
(247, 756, '756 - BANCO COOPERATIVO DO BRASIL S.A.', NULL, 0, '2019-11-11 19:01:06'),
(248, 757, '757 - BANCO KEB DO BRASIL S.A.', NULL, 0, '2019-11-11 19:01:06'),
(249, 260, '260 - BANCO NUBANK', 1, 0, '2019-11-11 19:01:06'),
(250, 77, '077 - BANCO INTER', 1, 0, '2019-11-11 19:01:06');

-- --------------------------------------------------------

--
-- Estrutura da tabela `caixa`
--

DROP TABLE IF EXISTS `caixa`;
CREATE TABLE IF NOT EXISTS `caixa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_plano` int(11) NOT NULL,
  `id_conta_bancaria` int(11) DEFAULT NULL,
  `valor` double(13,2) DEFAULT NULL,
  `data` date DEFAULT NULL,
  `tipo` tinyint(1) NOT NULL COMMENT '0 - aporte, 1 - saque do aporte, 2 - rendimento, 3 - saque do rendimento, 4 - reaporte',
  `dia_confirmacao` date DEFAULT NULL,
  `confirmado` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0 - não confirmado, 1 - confirmado, 2 - negado',
  `arquivo` text,
  `status` text,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_plano` (`id_plano`),
  KEY `id_conta_bancaria` (`id_conta_bancaria`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `caixa`
--

INSERT INTO `caixa` (`id`, `id_usuario`, `id_plano`, `id_conta_bancaria`, `valor`, `data`, `tipo`, `dia_confirmacao`, `confirmado`, `arquivo`, `status`, `deletado`, `data_cadastro`) VALUES
(1, 1, 3, NULL, 10000.00, '2019-08-05', 0, NULL, 1, NULL, NULL, 0, '2019-09-25 22:42:57'),
(2, 1, 3, NULL, 100.00, '2019-08-25', 2, NULL, 1, NULL, NULL, 0, '2019-09-25 22:43:57'),
(3, 1, 3, NULL, 10100.00, '2019-09-05', 4, NULL, 1, NULL, NULL, 0, '2019-09-25 22:44:57'),
(4, 1, 3, NULL, 700.00, '2019-09-13', 0, NULL, 1, NULL, NULL, 0, '2019-09-25 22:45:57'),
(5, 1, 3, NULL, 476.00, '2019-09-25', 2, NULL, 1, NULL, NULL, 0, '2019-09-25 22:46:57'),
(6, 1, 1, NULL, 7000.00, '2019-10-07', 4, NULL, 1, NULL, NULL, 0, '2019-09-25 22:44:57'),
(7, 25, 3, NULL, 11276.00, '2019-11-01', 0, '2019-11-07', 0, 'argh', 'Comprovante Incorreto', 0, '2019-09-25 22:44:57'),
(8, 25, 3, NULL, 774.00, '2019-11-14', 1, '2019-11-07', 0, NULL, 'Entrar em contato com o Suporte', 0, '2019-09-25 22:44:57'),
(9, 1, 1, NULL, 50.00, '2019-11-02', 0, NULL, 0, NULL, NULL, 0, '2019-11-06 19:53:37'),
(10, 1, 1, NULL, 700.00, '2019-11-30', 4, NULL, 1, NULL, NULL, 0, '2019-11-06 20:19:02'),
(11, 1, 1, NULL, 50.00, '2019-11-10', 1, NULL, 1, NULL, NULL, 0, '2019-11-06 20:33:13'),
(12, 1, 1, NULL, 80.00, '2019-11-05', 2, '2019-11-15', 1, NULL, NULL, 0, '2019-11-08 15:35:21'),
(13, 1, 1, NULL, 80.00, '2019-11-16', 3, '2019-11-15', 2, NULL, NULL, 0, '2019-11-08 15:35:21'),
(14, 1, 1, NULL, 80.00, '2019-11-14', 3, '2019-11-15', 1, NULL, NULL, 0, '2019-11-08 15:35:21'),
(15, 1, 1, NULL, 1000.00, '2019-11-01', 0, '2019-11-15', 1, NULL, NULL, 0, '2019-11-08 15:35:21'),
(16, 1, 1, NULL, 75.67, '2019-11-03', 0, '2019-11-15', 2, NULL, NULL, 0, '2019-11-08 15:35:21'),
(17, 1, 1, NULL, 400.00, '2019-11-15', 1, '2019-11-15', 0, NULL, NULL, 0, '2019-11-08 15:35:21');

-- --------------------------------------------------------

--
-- Estrutura da tabela `conta_bancaria`
--

DROP TABLE IF EXISTS `conta_bancaria`;
CREATE TABLE IF NOT EXISTS `conta_bancaria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_banco` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `tipo_conta` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0 - conta corrente, 1 - conta poupança',
  `agencia` varchar(100) NOT NULL,
  `numero_conta` varchar(100) NOT NULL,
  `digito` tinyint(4) NOT NULL,
  `padrao` tinyint(4) DEFAULT NULL COMMENT '0 - padrao, 1 - não padrao',
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_banco` (`id_banco`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `conta_bancaria`
--

INSERT INTO `conta_bancaria` (`id`, `id_banco`, `id_usuario`, `tipo_conta`, `agencia`, `numero_conta`, `digito`, `padrao`, `deletado`, `data_cadastro`) VALUES
(1, 1, 1, 0, '12312312', '11', 11, 0, 0, '2019-11-12 00:17:56'),
(2, 250, 1, 0, '1312312', '12312', 12, 1, 1, '2019-11-12 00:35:17'),
(3, 12, 1, 1, 'teste', '2311', 11, 1, 0, '2019-11-12 15:44:57');

-- --------------------------------------------------------

--
-- Estrutura da tabela `log`
--

DROP TABLE IF EXISTS `log`;
CREATE TABLE IF NOT EXISTS `log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(50) NOT NULL,
  `method` varchar(50) NOT NULL,
  `rota` varchar(250) NOT NULL,
  `user_agent` text NOT NULL,
  `id_usuario` int(11) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=85 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `log`
--

INSERT INTO `log` (`id`, `ip`, `method`, `rota`, `user_agent`, `id_usuario`, `data_cadastro`) VALUES
(1, '179.233.254.237', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-04 04:07:26'),
(2, '179.233.254.237', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-04 04:13:47'),
(3, '179.233.254.237', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-04 04:15:24'),
(4, '179.233.254.237', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-04 04:16:42'),
(5, '179.233.254.237', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-04 04:17:28'),
(6, '179.233.254.237', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-04 04:22:59'),
(7, '179.233.254.237', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-04 04:31:44'),
(8, '179.233.254.237', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-04 04:32:54'),
(9, '179.233.254.237', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-04 04:33:16'),
(10, '179.233.254.237', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-04 04:34:16'),
(11, '179.233.254.237', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-04 04:34:52'),
(12, '179.233.254.237', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-04 04:39:50'),
(13, '179.233.254.237', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-04 04:40:00'),
(14, '179.233.254.237', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-04 04:40:56'),
(15, '179.233.254.237', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-04 04:43:52'),
(16, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-04 21:13:59'),
(17, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-04 21:29:47'),
(18, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/alterar-senha', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 17:30:46'),
(19, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/alterar-senha', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 18:05:52'),
(20, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 18:27:11'),
(21, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 18:27:25'),
(22, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 18:27:58'),
(23, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 18:28:08'),
(24, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 18:28:15'),
(25, '200.182.181.4', 'POST', '/sistema/administracao/caixa/desativar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 20:56:06'),
(26, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/desativar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 20:56:32'),
(27, '200.182.181.4', 'POST', '/sistema/administracao/caixa/desativar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 21:18:33'),
(28, '200.182.181.4', 'POST', '/sistema/administracao/caixa/desativar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 21:19:19'),
(29, '200.182.181.4', 'POST', '/sistema/administracao/caixa/desativar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 21:19:49'),
(30, '200.182.181.4', 'POST', '/sistema/administracao/caixa/desativar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 21:24:29'),
(31, '200.182.181.4', 'POST', '/sistema/administracao/caixa/desativar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 21:24:47'),
(32, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 21:25:22'),
(33, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 21:27:28'),
(34, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 21:28:01'),
(35, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 21:29:07'),
(36, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 21:29:26'),
(37, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/desativar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 21:29:35'),
(38, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/desativar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 21:30:31'),
(39, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/alterar-senha', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 21:30:36'),
(40, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 21:31:17'),
(41, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/desativar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 21:32:24'),
(42, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 21:32:39'),
(43, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/desativar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 21:42:09'),
(44, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 21:42:20'),
(45, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/alterar-senha', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 21:42:28'),
(46, '200.182.181.4', 'POST', '/sistema/administracao/usuarios/desativar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-05 21:44:55'),
(47, '200.182.181.4', 'POST', '/sistema/administracao/plano/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-06 00:16:58'),
(48, '200.182.181.4', 'POST', '/sistema/administracao/plano/desativar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-06 00:18:04'),
(49, '200.182.181.4', 'POST', '/sistema/administracao/caixa/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-06 19:53:38'),
(50, '200.182.181.4', 'POST', '/sistema/administracao/caixa/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-06 20:19:02'),
(51, '200.182.181.4', 'POST', '/sistema/administracao/caixa/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-06 20:33:08'),
(52, '200.182.181.4', 'POST', '/sistema/administracao/caixa/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-06 20:33:13'),
(53, '200.182.181.4', 'POST', '/sistema/administracao/caixa/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-06 20:49:40'),
(54, '200.182.181.4', 'POST', '/sistema/administracao/caixa/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-06 20:49:47'),
(55, '200.182.181.4', 'POST', '/sistema/administracao/caixa/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-06 20:49:55'),
(56, '200.182.181.4', 'POST', '/sistema/administracao/caixa/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-06 20:50:01'),
(57, '200.182.181.4', 'POST', '/sistema/administracao/caixa/desativar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-06 20:50:34'),
(58, '200.182.181.4', 'POST', '/sistema/administracao/plano/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-06 21:26:44'),
(59, '200.182.181.4', 'POST', '/sistema/administracao/plano/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-06 21:26:51'),
(60, '200.182.181.4', 'POST', '/sistema/administracao/pedido-aporte/negar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36', 1, '2019-11-07 00:07:52'),
(61, '200.182.181.4', 'POST', '/sistema/administracao/pedido-aporte/negar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-07 18:08:30'),
(62, '200.182.181.4', 'POST', '/sistema/administracao/pedido-aporte/aprovar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-07 19:05:00'),
(63, '200.182.181.4', 'POST', '/sistema/administracao/pedido-saque/negar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-07 20:05:47'),
(64, '200.182.181.4', 'POST', '/sistema/administracao/pedido-saque/aprovar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-07 20:13:13'),
(65, '200.182.181.4', 'POST', '/sistema/meus_dados/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-11 18:58:17'),
(66, '200.182.181.4', 'POST', '/sistema/meus_dados/conta_bancaria/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-12 00:17:57'),
(67, '200.182.181.4', 'POST', '/sistema/meus_dados/conta_bancaria/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-12 00:35:18'),
(68, '200.182.181.4', 'POST', '/sistema/meus_dados/conta_bancaria/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36', 1, '2019-11-12 15:43:01'),
(69, '200.182.181.4', 'POST', '/sistema/meus_dados/conta_bancaria/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36', 1, '2019-11-12 15:44:58'),
(70, '200.182.181.4', 'POST', '/sistema/meus_dados/conta_bancaria/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36', 1, '2019-11-12 15:46:23'),
(71, '200.182.181.4', 'POST', '/sistema/meus_dados/conta_bancaria/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36', 1, '2019-11-12 15:46:44'),
(72, '200.182.181.4', 'POST', '/sistema/meus_dados/conta_bancaria/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36', 1, '2019-11-12 15:48:49'),
(73, '200.182.181.4', 'POST', '/sistema/meus_dados/conta_bancaria/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36', 1, '2019-11-12 15:49:06'),
(74, '200.182.181.4', 'POST', '/sistema/meus_dados/conta_bancaria/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36', 1, '2019-11-12 15:50:20'),
(75, '200.182.181.4', 'POST', '/sistema/meus_dados/conta_bancaria/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36', 1, '2019-11-12 15:50:59'),
(76, '200.182.181.4', 'POST', '/sistema/meus_dados/conta_bancaria/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36', 1, '2019-11-12 15:51:21'),
(77, '200.182.181.4', 'POST', '/sistema/meus_dados/conta_bancaria/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36', 1, '2019-11-12 15:55:02'),
(78, '200.182.181.4', 'POST', '/sistema/meus_dados/conta_bancaria/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36', 1, '2019-11-12 15:57:15'),
(79, '200.182.181.4', 'POST', '/sistema/meus_dados/conta_bancaria/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36', 1, '2019-11-12 15:57:18'),
(80, '200.182.181.4', 'POST', '/sistema/meus_dados/conta_bancaria/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36', 1, '2019-11-12 15:57:21'),
(81, '200.182.181.4', 'POST', '/sistema/meus_dados/conta_bancaria/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36', 1, '2019-11-12 15:57:25'),
(82, '200.182.181.4', 'POST', '/sistema/meus_dados/conta_bancaria/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36', 1, '2019-11-12 15:57:29'),
(83, '200.182.181.4', 'POST', '/sistema/meus_dados/conta_bancaria/desativar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36', 1, '2019-11-12 16:00:10'),
(84, '200.182.181.4', 'POST', '/sistema/meus_dados/conta_bancaria/atualizar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36', 1, '2019-11-12 21:07:41');

-- --------------------------------------------------------

--
-- Estrutura da tabela `planos`
--

DROP TABLE IF EXISTS `planos`;
CREATE TABLE IF NOT EXISTS `planos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `performance` int(11) NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `planos`
--

INSERT INTO `planos` (`id`, `nome`, `performance`, `deletado`, `data_cadastro`) VALUES
(1, '03 Meses', 25, 0, '2019-03-12 19:37:56'),
(2, '06 Meses', 35, 0, '2019-03-12 19:37:56'),
(3, '12 Meses', 60, 0, '2019-03-12 19:37:56'),
(6, 'Geronimo', 21, 1, '2019-11-06 00:16:58');

-- --------------------------------------------------------

--
-- Estrutura da tabela `super_banca`
--

DROP TABLE IF EXISTS `super_banca`;
CREATE TABLE IF NOT EXISTS `super_banca` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `super_banca_com_banca`
--

DROP TABLE IF EXISTS `super_banca_com_banca`;
CREATE TABLE IF NOT EXISTS `super_banca_com_banca` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_super_banca` int(11) NOT NULL,
  `id_banca` int(11) NOT NULL,
  `deletado` int(11) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_super_banca` (`id_super_banca`),
  KEY `id_banca` (`id_banca`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `super_banca_mes_banca`
--

DROP TABLE IF EXISTS `super_banca_mes_banca`;
CREATE TABLE IF NOT EXISTS `super_banca_mes_banca` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_super_banca_com_banca` int(11) NOT NULL,
  `mes` date NOT NULL,
  `porcentagem` int(11) NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_super_banca` (`id_super_banca_com_banca`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_conector` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `senha` varchar(150) NOT NULL,
  `imagem` varchar(150) NOT NULL DEFAULT 'user-padrao.jpg',
  `nome` varchar(150) NOT NULL,
  `telefone` varchar(150) NOT NULL,
  `nivel` tinyint(1) NOT NULL DEFAULT '3' COMMENT '1 = admin, 2 = gerente, 3 = usuario',
  `hash_login` varchar(150) DEFAULT NULL COMMENT 'hash de login, para verificacao mais segura via ajax alterado a cada login',
  `carteira` text,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_conector` (`id_conector`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `id_conector`, `email`, `senha`, `imagem`, `nome`, `telefone`, `nivel`, `hash_login`, `carteira`, `deletado`, `data_cadastro`) VALUES
(1, 0, 'admin@admin.com.br', '745536f0652656dae49565e5fa26152b', 'user-padrao.jpg', 'Administrador', '00 00000 00001', 1, 'ccf9b3d6a35a5e49a2ed73326cf66bd2', NULL, 0, '2017-11-30 18:49:14'),
(2, 0, 'gerente@gerente.com.br', '745536f0652656dae49565e5fa26152b', 'user-padrao.jpg', 'Gerente', '00 00000 0000', 2, '2125c516247379df72abe007a2714996', NULL, 0, '2017-11-30 18:49:14'),
(3, 2, 'leandro@usuario.com.br', '745536f0652656dae49565e5fa26152b', 'user-padrao.jpg', 'Leandro', '(00) 00000-0000', 3, 'a1e071e70d7817adb97564febe452aa0', NULL, 0, '2017-11-30 18:49:14'),
(25, 2, 'sidnei@adasd', '2205bf28623b1535a81936fb4245f05f', 'user-padrao.jpg', 'Sidnei', '(01) 30213-1232', 3, NULL, '123123123123', 0, '2019-11-04 21:13:59'),
(26, 0, 'aaaaaaaaaaah@teste.com.br', '9fd58dfca22678c63da7c52656b5b712', 'user-padrao.jpg', 'Julio', '(20) 31123-2130', 2, NULL, NULL, 0, '2019-11-04 21:29:46'),
(27, 2, 'alo@teste.com.br', 'b2f1c0ebdec6a694fa12e65efc99da21', 'user-padrao.jpg', 'Cintia', '(31) 23123-1231', 3, NULL, NULL, 0, '2019-11-05 21:25:22'),
(28, 2, 'junioer@gmaisdoa', '54e5c8f1b5ae7bae18c1a42485cad3ab', 'user-padrao.jpg', 'Junior', '(92) 01312-3123', 3, NULL, NULL, 0, '2019-11-05 21:27:28'),
(29, 2, 'teste@asodpas', '88d966a78fa2403dc437004b007f1b56', 'user-padrao.jpg', 'Alessandro', '(21) 31231-2312', 3, NULL, NULL, 0, '2019-11-05 21:28:01'),
(30, 2, 'qweqweqw', 'dfb0102d26c04b3b0a1d94f8b903fe56', 'user-padrao.jpg', 'qweqwe', '(21) 31231-2323', 3, NULL, NULL, 1, '2019-11-05 21:29:06'),
(31, 2, '213123123', 'bed1a17ca7007d4fa0c9f53a94575cd1', 'user-padrao.jpg', '3123123123', '(23) 12312-1312', 3, NULL, NULL, 1, '2019-11-05 21:29:26'),
(32, 2, '213123123123', '50deeb433a49d58645caa70352b2fd19', 'user-padrao.jpg', '12312312312', '(12) 31231-2312', 3, NULL, NULL, 1, '2019-11-05 21:31:16'),
(33, 2, '123123123123', 'e47e65df9163e3b58ad37f87586b2df0', 'user-padrao.jpg', '123123123', '(12) 31231-2312', 3, NULL, NULL, 1, '2019-11-05 21:32:37'),
(34, 2, 'teste@gmail.com', 'df4819b87652468a44ad3a77e7855f48', 'user-padrao.jpg', '21903019230129', '(21) 93012-3129', 3, NULL, NULL, 1, '2019-11-05 21:42:20');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios_planos`
--

DROP TABLE IF EXISTS `usuarios_planos`;
CREATE TABLE IF NOT EXISTS `usuarios_planos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_plano` int(11) NOT NULL,
  `data_inicio` date DEFAULT NULL,
  `data_fim` date DEFAULT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_plano` (`id_plano`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuarios_planos`
--

INSERT INTO `usuarios_planos` (`id`, `id_usuario`, `id_plano`, `data_inicio`, `data_fim`, `deletado`, `data_cadastro`) VALUES
(1, 1, 3, '2019-08-05', '2020-08-05', 0, '2019-09-25 23:18:00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
