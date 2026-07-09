CREATE DATABASE  IF NOT EXISTS `digitaliza_plus` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `digitaliza_plus`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: digitaliza_plus
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `doacoes`
--

DROP TABLE IF EXISTS `doacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doacoes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `parceiro_id` bigint NOT NULL,
  `projeto_id` bigint DEFAULT NULL,
  `tipo_recurso` enum('EQUIPAMENTO','FINANCEIRO','INFRAESTRUTURA','CAPACITACAO') NOT NULL,
  `descricao` text,
  `quantidade` int DEFAULT '1',
  `valor` decimal(10,2) DEFAULT NULL,
  `data_doacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('PENDENTE','ENTREGUE','CANCELADO') DEFAULT 'PENDENTE',
  PRIMARY KEY (`id`),
  KEY `idx_parceiro` (`parceiro_id`),
  KEY `idx_projeto` (`projeto_id`),
  KEY `idx_tipo_recurso` (`tipo_recurso`),
  CONSTRAINT `doacoes_ibfk_1` FOREIGN KEY (`parceiro_id`) REFERENCES `parceiros` (`id`),
  CONSTRAINT `doacoes_ibfk_2` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doacoes`
--

LOCK TABLES `doacoes` WRITE;
/*!40000 ALTER TABLE `doacoes` DISABLE KEYS */;
INSERT INTO `doacoes` VALUES (1,1,NULL,'EQUIPAMENTO','10 computadores novos',10,15000.00,'2026-07-07 22:04:34','ENTREGUE'),(2,2,NULL,'INFRAESTRUTURA','Material para oficina de manutenção',1,5000.00,'2026-07-07 22:04:34','ENTREGUE'),(3,3,NULL,'CAPACITACAO','Curso de programação online',25,25000.00,'2026-07-07 22:04:34','PENDENTE');
/*!40000 ALTER TABLE `doacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matriculas`
--

DROP TABLE IF EXISTS `matriculas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matriculas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `usuario_id` bigint NOT NULL,
  `projeto_id` bigint NOT NULL,
  `data_inscricao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('INSCRITO','CONFIRMADO','CONCLUIDO','CANCELADO') DEFAULT 'INSCRITO',
  `avaliacao_projeto` decimal(3,2) DEFAULT NULL,
  `feedback` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_usuario_projeto` (`usuario_id`,`projeto_id`),
  KEY `idx_usuario` (`usuario_id`),
  KEY `idx_projeto` (`projeto_id`),
  KEY `idx_status` (`status`),
  CONSTRAINT `matriculas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `matriculas_ibfk_2` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matriculas`
--

