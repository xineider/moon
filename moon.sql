-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 01-Nov-2019 às 22:16
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
-- Estrutura da tabela `caixa`
--

DROP TABLE IF EXISTS `caixa`;
CREATE TABLE IF NOT EXISTS `caixa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_plano` int(11) NOT NULL,
  `valor` double(13,2) DEFAULT NULL,
  `data` date NOT NULL,
  `tipo` tinyint(1) NOT NULL COMMENT '0 - aporte, 1 - saque do aporte, 2 - rendimento, 3 - saque do rendimento, 4 - reaporte',
  `operacao` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0 - soma , 1 - diminucao',
  `confirmado` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0 - não confirmado, 1 - confirmado, 2 - negado',
  `carteira` text,
  `arquivo` text,
  `status` text,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_plano` (`id_plano`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `caixa`
--

INSERT INTO `caixa` (`id`, `id_usuario`, `id_plano`, `valor`, `data`, `tipo`, `operacao`, `confirmado`, `carteira`, `arquivo`, `status`, `deletado`, `data_cadastro`) VALUES
(1, 1, 3, 10000.00, '2019-08-05', 0, 0, 1, NULL, NULL, NULL, 0, '2019-09-25 22:42:57'),
(2, 1, 3, 100.00, '2019-08-25', 2, 0, 1, NULL, NULL, NULL, 0, '2019-09-25 22:43:57'),
(3, 1, 3, 10100.00, '2019-09-05', 4, 0, 1, NULL, NULL, NULL, 0, '2019-09-25 22:44:57'),
(4, 1, 3, 700.00, '2019-09-13', 0, 0, 1, NULL, NULL, NULL, 0, '2019-09-25 22:45:57'),
(5, 1, 3, 476.00, '2019-09-25', 2, 0, 1, NULL, NULL, NULL, 0, '2019-09-25 22:46:57'),
(6, 1, 3, 11276.00, '2019-10-05', 4, 0, 1, NULL, NULL, NULL, 0, '2019-09-25 22:44:57');

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
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `planos`
--

INSERT INTO `planos` (`id`, `nome`, `performance`, `deletado`, `data_cadastro`) VALUES
(1, '03 Meses', 25, 0, '2019-03-12 19:37:56'),
(2, '06 Meses', 35, 0, '2019-03-12 19:37:56'),
(3, '12 Meses', 60, 0, '2019-03-12 19:37:56');

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
  `nivel` tinyint(1) NOT NULL COMMENT '1 = admin, 2 = gerente, 3 = usuario',
  `hash_login` varchar(150) NOT NULL COMMENT 'hash de login, para verificacao mais segura via ajax alterado a cada login',
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_conector` (`id_conector`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `id_conector`, `email`, `senha`, `imagem`, `nome`, `telefone`, `nivel`, `hash_login`, `deletado`, `data_cadastro`) VALUES
(1, 0, 'admin@admin.com.br', '745536f0652656dae49565e5fa26152b', 'user-padrao.jpg', 'Administrador', '00 00000 0000', 1, 'f8ec7d567e7621209fa4321b05a8cc6c', 0, '2017-11-30 18:49:14'),
(2, 0, 'gerente@gerente.com.br', '745536f0652656dae49565e5fa26152b', 'user-padrao.jpg', 'Gerente', '00 00000 0000', 2, '2125c516247379df72abe007a2714996', 0, '2017-11-30 18:49:14'),
(3, 0, 'usuario@usuario.com.br', '745536f0652656dae49565e5fa26152b', 'user-padrao.jpg', 'Usuário', '00 00000 0000', 3, '2125c516247379df72abe007a2714996', 0, '2017-11-30 18:49:14');

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
