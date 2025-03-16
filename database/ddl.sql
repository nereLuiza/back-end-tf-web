CREATE DATABASE db_tf_web;
\c db_tf_web;

CREATE TABLE Cursos (
    code_curso VARCHAR(5) PRIMARY KEY,
    nome_curso VARCHAR(50) NOT NULL,
    desc_curso TEXT NOT NULL,
    mcc TEXT,
    ppc TEXT
);

CREATE TABLE Perguntas (
    num_pgt SERIAL PRIMARY KEY,
    conteudo TEXT NOT NULL
);

CREATE TABLE Imagens (
    code_img SERIAL PRIMARY KEY,
    atalho TEXT NOT NULL
);

CREATE TABLE Alternativas (
    num_pgt INTEGER NOT NULL,
    valor VARCHAR(50) NOT NULL,
    conteudo VARCHAR(300) NOT NULL,
    PRIMARY KEY (num_pgt, valor),
    CONSTRAINT fk_alternativas_perguntas FOREIGN KEY (num_pgt) REFERENCES Perguntas(num_pgt) ON DELETE CASCADE
);

CREATE TABLE Admin (
    email_admin VARCHAR(50) PRIMARY KEY,
    senha_admin VARCHAR(255) NOT NULL
);
