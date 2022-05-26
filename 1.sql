CREATE DATABASE estudiantes_db;
CREATE TABLE estudiante (
    nombre VARCHAR(255),
    rut VARCHAR (100) PRIMARY KEY,
    curso VARCHAR (100),
    nivel SMALLINT
);