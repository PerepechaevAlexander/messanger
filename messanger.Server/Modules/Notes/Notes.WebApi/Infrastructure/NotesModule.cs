using Core.WebApi.Contracts;
using Mapster;
using Microsoft.Extensions.DependencyInjection;
using Notes.Logic;
using Notes.Logic.Contracts;
using Notes.Logic.Repositories;
using Notes.WebApi.Controllers;

namespace Notes.WebApi.Infrastructure;

/// <summary>
/// Модуль заметок
/// </summary>
public class NotesModule : IModule
{
    /// <inheritdoc />
    public void RegisterServices(IServiceCollection services)
    {
        services.AddScoped<INoteRepository, NoteRepository>();
    }

    /// <inheritdoc />
    public void RegisterMapperConfig(TypeAdapterConfig typeAdapterConfig)
    {
        typeAdapterConfig.Apply(new NotesMapperRegister());
    }

    /// <inheritdoc />
    public void RegisterControllers(IMvcBuilder mvcBuilder)
    {
        mvcBuilder.AddApplicationPart(typeof(NoteController).Assembly);
    }
}
