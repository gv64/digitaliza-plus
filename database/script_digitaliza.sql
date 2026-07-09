-- ============================================================
-- SISTEMA DIGITALIZA+ - PLATAFORMA DE INCLUSÃO DIGITAL
-- ODS 9 - INDÚSTRIA, INOVAÇÃO E INFRAESTRUTURA
-- ============================================================

-- 1. CRIAR O BANCO DE DADOS
-- ============================================================
CREATE DATABASE IF NOT EXISTS digitaliza_plus;
USE digitaliza_plus;

-- ============================================================
-- 2. TABELA DE USUÁRIOS
-- ============================================================
CREATE TABLE usuarios (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    tipo_usuario ENUM('COMUM', 'VOLUNTARIO', 'ADMIN') DEFAULT 'COMUM',
    status ENUM('ATIVO', 'INATIVO', 'BLOQUEADO') DEFAULT 'ATIVO',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_cpf (cpf),
    INDEX idx_tipo (tipo_usuario)
);

-- ============================================================
-- 3. TABELA DE VOLUNTÁRIOS (EXTENSÃO DOS USUÁRIOS)
-- ============================================================
CREATE TABLE voluntarios (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    areas_atuacao VARCHAR(255) NOT NULL,
    disponibilidade VARCHAR(100),
    avaliacao DECIMAL(3,2) DEFAULT 0.00,
    total_projetos INT DEFAULT 0,
    biografia TEXT,
    status ENUM('DISPONIVEL', 'OCUPADO', 'INDISPONIVEL') DEFAULT 'DISPONIVEL',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_usuario (usuario_id),
    INDEX idx_status (status)
);

-- ============================================================
-- 4. TABELA DE PROJETOS
-- ============================================================
CREATE TABLE projetos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    localizacao VARCHAR(255) NOT NULL,
    status ENUM('PENDENTE', 'ATIVO', 'CONCLUIDO', 'CANCELADO') DEFAULT 'PENDENTE',
    numero_vagas INT DEFAULT 10,
    vagas_preenchidas INT DEFAULT 0,
    data_inicio DATE,
    data_fim DATE,
    responsavel_id BIGINT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (responsavel_id) REFERENCES usuarios(id),
    INDEX idx_status (status),
    INDEX idx_responsavel (responsavel_id),
    INDEX idx_datas (data_inicio, data_fim)
);

-- ============================================================
-- 5. TABELA DE PONTOS DE INCLUSÃO
-- ============================================================
CREATE TABLE pontos_inclusao (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    capacidade INT DEFAULT 20,
    equipamentos TEXT,
    contato VARCHAR(100),
    horario_funcionamento VARCHAR(100),
    status ENUM('ATIVO', 'INATIVO', 'MANUTENCAO') DEFAULT 'ATIVO',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_tipo (tipo)
);

-- ============================================================
-- 6. TABELA DE MATRÍCULAS (USUÁRIOS EM PROJETOS)
-- ============================================================
CREATE TABLE matriculas (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    projeto_id BIGINT NOT NULL,
    data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('INSCRITO', 'CONFIRMADO', 'CONCLUIDO', 'CANCELADO') DEFAULT 'INSCRITO',
    avaliacao_projeto DECIMAL(3,2),
    feedback TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (projeto_id) REFERENCES projetos(id),
    UNIQUE KEY uk_usuario_projeto (usuario_id, projeto_id),
    INDEX idx_usuario (usuario_id),
    INDEX idx_projeto (projeto_id),
    INDEX idx_status (status)
);

-- ============================================================
-- 7. TABELA DE PARCEIROS (EMPRESAS/ONGs)
-- ============================================================
CREATE TABLE parceiros (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    tipo VARCHAR(50) NOT NULL,
    endereco VARCHAR(255),
    telefone VARCHAR(20),
    email VARCHAR(100),
    site VARCHAR(150),
    descricao TEXT,
    status ENUM('ATIVO', 'INATIVO') DEFAULT 'ATIVO',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_cnpj (cnpj),
    INDEX idx_tipo (tipo)
);

