using Сore.Data.Models;

namespace Сore.Data;

public interface IDbContext
{
    /// <summary>
    /// Запрос на получение сущностей бд
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <returns></returns>
    IQueryable<T> GetQueryable<T>() where T : BaseModel;
}
