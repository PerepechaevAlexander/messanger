using Notes.Data.Models;
using Сore.Logic.Contracts;

namespace Notes.Logic.Contracts;

/// <summary>
/// Контракт репозитория для <see cref="Note"/>
/// </summary>
public interface INoteRepository : IRepository<Note>
{
}
