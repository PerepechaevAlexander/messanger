using Core.Dto;
using Сore.Data.Models;

namespace Сore.Logic.Contracts;

/// <summary>
/// Базовый контракт репозитория сущности
/// </summary>
public interface IRepository<TModel, TDto, TSaveDto>
    where TModel : BaseModel
    where TDto : BaseDto
    where TSaveDto : BaseDto
{
    /// <summary>
    /// Получить все сущности.
    /// </summary>
    Task<IEnumerable<TDto>> Get();
}
