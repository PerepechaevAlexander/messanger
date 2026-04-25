using Mapster;
using Microsoft.Extensions.DependencyInjection;

namespace Core.WebApi.Contracts;

/// <summary>
/// Контракт модуля
/// </summary>
public interface IModule
{
    /// <summary>
    /// Регистрирует сервисы модуля
    /// </summary>
    void RegisterServices(IServiceCollection services);

    /// <summary>
    /// Регистрирует маппинги модуля
    /// </summary>
    void RegisterMapperConfig(TypeAdapterConfig typeAdapterConfig);

    /// <summary>
    /// Регистрирует контроллеры модуля
    /// </summary>
    void RegisterControllers(IMvcBuilder mvcBuilder);
}
