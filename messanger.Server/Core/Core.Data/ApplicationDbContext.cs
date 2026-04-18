using Microsoft.EntityFrameworkCore;
using Сore.Data.Models;

namespace Сore.Data;

public class ApplicationDbContext : DbContext, IDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }

    public IQueryable<T> GetQueryable<T>() where T : BaseModel
    {
        return Set<T>().AsQueryable<T>();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Применяем все IEntityTypeConfiguration (в том числе из внешних сборок)
        foreach (var assembly in AppDomain.CurrentDomain.GetAssemblies())
        {
            modelBuilder.ApplyConfigurationsFromAssembly(assembly);
        }
    }
}
