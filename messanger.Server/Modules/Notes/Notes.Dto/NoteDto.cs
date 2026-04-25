using Core.Dto;

namespace Notes.Dto;

/// <summary>
/// Dto заметки
/// </summary>
public class NoteDto : BaseDto
{
    /// <summary>
    /// Наименование заметки.
    /// </summary>
    public required string Title { get; set; }

    /// <summary>
    /// Содержание заметки.
    /// </summary>
    public string? Content { get; set; }
}
