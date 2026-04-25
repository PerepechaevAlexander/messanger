using Core.Dto;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Сore.Data;
using Сore.Data.Models;
using Сore.Logic.Contracts;

namespace Сore.Logic.Repositories;

/// <summary>
/// Базовый репозиторий
/// </summary>
public abstract class BaseRepository<TModel, TDto, TSaveDto>
    : IRepository<TModel, TDto, TSaveDto>
    where TModel : BaseModel
    where TDto : BaseDto
    where TSaveDto : BaseDto
{
    protected IDbContext DbContext { get; }

    protected BaseRepository(IDbContext dbContext)
    {
        DbContext = dbContext;
    }

    /// <inheritdoc/>
    public virtual async Task<IEnumerable<TDto>> Get()
    {
        return await DbContext.GetQueryable<TModel>()
            .ProjectToType<TDto>()
            .ToListAsync();
    }
}
