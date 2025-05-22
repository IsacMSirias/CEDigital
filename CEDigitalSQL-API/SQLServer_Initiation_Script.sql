-----------------------------------------------
------ Script de iniciación DB CEDigital ------
-----------------------------------------------

CREATE DATABASE [CEDigital];
GO

USE [CEDigital];
GO

-----------------------------------------------
------------- Creacion de tablas --------------
-----------------------------------------------

CREATE TABLE [Archivo] (
    [IdArchivo] int NOT NULL IDENTITY,
    [FechaSubidaArchivo] datetime2 DEFAULT GETDATE(),
    [ContenidoArchivo] varbinary(max) NOT NULL,
    [TamañoArchivo] int NOT NULL,
    [CarnetEstudiante] int DEFAULT -1,
    [CedulaProfesor] int DEFAULT -1,
    [IdCarpeta] int DEFAULT -1,
    CONSTRAINT [PK_Archivo] PRIMARY KEY ([IdArchivo])
);

CREATE TABLE [Carpeta] (
    [IdCarpeta] int NOT NULL IDENTITY,
    [RutaCarpeta] nvarchar(100) NOT NULL,
    [CedulaProfesor] int DEFAULT -2,
    [IdGrupo] int NOT NULL,
    CONSTRAINT [PK_Carpeta] PRIMARY KEY ([IdCarpeta])
);

CREATE TABLE [Curso] (
    [IdCurso] int NOT NULL IDENTITY,
    [NombreCurso] nvarchar(100) NOT NULL,
    [CreditosCurso] int NOT NULL,
    [IdEscuela] int NOT NULL,
    CONSTRAINT [PK_Curso] PRIMARY KEY ([IdCurso])
);

CREATE TABLE [Entregable] (
    [IdEntregable] int NOT NULL IDENTITY,
    [NotaEntregable] int DEFAULT 0,
    [ObservacionesEntregable] nvarchar(100) DEFAULT 'N/A',
    [IdArchivoDesglose] int DEFAULT -1,
    [IdArchivoEntrega] int DEFAULT -1,
    [IdEvaluacion] int NOT NULL,
    CONSTRAINT [PK_Entregable] PRIMARY KEY ([IdEntregable])
);

CREATE TABLE [Escuela] (
    [IdEscuela] int NOT NULL IDENTITY,
    [CodigoEscuela] nvarchar(100) NOT NULL,
    [NombreEscuela] nvarchar(100) NOT NULL,
    CONSTRAINT [PK_Escuela] PRIMARY KEY ([IdEscuela])
);

CREATE TABLE [Estudiante] (
    [CarnetEstudiante] int NOT NULL,
    CONSTRAINT [PK_Estudiante] PRIMARY KEY ([CarnetEstudiante])
);

CREATE TABLE [Evaluacion] (
    [IdEvaluacion] int NOT NULL IDENTITY,
    [EspecificacionEvaluacion] varbinary(max) DEFAULT 0x,
    [NombreEvaluacion] nvarchar(100) NOT NULL,
    [PesoEvaluacion] int NOT NULL,
    [EstadoNotas] bit DEFAULT 0,
    [EsGrupalEvaluacion] bit DEFAULT 0,
    [LimiteEntregaEvaluacion] datetime2 NULL,
    [IdRubro] int NOT NULL,
    CONSTRAINT [PK_Evaluacion] PRIMARY KEY ([IdEvaluacion])
);

CREATE TABLE [Grupo] (
    [IdGrupo] int NOT NULL IDENTITY,
    [NumeroGrupo] int NOT NULL,
    [IdSemestre] int NOT NULL,
    [IdCurso] int NOT NULL,
    CONSTRAINT [PK_Grupo] PRIMARY KEY ([IdGrupo])
);

CREATE TABLE [IntegranteSubgrupos] (
    [IdSubgrupo] int NOT NULL,
    [CarnetEstudiante] int NOT NULL,
    CONSTRAINT [PK_IntegranteSubgrupos] PRIMARY KEY ([IdSubgrupo], [CarnetEstudiante])
);