LOCK TABLES `matriculas` WRITE;
/*!40000 ALTER TABLE `matriculas` DISABLE KEYS */;
/*!40000 ALTER TABLE `matriculas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parceiros`
--

DROP TABLE IF EXISTS `parceiros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parceiros` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `cnpj` varchar(18) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `site` varchar(150) DEFAULT NULL,
  `descricao` text,
  `status` enum('ATIVO','INATIVO') DEFAULT 'ATIVO',
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cnpj` (`cnpj`),
  KEY `idx_cnpj` (`cnpj`),
  KEY `idx_tipo` (`tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parceiros`
--

LOCK TABLES `parceiros` WRITE;
/*!40000 ALTER TABLE `parceiros` DISABLE KEYS */;
INSERT INTO `parceiros` VALUES (1,'Tech4All','12.345.678/0001-99','EMPRESA','Av. Paulista, 1000 - São Paulo','(11) 3333-4444','contato@tech4all.com',NULL,'Empresa de tecnologia doando equipamentos e conhecimento','ATIVO','2026-07-07 22:04:34'),(2,'Fundação Educar','98.765.432/0001-88','ONG','Rua da Educação, 200 - São Paulo','(11) 5555-6666','fundacao@educar.org',NULL,'ONG focada em educação e inclusão digital','ATIVO','2026-07-07 22:04:34'),(3,'Digitalize Brasil','45.678.123/0001-77','INSTITUTO','Av. Brasil, 300 - São Paulo','(11) 7777-8888','contato@digitalize.org',NULL,'Instituto de pesquisa e desenvolvimento tecnológico','ATIVO','2026-07-07 22:04:34');
/*!40000 ALTER TABLE `parceiros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pontos_inclusao`
--

DROP TABLE IF EXISTS `pontos_inclusao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pontos_inclusao` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `endereco` varchar(255) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `capacidade` int DEFAULT '20',
  `equipamentos` text,
  `contato` varchar(100) DEFAULT NULL,
  `horario_funcionamento` varchar(100) DEFAULT NULL,
  `status` enum('ATIVO','INATIVO','MANUTENCAO') DEFAULT 'ATIVO',
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`),
  KEY `idx_tipo` (`tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pontos_inclusao`
--

LOCK TABLES `pontos_inclusao` WRITE;
/*!40000 ALTER TABLE `pontos_inclusao` DISABLE KEYS */;
INSERT INTO `pontos_inclusao` VALUES (1,'Centro Digital Comunitário','Rua das Margaridas, 200 - Parque dos Pássaros','CENTRO COMUNITÁRIO',30,'10 Computadores, 2 Projetores','Marta Souza - (11) 98888-1234','Seg-Sex 9h-18h','ATIVO','2026-07-07 22:04:34'),(2,'Telecentro do Jardim Aurora','Av. das Flores, 789 - Jd. Aurora','TELECENTRO',20,'8 Computadores, 1 Impressora','Carlos Santos - (11) 97777-4321','Seg-Sab 8h-20h','ATIVO','2026-07-07 22:04:34'),(3,'Laboratório Municipal de Inclusão','Rua do Progresso, 55 - Centro','LABORATÓRIO',25,'15 Computadores, Internet 100MB','Paula Oliveira - (11) 96666-5678','Seg-Dom 9h-21h','ATIVO','2026-07-07 22:04:34'),(4,'Telecentro do Jardim Aurora','Av. das Flores, 789 - Jd. Aurora','TELECENTRO',20,'8 Computadores, 1 Impressora','Carlos Santos - (11) 97777-4321','Seg-Sab 8h-20h','ATIVO','2026-07-08 04:36:39');
/*!40000 ALTER TABLE `pontos_inclusao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projetos`
--

DROP TABLE IF EXISTS `projetos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projetos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) NOT NULL,
  `descricao` text NOT NULL,
  `localizacao` varchar(255) NOT NULL,
  `status` enum('PENDENTE','ATIVO','CONCLUIDO','CANCELADO') DEFAULT 'PENDENTE',
  `numero_vagas` int DEFAULT '10',
  `vagas_preenchidas` int DEFAULT '0',
  `data_inicio` date DEFAULT NULL,
  `data_fim` date DEFAULT NULL,
  `responsavel_id` bigint NOT NULL,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`),
  KEY `idx_responsavel` (`responsavel_id`),
  KEY `idx_datas` (`data_inicio`,`data_fim`),
  CONSTRAINT `projetos_ibfk_1` FOREIGN KEY (`responsavel_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projetos`
--

LOCK TABLES `projetos` WRITE;
/*!40000 ALTER TABLE `projetos` DISABLE KEYS */;
INSERT INTO `projetos` VALUES (5,'exemplo','exemplo','rua feliz da vida','ATIVO',10,0,'2026-07-05','2026-07-09',8,'2026-07-09 02:25:51','2026-07-09 02:25:59');
/*!40000 ALTER TABLE `projetos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `tipo_usuario` enum('COMUM','VOLUNTARIO','ADMIN') DEFAULT 'COMUM',
  `status` enum('ATIVO','INATIVO','BLOQUEADO') DEFAULT 'ATIVO',
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cpf` (`cpf`),
  KEY `idx_email` (`email`),
  KEY `idx_cpf` (`cpf`),
  KEY `idx_tipo` (`tipo_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (4,'Ana Paula','ana@email.com','senha123','444.444.444-44','(11) 96666-6666','Rua C, 789 - Parque das Flores','COMUM','ATIVO','2026-07-07 22:04:34','2026-07-07 22:04:34'),(5,'Carlos Lima','carlos@email.com','senha123','555.555.555-55','(11) 95555-5555','Rua D, 101 - Jd. América','COMUM','ATIVO','2026-07-07 22:04:34','2026-07-07 22:04:34'),(8,'gabriel','ga758161@gmail.com','123456','219.106.877-40','(21)96656-1786','rua feliz da silva','COMUM','ATIVO','2026-07-09 02:25:10','2026-07-09 02:25:10');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voluntarios`
--

DROP TABLE IF EXISTS `voluntarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voluntarios` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `usuario_id` bigint NOT NULL,
  `areas_atuacao` varchar(255) NOT NULL,
  `disponibilidade` varchar(100) DEFAULT NULL,
  `avaliacao` decimal(3,2) DEFAULT '0.00',
  `total_projetos` int DEFAULT '0',
  `biografia` text,
  `status` enum('DISPONIVEL','OCUPADO','INDISPONIVEL') DEFAULT 'DISPONIVEL',
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_usuario` (`usuario_id`),
  KEY `idx_status` (`status`),
  CONSTRAINT `voluntarios_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voluntarios`
--

LOCK TABLES `voluntarios` WRITE;
/*!40000 ALTER TABLE `voluntarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `voluntarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-08 20:49:27
