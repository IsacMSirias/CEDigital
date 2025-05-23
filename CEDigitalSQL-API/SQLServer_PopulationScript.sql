USE [CEDigital];
GO

-- Escuelas
INSERT INTO Escuela (CodigoEscuela, NombreEscuela) VALUES
('CE', 'Escuela de Computer Engineering'),
('EL', 'Escuela de Electrónica');

-- Cursos
INSERT INTO Curso (NombreCurso, CreditosCurso, IdEscuela) VALUES
('Bases de Datos', 4, 1),
('Circuitos Electricos En Corriente Continua', 4, 2),
('Laboratorio De Circuitos Electricos', 1, 1);

-- Semestres
INSERT INTO Semestre (AñoSemestre, PeriodoSemestre, EstadoSemestre) VALUES
(2025, '1', 'C'),
(2025, '2', 'E');

-- Profesores
INSERT INTO Profesor(CedulaProfesor) VALUES (303420140);
INSERT INTO Profesor(CedulaProfesor) VALUES (101240423);

-- Estudiantes
INSERT INTO Estudiante DEFAULT VALUES; -- 1
INSERT INTO Estudiante DEFAULT VALUES; -- 2

-- Grupos
INSERT INTO Grupo (NumeroGrupo, IdSemestre, IdCurso) VALUES
(1, 1, 1),
(1, 1, 2),
(2, 2, 3);

-- ProfesorGrupo
INSERT INTO ProfesorGrupo (CedulaProfesor, IdGrupo) VALUES
(303420140, 1),
(101240423, 3);

-- Matricula
INSERT INTO Matricula (CarnetEstudiante, IdGrupo) VALUES
(1, 1), (2, 1),
(2, 3);

-- Carpetas
INSERT INTO Carpeta (RutaCarpeta, CedulaProfesor, IdGrupo) VALUES
('Presentaciones', NULL, 1),
('Quices', NULL, 1),
('Examenes', NULL, 1),
('Proyectos', NULL, 1);

-- Rubros
INSERT INTO Rubro (NombreRubro, PorcentajeRubro, IdGrupo) VALUES
('Quices', 30, 1),
('Examenes', 30, 1),
('Proyectos', 40, 1);

-- Evaluaciones
INSERT INTO Evaluacion (NombreEvaluacion, PesoEvaluacion, IdRubro) VALUES
('Parcial 1', 50, 2),
('Parcial 2', 50, 2),
('Quiz 1', 25, 1),
('Quiz 2', 25, 1),
('Quiz 3', 25, 1),
('Quiz 4', 25, 1),
('Proyecto Semestral', 100, 3);

-- Archivos
INSERT INTO Archivo (ContenidoArchivo, TamañoArchivo, CarnetEstudiante, CedulaProfesor, IdCarpeta) VALUES
(0x, 1000, NULL, NULL, 1),
(0x, 1200, NULL, NULL, 1),
(0x, 800, NULL, 303420140, 1),
(0x, 1600, 1, NULL, NULL);

-- Entregables
INSERT INTO Entregable (NotaEntregable, ObservacionesEntregable, IdArchivoDesglose, IdArchivoEntrega, IdEvaluacion, CarnetEstudiante) VALUES
(90, 'Buen trabajo', NULL, NULL, 3, 1),
(85, 'Completo', NULL, NULL, 3, 2);

-- Noticias
INSERT INTO Noticia (TituloNoticia, MensajeNoticia, CedulaProfesor, IdGrupo) VALUES
('Bienvenida', '¡Bienvenidos al curso de BD!', 303420140, 1);
GO