-- ============================================================
-- 8. TABELA DE DOAÇÕES (RECURSOS DOS PARCEIROS)
-- ============================================================
CREATE TABLE doacoes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    parceiro_id BIGINT NOT NULL,
    projeto_id BIGINT,
    tipo_recurso ENUM('EQUIPAMENTO', 'FINANCEIRO', 'INFRAESTRUTURA', 'CAPACITACAO') NOT NULL,
    descricao TEXT,
    quantidade INT DEFAULT 1,
    valor DECIMAL(10,2),
    data_doacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('PENDENTE', 'ENTREGUE', 'CANCELADO') DEFAULT 'PENDENTE',
    FOREIGN KEY (parceiro_id) REFERENCES parceiros(id),
    FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE SET NULL,
    INDEX idx_parceiro (parceiro_id),
    INDEX idx_projeto (projeto_id),
    INDEX idx_tipo_recurso (tipo_recurso)
);

-- ============================================================
-- 9. INSERTS DE DADOS DE EXEMPLO
-- ============================================================

-- USUÁRIOS ADMIN
INSERT INTO usuarios (nome, email, senha, cpf, telefone, endereco, tipo_usuario) VALUES
('Administrador Sistema', 'admin@digitaliza.com', 'admin123', '111.111.111-11', '(11) 99999-9999', 'Rua Admin, 123 - Centro', 'ADMIN');

-- USUÁRIOS COMUNS (ALUNOS)
INSERT INTO usuarios (nome, email, senha, cpf, telefone, endereco, tipo_usuario) VALUES
('Maria Silva', 'maria@email.com', 'senha123', '222.222.222-22', '(11) 98888-8888', 'Rua A, 123 - Jd. São Paulo', 'COMUM'),
('João Santos', 'joao@email.com', 'senha123', '333.333.333-33', '(11) 97777-7777', 'Rua B, 456 - Vila Nova', 'COMUM'),
('Ana Paula', 'ana@email.com', 'senha123', '444.444.444-44', '(11) 96666-6666', 'Rua C, 789 - Parque das Flores', 'COMUM'),
('Carlos Lima', 'carlos@email.com', 'senha123', '555.555.555-55', '(11) 95555-5555', 'Rua D, 101 - Jd. América', 'COMUM');

-- VOLUNTÁRIOS
INSERT INTO usuarios (nome, email, senha, cpf, telefone, endereco, tipo_usuario) VALUES
('Roberto Silva', 'roberto@voluntario.com', 'senha123', '666.666.666-66', '(11) 94444-4444', 'Rua E, 202 - Centro', 'VOLUNTARIO'),
('Fernanda Costa', 'fernanda@voluntario.com', 'senha123', '777.777.777-77', '(11) 93333-3333', 'Rua F, 303 - Jd. Paulista', 'VOLUNTARIO');

-- DETALHES DOS VOLUNTÁRIOS
INSERT INTO voluntarios (usuario_id, areas_atuacao, disponibilidade, biografia) VALUES
(6, 'Informática Básica, Manutenção de Computadores', 'Segunda a Sexta - Tarde', 'Profissional de TI com 5 anos de experiência em projetos sociais'),
(7, 'Programação Web, Design, Inglês', 'Finais de Semana - Manhã', 'Desenvolvedora apaixonada por educação e inclusão digital');

-- PROJETOS
INSERT INTO projetos (titulo, descricao, localizacao, status, numero_vagas, data_inicio, data_fim, responsavel_id) VALUES
('Curso de Informática Básica', 'Curso gratuito de informática básica para moradores da comunidade', 'Rua das Acácias, 150 - Vila Esperança', 'ATIVO', 20, '2026-07-15', '2026-09-15', 1),
('Manutenção de Computadores', 'Oficina de manutenção e recuperação de computadores', 'Centro Comunitário - Av. Principal, 500', 'ATIVO', 15, '2026-07-20', '2026-08-20', 1),
('Programação para Iniciantes', 'Introdução à programação web para jovens', 'SENAI - Rua da Tecnologia, 1000', 'PENDENTE', 25, '2026-08-01', '2026-10-01', 1);

