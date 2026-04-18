namespace Сore.Data.Models;

/// <summary>
/// Базовый класс для всех моделей БД.
/// </summary>
public class BaseModel
{
    /// <summary>
    /// Идентификатор.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Сущность удалена?
    /// </summary>
    public bool IsDeleted { get; set; }

    /// <summary>
    /// Дата/время создания.
    /// </summary>
    public DateTime CreationDateTime { get; set; }

    /// <summary>
    /// Дата/время последнего изменения.
    /// </summary>
    public DateTime LastModifyDateTime { get; set; }

    /// <summary>
    /// Идентификатор пользователя, последним измененившего сущность.
    /// </summary>
    public int LastModifyUserId { get; set; }
}