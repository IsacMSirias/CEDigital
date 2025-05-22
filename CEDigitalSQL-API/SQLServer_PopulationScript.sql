USE [CEDigital];
GO

-- Escuela
INSERT INTO Escuela (CodigoEscuela, NombreEscuela)
VALUES ('CS', 'Escuela de Ciencias de la Computación');

-- Curso
INSERT INTO Curso (NombreCurso, CreditosCurso, IdEscuela)
VALUES ('Base de Datos', 4, 1);

-- Semestre
INSERT INTO Semestre (AñoSemestre, PeriodoSemestre, EstadoSemestre)
VALUES (2025, '1', 'E');

-- Profesor
INSERT INTO Profesor DEFAULT VALUES;

-- Estudiante
INSERT INTO Estudiante DEFAULT VALUES;
INSERT INTO Estudiante DEFAULT VALUES; -- Uno extra para pruebas grupales

-- Grupo
INSERT INTO Grupo (NumeroGrupo, IdSemestre, IdCurso)
VALUES (1, 1, 1);

-- ProfesorGrupo
INSERT INTO ProfesorGrupo (CedulaProfesor, IdGrupo)
VALUES (1, 1);

-- Matricula
INSERT INTO Matricula (CarnetEstudiante, IdGrupo)
VALUES (1, 1),
       (2, 1);

-- Carpeta
INSERT INTO Carpeta (RutaCarpeta, CedulaProfesor, IdGrupo)
VALUES ('/Entregas/BD/Grupo1', 1, 1);

-- Rubro
INSERT INTO Rubro (NombreRubro, PorcentajeRubro, IdGrupo)
VALUES ('Proyecto Final', 40, 1);

-- Evaluación
INSERT INTO Evaluacion (NombreEvaluacion, PesoEvaluacion, IdRubro)
VALUES ('Entrega 1', 40, 1);

-- Subgrupo
INSERT INTO Subgrupo (NombreSubgrupo, IdEvaluacion, IdGrupo)
VALUES ('Equipo A', 1, 1);

-- IntegranteSubgrupos
INSERT INTO IntegranteSubgrupos (IdSubgrupo, CarnetEstudiante)
VALUES (1, 1),
       (1, 2);

-- Archivo
INSERT INTO Archivo (ContenidoArchivo, TamañoArchivo, CarnetEstudiante, CedulaProfesor, IdCarpeta)
VALUES (0x, 1024, 1, 1, 1);

-- Entregable
INSERT INTO Entregable (NotaEntregable, ObservacionesEntregable, IdArchivoDesglose, IdArchivoEntrega, IdEvaluacion)
VALUES (85, 'Entrega aceptable', 1, 1, 1);

-- Noticia
INSERT INTO Noticia (TituloNoticia, MensajeNoticia, CedulaProfesor, IdGrupo)
VALUES ('Bienvenida', 'Bienvenidos al curso de BD', 1, 1);
GO