CREATE TABLE [Matricula] (
    [CarnetEstudiante] int NOT NULL,
    [IdGrupo] int NOT NULL,
    CONSTRAINT [PK_Matricula] PRIMARY KEY ([CarnetEstudiante], [IdGrupo])
);

CREATE TABLE [Noticia] (
    [IdNoticia] int NOT NULL IDENTITY,
    [TituloNoticia] nvarchar(100) NOT NULL,
    [MensajeNoticia] nvarchar(1000) NOT NULL,
    [FechaPublicacionNoticia] datetime2 DEFAULT GETDATE(),
    [CedulaProfesor] int DEFAULT -1,
    [IdGrupo] int NOT NULL,
    CONSTRAINT [PK_Noticia] PRIMARY KEY ([IdNoticia])
);

CREATE TABLE [Profesor] (
    [CedulaProfesor] int NOT NULL IDENTITY,
    CONSTRAINT [PK_Profesor] PRIMARY KEY ([CedulaProfesor])
);

CREATE TABLE [ProfesorGrupo] (
    [CedulaProfesor] int NOT NULL,
    [IdGrupo] int NOT NULL,
    CONSTRAINT [PK_ProfesorGrupo] PRIMARY KEY ([CedulaProfesor], [IdGrupo])
);

CREATE TABLE [Rubro] (
    [IdRubro] int NOT NULL IDENTITY,
    [NombreRubro] nvarchar(100) NOT NULL,
    [PorcentajeRubro] int NOT NULL,
    [IdGrupo] int NOT NULL,
    CONSTRAINT [PK_Rubro] PRIMARY KEY ([IdRubro])
);

CREATE TABLE [Semestre] (
    [IdSemestre] int NOT NULL IDENTITY,
    [AñoSemestre] int NOT NULL,
    [PeriodoSemestre] char NOT NULL,
    [EstadoSemestre] char DEFAULT 'E',
    CONSTRAINT [PK_Semestre] PRIMARY KEY ([IdSemestre])
);

CREATE TABLE [Subgrupo] (
    [IdSubgrupo] int NOT NULL IDENTITY,
    [NombreSubgrupo] nvarchar(100) NOT NULL,
    [IdEvaluacion] int NOT NULL,
    [IdGrupo] int NOT NULL,
    CONSTRAINT [PK_Subgrupo] PRIMARY KEY ([IdSubgrupo])
);

-----------------------------------------------
------- Constraints de las tablas -------------
-----------------------------------------------

ALTER TABLE [Archivo]
    ADD 
        CONSTRAINT [FK_Archivo_Estudiante_CarnetEstudiante] FOREIGN KEY ([CarnetEstudiante]) REFERENCES [Estudiante] ([CarnetEstudiante]) ON DELETE SET DEFAULT,
        CONSTRAINT [FK_Archivo_Profesor_CedulaProfesor] FOREIGN KEY ([CedulaProfesor]) REFERENCES [Profesor] ([CedulaProfesor]) ON DELETE SET DEFAULT;

ALTER TABLE [Carpeta]
    ADD 
        CONSTRAINT [FK_Carpeta_Grupo_IdGrupo] FOREIGN KEY ([IdGrupo]) REFERENCES [Grupo] ([IdGrupo]) ON DELETE CASCADE,
        CONSTRAINT [FK_Carpeta_Profesor_CedulaProfesor] FOREIGN KEY ([CedulaProfesor]) REFERENCES [Profesor] ([CedulaProfesor]) ON DELETE SET DEFAULT;

ALTER TABLE [Curso]
    ADD 
        CONSTRAINT [FK_Curso_Escuela_IdEscuela] FOREIGN KEY ([IdEscuela]) REFERENCES [Escuela] ([IdEscuela]) ON DELETE CASCADE;

