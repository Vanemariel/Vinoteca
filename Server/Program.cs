using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Vinoteca.BaseDatos;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

#region Conexion con la BD
var conn = builder.Configuration.GetConnectionString("con");
builder.Services.AddDbContext<BDContext>(opciones =>
    opciones.UseSqlServer(conn)
);
#endregion

#region Agregado de los Cors
builder.Services.AddCors();
#endregion 


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();


#region Agregado de Swagger
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Vinoteca", Version = "v1" });
});
#endregion


var app = builder.Build();


#region Uso de los Cors 
app.UseCors(options =>
{
    options.WithOrigins("*");
    options.AllowAnyMethod();
    options.AllowAnyHeader();
});
#endregion Uso de los Cors

#region Conexion al Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Vinoteca v1");
});
#endregion

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