-- PONTOS DE INCLUSÃO
INSERT INTO pontos_inclusao (nome, endereco, tipo, capacidade, equipamentos, contato, horario_funcionamento) VALUES
('Centro Digital Comunitário', 'Rua das Margaridas, 200 - Parque dos Pássaros', 'CENTRO COMUNITÁRIO', 30, '10 Computadores, 2 Projetores', 'Marta Souza - (11) 98888-1234', 'Seg-Sex 9h-18h'),
('Telecentro do Jardim Aurora', 'Av. das Flores, 789 - Jd. Aurora', 'TELECENTRO', 20, '8 Computadores, 1 Impressora', 'Carlos Santos - (11) 97777-4321', 'Seg-Sab 8h-20h'),
('Laboratório Municipal de Inclusão', 'Rua do Progresso, 55 - Centro', 'LABORATÓRIO', 25, '15 Computadores, Internet 100MB', 'Paula Oliveira - (11) 96666-5678', 'Seg-Dom 9h-21h');

-- PARCEIROS
INSERT INTO parceiros (nome, cnpj, tipo, endereco, telefone, email, descricao) VALUES
('Tech4All', '12.345.678/0001-99', 'EMPRESA', 'Av. Paulista, 1000 - São Paulo', '(11) 3333-4444', 'contato@tech4all.com', 'Empresa de tecnologia doando equipamentos e conhecimento'),
('Fundação Educar', '98.765.432/0001-88', 'ONG', 'Rua da Educação, 200 - São Paulo', '(11) 5555-6666', 'fundacao@educar.org', 'ONG focada em educação e inclusão digital'),
('Digitalize Brasil', '45.678.123/0001-77', 'INSTITUTO', 'Av. Brasil, 300 - São Paulo', '(11) 7777-8888', 'contato@digitalize.org', 'Instituto de pesquisa e desenvolvimento tecnológico');

-- MATRÍCULAS (INSCRIÇÕES NOS PROJETOS)
INSERT INTO matriculas (usuario_id, projeto_id, status, feedback) VALUES
(2, 1, 'CONFIRMADO', 'Ótimo curso, muito útil para o dia a dia'),
(3, 1, 'INSCRITO', NULL),
(4, 2, 'CONFIRMADO', 'Aprendendo muito sobre hardware'),
(5, 3, 'INSCRITO', NULL);

-- DOAÇÕES
INSERT INTO doacoes (parceiro_id, projeto_id, tipo_recurso, descricao, quantidade, valor, status) VALUES
(1, 1, 'EQUIPAMENTO', '10 computadores novos', 10, 15000.00, 'ENTREGUE'),
(2, 2, 'INFRAESTRUTURA', 'Material para oficina de manutenção', 1, 5000.00, 'ENTREGUE'),
(3, 3, 'CAPACITACAO', 'Curso de programação online', 25, 25000.00, 'PENDENTE');

-- ============================================================
-- 10. CONSULTAS DE EXEMPLO (TESTE)
-- ============================================================

-- Ver todos os usuários
SELECT * FROM usuarios;

-- Ver voluntários com seus dados
SELECT u.nome, u.email, v.areas_atuacao, v.avaliacao 
FROM usuarios u 
JOIN voluntarios v ON u.id = v.usuario_id;

-- Ver projetos ativos com responsáveis
SELECT p.titulo, u.nome AS responsavel, p.localizacao, p.status 
FROM projetos p 
JOIN usuarios u ON p.responsavel_id = u.id;

-- Ver matrículas com detalhes
SELECT u.nome AS aluno, p.titulo AS projeto, m.status 
FROM matriculas m 
JOIN usuarios u ON m.usuario_id = u.id 
JOIN projetos p ON m.projeto_id = p.id;

-- ============================================================
-- FIM DO SCRIPT
-- ============================================================