ALTER TABLE [Entregable]
    ADD 
        CONSTRAINT [FK_Entregable_Archivo_IdArchivoDesglose] FOREIGN KEY ([IdArchivoDesglose]) REFERENCES [Archivo] ([IdArchivo]) ON DELETE NO ACTION,
        CONSTRAINT [FK_Entregable_Archivo_IdArchivoEntrega] FOREIGN KEY ([IdArchivoEntrega]) REFERENCES [Archivo] ([IdArchivo]) ON DELETE NO ACTION,
        CONSTRAINT [FK_Entregable_Evaluacion_IdEvaluacion] FOREIGN KEY ([IdEvaluacion]) REFERENCES [Evaluacion] ([IdEvaluacion]) ON DELETE CASCADE;

ALTER TABLE [Evaluacion]
    ADD 
        CONSTRAINT [FK_Evaluacion_Rubro_IdRubro] FOREIGN KEY ([IdRubro]) REFERENCES [Rubro] ([IdRubro]) ON DELETE CASCADE;

ALTER TABLE [Grupo]
    ADD 
        CONSTRAINT [FK_Grupo_Curso_IdCurso] FOREIGN KEY ([IdCurso]) REFERENCES [Curso] ([IdCurso]) ON DELETE CASCADE,
        CONSTRAINT [FK_Grupo_Semestre_IdSemestre] FOREIGN KEY ([IdSemestre]) REFERENCES [Semestre] ([IdSemestre]) ON DELETE CASCADE;

ALTER TABLE [IntegranteSubgrupos]
    ADD 
        CONSTRAINT [FK_IntegranteSubgrupos_Estudiante_CarnetEstudiante] FOREIGN KEY ([CarnetEstudiante]) REFERENCES [Estudiante] ([CarnetEstudiante]) ON DELETE CASCADE,
        CONSTRAINT [FK_IntegranteSubgrupos_Subgrupo_IdSubgrupo] FOREIGN KEY ([IdSubgrupo]) REFERENCES [Subgrupo] ([IdSubgrupo]) ON DELETE CASCADE;

ALTER TABLE [Matricula]
    ADD 
        CONSTRAINT [FK_Matricula_Estudiante_CarnetEstudiante] FOREIGN KEY ([CarnetEstudiante]) REFERENCES [Estudiante] ([CarnetEstudiante]) ON DELETE CASCADE,
        CONSTRAINT [FK_Matricula_Grupo_IdGrupo] FOREIGN KEY ([IdGrupo]) REFERENCES [Grupo] ([IdGrupo]) ON DELETE CASCADE;

ALTER TABLE [Noticia]
    ADD 
        CONSTRAINT [FK_Noticia_Grupo_IdGrupo] FOREIGN KEY ([IdGrupo]) REFERENCES [Grupo] ([IdGrupo]) ON DELETE CASCADE,
        CONSTRAINT [FK_Noticia_Profesor_CedulaProfesor] FOREIGN KEY ([CedulaProfesor]) REFERENCES [Profesor] ([CedulaProfesor]) ON DELETE SET DEFAULT;

ALTER TABLE [ProfesorGrupo]
    ADD 
        CONSTRAINT [FK_ProfesorGrupo_Grupo_IdGrupo] FOREIGN KEY ([IdGrupo]) REFERENCES [Grupo] ([IdGrupo]) ON DELETE CASCADE,
        CONSTRAINT [FK_ProfesorGrupo_Profesor_CedulaProfesor] FOREIGN KEY ([CedulaProfesor]) REFERENCES [Profesor] ([CedulaProfesor]) ON DELETE CASCADE;

ALTER TABLE [Rubro]
    ADD 
        CONSTRAINT [FK_Rubro_Grupo_IdGrupo] FOREIGN KEY ([IdGrupo]) REFERENCES [Grupo] ([IdGrupo]) ON DELETE CASCADE;

ALTER TABLE [Subgrupo]
    ADD 
        CONSTRAINT [FK_Subgrupo_Evaluacion_IdEvaluacion] FOREIGN KEY ([IdEvaluacion]) REFERENCES [Evaluacion] ([IdEvaluacion]) ON DELETE CASCADE,
        CONSTRAINT [FK_Subgrupo_Grupo_IdGrupo] FOREIGN KEY ([IdGrupo]) REFERENCES [Grupo] ([IdGrupo]) ON DELETE NO ACTION;
GO
