using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Сore.Data.Models;

namespace Сore.Data.Configurations;

/// <summary>
/// Базовая конфигурация всех моделей базы
/// </summary>
public abstract class BaseEntityConfiguration<T> : IEntityTypeConfiguration<T> where T : BaseModel
{
    /// <inheritdoc />
    public abstract void Configure(EntityTypeBuilder<T> builder);
}
