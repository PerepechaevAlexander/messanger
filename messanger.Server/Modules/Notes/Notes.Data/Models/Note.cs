using Сore.Data.Models;

namespace Notes.Data.Models;

/// <summary>
/// Заметка.
/// </summary>
public class Note : BaseModel
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
