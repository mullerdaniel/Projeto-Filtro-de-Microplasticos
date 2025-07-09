# Projeto-Filtro-de-Micropl-sticoss


BANCO DE DADOS:

CREATE DATABASE formulario;

USE formulario;

CREATE TABLE feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  nota INT NOT NULL,
  observacoes TEXT,
  data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
