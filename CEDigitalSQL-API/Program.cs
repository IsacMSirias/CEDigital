using CEDigitalSQL_API.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();


// Contexto del Curso para que que SQL lo reconozca
builder.Services.AddDbContext<CursoContext>(o =>{o.UseSqlServer(builder.Configuration.GetConnectionString("DefualtConnection"));});

// Contexto del Semestre para que que SQL lo reconozca
builder.Services.AddDbContext<SemestreContext>(o => {o.UseSqlServer(builder.Configuration.GetConnectionString("DefualtConnection"));});

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

app.UseAuthorization();

app.MapControllers();

app.Run();
