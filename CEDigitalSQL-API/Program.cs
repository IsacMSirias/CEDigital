using CEDigitalSQL_API.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("*") // your frontend origin
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<CursoContext>(o =>{o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));});

builder.Services.AddDbContext<SemestreContext>(o => {o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));});

builder.Services.AddDbContext<GrupoContext>(o => { o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")); });

builder.Services.AddDbContext<EscuelaContext>(o => { o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")); });

builder.Services.AddDbContext<EstudianteContext>(o => { o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")); });

builder.Services.AddDbContext<ProfesorContext>(o => { o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")); });

builder.Services.AddDbContext<NoticiaContext>(o => { o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")); });

builder.Services.AddDbContext<RubroContext>(o => { o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")); });

builder.Services.AddDbContext<CarpetaContext>(o => { o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")); });

builder.Services.AddDbContext<EvaluacionContext>(o => { o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")); });

builder.Services.AddDbContext<ArchivoContext>(o => { o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")); });

builder.Services.AddDbContext<EntregableContext>(o => { o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")); });

builder.Services.AddDbContext<MatriculaContext>(o => { o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")); });

builder.Services.AddDbContext<ProfesorGrupoContext>(o => { o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")); });

builder.Services.AddDbContext<SubgrupoContext>(o => { o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")); });

builder.Services.AddDbContext<IntegranteSubgrupoContext>(o => { o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")); });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
