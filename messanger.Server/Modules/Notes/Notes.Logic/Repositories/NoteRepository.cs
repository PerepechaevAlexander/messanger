using Notes.Data.Models;
using Notes.Dto;
using Notes.Logic.Contracts;
using Сore.Data;
using Сore.Logic.Repositories;

namespace Notes.Logic.Repositories;

/// <summary>
/// Репозиторий для <see cref="Note"/>.
/// </summary>
public class NoteRepository : BaseRepository<Note, NoteDto, NoteDto>, INoteRepository
{
    public NoteRepository(IDbContext dbContext) : base(dbContext)
    {
    }
}
