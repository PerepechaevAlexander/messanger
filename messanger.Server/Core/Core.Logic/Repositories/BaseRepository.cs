using Microsoft.EntityFrameworkCore;
using Сore.Data;
using Сore.Logic.Contracts;
using Сore.Data.Models;

namespace Сore.Logic.Repositories;

/// <summary>
/// Базовый репозиторий
/// </summary>
public abstract class BaseRepository<T> : IRepository<T> where T : BaseModel
{
    protected IDbContext DbContext { get; }

    protected BaseRepository(IDbContext dbContext)
    {
        DbContext = dbContext;
    }

    /// <inheritdoc/>
    public virtual async Task<IEnumerable<T>> Get()
    {
        return await DbContext.GetQueryable<T>().ToListAsync();
    }
}
