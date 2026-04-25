using Mapster;
using Notes.Data.Models;
using Notes.Dto;

namespace Notes.Logic;

/// <summary>
/// Маппинги модуля Заметки
/// </summary>
public class NotesMapperRegister : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<Note, NoteDto>();
    }
}
