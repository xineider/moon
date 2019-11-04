-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 04-Nov-2019 às 04:44
-- Versão do servidor: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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

CREATE TABLE `banca` (
  `id` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `descricao` text NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `banca_caixa`
--

CREATE TABLE `banca_caixa` (
  `id` int(11) NOT NULL,
  `id_banca` int(11) NOT NULL,
  `valor` int(11) NOT NULL,
  `data` date NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `caixa`
--

CREATE TABLE `caixa` (
  `id` int(11) NOT NULL,
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
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
-- Estrutura da tabela `log`
--

CREATE TABLE `log` (
  `id` int(11) NOT NULL,
  `ip` varchar(50) NOT NULL,
  `method` varchar(50) NOT NULL,
  `rota` varchar(250) NOT NULL,
  `user_agent` text NOT NULL,
  `id_usuario` int(11) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
(15, '179.233.254.237', 'POST', '/sistema/administracao/usuarios/cadastrar', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 1, '2019-11-04 04:43:52');

-- --------------------------------------------------------

--
-- Estrutura da tabela `planos`
--

CREATE TABLE `planos` (
  `id` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `performance` int(11) NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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

CREATE TABLE `super_banca` (
  `id` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `super_banca_com_banca`
--

CREATE TABLE `super_banca_com_banca` (
  `id` int(11) NOT NULL,
  `id_super_banca` int(11) NOT NULL,
  `id_banca` int(11) NOT NULL,
  `deletado` int(11) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `super_banca_mes_banca`
--

CREATE TABLE `super_banca_mes_banca` (
  `id` int(11) NOT NULL,
  `id_super_banca_com_banca` int(11) NOT NULL,
  `mes` date NOT NULL,
  `porcentagem` int(11) NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `id_conector` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `senha` varchar(150) NOT NULL,
  `imagem` varchar(150) NOT NULL DEFAULT 'user-padrao.jpg',
  `nome` varchar(150) NOT NULL,
  `telefone` varchar(150) NOT NULL,
  `nivel` tinyint(1) NOT NULL DEFAULT '3' COMMENT '1 = admin, 2 = gerente, 3 = usuario',
  `hash_login` varchar(150) DEFAULT NULL COMMENT 'hash de login, para verificacao mais segura via ajax alterado a cada login',
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `id_conector`, `email`, `senha`, `imagem`, `nome`, `telefone`, `nivel`, `hash_login`, `deletado`, `data_cadastro`) VALUES
(1, 0, 'admin@admin.com.br', '745536f0652656dae49565e5fa26152b', 'user-padrao.jpg', 'Administrador', '00 00000 0000', 1, '5b1719e9681d75f9585d29c62e6a0078', 0, '2017-11-30 18:49:14'),
(2, 0, 'gerente@gerente.com.br', '745536f0652656dae49565e5fa26152b', 'user-padrao.jpg', 'Gerente', '00 00000 0000', 2, '2125c516247379df72abe007a2714996', 0, '2017-11-30 18:49:14'),
(3, 2, 'usuario@usuario.com.br', '745536f0652656dae49565e5fa26152b', 'user-padrao.jpg', 'Usuário', '00 00000 0000', 3, '2125c516247379df72abe007a2714996', 0, '2017-11-30 18:49:14');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios_planos`
--

CREATE TABLE `usuarios_planos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_plano` int(11) NOT NULL,
  `data_inicio` date DEFAULT NULL,
  `data_fim` date DEFAULT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuarios_planos`
--

INSERT INTO `usuarios_planos` (`id`, `id_usuario`, `id_plano`, `data_inicio`, `data_fim`, `deletado`, `data_cadastro`) VALUES
(1, 1, 3, '2019-08-05', '2020-08-05', 0, '2019-09-25 23:18:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banca`
--
ALTER TABLE `banca`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banca_caixa`
--
ALTER TABLE `banca_caixa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_banca` (`id_banca`);

--
-- Indexes for table `caixa`
--
ALTER TABLE `caixa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_plano` (`id_plano`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `planos`
--
ALTER TABLE `planos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `super_banca`
--
ALTER TABLE `super_banca`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `super_banca_com_banca`
--
ALTER TABLE `super_banca_com_banca`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_super_banca` (`id_super_banca`),
  ADD KEY `id_banca` (`id_banca`);

--
-- Indexes for table `super_banca_mes_banca`
--
ALTER TABLE `super_banca_mes_banca`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_super_banca` (`id_super_banca_com_banca`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_conector` (`id_conector`);

--
-- Indexes for table `usuarios_planos`
--
ALTER TABLE `usuarios_planos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_plano` (`id_plano`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banca`
--
ALTER TABLE `banca`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `banca_caixa`
--
ALTER TABLE `banca_caixa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `caixa`
--
ALTER TABLE `caixa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `planos`
--
ALTER TABLE `planos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `super_banca`
--
ALTER TABLE `super_banca`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `super_banca_com_banca`
--
ALTER TABLE `super_banca_com_banca`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `super_banca_mes_banca`
--
ALTER TABLE `super_banca_mes_banca`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `usuarios_planos`
--
ALTER TABLE `usuarios_planos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
