using Сore.Data.Models;

namespace Сore.Logic.Contracts;

/// <summary>
/// Базовый контракт репозитория сущности
/// </summary>
public interface IRepository<T> where T : BaseModel 
{
    /// <summary>
    /// Получить все сущности.
    /// </summary>
    Task<IEnumerable<T>> Get();
}
