using messanger.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace messanger.Server.Repositories;

/// <summary>
/// Репозиторий для <see cref="Note"/>.
/// </summary>
public class NoteRepository
{
    private ApplicationDbContext _dbContext { get; }

    public NoteRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    /// <summary>
    /// Получить заметки.
    /// </summary>
    public async Task<IEnumerable<Note>> Get()
    {
        return await _dbContext.Notes.ToListAsync<Note>();
    }
}
