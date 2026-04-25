using Core.Logic;
using Core.WebApi.Contracts;
using Mapster;
using Microsoft.Extensions.DependencyInjection;

namespace Core.WebApi.Infrastructure;

/// <summary>
/// Модуль ядра
/// </summary>
public class CoreModule : IModule
{
    /// <inheritdoc />
    public void RegisterControllers(IMvcBuilder mvcBuilder)
    {
    }

    /// <inheritdoc />
    public void RegisterMapperConfig(TypeAdapterConfig typeAdapterConfig)
    {
        typeAdapterConfig.Apply(new CoreMapperRegister());
    }

    /// <inheritdoc />
    public void RegisterServices(IServiceCollection services)
    {
    }
}
