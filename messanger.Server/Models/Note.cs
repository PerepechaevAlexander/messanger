using messanger.Server.Models.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace messanger.Server.Models;

/// <summary>
/// Заметка.
/// </summary>
[Table("notes")]
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
