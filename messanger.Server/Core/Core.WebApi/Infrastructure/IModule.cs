using Microsoft.Extensions.DependencyInjection;

namespace Core.WebApi.Infrastructure;

/// <summary>
/// Контракт модуля
/// </summary>
public interface IModule
{
    /// <summary>
    /// Зарегать сервисы модуля
    /// </summary>
    void RegisterServices(IServiceCollection services);

    /// <summary>
    /// Зарегать контроллеры модуля
    /// </summary>
    void RegisterControllers(IMvcBuilder mvcBuilder);
}
