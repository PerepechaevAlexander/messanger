using Core.WebApi.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Notes.WebApi.Infrastructure;
using Сore.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<IDbContext, ApplicationDbContext>(optionsBuilder =>
    optionsBuilder.UseNpgsql(builder.Configuration.GetConnectionString("Postgres")));

// пока так, потом разберусь
var modules = new List<IModule>
{
    new NotesModule()
};

var mvcBuilder = builder.Services.AddControllers();
foreach (var module in modules)
{
    module.RegisterServices(builder.Services);
    module.RegisterControllers(mvcBuilder);
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policyBuilder =>
    {
        policyBuilder.WithOrigins(
                "http://localhost:4200",
                "http://frontend:4200"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors("DevCors");

app.UseAuthorization();

app.MapControllers();

app.Run();
